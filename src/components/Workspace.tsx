import { OlaAvatar } from './OlaLogo'

function CheckMark({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="m3.25 8.25 2.8 2.8 6.7-6.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LockMark({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <rect x="4.5" y="8.25" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 8.25V6.5a3 3 0 0 1 6 0v1.75" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function PersonMark({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="10" cy="6.75" r="2.75" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4.75 16.25a5.25 5.25 0 0 1 10.5 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* The channel tint. It is the ONLY thing that differs between the two
   panels — same chassis, same rows, same spacing, same navy Ola — so the
   blue/warm split is the whole read: one thread is a public room, the
   other is sealed. Ola's avatar and name stay navy in both, because the
   heading's claim is that it is the same Ola on either side. */
/* The class that publishes --chat-* to the panel; the values, and their
   dark-mode counterparts, live in index.css. */
type Accent = 'chat-channel' | 'chat-private'

const BUBBLE = { backgroundColor: 'var(--chat-bubble)', color: 'var(--chat-bubble-ink)' }
const STRIP = { backgroundColor: 'var(--chat-strip)', color: 'var(--chat-strip-ink)' }

type Panel = {
  eyebrow: string
  title: string
  /** top-right pill: what kind of room this is */
  tag: { label: string; lock?: boolean }
  accent: Accent
  /** avatar stack; `ola` renders the mark instead of a character */
  roster: (string | 'ola')[]
  /** right side of the thread header */
  rosterMeta: string
  ask: string
  reply: string
  /** closing strip — a person for a teammate's action, a lock for a rule */
  strip: { label: string; icon: 'person' | 'lock' }
  chips: string[]
}

const PANELS: Panel[] = [
  {
    eyebrow: '群聊',
    title: '团队上下文，共同推进',
    tag: { label: '#项目推进' },
    accent: 'chat-channel',
    roster: ['你', '林', '苏'],
    rosterMeta: '6 位成员',
    ask: '@Ola 汇报本周还没完成的事项。',
    reply: '已整理 6 项，并同步到团队任务表。',
    strip: { icon: 'person', label: '林昊 接手了第 3 项' },
    chips: ['结果全群可见', '任何人都能继续'],
  },
  {
    eyebrow: '私聊',
    title: '个人上下文，彼此隔离',
    tag: { label: '仅你可见', lock: true },
    accent: 'chat-private',
    roster: ['你', 'ola'],
    rosterMeta: '你与 Ola',
    ask: '准备我明天的客户会议。',
    reply: '材料已整理，只在这次私聊中可见。',
    strip: { icon: 'lock', label: '不会带回任何群聊' },
    chips: ['只服务你', '私人内容不共享'],
  },
]

/* The mock card's chassis, as tokens rather than fixed hexes: it used to
   be a hard #f7f7f7 panel with a white bubble, which on the dark page was
   two of the brightest blocks on the whole home page. The accent tints
   below stay fixed — they are what says "public room" vs "sealed", and
   they still read on either card. */
const CARD = 'var(--color-linen)'

function ChatPanel({ panel }: { panel: Panel }) {
  const { accent } = panel

  return (
    <article
      className={`${accent} grid-field grid-field--navy flex flex-col rounded-[var(--radius-card)] p-5 sm:p-7`}
    >
      <div className="flex items-start justify-between gap-4 text-white">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/55">
            {panel.eyebrow}
          </p>
          <h3 className="mt-1 text-[20px] font-medium tracking-[-0.015em]">{panel.title}</h3>
        </div>
        {/* One pill shape on both sides. A hash or a lock is the glyph that
            says which kind of room this is — the panels used to put a pill
            on one and a 36px circle on the other, which threw the header
            rows out of alignment with each other. */}
        <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[12px] text-white/70">
          {panel.tag.lock && <LockMark />}
          {panel.tag.label}
        </span>
      </div>

      {/* No min-height: it was 284px against ~255px of content, which is
          the blank band that used to sit under the closing strip. */}
      <div
        className="mt-6 rounded-[14px] p-4 text-ink shadow-[0_18px_45px_-28px_rgba(0,0,0,0.75)] sm:p-5"
        style={{ backgroundColor: CARD }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-mist pb-3">
          <div className="flex -space-x-1.5" aria-hidden>
            {panel.roster.map((name, index) =>
              name === 'ola' ? (
                <span
                  key="ola"
                  className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border-2"
                  style={{ borderColor: CARD }}
                >
                  <OlaAvatar className="h-full w-full" />
                </span>
              ) : (
                <span
                  key={name}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-[10px] font-medium"
                  style={
                    index === 0
                      ? { borderColor: CARD, ...BUBBLE }
                      : { borderColor: CARD, backgroundColor: 'var(--color-mist)', color: 'var(--color-charcoal)' }
                  }
                >
                  {name}
                </span>
              ),
            )}
          </div>
          <span className="text-[11px] text-ash">{panel.rosterMeta}</span>
        </div>

        <div className="mt-4 space-y-3">
          <p
            className="ml-auto w-fit max-w-[88%] rounded-[10px] px-3 py-2 text-[13px]"
            style={BUBBLE}
          >
            {panel.ask}
          </p>

          <div className="flex items-start gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full">
              <OlaAvatar className="h-full w-full" />
            </span>
            <div className="min-w-0 flex-1 rounded-[10px] border border-mist bg-paper px-3 py-2.5">
              {/* navy-lit at night: #15315b on the dark card is 1.4:1. */}
              <p className="text-[11px] font-medium text-[var(--color-navy)] dark:text-[var(--color-navy-lit)]">Ola</p>
              <p className="mt-1 text-[13px] leading-[1.5]">{panel.reply}</p>
            </div>
          </div>

          {/* Same strip on both: one glyph in the strip's own ink, then the
              line. One reports a teammate picking the work up, the other
              reports the boundary holding — which is exactly the difference
              the section is claiming. */}
          <div
            className="flex items-center gap-2 rounded-[10px] px-3 py-2 text-[12px]"
            style={STRIP}
          >
            {panel.strip.icon === 'lock' ? <LockMark /> : <PersonMark />}
            {panel.strip.label}
          </div>
        </div>
      </div>

      {/* mt-auto, not mt-5: the grid holds both articles at one height, and
          if one thread's copy ever runs a line longer than the other's the
          slack has to go somewhere. On the navy above the chips it is
          invisible; inside the white card it reads as a dead gap. */}
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {panel.chips.map((label) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[12px] text-white/75"
          >
            <CheckMark />
            {label}
          </span>
        ))}
      </div>
    </article>
  )
}

export default function Workspace() {
  return (
    <section id="workspace" className="scroll-mt-[68px] border-t border-mist/70 bg-bone py-16 md:py-20">
      <div className="shell">
        <h2 className="t-heading-lg">同一个 Ola，两种信息边界</h2>

        <p className="t-subheading mt-4 max-w-[680px] text-ink/65 text-pretty">
          群聊使用团队上下文，结果全群共享；私聊只属于你，内容不会回到群里。
        </p>

        {/* items-stretch (the grid default) plus flex-col articles: the two
            panels stay the same height whatever the copy does. */}
        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          {PANELS.map((panel) => (
            <ChatPanel key={panel.eyebrow} panel={panel} />
          ))}
        </div>
      </div>
    </section>
  )
}
