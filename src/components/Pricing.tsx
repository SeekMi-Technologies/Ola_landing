import type { ReactNode } from 'react'
import { IconCheck } from './icons'

/**
 * After the Figma's pricing section (node 519:14552):
 *
 *   section    bg #faf9f8, container 1280px
 *   group label  Inter Medium 18px / #666361 / -0.36px
 *   card       white, radius 16px, 36.8px padding
 *   plan name  Inter Medium 32px / -0.64px / 48px line
 *   blurb      Inter Regular 14px / rgba(48,44,44,0.8) / 20px line
 *   price      Inter Medium 48px / -0.96px
 *   price note Inter Medium 12px / UPPERCASE / -0.16px
 *   CTA        #302c2c fill, radius 8px, 16px label
 *   feature    18px check + Inter Regular 14px / -0.42px, 10px apart
 *   footer bar #e6e4e2, radius 16px, centred 16px copy
 *
 * The distinctive device is the FUSED group: the paid cards sit 4px
 * apart with only the outer corners rounded, so they read as one slab
 * while the free plan stands alone.
 */

type Plan = {
  name: string
  blurb: string
  price: string
  note: string
  cta: string
  ctaStyle?: 'primary' | 'muted'
  tier: 0 | 1 | 2
  groups: { title: string; items: ReactNode[] }[]
}

/**
 * Plan badge. The Figma sets a 56×36 mark beside each plan name; those
 * are the reference's own plan icons, so these are redrawn as abstract
 * geometry that deepens with the tier — same flat, tone-on-tone language
 * as the Pillars illustrations.
 */
export function PlanBadge({ tier }: { tier: 0 | 1 | 2 }) {
  const op = [
    [0.3, 0.55],
    [0.3, 0.55, 0.85],
    [0.4, 0.7, 1],
  ][tier]

  return (
    <svg viewBox="0 0 56 36" className="h-9 w-14 shrink-0" aria-hidden>
      {tier === 2
        ? op.map((o, i) => (
            <rect
              key={i}
              x={4 + i * 14}
              y={8}
              width="20"
              height="20"
              rx="5"
              className="fill-signal"
              opacity={o}
            />
          ))
        : op.map((o, i) => (
            <circle
              key={i}
              cx={14 + i * 14}
              cy={18}
              r="10"
              className="fill-signal"
              opacity={o}
            />
          ))}
    </svg>
  )
}

/* Plan names, prices and allowances are /pricing's — that page is the
   source of truth for what a plan costs, and the two used to disagree on
   every number: 免费/团队/企业 at $0 / $50起 / 定制 here against
   Free / Pro / Max at $0 / $20 / $100+ there.

   What did NOT come across:
     - /pricing's CTAs ("Downgrade to Pro", "Current plan") are account-state
       strings from a settings screen, not marketing labels;
     - the 「注册即赠 $100 额度」 grant, which contradicted /pricing's own
       table (1,000 credits a month on Free) and is gone from both pages;
     - 「符合 SOC 2 要求」 and 「不设人数门槛」, which /pricing does not claim.

   Two earlier removals still stand, because they were factual errors rather
   than amounts: the free tier's 「3,200+ 个集成」 (that count was the reference site's;
   the docs name four integrations) and the 「开发中」 labels on RBAC and
   Private Mode (帐户与权限设置 documents the full matrix as live). */
const FREE: Plan = {
  name: 'Free',
  tier: 0,
  blurb: '想先试试的个人和小团队。所有功能、所有集成，先用起来。',
  price: '$0',
  note: '每月 1,000 额度',
  cta: '联系销售',
  groups: [
    {
      title: '额度与用量',
      items: ['每月 1,000 额度', '无需信用卡，无需销售来电'],
    },
    {
      title: '功能',
      items: ['完整助手，所有集成', '后台任务与定时巡检', '团队记忆'],
    },
  ],
}

