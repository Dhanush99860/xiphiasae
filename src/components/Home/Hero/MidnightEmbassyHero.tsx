"use client";

/**
 * MidnightEmbassyHero — Direction ① "Midnight Embassy / Liquid Gold"
 * ──────────────────────────────────────────────────────────────────
 * Production homepage hero for the UAE visual refresh. Gold-on-black luxury:
 *   • Near-black (#050810) ground + drifting <AuroraBackground tone="mixed">
 *   • Faint Emirati <LatticeOverlay> texture + radial gold spotlight
 *   • Gold filament <DrawLine>s that draw on scroll-in
 *   • Arabic calligraphic kicker (Eyebrow) + rotating EN value-prop (TextType)
 *   • SplitText headline with a live gold ShinyText sweep on the accent word
 *   • <Counter> trust band + Magnetic primary <Button>
 *   • Spotlight media panel: stylised CSS globe + self-drawing 1px gold border
 *   • Floating glass route cards (HERO_ROUTE_CARDS) that gently oscillate
 *
 * Fully reduced-motion aware (primitives self-disable; custom motion guards on
 * useReducedMotion) and uses logical spacing so it mirrors cleanly under RTL.
 * Lightweight: SVG/CSS only, animating transform/opacity. No 3D.
 */

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow, Button, Card } from "@/components/ui";
import {
  SplitText,
  ShinyText,
  TextType,
  Reveal,
  Magnetic,
  Counter,
  AuroraBackground,
  DrawLine,
  LatticeOverlay,
} from "@/components/motion";
import { HERO_ROUTE_CARDS } from "@/components/HomeExperience/data";
import GoldenFalcon from "./GoldenFalcon";

const EASE = [0.22, 1, 0.36, 1] as const;

const TRUST = [
  { to: 17, suffix: "+", label: "Years advising" },
  { to: 25, suffix: "+", label: "Countries" },
  { to: 10000, suffix: "+", label: "Families guided" },
] as const;

