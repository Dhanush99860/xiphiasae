"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Parallax travel in px (higher = stronger). The layer drifts ±speed as it crosses the viewport. */
  speed?: number;
};

/**
 * ParallaxLayer — drifts its child as it scrolls through the viewport. Pure
 * transform (cheap on mobile), reduced-motion → static. Stack 2–3 at different
 * speeds for depth. Wrap images/decor, not text-critical blocks.
 */
export default function ParallaxLayer({ children, className, speed = 60 }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}
