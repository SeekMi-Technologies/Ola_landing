import type { ReactNode } from 'react'

/**
 * Six capabilities in a 3×2 grid, after Claude Tag's "Core capabilities":
 * a short noun-phrase title and one or two tight sentences, not a headline
 * and a paragraph. Three big centred cards had the weight of a hero band
 * and said less.
 *
 * Illustrations share the language established in HowItWorks — a 96×64
 * field, one hue at three opacities, nothing outlined — so the page has
 * one drawing system rather than two. This section draws in gold
 * (#cca000, off Figma 519:19103) while HowItWorks keeps the
 * signal green: same grammar, different accent per section, the way the
 * clay in "始终由你掌控" already works.
 *
 * The tiers are .35/.68/1 here, not the green's .25/.45/1. Gold is a far
 * lighter hue — #cca000 is L*68 against the green's L*30 — so on a white
 * card the whole ladder only spans ~24 L* points instead of ~53. These
 * three are the widest even steps that range allows; at .25 the faintest
 * shapes measured L*91.6 and effectively disappeared.
 */
const ART: Record<string, ReactNode> = {
  /* A credential of its own: a card with its own mark, beside two it does
     not borrow. */
  identity: (
    <>
      <rect x="4" y="14" width="20" height="36" rx="6" className="fill-gold opacity-[0.35]" />
      <rect x="72" y="14" width="20" height="36" rx="6" className="fill-gold opacity-[0.35]" />
      <rect x="30" y="8" width="36" height="48" rx="8" className="fill-gold opacity-[0.68]" />
      <circle cx="48" cy="26" r="7" className="fill-gold" />
      <rect x="36" y="38" width="24" height="7" rx="3.5" className="fill-gold" />
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
  /* One piece of work, several people reading it. */
  shared: (
    <>
      <rect x="26" y="20" width="44" height="24" rx="8" className="fill-gold opacity-[0.68]" />
      <circle cx="12" cy="14" r="7" className="fill-gold opacity-[0.35]" />
      <circle cx="12" cy="50" r="7" className="fill-gold opacity-[0.35]" />
      <circle cx="84" cy="14" r="7" className="fill-gold opacity-[0.35]" />
      <circle cx="84" cy="50" r="7" className="fill-gold opacity-[0.35]" />
      <circle cx="48" cy="32" r="6" className="fill-gold" />
    </>
  ),
  /* Fragments going in, one thing coming out. */
  queue: (
    <>
      <rect x="4" y="12" width="30" height="8" rx="4" className="fill-gold opacity-[0.35]" />
      <rect x="4" y="28" width="38" height="8" rx="4" className="fill-gold opacity-[0.68]" />
      <rect x="4" y="44" width="24" height="8" rx="4" className="fill-gold opacity-[0.35]" />
      <rect x="58" y="20" width="34" height="24" rx="8" className="fill-gold" />
    </>
  ),
  /* A long job running behind the conversation. */
  background: (
    <>
      <rect x="6" y="10" width="60" height="40" rx="8" className="fill-gold opacity-[0.35]" />
      <rect x="30" y="22" width="60" height="32" rx="8" className="fill-gold opacity-[0.68]" />
      <rect x="40" y="34" width="30" height="8" rx="4" className="fill-gold" />
    </>
  ),
  /* Set once; it fires on its own, again and again. */
  scheduled: (
    <>
      <circle cx="16" cy="32" r="8" className="fill-gold opacity-[0.35]" />
      <circle cx="40" cy="32" r="8" className="fill-gold opacity-[0.68]" />
      <circle cx="64" cy="32" r="8" className="fill-gold opacity-[0.35]" />
      <rect x="82" y="24" width="10" height="16" rx="5" className="fill-gold" />
    </>
  ),
}

const CARDS: { art: string; title: string; body: string }[] = [
  {
    art: 'identity',
    title: '有自己的账号',
    body: '不借用任何人的身份。权限由管理员统一配，没给的他直接拒绝。',
  },
  {
    art: 'memory',
    title: '跨天、跨人的记忆',
    body: '上个月为什么那么定，今天还记得。有人离开，记忆留下。',
  },
  {
    art: 'shared',
    title: '群里的共享资源',
    body: '他干的活全群可见，谁都能接着往下问，不用你转发一遍。',
  },
  {
    art: 'queue',
    title: '不用一问一答地等',
    body: '想到什么发什么，零散的几句他自己拼成一件事，按顺序做完。',
  },
  {
    art: 'background',
    title: '重活挂后台',
    body: '长任务不占对话。你该干嘛干嘛，跑完他回来找你。',
  },
  {
    art: 'scheduled',
    title: '设一次，长期跑',
    body: '每天早报、每周汇总，到点自己开工，不用你记得提醒他。',
  },
]

export default function Pillars() {
  return (
    <section id="capabilities" className="scroll-mt-[68px] border-t border-mist/70 bg-bone py-20 md:py-24">
      <div className="shell">
        <h2 className="t-heading-lg">不是插件，是同事</h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 md:gap-5 lg:grid-cols-3">
          {CARDS.map((c) => (
            <article
              key={c.title}
              className="rounded-[var(--radius-card)] bg-paper p-7 shadow-[var(--shadow-sm)]"
            >
              <svg viewBox="0 0 96 64" className="h-16 w-24" aria-hidden>
                {ART[c.art]}
              </svg>
              <h3 className="mt-5 text-[18px] font-medium tracking-[-0.015em] text-ink">
                {c.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-ink/65 text-pretty">
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
