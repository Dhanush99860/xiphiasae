"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

type Props = {
  /** Side to pin the spine to. */
  side?: "start" | "center";
};

/**
 * ScrollGuideLine — a thin golden "spine" pinned down the page that FILLS with
 * scroll progress, with a glowing node marking your position. A single guiding
 * line tying every page together (mounted globally in SiteChrome). Desktop only,
 * pointer-events-none, hidden under reduced motion.
 */
export default function ScrollGuideLine({ side = "start" }: Props) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.3 });
  const nodeTop = useTransform(progress, (v) => `${Math.min(99.5, v * 100)}%`);

  if (reduce) return null;

  const pos = side === "center" ? "left-1/2 -translate-x-1/2" : "start-4 lg:start-6";

  return (
    <div aria-hidden className={`pointer-events-none fixed inset-y-0 z-30 hidden md:block ${pos}`}>
      <div className="relative h-full w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent">
        {/* filled progress portion */}
        <motion.div
          className="absolute inset-x-0 top-0 h-full w-px origin-top bg-gradient-to-b from-gold/0 via-gold/60 to-gold"
          style={{ scaleY: progress }}
        />
        {/* glowing travelling node */}
        <motion.span
          className="absolute -start-[3.5px] h-2 w-2 rounded-full bg-gold"
          style={{ top: nodeTop, boxShadow: "0 0 12px 3px rgba(212,175,55,0.55)" }}
        />
      </div>
    </div>
  );
}
