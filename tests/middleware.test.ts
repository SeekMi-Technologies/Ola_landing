/**
 * The edge middleware, exercised as a plain function. `@vercel/functions`
 * builds `next()` and `rewrite()` as ordinary Responses carrying
 * `x-middleware-*` headers, so what Vercel would do with each request can
 * be read straight off the Response.
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'

import middleware, { config } from '../middleware.ts'
import { NOT_FOUND_MARKDOWN } from '../src/agent/notFound.ts'

const request = (path: string, accept?: string) =>
  new Request(`https://olatech.ai${path}`, { headers: accept === undefined ? {} : { accept } })

test('a browser gets the HTML page, with Vary and an alternate link', () => {
  const chrome = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
  const response = middleware(request('/pricing', chrome))
  assert.equal(response.headers.get('x-middleware-next'), '1')
  assert.equal(response.headers.get('vary'), 'Accept')
  assert.equal(response.headers.get('link'), '<https://olatech.ai/pricing.md>; rel="alternate"; type="text/markdown"')
})

test('no Accept header at all still gets the HTML page', () => {
  const response = middleware(request('/'))
  assert.equal(response.headers.get('x-middleware-next'), '1')
  assert.equal(response.headers.get('vary'), 'Accept')
})

test('Accept: text/markdown on a real page rewrites to its .md twin', () => {
  const response = middleware(request('/pricing', 'text/markdown'))
  assert.equal(response.headers.get('x-middleware-rewrite'), 'https://olatech.ai/pricing.md')
  assert.equal(response.headers.get('content-type'), 'text/markdown; charset=utf-8')
  assert.equal(response.headers.get('vary'), 'Accept')
  assert.equal(response.headers.get('link'), '<https://olatech.ai/pricing>; rel="alternate"; type="text/html"')
})

test('the two roots map to index.md, trailing slash or not', () => {
  assert.equal(middleware(request('/', 'text/markdown')).headers.get('x-middleware-rewrite'), 'https://olatech.ai/index.md')
  assert.equal(middleware(request('/zh/', 'text/markdown')).headers.get('x-middleware-rewrite'), 'https://olatech.ai/zh/index.md')
})

test('markdown preferred by q-value, not just named, wins', () => {
  const response = middleware(request('/product', 'text/html;q=0.5, text/markdown'))
  assert.equal(response.headers.get('x-middleware-rewrite'), 'https://olatech.ai/product.md')
})

test('text/markdown;q=0 means never markdown', () => {
  const response = middleware(request('/product', 'text/markdown;q=0, text/html'))
  assert.equal(response.headers.get('x-middleware-next'), '1')
})

test('an unknown path asked for as markdown is a 404 with a markdown body', async () => {
  const response = middleware(request('/some-path-that-does-not-exist', 'text/markdown'))
  assert.equal(response.status, 404)
  assert.equal(response.headers.get('content-type'), 'text/markdown; charset=utf-8')
  assert.equal(response.headers.get('vary'), 'Accept')
  assert.equal(await response.text(), NOT_FOUND_MARKDOWN)
})

test('an unknown path asked for as HTML falls through to the static 404 page', () => {
  const response = middleware(request('/some-path-that-does-not-exist', 'text/html'))
  assert.equal(response.headers.get('x-middleware-next'), '1')
  assert.equal(response.headers.get('link'), null, 'a 404 must not advertise a twin')
})

test('an Accept nothing here can satisfy is 406, listing what exists', async () => {
  const response = middleware(request('/pricing', 'application/pdf'))
  assert.equal(response.status, 406)
  assert.equal(response.headers.get('content-type'), 'text/plain; charset=utf-8')
  assert.equal(response.headers.get('cache-control'), 'no-store')
  const body = await response.text()
  assert.match(body, /- text\/html/)
  assert.match(body, /- text\/markdown/)
  assert.match(body, /You requested: application\/pdf/)
})

test('the matcher leaves assets, machine files and the /en redirect tree alone', () => {
  const [pattern] = config.matcher
  const re = new RegExp(`^${pattern.replace(/\(\(\?!/, '(?:(?!').replace(/\)\.\*\)$/, ').*)')}$`)
  for (const runs of ['/', '/pricing', '/zh/product', '/nope', '/deeply/nested/path']) {
    assert.ok(re.test(runs), `${runs} should reach the middleware`)
  }
  for (const skips of ['/assets/index-abc.js', '/logos/slack.webp', '/pricing.md', '/llms.txt', '/robots.txt', '/sitemap.xml', '/og-image.png', '/en', '/en/pricing']) {
    assert.ok(!re.test(skips), `${skips} should bypass the middleware`)
  }
})
