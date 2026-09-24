#!/usr/bin/env node
// Trusted main code only. Candidate validation runs separately without write credentials.
import { execFileSync } from 'node:child_process';
import { readFileSync, appendFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildCatalog } from './notion/catalog.mjs';
import { NotionClient } from './notion/client.mjs';
import { planImports } from './notion/import.mjs';
import { loadReceipts } from './notion/receipts.mjs';
import { GitHub, candidateEntries, verifyCandidateCommit, requireValidation } from './notion/github.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
function output(key, value) { if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`); }
function report(message) { process.stdout.write(`${message}\n`); if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${message}\n`); }

async function main() {
  const mode = process.argv[2] ?? 'plan';
  if (!['plan', 'prepare', 'finish'].includes(mode)) throw new Error('Use plan, prepare, or finish.');
  const config = JSON.parse(readFileSync(resolve(root, 'notion-sync.json'), 'utf8'));
  if (config.repository !== 'limelighthq/skills' || config.branch !== 'main') throw new Error('Import is scoped to limelighthq/skills main.');
  if (process.env.GITHUB_ACTIONS && (process.env.GITHUB_REPOSITORY !== config.repository || process.env.GITHUB_REF !== 'refs/heads/main')) throw new Error('Import must run in the configured repository on main.');
  const github = new GitHub(config.repository);
  const base = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  if (await github.head() !== base) throw new Error('Main advanced; retry from its latest revision.');
  if (execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim()) throw new Error('Import requires a clean main checkout.');
  const skills = buildCatalog(root, config);
  const api = new NotionClient({ token: process.env.NOTION_API_TOKEN });
  const database = await api.request('GET', `/databases/${config.databaseId}`);
  if (database.database_type !== 'skills' || !database.data_sources?.some(source => source.id.replaceAll('-', '') === config.dataSourceId.replaceAll('-', ''))) throw new Error('Not the configured Skills database.');
  const plan = await planImports(api, config, skills, loadReceipts(root, skills));
  report(`# Notion import\n\n${plan.candidates.length} changed skills.\n${plan.candidates.map(item => `- ${item.skill.name}`).join('\n')}`);
  if (plan.conflicts.length) { report(plan.conflicts.map(message => `- Conflict: ${message}`).join('\n')); throw new Error('Resolve the listed conflicts before syncing.'); }
  if (mode === 'plan') { report('Read-only plan. No changes made.'); return; }
  const entries = candidateEntries(plan.candidates, skills);
  if (mode === 'prepare') {
    if (!entries.length) { output('sha', ''); report('No Notion imports needed.'); return; }
    const result = await github.prepare(base, entries, plan.candidates.map(item => item.skill.name));
    output('sha', result.sha); output('pr', result.pr); report(`[Review the import](${result.url})`);
    return;
  }
  const sha = process.env.IMPORT_SHA, pr = process.env.IMPORT_PR, run = process.env.GITHUB_RUN_ID;
  if (!/^[a-f0-9]{40}$/.test(sha ?? '') || !/^[1-9][0-9]*$/.test(pr ?? '') || !/^[1-9][0-9]*$/.test(run ?? '')) throw new Error('Finish requires a validated workflow candidate.');
  const pull = await github.request('GET', `/pulls/${pr}`);
  if (pull.state !== 'open' || pull.head.sha !== sha || pull.base.ref !== 'main' || pull.head.repo.full_name !== config.repository || !pull.head.ref.startsWith('codex/notion-sync-')) throw new Error('Candidate pull request changed; inspect before retrying.');
  if (!entries.length) throw new Error('Notion changed or was already synchronized; inspect the stale candidate.');
  verifyCandidateCommit(await github.request('GET', `/git/commits/${sha}`), base, await github.tree(base, entries));
  const jobs = await github.request('GET', `/actions/runs/${run}/jobs?per_page=100`);
  if (jobs.total_count > jobs.jobs.length) throw new Error('Incomplete validation job listing.');
  requireValidation(jobs.jobs);
  // The same required validation runs through workflow_call for bot PRs. Publish its
  // result explicitly because GITHUB_TOKEN PR events can require manual approval.
  await github.request('POST', `/statuses/${sha}`, { state: 'success', context: 'validate', description: 'Marketplace, install and all three script platforms passed', target_url: `https://github.com/${config.repository}/actions/runs/${run}` });
  if (process.env.NOTION_IMPORT_AUTO_MERGE === 'false') { output('publish', 'false'); report(`Import #${pr} passed checks and awaits review.`); return; }
  if (await github.head() !== base) throw new Error('Main advanced during validation; prepare a fresh candidate.');
  const merged = await github.request('PUT', `/pulls/${pr}/merge`, { sha, merge_method: 'squash' });
  if (!merged.merged) throw new Error('GitHub did not merge the validated import.');
  output('publish', 'true'); report(`Merged import #${pr} at ${merged.sha}. Publication follows in this run.`);
}

main().catch(error => { process.stderr.write(`${error.status !== undefined ? 'Local command failed; check Git and Python setup.' : error.message}\n`); process.exitCode = 1; });
