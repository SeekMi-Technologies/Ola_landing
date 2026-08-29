import { BRAND_LABEL, BRAND_MARKS, type BrandId } from './brandMarks'
import { APPLY_URL, CHANGELOG_URL, CONTACT_EMAIL, DOCS_URL, LINKEDIN_URL, X_URL } from '../links'
import { useI18n } from '../i18nContext'
import OlaLogo from './OlaLogo'

type FooterLink = string | [label: string, href: string]
type Column = { title: string; links: FooterLink[] }

const COLUMNS: Column[] = [
  {
    title: '产品',
    links: [['功能', '/product'], ['集成', '/integrations'], ['定价', '/pricing']],
  },
  {
    title: '资源',
    links: [
      ['文档', DOCS_URL],
      ['更新日志', CHANGELOG_URL],
    ],
  },
  {
    title: '帮助与支持',
    links: [['联系我们', '/contact'], ['申请使用', APPLY_URL]],
  },
]

/* Only accounts that exist. WhatsApp, YouTube, Discord, Feishu and WeChat
   were dropped rather than left as '#' — a dead icon is worse than one
   fewer icon, and /contact no longer offers those channels either. */
const SOCIALS: { id: BrandId; href: string }[] = [
  { id: 'linkedin', href: LINKEDIN_URL },
  { id: 'x', href: X_URL },
  { id: 'email', href: `mailto:${CONTACT_EMAIL}` },
]

/* self-start, not the grid default: a stretched cell plus `items-center`
   parked the wordmark at the vertical centre of four columns of links.
   The 5px nudge lines its cap up with the column headings' — those are
   12px type on an 18px line, so their caps sit ~5px below the box top
   while the wordmark's sits at 0. */
function Logo() {
  return (
    <a
      href="/"
      className="flex items-center lg:mt-[5px] lg:self-start"
      aria-label="Ola 首页"
    >
      <OlaLogo className="h-7 w-auto text-ink" />
    </a>
  )
}

/* Anything off-site opens in a new tab and says so with the ↗ — the docs
   live in a Feishu wiki, not on this domain. */
function ExternalArrow() {
  return (
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
  )
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <h3 className="shrink-0 text-[12px] font-medium uppercase tracking-[0.1em] text-ink/70">{children}</h3>
      <span aria-hidden className="h-px flex-1 bg-mist" />
    </div>
  )
}

export default function Footer() {
  const { language } = useI18n()

  return (
    <footer className="bg-paper">
      <div className="shell py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(140px,1fr)_minmax(0,720px)] lg:gap-12">
          <Logo />

          {/* One column on phones. Two left 「帮助与支持」 alone on a second row
              with an empty cell beside it; stacked, the three read as one
              list. Three across from sm, as before. */}
          <nav className="grid gap-x-8 gap-y-10 sm:grid-cols-3 lg:justify-self-end lg:w-full">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <FooterHeading>
                  <span data-i18n-ignore={col.title === '产品' && language === 'en' ? true : undefined}>
                    {col.title === '产品' && language === 'en' ? 'Product' : col.title}
                  </span>
                </FooterHeading>
                {/* space-y-1, not -4: the hover pill is tall enough now that
                    16px between them read as four detached buttons. */}
                <ul className="mt-6 space-y-1">
                  {col.links.map((link) => {
                    const [label, href] = Array.isArray(link) ? link : [link, '#']
                    const external = href.startsWith('http')
                    return (
                      <li key={label}>
                        <a
                          href={href}
                          {...(external ? { target: '_blank', rel: 'noreferrer' } : null)}
                          /* The hover pill: bone, the page's own ground, not
                             a grey tint of ink — the footer sits on paper, so
                             the highlight reads as the colour above it. And
                             a real target: 14px of padding round a 16.8px
                             line is a 45px row, against the 37px it was. */
                          className="-mx-3 block rounded-[10px] px-3 py-3.5 text-[16px] leading-[16.8px] tracking-[0.005em] text-ink/60 transition-colors hover:bg-bone hover:text-ink focus-visible:bg-bone focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                        >
                          <span className="inline-flex items-center gap-1.5">
                            {label}
                            {external && <ExternalArrow />}
                          </span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}

          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-8 border-t border-mist pt-8 md:mt-20 md:flex-row md:items-center md:justify-between md:pt-10">
          <p className="text-[14px] leading-[18.9px] tracking-[0.005em] text-ink/60">
            © 2026 All Rights Reserved, OLA
          </p>

          <div className="-mx-2 flex w-fit flex-nowrap gap-1">
            {SOCIALS.map(({ id, href }) => (
              <a
                key={id}
                href={href}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : null)}
                aria-label={BRAND_LABEL[id]}
                /* 44px hit area, 28px ring: the visible circle is unchanged,
                   the target around it is now a comfortable tap. */
                className="group flex h-11 w-11 items-center justify-center rounded-full text-ink"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-mist bg-paper transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-[var(--color-on-ink)]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    fillRule="evenodd"
                    className="h-3.5 w-3.5"
                    aria-hidden
                  >
                    {BRAND_MARKS[id]}
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
