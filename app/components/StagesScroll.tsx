"use client";

import { useEffect, useRef, useState } from "react";
import LetterReveal from "./LetterReveal";
import OptionalMedia from "./OptionalMedia";

const ASPECT_W = 3024;
const ASPECT_H = 1716;
// scroll distance per stage (vh) — bigger = slower / more linger time
const STAGE_VH = 210;
// extra scroll at the very end so the last stage (logo wall) has room to
// linger before the section transitions out
const TRAILING_VH = 40;

type StageKind = "app" | "chat" | "logos";

const stages: {
  num: string;
  headline: string;
  body: string;
  kind: StageKind;
  img: string;
}[] = [
  {
    num: "0.1",
    headline: "Forward. Negotiate. Done.",
    body:
      "Forward an RFQ to OLA. It carries the back-and-forth with your customer — gathers every clarification, holds the line on pricing — and hands you a quote-ready package to approve.",
    kind: "app",
    img: "/ola_ref/email.png",
  },
  {
    num: "0.2",
    headline: "Quote at the speed of chat.",
    body:
      "Ask anything — pricing, lead-times, configurations. OLA reads your data, runs the logic, returns the quote. No SaaS hopping, no spreadsheet hunting.",
    kind: "chat",
    img: "/ola_ref/askola.png",
  },
  {
    num: "0.3",
    headline: "Plugs into your stack.",
    body:
      "Salesforce, SAP, WhatsApp, Gmail — OLA integrates seamlessly with the tools your team already uses. More integrations coming soon.",
    kind: "logos",
    img: "/ola_ref/s4_logos.png", // unused — LogoWall component handles this stage
  },
];

