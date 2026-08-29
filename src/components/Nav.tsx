import { useEffect, useRef, useState } from 'react'
import { useI18n, type Language } from '../i18nContext'
import { IconCheck } from './icons'
import OlaLogo from './OlaLogo'
import { APPLY_URL, CHANGELOG_URL, DOCS_URL } from '../links'

/* Three entries, mapped to the dedicated pages. The sections dropped from
   the bar — how-it-works, workspace, security, faq — still render on the
   home page; they just no longer have a nav entry. */
const MENU = [
  { label: '功能', href: '/product' },
  { label: '集成', href: '/integrations' },
  { label: '定价', href: '/pricing' },
]

const LANGUAGES: { id: Language; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'zh-CN', label: '简体中文' },
]

function Logo() {
  return (
    <a href="/" className="flex items-center" aria-label="Ola 首页">
      <OlaLogo className="h-5 w-auto text-ink" />
    </a>
  )
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9S14.4 18.5 12 21M12 3C9.6 5.5 8.4 8.5 8.4 12S9.6 18.5 12 21" />
    </svg>
  )
}

function LanguageMenu() {
  const [open, setOpen] = useState(false)
  const { language, setLanguage } = useI18n()
  const rootRef = useRef<HTMLDivElement>(null)
  const currentLabel = LANGUAGES.find((item) => item.id === language)?.label

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  function selectLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="relative" data-i18n-ignore>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex h-10 items-center gap-2 rounded-[var(--radius-btn)] px-2 text-[15px] text-ink transition-colors hover:bg-bone hover:text-ink sm:px-2.5"
      >
        <GlobeIcon />
        <span className="hidden whitespace-nowrap lg:inline">{currentLabel}</span>
        <svg
          viewBox="0 0 12 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`hidden h-2 w-3 transition-transform lg:block ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          <path d="m1 1.5 5 5 5-5" />
        </svg>
        <span className="sr-only sm:hidden">选择语言</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+10px)] w-44 overflow-hidden rounded-[14px] border border-mist bg-paper p-2 shadow-md"
        >
          {LANGUAGES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              onClick={() => selectLanguage(item.id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[15px] transition-colors hover:bg-bone ${
                item.id === language ? 'text-ink' : 'text-ink/60'
              }`}
            >
              {item.label}
              {item.id === language && (
                <IconCheck className="h-4 w-4 shrink-0 text-signal" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden>
      {open ? (
        <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      ) : (
        <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      )}
    </svg>
  )
}

/* The sheet below md.
   Shape: a dark utility strip for the
   off-site links, then the primary destinations as full-width rows with
   generous tap targets, then a footer row pairing the quiet account link
   with the one primary action. Tokens and type stay this site's.

   It sits below `md` now, not `lg`: iPad portrait is 768 and had no reason
   to be on the phone menu — see the nav row for what had to give in the
   English build to make that fit. */
function MobileMenu() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function closeOnOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  /* The bar is sticky, so the sheet has to stop where the viewport does
     rather than run under it. */
  return (
    <div ref={rootRef} className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="菜单"
        className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-btn)] text-ink transition-colors hover:bg-bone"
      >
        <MenuIcon open={open} />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-[66px] max-h-[calc(100dvh-66px)] overflow-y-auto overscroll-contain border-b border-mist/70 bg-paper shadow-md">
          {/* Utility strip: everything that leaves the site.

              `.theme-dark` rather than `bg-ink`: ink is a token, so at
              night it inverted and the strip came out as a pale bar with
              dark text — the opposite of what it is for. Pinning the scope
              keeps it dark in both themes, the way the footer does it. */}
          <div className="theme-dark bg-bone">
            <div className="shell flex items-center gap-6 py-3">
              {[
                ['文档', DOCS_URL],
                ['更新日志', CHANGELOG_URL],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.08em] text-ink/75 transition-colors hover:text-ink"
                >
                  {label}
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 shrink-0"
                    aria-hidden
                  >
                    <path d="M3.5 8.5 8.5 3.5M4.2 3.5h4.3v4.3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav className="shell flex flex-col pt-2">
            {/* The rule sits on the row, the hover pill inside it: a
                rounded box with only a bottom border leaves the rule
                floating short of both ends. */}
            {MENU.map((item) => (
              <div key={item.href} className="border-b border-mist/60">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="-mx-3 block rounded-[10px] px-3 py-4 text-[18px] tracking-[-0.01em] text-ink transition-colors hover:bg-bone"
                >
                  {item.label}
                </a>
              </div>
            ))}

            {/* Account row. 申请使用 is not repeated here: the bar keeps its
                own button on screen while the sheet is open, so the sheet
                showed the same call to action twice, 60px apart. */}
            <div className="flex items-center py-5">
              <a
                href="/login"
                onClick={() => setOpen(false)}
                className="-mx-3 rounded-[10px] px-3 py-2 text-[16px] text-ink/70 transition-colors hover:bg-bone hover:text-ink"
              >
                登录
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

export default function Nav() {
  return (
    <header className="sticky top-0 z-50">
      {/* Main nav */}
      <div className="relative border-b border-mist/70 bg-paper">
        {/* 65.36px in the Figma; 66 here. */}
        <div className="shell flex h-[66px] items-center justify-between gap-6">
          {/* Figma 519:20249 sets the links 35px after the wordmark rather
              than floating them between the two ends: logo at x=40 ending at
              110, first link at x=145. So logo and nav are one left-hand
              group, and justify-between now only separates that group from
              the account cluster. */}
          <div className="flex shrink-0 items-center gap-[35px]">
            <Logo />

            {/* 14px Medium, -0.28px tracking, rgba(48,44,44,.8), 23.6px apart. */}
            {/* gap-0 and -ml-3: each link now carries 12px of its own padding, so
                zero gap leaves the Figma's 23.6px between the words themselves,
                and the negative margin keeps the first word where it was. */}
            <nav className="hidden items-center gap-0 -ml-3 md:flex">
              {MENU.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  /* Same hover pill as the footer: bone, the page's own
                     ground, on the bar's paper. */
                  className="-my-2 whitespace-nowrap rounded-[10px] px-3 py-2 text-[14px] font-medium tracking-[-0.02em] text-ink/80 transition-colors hover:bg-bone hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Same 24.7px rhythm as the Figma's Download / Log in / button. The
              account links sit a step dimmer than the nav links there — .8 of
              an already .8 ink — which is what keeps the left side primary. */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-5">
            <LanguageMenu />
            <a
              href="/login"
              className="hidden -my-2 whitespace-nowrap rounded-[10px] px-3 py-2 text-[14px] font-medium tracking-[-0.01em] text-ink/65 transition-colors hover:bg-bone hover:text-ink sm:inline-block"
            >
              登录
            </a>
            {/* The form lives in the Feishu wiki, off this domain. */}
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              申请使用
            </a>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
