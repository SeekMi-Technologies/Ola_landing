"use client";

import { useEffect, useRef, useState } from "react";

const DARK = "#0A0A0B";
const PAPER = "#F4F4F2";

export default function Nav() {
  const [isLight, setIsLight] = useState(false);
  const [bg, setBg] = useState(DARK);
  const prev = useRef({ light: false, bg: DARK });

  useEffect(() => {
    const navBottom = 72;

    const check = () => {
      let light = false;
      let color = DARK;

      // Solid light section (StagesScroll)
      document.querySelectorAll('[data-nav-light="true"]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= navBottom && r.bottom > navBottom) {
          light = true;
          color = PAPER;
        }
      });

      // BigText: bg interpolates dark→light over the first 25% of its scroll.
      // Mirror that exact color so the nav fill never mismatches the gradient.
      const bigText = document.querySelector("[data-bigtext]") as HTMLElement | null;
      if (bigText) {
        const r = bigText.getBoundingClientRect();
        if (r.top <= navBottom && r.bottom > navBottom) {
          const total = bigText.offsetHeight - window.innerHeight;
          const scrolled = Math.min(Math.max(-r.top, 0), total);
          const bgP = Math.min((total > 0 ? scrolled / total : 0) / 0.25, 1);
          const ch = (a: number, b: number) => Math.round(a + (b - a) * bgP);
          color = `rgb(${ch(10, 244)}, ${ch(10, 244)}, ${ch(11, 242)})`;
          light = bgP > 0.5; // matches BigText's own text-color flip
        }
      }

      if (light !== prev.current.light || color !== prev.current.bg) {
        prev.current = { light, bg: color };
        setIsLight(light);
        setBg(color);
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
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4"
      style={{ backgroundColor: bg }}
    >
      <div
        className={`flex items-center justify-between px-5 md:px-8 py-3 rounded-xl backdrop-blur-xl border transition-colors duration-300 ${
          isLight
            ? "bg-black/[0.04] border-transparent text-black"
            : "bg-white/[0.06] border-white/[0.12] text-white"
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
    </nav>
  );
}
