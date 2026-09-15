import { renderToString } from 'react-dom/server'

import App from './App'
import { I18nProvider, localizeMarkup } from './i18n'
import { COPY, headTagsFor } from './components/Seo'
import { languageForPath, routeFor } from './routes'

/* The page list lives in src/agent/pages.ts so the edge middleware, the
   prerender and the tests all read the same one. Re-exported here, with
   the other pieces the prerender script needs, because that script only
   imports this bundle. */
export { PAGES, markdownPathFor } from './agent/pages'
export { NOT_FOUND_MARKDOWN } from './agent/notFound'
export { SITE_URL } from './agent/site'

export function render(path: string) {
  const route = routeFor(path)
  const language = languageForPath(path)
  const sourceMarkup = renderToString(
    <I18nProvider defaultLanguage={language}>
      <App initialPath={path} />
    </I18nProvider>,
  )
  return {
    html: localizeMarkup(sourceMarkup, language),
    language,
    description: COPY[language][route].description,
    ...headTagsFor(route, path, language),
  }
}

/* The 404 body, rendered once for a path nothing matches. */
export function renderNotFound() {
  return render('/__not-found__')
}
