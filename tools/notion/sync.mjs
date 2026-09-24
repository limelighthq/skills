import { digest, packSkill } from './catalog.mjs';

const TYPES = { 'Skill name': 'title', Description: 'rich_text', Files: 'files', Origin: 'rich_text', 'Source path': 'rich_text', 'Sync state': 'rich_text' };
const rich = value => ({ rich_text: [{ text: { content: value } }] });
export function propertyText(property) {
  const values = property?.title ?? property?.rich_text ?? [];
  return values.map(value => value.plain_text ?? value.text?.content ?? '').join('');
}

export function schemaChanges(properties) {
  const missing = {};
  for (const [name, type] of Object.entries(TYPES)) {
    if (properties[name] && properties[name].type !== type) throw new Error(`Notion property ${name} must have type ${type}. No schema changes made.`);
    if (!properties[name]) {
      if (['Skill name', 'Description', 'Files'].includes(name)) throw new Error(`Use a native Notion Skills database: missing ${name}.`);
      missing[name] = { [type]: {} };
    }
  }
  return missing;
}

export function stateOf(row) {
  const raw = propertyText(row.properties?.['Sync state']);
  if (!raw) return null;
  try {
    const state = JSON.parse(raw);
    if (!state || typeof state.repo !== 'string' || typeof state.key !== 'string') throw new Error();
    return state;
  } catch { throw new Error(`Invalid Sync state on page ${row.id}. Restore its publisher metadata before retrying.`); }
}

function fileIdentity(file) {
  const rawUrl = file.file?.url ?? file.external?.url;
  let url;
  if (rawUrl) { const parsed = new URL(rawUrl); parsed.search = ''; url = parsed.toString(); }
  return { name: file.name, type: file.type, url, upload: file.file_upload?.id };
}

export function remoteSnapshot(page, content) {
  if (content.truncated) throw new Error(`Truncated content for page ${page.id}.`);
  if (content.unknown_block_ids?.length || content.unknown_block_count) throw new Error(`Unsupported content for page ${page.id}.`);
  if (typeof content.markdown !== 'string') throw new Error(`Missing Markdown for page ${page.id}.`);
  if (page.in_trash || page.archived || page.is_archived) throw new Error(`Page ${page.id} was archived. Resolve it before publishing.`);
  return digest(JSON.stringify({
    body: content.markdown,
    name: propertyText(page.properties['Skill name']),
    description: propertyText(page.properties.Description),
    origin: propertyText(page.properties.Origin),
    path: propertyText(page.properties['Source path']),
    files: (page.properties.Files?.files ?? []).map(fileIdentity),
  }));
}

async function snapshot(api, row) {
  return remoteSnapshot(row, await api.request('GET', `/pages/${row.id}/markdown`));
}

export function revisionGuard(row) {
  return digest(JSON.stringify({ state: propertyText(row.properties['Sync state']), parent: row.parent }));
}

export function receiptBaseMatches(receipt, row, skill) {
  return receipt?.format === 1 && receipt.pageId === row.id && receipt.source === skill.hash &&
    receipt.guard === revisionGuard(row) && JSON.stringify(receipt.baseline) === JSON.stringify(stateOf(row));
}

export async function planSync(api, config, skills, { repair = [], receipts = {} } = {}) {
  const rows = await api.listRows(config.dataSourceId);
  const indexed = rows.map(row => ({ row, state: stateOf(row), name: propertyText(row.properties['Skill name']) }));
  const conflicts = [];
  const actions = [];
  const names = new Set(skills.map(skill => skill.name));
  for (const { row, state } of indexed) {
    if (state?.repo === config.repository && !names.has(state.key)) conflicts.push(`Removed or renamed skill ${state.key} still owns page ${row.id}; retire it explicitly.`);
  }
  for (const name of repair) if (!names.has(name)) conflicts.push(`Unknown repair skill ${name}.`);
  for (const skill of skills) {
    const owned = indexed.filter(item => item.state?.repo === config.repository && item.state.key === skill.name);
    const adoptionId = config.adopt?.[skill.name];
    const adopt = adoptionId ? indexed.find(item => item.row.id.replaceAll('-', '') === adoptionId.replaceAll('-', '')) : undefined;
    const matches = owned.length ? owned : adopt ? [adopt] : [];
    const collisions = indexed.filter(item => item.name === skill.name && !matches.includes(item));
    if (matches.length > 1 || collisions.length) {
      conflicts.push(`Duplicate or unmanaged name ${skill.name}; review page IDs ${[...matches, ...collisions].map(item => item.row.id).join(', ')} and add an explicit adoption mapping if appropriate.`);
      continue;
    }
    if (!matches.length) {
      if (adoptionId) conflicts.push(`Adoption page ${adoptionId} for ${skill.name} is not in the target data source.`);
      else actions.push({ kind: 'create', skill });
      continue;
    }
    const { row, state, name } = matches[0];
    if (state && (state.repo !== config.repository || state.key !== skill.name)) {
      conflicts.push(`Page ${row.id} belongs to ${state.repo}/${state.key}; it cannot be adopted.`); continue;
    }
    if (!state && (name !== skill.name || propertyText(row.properties.Origin) !== skill.origin)) {
      conflicts.push(`Adoption name or Origin disagrees for ${skill.name} on page ${row.id}.`); continue;
    }
    const current = await snapshot(api, row);
    const repairing = repair.includes(skill.name);
    if (state && state.phase !== 'complete' && !repairing) {
      conflicts.push(`Incomplete publish for ${skill.name}. Inspect the page, then use --repair ${skill.name}.`); continue;
    }
    const imported = receiptBaseMatches(receipts[skill.name], row, skill) && receipts[skill.name].remote === current;
    if (state?.phase === 'complete' && state.remote !== current && !repairing && !imported) {
      conflicts.push(`Managed content for ${skill.name} was edited in Notion. Preserve the edit in Git before using --repair ${skill.name}.`); continue;
    }
    const kind = !state ? 'adopt' : repairing ? 'repair' : state.source === skill.hash && state.remote === current ? 'skip' : 'update';
    actions.push({ kind, skill, pageId: row.id, snapshot: current, guard: revisionGuard(row) });
  }
  return { actions, conflicts, ignored: indexed.filter(item => !item.state && !names.has(item.name)).length };
}

