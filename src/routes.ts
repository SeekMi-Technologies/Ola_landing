/**
 * The site uses a small route table rather than a router dependency.
 * dependency. `pathname` is read once at mount and on popstate; nothing
 * else changes it, because every in-app link is a real <a href>.
 *
 * Every path has to serve index.html. Vite's dev server does this by
 * default (appType: 'spa'); for static hosts the rewrite is committed:
 * public/_redirects (Netlify / Cloudflare Pages) and vercel.json (Vercel).
 * Other hosts need the same rule — nginx `try_files $uri /index.html`.
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
