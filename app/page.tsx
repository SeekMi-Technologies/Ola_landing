"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import BigText from "./components/BigText";
import BeyondChat from "./components/BeyondChat";
import StagesScroll from "./components/StagesScroll";
import Footer from "./components/Footer";

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative">
      <Nav />
      <Hero />
      <BigText />
      <BeyondChat />
      <StagesScroll />
      <Footer />
    </main>
  );
}
