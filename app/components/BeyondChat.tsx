"use client";

import { useEffect, useRef, useState } from "react";
import LetterReveal from "./LetterReveal";
import OptionalMedia from "./OptionalMedia";

// product screenshot aspect (3024 × 1716)
const ASPECT_W = 3024;
const ASPECT_H = 1716;
// scroll distance per stage (vh) — bigger = slower / more linger time
const STAGE_VH = 180;

const stages = [
  {
    num: "01",
    label: "AI APP",
    caption: "AskOLA completes the lead-to-quote in a single chat.",
    img: "/ola_ref/demo_video.mp4",
  },
  {
    num: "02",
    label: "WORKBENCH",
    caption: "Take over anytime — edit, override, or enter manually.",
    img: "/ola_ref/workbench_video.mp4",
  },
  {
    num: "03",
    label: "MISSION CONTROL",
    caption: "Every lead, every quote, every action — at a glance.",
    img: "/ola_ref/mission_control_video.mp4",
  },
];

export default function BeyondChat() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      const idx = Math.min(
        stages.length - 1,
        Math.floor(progress * stages.length)
      );
      setActive(idx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink text-white"
      style={{ height: `${stages.length * STAGE_VH}vh` }}
      id="beyond-chat"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="absolute inset-0 grid-backdrop opacity-50 pointer-events-none" />

        {/* HEADER: left title, right 3 stage boxes */}
        <div className="relative pt-24 pb-8 px-6 md:px-10 flex items-end justify-between gap-8 shrink-0">
          <div className="shrink-0">
            <h2 className="font-medium tracking-tightest text-[clamp(36px,5vw,72px)] leading-none">
              More than Chat
            </h2>
            <p className="text-white/40 text-[clamp(18px,1.6vw,22px)] mt-2 leading-none">
              Explore OLA
            </p>
          </div>

          <div className="hidden md:grid grid-cols-3 gap-3 w-[min(54vw,720px)]">
            {stages.map((s, i) => (
              <button
                key={s.num}
                onClick={() => {
                  const el = sectionRef.current;
                  if (!el) return;
                  const target =
                    el.offsetTop +
                    (i / stages.length) *
                      (el.offsetHeight - window.innerHeight) +
                    4;
                  window.scrollTo({ top: target, behavior: "smooth" });
                }}
                className={`text-left border rounded-md px-4 py-3 transition-all duration-500 ${
                  i === active
                    ? "border-white bg-white/[0.04]"
                    : "border-white/15 text-white/40 hover:border-white/30"
                }`}
              >
                <div className="font-mono-tight uppercase tracking-[0.18em] text-[10px]">
                  {s.label}
                </div>
                <div className="font-mono-tight text-[28px] leading-none mt-3">
                  {s.num}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Window-framed product viewport — chrome bar + 3024:1716 image.
            Same wrapping style as Hero. */}
        <div className="relative flex-1 min-h-0 grid place-items-center px-6 md:px-10 pb-4">
          <div
            className="relative rounded-xl overflow-hidden border border-white/15 bg-[#0d0d10] shadow-[0_60px_140px_-30px_rgba(0,0,0,0.8),_0_0_120px_-30px_rgba(120,100,200,0.18)] flex flex-col"
            style={{
              aspectRatio: `${ASPECT_W} / ${ASPECT_H}`,
              height: "100%",
              maxWidth: "100%",
            }}
          >
            {/* chrome bar */}
            <div className="h-9 border-b border-white/10 flex items-center px-3 gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="font-mono-tight text-[10px] text-white/40 ml-4 truncate">
                app.olatech.ai
              </span>
            </div>

            {/* image area */}
            <div className="relative flex-1 min-h-0">
              {stages.map((s, i) => (
                <div
                  key={s.num}
                  className={`absolute inset-0 stage-fade ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <OptionalMedia
                    src={s.img}
                    alt={s.label}
                    fallback={<StageMock label={s.label} />}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* caption strip */}
        <div className="relative px-6 md:px-10 pb-8 text-center shrink-0">
          <p className="font-mono-tight uppercase tracking-[0.18em] text-[12px] md:text-[13px] text-white/80">
            <LetterReveal
              text={stages[active].caption}
              triggerKey={`cap-${active}`}
              stagger={16}
            />
          </p>
        </div>
      </div>
    </section>
  );
}

/** Mock product UI — drop a real <img src="/ola_ref/product_page.png" /> here later. */
function StageMock({ label }: { label: string }) {
  return (
    <div className="relative h-full w-full bg-[#0d0d10] flex flex-col">
      <div className="h-9 border-b border-white/10 flex items-center px-3 gap-1.5 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="font-mono-tight text-[10px] text-white/40 ml-4 truncate">
          app.ola.ai / {label.toLowerCase().replace(/\s+/g, "-")}
        </span>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-3 p-4 min-h-0">
        <div className="col-span-2 space-y-2">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="h-3 bg-white/[0.06] rounded"
              style={{ width: `${50 + ((i * 13) % 40)}%` }}
            />
          ))}
        </div>
        <div className="col-span-10 space-y-3">
          <div className="flex gap-3">
            <div className="h-16 flex-1 bg-white/[0.04] rounded" />
            <div className="h-16 flex-1 bg-white/[0.04] rounded" />
            <div className="h-16 flex-1 bg-white/[0.04] rounded" />
            <div className="h-16 flex-1 bg-white/[0.04] rounded" />
          </div>
          <div className="h-3 w-1/4 bg-white/[0.08] rounded" />
          <div className="space-y-1.5">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="h-7 bg-white/[0.03] border border-white/[0.04] rounded flex items-center px-3 gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <div
                  className="h-2 bg-white/10 rounded"
                  style={{ width: `${30 + ((i * 17) % 50)}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
