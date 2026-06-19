"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * Drives premium inertial scrolling (Lenis) and keeps GSAP ScrollTrigger in
 * sync with it. Uses a dynamic import so the build doesn't fail when lenis
 * is not installed. Disabled under reduced motion.
 */
export default function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    // Non-literal string prevents Webpack from failing on missing module
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenisInst: any;
    let tickFn: (time: number) => void;

    const pkgName: string = "lenis";
    (import(pkgName) as Promise<any>)
      .then((mod) => {
        const Lenis = mod.default ?? mod;
        lenisInst = new Lenis({
          duration: 1.05,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.6,
          anchors: true,
        });

        lenisInst.on("scroll", ScrollTrigger.update);
        tickFn = (time: number) => lenisInst.raf(time * 1000);
        gsap.ticker.add(tickFn);
        gsap.ticker.lagSmoothing(0);
      })
      .catch(() => {
        // lenis not available — native scroll remains
      });

    return () => {
      if (tickFn) gsap.ticker.remove(tickFn);
      if (lenisInst) lenisInst.destroy();
    };
  }, [reduce]);

  return null;
}
