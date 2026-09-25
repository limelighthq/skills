// GitHub writes for immutable Notion import candidates.
import { digest, skillHash } from './catalog.mjs';

const safeName = value => typeof value === 'string' && value.length <= 64 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
const hash = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);

function requireEnrollment(skill, receipt, plugins) {
  if (!plugins.has(skill.plugin)) throw new Error('Candidate plugin is outside the trusted catalog.');
  if (receipt?.format !== 2 || receipt.kind !== 'enrollment' || receipt.baseline !== null ||
      typeof receipt.repository !== 'string' || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(receipt.repository) ||
      receipt.repository !== skill.origin || receipt.plugin !== skill.plugin || receipt.sourcePath !== skill.sourcePath ||
      typeof receipt.pageId !== 'string' || !receipt.pageId.trim() || !hash(receipt.guard) || !hash(receipt.remote) ||
      receipt.source !== skill.hash || !hash(skill.hash) || skill.hash !== skillHash(skill)) {
    throw new Error('A valid enrollment receipt matching the new skill and its hash is required.');
  }
}

export function candidateEntries(candidates, originals) {
  const entries = [];
  const names = new Set(), paths = new Set();
  const plugins = new Set(originals.map(skill => /^plugins\/([^/]+)\/skills\/[^/]+$/.exec(skill.sourcePath)?.[1]).filter(safeName));
  for (const { skill, receipt } of candidates) {
    const original = originals.find(item => item.name === skill.name);
    const plugin = /^plugins\/([^/]+)\/skills\/[^/]+$/.exec(skill.sourcePath)?.[1];
    if (!safeName(skill.name) || !safeName(plugin) || skill.sourcePath !== `plugins/${plugin}/skills/${skill.name}` ||
        (original && skill.sourcePath !== original.sourcePath) || (!original && skill.plugin !== plugin)) {
      throw new Error('Candidate scope must match its canonical skill path.');
    }
    if (names.has(skill.name) || paths.has(skill.sourcePath.toLowerCase())) throw new Error('Duplicate candidate name or path collision.');
    names.add(skill.name);
    paths.add(skill.sourcePath.toLowerCase());
    if (original && receipt?.kind === 'enrollment') throw new Error('Enrollment cannot replace an existing skill.');
    if (!original) requireEnrollment(skill, receipt, plugins);
    const seen = new Set();
    for (const file of skill.files) {
      if (typeof file.path !== 'string' || !file.path || file.path.split('/').some(part => !part || ['.', '..', '.git'].includes(part.toLowerCase())) || /[\\:\x00-\x1f]/.test(file.path) || ![0o644, 0o755].includes(file.mode) || typeof file.data !== 'string') throw new Error('Unsafe candidate path or mode.');
      const normalized = file.path.toLowerCase();
      if ([...seen].some(path => path === normalized || path.startsWith(`${normalized}/`) || normalized.startsWith(`${path}/`))) throw new Error('Candidate file path collision.');
      seen.add(normalized);
      const old = original?.files.find(item => item.path === file.path);
      if (!old || old.data !== file.data || old.mode !== file.mode) entries.push({ path: `${skill.sourcePath}/${file.path}`, mode: file.mode === 0o755 ? '100755' : '100644', type: 'blob', data: file.data });
    }
    if (!original && !skill.files.some(file => file.path === 'SKILL.md')) throw new Error('Enrollment requires a SKILL.md file.');
    for (const old of original?.files ?? []) if (!skill.files.some(file => file.path === old.path)) entries.push({ path: `${skill.sourcePath}/${old.path}`, mode: '100644', type: 'blob', sha: null });
    entries.push({ path: `.notion-sync/${skill.name}.json`, mode: '100644', type: 'blob', data: Buffer.from(`${JSON.stringify(receipt, null, 2)}\n`).toString('base64') });
  }
  return entries.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
}

