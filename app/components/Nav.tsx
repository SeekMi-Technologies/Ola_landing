"use client";

import { useEffect, useRef, useState } from "react";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  // true  -> dark background behind the button  -> light (white) button
  // false -> light background behind the button -> dark button
  const [darkBehind, setDarkBehind] = useState(true);

  useEffect(() => {
    // Perceived brightness of a computed `rgb()/rgba()` string.
    // Returns null for transparent colors so we keep looking deeper.
    function luminance(color: string): number | null {
      const m = color.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const [r, g, b, a = 1] = m[1].split(",").map((s) => parseFloat(s.trim()));
      if (a === 0) return null;
      return 0.299 * r + 0.587 * g + 0.114 * b;
    }

    // Look at what's actually rendered right under the button and pick the
    // first element that has a real (non-transparent) background color.
    // Text elements are usually transparent, so we read past them to the
    // section's background — which is exactly what we want to contrast against.
    function update() {
      const nav = navRef.current;
      if (!nav) return;
      const x = window.innerWidth - 60; // near the button, right side
      const y = 28; // vertical center of the nav
      for (const el of document.elementsFromPoint(x, y)) {
        if (nav.contains(el)) continue; // ignore the nav/button/logo itself
        const lum = luminance(getComputedStyle(el).backgroundColor);
        if (lum === null) continue; // transparent — keep going deeper
        setDarkBehind(lum < 128);
        return;
      }
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 text-white">
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <a href="#" className="flex items-center" aria-label="OLA home">
          <img
            src="/ola-logo-white.png"
            alt="OLA"
            className="h-[22px] md:h-[26px] w-auto select-none mix-blend-difference"
            draggable={false}
          />
        </a>
        <a
          href="https://app.olatech.ai"
          target="_blank"
          rel="noopener noreferrer"
          className={
            "px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 " +
            (darkBehind
              ? "bg-white text-black hover:bg-white/90"
              : "bg-ink text-white hover:bg-ink/90")
          }
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}