// Flag emoji from a 2-letter ISO code (regional indicator symbols).
function flagEmoji(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

export default function MidnightEmbassyHero() {
  const reduce = useReducedMotion();

  // Dark-glass floating header on this hero (parity with EmbassyHero).
  useEffect(() => {
    document.documentElement.dataset.heroImmersive = "true";
    return () => {
      delete document.documentElement.dataset.heroImmersive;
    };
  }, []);

  // Custom draw-on motion: full when reduced, animated otherwise.
  const draw = (delay: number) =>
    reduce
      ? { pathLength: 1, opacity: 1 }
      : {
          pathLength: [0, 1],
          opacity: [0, 1],
          transition: {
            pathLength: { duration: 1.6, ease: EASE, delay },
            opacity: { duration: 0.4, delay },
          },
        };

  return (
    <section
      aria-label="XIPHIAS Immigration — residency and citizenship advisory"
      className="relative isolate min-h-[100svh] w-full overflow-hidden text-ink"
      style={{ background: "radial-gradient(circle at 72% 26%, #fdf9f1 0%, #f5ede0 55%, #ece0cc 100%)" }}
    >
      {/* ── Ambient background layers ──────────────────────────────── */}
      {/* Drifting aurora veil (gold + oasis) */}
      <AuroraBackground tone="mixed" intensity={0.9} />

      {/* Radial gold spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 end-[-10%] h-[120vh] w-[120vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,175,55,0.18), rgba(212,175,55,0.06) 45%, transparent 70%)",
        }}
      />
      {/* Warm dune glow bottom-left for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/3 start-[-15%] h-[90vh] w-[90vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(232,220,200,0.85), rgba(245,237,224,0) 70%)",
        }}
      />
      {/* Faint Emirati geometric lattice */}
      <LatticeOverlay opacity={0.06} />
      {/* Gold filament lines drawing across the canvas */}
      <DrawLine
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        d="M -50 720 C 360 640, 700 760, 1100 520 S 1500 360, 1600 320"
        strokeWidth={1}
        delay={0.2}
        colors={["rgba(212,175,55,0.45)", "rgba(212,175,55,0.35)", "rgba(168,125,31,0.25)"]}
      />
      <DrawLine
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        d="M -50 180 C 300 260, 620 120, 980 300 S 1380 520, 1600 440"
        strokeWidth={1}
        delay={0.45}
        colors={["rgba(255,233,168,0.25)", "rgba(212,175,55,0.18)", "rgba(168,125,31,0.12)"]}
      />
      {/* Edge vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 200px 50px rgba(184,160,110,0.12)" }}
      />

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-screen-xl flex-col justify-center px-6 py-28 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left — copy */}
          <div className="max-w-xl">
            {/* Kicker — shared Eyebrow primitive (gold rule + EN + Arabic) */}
            <Reveal y={16} className="mb-7">
              <Eyebrow tone="onDark" arabic="الإقامة الذهبية">
                United Arab Emirates
              </Eyebrow>
            </Reveal>

            {/* Headline */}
            <h1 className="font-sora text-[2.6rem] font-semibold leading-[1.06] tracking-tight text-ink sm:text-54 lg:text-70">
              <SplitText text="Residency & citizenship," className="block" />
              <span className="mt-1 block">
                engineered with{" "}
                <ShinyText
                  baseColor="#a87d1f"
                  shineColor="#ffe9a8"
                  speed={3.2}
                  className="font-semibold"
                >
                  precision
                </ShinyText>
                .
              </span>
            </h1>

            {/* Subhead */}
            <Reveal delay={0.15} y={20}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/65 sm:text-16">
                Golden Visa, residency-by-investment and citizenship programmes
                across 25+ countries — reviewed and advised end-to-end from the
                Emirates.
              </p>
            </Reveal>

            {/* Rotating value-prop (TextType) */}
            <Reveal delay={0.25} y={16}>
              <p className="mt-5 flex items-center gap-2 text-[13px] tracking-wide text-ink/50">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                Now advising:&nbsp;
                <TextType
                  className="font-medium text-gold"
                  text={[
                    "Golden Visa pathways",
                    "Citizenship by investment",
                    "Skilled migration routes",
                  ]}
                />
              </p>
            </Reveal>

            {/* CTAs — shared Button primitive */}
            <Reveal delay={0.35} y={20} className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.3}>
                <Button href="/eligibility" className="group">
                  Start your assessment
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Button>
              </Magnetic>

              <Button href="/programme-explorer" variant="secondary">
                Explore programmes
              </Button>
            </Reveal>

            {/* Trust band */}
            <Reveal delay={0.45} y={16}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
                {TRUST.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-8">
                    {i > 0 && <span className="h-8 w-px bg-pearl/10" />}
                    <div>
                      <div className="font-sora text-22 font-semibold text-ink">
                        <Counter to={s.to} suffix={s.suffix} />
                      </div>
                      <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-ink/40">
                        {s.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — spotlight media panel + floating route cards */}
          <Reveal delay={0.2} y={28} amount={0.2}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              {/* Panel surface */}
              <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-gold/45 bg-white/80 backdrop-blur-sm">
                {/* media-slot: UAE golden falcon line-art (lightweight, no 3D) */}
                <div className="media-slot relative h-full w-full">
                  {/* The Hawk of the Emirates — national bird, gold strokes */}
                  <GoldenFalcon />

                  {/* Caption chip */}
                  <div className="absolute bottom-4 start-4 rounded-full border border-gold/45 bg-sand/60 px-3 py-1.5 backdrop-blur">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/60">
                      Hawk of the Emirates
                    </span>
                  </div>
                </div>
              </div>

              {/* Gold border that draws itself over the panel */}
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 400 500"
                fill="none"
                preserveAspectRatio="none"
              >
                <motion.rect
                  x="1"
                  y="1"
                  width="398"
                  height="498"
                  rx="28"
                  stroke="url(#goldEdge)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={draw(0.3)}
                  viewport={{ once: true, amount: 0.3 }}
                />
                <defs>
                  <linearGradient id="goldEdge" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffe9a8" />
                    <stop offset="50%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#a87d1f" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating glass route cards — gently oscillate, link to href */}
              <FloatingRouteCard
                card={HERO_ROUTE_CARDS[0]}
                reduce={reduce}
                index={0}
                className="absolute -start-6 top-6 hidden w-56 sm:block"
              />
              <FloatingRouteCard
                card={HERO_ROUTE_CARDS[2]}
                reduce={reduce}
                index={1}
                className="absolute -end-8 top-1/3 hidden w-56 md:block"
              />
              <FloatingRouteCard
                card={HERO_ROUTE_CARDS[3]}
                reduce={reduce}
                index={2}
                className="absolute -start-10 bottom-10 hidden w-56 lg:block"
              />
            </div>
          </Reveal>
        </div>

        {/* Mobile route rail — same data, visible where floating cards hide */}
        <Reveal delay={0.3} y={18} className="mt-12 sm:hidden">
          <div className="flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {HERO_ROUTE_CARDS.map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="snap-start"
              >
                <Card
                  tone="glass"
                  pad="sm"
                  className="w-52 shrink-0 transition-colors hover:border-gold/65"
                >
                  <RouteCardInner card={card} />
                </Card>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 select-none">
        <span className="text-[10px] uppercase tracking-[0.3em] text-ink/30">
          Scroll to explore
        </span>
      </div>
    </section>
  );
}

/* ── Floating route card ─────────────────────────────────────────────── */

type RouteCard = (typeof HERO_ROUTE_CARDS)[number];

function FloatingRouteCard({
  card,
  reduce,
  index,
  className,
}: {
  card: RouteCard;
  reduce: boolean | null;
  index: number;
  className?: string;
}) {
  const amplitude = 10;
  const duration = 6 + index * 1.2;
  const delay = index * 0.6;

  return (
    <motion.a
      href={card.href}
      className={className}
      aria-label={`${card.label} — ${card.type} route, ${card.timeframe}`}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.4 + index * 0.15 }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -amplitude, 0] }}
        transition={{ duration, ease: "easeInOut", repeat: Infinity, delay }}
        whileHover={reduce ? undefined : { scale: 1.03 }}
      >
        <Card
          tone="glass"
          pad="sm"
          className="shadow-[0_18px_50px_-20px_rgba(15,23,42,0.08)] transition-colors hover:border-gold/65"
        >
          <RouteCardInner card={card} />
        </Card>
      </motion.div>
    </motion.a>
  );
}

function RouteCardInner({ card }: { card: RouteCard }) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-gold/45 bg-sand/50 text-base leading-none"
      >
        {flagEmoji(card.flag)}
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: card.color }}
          />
          <span className="text-[10px] uppercase tracking-[0.16em] text-ink/45">
            {card.type}
          </span>
        </div>
        <div className="mt-1 truncate font-sora text-[13px] font-semibold text-ink">
          {card.label}
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-ink/50">
          <span className="text-gold">◴</span>
          {card.timeframe}
        </div>
      </div>
    </div>
  );
}
