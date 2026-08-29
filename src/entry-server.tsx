import { renderToString } from 'react-dom/server'

import App from './App'
import { I18nProvider, localizeMarkup } from './i18n'
import { INDEXABLE, headTagsFor } from './components/Seo'
import { languageForPath, pathForLanguage, routeFor } from './routes'

/* The routes the build writes a file for. The indexable five plus /login,
   which is a real page people are sent to, and the 404 body that a host
   can serve for anything else. Both carry noindex from headTagsFor. */
const ENGLISH_PAGES: string[] = [...INDEXABLE.map((route) =>
  route === 'home' ? '/' : `/${route}`,
), '/login']
export const PAGES: string[] = ENGLISH_PAGES.flatMap((path) => [
  path,
  pathForLanguage(path, 'zh-CN'),
])

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
    ...headTagsFor(route, path, language),
  }
}

/* The 404 body, rendered once for a path nothing matches. */
export function renderNotFound() {
  return render('/__not-found__')
}
