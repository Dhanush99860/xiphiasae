"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * LightWindow — the signature payoff (restricted to the Hero window + one
 * Pathways window). A full dark "night" overlay sits over the photo; a radial
 * mask centred on the pointer punches a hole in that overlay, so dawn appears to
 * reveal the city beneath your hand. Distinct from DawnCursor's soft-light blob
 * (this is a local exposure lift, not a second glow).
 *
 * --mx/--my are set locally on hover for accuracy; `demo` runs a one-time
 * left→right sweep on mount so the signature demonstrates itself before any
 * hover. Reduced-motion → a fixed faint vignette, no tracking.
 */
export default function LightWindow({
  children,
  className = "",
  edgeGlow = false,
  demo = false,
  overlayOpacity = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  edgeGlow?: boolean;
  demo?: boolean;
  /** Opacity of the liftable night overlay. Lower = more of the photo shows. */
  overlayOpacity?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  useEffect(() => {
    if (!demo || reduce) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let startT = 0;
    const dur = 2000;
    el.style.setProperty("--my", "44%");
    const tick = (t: number) => {
      if (!startT) startT = t;
      const p = Math.min(1, (t - startT) / dur);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      el.style.setProperty("--mx", `${-10 + eased * 120}%`);
      if (p < 1) raf = requestAnimationFrame(tick);
      else el.style.setProperty("--mx", "50%");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [demo, reduce]);

  return (
    <div
      ref={ref}
      onPointerMove={reduce ? undefined : onMove}
      className={`relative overflow-hidden ${className}`}
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
    >
      {children}
      {!reduce ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: `rgba(7,10,18,${overlayOpacity})`,
            WebkitMaskImage:
              "radial-gradient(22rem 22rem at var(--mx) var(--my), transparent 0%, transparent 30%, #000 64%)",
            maskImage:
              "radial-gradient(22rem 22rem at var(--mx) var(--my), transparent 0%, transparent 30%, #000 64%)",
          }}
        />
      ) : (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] bg-[#070a12]/25" />
      )}
      {edgeGlow && !reduce ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(18rem 18rem at var(--mx) var(--my), rgba(232,200,150,0.22), transparent 60%)",
            mixBlendMode: "screen",
          }}
        />
      ) : null}
    </div>
  );
}
