import { IconCheck } from './icons'
import OlaLogo from './OlaLogo'

/**
 * Same shape as the Workspace section: heading + sub + ruled link on the
 * page ground, then illustration fields — no wrapper panel.
 *
 * The flow reads LEFT TO RIGHT on desktop and stacks on mobile. That
 * horizontal run is what keeps the section inside one screen; the earlier
 * vertical chain ran to roughly 700px on its own.
 */


/* One shape language across the three: a 96×64 field, the signal green at
   three opacities, nothing outlined — the same system the capability cards
   use. Each drawing shows the step's outcome rather than its mechanics:
   a new member in the roster, tools wired to one hub, a job coming back
   done. */
const StepArt = {
  join: (
    <svg viewBox="0 0 96 64" className="h-16 w-24" aria-hidden>
      <rect x="6" y="10" width="44" height="10" rx="5" className="fill-signal opacity-25" />
      <rect x="6" y="27" width="44" height="10" rx="5" className="fill-signal opacity-25" />
      <rect x="6" y="44" width="56" height="10" rx="5" className="fill-signal opacity-45" />
      <circle cx="74" cy="49" r="9" className="fill-signal" />
    </svg>
  ),
  tools: (
    <svg viewBox="0 0 96 64" className="h-16 w-24" aria-hidden>
      <rect x="4" y="6" width="20" height="16" rx="5" className="fill-signal opacity-25" />
      <rect x="4" y="42" width="20" height="16" rx="5" className="fill-signal opacity-25" />
      <rect x="72" y="6" width="20" height="16" rx="5" className="fill-signal opacity-25" />
      <rect x="72" y="42" width="20" height="16" rx="5" className="fill-signal opacity-25" />
      <rect x="26" y="28" width="44" height="8" rx="4" className="fill-signal opacity-45" />
      <circle cx="48" cy="32" r="11" className="fill-signal" />
    </svg>
  ),
  firstJob: (
    <svg viewBox="0 0 96 64" className="h-16 w-24" aria-hidden>
      <rect x="8" y="10" width="58" height="44" rx="8" className="fill-signal opacity-25" />
      <rect x="18" y="22" width="38" height="7" rx="3.5" className="fill-signal opacity-45" />
      <rect x="18" y="35" width="26" height="7" rx="3.5" className="fill-signal opacity-45" />
      <path
        d="M62 40l6 6 14-15"
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-signal"
      />
    </svg>
  ),
}


const STEPS = [
  {
    n: '01',
    art: 'join' as const,
    label: '装上',
    title: '加到飞书或 Lark',
    body: '从应用市场装上。管理员点两次授权、过一次审，他就出现在工作区里，像任何一位新同事。',
  },
  {
    n: '02',
    art: 'tools' as const,
    label: '接通',
    title: '接上你的工具',
    body: 'GitHub、Notion、Langfuse 各连一次。每接一个，他就多一件能动手做的事，不只是能看。',
  },
  {
    n: '03',
    art: 'firstJob' as const,
    label: '交活',
    title: '交给他第一件活',
    body: '挑一件平时要占你一整周的事。他做完，然后你可以让他每周自己再做一遍。',
  },
]


/* ------------------------------------------------------------------ */

function OlaNode() {
  return (
    <div className="flex h-[72px] w-[108px] shrink-0 flex-col items-center justify-center rounded-[18px] bg-paper text-ink shadow-[0_18px_42px_-20px_rgba(8,32,20,0.85)]">
      <OlaLogo className="h-[21px] w-auto text-ink" />
      <span className="mt-1.5 font-mono text-[10px] text-ink/45">执行中枢</span>
    </div>
  )
}

function ResultNode() {
  return (
    <div className="w-full rounded-[16px] bg-paper p-5 text-ink shadow-[0_20px_44px_-24px_rgba(8,32,20,0.85)]">
      <div className="flex items-center gap-2 text-signal">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-signal text-white" aria-hidden>
          <IconCheck className="h-3.5 w-3.5" />
        </span>
        <span className="t-caption-cn">已完成任务</span>
      </div>

      <p className="mt-5 text-[20px] font-medium leading-[1.3] tracking-[-0.02em]">业务周报已交付</p>
      <div className="mt-4 border-t border-mist/70 pt-3">
        <p className="text-[12px] text-ink/55">已发送到「业务结果」群</p>
        <p className="mt-1 font-mono text-[11px] text-ink/35">刚刚完成</p>
      </div>
    </div>
  )
}