async function unchanged(api, action) {
  const row = await api.request('GET', `/pages/${action.pageId}`);
  if (revisionGuard(row) !== action.guard || await snapshot(api, row) !== action.snapshot) throw new Error(`${action.skill.name} changed since planning. Re-run the plan before publishing.`);
}

async function settle(api, result) {
  const task = result?.object === 'async_task' ? result : result?.async_task;
  if (!task) return result;
  let current = task;
  for (let count = 0; count < 60; count++) {
    if (current.status === 'succeeded') return current.result;
    if (current.status === 'failed') throw new Error('Notion background write failed. Inspect the page before repair.');
    await api.pause(Math.min(10000, Math.max(1000, (current.poll_after_seconds ?? 2) * 1000)));
    current = await api.request('GET', `/async_tasks/${task.id}`);
  }
  throw new Error('Notion background write did not finish in time. Inspect it before repair.');
}

export async function applyPlan(api, config, plan, { revision } = {}) {
  if (plan.conflicts.length) throw new Error(`Resolve ${plan.conflicts.length} sync conflict(s) before publishing.`);
  const actions = plan.actions.filter(action => action.kind !== 'skip');
  // Check every existing target before uploading anything, then recheck at each write.
  for (const action of actions) if (action.pageId) await unchanged(api, action);
  // Build every archive before mutations so local packaging failures cannot partially publish.
  const archives = new Map(actions.map(action => [action.skill.name, packSkill(action.skill)]));
  for (const action of actions) {
    const { skill } = action;
    if (action.pageId) await unchanged(api, action);
    const file = await api.upload(`${skill.name}.zip`, archives.get(skill.name));
    if (action.pageId) await unchanged(api, action);
    const pending = { repo: config.repository, key: skill.name, phase: 'pending', source: skill.hash, revision };
    const properties = {
      'Skill name': { title: [{ text: { content: skill.name } }] }, Description: rich(skill.description),
      Origin: rich(skill.origin), 'Source path': rich(skill.sourcePath), Files: { files: [file] },
      'Sync state': rich(JSON.stringify(pending)),
    };
    let id = action.pageId;
    if (id) {
      await api.request('PATCH', `/pages/${id}`, { properties: { 'Sync state': properties['Sync state'] } });
    } else {
      // allow_async is valid only with an inline markdown body; omission is synchronous.
      const created = await settle(api, await api.request('POST', '/pages', { parent: { data_source_id: config.dataSourceId }, properties }));
      id = created?.id;
      if (!id) throw new Error(`No page ID returned for ${skill.name}; re-plan before retrying.`);
    }
    const sourceUrl = `https://github.com/${config.repository}/blob/${revision}/${skill.sourcePath}/SKILL.md`;
    const body = `${skill.body}\n\n---\n\nPublished from [the original skill in Git](${sourceUrl}). Edits here sync back through a validated GitHub change.\n`;
    // Retain Notion's own normalized write result instead of guessing Markdown equivalence.
    const written = await settle(api, await api.request('PATCH', `/pages/${id}/markdown`, { type: 'replace_content', replace_content: { new_str: body }, allow_async: false }));
    if (written?.object !== 'page_markdown' || !written.markdown?.includes(sourceUrl)) throw new Error(`Notion content verification failed for ${skill.name}: missing write receipt or source revision.`);
    remoteSnapshot({ id, properties }, written);
    await api.request('PATCH', `/pages/${id}`, { properties });
    const row = await api.request('GET', `/pages/${id}`);
    for (const key of ['Skill name', 'Description', 'Origin', 'Source path']) {
      if (propertyText(row.properties[key]) !== propertyText(properties[key])) throw new Error(`Notion property verification failed for ${skill.name}: ${key}.`);
    }
    if (row.properties.Files?.files?.length !== 1 || row.properties.Files.files[0].name !== `${skill.name}.zip`) throw new Error(`Notion file verification failed for ${skill.name}.`);
    await api.verifyFile(row.properties.Files.files[0], archives.get(skill.name));
    const readback = await api.request('GET', `/pages/${id}/markdown`);
    if (readback.markdown !== written.markdown) throw new Error(`Notion content verification failed for ${skill.name}: readback differs from write receipt.`);
    const remote = remoteSnapshot(row, readback);
    const complete = { ...pending, phase: 'complete', remote };
    await api.request('PATCH', `/pages/${id}`, { properties: { 'Sync state': rich(JSON.stringify(complete)) } });
    const final = await api.request('GET', `/pages/${id}`);
    if (JSON.stringify(stateOf(final)) !== JSON.stringify(complete) || await snapshot(api, final) !== remote) throw new Error(`Final verification failed for ${skill.name}.`);
  }
  return actions.length;
}
