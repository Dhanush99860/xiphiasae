"use client";

/**
 * CinematicHero — the redesign's opening frame. Full-bleed Dubai cityscape
 * (Ken-Burns + a gentle scroll-parallax on desktop), a cinematic scrim for
 * legibility, and an editorial headline that still introduces the offering.
 * Dark cinematic hero → flows into the lighter content chapters below.
 *
 * Mobile-friendly: parallax/Ken-Burns are cheap transforms; no pinned scroll.
 * Reduced-motion → static image + plain fades. Drop a <video> behind later by
 * swapping <KenBurns> for a <VideoHero> (poster = this image).
 */

import { useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, Button } from "@/components/ui";
import { KenBurns, SplitText, Reveal, Magnetic, Counter } from "@/components/motion";

const HERO_IMG = "/images/citizenship/dubai/dubai-country-image.webp";
const EASE = [0.22, 1, 0.36, 1] as const;

const TRUST = [
  { to: 17, suffix: "+", label: "Years advising" },
  { to: 25, suffix: "+", label: "Countries" },
  { to: 10000, suffix: "+", label: "Families guided" },
] as const;

export default function CinematicHero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Subtle parallax: the image drifts down slower than the page scrolls.
  const imgY = useTransform(scrollY, [0, 700], [0, 120]);
  const contentY = useTransform(scrollY, [0, 500], [0, -40]);

  // Light-glass floating header over the cinematic image.
  useEffect(() => {
    document.documentElement.dataset.heroImmersive = "true";
    return () => {
      delete document.documentElement.dataset.heroImmersive;
    };
  }, []);

  return (
    <section
      aria-label="XIPHIAS Immigration — residency, citizenship and global mobility"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-black text-white"
    >
      {/* Full-bleed cityscape (parallax wrapper is oversized so the drift never reveals an edge) */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 -top-[8%] h-[120%]"
        style={reduce ? undefined : { y: imgY }}
      >
        <KenBurns
          src={HERO_IMG}
          alt="Dubai skyline at dusk"
          className="h-full w-full"
          priority
          sizes="100vw"
          position="center 38%"
        />
      </motion.div>

      {/* Cinematic scrim — bottom-weighted + left for text legibility */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/55" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" />
      {/* Thin gold top hairline */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-screen-xl px-6 py-28 lg:px-10"
        style={reduce ? undefined : { y: contentY }}
      >
        <div className="max-w-2xl">
          <Reveal y={16} className="mb-6">
            <Eyebrow arabic="الإقامة الذهبية">United Arab Emirates</Eyebrow>
          </Reveal>

          <h1 className="font-sora text-[clamp(2.6rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-white">
            <SplitText text="Your world," className="block" />
            <span className="block text-white/90">
              <SplitText text="without borders." delay={0.22} />
            </span>
          </h1>

          <Reveal delay={0.35} y={20}>
            <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-base">
              Residency, citizenship and global mobility — engineered for you across
              25+ countries, advised end-to-end from our Dubai desk.
            </p>
          </Reveal>

          <Reveal delay={0.5} y={20} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.3}>
              <Button href="/eligibility" className="group">
                Start your assessment
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Button>
            </Magnetic>
            <Button
              href="/programme-explorer"
              variant="secondary"
              className="border-white/30 text-white hover:border-gold/70"
            >
              Explore programmes
            </Button>
          </Reveal>

          <Reveal delay={0.65} y={16}>
            <div className="mt-14 flex flex-wrap items-center gap-x-9 gap-y-3">
              {TRUST.map((s, i) => (
                <div key={s.label} className="flex items-center gap-9">
                  {i > 0 && <span aria-hidden className="h-9 w-px bg-white/15" />}
                  <div>
                    <div className="font-sora text-[26px] font-semibold text-white">
                      <Counter to={s.to} suffix={s.suffix} />
                    </div>
                    <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-white/45">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </motion.div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
          animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, ease: EASE, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-[0.32em] text-white/50">Scroll</span>
        </motion.div>
      )}
    </section>
  );
}
