"use client";

/**
 * CorporateHero — cinematic, full-bleed opening frame for the Corporate landing.
 * A real Dubai corporate cityscape (KenBurns + gentle desktop scroll-parallax)
 * sits behind a bottom-weighted scrim; an editorial headline still introduces
 * the offering, with feature chips, CTAs and an animated trust strip. Dark
 * cinematic chapter → flows into the lighter editorial chapters below.
 *
 * Mobile-light: KenBurns/parallax are cheap transforms, the frame caps height
 * on small screens, and reduced-motion renders a static image with plain fades.
 * All original content, links, CTAs and stats are preserved.
 */

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Eyebrow } from "@/components/ui";
import {
  KenBurns,
  DrawLine,
  SandReveal,
  SplitText,
  Reveal,
  Stagger,
  StaggerItem,
  Magnetic,
  Counter,
} from "@/components/motion";

const HERO_IMG = "/images/corporate/uae/dubai-corporate-immigration.webp";
const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryText?: string;
  secondaryHref?: string;
  secondaryText?: string;

  /** Optional extras */
  brochureHref?: string;
  brochureText?: string;
  eligibilityHref?: string;
  eligibilityText?: string;

  className?: string;
  /** Optional pill above the title */
  badge?: string;
  /** Optional feature chips under the subtitle */
  features?: string[];
  /** Text alignment on larger screens */
  align?: "left" | "center";
};

