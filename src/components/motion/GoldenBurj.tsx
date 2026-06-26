"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * GoldenBurj — Burj Khalifa as gold line-art that draws itself on (framer
 * pathLength). A local UAE landmark companion to <GoldenFalcon>; use as a
 * decorative section accent on the light Desert Sand ground. Reduced motion →
 * fully drawn, static.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const OUTLINE =
  "M 64 488 L 64 410 L 73 410 L 73 346 L 81 346 L 81 288 L 87 288 L 87 232 L 92 232 L 92 178 L 96 178 L 96 126 L 99 126 L 99 70 L 100 40 L 100 12 L 101 40 L 101 70 L 104 70 L 104 126 L 108 126 L 108 178 L 113 178 L 113 232 L 119 232 L 119 288 L 125 288 L 125 346 L 133 346 L 133 410 L 142 410 L 142 488 Z";

const DETAIL: { d: string; w: number }[] = [
  { d: "M 88 480 L 95 150", w: 0.8 },
  { d: "M 118 480 L 110 150", w: 0.8 },
  { d: "M 103 480 L 103 120", w: 0.8 },
  { d: "M 81 346 L 125 346", w: 0.7 },
  { d: "M 87 288 L 119 288", w: 0.7 },
  { d: "M 92 232 L 113 232", w: 0.7 },
  { d: "M 96 178 L 108 178", w: 0.7 },
];

export default function GoldenBurj({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const stroke = (d: string, w: number, delay: number, key: string, dur = 1.2) => (
    <motion.path
      key={key}
      d={d}
      stroke="url(#burj-gold)"
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ pathLength: { duration: dur, ease: EASE, delay }, opacity: { duration: 0.3, delay } }}
    />
  );

  return (
    <div className={`pointer-events-none ${className ?? ""}`} aria-hidden>
      <svg
        viewBox="0 0 200 500"
        fill="none"
        className="h-full w-full"
        style={{ filter: "drop-shadow(0 0 10px rgba(212,175,55,0.25))" }}
      >
        <defs>
          <linearGradient id="burj-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e1b923" />
            <stop offset="60%" stopColor="#c79a2e" />
            <stop offset="100%" stopColor="#a87d1f" />
          </linearGradient>
        </defs>
        {stroke(OUTLINE, 2, 0.1, "out", 1.9)}
        <g>{DETAIL.map((s, i) => stroke(s.d, s.w, 0.6 + i * 0.07, `d-${i}`, 0.9))}</g>
      </svg>
    </div>
  );
}
