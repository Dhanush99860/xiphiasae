"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Seconds for the aperture to open. */
  duration?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
  /** Open on mount instead of on scroll-into-view (use for above-the-fold heroes). */
  immediate?: boolean;
};

/**
 * IrisReveal — a cinematic "aperture opens" reveal for image windows. The frame
 * starts closed from the centre (a thin horizontal letterbox) and opens vertically
 * to full, with a faint settle-zoom, so images arrive as framed moments over the
 * HorizonCanvas rather than as flat fades.
 *
 * Driven by a CSS transition on `clip-path` (toggled by React state) — framer's
 * value animator won't reliably interpolate clip-path in this version, but the
 * browser's own transition does. `immediate` opens on mount (heroes that are
 * already in view); otherwise it opens when scrolled into view. The element
 * supplies its own rounding via `rounded-* overflow-hidden`. Reduced motion →
 * renders open, no transition.
 */
export default function IrisReveal({
  children,
  className,
  duration = 1.15,
  delay = 0,
  once = true,
  amount = 0.3,
  immediate = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once, amount });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const open = reduce || (immediate ? mounted : inView);
  const ease = "cubic-bezier(0.16,1,0.3,1)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(46% 0% 46% 0%)",
        opacity: open ? 1 : 0.5,
        transform: open ? "scale(1)" : "scale(1.04)",
        transition: reduce
          ? undefined
          : `clip-path ${duration}s ${ease} ${delay}s, opacity ${duration}s ease ${delay}s, transform ${duration}s ${ease} ${delay}s`,
        willChange: "clip-path, transform",
      }}
    >
      {children}
    </div>
  );
}
