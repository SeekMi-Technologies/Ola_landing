"use client";

import { useEffect, useRef, useState } from "react";

export default function Nav() {
  const [isLight, setIsLight] = useState(false);
  const prev = useRef(false);

  useEffect(() => {
    const navBottom = 72;

    const check = () => {
      let light = false;
      // Solid light section (StagesScroll)
      document.querySelectorAll('[data-nav-light="true"]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= navBottom && r.bottom > navBottom) {
          light = true;
        }
      });

      // BigText flips from dark to light during its scroll; keep the glass controls readable.
      const bigText = document.querySelector("[data-bigtext]") as HTMLElement | null;
      if (bigText) {
        const r = bigText.getBoundingClientRect();
        if (r.top <= navBottom && r.bottom > navBottom) {
          const total = bigText.offsetHeight - window.innerHeight;
          const scrolled = Math.min(Math.max(-r.top, 0), total);
          const bgP = Math.min((total > 0 ? scrolled / total : 0) / 0.25, 1);
          light = bgP > 0.5; // matches BigText's own text-color flip
        }
      }

      if (light !== prev.current) {
        prev.current = light;
        setIsLight(light);
      }
    };

    let rafId: number;
    const loop = () => {
      check();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4 pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center justify-between px-5 md:px-8 py-3 rounded-xl border shadow-[0_14px_38px_rgba(0,0,0,0.12)] backdrop-blur-[2px] backdrop-saturate-125 transition-colors duration-300 ${
          isLight
            ? "bg-white/[0.05] border-black/[0.06] text-black"
            : "bg-white/[0.01] border-white/[0.12] text-white"
        }`}
      >
        <a href="#" className="flex items-center" aria-label="OLA home">
          <img
            src="/ola-logo.svg"
            alt="OLA"
            className={`h-[22px] md:h-[26px] w-auto select-none transition-[filter] duration-300 ${
              isLight ? "brightness-0" : ""
            }`}
            draggable={false}
          />
        </a>
        <div className="flex items-center gap-3">
          {/* <a
            href="https://pipipig-yz.github.io/ola_user_guide_v4/en/intro-en"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
              isLight
                ? "bg-black text-white hover:bg-black/80"
                : "bg-white text-black hover:bg-white/90"
            }`}
          >
            Docs
          </a> */}
          <a
            href="https://app.olatech.ai"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
              isLight
                ? "bg-black text-white hover:bg-black/80"
                : "bg-white text-black hover:bg-white/90"
            }`}
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
