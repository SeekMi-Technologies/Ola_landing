import { IconCheck } from './icons'
import { OlaMark } from './OlaLogo'

/* Same drawing system as Pillars and HowItWorks — fills only, three
   opacity tiers, rounded rects and circles, nothing outlined — in clay
   rather than signal because that is this section's accent. These were
   1.6px line icons, the only outlined marks in the page's illustration
   language, which is why they read as borrowed.

   Silhouettes are kept distinct so the three rows are told apart by shape
   before they are read: a cluster of circles, a broken bar, a shield. */
const ROW_ICON = {
  /* One person picked out of several — Pillars' `shared` construction. */
  person: (
    <>
      <circle cx="4" cy="9" r="2.6" className="fill-clay opacity-25" />
      <circle cx="20" cy="9" r="2.6" className="fill-clay opacity-25" />
      <circle cx="12" cy="7.6" r="3.7" className="fill-clay" />
      <rect x="6" y="13.6" width="12" height="7" rx="3.5" className="fill-clay" />
    </>
  ),
  /* A link with the far half cut away and faded: the grant taken back. */
  revoke: (
    <>
      <rect x="1.6" y="9.8" width="9" height="4.4" rx="2.2" className="fill-clay" />
      <rect x="13.4" y="9.8" width="9" height="4.4" rx="2.2" className="fill-clay opacity-25" />
    </>
  ),
  /* Data held inside something — the `.25` panel with full-opacity content
     that firstJob and background both use. */
  shield: (
    <>
      <path
        d="M12 2.4 4.6 5.5v6.2c0 4.4 3 7.6 7.4 8.9 4.4-1.3 7.4-4.5 7.4-8.9V5.5L12 2.4Z"
        className="fill-clay opacity-25"
      />
      <rect x="8.7" y="9.4" width="6.6" height="6.6" rx="2.3" className="fill-clay" />
    </>
  ),
}

/* The paper card answers one question: where does access stop? Keep only
   the three assurances a visitor needs at this point in the page. */
const SCOPE: { name: string; icon: keyof typeof ROW_ICON }[] = [
  {
    icon: 'person',
    name: '权限按人开放',
  },
  {
    icon: 'revoke',
    name: '随时可以收回',
  },
  {
    icon: 'shield',
    name: '数据不用于模型训练',
  },
]

function ApprovalPreview() {
  return (
    <div className="rounded-[18px] bg-bone p-4 text-ink shadow-[0_18px_48px_-28px_rgba(75,24,8,0.75)]">
      <div className="flex items-center justify-between gap-4 border-b border-mist/70 pb-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay text-white">
            <OlaMark className="w-4" />
          </span>
          <p className="min-w-0 text-[14px] font-medium">Ola 请求批准</p>
        </div>
        <span className="shrink-0 rounded-full bg-clay-tint px-2.5 py-1 text-[10px] font-medium text-clay-deep">
          等待确认
        </span>
      </div>

      <div className="py-2.5">
        <p className="text-[15px] font-medium tracking-[-0.015em]">
          删除「Q3 客户调研」表中 128 行记录
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <span className="rounded-[10px] border border-mist bg-paper px-3 py-2 text-center text-[12px] font-medium text-charcoal">
          返回修改
        </span>
        <span className="rounded-[10px] bg-ink px-3 py-2 text-center text-[12px] font-medium text-[var(--color-on-ink)]">
          批准并执行
        </span>
      </div>
    </div>
  )
}

export default function Control() {
  return (
    <section id="security" className="scroll-mt-[68px] border-t border-mist/70 bg-bone py-14 md:py-16">
      <div className="shell">
        <div>
          <h2 className="t-heading-lg">始终由你掌控</h2>
          <p className="t-subheading mt-4 max-w-[620px] text-ink/65 text-pretty">
            高风险操作先确认；没有权限的内容，Ola 既看不到，也动不了。
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-5">
          <article className="relative overflow-hidden rounded-[28px] bg-clay px-5 py-5 text-bone sm:px-7">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
              aria-hidden
            />

            <div className="relative z-10 flex h-full flex-col">
              <div>
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/75">
                  不可逆操作
                </span>
              </div>

              <div className="mt-5 max-w-[500px] sm:mt-6">
                {/* No `whitespace-nowrap`: it held the Chinese to one line,
                    but "Confirm first. Then act." is 384px at this size and
                    pushed 73px of the page off the side of a phone. Both
                    languages wrap now, balanced. */}
                <h3 className="text-balance text-[clamp(27px,3vw,34px)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
                  先确认，再执行。
                </h3>
              </div>

              <div className="mt-auto pt-4">
                <ApprovalPreview />
              </div>
            </div>
          </article>

          <article className="flex flex-col rounded-[28px] bg-paper px-5 py-5 sm:px-7 sm:py-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="t-caption-cn text-clay">默认最小权限</p>
                <h3 className="mt-2.5 text-balance text-[clamp(20px,3.4vw,28px)] font-medium leading-[1.18] tracking-[-0.02em] text-ink">
                  你看不到的，Ola 也看不到。
                </h3>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clay text-white">
                <IconCheck className="h-[18px] w-[18px]" />
              </span>
            </div>

            <p className="mt-3 border-b border-mist/70 pb-4 text-[13px] leading-[1.6] text-ink/65 sm:text-[14px]">
              所有访问都沿用公司现有的身份和权限。
            </p>

            <ul className="flex flex-1 flex-col">
              {SCOPE.map((item, index) => (
                <li
                  key={item.name}
                  className={`grid grid-cols-[22px_1fr] items-start gap-x-3 py-3 ${
                    index < SCOPE.length - 1 ? 'border-b border-mist/70' : 'pb-0'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden>
                    {ROW_ICON[item.icon]}
                  </svg>
                  <p className="min-w-0 text-[13.5px] font-medium text-ink sm:text-[14px]">
                    {item.name}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
