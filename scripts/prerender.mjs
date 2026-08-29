/**
 * Writes a real HTML file for every route.
 *
 * The site is a single-page app: one index.html, and the router, the copy
 * and the meta tags all arrive as JavaScript. Google runs that JavaScript;
 * Bing, Baidu, and the crawlers behind WeChat, Feishu and Slack link
 * previews largely do not, so to them every route looked like the same
 * empty shell with the home page's title.
 *
 * This runs after `vite build` (the client bundle) and `vite build --ssr`
 * (the same components compiled for Node). For each route it renders the
 * page to a string, injects it into the built index.html along with that
 * route's own <title> and meta tags, and writes dist/<route>/index.html.
 * The client then hydrates that markup instead of replacing it.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const { PAGES, render, renderNotFound } = await import(
  join(root, 'dist-ssr', 'entry-server.js')
)

const template = await readFile(join(dist, 'index.html'), 'utf8')

/* The template already carries the home page's title and meta. Strip the
   ones this script writes per route so nothing is declared twice. */
const shell = template
  .replace(/\n\s*<title>[\s\S]*?<\/title>/, '\n    <!--head-->')
  /* `\s+` after <meta, not a space: index.html writes the description with
     its attributes on their own lines, and a single-space pattern left it
     behind — two description tags in every prerendered file. */
  .replace(/\n\s*<meta\s+name="description"[\s\S]*?\/>/, '')
  .replace(/\n\s*<meta\s+name="robots"[\s\S]*?\/>/, '')
  .replace(/\n\s*<meta\s+property="og:[\s\S]*?\/>/g, '')
  .replace(/\n\s*<meta\s+name="twitter:[\s\S]*?\/>/g, '')

if (!shell.includes('<!--head-->')) {
  throw new Error('prerender: could not find the <title> to replace in index.html')
}

async function writePage(path, page) {
  const html = shell
    .replace('<!--head-->', `<title>${page.title}</title>\n    ${page.tags}`)
    .replace('<div id="root"></div>', `<div id="root">${page.html}</div>`)

  for (const tag of ['name="description"', 'rel="canonical"', '<title>']) {
    const count = html.split(tag).length - 1
    if (count !== 1) throw new Error(`prerender: ${path} has ${count} of ${tag}`)
  }

  const file =
    path === '/404' ? join(dist, '404.html') : join(dist, path, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
  return { path, bytes: html.length }
}

const written = []
for (const path of PAGES) written.push(await writePage(path, render(path)))
written.push(await writePage('/404', renderNotFound()))

const width = Math.max(...written.map((page) => page.path.length))
for (const { path, bytes } of written) {
  console.log(`  ${path.padEnd(width)}  ${(bytes / 1024).toFixed(1)} kB`)
}
console.log(`prerendered ${written.length} pages`)
