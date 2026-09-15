import assert from 'node:assert/strict'
import { test } from 'node:test'

import { PAGES, canonicalPath, isKnownPage, markdownPathFor, languageOfPath } from '../src/agent/pages'

test('both language trees are listed, English first', () => {
  assert.deepEqual(PAGES.slice(0, 2), ['/', '/zh'])
  assert.ok(PAGES.includes('/pricing'))
  assert.ok(PAGES.includes('/zh/pricing'))
  assert.ok(PAGES.includes('/login'))
  assert.equal(PAGES.length, 12)
})

test('trailing slashes do not change what a path is', () => {
  assert.equal(canonicalPath('/pricing/'), '/pricing')
  assert.equal(canonicalPath('/'), '/')
  assert.equal(canonicalPath('/zh/'), '/zh')
  assert.ok(isKnownPage('/pricing/'))
  assert.ok(!isKnownPage('/nope'))
  assert.ok(!isKnownPage('/en/pricing'))
})

test('markdown twins follow llmstxt.org: index.md for directories, .md for pages', () => {
  assert.equal(markdownPathFor('/'), '/index.md')
  assert.equal(markdownPathFor('/zh'), '/zh/index.md')
  assert.equal(markdownPathFor('/product'), '/product.md')
  assert.equal(markdownPathFor('/zh/product/'), '/zh/product.md')
})

test('language is read from the tree', () => {
  assert.equal(languageOfPath('/zh/contact'), 'zh-CN')
  assert.equal(languageOfPath('/contact'), 'en')
})
