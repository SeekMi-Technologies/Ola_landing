import { useState } from 'react'
import {
  FAQS,
  PLANS,
  type Plan,
} from './pricingData'
import PageHero from '../components/PageHero'
import { PlanBadge } from '../components/Pricing'

const PLAN_TIERS: Record<string, 0 | 1 | 2> = { free: 0, pro: 1, max: 2 }

/**
 * /pricing.
 *
 * Three plans and the FAQ under them, in the site's own finish: tokens
 * instead of raw hexes so the page has a dark mode, .t-heading-* for type,
 * .shell for the measure.
 */

function CheckMark({ className = 'h-[19px] w-[20px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 19" fill="none" className={`${className} shrink-0`} aria-hidden>
      <path
        d="M16.44 4.74 7.76 13.42 3.81 9.47"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Hero() {
  return <PageHero title="定价" />
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="flex h-full flex-col rounded-[var(--radius-card)] bg-paper px-7 pb-8 pt-7 shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[28px] font-medium leading-[1.2] tracking-[-0.02em] text-ink">
          {plan.name}
        </p>
        <PlanBadge tier={PLAN_TIERS[plan.id] ?? 0} />
      </div>

      {/* A fixed zone, like the Figma's min-h-[61.25px]: it is what keeps the
          price, the CTA and the feature lists on one line across all four
          cards. Measured without it, Personal's price sat 19px high. 84 not
          80: on the site's 1120 measure the work cards are 245px wide and
          their blurbs run four lines at 81px, one over the old floor. */}
      <p className="mt-5 min-h-[84px] text-[14px] leading-[1.45] text-ink/65">{plan.blurb}</p>

      <p className="mt-5 text-[44px] font-medium leading-[1.05] tracking-[-0.025em] text-ink">
        {plan.price}
      </p>
      <p className="t-caption-cn mt-2 text-ash">{plan.unit}</p>

      <div className="mt-5 border-y border-mist/70 py-4">
        <p className="t-caption-cn text-ash">每月额度</p>
        <p className="mt-1 text-[20px] font-medium leading-[1.2] tracking-[-0.015em] text-ink">
          {plan.allowance}
        </p>
      </div>

      {plan.current ? (
        <span className="btn mt-6 cursor-default justify-center border border-mist bg-mist/45 text-ink">
          {plan.cta}
        </span>
      ) : (
        <a
          href="/contact"
          className={`btn mt-6 justify-center ${plan.ctaQuiet ? 'border border-mist bg-bone text-ink hover:bg-mist/40' : 'btn-primary'}`}
        >
          {plan.cta}
        </a>
      )}
      {plan.ctaNote && (
        <p className="mt-2 text-center text-[12px] leading-[1.4] text-ash">{plan.ctaNote}</p>
      )}

      {plan.groups.map((g) => (
        <div key={g.title} className="mt-7">
          <p className="text-[13.5px] font-medium text-ink">{g.title}</p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {g.items.map((item) => (
              <li key={item} className="flex items-start gap-1.5 text-ink/80">
                <span className="pt-0.5 text-signal">
                  <CheckMark className="h-[17px] w-[17px]" />
                </span>
                <span className="text-[13.5px] leading-[1.45]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function Plans() {
  return (
    <section className="bg-bone pb-16 pt-14 md:pb-20 md:pt-16">
      <div className="shell">
        {/* Three across only from lg. At md the shell is 673px, so each card
            got ~205px and the allowance line ("每月 100,000 额度") wrapped in
            one card but not the others, which pushed that card's CTA out of
            line with the other two. Two columns leaves a lone third card, so
            below lg they stack. */}
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PlusMark({ open }: { open: boolean }) {
  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-[var(--color-on-ink)] transition-transform duration-200 ${
        open ? 'rotate-45 bg-signal' : ''
      }`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    </span>
  )
}

function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="pricing-faq" className="scroll-mt-[68px] border-t border-mist/70 bg-bone py-16 md:py-20">
      <div className="shell grid gap-10 lg:grid-cols-[372px_1fr]">
        <h2 className="t-heading-lg">价格常见问题</h2>
        <div className="grid items-start gap-2">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index
            const answerId = `pricing-faq-answer-${index}`

            return (
              <article
                key={item.q}
                className={`overflow-hidden rounded-[var(--radius-card)] border bg-paper shadow-[var(--shadow-sm)] transition-colors duration-200 ${
                  isOpen ? 'border-ink/20' : 'border-mist/55 hover:border-ink/15'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="group flex w-full items-center gap-4 px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-signal/30 focus-visible:ring-inset"
                  >
                    <span className="t-caption hidden shrink-0 text-ash sm:block">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-[16px] font-medium leading-[1.45] tracking-[-0.01em] text-ink">
                      {item.q}
                    </span>
                    <PlusMark open={isOpen} />
                  </button>
                </h3>

                <div
                  id={answerId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mx-5 border-t border-mist/70 pb-5 pt-4">
                      <p className="text-[14px] leading-[1.7] text-charcoal text-pretty">{item.a}</p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function PricingPage() {
  return (
    <main>
      <Hero />
      <Plans />
      <Faqs />
    </main>
  )
}