export function verifyCandidateCommit(commit, base, tree) {
  if (commit.parents?.length !== 1 || commit.parents[0].sha !== base) throw new Error('Candidate base is stale or was changed; prepare a fresh import.');
  if (commit.tree?.sha !== tree) throw new Error('Candidate tree was modified or Notion changed; prepare a fresh import.');
}

export function requireValidation(jobs) {
  for (const suffix of ['validate', 'scripts (ubuntu-latest)', 'scripts (macos-latest)', 'scripts (windows-latest)']) {
    const matches = jobs.filter(job => job.name === suffix || job.name.endsWith(` / ${suffix}`));
    if (matches.length !== 1 || matches[0].conclusion !== 'success') throw new Error(`Successful validation is required: ${suffix}.`);
  }
}

export class GitHub {
  constructor(repository, token = process.env.GH_TOKEN) {
    if (!token) throw new Error('Set GH_TOKEN for the repository-scoped GitHub workflow.');
    this.repository = repository;
    this.token = token;
  }
  async request(method, path, body) {
    let response;
    try {
      response = await fetch(`https://api.github.com/repos/${this.repository}${path}`, {
        method, redirect: 'error', signal: AbortSignal.timeout(30000),
        headers: { Authorization: `Bearer ${this.token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json' },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } catch { throw new Error(`GitHub network failure during ${method}; inspect the run before retrying.`); }
    if (!response.ok) { const error = new Error(`GitHub HTTP ${response.status} during ${method} ${path}.`); error.httpStatus = response.status; throw error; }
    return response.status === 204 ? undefined : response.json();
  }
  async head() { return (await this.request('GET', '/git/ref/heads/main')).object.sha; }
  async tree(base, entries) {
    const baseCommit = await this.request('GET', `/git/commits/${base}`);
    const tree = [];
    for (const entry of entries) {
      const { data, ...value } = entry;
      if (data !== undefined) {
        const bytes = Buffer.from(data, 'base64');
        const text = bytes.toString('utf8');
        if (!bytes.includes(0) && Buffer.from(text).equals(bytes)) value.content = text;
        else value.sha = (await this.request('POST', '/git/blobs', { content: data, encoding: 'base64' })).sha;
      }
      tree.push(value);
    }
    return (await this.request('POST', '/git/trees', { base_tree: baseCommit.tree.sha, tree })).sha;
  }
  async prepare(base, entries, names) {
    const tree = await this.tree(base, entries);
    const branch = `codex/notion-sync-${base.slice(0, 12)}-${digest(tree).slice(0, 12)}`;
    let sha;
    try { sha = (await this.request('GET', `/git/ref/heads/${branch}`)).object.sha; }
    catch (error) { if (error.httpStatus !== 404) throw error; }
    if (sha) verifyCandidateCommit(await this.request('GET', `/git/commits/${sha}`), base, tree);
    else {
      sha = (await this.request('POST', '/git/commits', { message: `Sync Notion edits: ${names.join(', ')}`, tree, parents: [base] })).sha;
      await this.request('POST', '/git/refs', { ref: `refs/heads/${branch}`, sha });
    }
    const pulls = await this.request('GET', `/pulls?state=open&head=${encodeURIComponent(`${this.repository.split('/')[0]}:${branch}`)}&base=main`);
    if (pulls.length > 1) throw new Error('Ambiguous import pull requests; inspect them before retrying.');
    const pull = pulls[0] ?? await this.request('POST', '/pulls', {
      title: `Sync Notion edits: ${names.join(', ')}`.slice(0, 200), head: branch, base: 'main',
      body: `Imports new or edited Notion skills: ${names.map(name => `\`${name}\``).join(', ')}. New skills enroll through their selected Plugin and include README entries.\n\nThe sync runs repository validation, installation checks, and bundled script tests before merging. It rechecks the exact source snapshots and candidate commit before publication. Changes on both sides require resolution.\n\nPrepared from \`${base}\`.`,
    });
    if (pull.head.sha !== sha) throw new Error('Import pull request changed during preparation.');
    return { sha, pr: pull.number, url: pull.html_url };
  }
}
