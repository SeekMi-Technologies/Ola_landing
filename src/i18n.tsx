import {
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ENGLISH } from './translations'
import { I18nContext, type Language } from './i18nContext'
import { pathForLanguage } from './routes'

const STORAGE_KEY = 'ola-language'
const normalizedEnglish = new Map(
  Object.entries(ENGLISH).map(([source, translated]) => [normalize(source), translated]),
)
const originalText = new WeakMap<Text, string>()
const internalTextUpdates = new WeakMap<Text, string>()
const originalAttributes = new WeakMap<Element, Map<string, string>>()
const translatedAttributes = ['aria-label', 'placeholder', 'title', 'alt'] as const

function normalize(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function translate(value: string) {
  const leading = value.match(/^\s*/)?.[0] ?? ''
  const trailing = value.match(/\s*$/)?.[0] ?? ''
  const core = normalize(value)
  if (!core) return value

  const direct = normalizedEnglish.get(core)
  if (direct) return `${leading}${direct}${trailing}`

  const showAll = core.match(/^显示全部 (\d+) 个问题$/)
  if (showAll) return `${leading}Show all ${showAll[1]} questions${trailing}`

  /* Strings that carry a runtime value. Each is emitted as a single text
     node so one pattern can rewrite the whole sentence — translating the
     fragments around an interpolation separately produced word order that
     only works in Chinese. */
  const composer = core.match(/^发消息到「(.+)」$/)
  if (composer) {
    const name = normalizedEnglish.get(composer[1]) ?? composer[1]
    return `${leading}Message ${name}${trailing}`
  }

  const replies = core.match(/^(\d+) 条回复$/)
  if (replies)
    return `${leading}${replies[1]} ${replies[1] === '1' ? 'reply' : 'replies'}${trailing}`

  const todos = core.match(/^任务清单 · 截至 (.+)$/)
  if (todos) return `${leading}todos as of ${todos[1]}${trailing}`

  return value
}

function escapeText(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeAttribute(value: string) {
  return escapeText(value).replace(/"/g, '&quot;')
}

/**
 * Turns the Chinese-source markup emitted by React SSR into the English
 * version that is written to dist. Keeping this transformation beside the
 * browser translator means static HTML and the interactive site use the
 * same dictionary and runtime-value rules.
 */
export function localizeMarkup(markup: string, language: Language) {
  const translatedText = language === 'en'
    ? markup.replace(/>([^<]+)</g, (match, value: string) => {
        const translated = translate(value)
        return translated === value ? match : `>${escapeText(translated)}<`
      })
    : markup

  const translatedAttributes = language === 'en'
    ? translatedText.replace(
        /\s(aria-label|placeholder|title|alt)="([^"]*)"/g,
        (match, attribute: string, value: string) => {
          const translated = translate(value)
          return translated === value
            ? match
            : ` ${attribute}="${escapeAttribute(translated)}"`
        },
      )
    : translatedText

  return translatedAttributes.replace(
    /\shref="(\/[^"]*)"/g,
    (match, href: string) => {
      const localized = pathForLanguage(href, language)
      return localized === href ? match : ` href="${localized}"`
    },
  )
}

function applyTextNode(node: Text, language: Language) {
  if (node.parentElement?.closest('[data-i18n-ignore]')) return
  if (!originalText.has(node)) originalText.set(node, node.nodeValue ?? '')
  const source = originalText.get(node) ?? ''
  const nextValue = language === 'en' ? translate(source) : source
  if (node.nodeValue === nextValue) return
  internalTextUpdates.set(node, nextValue)
  node.nodeValue = nextValue
}

function applyElementAttributes(element: Element, language: Language) {
  if (element.closest('[data-i18n-ignore]')) return
  let stored = originalAttributes.get(element)
  if (!stored) {
    stored = new Map<string, string>()
    originalAttributes.set(element, stored)
  }

  for (const attribute of translatedAttributes) {
    const current = element.getAttribute(attribute)
    if (current == null) continue
    if (!stored.has(attribute)) stored.set(attribute, current)
    const source = stored.get(attribute) ?? current
    const nextValue = language === 'en' ? translate(source) : source
    if (current !== nextValue) element.setAttribute(attribute, nextValue)
  }

  if (element.tagName === 'A') {
    const current = element.getAttribute('href')
    if (current?.startsWith('/') && !current.startsWith('//')) {
      if (!stored.has('href')) stored.set('href', current)
      const source = stored.get('href') ?? current
      const nextValue = pathForLanguage(source, language)
      if (current !== nextValue) element.setAttribute('href', nextValue)
    }
  }
}

function applyTree(root: Node, language: Language) {
  if (root.nodeType === Node.TEXT_NODE) {
    applyTextNode(root as Text, language)
    return
  }

  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) {
    return
  }

  if (root.nodeType === Node.ELEMENT_NODE) {
    applyElementAttributes(root as Element, language)
  }

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
  )
  let node = walker.nextNode()
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) applyTextNode(node as Text, language)
    else applyElementAttributes(node as Element, language)
    node = walker.nextNode()
  }
}

export function I18nProvider({
  children,
  defaultLanguage = 'en',
}: {
  children: ReactNode
  defaultLanguage?: Language
}) {
  /* English is the public/static default. Returning visitors who explicitly
     chose Chinese still begin in Chinese because the client mounts rather
     than hydrates the translated static markup. */
  const [language, setLanguage] = useState<Language>(defaultLanguage)

  useLayoutEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
    /* The tab title is set by <Seo>, which knows the route as well as the
       language — writing it here too meant every language switch replaced
       the current page's title with the home page's. index.html carries the
       Chinese home title so the tab reads correctly before React mounts. */

    applyTree(document.body, language)

    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === 'characterData') {
          const node = record.target as Text
          const expectedInternalValue = internalTextUpdates.get(node)
          if (expectedInternalValue != null && node.nodeValue === expectedInternalValue) {
            internalTextUpdates.delete(node)
            continue
          }
          internalTextUpdates.delete(node)
          originalText.set(node, node.nodeValue ?? '')
          applyTextNode(node, language)
          continue
        }

        for (const addedNode of record.addedNodes) applyTree(addedNode, language)
      }
    })

    observer.observe(document.body, {
      characterData: true,
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
