"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { gsap, ScrollTrigger } from "./gsap";
import ParallaxBackdrop from "./ParallaxBackdrop";

export type VerbState = {
  verb: string;
  name: string;
  href: string;
  tag: string;
  img: string;
};

/**
 * PinnedVerbSwap — the page's ONE scroll-PIN and the "infinite scroll where the
 * text changes" centrepiece (Section 2). The headline's giant verb rewrites
 * LIVE→BELONG→WORK→BUILD on pure scroll-progress (scrub back reverses it), while
 * the four pathway names reveal one-per-state via a CSS clip-path wipe. Progress
 * reads HORIZONTALLY (a gold baseline fills) — no competing left rail.
 *
 * SIGNATURE HOVER: hovering a revealed name floats a framed image preview that
 * chases the cursor while siblings dim — the image-on-hover this text section was
 * missing. Desktop + no-reduced-motion only; otherwise no pin and the names are a
 * static stagger-revealed list.
 */
export default function PinnedVerbSwap({
  states,
  vh = 250,
  eyebrow,
  lead = "We turn the right to",
  bgSrc,
  bgTone = "dawn",
}: {
  states: VerbState[];
  vh?: number;
  eyebrow?: React.ReactNode;
  lead?: string;
  bgSrc?: string;
  bgTone?: "night" | "dawn" | "day";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(-9999);
  const py = useMotionValue(-9999);
  const psx = useSpring(px, { stiffness: 150, damping: 22, mass: 0.5 });
  const psy = useSpring(py, { stiffness: 150, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mm = gsap.matchMedia();
    mm.add("(min-width:1024px) and (prefers-reduced-motion:no-preference)", () => {
      setPinned(true);
      const st = ScrollTrigger.create({
        trigger: ref.current!,
        start: "top top",
        end: `+=${vh}%`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const i = Math.min(
            states.length - 1,
            Math.floor(self.progress * states.length * 0.999),
          );
          setActive(i);
          if (fillRef.current) fillRef.current.style.transform = `scaleX(${self.progress})`;
        },
      });
      return () => {
        st.kill();
        setPinned(false);
      };
    });
    return () => mm.revert();
  }, [states.length, vh]);

  const showAll = reduce || !pinned;

  return (
    <div
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-transparent px-6 py-24 text-pearl"
      onPointerMove={(e) => {
        px.set(e.clientX);
        py.set(e.clientY);
      }}
    >
      {bgSrc ? <ParallaxBackdrop src={bgSrc} tone={bgTone} speed={70} position="center 40%" /> : null}

      <div className="relative z-10 text-center">
        {eyebrow}
        <p className="mt-8 text-sm font-medium uppercase tracking-[0.3em] text-pearl/55">{lead}</p>

        {/* swapping verb */}
        <div className="relative mx-auto mt-3 h-[1.1em] w-full text-[clamp(3rem,12vw,9rem)] font-semibold leading-none tracking-[-0.03em]">
          {states.map((s, i) => (
            <span
              key={s.verb}
              className="absolute inset-0 flex items-center justify-center text-gold transition-all duration-500 ease-out"
              style={{
                opacity: showAll ? (i === 0 ? 1 : 0) : i === active ? 1 : 0,
                transform: showAll
                  ? "none"
                  : `translateY(${i === active ? 0 : i < active ? -28 : 28}px)`,
              }}
            >
              {s.verb}
            </span>
          ))}
        </div>

        {/* horizontal progress baseline */}
        <div className="mx-auto mt-8 h-px w-44 overflow-hidden bg-pearl/15">
          <div
            ref={fillRef}
            className="h-full w-full origin-left bg-gold"
            style={{ transform: showAll ? "scaleX(1)" : "scaleX(0)" }}
          />
        </div>
      </div>

      {/* pathway names */}
      <ul className="relative z-10 mt-14 flex w-full max-w-3xl flex-col">
        {states.map((s, i) => {
          const revealed = showAll || active >= i;
          return (
            <li key={s.name} className="border-t border-pearl/10 first:border-t-0">
              <a
                href={s.href}
                data-cursor="link"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                className="group flex items-center gap-4 py-4 transition-opacity duration-300"
                style={{
                  clipPath: revealed ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                  opacity: revealed ? (hovered === null || hovered === i ? 1 : 0.35) : 0,
                  transition:
                    "clip-path .6s cubic-bezier(.16,1,.3,1), opacity .35s ease",
                }}
              >
                <span className="text-xs font-semibold text-gold/70">0{i + 1}</span>
                <span className="text-2xl font-semibold text-pearl/85 transition-colors group-hover:text-gold sm:text-3xl">
                  {s.name}
                </span>
                <span className="ms-auto text-xs uppercase tracking-[0.2em] text-pearl/40">
                  {s.tag}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* cursor-following image preview (desktop) */}
      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
          style={{ x: psx, y: psy, marginLeft: 24, marginTop: -96, opacity: hovered !== null ? 1 : 0 }}
          transition={{ opacity: { duration: 0.2 } }}
        >
          {hovered !== null ? (
            <div className="h-44 w-72 overflow-hidden rounded-xl ring-1 ring-pearl/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
              <Image
                src={states[hovered].img}
                alt=""
                width={288}
                height={176}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </div>
  );
}
