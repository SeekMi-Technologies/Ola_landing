/**
 * Content negotiation, checked against the test vectors published on
 * acceptmarkdown.com/guides/accept-parsing plus the real-browser header
 * that guide warns about. Run with `npm test`.
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'

import { negotiate, parseAccept, quality } from '../src/agent/negotiate'

const MD = 'text/markdown'
const HTML = 'text/html'
const BOTH = [HTML, MD]

function serve(accept: string | null, produces = BOTH) {
  const result = negotiate(accept, produces, HTML)
  return result.status === 'ok' ? result.mediaType : 406
}

test('spec vector: text/markdown → markdown', () => {
  assert.equal(serve('text/markdown'), MD)
})

test('spec vector: text/markdown, text/html;q=0.8 → markdown', () => {
  assert.equal(serve('text/markdown, text/html;q=0.8'), MD)
})

test('spec vector: text/html → html', () => {
  assert.equal(serve('text/html'), HTML)
})

test('spec vector: text/markdown;q=0, text/html → html', () => {
  assert.equal(serve('text/markdown;q=0, text/html'), HTML)
})

test('spec vector: text/markdown;q=0 with markdown only → 406', () => {
  assert.equal(serve('text/markdown;q=0', [MD]), 406)
})

test('spec vector: no Accept → default (html)', () => {
  assert.equal(serve(null), HTML)
  assert.equal(serve(''), HTML)
})

test('spec vector: */* → default (html)', () => {
  assert.equal(serve('*/*'), HTML)
})

test('a real Chrome header never matches the markdown branch', () => {
  const chrome = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
  assert.equal(serve(chrome), HTML)
})

test('q ranking beats list order', () => {
  assert.equal(serve('text/html;q=0.5, text/markdown'), MD)
})

test('specificity breaks ties: text/markdown outranks text/* at the same q', () => {
  assert.equal(serve('text/*;q=0.9, text/markdown;q=0.9'), MD)
})

test('text/* alone is a tie, and the tie goes to the default', () => {
  assert.equal(serve('text/*'), HTML)
})

test('an unsatisfiable Accept is 406 with the alternatives listed', () => {
  const result = negotiate('application/pdf', BOTH, HTML)
  assert.deepEqual(result, { status: 'not-acceptable', available: BOTH })
})

test('type names are case-insensitive', () => {
  assert.equal(serve('TEXT/Markdown'), MD)
})

test('parseAccept keeps q inside [0, 1] and defaults it to 1', () => {
  const [a, b, c] = parseAccept('text/markdown, text/html;q=2, image/*;q=-1')
  assert.equal(a.q, 1)
  assert.equal(b.q, 1)
  assert.equal(c.q, 0)
})

test('quality picks the most specific matching entry', () => {
  const prefs = parseAccept('*/*;q=0.1, text/*;q=0.5, text/markdown;q=0.9')
  assert.equal(quality(prefs, 'text/markdown').q, 0.9)
  assert.equal(quality(prefs, 'text/html').q, 0.5)
  assert.equal(quality(prefs, 'image/png').q, 0.1)
  assert.equal(quality([], 'text/html').q, 0)
})
