/**
 * Tells IndexNow the site changed.
 *
 * Google recrawls on its own schedule — there is no ping that shortcuts it,
 * only "Request indexing" in Search Console, which a person has to click.
 * Bing, Yandex and Seznam do take a push, and a good share of AI assistants
 * read Bing's index rather than fetching the page, so this is the one lever
 * that is scriptable.
 *
 * Run it after a deploy that changes titles, descriptions or copy:
 *
 *   npm run indexnow
 *
 * The key is public by design: IndexNow verifies ownership by fetching
 * https://olatech.ai/<key>.txt and checking it contains the same key.
 */
const KEY = 'd4661343378813c86199d7d644f1b514'
const HOST = 'olatech.ai'

const paths = ['/', '/zh', '/product', '/zh/product', '/integrations', '/zh/integrations', '/pricing', '/zh/pricing', '/contact', '/zh/contact']
const urlList = paths.map((path) => `https://${HOST}${path}`)

const keyCheck = await fetch(`https://${HOST}/${KEY}.txt`)
if (!keyCheck.ok) {
  console.error(`The key file is not live yet: https://${HOST}/${KEY}.txt returned ${keyCheck.status}.`)
  console.error('Deploy first — IndexNow rejects a submission it cannot verify.')
  process.exit(1)
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
})

console.log(`IndexNow: ${response.status} ${response.statusText}`)
console.log(urlList.map((url) => `  ${url}`).join('\n'))
if (response.status !== 200 && response.status !== 202) {
  console.error(await response.text())
  process.exit(1)
}
