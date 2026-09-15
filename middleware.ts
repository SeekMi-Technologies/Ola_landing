/**
 * Vercel Routing Middleware — runs at the edge before the filesystem.
 *
 * One job: content negotiation over `Accept`, so an agent that asks for
 * Markdown gets the Markdown twin the build wrote next to every page, and
 * every negotiated response carries `Vary: Accept` so a CDN never hands a
 * browser the Markdown variant or an agent the HTML one.
 *
 * Why middleware and not vercel.json: rewrites there run after the
 * filesystem check, so a static `/pricing` would always win and the `.md`
 * would never be reached. This runs first.
 *
 * Decisions, per RFC 9110 and acceptmarkdown.com:
 *   - no Accept, or `*∕*`               → HTML (the default), Vary: Accept
 *   - text/markdown preferred, page exists → rewrite to its .md, Vary: Accept
 *   - text/markdown preferred, no page  → 404 with a Markdown body
 *   - nothing we produce is acceptable   → 406 listing what exists
 *
 * Non-page requests (assets, the .md and .txt files themselves, the /en
 * redirect tree) never enter this file — see `config.matcher`.
 */
/* The subpath, not the package root: the root re-exports the Node-only
   helpers (OIDC, database pooling, a dynamic require) and the edge bundler
   refuses them. `middleware.js` is just next() and rewrite(). */
import { next, rewrite } from '@vercel/functions/middleware'

import { negotiate } from './src/agent/negotiate.ts'
import { NOT_FOUND_MARKDOWN } from './src/agent/notFound.ts'
import { canonicalPath, isKnownPage, markdownPathFor } from './src/agent/pages.ts'
import { SITE_URL } from './src/agent/site.ts'

const HTML = 'text/html'
const MARKDOWN = 'text/markdown'
const PRODUCES = [HTML, MARKDOWN]

const MARKDOWN_TYPE = 'text/markdown; charset=utf-8'

function alternateLink(path: string) {
  return `<${SITE_URL}${markdownPathFor(path)}>; rel="alternate"; type="text/markdown"`
}

export default function middleware(request: Request) {
  const url = new URL(request.url)
  const path = canonicalPath(url.pathname)
  const accept = request.headers.get('accept')
  const choice = negotiate(accept, PRODUCES, HTML)

  if (choice.status === 'not-acceptable') {
    return new Response(
      `This resource is available in:\n${choice.available.map((type) => `- ${type}`).join('\n')}\n\nYou requested: ${accept}\n`,
      {
        status: 406,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
          Vary: 'Accept',
        },
      },
    )
  }

  if (choice.mediaType === HTML) {
    /* Let the filesystem answer — the prerendered page, or 404.html — and
       tell caches the answer depended on Accept. Only real pages get the
       alternate link; a 404 has no Markdown twin to point at. */
    const headers: Record<string, string> = { Vary: 'Accept' }
    if (isKnownPage(path)) headers.Link = alternateLink(path)
    return next({ headers })
  }

  if (!isKnownPage(path)) {
    return new Response(NOT_FOUND_MARKDOWN, {
      status: 404,
      headers: {
        'Content-Type': MARKDOWN_TYPE,
        'Cache-Control': 'public, max-age=0, must-revalidate',
        Vary: 'Accept',
      },
    })
  }

  return rewrite(new URL(markdownPathFor(path), request.url), {
    headers: {
      'Content-Type': MARKDOWN_TYPE,
      Vary: 'Accept',
      Link: `<${SITE_URL}${path}>; rel="alternate"; type="text/html"`,
    },
  })
}

export const config = {
  /* Page paths only. Everything with a file extension — the client bundle,
     images, the .md twins, llms.txt, robots.txt, sitemap.xml — and the
     /en redirect tree bypass negotiation entirely. */
  matcher: ['/((?!en(?:/|$)|assets/|logos/|.*\\.[a-z0-9]{2,5}$).*)'],
}
