/**
 * Every path the build writes a file for, and where its Markdown twin
 * lives. One list feeds the prerender (which writes both files), the
 * middleware (which decides whether a path is real before it negotiates),
 * llms.txt and the tests — so none of them can disagree about what exists.
 *
 * Pure: no React, no DOM. The middleware bundles it for the edge.
 */
import { INDEXABLE_ROUTES, pathForLanguage, type SiteLanguage } from '../routes.js'

const ENGLISH_PAGES: string[] = [
  ...INDEXABLE_ROUTES.map((route) => (route === 'home' ? '/' : `/${route}`)),
  '/login',
]

/** Both language trees, English first. */
export const PAGES: string[] = ENGLISH_PAGES.flatMap((path) => [
  path,
  pathForLanguage(path, 'zh-CN'),
])

/** Normalise an incoming path the way the host does before matching:
 *  strip a trailing slash (Vercel's trailingSlash:false) and collapse a
 *  bare `/zh/` to `/zh`. */
export function canonicalPath(pathname: string) {
  const stripped = pathname.replace(/\/+$/, '')
  return stripped === '' ? '/' : stripped
}

export function isKnownPage(pathname: string) {
  return PAGES.includes(canonicalPath(pathname))
}

/**
 * The Markdown file for a page, following llmstxt.org: a directory URL
 * gets `index.md` under it, a page URL gets `.md` in place of its
 * (absent) extension. `/` → `/index.md`, `/zh` → `/zh/index.md`,
 * `/product` → `/product.md`, `/zh/product` → `/zh/product.md`.
 */
export function markdownPathFor(pathname: string) {
  const path = canonicalPath(pathname)
  if (path === '/' || path === '/zh') return `${path === '/' ? '' : path}/index.md`
  return `${path}.md`
}

export function languageOfPath(pathname: string): SiteLanguage {
  const path = canonicalPath(pathname)
  return path === '/zh' || path.startsWith('/zh/') ? 'zh-CN' : 'en'
}
