"use client";

import { motion, useReducedMotion } from "framer-motion";

type Direction = "left" | "right" | "up" | "down";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Side the element travels in FROM. */
  from?: Direction;
  /** Travel distance in px. */
  distance?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
};

const OFFSET: Record<Direction, { x: number; y: number }> = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
};

/**
 * SlideReveal — directional reveal (slides in from a chosen side while fading in).
 * The "Living Horizon" vocabulary leans on horizontal motion: image windows slide
 * in from alternating sides, text from the opposite side — so motion is varied,
 * not just the usual up/down fade.
 *
 * Reduced motion → renders statically.
 */
export default function SlideReveal({
  children,
  className,
  from = "left",
  distance = 64,
  duration = 0.9,
  delay = 0,
  once = true,
}: Props) {
  const reduce = useReducedMotion();
  const o = OFFSET[from];

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ x: o.x * distance, y: o.y * distance, opacity: 0 }}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
