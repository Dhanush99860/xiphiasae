"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  /** SVG path data. */
  d: string;
  /** viewBox, default "0 0 100 100". */
  viewBox?: string;
  className?: string;
  strokeWidth?: number;
  /** Seconds before drawing. */
  delay?: number;
  /** Seconds to draw. */
  duration?: number;
  /** Gradient stops for the stroke (gold by default). */
  colors?: [string, string, string];
  once?: boolean;
  preserveAspectRatio?: string;
};

/**
 * An SVG line/path that draws itself on scroll-into-view (framer pathLength).
 * Gold filament by default — the connective motif used across sections.
 * Full (undrawn→drawn skipped) under reduced motion.
 */
export default function DrawLine({
  d,
  viewBox = "0 0 100 100",
  className,
  strokeWidth = 1.5,
  delay = 0,
  duration = 1.6,
  colors = ["#ffe9a8", "#d4af37", "#a87d1f"],
  once = true,
  preserveAspectRatio = "none",
}: Props) {
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden
      className={className}
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio={preserveAspectRatio}
    >
      <defs>
        <linearGradient id={`dl-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="50%" stopColor={colors[1]} />
          <stop offset="100%" stopColor={colors[2]} />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        stroke={`url(#dl-${id})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once, amount: 0.4 }}
        transition={{ pathLength: { duration, ease: [0.22, 1, 0.36, 1], delay }, opacity: { duration: 0.3, delay } }}
      />
    </svg>
  );
}
