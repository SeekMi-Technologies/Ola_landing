import { useEffect } from 'react'

import { useI18n } from '../i18nContext'
import type { Route } from '../routes'

type Copy = { title: string; description: string }

const COPY: Record<'en' | 'zh-CN', Record<Route, Copy>> = {
  'zh-CN': {
    home: {
      title: 'Ola — 你的新同事。',
      description: 'Ola 是团队的新成员：在飞书、GitHub、Notion 等已有工具里，把你交代的事做完。',
    },
    product: {
      title: '功能｜Ola',
      description: '了解 Ola 如何在权限之内连接团队工具、执行任务，并把结果交回原来的工作流。',
    },
    integrations: {
      title: '集成｜Ola',
      description: '把 Ola 连接到团队已在使用的沟通、研发、文档和业务工具中。',
    },
    pricing: {
      title: '定价｜Ola',
      description: '查看 Ola 的 Free、Pro 和 Max 方案，按团队所需的额度和支持方式选择。',
    },
    contact: {
      title: '联系我们｜Ola',
      description: '联系 Ola 团队，讨论如何让 AI 在现有工作流中完成实际工作。',
    },
    login: {
      title: '登录｜Ola',
      description: '登录 Ola，开始在团队已有的工作流中协作。',
    },
    notFound: {
      title: '页面不存在｜Ola',
      description: '你访问的 Ola 页面不存在或已下线。',
    },
  },
  en: {
    home: {
      title: 'Ola - Your New Favorite Hire',
      description: 'Ola is the teammate that gets work done across the tools your team already uses.',
    },
    product: {
      title: 'Features | Ola',
      description: 'See how Ola works inside your permissions, connects your tools, and returns finished work.',
    },
    integrations: {
      title: 'Integrations | Ola',
      description: 'Connect Ola to the communication, engineering, knowledge, and business tools your team already uses.',
    },
    pricing: {
      title: 'Pricing | Ola',
      description: 'Explore Free, Pro, and Max plans for teams that want an AI teammate to get real work done.',
    },
    contact: {
      title: 'Contact us | Ola',
      description: 'Talk to the Ola team about putting an AI teammate to work in your existing workflow.',
    },
    login: {
      title: 'Log in | Ola',
      description: 'Log in to Ola and start working with your team in the tools you already use.',
    },
    notFound: {
      title: 'Page not found | Ola',
      description: 'The Ola page you requested does not exist or is no longer available.',
    },
  },
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }
  element.href = href
}

export default function Seo({ route }: { route: Route }) {
  const { language } = useI18n()

  useEffect(() => {
    const copy = COPY[language][route]
    // VITE_SITE_URL should be set to the production origin at deployment.
    // The origin fallback keeps previews and review deployments shareable.
    const siteUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '')
    const path = route === 'home' ? '/' : window.location.pathname
    const canonical = `${siteUrl}${path}`
    const image = `${siteUrl}/og-image.svg`

    document.title = copy.title
    setCanonical(canonical)
    setMeta('name', 'description', copy.description)
    setMeta('name', 'robots', route === 'notFound' || route === 'login' ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', 'Ola')
    setMeta('property', 'og:title', copy.title)
    setMeta('property', 'og:description', copy.description)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:image:type', 'image/svg+xml')
    setMeta('property', 'og:image:width', '1200')
    setMeta('property', 'og:image:height', '630')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', copy.title)
    setMeta('name', 'twitter:description', copy.description)
    setMeta('name', 'twitter:image', image)
  }, [language, route])

  return null
}
