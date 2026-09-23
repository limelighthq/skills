#!/usr/bin/env node
// Node 20+, Python 3.10+, Git, and the repository's YAML dependency.
import { execFileSync } from 'node:child_process';
import { readFileSync, appendFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { buildCatalog } from './notion/catalog.mjs';
import { NotionClient } from './notion/client.mjs';
import { planSync, applyPlan, schemaChanges } from './notion/sync.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

function requireMain(config) {
  if (git('status', '--porcelain')) throw new Error('Apply requires a clean, committed checkout.');
  const remote = git('remote', 'get-url', 'origin').replace(/\.git$/, '');
  if (![ `https://github.com/${config.repository}`, `git@github.com:${config.repository}` ].includes(remote)) throw new Error('Origin does not match notion-sync.json.');
  const revision = git('rev-parse', 'HEAD');
  const main = git('ls-remote', '--exit-code', 'origin', `refs/heads/${config.branch}`).split(/\s/)[0];
  if (revision !== main) throw new Error(`Apply must use the latest ${config.branch} revision. Re-run from main.`);
  if (process.env.GITHUB_ACTIONS && (process.env.GITHUB_REPOSITORY !== config.repository || process.env.GITHUB_REF !== `refs/heads/${config.branch}`)) throw new Error('Apply is restricted to the configured repository and branch.');
  return revision;
}

function report(lines) {
  const text = `${lines.join('\n')}\n`;
  process.stdout.write(text);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, text);
}

async function main() {
  const { values, positionals } = parseArgs({ options: { apply: { type: 'boolean', default: false }, repair: { type: 'string', multiple: true, default: [] } }, allowPositionals: true });
  const command = positionals[0] ?? 'plan';
  if (positionals.length > 1 || !['catalog', 'plan', 'publish', 'schema'].includes(command)) throw new Error('Usage: notion-sync.mjs [catalog|plan|publish|schema] [--apply] [--repair skill-name]');
  if (values.apply && !['publish', 'schema'].includes(command)) throw new Error('--apply requires publish or schema.');
  const config = JSON.parse(readFileSync(resolve(root, 'notion-sync.json'), 'utf8'));
  if (!/^[\w.-]+\/[\w.-]+$/.test(config.repository) || config.branch !== 'main' || !/^[a-f0-9-]{32,36}$/.test(config.dataSourceId) || !/^[a-f0-9-]{32,36}$/.test(config.databaseId)) throw new Error('Invalid notion-sync.json repository, branch, or database IDs.');
  const skills = buildCatalog(root, config);
  if (command === 'catalog') {
    report(['# Skills prepared for Notion', '', ...skills.map(skill => `- ${skill.name}: ${skill.files.length} files, ${skill.hash}`)]);
    return;
  }
  const revision = values.apply ? requireMain(config) : git('rev-parse', 'HEAD');
  const api = new NotionClient({ token: process.env.NOTION_API_TOKEN });
  const db = await api.request('GET', `/databases/${config.databaseId}`);
  if (db.database_type !== 'skills' || !db.data_sources?.some(source => source.id.replaceAll('-', '') === config.dataSourceId.replaceAll('-', ''))) throw new Error('Configured target is not the expected native Skills database and data source.');
  const source = await api.request('GET', `/data_sources/${config.dataSourceId}`);
  const additions = schemaChanges(source.properties);
  if (command === 'schema') {
    report(['# Notion schema plan', '', ...Object.keys(additions).map(name => `- Add ${name} (rich text)`), ...(!Object.keys(additions).length ? ['No schema changes needed.'] : [])]);
    if (values.apply && Object.keys(additions).length) {
      await api.request('PATCH', `/data_sources/${config.dataSourceId}`, { properties: additions });
      if (Object.keys(schemaChanges((await api.request('GET', `/data_sources/${config.dataSourceId}`)).properties)).length) throw new Error('Schema verification failed.');
      report(['Schema additions verified.']);
    }
    return;
  }
  if (Object.keys(additions).length) report([`Missing publisher fields: ${Object.keys(additions).join(', ')}. Review npm run notion:schema before activation.`, '']);
  const plan = await planSync(api, config, skills, { repair: values.repair });
  report(['# Notion publishing plan', '', `Repository: ${config.repository} at ${revision}`, '', ...plan.actions.map(action => `- ${action.kind}: ${action.skill.name}${action.pageId ? ` (${action.pageId})` : ''}`),
    ...plan.conflicts.map(conflict => `- Conflict: ${conflict}`), '', `${plan.ignored} unrelated rows left alone.`]);
  if (plan.conflicts.length) throw new Error('Resolve the listed conflicts before publishing.');
  if (!values.apply) { report(['Read-only plan. No Notion changes made.']); return; }
  if (Object.keys(additions).length) throw new Error('Apply the reviewed schema additions first.');
  // Resolve name collisions again immediately before apply, without using a saved/stale plan.
  const current = await planSync(api, config, skills, { repair: values.repair });
  const published = await applyPlan(api, config, current, { revision });
  report([`Verified ${published} published skills; ${skills.length - published} unchanged.`]);
}

main().catch(error => {
  // HTTP client errors are deliberately redacted. Avoid child-process stderr and request bodies.
  process.stderr.write(`${error.status !== undefined ? 'Local command failed; verify Git and Python setup.' : error.message}\n`);
  process.exitCode = 1;
});
