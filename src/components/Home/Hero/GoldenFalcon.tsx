"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EAGLE_PATH } from "./eaglePath";

/**
 * GoldenFalcon — the XIPHIAS eagle (the brand logo bird) rendered as a single
 * GOLD OUTLINE stroke that draws itself on (framer pathLength). Horizontal,
 * flying right, broad wings with splayed finger-feathers — nothing filled, just
 * the contour tracing on like a hand drawing it. Soft gold aura + slow glide.
 * Decorative backdrop for the hero media panel; route cards sit on top.
 * Reduced motion → fully drawn, static.
 */
export default function GoldenFalcon({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 grid place-items-center ${className ?? ""}`}>
      {/* Gold aura behind the bird */}
      <div
        aria-hidden
        className="absolute h-[58%] w-[82%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.18), transparent 70%)" }}
      />
      <motion.svg
        aria-hidden
        viewBox="-160 -25 2020 1200"
        className="relative w-[94%]"
        fill="none"
        style={{ filter: "drop-shadow(0 0 16px rgba(212,175,55,0.30))" }}
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
      >
        <defs>
          <linearGradient id="eagle-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe9a8" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#a87d1f" />
          </linearGradient>
        </defs>
        <motion.path
          d={EAGLE_PATH}
          stroke="url(#eagle-gold)"
          strokeWidth={8}
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            pathLength: { duration: 2.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
            opacity: { duration: 0.4, delay: 0.2 },
          }}
        />
      </motion.svg>
    </div>
  );
}
