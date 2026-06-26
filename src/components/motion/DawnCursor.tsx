"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/**
 * DawnCursor — the global "travelling dawn" signature (ADDITIVE; never hides the
 * OS cursor). A large warm soft-light radial spring-follows the pointer so the
 * user carries the sunrise across the night HorizonCanvas, plus a small gold
 * augment dot that rides the exact point and scales on links. The smoothed coords
 * publish to :root as --dawn-x / --dawn-y so LightWindow can lift the night
 * overlay off the photo beneath the pointer from one shared source.
 *
 * Off entirely on coarse-pointer (touch) and under reduced motion — there it just
 * parks --dawn-x/--dawn-y at the canvas sun position. No global `cursor:none`.
 */
export default function DawnCursor({
  size = 480,
  idleAfterMs = 1200,
}: {
  size?: number;
  idleAfterMs?: number;
}) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [link, setLink] = useState(false);
  const [idle, setIdle] = useState(false);

  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const sx = useSpring(mx, { stiffness: 120, damping: 24, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 120, damping: 24, mass: 0.6 });
  const dotScale = useSpring(1, { stiffness: 300, damping: 20 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(pointer:coarse)").matches;
    if (reduce || coarse) {
      document.documentElement.style.setProperty("--dawn-x", "50vw");
      document.documentElement.style.setProperty("--dawn-y", "60vh");
      return;
    }
    setEnabled(true);

    let raf = 0;
    let last: PointerEvent | null = null;
    let idleTimer: ReturnType<typeof setTimeout>;
    const flush = () => {
      raf = 0;
      if (last) {
        mx.set(last.clientX);
        my.set(last.clientY);
      }
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      setIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIdle(true), idleAfterMs);
      if (!raf) raf = requestAnimationFrame(flush);
    };
    const onOver = (e: Event) => {
      const t = e.target as Element | null;
      if (t?.closest?.("[data-cursor='link']")) setLink(true);
    };
    const onOut = (e: Event) => {
      const t = e.target as Element | null;
      if (t?.closest?.("[data-cursor='link']")) setLink(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    idleTimer = setTimeout(() => setIdle(true), idleAfterMs);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      clearTimeout(idleTimer);
      cancelAnimationFrame(raf);
    };
  }, [reduce, idleAfterMs, mx, my]);

  useEffect(() => {
    dotScale.set(link ? 1.7 : 1);
  }, [link, dotScale]);

  useMotionValueEvent(sx, "change", (v) => {
    if (enabled) document.documentElement.style.setProperty("--dawn-x", `${v}px`);
  });
  useMotionValueEvent(sy, "change", (v) => {
    if (enabled) document.documentElement.style.setProperty("--dawn-y", `${v}px`);
  });

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        animate={idle ? { opacity: [0.42, 0.6, 0.42] } : { opacity: 0.5 }}
        transition={idle ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: sx,
          y: sy,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          width: size,
          height: size,
          borderRadius: 9999,
          background: "radial-gradient(circle, rgba(232,200,150,0.5), transparent 70%)",
          mixBlendMode: "soft-light",
          pointerEvents: "none",
          zIndex: 55,
        }}
      />
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: sx,
          y: sy,
          marginLeft: -5,
          marginTop: -5,
          scale: dotScale,
          width: 10,
          height: 10,
          borderRadius: 9999,
          border: "1.5px solid rgba(212,175,55,0.9)",
          backgroundColor: link ? "rgba(212,175,55,0.14)" : "transparent",
          pointerEvents: "none",
          zIndex: 60,
        }}
      />
    </>
  );
}
