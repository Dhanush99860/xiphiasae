"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Mode = "curtain" | "shutter" | "blurscale" | "hpan";

/**
 * ScrubReveal3D — gives Section 3 four DISTINCT entrance grammars so no two
 * Pathways blocks arrive alike and none is the rejected slide-in-once:
 *  - curtain   : vertical clip-path wipe (top→down) with a gold seam riding the edge
 *  - shutter   : horizontal clip-path open from the centre
 *  - blurscale : scale 0.92→1 + blur 12→0 bound to the block's own scroll progress
 *  - hpan      : the block scrubs horizontally as it passes through the viewport
 *
 * curtain/shutter use CSS-transition clip-path (toggled by useInView — framer
 * won't animate clip-path here); blurscale/hpan use scroll-bound transforms.
 * Reduced motion → plain block, each still distinct by layout.
 */
export default function ScrubReveal3D({
  mode,
  children,
  className = "",
}: {
  mode: Mode;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const filter = useTransform(scrollYProgress, [0, 1], [12, 0], { clamp: true });
  const filterStr = useTransform(filter, (b) => `blur(${b}px)`);
  const xPan = useTransform(scrollYProgress, [0, 1], [48, -48]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  if (mode === "blurscale") {
    return (
      <motion.div ref={ref} className={className} style={{ scale, filter: filterStr }}>
        {children}
      </motion.div>
    );
  }

  if (mode === "hpan") {
    return (
      <motion.div ref={ref} className={className} style={{ x: xPan }}>
        {children}
      </motion.div>
    );
  }

  const clipClosed = mode === "curtain" ? "inset(0 0 100% 0)" : "inset(0 50% 0 50%)";
  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        clipPath: inView ? "inset(0 0 0 0)" : clipClosed,
        transition: "clip-path 1s cubic-bezier(.16,1,.3,1)",
      }}
    >
      {children}
      {mode === "curtain" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-[3] h-px bg-gold/70"
          style={{ top: inView ? "100%" : "0%", transition: "top 1s cubic-bezier(.16,1,.3,1)" }}
        />
      ) : null}
    </div>
  );
}
