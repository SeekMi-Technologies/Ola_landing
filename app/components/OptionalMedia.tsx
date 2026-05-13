"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders an <img> for image paths or <video> for video paths, based on file
 * extension. Falls back to `fallback` when the asset is missing or fails.
 *
 * Lazy-mounts the media via IntersectionObserver — the heavy network request
 * (especially for autoplay videos) is deferred until the user is within ~1
 * viewport of seeing this element. Keeps initial page load fast even when
 * multiple videos sit in pinned sections below the fold.
 */
export default function OptionalMedia({
  src,
  alt,
  fallback,
  className = "w-full h-full object-cover object-top",
}: {
  src: string;
  alt: string;
  fallback: ReactNode;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (near) return;
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0% 100% 0%" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  const isVideo = /\.(mp4|webm|ogg|mov|m4v)$/i.test(src);

  return (
    <div ref={wrapperRef} className="w-full h-full">
      {!near || failed ? (
        <>{fallback}</>
      ) : isVideo ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={className}
          onError={() => setFailed(true)}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className={className}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
