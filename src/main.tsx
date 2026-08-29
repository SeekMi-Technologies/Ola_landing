import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { I18nProvider } from './i18n.tsx'

const root = document.getElementById('root')!

const tree = (
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>
)

/* The build prerenders every route, so in production the root already holds
   markup and this attaches to it. It is empty in `vite dev`, and on any host
   that falls back to the bare index.html — hence the branch rather than
   hydrateRoot alone. */
if (root.firstElementChild) hydrateRoot(root, tree)
else createRoot(root).render(tree)
