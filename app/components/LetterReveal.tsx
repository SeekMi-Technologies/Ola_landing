"use client";

import React from "react";

type Props = {
  text: string;
  /** Changes to this key restart the animation */
  triggerKey?: string | number;
  /** Base delay before animation begins (ms) */
  baseDelay?: number;
  /** Per-letter stagger (ms) */
  stagger?: number;
  className?: string;
};

export default function LetterReveal({
  text,
  triggerKey = "static",
  baseDelay = 0,
  stagger = 28,
  className = "",
}: Props) {
  // Split into words + whitespace tokens. Words render as inline-block (so the
  // browser cannot break a word mid-character), spaces render as plain text so
  // line wrapping happens at word boundaries.
  const tokens = text.split(/(\s+)/).filter((t) => t.length > 0);
  let charIndex = 0;

  return (
    <span className={className} aria-label={text}>
      {tokens.map((token, tIdx) => {
        if (/^\s+$/.test(token)) {
          return <React.Fragment key={`s-${tIdx}`}>{token}</React.Fragment>;
        }
        const chars = Array.from(token);
        return (
          <span
            key={`${triggerKey}-w-${tIdx}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {chars.map((ch, ci) => {
              const i = charIndex++;
              return (
                <span
                  key={`${triggerKey}-${tIdx}-${ci}`}
                  className="letter"
                  style={{ animationDelay: `${baseDelay + i * stagger}ms` }}
                  aria-hidden
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
