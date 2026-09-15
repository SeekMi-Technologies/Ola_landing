/** The canonical origin, for code that runs where there is no window and
 *  no Vite — the edge middleware and node:test. Seo.tsx derives its own
 *  from VITE_SITE_URL; keep the two in step (.env.production). */
export const SITE_URL = 'https://olatech.ai'
