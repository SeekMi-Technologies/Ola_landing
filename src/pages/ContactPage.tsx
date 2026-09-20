import { useState } from 'react'

import PageHero from '../components/PageHero'
import { useI18n } from '../i18nContext'
import { CHANNELS, HERO, NEXT, PICKER } from './contactData'

/**
 * /contact.
 *
 * The page started as a port of a reference layout — a black grid band
 * holding a platform picker, a primary button and a numbered install list.
 * The picker is gone with it: down to two channels, both are simply open,
 * one card each. The rest is the site's own — PageHero on bone, white
 * cards, the closing-band grammar the other interior pages settled on.
 *
 * Each channel shows its address directly rather than a CTA button; a
 * channel with no `handle` in contactData renders a visible 「待补充」 slot
 * instead of a link that goes nowhere.
 */

function CornerArrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0" aria-hidden>
      <path
        d="M5 11 11 5m0 0H6.2M11 5v4.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* Card marks for the three onward links, in the drawing language the rest of
   the site uses: a 96x64 field, one hue at three opacities, nothing outlined. */
const NEXT_ART: Record<string, React.ReactNode> = {
  /* A tapered stack of cards — "the whole list of what he can take on".
     Same construction as the coins below: one object, three layers, the
     top one solid. */
  signal: (
    <>
      <rect x="10" y="38" width="76" height="18" rx="9" className="fill-signal opacity-25" />
      <rect x="15" y="25" width="66" height="18" rx="9" className="fill-signal opacity-50" />
      <rect x="20" y="12" width="56" height="18" rx="9" className="fill-signal" />
    </>
  ),
  /* Three overlapping discs — separate tools linked into one run. The bars
     and blob this replaced were two unrelated ideas in one frame. */
  clay: (
    <>
      <circle cx="30" cy="32" r="20" className="fill-clay opacity-25" />
      <circle cx="48" cy="32" r="20" className="fill-clay opacity-50" />
      <circle cx="66" cy="32" r="20" className="fill-clay" />
    </>
  ),
  gold: (
    <>
      {/* Pricing, not protection: the shield-and-bar this used to be read as
          security. Three coins instead — one hue, three opacities. */}
      <ellipse cx="48" cy="46" rx="30" ry="10" className="fill-gold opacity-25" />
      <ellipse cx="48" cy="34" rx="30" ry="10" className="fill-gold opacity-50" />
      <ellipse cx="48" cy="22" rx="30" ry="10" className="fill-gold" />
    </>
  ),
}

/* Channel marks. The 24px brand glyphs that used to head these cards were
   the odd ones out on the page — a filled envelope and the WeChat logo next
   to everything else's flat 96x64 fields. Redrawn in that language instead:
   one hue at three opacities, nothing outlined. */
const CHANNEL_ART: Record<string, React.ReactNode> = {
  /* A sheet of paper with two lines on it and a small tail — the same
     stacking as the coins and the card stack elsewhere on the site. Every
     envelope version failed the same way: it needs internal structure to
     read at 64px, and without outlines that structure turns into a wedge
     sitting inside a rectangle. */
  email: (
    <>
      {/* No tail on it: the sketch had one, but sitting next to WeChat's two
          bubbles it turned this into a third bubble. A plain sheet keeps the
          two cards distinct. */}
      <rect x="8" y="6" width="80" height="52" rx="12" className="fill-signal opacity-25" />
      <rect x="20" y="22" width="56" height="8" rx="4" className="fill-signal opacity-55" />
      <rect x="20" y="36" width="34" height="8" rx="4" className="fill-signal" />
    </>
  ),
  /* Grouped by opacity, not per shape: the tail and its bubble are one
     translucent object, so their overlap no longer composites twice and
     shows a seam across the corner. The tail also starts inside the bubble
     now rather than butting against its edge. */
  wechat: (
    <>
      <g className="opacity-25">
        <rect x="6" y="8" width="52" height="32" rx="13" className="fill-clay" />
      </g>
      <g className="opacity-50">
        <rect x="36" y="22" width="54" height="32" rx="13" className="fill-clay" />
        <path d="M46 44v18l15-13Z" className="fill-clay" />
      </g>
      <circle cx="55" cy="38" r="4" className="fill-clay" />
      <circle cx="71" cy="38" r="4" className="fill-clay" />
    </>
  ),
}