const PAID: Plan[] = [
  {
    name: 'Pro',
    tier: 1,
    blurb: '已经准备好让 Ola 天天干活的团队。',
    price: '$20',
    note: '每月 10,000 额度',
    cta: '联系销售',
    groups: [
      {
        title: '额度与用量',
        items: ['每月 10,000 额度', '是 Free 的 10 倍'],
      },
      {
        title: '功能',
        items: ['Free 全部功能', '优先支持'],
      },
    ],
  },
  {
    name: 'Max',
    tier: 2,
    blurb: '整个团队都靠他推进工作的公司。',
    price: '$100+',
    note: '每月 100,000 额度',
    cta: '联系销售',
    groups: [
      {
        title: '额度与用量',
        items: ['每月 100,000 额度', '是 Pro 的 10 倍'],
      },
      {
        title: '功能',
        items: ['Pro 全部功能', '优先支持'],
      },
    ],
  },
]

/* ------------------------------------------------------------------ */

function PlanCard({ plan, className = '' }: { plan: Plan; className?: string }) {
  return (
    <div className={`flex flex-col bg-paper p-8 sm:p-9 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-[32px] font-medium leading-[48px] tracking-[-0.02em] text-ink">
          {plan.name}
        </h3>
        <PlanBadge tier={plan.tier} />
      </div>

      {/* Fixed floors, straight from the Figma: the blurb reserves 61px
          and the price block 140px, so price, note and CTA sit on the
          same baseline across every card no matter how long the copy
          runs. Without these the three cards drift out of alignment. */}
      <p className="mt-3 min-h-[61px] text-[14px] leading-5 tracking-[-0.02em] text-ink/80 text-pretty">
        {plan.blurb}
      </p>

      <div className="mt-6 flex h-[140px] flex-col">
        <p className="text-[48px] font-medium leading-[48px] tracking-[-0.02em] text-ink">
          {plan.price}
        </p>
        <p className="mt-[10px] text-[12px] font-medium uppercase leading-4 tracking-[-0.01em] text-ink">
          {plan.note}
        </p>
        <a
          href="/contact"
          className={`mt-6 block rounded-[var(--radius-btn)] py-2.5 text-center text-[16px] font-medium tracking-[-0.01em] transition-colors ${
            plan.ctaStyle === 'muted'
              ? 'bg-mist/60 text-ink hover:bg-mist'
              : 'bg-ink text-[var(--color-on-ink)] hover:bg-graphite'
          }`}
        >
          {plan.cta}
        </a>
      </div>

      <div className="mt-8 space-y-6">
        {plan.groups.map((g) => (
          <div key={g.title}>
            <h4 className="text-[14px] font-medium leading-5 tracking-[-0.01em] text-ink">
              {g.title}
            </h4>
            <ul className="mt-3 space-y-2.5">
              {g.items.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <IconCheck className="mt-[3px] h-[18px] w-[18px] shrink-0 text-signal" />
                  <span className="text-[14px] leading-5 tracking-[-0.03em] text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-[68px] border-t border-mist/70 bg-bone py-20 md:py-24">
      <div className="shell">
        <h2 className="t-heading-lg">免费开始，准备好了再付费</h2>
        {/* Three equal cards, evenly spaced, all four corners rounded.
            The Figma split them into a 320px "personal" column beside a
            fused two-card slab under a pair of group labels; with the plans
            now Free / Pro / Max — one ladder, one unit of billing — the
            split was drawing a line that the pricing no longer has.
            `items-stretch` keeps all three the height of the tallest. */}
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {[FREE, ...PAID].map((plan) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              className="h-full rounded-[var(--radius-card)]"
            />
          ))}
        </div>

        {/* Figma closes the section with a flat enquiry bar */}
        <div className="mt-6 rounded-[var(--radius-card)] bg-mist/45 p-4 text-center">
          <p className="text-[16px] leading-6 tracking-[-0.01em] text-graphite">
            还有疑问？看看
            <a href="#faq" className="underline underline-offset-2 hover:text-signal">
              常见问题
            </a>
            ，或者
            <a href="/contact" className="underline underline-offset-2 hover:text-signal">
              联系销售团队
            </a>
            。
          </p>
        </div>
      </div>
    </section>
  )
}
