import { useMemo, useState } from 'react'

import {
  CATEGORIES,
  INTEGRATIONS,
  type CategoryId,
  type Integration,
} from './integrationsData'
import PageHero from '../components/PageHero'

/**
 * /integrations — structure after Figma node 519:7487 (the reference layout's
 * integrations page), rebuilt in the site's own language rather than
 * the reference's.
 *
 * What changed from the literal port:
 *  - Raw hexes (#302c2c, #787676, #f6f4f2, white grounds) became tokens.
 *    The literal version was self-consistently light and simply ignored
 *    dark mode; bone/paper/ink/mist flip with the theme.
 *  - 72px / 36px / 24px type became .t-heading-lg / .t-subheading and the
 *    site's own small scale, so the page sits in the same typographic
 *    system as every home-page section.
 *  - Logos are the home page's own set from public/logos, with the same
 *    <picture> treatment that swaps monochrome marks per theme.
 *  - The category rail and the search box actually filter. In the Figma
 *    they are a static screenshot; a directory that cannot be filtered is
 *    the one thing this page is for.
 */


function Mark({
  logo,
  logoDark,
  className,
}: {
  logo: string
  logoDark?: string
  className: string
}) {
  return (
    <picture className={className}>
      <source srcSet={logoDark ?? logo} media="(prefers-color-scheme: dark)" />
      <img src={logo} alt="" aria-hidden className="h-full w-full object-contain" />
    </picture>
  )
}

function Hero() {
  return (
    <PageHero title="集成" />
  )
}

function Card({ item }: { item: Integration }) {
  const category = CATEGORIES.find((c) => c.id === item.category)!
  return (
    <article
      className="relative flex min-h-[164px] flex-col rounded-[18px] border border-mist/70 bg-paper p-5 transition-colors hover:border-signal/35 sm:min-h-[172px]"
    >
      {item.comingSoon && (
        <span className="absolute right-5 top-5 rounded-full bg-signal/10 px-2.5 py-1 text-[10px] font-medium tracking-[0.04em] text-signal">
          Coming soon
        </span>
      )}
      <span className="flex h-11 w-11 shrink-0 items-center justify-start">
        <Mark
          logo={item.logo}
          logoDark={item.logoDark}
          className={`flex items-center justify-start ${item.wordmark ? 'h-[28px] w-[74px]' : 'h-[42px] w-[42px]'}`}
        />
      </span>

      <span className="mt-auto min-w-0 text-left">
        <span className="block text-[12px] font-medium text-ash">{category.name}</span>
        <span className="mt-1.5 block text-[18px] font-medium tracking-[-0.02em] text-ink">
          {item.name}
        </span>
      </span>
    </article>
  )
}

/* The one card in the wall that is an action rather than a tool, so it
   keeps the dashed border — but it now has the same skeleton as its
   neighbours: a 44px slot at the top-left, then the eyebrow and title
   positions the tool cards use. Before this it carried a 32px chip against
   their 44px marks and a right-floated link, which made it the only card in
   the grid whose two text lines did not sit on the others' baselines.

   The whole card is the link: it used to be an <article> with a dead
   href="#" inside it, and /contact exists now. */
function NeedMoreCard() {
  return (
    <a
      href="/contact"
      className="group relative flex min-h-[164px] flex-col rounded-[18px] border border-dashed border-ash/45 p-5 transition-colors hover:border-signal/50 sm:min-h-[172px]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-start">
        <span
          className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] border border-dashed border-ash/45 text-[22px] font-light leading-none text-ash transition-colors group-hover:border-signal/50 group-hover:text-signal"
          aria-hidden
        >
          +
        </span>
      </span>

      <span className="mt-auto min-w-0 text-left">
        <span className="block text-[12px] font-medium text-ash">没找到？</span>
        <span className="mt-1.5 block text-[18px] font-medium tracking-[-0.02em] text-ink transition-colors group-hover:text-signal">
          告诉我们你还想接什么
        </span>
      </span>
    </a>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="h-[16px] w-[16px]" aria-hidden>
      <circle cx="8" cy="8" r="5.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="m12.2 12.2 3.2 3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function Directory() {
  const [active, setActive] = useState<CategoryId | 'all'>('all')
  const [query, setQuery] = useState('')

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return INTEGRATIONS.filter((i) => {
      if (active !== 'all' && i.category !== active) return false
      if (!q) return true
      return (
        i.name.toLowerCase().includes(q) ||
        i.blurb.toLowerCase().includes(q) ||
        CATEGORIES.find((c) => c.id === i.category)!.name.includes(q)
      )
    })
  }, [active, query])

  const heading =
    active === 'all'
      ? { name: '全部集成', blurb: '连上一次，团队里每个人的 Ola 都能用。管理员可以按人指定谁能用哪一个。' }
      : CATEGORIES.find((c) => c.id === active)!

  return (
    <section id="all-integrations" className="scroll-mt-[68px] bg-bone pb-16 pt-14 md:pb-20 md:pt-16">
      <div className="shell">
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-[620px]">
            <h2 className="t-heading">{heading.name}</h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-ink/65 text-pretty sm:text-[16px]">
              {heading.blurb}
            </p>
          </div>
          {/* The count and its label are separate nodes on purpose. Written
              as `{n} 个集成` React emits two text nodes and the i18n walker,
              which matches whole nodes, can never see the label — it stayed
              Chinese in the English build. */}
          <span className="shrink-0 rounded-full bg-signal/10 px-3.5 py-1.5 text-[13px] font-medium text-signal">
            {shown.length}&nbsp;<span>个集成</span>
          </span>
        </div>

        {/* Categories as a wrapped pill row, the way /product lists its
            capability groups — they were a 251px left rail of plain text
            links, which spent a sixth of the measure on seven words and gave
            the card grid two columns where it now gets three.

            The search box rides the same row on the right and drops under
            the pills below sm. */}
        <div className="mt-9 flex flex-col gap-4 md:mt-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <nav className="flex flex-wrap gap-2">
            {[{ id: 'all' as const, name: '全部集成' }, ...CATEGORIES].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                aria-pressed={active === c.id}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  active === c.id
                    ? 'border-signal bg-signal text-white'
                    : 'border-mist bg-paper text-ink/70 hover:border-ink/25 hover:text-ink'
                }`}
              >
                {c.name}
              </button>
            ))}
          </nav>

          <div className="relative w-full shrink-0 lg:w-[260px]">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索集成"
              aria-label="搜索集成"
              className="w-full rounded-full border border-mist bg-paper py-1.5 pl-4 pr-10 text-[14px] text-ink outline-none placeholder:text-ash focus:border-signal"
            />
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ash">
              <SearchIcon />
            </span>
          </div>
        </div>

        {shown.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((item) => (
              <Card key={item.name} item={item} />
            ))}
            <NeedMoreCard />
          </div>
        ) : (
          <p className="mt-8 rounded-[var(--radius-card)] border border-dashed border-mist px-6 py-12 text-center text-[15px] text-ink/55">
            没有匹配的集成。换个词试试，或者直接告诉我们你想接什么。
          </p>
        )}
      </div>
    </section>
  )
}

export default function IntegrationsPage() {
  return (
    <main>
      <Hero />
      <Directory />
    </main>
  )
}