/* Was: an icon plate beside a three-line stack whose SMALLEST line — the
   13px caption — was the one naming the node. The category read as a
   whisper over its own evidence, so the hierarchy is inverted here: the
   label takes the top row at 15px and the products drop to chips. Chips
   rather than a middot run because these are discrete things Ola is
   plugged into, which is the whole claim the panel is making. No icon:
   the label is the only thing on its row and does not need a bullet.

   Both cards are white. The second was `--field-lit`, and the distinction
   carried no meaning — they are two nodes of the same kind hanging off
   the same hub, so they read as peers. */
const RESOURCES = [
  {
    label: '沟通入口',
    items: ['飞书', 'Lark', 'WhatsApp'],
    note: '私聊和群聊都能找到 Ola',
  },
  {
    label: '已连接工具',
    items: ['GitHub', 'Notion', 'Langfuse'],
    note: '也能操作多维表格与知识库',
  },
]

function ResourceNode() {
  return (
    <div className="relative grid w-full gap-3 md:pl-5">
      {RESOURCES.map(({ label, items, note }, index) => (
        <div key={label} className="relative">
          {/* Half a spine per row rather than one span across both. The
              quarter insets it replaces were an approximation — the stubs
              hang off each card's top-1/2, which is 23.8% not 25%, so the
              line stopped 3px short at each end and read as broken. Each
              half runs from its own card's centre to the midpoint of the
              12px gap (-bottom-1.5 / -top-1.5), so the two meet exactly and
              stay met at any card height. */}
          <span
            className={`absolute -left-5 hidden w-px bg-white/30 md:block ${
              index === 0 ? '-bottom-1.5 top-1/2' : '-top-1.5 bottom-1/2'
            }`}
            aria-hidden
          />
          <span className="absolute -left-5 top-1/2 hidden h-px w-5 -translate-y-1/2 bg-white/30 md:block" aria-hidden />
          <div className="rounded-[15px] bg-paper p-4 text-ink shadow-[0_16px_38px_-26px_rgba(8,32,20,0.8)]">
            <p className="text-[15px] font-medium tracking-[-0.01em] text-signal">
              {label}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {items.map((item) => (
                <span
                  key={item}
                  className="rounded-[8px] bg-ink/[0.055] px-2 py-[5px] text-[12.5px] font-medium text-ink/75"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-2.5 text-[12px] leading-[1.5] text-ink/55">{note}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function FlowConnector() {
  return (
    <div className="flex h-6 items-center justify-center md:h-auto md:w-full">
      <span className="h-6 w-px bg-white/30 md:h-px md:w-full" aria-hidden />
    </div>
  )
}

/* The cards used to be `bg-white` with token-driven `text-ink`, which in
   dark mode painted #ece9e5 on #ffffff — 1.21:1, measured — so the subtree
   was pinned to `.theme-light` to keep the two in step. That fixed the
   contrast but left three hard-white cards glaring on the dark page. They
   are `bg-paper` now, so surface and ink flip together and the pin is gone:
   the ground stays the same green (--color-field does not flip) with dark
   cards on it at night. */
function FlowPanel() {
  return (
    <div className="grid-field overflow-hidden rounded-[var(--radius-card)] px-5 py-7 sm:px-7 sm:py-8">
      <div className="grid items-center md:grid-cols-[minmax(155px,0.8fr)_32px_92px_32px_minmax(235px,1.2fr)] lg:grid-cols-[minmax(220px,1fr)_56px_auto_56px_minmax(300px,1.1fr)]">
        <ResultNode />
        <FlowConnector />
        <div className="flex justify-center">
          <OlaNode />
        </div>
        <FlowConnector />
        <ResourceNode />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-[68px] border-t border-mist/70 bg-bone py-16 md:py-20">
      <div className="shell">
        <h2 className="t-heading-lg">装上就能用，两分钟上线</h2>

        <p className="t-subheading mt-4 max-w-[620px] text-ink/65 text-pretty">
          连接工具，交给 Ola，几分钟后拿到结果。
        </p>

        <div className="mt-9">
          <FlowPanel />
        </div>

        {/* Cards on paper rather than three ruled columns. Sitting directly
            on the page ground they read as a caption strip under the panel;
            a surface of their own makes them the third beat of the section.
            The drawing carries the step, so the number can recede. */}
        <ol className="mt-6 grid gap-4 sm:grid-cols-3 md:mt-8 md:gap-5">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="flex flex-col rounded-[var(--radius-card)] bg-paper p-6 shadow-[var(--shadow-sm)]"
            >
              <div className="mb-5">{StepArt[s.art]}</div>

              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-[13px] font-medium text-signal">
                  {s.n}
                </span>
                <span className="t-caption-cn text-ash">{s.label}</span>
              </div>
              <h3 className="mt-2.5 text-[17px] font-medium tracking-[-0.015em] text-ink">
                {s.title}
              </h3>
              <p className="mt-1.5 text-[14px] leading-[1.55] text-ink/65 text-pretty">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
