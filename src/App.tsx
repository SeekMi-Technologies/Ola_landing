import { useEffect, useState } from 'react'

import { routeFor } from './routes'
import Seo from './components/Seo'
import IntegrationsPage from './pages/IntegrationsPage'
import PricingPage from './pages/PricingPage'
import ProductPage from './pages/FeaturesPage'
import LoginPage from './pages/LoginPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import Control from './components/Control'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Integrations from './components/Integrations'
import Nav from './components/Nav'
import Pillars from './components/Pillars'
import Pricing from './components/Pricing'
import Workspace from './components/Workspace'

export default function App() {
  const [route, setRoute] = useState(() => routeFor(window.location.pathname))

  useEffect(() => {
    if (window.location.pathname.replace(/\/+$/, '') === '/features') {
      window.history.replaceState(
        null,
        '',
        `/product${window.location.search}${window.location.hash}`,
      )
    }

    const onPop = () => setRoute(routeFor(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  /* No nav, no footer: an auth screen has no business offering the
     marketing bar, which is also how the original sits on its own
     subdomain. The logo on the page is the way back. */
  if (route === 'login') {
    return (
      <>
        <Seo route={route} />
        <LoginPage />
      </>
    )
  }

  if (route !== 'home') {
    const Page =
      route === 'integrations'
        ? IntegrationsPage
        : route === 'pricing'
          ? PricingPage
          : route === 'contact'
            ? ContactPage
            : route === 'notFound'
              ? NotFoundPage
              : ProductPage
    return (
      <>
        <Seo route={route} />
        <Nav />
        <Page />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Seo route={route} />
      <Nav />
      {/* Product story: demo → workflow → collaboration → capabilities →
          control → integrations → pricing → FAQ. */}
      <main>
        <Hero />
        <HowItWorks />
        <Workspace />
        <Pillars />
        <Control />
        <Integrations />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
