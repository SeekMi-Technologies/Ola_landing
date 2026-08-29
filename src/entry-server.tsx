import { renderToString } from 'react-dom/server'

import App from './App'
import { I18nProvider } from './i18n'
import { INDEXABLE, headTagsFor } from './components/Seo'
import { routeFor } from './routes'

/* The routes the build writes a file for. The indexable five plus /login,
   which is a real page people are sent to, and the 404 body that a host
   can serve for anything else. Both carry noindex from headTagsFor. */
export const PAGES: string[] = [...INDEXABLE.map((route) =>
  route === 'home' ? '/' : `/${route}`,
), '/login']

export function render(path: string) {
  const route = routeFor(path)
  return {
    html: renderToString(
      <I18nProvider>
        <App initialPath={path} />
      </I18nProvider>,
    ),
    ...headTagsFor(route, path),
  }
}

/* The 404 body, rendered once for a path nothing matches. */
export function renderNotFound() {
  return render('/__not-found__')
}
