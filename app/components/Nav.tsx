"use client";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white">
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <a href="#" className="flex items-center" aria-label="OLA home">
          <img
            src="/ola-logo-white.png"
            alt="OLA"
            className="h-[22px] md:h-[26px] w-auto select-none"
            draggable={false}
          />
        </a>
        <a
          href="https://app.olatech.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}
