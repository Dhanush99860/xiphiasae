"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

/**
 * VelocityMarquee — the required velocity-aware infinite ribbon (Section 4). It
 * drifts on its own, but its speed AND direction follow the user's scroll energy:
 * fling down and it races forward, scroll up and it reverses, and it skews a touch
 * at speed then springs flat. The only velocity-reactive element on the page.
 * Items render exactly twice for a seamless wrap. Reduced motion → one static row.
 */
export default function VelocityMarquee({
  items,
  baseSpeed = 0.012,
  className = "",
}: {
  items: React.ReactNode[];
  baseSpeed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { stiffness: 400, damping: 60 });
  const factor = useTransform(smooth, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2000, 2000], [2, -2], { clamp: true });
  const directionRef = useRef(1);

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_t, delta) => {
    if (reduce) return;
    let moveBy = directionRef.current * baseSpeed * delta;
    const f = factor.get();
    if (f !== 0) directionRef.current = f < 0 ? -1 : 1;
    moveBy += f * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  if (reduce) {
    return (
      <div className={`flex justify-center gap-10 overflow-hidden ${className}`}>
        {items}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div className="flex w-max flex-nowrap" style={{ x, skewX: skew }}>
        <div className="flex flex-nowrap items-center gap-10 pe-10">{items}</div>
        <div className="flex flex-nowrap items-center gap-10 pe-10" aria-hidden>
          {items}
        </div>
      </motion.div>
    </div>
  );
}