export default function StagesScroll() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      // Active-stage detection ignores the trailing buffer so the last stage
      // stays "active" while the trailing portion scrolls past.
      const stageScrollPx =
        (stages.length * STAGE_VH * window.innerHeight) / 100;
      const total = Math.max(stageScrollPx - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;
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

  const current = stages[active];

  return (
    <section
      ref={sectionRef}
      data-nav-light="true"
      className="relative bg-paper text-ink"
      style={{ height: `${stages.length * STAGE_VH + TRAILING_VH}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="absolute inset-0 grid-backdrop-light opacity-50 pointer-events-none" />

        {/* progress bar */}
        <div className="relative pt-24 pb-6 px-6 md:px-10 flex items-center gap-3 font-mono-tight text-[14px] md:text-[16px] shrink-0">
          {stages.map((s, i) => (
            <div
              key={s.num}
              className="flex items-center gap-3 flex-1 last:flex-none"
            >
              <button
                onClick={() => {
                  const el = sectionRef.current;
                  if (!el) return;
                  const stageScrollPx =
                    (stages.length * STAGE_VH * window.innerHeight) / 100;
                  const target =
                    el.offsetTop +
                    (i / stages.length) *
                      Math.max(stageScrollPx - window.innerHeight, 1) +
                    4;
                  window.scrollTo({ top: target, behavior: "smooth" });
                }}
                className={`transition-colors duration-300 tabular-nums ${
                  i === active ? "text-ink" : "text-ink/35 hover:text-ink/60"
                }`}
              >
                {i === active ? `[${s.num}]` : s.num}
              </button>
              {i < stages.length - 1 && (
                <div className="flex-1 h-px bg-ink/15 relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-ink transition-[width] duration-500"
                    style={{
                      width:
                        i < active ? "100%" : i === active ? "30%" : "0%",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* main: left headline / right body + frame */}
        <div className="relative flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-6 md:px-10 pb-10">
          {/* LEFT */}
          <div className="flex items-center">
            <h2 className="font-semibold leading-[1.05] tracking-tight text-[clamp(24px,3.4vw,56px)] whitespace-nowrap">
              <LetterReveal
                text={current.headline}
                triggerKey={`hl-${active}`}
                stagger={18}
              />
            </h2>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col">
            <p className="text-ink/70 text-[clamp(15px,1.3vw,20px)] leading-relaxed max-w-xl">
              <LetterReveal
                text={current.body}
                triggerKey={`body-${active}`}
                stagger={6}
                baseDelay={120}
              />
            </p>

            <div className="mt-6 flex-1 min-h-0 flex items-center">
              <div
                className="relative w-full rounded-xl overflow-hidden border border-ink/10 bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)]"
                style={{ aspectRatio: `${ASPECT_W} / ${ASPECT_H}` }}
              >
                {stages.map((s, i) => (
                  <div
                    key={s.num}
                    className={`absolute inset-0 stage-fade ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {s.kind === "logos" ? (
                      <StageVisual kind="logos" />
                    ) : (
                      <OptionalMedia
                        src={s.img}
                        alt={s.headline}
                        fallback={<StageVisual kind={s.kind} />}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Stage visuals
   ────────────────────────────────────────────── */

function StageVisual({ kind }: { kind: StageKind }) {
  if (kind === "logos") return <LogoWall />;
  if (kind === "chat") return <ChatMock />;
  return <AppMock />;
}

function AppMock() {
  return (
    <div className="relative h-full w-full bg-white flex flex-col">
      <ChromeBar path="app.ola.ai / inbox" />
      <div className="flex-1 grid grid-cols-12 gap-3 p-4 min-h-0">
        <div className="col-span-2 space-y-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-3 bg-ink/[0.05] rounded"
              style={{ width: `${50 + ((i * 13) % 40)}%` }}
            />
          ))}
        </div>
        <div className="col-span-10 space-y-3">
          <div className="flex gap-3">
            <div className="h-16 flex-1 bg-ink/[0.04] rounded" />
            <div className="h-16 flex-1 bg-ink/[0.04] rounded" />
            <div className="h-16 flex-1 bg-ink/[0.04] rounded" />
            <div className="h-16 flex-1 bg-ink/[0.04] rounded" />
          </div>
          <div className="h-3 w-1/4 bg-ink/[0.08] rounded" />
          <div className="space-y-1.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-7 bg-ink/[0.02] border border-ink/[0.06] rounded flex items-center px-3 gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-ink/30" />
                <div
                  className="h-2 bg-ink/10 rounded"
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

function ChatMock() {
  return (
    <div className="relative h-full w-full bg-white flex flex-col">
      <ChromeBar path="app.ola.ai / askola" />
      <div className="flex-1 grid grid-cols-12 gap-3 p-4 min-h-0">
        <div className="col-span-2 space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-3 bg-ink/[0.05] rounded"
              style={{ width: `${50 + ((i * 13) % 40)}%` }}
            />
          ))}
        </div>
        <div className="col-span-10 flex flex-col items-center justify-center px-6 gap-6 min-h-0">
          <div className="font-semibold text-ink text-[clamp(20px,2.4vw,32px)] tracking-tightest text-center">
            What can I do for you?
          </div>
          <div className="w-full max-w-[640px] rounded-xl border border-ink/10 px-4 py-3 flex items-center gap-3">
            <div className="text-ink/35 text-sm flex-1">Ask anything</div>
            <div className="w-6 h-6 rounded-full bg-ink/10" />
            <div className="w-8 h-8 rounded-full bg-ink grid place-items-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.2"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoWall() {
  const logos = [
    { name: "Salesforce", src: "/ola_ref/salesforce.png" },
    { name: "SAP", src: "/ola_ref/sap.png" },
    { name: "WhatsApp", src: "/ola_ref/whatsapp.png" },
    { name: "Gmail", src: "/ola_ref/gmail.png" },
  ];
  return (
    <div className="relative h-full w-full bg-white grid grid-cols-2 grid-rows-2">
      {logos.map((logo, i) => (
        <div
          key={logo.name}
          className={`flex items-center justify-center p-6 md:p-10 ${
            i % 2 === 0 ? "border-r" : ""
          } ${i < 2 ? "border-b" : ""} border-ink/10`}
        >
          <img
            src={logo.src}
            alt={logo.name}
            className="max-h-[50%] max-w-[65%] object-contain"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

function ChromeBar({ path }: { path: string }) {
  return (
    <div className="h-9 border-b border-ink/10 flex items-center px-3 gap-1.5 shrink-0">
      <span className="w-2.5 h-2.5 rounded-full bg-ink/10" />
      <span className="w-2.5 h-2.5 rounded-full bg-ink/10" />
      <span className="w-2.5 h-2.5 rounded-full bg-ink/10" />
      <span className="font-mono-tight text-[10px] text-ink/40 ml-4 truncate">
        {path}
      </span>
    </div>
  );
}
