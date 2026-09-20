import { useState } from 'react'

import OlaLogo from '../components/OlaLogo'
import { useI18n } from '../i18nContext'
import { LOGIN } from './loginData'

/* Authentication still happens in the team's own workspace. This page only
   finds that workspace; it must never collect or forward a password. */
const SUFFIX = '.hl.olatech.ai'

function toSlug(raw: string) {
  const withoutScheme = raw.trim().toLowerCase().replace(/^https?:\/\//, '')
  return withoutScheme.split(/[./\s]/)[0].replace(/[^a-z0-9-]/g, '')
}

type Theme = 'system' | 'light' | 'dark'

function MonitorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M9 21h6M12 17v4" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
    </svg>
  )
}

export default function LoginPage() {
  const [slug, setSlug] = useState('')
  const [theme, setTheme] = useState<Theme>('system')
  const { language } = useI18n()

  return (
    <main className={`login-screen login-theme-${theme} flex min-h-screen flex-col items-center px-5 pb-10 pt-[clamp(64px,12vh,112px)]`}>
      <a href="/" className="login-logo" aria-label="Ola 首页">
        <OlaLogo className="h-8 w-auto" />
      </a>

      <div className="login-card mt-7 w-full max-w-[420px] p-6 sm:p-[26px]">
        <h1 className="text-[24px] font-semibold leading-[1.25] tracking-[-0.03em]" data-i18n-ignore>
          {language === 'en' ? 'Sign in' : LOGIN.title}
        </h1>
        <p className="login-muted mt-1.5 text-[14px] leading-[1.5]">{LOGIN.lead}</p>

        <form
          className="mt-5"
          onSubmit={(event) => {
            event.preventDefault()
            if (slug) window.location.assign(`https://${slug}${SUFFIX}/`)
          }}
        >
          <label htmlFor="team" className="block text-[14px] font-medium">
            {LOGIN.fieldLabel}
          </label>
          <div className="login-field mt-2 flex h-11 items-center px-3">
            <input
              id="team"
              type="text"
              value={slug}
              onChange={(event) => setSlug(toSlug(event.target.value))}
              placeholder={LOGIN.placeholder}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-[15px] outline-none"
            />
            <span className="login-suffix shrink-0 pl-1 text-[14px]" aria-hidden>
              {SUFFIX}
            </span>
          </div>

          <button type="submit" disabled={!slug} className="login-submit mt-4 h-9 w-full text-[14px] font-medium">
            {LOGIN.cta}
          </button>
        </form>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2" data-i18n-ignore>
        <div className="login-switch" role="group" aria-label={language === 'en' ? 'Language' : '语言'}>
          <a href="/zh/login" data-locale-link className="login-switch-option" aria-current={language === 'zh-CN' ? 'page' : undefined} lang="zh-CN">
            中文
          </a>
          <a href="/login" data-locale-link className="login-switch-option" aria-current={language === 'en' ? 'page' : undefined} lang="en">
            EN
          </a>
        </div>
        <div className="login-switch" role="group" aria-label={language === 'en' ? 'Appearance' : '外观'}>
          {([
            { id: 'system', label: language === 'en' ? 'Use system setting' : '跟随系统', icon: <MonitorIcon /> },
            { id: 'light', label: language === 'en' ? 'Light' : '浅色', icon: <SunIcon /> },
            { id: 'dark', label: language === 'en' ? 'Dark' : '深色', icon: <MoonIcon /> },
          ] as const).map((option) => (
            <button
              key={option.id}
              type="button"
              className="login-switch-option login-icon-button"
              aria-label={option.label}
              aria-pressed={theme === option.id}
              onClick={() => setTheme(option.id)}
            >
              {option.icon}
            </button>
          ))}
        </div>
      </div>

      <p className="login-muted mt-6 text-center text-[13px] leading-[1.5]">
        {LOGIN.helpLead}
        <a href="/contact" className="ml-1 underline underline-offset-2 hover:text-current">
          {LOGIN.helpLink}
        </a>
      </p>
    </main>
  )
}