export default function CorporateHero({
  title = "Corporate Setup & Employment Visas",
  subtitle = "Form your company, enable sponsorship, and secure residence/work authorization — compare free zones, mainland routes, and investor/entrepreneur options.",
  primaryHref = "/personal-booking",
  primaryText = "Speak to an Advisor",
  secondaryHref = "/insights",
  secondaryText = "Read Insights",

  brochureHref = "/images/residency/xiphias-corporate-mobility.pdf",
  brochureText = "Download Brochure",
  eligibilityHref,
  eligibilityText = "Check Eligibility",

  className = "",
  badge = "Corporate",
  features = ["Free zone & mainland", "Employment visas", "Investor / Entrepreneur"],
  align = "left",
}: Props) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Subtle parallax: the cityscape drifts slower than the content as you scroll.
  const imgY = useTransform(scrollY, [0, 700], [0, 110]);
  const contentY = useTransform(scrollY, [0, 600], [0, -36]);

  const isPdf =
    typeof secondaryHref === "string" && secondaryHref.endsWith(".pdf");
  const isBrochurePdf =
    typeof brochureHref === "string" && brochureHref.endsWith(".pdf");
  const heroId = "corporate-hero-title";

  const alignClasses =
    align === "center" ? "text-center md:mx-auto md:max-w-3xl" : "text-start";

  return (
    <>
      <section
        aria-labelledby={heroId}
        className={[
          "relative isolate flex min-h-[78svh] w-full items-end overflow-hidden",
          "rounded-3xl bg-black text-white lg:min-h-[88svh]",
          "border border-white/10 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.8)]",
          className,
        ].join(" ")}
      >
        {/* Full-bleed cityscape — oversized parallax wrapper so drift never reveals an edge */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 -top-[8%] h-[120%]"
          style={reduce ? undefined : { y: imgY }}
        >
          <KenBurns
            src={HERO_IMG}
            alt="Dubai business district skyline"
            className="h-full w-full"
            priority
            sizes="100vw"
            position="center 42%"
          />
        </motion.div>

        {/* Cinematic scrim — bottom + leading-edge weighted for legibility */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 to-black/45"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent"
        />
        {/* Warm gold haze rising from the base */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(120%_80%_at_20%_120%,rgba(212,175,55,0.22),transparent_60%)]"
        />
        {/* Top + bottom gold hairlines */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent"
        />

        {/* Guiding golden line drawing toward the CTAs */}
        <DrawLine
          d="M0 8 C 30 8, 35 60, 70 60 S 100 92, 100 92"
          viewBox="0 0 100 100"
          className="pointer-events-none absolute -bottom-2 end-0 h-40 w-40 opacity-50"
          strokeWidth={1.4}
          delay={0.3}
        />

        <motion.div
          className="relative z-10 w-full px-6 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20"
          style={reduce ? undefined : { y: contentY }}
        >
          <div className={`max-w-3xl ${alignClasses}`}>
            {/* Eyebrow / kicker */}
            {badge ? (
              <Reveal y={0}>
                <Eyebrow tone="onDark" arabic="تنقّل الشركات">
                  {badge}
                </Eyebrow>
              </Reveal>
            ) : null}

            {/* Title — emerges word by word */}
            <SandReveal delay={0.05}>
              <h1
                id={heroId}
                className="mt-6 font-sora text-[clamp(2.1rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-tight text-white"
              >
                <SplitText text={title} />
              </h1>
            </SandReveal>

            {/* Subtitle */}
            <SandReveal delay={0.18} y={28} blur={8}>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75 md:text-base">
                {subtitle}
              </p>
            </SandReveal>

            {/* Feature chips — sequenced in */}
            {features?.length ? (
              <Stagger
                className={`mt-7 flex flex-wrap gap-2.5 text-xs ${
                  align === "center" ? "justify-center" : ""
                }`}
              >
                {features.map((f) => (
                  <StaggerItem key={f}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-medium text-white/85 shadow-sm backdrop-blur-md">
                      <Check />
                      <span>{f}</span>
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            ) : null}

            {/* CTAs */}
            <div
              className={`mt-9 flex flex-wrap items-center gap-3 ${
                align === "center" ? "justify-center" : ""
              }`}
            >
              <Magnetic>
                <Link
                  href={primaryHref}
                  prefetch={false}
                  className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[14px] font-semibold text-midnight transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-8px_rgba(212,175,55,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label={primaryText}
                >
                  {primaryText}
                  <ArrowRight />
                </Link>
              </Magnetic>

              {isPdf ? (
                <a
                  href={secondaryHref}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-[14px] font-medium text-white backdrop-blur-md transition-colors duration-300 hover:border-gold/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label={secondaryText}
                >
                  <Download />
                  {secondaryText}
                </a>
              ) : (
                <Link
                  href={secondaryHref}
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-[14px] font-medium text-white backdrop-blur-md transition-colors duration-300 hover:border-gold/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label={secondaryText}
                >
                  <Open />
                  {secondaryText}
                </Link>
              )}

              {/* Brochure (optional) */}
              {brochureHref
                ? isBrochurePdf ? (
                    <a
                      href={brochureHref}
                      download
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-[14px] font-medium text-white backdrop-blur-md transition-colors duration-300 hover:border-gold/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      aria-label={brochureText}
                    >
                      <Download />
                      {brochureText}
                    </a>
                  ) : (
                    <Link
                      href={brochureHref}
                      prefetch={false}
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-[14px] font-medium text-white backdrop-blur-md transition-colors duration-300 hover:border-gold/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      aria-label={brochureText}
                    >
                      <Open />
                      {brochureText}
                    </Link>
                  )
                : null}

              {/* Check Eligibility (optional) */}
              {eligibilityHref ? (
                <Link
                  href={eligibilityHref}
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-[14px] font-medium text-white backdrop-blur-md transition-colors duration-300 hover:border-gold/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label={eligibilityText}
                >
                  <Open />
                  {eligibilityText}
                </Link>
              ) : null}

              {/* Micro reassurance */}
              <span className="ms-0 inline-flex items-center gap-1.5 text-xs font-medium text-white/65 md:ms-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
                No obligation · Response within 24 hours
              </span>
            </div>

            {/* Trust strip — animated proof against the cinematic ground */}
            <SandReveal delay={0.1} y={24} blur={6}>
              <dl
                className={`mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md sm:grid-cols-3 ${
                  align === "center" ? "mx-auto" : ""
                }`}
              >
                {[
                  { to: 15, suffix: "+", label: "Years advising" },
                  { to: 30, suffix: "+", label: "Jurisdictions" },
                  { to: 100, suffix: "%", label: "Ownership routes" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/[0.06] px-4 py-4">
                    <div className="font-sora text-2xl font-semibold tracking-tight text-gold">
                      <Counter to={s.to} suffix={s.suffix} />
                    </div>
                    <dt className="mt-1 text-[11px] font-medium uppercase tracking-wide text-white/55">
                      {s.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </SandReveal>
          </div>
        </motion.div>

        {/* Scroll cue */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2"
            animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, ease: EASE, repeat: Infinity }}
          >
            <span className="text-[10px] uppercase tracking-[0.32em] text-white/50">
              Scroll
            </span>
          </motion.div>
        )}
      </section>

      {/* Breadcrumb under hero for consistency with other pages */}
      <div className="mt-3">
        <Breadcrumb />
      </div>
    </>
  );
}

/* ---------- tiny inline icons (no extra deps) ---------- */

function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5 fill-gold"
    >
      <path d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-4-4A1 1 0 0 1 5.457 8.543l3.293 3.293 6.543-6.543a1 1 0 0 1 1.414 0z" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path
        fill="currentColor"
        d="M5 12.75h11.19l-3.72 3.72a.75.75 0 1 0 1.06 1.06l5.25-5.25a.75.75 0 0 0 0-1.06L13.53 5.97a.75.75 0 1 0-1.06 1.06l3.72 3.72H5a.75.75 0 0 0 0 1.5z"
      />
    </svg>
  );
}
function Download() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M12 3.75a.75.75 0 0 1 .75.75v8.19l2.72-2.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L6.97 11.03a.75.75 0 0 1 1.06-1.06l2.72 2.72V4.5A.75.75 0 0 1 12 3.75zM4.5 18a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-2a.75.75 0 0 1 1.5 0v2A3 3 0 0 1 18 21H6a3 3 0 0 1-3-3v-2a.75.75 0 0 1 1.5 0v2z"
      />
    </svg>
  );
}
function Open() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M14 3a1 1 0 0 0 0 2h3.586l-7.293 7.293a1 1 0 0 0 1.414 1.414L19 6.414V10a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-6z"
      />
      <path
        fill="currentColor"
        d="M5 6a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H5z"
      />
    </svg>
  );
}
