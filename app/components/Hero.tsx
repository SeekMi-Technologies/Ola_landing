"use client";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink text-white">
      {/* atmospheric backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(80,70,120,0.25) 0%, rgba(40,35,60,0.15) 30%, #0a0a0b 70%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 80% at 50% 100%, rgba(120,100,200,0.16) 0%, transparent 70%)",
        }}
      />

      {/* Video framed like a real app window — chrome bar + 16:9 video */}
      <div className="absolute inset-x-0 top-[13vh] flex justify-center px-6 md:px-10 pointer-events-none">
        <div
          className="rounded-2xl overflow-hidden border border-white/15 shadow-[0_80px_180px_-30px_rgba(0,0,0,0.9),_0_0_120px_-30px_rgba(120,100,200,0.3)] bg-[#0d0d10]"
          style={{ width: "min(75vw, calc(54vh * 16 / 9))" }}
        >
          {/* window chrome */}
          <div className="h-9 border-b border-white/10 flex items-center px-3 gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="font-mono-tight text-[10px] text-white/40 ml-4 truncate">
              app.olatech.ai
            </span>
          </div>
          {/* video */}
          <div style={{ aspectRatio: "16 / 9" }} className="bg-black">
            <video
              src="/ola_ref/demo_video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover block"
            />
          </div>
        </div>
      </div>

      {/* Giant ΔOLA wordmark — bottom-left, Palantir-style */}
      <div className="absolute bottom-8 left-6 md:left-10 leading-none select-none pointer-events-none">
        <img
          src="/ola-logo-white.png"
          alt="OLA"
          className="w-auto block"
          style={{ height: "clamp(56px, 11vw, 170px)" }}
          draggable={false}
        />
      </div>

      {/* Bottom-right mono labels (Palantir-style corner copy) */}
      <div className="absolute bottom-8 right-6 md:right-10 grid grid-cols-1 gap-5 text-[10px] md:text-[11px] font-mono-tight uppercase tracking-[0.18em] text-white/65 max-w-[220px] text-right select-none">
        <div>
          <div>Explore</div>
          <div>Our Sales</div>
          <div>AI Platform</div>
        </div>
        <div>
          <div>Time: 5 Mns</div>
          <div>Scroll</div>
          <div>To Explore</div>
        </div>
        <div>
          <div>Integrate AI Into</div>
          <div>B2B Sales</div>
          <div>Decision Making</div>
        </div>
        <div className="opacity-60">
          <div>© {new Date().getFullYear()}</div>
          <div>OLA, Inc.</div>
        </div>
      </div>
    </section>
  );
}
