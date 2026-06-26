"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * DawnMeter — the page's ONE left-edge vertical indicator (replaces ScrollProgress
 * and any per-section rail). The fill colour ramps night→day in step with the
 * HorizonCanvas, a gold sun-dot rides the fill head, and hovering reveals section
 * tick-labels that smooth-scroll (anchor links; Lenis has anchors:true). Reduced
 * motion → a static gradient bar with focusable links.
 */
export default function DawnMeter({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const fill = useTransform(
    scrollYProgress,
    [0, 0.45, 0.65, 0.85, 1],
    ["#14233b", "#5b3b27", "#cf9550", "#ecdcc2", "#f5f0e6"],
  );
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="group fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="relative h-[44vh] w-px bg-gold/20">
        {!reduce ? (
          <motion.div
            className="absolute inset-x-0 top-0 origin-top"
            style={{ height: "100%", scaleY: scrollYProgress, background: fill }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#14233b] via-[#cf9550] to-[#f5f0e6]" />
        )}

        <motion.div
          className="absolute left-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_12px_rgba(212,175,55,0.9)]"
          style={{ top: reduce ? "100%" : dotTop }}
        />

        <ul className="absolute left-0 top-0 h-full">
          {sections.map((s, i) => (
            <li
              key={s.id}
              className="absolute -translate-y-1/2"
              style={{ top: `${(i / Math.max(1, sections.length - 1)) * 100}%` }}
            >
              <a href={`#${s.id}`} data-cursor="link" className="flex items-center gap-2 ps-3">
                <span className="block h-1.5 w-1.5 rounded-full bg-gold/40 transition-colors duration-300 group-hover:bg-gold" />
                <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/0 transition-colors duration-300 group-hover:text-ink/55">
                  {s.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
