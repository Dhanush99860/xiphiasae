"use client";

/**
 * HomeFinalCTA — DARK cinematic finale.
 * The emotional peak of the homepage: a full-bleed Dubai cityscape (KenBurns)
 * under layered scrims, framed by the gold Burj line-art, with a gold aurora
 * glow, a large split-text headline with a gold accent word, an Arabic flourish,
 * the two primary calls to action, and the social-proof footnote — all preserved.
 * Reduced-motion safe (all sub-primitives honour it).
 *
 * Same default export, no props — homepage import is unchanged.
 */

import { ArrowRight } from "lucide-react";

import { Container, Button, Eyebrow } from "@/components/ui";
import {
  LatticeOverlay,
  DrawLine,
  SplitText,
  ShinyText,
  Reveal,
  Magnetic,
  GoldenBurj,
  KenBurns,
} from "@/components/motion";
import { TRUST_POINTS } from "./data";

// Pull three headline proof points from the shared data (no content dropped).
const PROOF = [
  TRUST_POINTS[1], // 4,500+ Families
  TRUST_POINTS[2], // 98% Approval
  TRUST_POINTS[0], // 17+ Years
] as const;

export default function HomeFinalCTA() {
  return (
    <section
      className="relative flex min-h-[72vh] items-center overflow-hidden bg-midnight py-24 text-pearl lg:py-32"
      aria-label="Begin your journey"
    >
      {/* ── Full-bleed cinematic Dubai cityscape behind everything ── */}
      <div aria-hidden className="absolute inset-0">
        <KenBurns
          src="/images/citizenship/dubai/dubai-country-image.webp"
          alt=""
          className="h-full w-full"
          sizes="100vw"
          duration={32}
          position="center 45%"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/82 to-midnight" />
        <div className="absolute inset-0 bg-midnight/45" />
      </div>

      {/* Faint Emirati geometric texture */}
      <LatticeOverlay opacity={0.07} />

      {/* Warm gold focal glow drawing the eye to the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.18)_0%,transparent_58%)]"
      />

      {/* Soft midnight edge-feather so the band reads as a contained finale */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(5,8,16,0.85)_100%)]"
      />

      {/* Top hairline divider */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
      />

      {/* Burj Khalifa line-art framing the finale — draws itself on */}
      <div className="pointer-events-none absolute bottom-0 start-[2%] hidden h-[84%] w-24 opacity-50 lg:block xl:w-28">
        <GoldenBurj className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute bottom-0 end-[2%] hidden h-[84%] w-24 opacity-50 lg:block xl:w-28">
        <GoldenBurj className="h-full w-full" />
      </div>

      <Container size="lg" className="relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal y={16}>
            <Eyebrow tone="gold" arabic="مستقبلك" className="justify-center">
              Your next move
            </Eyebrow>
          </Reveal>

          {/* Drawn gold flourish above the headline */}
          <DrawLine
            d="M2 6 C 60 0, 140 0, 198 6"
            viewBox="0 0 200 12"
            className="mt-10 h-3 w-44"
            strokeWidth={1.5}
            duration={1.4}
          />

          {/* Cinematic headline with a gold accent word */}
          <h2 className="mt-7 font-sora text-[clamp(2.25rem,6vw,4.5rem)] font-black leading-[1.04] tracking-tight text-pearl">
            <SplitText text="Your global future" className="block" />
            <span className="mt-1 block">
              <SplitText text="starts " delay={0.25} />
              <ShinyText
                baseColor="#d4af37"
                shineColor="#f5e6b0"
                speed={4}
                className="font-black"
              >
                here
              </ShinyText>
            </span>
          </h2>

          {/* Arabic flourish */}
          <Reveal delay={0.5} y={14}>
            <p
              lang="ar"
              dir="rtl"
              className="mt-6 font-arabic-display text-2xl leading-none text-gold sm:text-3xl"
            >
              مستقبلك العالمي يبدأ من هنا
            </p>
          </Reveal>

          {/* Supporting line */}
          <Reveal delay={0.6} y={14}>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-pearl/70">
              Tell us your goal. Our licensed advisors will map the most secure,
              cost-effective pathway — from the Emirates to the world — and pair
              you with the desk best suited to your case.
            </p>
          </Reveal>

          {/* Two big CTAs */}
          <Reveal delay={0.72} y={14}>
            <div className="mt-11 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Magnetic strength={0.35}>
                <Button size="lg" href="/eligibility">
                  Start your assessment
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
              </Magnetic>
              <Button
                variant="secondary"
                size="lg"
                href="/booking"
                className="border-gold/40 bg-white/[0.04] text-pearl hover:border-gold/70"
              >
                Book a consultation
              </Button>
            </div>
          </Reveal>

          {/* Drawn gold flourish below the CTAs */}
          <DrawLine
            d="M2 6 C 60 12, 140 12, 198 6"
            viewBox="0 0 200 12"
            className="mt-12 h-3 w-44 opacity-80"
            strokeWidth={1.5}
            delay={0.4}
            duration={1.4}
          />

          {/* Social-proof footnote, sourced from shared data */}
          <Reveal delay={0.85} y={12}>
            <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-pearl/65">
              {PROOF.map((p, i) => (
                <li key={p.title} className="flex items-center gap-6">
                  <span>
                    <span className="font-semibold text-gold">{p.stat}</span>{" "}
                    {p.statLabel === "Years" ? "years of advisory" : p.title}
                  </span>
                  {i < PROOF.length - 1 ? (
                    <span aria-hidden className="text-gold">
                      ·
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>

      {/* Bottom hairline divider */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
      />
    </section>
  );
}