function WeChatHandle({ handle }: { handle: string }) {
  const { language } = useI18n()
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const isEnglish = language === 'en'

  async function copyHandle() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(handle)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }
  }

  return (
    <div className="mt-1" data-i18n-ignore>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="select-all font-mono text-[17px] text-ink">{handle}</p>
        <button
          type="button"
          onClick={copyHandle}
          aria-label={isEnglish ? 'Copy WeChat ID' : '复制微信号'}
          className="rounded-md border border-mist/80 px-2.5 py-1 text-[12px] font-medium text-ink/70 transition-colors hover:border-ink/30 hover:bg-linen hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal motion-reduce:transition-none"
        >
          {isEnglish ? 'Copy' : '复制'}
        </button>
      </div>
      <p role="status" className="mt-1 min-h-[18px] text-[12px] text-ink/65">
        {copyStatus === 'copied'
          ? (isEnglish ? 'Copied to clipboard' : '已复制到剪贴板')
          : copyStatus === 'failed'
            ? (isEnglish ? 'Could not copy. Please select the ID above.' : '复制失败，请手动选择上面的微信号')
            : ''}
      </p>
    </div>
  )
}

function Channels() {
  return (
    <section className="bg-bone pb-16 pt-16 md:pb-20 md:pt-24">
      <div className="shell">
        <h2 className="t-heading-lg">{PICKER.title}</h2>
        <p className="t-subheading mt-4 max-w-[620px] text-ink/65 text-pretty">{PICKER.lead}</p>

        {/* Both channels open, side by side. The numbered "how to" column
            each card carried is gone: with the address right there, the
            steps were telling you how to send an email. */}
        <div className="mt-8 grid gap-4 md:mt-10 md:gap-5 lg:grid-cols-2">
          {CHANNELS.map((channel) => (
            <div
              key={channel.id}
              className="motion-info-card flex flex-col rounded-[var(--radius-card)] bg-paper p-7 shadow-[var(--shadow-sm)] sm:p-9"
            >
              <svg viewBox="0 0 96 64" className="h-16 w-24" aria-hidden>
                {CHANNEL_ART[channel.id]}
              </svg>

              <h3 className="mt-6 text-[22px] font-medium tracking-[-0.02em] text-ink">
                {channel.howTitle}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-ink/55 text-pretty">
                {channel.note}
              </p>

              {/* The address itself, or an honest gap where it will go. */}
              <p className="mt-6 border-t border-mist/70 pt-5 text-[13px] text-ink/45">
                {channel.label}
              </p>
              {channel.handle ? (
                /* An address you can act on: mail addresses open the
                   composer, anything else (a WeChat ID) stays selectable
                   text. */
                channel.id === 'wechat' ? (
                  <WeChatHandle handle={channel.handle} />
                ) : (
                  <p className="mt-1 select-all font-mono text-[17px] text-ink">
                    <a
                      href={`mailto:${channel.handle}`}
                      className="underline underline-offset-2 transition-colors hover:text-signal focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal motion-reduce:transition-none"
                    >
                      {channel.handle}
                    </a>
                  </p>
                )
              ) : (
                <span className="mt-2 inline-flex rounded-full bg-mist/60 px-2.5 py-1 text-[12px] font-medium text-ink/55">
                  地址待补充
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Next() {
  return (
    <section className="border-t border-mist/70 bg-bone py-16 md:py-20">
      <div className="shell">
        <h2 className="t-heading-lg">{NEXT.title}</h2>

        <div className="mt-10 grid gap-4 md:mt-12 md:gap-5 lg:grid-cols-3">
          {NEXT.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="motion-link-card group flex flex-col rounded-[var(--radius-card)] bg-paper p-7 shadow-[var(--shadow-sm)] transition-colors hover:bg-linen"
            >
              <svg viewBox="0 0 96 64" className="h-16 w-24" aria-hidden>
                {NEXT_ART[item.tone]}
              </svg>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[18px] font-medium tracking-[-0.015em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-ink/65 text-pretty">
                    {item.body}
                  </p>
                </div>
                <span className="mt-1 shrink-0 text-ink/35 transition-colors group-hover:text-ink group-focus-visible:text-ink">
                  <CornerArrow />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <main>
      <PageHero title={HERO.title} />
      <Channels />
      <Next />
    </main>
  )
}
