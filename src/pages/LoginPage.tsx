import { useState } from 'react'

import OlaLogo from '../components/OlaLogo'
import { LOGIN } from './loginData'

/**
 * /login — "which workspace?", not "who are you".
 *
 * Rendered WITHOUT the site nav and footer: an auth screen should not offer
 * the marketing bar. The logo is the way back.
 *
 * This used to be a list of identity-provider buttons (Feishu, Lark, Google,
 * Microsoft, GitHub). Those belong on the workspace's OWN sign-in screen —
 * every team is at {slug}.hl.olatech.ai, so the first thing this page has to
 * establish is which host to send you to. The providers appear once you are
 * there.
 *
 * The shape echoes that destination so the handoff does not jolt: wordmark
 * over a white card, a left-aligned heading with a line under it, a labelled
 * field, a full-width button. The tokens stay this site's — bone ground,
 * --radius-card, .btn-primary in ink — rather than the workspace's pale
 * green and dark-green button.
 */

/* The suffix is fixed and not editable — it is a label inside the field, not
   part of the value. */
const SUFFIX = '.hl.olatech.ai'

/* A workspace slug is one DNS label: letters, digits and hyphens. Paste a
   whole URL and this keeps the first label of it. */
function toSlug(raw: string) {
  const withoutScheme = raw.trim().toLowerCase().replace(/^https?:\/\//, '')
  return withoutScheme.split(/[./\s]/)[0].replace(/[^a-z0-9-]/g, '')
}

export default function LoginPage() {
  /* The field holds the slug itself, normalised on every keystroke, so what
     you see is exactly what gets used. Paste the whole URL and it collapses
     to the label; the raw text left sitting next to the fixed .hl.olatech.ai
     otherwise read as "gingiris.hl.olatech.ai.hl.olatech.ai". */
  const [slug, setSlug] = useState('')

  return (
    /* justify-center with symmetric padding: the stack was pinned to the top
       with pb-24, which left the whole lower half of the viewport empty under
       a 420px card. */
    <main className="flex min-h-screen flex-col items-center justify-center bg-bone px-6 py-12">
      <a href="/" className="flex items-center" aria-label="Ola 首页">
        {/* 32px, not 22: on the workspace's own sign-in the wordmark is about a
            fifth of the card's width, and at 22px over a 420px card it read as
            a favicon rather than the mark you just clicked through from. */}
        <OlaLogo className="h-8 w-auto text-ink" />
      </a>

      <div className="mt-10 w-full max-w-[420px]">
        <div className="rounded-[var(--radius-card)] bg-paper p-7 shadow-[var(--shadow-sm)] sm:p-9">
          <h1 className="text-[22px] font-semibold leading-[1.35] tracking-[-0.03em] text-ink">
            {LOGIN.title}
          </h1>
          <p className="mt-2 text-[15px] leading-[1.55] text-ink/60 text-pretty">{LOGIN.lead}</p>

          <form
            className="mt-7"
            onSubmit={(e) => {
              e.preventDefault()
              if (slug) window.location.href = `https://${slug}${SUFFIX}/`
            }}
          >
            <label htmlFor="team" className="block text-[14px] font-medium text-ink">
              {LOGIN.fieldLabel}
            </label>

            {/* One field, two parts: an input that grows and a fixed label.
                The ring is on the wrapper via focus-within, so the whole box
                lights up rather than just the text box inside it. */}
            <div className="mt-2 flex items-center rounded-[10px] border border-mist bg-paper px-4 py-3 transition-colors focus-within:border-signal">
              <input
                id="team"
                value={slug}
                onChange={(e) => setSlug(toSlug(e.target.value))}
                placeholder={LOGIN.placeholder}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-ash"
              />
              <span className="shrink-0 pl-1 text-[16px] font-medium text-ink" aria-hidden>
                {SUFFIX}
              </span>
            </div>

            <button
              type="submit"
              disabled={!slug}
              className="btn btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              {LOGIN.cta}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[14px] leading-[1.6] text-ink/60">
          {LOGIN.helpLead}
          <a href="/contact" className="underline underline-offset-2 hover:text-signal">
            {LOGIN.helpLink}
          </a>
        </p>
      </div>

    </main>
  )
}
