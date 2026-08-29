import { CATALOGUE, HERO, MANAGE, QUOTES, QUOTES_TITLE } from './featuresData'
import PageHero from '../components/PageHero'

/**
 * /product.
 *
 * Built in the site's own language from the start: .shell for the measure,
 * tokens for colour, .t-heading-* for type, the shared HERO band, .btn for
 * buttons. Copy is Ola's own.
 */

/* Same band as /integrations and /pricing so all three pages open alike. */
function Hero() {
  return <PageHero title={HERO.title} />
}

/* Group marks, in the drawing language the home page's Pillars set — a
   96x64 field, one hue at three opacities, nothing outlined — in gold,
   which is the accent that section uses for capability. */
const GROUP_ART: Record<string, React.ReactNode> = {
  /* Lines of talk, read down to the part that matters. */
  read: (
    <>
      <rect x="8" y="10" width="60" height="10" rx="5" className="fill-gold opacity-[0.35]" />
      <rect x="8" y="27" width="80" height="10" rx="5" className="fill-gold opacity-[0.68]" />
      <rect x="8" y="44" width="42" height="10" rx="5" className="fill-gold" />
    </>
  ),
  /* Something taken hold of and changed. */
  act: (
    <>
      <rect x="6" y="16" width="34" height="32" rx="10" className="fill-gold opacity-[0.35]" />
      <rect x="56" y="16" width="34" height="32" rx="10" className="fill-gold opacity-[0.68]" />
      <rect x="40" y="27" width="16" height="10" rx="5" className="fill-gold" />
    </>
  ),
  /* Set once, and it keeps firing on its own. */
  self: (
    <>
      <circle cx="16" cy="32" r="8" className="fill-gold opacity-[0.35]" />
      <circle cx="40" cy="32" r="8" className="fill-gold opacity-[0.68]" />
      <circle cx="64" cy="32" r="8" className="fill-gold opacity-[0.35]" />
      <rect x="82" y="24" width="10" height="16" rx="5" className="fill-gold" />
    </>
  ),
  /* Layers that keep stacking; the oldest is still there. */
  memory: (
    <>
      <rect x="14" y="42" width="68" height="12" rx="6" className="fill-gold opacity-[0.35]" />
      <rect x="20" y="26" width="56" height="12" rx="6" className="fill-gold opacity-[0.68]" />
      <rect x="26" y="10" width="44" height="12" rx="6" className="fill-gold" />
    </>
  ),
}

/* The catalogue, and the page's reason to exist. Heading, the four group
   names as chips, then the groups themselves. The heading used to sit in a
   black grid panel; on a page whose body is four white cards, that frame
   was doing nothing the heading could not do on its own. */
/* pt matches the home page: 96px from the bottom of the display heading to
   the top of its showcase panel, 64 below md. PageHero carries no bottom
   padding of its own — every other page using it has a section with its own
   py directly underneath. */
