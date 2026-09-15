/**
 * The 404 body an agent gets when it asked for Markdown.
 *
 * A browser gets 404.html, which the prerender writes. An agent that sent
 * `Accept: text/markdown` gets this instead — short, and pointing at the
 * three things that let it recover: the site map, llms.txt and the pages
 * that do exist. The build also writes it to dist/404.md so the two copies
 * come from one string.
 */
import { SITE_URL } from './site.js'

export const NOT_FOUND_MARKDOWN = `# Not found

There is no page at this path on ${SITE_URL}. Nothing was moved here; the address is either mistyped, or belonged to an earlier version of the site.

## Where to look instead

- [Site map](${SITE_URL}/sitemap.xml): every page, in both languages
- [llms.txt](${SITE_URL}/llms.txt): what Ola is, when to use it, and Markdown versions of each page
- [Home](${SITE_URL}/index.md) · [Features](${SITE_URL}/product.md) · [Integrations](${SITE_URL}/integrations.md) · [Pricing](${SITE_URL}/pricing.md) · [Contact](${SITE_URL}/contact.md)
- 中文：[首页](${SITE_URL}/zh/index.md) · [功能](${SITE_URL}/zh/product.md) · [集成](${SITE_URL}/zh/integrations.md) · [定价](${SITE_URL}/zh/pricing.md) · [联系我们](${SITE_URL}/zh/contact.md)

English pages live at the root; Chinese pages live under \`/zh\`. Every page is also available as Markdown by requesting it with \`Accept: text/markdown\`, or by appending \`.md\`.
`
