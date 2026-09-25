import test from 'node:test';
import assert from 'node:assert/strict';
import { NotionClient } from '../tools/notion/client.mjs';

test('HTTP retries a rate-limited read and honors Retry-After', async () => {
  const waits = [];
  let calls = 0;
  const api = new NotionClient({ token: 'do-not-log-me', pause: async ms => waits.push(ms), interval: 0,
    fetch: async (url, init) => {
      assert.equal(url.origin, 'https://api.notion.com');
      assert.equal(init.headers.Authorization, 'Bearer do-not-log-me');
      calls++;
      return calls === 1 ? new Response('{}', { status: 429, headers: { 'Retry-After': '2' } }) : Response.json({ id: 'ok' });
    },
  });
  assert.deepEqual(await api.request('GET', '/users/me'), { id: 'ok' });
  assert.ok(waits.includes(2000));
});

test('an ambiguous page creation is not retried and error bodies cannot leak secrets', async () => {
  let calls = 0;
  const api = new NotionClient({ token: 'do-not-log-me', interval: 0,
    fetch: async () => { calls++; return new Response('do-not-log-me https://signed-url.example', { status: 500 }); },
  });
  await assert.rejects(api.request('POST', '/pages', { markdown: 'private' }), error => {
    assert.match(error.message, /500/);
    assert.doesNotMatch(error.message, /do-not-log-me|private|signed-url/);
    return true;
  });
  assert.equal(calls, 1);
});

test('inventory follows all pages and rejects incomplete pagination', async () => {
  const bodies = [];
  const api = new NotionClient({ token: 'test', interval: 0, fetch: async (_, init) => {
    const body = JSON.parse(init.body); bodies.push(body);
    return Response.json(body.start_cursor ? { results: [{ id: 'two' }], has_more: false, next_cursor: null }
      : { results: [{ id: 'one' }], has_more: true, next_cursor: 'next' });
  } });
  assert.deepEqual((await api.listRows('db')).map(r => r.id), ['one', 'two']);
  assert.equal(bodies[1].start_cursor, 'next');
  const broken = new NotionClient({ token: 'test', interval: 0, fetch: async () => Response.json({ results: [], has_more: true, next_cursor: null }) });
  await assert.rejects(broken.listRows('db'), /pagination/i);
});

test('Notion credentials never follow redirects or arbitrary request paths', async () => {
  const api = new NotionClient({ token: 'test', interval: 0, fetch: async (_, init) => {
    assert.equal(init.redirect, 'error');
    throw new Error('redirect https://secret.example/token');
  } });
  await assert.rejects(api.request('POST', '/pages', {}), /network/i);
  await assert.rejects(api.request('GET', 'https://other.example'), /path/i);
});

test('archive verification checks bytes and sends no API credentials to storage', async () => {
  const api = new NotionClient({ token: 'never-send-to-storage', interval: 0, fetch: async (url, init) => {
    assert.equal(new URL(url).hostname, 's3.us-west-2.amazonaws.com');
    assert.equal(init.headers?.Authorization, undefined);
    assert.equal(init.redirect, 'error');
    return new Response('correct zip bytes');
  } });
  const file = { name: 'hello.zip', type: 'file', file: { url: 'https://s3.us-west-2.amazonaws.com/notion-temporary-files/hello.zip?signature=hidden' } };
  await api.verifyFile(file, Buffer.from('correct zip bytes'));
  await assert.rejects(api.verifyFile(file, Buffer.from('wrong zip bytes')), /archive verification/i);
  await assert.rejects(api.verifyFile({ file: { url: 'http://localhost/secret' } }, Buffer.from('')), /storage URL/i);
});
