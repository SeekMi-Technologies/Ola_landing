import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

import { INTEGRATIONS, matchesIntegrationQuery } from '../src/pages/integrationsData'

const dist = join(import.meta.dirname, '..', 'dist')
const read = (path: string) => readFileSync(join(dist, path), 'utf8')

test('Slack and Teams are presented as coming soon', () => {
  for (const name of ['Slack', 'Microsoft Teams']) {
    const integration = INTEGRATIONS.find((item) => item.name === name)
    assert.ok(integration, `${name} is missing from the catalogue`)
    assert.ok(integration.comingSoon, `${name} must be marked coming soon`)
  }
  assert.equal(INTEGRATIONS.filter((item) => !item.comingSoon).length, 5)
  assert.equal(INTEGRATIONS.filter((item) => item.comingSoon).length, 10)
})

test('integration statuses are localized in both prerendered pages', () => {
  const english = read('integrations/index.html')
  const chinese = read('zh/integrations/index.html')
  assert.ok(english.includes('<span>available</span>'))
  assert.ok(english.includes('<span>coming soon</span>'))
  assert.ok(english.includes('>Coming soon</span>'))
  assert.ok(!english.includes('>个可用<'))
  assert.ok(!english.includes('>个即将支持<'))
  assert.ok(chinese.includes('<span>个可用</span>'))
  assert.ok(chinese.includes('<span>个即将支持</span>'))
})

test('integration search matches text visible in either language', () => {
  const slack = INTEGRATIONS.find((item) => item.name === 'Slack')!
  assert.ok(matchesIntegrationQuery(slack, 'channel'))
  assert.ok(matchesIntegrationQuery(slack, 'Chat and collaboration'))
  assert.ok(matchesIntegrationQuery(slack, '频道'))
  assert.ok(!matchesIntegrationQuery(slack, 'invoice'))
})

test('the active desktop navigation link identifies the current page', () => {
  assert.match(read('pricing/index.html'), /href="\/pricing" aria-current="page"/)
  assert.match(read('zh/pricing/index.html'), /href="\/zh\/pricing" aria-current="page"/)
})

test('the home demo exposes real tabs without fake sidebar buttons', () => {
  const home = read('index.html')
  assert.ok(home.includes('role="tablist" aria-label="Ola work examples"'))
  assert.ok(home.includes('role="tabpanel"'))
  const rail = home.match(/<aside aria-hidden="true"[\s\S]*?<\/aside>/)?.[0]
  assert.ok(rail)
  assert.ok(!rail.includes('<button'))
})