function Catalogue() {
  return (
    <section className="bg-bone pb-16 pt-16 md:pb-20 md:pt-24">
      <div className="shell">
        {/* Heading and index share a row from lg and stack below it, aligned
            on their baselines rather than their boxes — the chips are 13px
            against a 48px heading, and box alignment left them floating. */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h2 className="t-heading-lg">{CATALOGUE.title}</h2>

          {/* These were four inert pills repeating headings visible a few
              hundred pixels below. As links they earn the space: each jumps
              to its group, and the count says how long the list is before
              you start scrolling it. */}
          <nav className="flex flex-wrap gap-2 lg:justify-end lg:pb-1.5">
            {CATALOGUE.groups.map((group, i) => (
              <a
                key={group.name}
                href={`#cap-${i}`}
                className="inline-flex items-center gap-2 rounded-full border border-mist bg-paper px-3.5 py-1.5 text-[13px] font-medium text-ink/70 transition-colors hover:border-ink/25 hover:text-ink"
              >
                {group.name}
                {/* Its own node, so the group name stays one whole string for
                    the translation walker. */}
                <span className="text-ink/40">{group.items.length}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-4 md:mt-10 md:gap-5">
          {CATALOGUE.groups.map((group, i) => (
            <div
              key={group.name}
              id={`cap-${i}`}
              /* scroll-mt clears the 66px sticky bar plus a little air. */
              className="grid scroll-mt-[86px] gap-6 rounded-[var(--radius-card)] bg-paper p-7 shadow-[var(--shadow-sm)] sm:p-9 lg:grid-cols-[260px_1fr] lg:gap-10"
            >
              <div>
                <svg viewBox="0 0 96 64" className="h-16 w-24" aria-hidden>
                  {GROUP_ART[group.art]}
                </svg>
                <h3 className="mt-4 text-[22px] font-medium tracking-[-0.02em] text-ink">
                  {group.name}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-ink/55 text-pretty">
                  {group.blurb}
                </p>
              </div>

              {/* A rule-separated list, not five more cards: the page would
                  otherwise be eighty card corners. */}
              <ul className="flex flex-col">
                {group.items.map((item, i) => (
                  <li
                    key={item.title}
                    className={`grid gap-1 py-4 sm:grid-cols-[210px_1fr] sm:gap-6 ${
                      i > 0 ? 'border-t border-mist/70' : 'sm:pt-0'
                    }`}
                  >
                    <p className="text-[16px] font-medium tracking-[-0.015em] text-ink">
                      {item.title}
                    </p>
                    <p className="text-[15px] leading-[1.6] text-ink/65 text-pretty">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Same <picture> swap as /integrations: GitHub, Linear and Notion are
   monochrome black and disappear against the dark theme's card, so those
   three carry a pale variant. The full-colour marks fall through to the
   single file. */
function ToolMark({ tool }: { tool: (typeof MANAGE.tools)[number] }) {
  const cls = 'block h-6 w-6 shrink-0 object-contain sm:h-7 sm:w-7'
  const dark = 'logoDark' in tool ? (tool.logoDark as string) : undefined

  if (!dark) return <img src={tool.logo} alt={tool.name} className={cls} />

  return (
    <picture className="flex shrink-0">
      <source srcSet={dark} media="(prefers-color-scheme: dark)" />
      <img src={tool.logo} alt={tool.name} className={cls} />
    </picture>
  )
}

/* Admin marks, same drawing language as the catalogue's — a 96x64 field,
   one hue at three opacities, nothing outlined — in signal green rather
   than gold, because this section is about permission and the green is what
   the site already uses for it. */
const ADMIN_ART: Record<string, React.ReactNode> = {
  /* One person picked out of a group: the grant goes to a name, not to
     everybody. */
  perPerson: (
    <>
      <circle cx="14" cy="20" r="9" className="fill-signal opacity-25" />
      <rect x="2" y="34" width="24" height="12" rx="6" className="fill-signal opacity-25" />
      <circle cx="82" cy="20" r="9" className="fill-signal opacity-25" />
      <rect x="70" y="34" width="24" height="12" rx="6" className="fill-signal opacity-25" />
      <circle cx="48" cy="18" r="11" className="fill-signal" />
      <rect x="33" y="35" width="30" height="14" rx="7" className="fill-signal" />
    </>
  ),
  /* A link with its far half cut away and faded: the grant taken back. */
  revoke: (
    <>
      <rect x="4" y="24" width="38" height="16" rx="8" className="fill-signal" />
      <rect x="54" y="24" width="38" height="16" rx="8" className="fill-signal opacity-25" />
    </>
  ),
  /* Two approvers over one action — the second one is what unlocks it. */
  second: (
    <>
      <rect x="6" y="12" width="84" height="40" rx="12" className="fill-signal opacity-25" />
      <circle cx="34" cy="32" r="10" className="fill-signal opacity-45" />
      <circle cx="62" cy="32" r="10" className="fill-signal" />
    </>
  ),
}

function Manage() {
  return (
    /* Was the Figma's full-bleed black wall with nine cards. It is three
       cards now, and the catalogue panel above is the page's one dark
       ground — a second full-width one had the two competing. */
    <section className="border-t border-mist/70 bg-bone py-16 md:py-20">
      <div className="shell">
        <h2 className="t-heading-lg">{MANAGE.title}</h2>
        <p className="t-subheading mt-4 max-w-[620px] text-ink/65 text-pretty">{MANAGE.lead}</p>

        <div className="mt-10 grid gap-4 md:mt-12 md:gap-5 lg:grid-cols-3">
          {MANAGE.cards.map((c) => (
            <article
              key={c.title}
              className="rounded-[var(--radius-card)] bg-paper p-7 shadow-[var(--shadow-sm)]"
            >
              <svg viewBox="0 0 96 64" className="h-16 w-24" aria-hidden>
                {ADMIN_ART[c.art]}
              </svg>
              <h3 className="mt-5 text-[18px] font-medium tracking-[-0.015em] text-ink">
                {c.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-ink/65 text-pretty">{c.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-4 rounded-[var(--radius-card)] bg-paper px-7 py-6 shadow-[var(--shadow-sm)] md:mt-5">
          <p className="text-[14px] text-ink/55">{MANAGE.toolsLead}</p>
          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            {MANAGE.tools.map((tool) => (
              <ToolMark key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Quotes() {
  return (
    /* The block had no heading, so it read as two loose cards after the
       admin section rather than as the page's closing proof. */
    <section className="border-t border-mist/70 bg-bone py-16 md:py-20">
      <div className="shell">
        <h2 className="t-heading-lg">{QUOTES_TITLE}</h2>

        <div className="mt-10 grid gap-5 md:mt-12 lg:grid-cols-2">
          {QUOTES.map((q) => (
            <figure
              key={q.quote}
              className="flex flex-col justify-between rounded-[var(--radius-card)] bg-paper p-8 shadow-[var(--shadow-sm)]"
            >
              <blockquote className="text-[19px] leading-[1.5] tracking-[-0.015em] text-ink text-pretty">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-8">
                <p className="text-[13px] text-ink/55">
                  {q.who}, {q.org}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function FeaturesPage() {
  return (
    <main>
      <Hero />
      {/* the catalogue -> who controls it -> proof */}
      <Catalogue />
      <Manage />
      <Quotes />
    </main>
  )
}
