/**
 * What the build must have written. Runs after `npm run build`; every
 * public, machine-readable file the agent-readiness work depends on is
 * checked here rather than trusted.
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

import { PAGES, markdownPathFor } from '../src/agent/pages.ts'
import { NOT_FOUND_MARKDOWN } from '../src/agent/notFound.ts'
import { SITE_URL } from '../src/agent/site.ts'

const dist = join(import.meta.dirname, '..', 'dist')
const read = (path: string) => readFileSync(join(dist, path), 'utf8')

test('the build has run', () => {
  assert.ok(existsSync(join(dist, 'index.html')), 'run `npm run build` first')
})

test('every page has an HTML file and a Markdown twin', () => {
  for (const path of PAGES) {
    const html = path === '/' ? 'index.html' : `${path.slice(1)}/index.html`
    assert.ok(existsSync(join(dist, html)), `${html} missing`)
    const md = markdownPathFor(path).slice(1)
    assert.ok(existsSync(join(dist, md)), `${md} missing`)
  }
})

test('each Markdown twin names its source, its language and the other language', () => {
  for (const path of PAGES) {
    const md = read(markdownPathFor(path).slice(1))
    assert.match(md, new RegExp(`^<!-- Markdown twin of ${SITE_URL}${path === '/' ? '/' : path}\\.`), path)
    assert.match(md, /> Source: https:\/\/olatech\.ai\S* · Language: (en|zh-CN) · (中文|English): https:\/\/olatech\.ai/, path)
    assert.match(md, /^# .+/m, `${path}: no H1`)
    assert.ok(md.includes(`[llms.txt](${SITE_URL}/llms.txt)`), `${path}: no llms.txt pointer`)
  }
})

test('the Markdown twins carry no navigation, mock transcripts or bare relative links', () => {
  const home = read('index.md')
  assert.ok(!home.includes('Request access'), 'nav CTA leaked into the twin')
  assert.ok(!home.includes('09:03'), 'the fictional chat transcript leaked into the twin')
  assert.ok(!/\]\(\/(?!\/)/.test(home), 'a root-relative link survived')
  const pricing = read('pricing.md')
  assert.match(pricing, /^### What’s the difference between Free, Pro, and Max\?$/m)
})

test('every page links its Markdown twin and llms.txt from <head>', () => {
  for (const path of PAGES) {
    const html = read(path === '/' ? 'index.html' : `${path.slice(1)}/index.html`)
    assert.ok(
      html.includes(`<link rel="alternate" type="text/markdown" href="${SITE_URL}${markdownPathFor(path)}" />`),
      `${path}: no alternate link`,
    )
    assert.ok(html.includes('<link rel="describedby" type="text/plain" href="/llms.txt" />'), `${path}: no describedby`)
  }
})

test('404: real body, noindex, a Markdown twin, no alternate to a file that does not exist', () => {
  const html = read('404.html')
  assert.ok(html.includes('name="robots" content="noindex, nofollow"'))
  assert.ok(!html.includes('type="text/markdown"'))
  assert.equal(read('404.md'), NOT_FOUND_MARKDOWN)
  assert.match(NOT_FOUND_MARKDOWN, /^# Not found/)
  for (const pointer of ['/sitemap.xml', '/llms.txt', '/index.md', '/zh/index.md']) {
    assert.ok(NOT_FOUND_MARKDOWN.includes(`${SITE_URL}${pointer}`), `404.md does not point at ${pointer}`)
  }
})

test('llms.txt follows llmstxt.org and says when to use the product', () => {
  const text = read('llms.txt')
  const lines = text.split('\n')
  assert.match(lines[0], /^# Ola$/, 'H1 must be first')
  assert.match(lines[2], /^> /, 'blockquote summary must follow the H1')
  assert.match(text, /^## When to use Ola$/m)
  assert.match(text, /^## How to hand off$/m)
  assert.match(text, /^## Optional$/m)
  /* Every indexable page, in both languages, is linked to its .md twin. */
  for (const path of PAGES.filter((p) => !p.endsWith('/login'))) {
    assert.ok(text.includes(`](${SITE_URL}${markdownPathFor(path)})`), `llms.txt does not link ${path}`)
  }
  /* Link lines follow "- [name](url): note". */
  for (const line of lines.filter((l) => l.startsWith('- ['))) {
    assert.match(line, /^- \[[^\]]+\]\(https?:\/\/[^)]+\)(: .+)?$/, line)
  }
})

test('JSON-LD on the home page names and describes every entity', () => {
  const html = read('index.html')
  const block = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
  assert.ok(block, 'no JSON-LD block')
  const data = JSON.parse(block)
  assert.equal(data['@context'], 'https://schema.org')
  const types = data['@graph'].map((n: { '@type': string }) => n['@type'])
  assert.deepEqual(types, ['Organization', 'WebSite', 'SoftwareApplication'])
  for (const node of data['@graph']) {
    for (const key of ['name', 'description', 'url']) {
      assert.ok(typeof node[key] === 'string' && node[key].length > 0, `${node['@type']} lacks ${key}`)
    }
  }
  const app = data['@graph'][2]
  assert.equal(app.offers.length, 3)
  for (const offer of app.offers) assert.equal(offer.priceCurrency, 'USD')
  assert.ok(data['@graph'][0].sameAs.length >= 2)
})

test('robots.txt and sitemap.xml still describe the same site', () => {
  const robots = read('robots.txt')
  assert.match(robots, /^Sitemap: https:\/\/olatech\.ai\/sitemap\.xml$/m)
  assert.match(robots, /^Disallow: \/login$/m)
  const sitemap = read('sitemap.xml')
  for (const path of PAGES.filter((p) => !p.endsWith('/login'))) {
    assert.ok(sitemap.includes(`<loc>${SITE_URL}${path}</loc>`), `sitemap lacks ${path}`)
  }
  assert.ok(!sitemap.includes('/login'), 'sitemap must not list /login')
})
