"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Seconds before it rises. */
  delay?: number;
  /** px to rise from (the "depth" of the sand). */
  y?: number;
  /** Starting blur in px. */
  blur?: number;
  once?: boolean;
  amount?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * SandReveal — "emerging from the depths of sand": content rises up, sharpens
 * out of a warm blur, and settles. A grainier, weightier cousin of <Reveal>
 * for headlines / section blocks. Reduced motion → instant, no transform.
 */
export default function SandReveal({
  children,
  className,
  delay = 0,
  y = 46,
  blur = 12,
  once = true,
  amount = 0.3,
}: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.985, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration: 1.05, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
