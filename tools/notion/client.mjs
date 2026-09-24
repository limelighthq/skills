import { createHash } from 'node:crypto';
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

export class NotionClient {
  constructor({ token, fetch: fetcher = fetch, pause: wait = pause, interval = 350 } = {}) {
    if (!token) throw new Error('Set NOTION_API_TOKEN to a Limelight Notion connection token.');
    this.token = token;
    this.fetch = fetcher;
    this.pause = wait;
    this.interval = interval;
  }

  async request(method, path, body, { readOnly = method === 'GET' } = {}) {
    if (!/^\/[a-z_]+(?:\/[a-zA-Z0-9_-]+)*$/.test(path)) throw new Error('Invalid Notion API path.');
    const url = new URL(`https://api.notion.com/v1${path}`);
    for (let attempt = 0; attempt < 4; attempt++) {
      await this.pause(this.interval);
      let response;
      let result;
      try {
        response = await this.fetch(url, {
          method, redirect: 'error', signal: AbortSignal.timeout(30000),
          headers: { Authorization: `Bearer ${this.token}`, 'Notion-Version': '2026-03-11',
            ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }) },
          body: body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body),
        });
        if (response.ok) result = await response.json();
      } catch {
        if (readOnly && attempt < 3) { await this.pause(1000 * 2 ** attempt); continue; }
        throw new Error(`Notion network failure during ${method} ${path}. Re-plan before retrying writes.`);
      }
      if (response.ok && result?.object !== 'error') return result;
      // A 429 means the operation was rejected; other write failures may have committed.
      if ((response.status === 429 || (readOnly && response.status >= 500)) && attempt < 3) {
        const seconds = Number(response.headers.get('retry-after'));
        await this.pause(Math.min(60000, Math.max(1000 * 2 ** attempt, Number.isFinite(seconds) ? seconds * 1000 : 0)));
        continue;
      }
      throw new Error(`Notion HTTP ${response.status} during ${method} ${path}. Check connection access and the workflow runbook.`);
    }
  }

  async listRows(id) {
    const rows = [];
    const cursors = new Set();
    let cursor;
    do {
      const page = await this.request('POST', `/data_sources/${id}/query`, { page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) }, { readOnly: true });
      if (!Array.isArray(page.results) || typeof page.has_more !== 'boolean') throw new Error('Invalid Notion inventory response.');
      rows.push(...page.results);
      if (!page.has_more) return rows;
      if (!page.next_cursor || cursors.has(page.next_cursor)) throw new Error('Incomplete Notion pagination. No changes made.');
      cursor = page.next_cursor;
      cursors.add(cursor);
    } while (true);
  }

  async upload(name, bytes) {
    const upload = await this.request('POST', '/file_uploads', { mode: 'single_part', filename: name, content_type: 'application/zip' });
    if (!upload.id) throw new Error('Notion did not return an upload ID.');
    const data = new FormData();
    data.append('file', new Blob([bytes], { type: 'application/zip' }), name);
    const sent = await this.request('POST', `/file_uploads/${upload.id}/send`, data);
    if (sent.status !== 'uploaded') throw new Error('Notion upload is incomplete. No page was updated.');
    return { name, type: 'file_upload', file_upload: { id: upload.id } };
  }

  async downloadFile(file, limit = 20 * 1024 * 1024) {
    let url;
    try { url = new URL(file.file?.url); } catch { throw new Error('Missing Notion storage URL.'); }
    if (url.protocol !== 'https:' || url.username || url.password || url.port ||
        !(/(^|\.)amazonaws\.com$/.test(url.hostname) || /(^|\.)notion\.so$/.test(url.hostname))) {
      throw new Error('Unsupported Notion storage URL. No download attempted.');
    }
    try {
      const response = await this.fetch(url, { redirect: 'error', signal: AbortSignal.timeout(30000) });
      if (!response.ok || !response.body) throw new Error();
      const chunks = [];
      let size = 0;
      for await (const chunk of response.body) {
        size += chunk.length;
        if (size > limit) throw new Error();
        chunks.push(chunk);
      }
      return Buffer.concat(chunks);
    } catch { throw new Error('Notion file download failed or exceeded its size limit.'); }
  }

  async verifyFile(file, expected) {
    let url;
    try { url = new URL(file.file?.url); } catch { throw new Error('Missing Notion storage URL for archive verification.'); }
    if (url.protocol !== 'https:' || url.username || url.password || url.port ||
        !(/(^|\.)amazonaws\.com$/.test(url.hostname) || /(^|\.)notion\.so$/.test(url.hostname))) {
      throw new Error('Unsupported Notion storage URL. No download attempted.');
    }
    try {
      const response = await this.fetch(url, { redirect: 'error', signal: AbortSignal.timeout(30000) });
      if (!response.ok || !response.body) throw new Error();
      const hash = createHash('sha256');
      let size = 0;
      for await (const chunk of response.body) {
        size += chunk.length;
        if (size > expected.length) throw new Error();
        hash.update(chunk);
      }
      if (size !== expected.length || hash.digest('hex') !== createHash('sha256').update(expected).digest('hex')) throw new Error();
    } catch { throw new Error('Notion archive verification failed. The uploaded bytes do not match or could not be read.'); }
  }
}
