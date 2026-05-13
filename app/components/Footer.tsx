"use client";

import { useEffect, useRef, useState } from "react";
import LetterReveal from "./LetterReveal";

export default function Footer() {
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setReveal(true);
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer id="get-started" className="relative bg-ink text-white">
      {/* ─── CTA ─── */}
      <section
        ref={ctaRef}
        className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 md:px-10 py-32 overflow-hidden"
      >
        <div className="absolute inset-0 grid-backdrop opacity-50 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.18) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10">
          <div className="font-mono-tight uppercase tracking-[0.22em] text-[11px] text-white/50 mb-6">
            {`{ Get Started }`}
          </div>

          <h2 className="font-semibold tracking-tightest leading-[1.02] text-[clamp(44px,7vw,112px)]">
            {reveal && (
              <LetterReveal text="See OLA in action." triggerKey="cta-h" stagger={26} />
            )}
          </h2>

          <p className="text-white/65 text-[clamp(16px,1.6vw,22px)] mt-6 max-w-2xl mx-auto leading-relaxed">
            {reveal && (
              <LetterReveal
                text="5 minutes to your first quote. 1/10 the cost of legacy SaaS."
                triggerKey="cta-b"
                stagger={10}
                baseDelay={900}
              />
            )}
          </p>

          <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://app.olatech.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-white text-black text-[15px] font-medium hover:bg-white/90 transition"
            >
              Get a Demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="mailto:duke@olatech.ai?subject=Talk%20to%20Sales"
              className="inline-flex items-center gap-2 px-5 py-4 text-white/80 hover:text-white text-[15px] font-medium transition"
            >
              Talk to Sales
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER: single compact line ─── */}
      <section className="relative border-t border-white/10 px-6 md:px-10 py-6 flex items-center justify-between gap-4 text-[11px] font-mono-tight uppercase tracking-[0.18em] text-white/50">
        <a href="#" className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition normal-case font-semibold tracking-tight text-[14px]">
          <span className="font-mono-tight text-[16px] leading-none">Δ</span>
          <span>OLA</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="mailto:ola@olatech.ai" className="hover:text-white transition normal-case tracking-normal">
            ola@olatech.ai
          </a>
          <span className="text-white/30">·</span>
          <span>© {new Date().getFullYear()} OLA Technologies, Inc.</span>
        </div>
      </section>
    </footer>
  );
}
