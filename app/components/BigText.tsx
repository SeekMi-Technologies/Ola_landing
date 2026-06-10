"use client";

import { useEffect, useRef, useState } from "react";

const LINE1 = "Lead to Quote, in Minutes";
const LINE2 = "Dedicated to B2B Sales";

// scroll progress milestones
const BG_START = 0.00;
const BG_END = 0.25;
const L1_START = 0.20;
const L1_END = 0.45;
const L2_START = 0.50;
const L2_END = 0.75;
const COLOR_START = 0.78;
const COLOR_END = 0.95;
const SCROLL_HINT_START = 0.92;
const SCROLL_HINT_END = 1.0;

function clamp(v: number, a = 0, b = 1) {
  return Math.min(Math.max(v, a), b);
}
function mapRange(p: number, a: number, b: number) {
  return clamp((p - a) / (b - a));
}
function lerpColor(p: number, c1: [number, number, number], c2: [number, number, number]) {
  const c = c1.map((v, i) => Math.round(v + (c2[i] - v) * p));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

const DARK: [number, number, number] = [10, 10, 11]; // #0A0A0B
const PAPER: [number, number, number] = [244, 244, 242]; // #F4F4F2

export default function BigText() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setP(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bgP = mapRange(p, BG_START, BG_END);
  const bg = lerpColor(bgP, DARK, PAPER);
  // text color flips to dark once background passes ~40% of the way to paper
  const textIsDark = bgP > 0.5;
  const textColor = textIsDark ? "#0A0A0B" : "#F4F4F2";

  const l1P = mapRange(p, L1_START, L1_END);
  const l2P = mapRange(p, L2_START, L2_END);
  const colorP = mapRange(p, COLOR_START, COLOR_END);
  const hintP = mapRange(p, SCROLL_HINT_START, SCROLL_HINT_END);

  return (
    <section
      ref={sectionRef}
      data-bigtext
      className="relative"
      style={{ height: "260vh", backgroundColor: bg, transition: "background-color 80ms linear" }}
    >
      <div className="sticky top-0 h-screen flex flex-col">
        {/* top labels row */}
        <div
          className="grid grid-cols-3 px-6 md:px-10 pt-28 pb-6 text-[11px] font-mono-tight uppercase tracking-[0.22em]"
          style={{ color: textColor, opacity: 0.7, transition: "color 120ms linear" }}
        >
          <div>Software</div>
          <div className="text-center">{`{ OLA }`}</div>
          <div className="text-right">Get Started</div>
        </div>

        {/* centered headline */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <h1
            className="font-semibold leading-[1.1] tracking-tightest text-[clamp(34px,5.6vw,84px)] whitespace-nowrap"
            style={{ color: textColor, transition: "color 120ms linear" }}
          >
            <ScrollLetters text={LINE1} progress={l1P} />
          </h1>

          <h2 className="font-semibold leading-[1.1] tracking-tightest text-[clamp(34px,5.6vw,84px)] mt-3 whitespace-nowrap relative">
            {/* base black version */}
            <span style={{ color: textColor, transition: "color 120ms linear" }}>
              <ScrollLetters text={LINE2} progress={l2P} />
            </span>
            {/* gradient overlay — wipes in left→right.
                Plain text (no char-split) so background-clip: text works.
                We delay it until l2P>=1 so misalignment isn't visible during black reveal. */}
            <span
              aria-hidden
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
              style={{
                opacity: l2P >= 1 ? 1 : 0,
                transition: "opacity 120ms linear",
              }}
            >
              <span
                className="headline-gradient whitespace-nowrap"
                style={{
                  clipPath: `inset(0 ${(1 - colorP) * 100}% 0 0)`,
                  transition: "clip-path 100ms linear",
                }}
              >
                {LINE2}
              </span>
            </span>
          </h2>
        </div>

        {/* scroll indicator — scroll-driven fade in at the very end */}
        <div
          className="pb-10 flex flex-col items-center"
          style={{
            color: textColor,
            opacity: hintP * 0.7,
            transform: `translateY(${(1 - hintP) * 12}px)`,
            transition: "color 120ms linear, opacity 80ms linear, transform 80ms linear",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="animate-bounce"
          >
            <path d="M12 4v16M5 13l7 7 7-7" />
          </svg>
          <div className="font-mono-tight text-[10px] uppercase tracking-[0.22em] mt-1">
            Scroll to Explore
          </div>
        </div>
      </div>
    </section>
  );
}

/** Reveals each character based on a global scroll progress (0..1) */
function ScrollLetters({ text, progress }: { text: string; progress: number }) {
  const chars = Array.from(text);
  const n = chars.length;
  return (
    <>
      {chars.map((ch, i) => {
        const start = i / n;
        const end = (i + 1) / n;
        const localP = clamp((progress - start) / (end - start));
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: localP,
              transform: `translateY(${(1 - localP) * 0.35}em)`,
              filter: `blur(${(1 - localP) * 6}px)`,
              transition: "opacity 60ms linear, transform 60ms linear, filter 60ms linear",
              whiteSpace: "pre",
            }}
          >
            {ch === " " ? " " : ch}
          </span>
        );
      })}
    </>
  );
}
