import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ENGLISH } from './translations'
import { I18nContext, type Language } from './i18nContext'

const STORAGE_KEY = 'ola-language'
const normalizedEnglish = new Map(
  Object.entries(ENGLISH).map(([source, translated]) => [normalize(source), translated]),
)
const originalText = new WeakMap<Text, string>()
const internalTextUpdates = new WeakMap<Text, string>()
const originalAttributes = new WeakMap<Element, Map<string, string>>()
const translatedAttributes = ['aria-label', 'placeholder', 'title'] as const

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

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved === 'en' ? 'en' : 'zh-CN'
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language

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
