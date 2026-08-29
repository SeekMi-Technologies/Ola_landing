/**
 * The site uses a small route table rather than a router dependency.
 * dependency. `pathname` is read once at mount and on popstate; nothing
 * else changes it, because every in-app link is a real <a href>.
 *
 * In development every path serves index.html and this table decides what
 * renders; Vite does that by default (appType: 'spa').
 *
 * The production build does not rely on it. `npm run build` prerenders one
 * HTML file per route (see scripts/prerender.mjs), so /pricing is served as
 * dist/pricing/index.html and this table only takes over for client-side
 * navigation afterwards. A host therefore needs directory-index resolution
 * — Vercel and Netlify do it by default; nginx wants
 * `try_files $uri $uri/index.html /404.html`.
 */
export type Route = 'home' | 'integrations' | 'pricing' | 'product' | 'login' | 'contact' | 'notFound'

const PATHS: Record<string, Route> = {
  '/integrations': 'integrations',
  '/pricing': 'pricing',
  '/product': 'product',
  '/login': 'login',
  '/contact': 'contact',
  /* Keep old shared links working; App canonicalizes this to /product. */
  '/features': 'product',
}

export function routeFor(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '')
  if (path === '') return 'home'
  /* Anything unknown is a 404, not the home page: falling back to home meant
     a mistyped or retired URL rendered the home page at that address, and
     search engines indexed each of them as a duplicate of it. */
  return PATHS[path] ?? 'notFound'
}
