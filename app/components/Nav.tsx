"use client";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white">
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <a href="#" className="flex items-center gap-2 text-[17px] font-semibold">
          <span className="font-mono-tight text-[20px] leading-none">Δ</span>
          <span className="tracking-tight">OLA</span>
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
