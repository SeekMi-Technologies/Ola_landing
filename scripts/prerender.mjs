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
 * The client keeps it visible until JavaScript mounts the interactive app.
 *
 * It also writes a Markdown twin of every page (dist/<route>.md, or
 * index.md for the two roots) and dist/404.md, converted from the same
 * rendered markup with nav, footer and the illustrative chat mock-ups left
 * out. middleware.ts serves those to clients that ask for
 * `Accept: text/markdown`; llms.txt links to them directly.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { gfm } from '@joplin/turndown-plugin-gfm'
import TurndownService from 'turndown'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const { PAGES, SITE_URL, NOT_FOUND_MARKDOWN, markdownPathFor, render, renderNotFound } =
  await import(join(root, 'dist-ssr', 'entry-server.js'))

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
  .replace(/\n\s*<link\s+rel="alternate"[\s\S]*?\/>/g, '')

if (!shell.includes('<!--head-->')) {
  throw new Error('prerender: could not find the <title> to replace in index.html')
}

/* Markdown from the rendered <main>. Turndown with the GFM plugin (tables,
   strikethrough); anything decorative or interactive is dropped rather
   than turned into stray text. */
const turndown = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
})
turndown.use(gfm)
turndown.remove(['script', 'style', 'svg', 'input', 'textarea', 'select', 'picture'])
/* The FAQ questions are <button>s inside their <h3>: keep those words. Any
   other button — filter chips, the demo's tab rail, disclosure toggles —
   is a control with nothing to say once the page is text. */
turndown.addRule('buttonControl', {
  filter: (node) => node.nodeName === 'BUTTON',
  replacement: () => '',
})
/* Added after, because Turndown consults rules newest-first. */
turndown.addRule('buttonText', {
  filter: (node) => node.nodeName === 'BUTTON' && Boolean(node.closest('h1, h2, h3, h4')),
  replacement: (content) => content,
})
/* Tailwind lays cards out with `block`/`flex` spans. Turndown only knows
   the tag, so those ran together — "Coming soonChat and collaborationSlack".
   A span the stylesheet displays as a block is a block here too. */
turndown.addRule('blockSpan', {
  filter: (node) =>
    node.nodeName === 'SPAN' && /(^|\s)(block|flex|grid)(\s|$)/.test(node.getAttribute('class') ?? ''),
  replacement: (content) => (content.trim() ? `\n\n${content.trim()}\n\n` : ''),
})
/* A simple card — an <article> with no heading or list of its own — is one
   fact with a few labels (the integration tiles: status, category, name).
   One bullet per card reads better than three orphan lines. */
turndown.addRule('cardArticle', {
  filter: (node) =>
    node.nodeName === 'ARTICLE' && !node.querySelector('h1, h2, h3, h4, ul, ol, table, p'),
  replacement: (content) => {
    const parts = content.split('\n').map((line) => line.trim()).filter(Boolean)
    return parts.length ? `\n- ${parts.join(' — ')}\n` : ''
  },
})
/* A <br> inside a heading is a typographic break, not a line of content. */
turndown.addRule('softBreak', {
  filter: 'br',
  replacement: () => ' ',
})
/* Padded inline spans are chips (Feishu · Lark · WhatsApp). Without this
   they ran together as one word. */
turndown.addRule('chip', {
  filter: (node) =>
    node.nodeName === 'SPAN' && /(^|\s)px-[\d.]+(\s|$)/.test(node.getAttribute('class') ?? ''),
  replacement: (content) => (content.trim() ? `${content.trim()} ` : ''),
})
turndown.addRule('skipped', {
  filter: (node) =>
    node.nodeType === 1 &&
    (node.hasAttribute('data-agent-skip') || node.getAttribute('aria-hidden') === 'true'),
  replacement: () => '',
})
/* <img> carries the brand name of a logo; the picture itself is nothing
   to an agent. Keep the alt as text, drop the file. */
turndown.addRule('imgAlt', {
  filter: 'img',
  replacement: (_content, node) => {
    const alt = node.getAttribute('alt')?.trim()
    return alt ? alt : ''
  },
})

function pageMarkdown(path, page) {
  const main = page.html.match(/<main[\s\S]*?<\/main>/)?.[0]
  if (!main) throw new Error(`prerender: no <main> in ${path}`)

  const body = turndown
    .turndown(main)
    /* Relative links are meaningless once the file is read outside a
       browser. Root-relative → absolute; the two hosts' external links
       are already absolute. */
    .replace(/\]\(\/(?!\/)/g, `](${SITE_URL}/`)
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  const canonical = `${SITE_URL}${path === '/404' ? '' : path}`
  const other = page.language === 'en' ? `/zh${path === '/' ? '' : path}` : path.replace(/^\/zh/, '') || '/'
  const otherLabel = page.language === 'en' ? '中文' : 'English'

  return [
    `<!-- Markdown twin of ${canonical}. Generated at build; the HTML is the canonical page. -->`,
    '',
    `> ${page.title} — ${page.description}`,
    `> Source: ${canonical} · Language: ${page.language} · ${otherLabel}: ${SITE_URL}${other}`,
    '',
    body,
    '',
    '---',
    '',
    `[llms.txt](${SITE_URL}/llms.txt) · [Site map](${SITE_URL}/sitemap.xml) · [Contact](${SITE_URL}/contact.md)`,
    '',
  ].join('\n')
}

async function writeMarkdown(path, page) {
  const file = join(dist, markdownPathFor(path))
  await mkdir(dirname(file), { recursive: true })
  const markdown = pageMarkdown(path, page)
  await writeFile(file, markdown)
  return { path: markdownPathFor(path), bytes: markdown.length }
}

async function writePage(path, page) {
  const html = shell
    .replace('<html lang="en">', `<html lang="${page.language}">`)
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
for (const path of PAGES) {
  const page = render(path)
  written.push(await writePage(path, page))
  written.push(await writeMarkdown(path, page))
}
written.push(await writePage('/404', renderNotFound()))
await writeFile(join(dist, '404.md'), NOT_FOUND_MARKDOWN)
written.push({ path: '/404.md', bytes: NOT_FOUND_MARKDOWN.length })

const width = Math.max(...written.map((page) => page.path.length))
for (const { path, bytes } of written) {
  console.log(`  ${path.padEnd(width)}  ${(bytes / 1024).toFixed(1)} kB`)
}
console.log(`prerendered ${written.length} files`)
