import { StrictMode } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { I18nProvider } from './i18n.tsx'
import { languageForPath } from './routes.ts'

const root = document.getElementById('root')!

const tree = (
  <StrictMode>
    <I18nProvider defaultLanguage={languageForPath(window.location.pathname)}>
      <App />
    </I18nProvider>
  </StrictMode>
)

/* The build writes English SSR markup, while the React components keep
   Chinese as their authoring/source language and translate text nodes in a
   layout effect. Hydrating those two different trees would be invalid. Keep
   the static English visible until this module runs, then replace and mount
   synchronously: React's commit and the translation layout effect complete
   before the browser can paint an intermediate Chinese frame. */
root.replaceChildren()
const clientRoot = createRoot(root)
flushSync(() => clientRoot.render(tree))
