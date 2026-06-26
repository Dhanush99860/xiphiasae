"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * OdometerTally — Section 6's grammar AND a "numbers change on scroll" moment:
 * the value is bound to the section's own scroll progress, so it tallies UP as you
 * scroll in and DOWN if you scroll back (not a fire-once counter) and resolves to
 * the exact figure at rest. A faint vertical "tick" plays on each integer change
 * for the odometer feel. Reduced motion → the final number, static.
 */
export default function OdometerTally({
  to,
  prefix = "",
  suffix = "",
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center 72%"],
  });
  // reach the full figure a touch before dead-centre, then hold it
  const value = useTransform(scrollYProgress, [0, 0.92, 1], [0, to, to]);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(value, "change", (v) => {
    setDisplay(Math.round(Math.min(to, Math.max(0, v))));
  });

  // ensure it lands exactly if it mounts already past
  useEffect(() => {
    setDisplay(Math.round(Math.min(to, Math.max(0, value.get()))));
  }, [to, value]);

  if (reduce) {
    return (
      <span ref={ref} className={className}>
        {prefix}
        {to.toLocaleString("en-US")}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={`inline-flex items-baseline ${className}`}>
      {prefix}
      <span className="relative inline-block overflow-hidden tabular-nums" style={{ height: "1em" }}>
        <motion.span
          key={display}
          className="block leading-[1em]"
          initial={{ y: "0.5em", opacity: 0.4 }}
          animate={{ y: "0em", opacity: 1 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {display.toLocaleString("en-US")}
        </motion.span>
      </span>
      {suffix}
    </span>
  );
}
