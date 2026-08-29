import { useEffect } from 'react'

import { useI18n } from '../i18nContext'
import type { Route } from '../routes'

type Copy = { title: string; description: string }

export const COPY: Record<'en' | 'zh-CN', Record<Route, Copy>> = {
  'zh-CN': {
    home: {
      title: 'Ola — 你的新同事',
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

/* The origin every absolute URL is built from. Set in .env.production; the
   window fallback keeps preview deployments shareable, and the literal is
   what the prerender uses, where there is no window. */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ||
  (typeof window === 'undefined' ? 'https://olatech.ai' : window.location.origin)
).replace(/\/$/, '')

export const INDEXABLE: Route[] = ['home', 'product', 'integrations', 'pricing', 'contact']

function escapeAttribute(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

/* The same tags the component writes at runtime, as a string for the
   prerender to bake into each file. One copy table feeds both, so a crawler
   that does not run JS and one that does see the same thing. */
export function headTagsFor(route: Route, path: string, language: 'en' | 'zh-CN' = 'zh-CN') {
  const copy = COPY[language][route]
  const canonical = `${SITE_URL}${path}`
  const image = `${SITE_URL}/og-image.png`
  const robots = INDEXABLE.includes(route) ? 'index, follow' : 'noindex, nofollow'
  const meta: [string, string, string][] = [
    ['name', 'description', copy.description],
    ['name', 'robots', robots],
    ['property', 'og:type', 'website'],
    ['property', 'og:site_name', 'Ola'],
    ['property', 'og:title', copy.title],
    ['property', 'og:description', copy.description],
    ['property', 'og:url', canonical],
    ['property', 'og:locale', language === 'en' ? 'en_US' : 'zh_CN'],
    ['property', 'og:image', image],
    ['property', 'og:image:type', 'image/png'],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', copy.title],
    ['name', 'twitter:description', copy.description],
    ['name', 'twitter:image', image],
    ['name', 'twitter:image:alt', copy.title],
  ]

  return {
    title: copy.title,
    tags: [
      `<link rel="canonical" href="${escapeAttribute(canonical)}" />`,
      ...meta.map(
        ([attribute, key, content]) =>
          `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`,
      ),
    ].join('\n    '),
  }
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
    const siteUrl = SITE_URL
    const path = route === 'home' ? '/' : window.location.pathname
    const canonical = `${siteUrl}${path}`
    /* PNG, not the SVG source: X, LinkedIn, WhatsApp and WeChat all skip
       an SVG og:image and fall back to a bare link. */
    const image = `${siteUrl}/og-image.png`

    document.title = copy.title
    setCanonical(canonical)
    setMeta('name', 'description', copy.description)
    setMeta('name', 'robots', route === 'notFound' || route === 'login' ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', 'Ola')
    setMeta('property', 'og:title', copy.title)
    setMeta('property', 'og:description', copy.description)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:locale', language === 'en' ? 'en_US' : 'zh_CN')
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:image:type', 'image/png')
    setMeta('property', 'og:image:width', '1200')
    setMeta('property', 'og:image:height', '630')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', copy.title)
    setMeta('name', 'twitter:description', copy.description)
    setMeta('name', 'twitter:image', image)
    setMeta('name', 'twitter:image:alt', copy.title)
  }, [language, route])

  return null
}
