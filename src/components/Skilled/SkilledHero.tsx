"use client";

import React from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Eyebrow } from "@/components/ui";
import {
  KenBurns,
  ParallaxLayer,
  DrawLine,
  LatticeOverlay,
  SandReveal,
  Reveal,
  SplitText,
  Stagger,
  StaggerItem,
  Magnetic,
  Counter,
} from "@/components/motion";

type Props = {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryText?: string;
  secondaryHref?: string;
  secondaryText?: string;

  /** NEW (optional) */
  brochureHref?: string;
  brochureText?: string;
  eligibilityHref?: string;
  eligibilityText?: string;

  className?: string;
  /** Optional pill above the title, e.g. "Premium Advisory" */
  badge?: string;
  /** Optional feature chips under the subtitle */
  features?: string[];
  /** Text alignment on larger screens */
  align?: "left" | "center";
};

export default function SkilledHero({
  title = "Discover Skilled Migration & Work Permits",
  subtitle = "Points-tested PR, employer sponsorships, and priority talent visas across the Emirates and top destinations worldwide.",
  primaryHref = "/contact",
  primaryText = "Book a Free Consultation",
  secondaryHref = "/images/residency/xiphias-corporate-mobility.pdf",
  secondaryText = "Download Guide",

  // NEW: only rendered if provided
  brochureHref,
  brochureText = "Download Brochure",
  eligibilityHref,
  eligibilityText = "Check Eligibility",

  className = "",
  badge = "Skilled Migration",
  features = ["Points-tested PR", "Employer sponsorships", "Priority talent visas"],
  align = "left",
}: Props) {
  const isPdf =
    typeof secondaryHref === "string" && secondaryHref.endsWith(".pdf");
  const isBrochurePdf =
    typeof brochureHref === "string" && brochureHref.endsWith(".pdf");
  const heroId = "skilled-hero-title";

  const alignClasses =
    align === "center" ? "text-center md:max-w-3xl mx-auto" : "text-start";

  // Cinematic stat strip — confident, content-first proof on the dark ground.
  const stats: { to: number; suffix: string; label: string }[] = [
    { to: 7, suffix: "", label: "Destinations" },
    { to: 20, suffix: "+", label: "Years advising" },
    { to: 24, suffix: "h", label: "Response time" },
  ];

  return (
    <>
      <section
        aria-labelledby={heroId}
        className={[
          "relative isolate overflow-hidden rounded-3xl",
          "bg-midnight text-pearl",
          "border border-gold/30",
          "min-h-[460px] md:min-h-[560px] lg:min-h-[640px]",
          "flex items-end",
          className,
        ].join(" ")}
      >
        {/* ── Cinematic full-bleed media: real skilled destination, slow KenBurns ── */}
        <div className="absolute inset-0 -z-10">
          <KenBurns
            src="/images/skilled/canada/canada-express-entry.webp"
            alt="Skyline of a leading skilled-migration destination at dusk"
            priority
            sizes="100vw"
            position="center 35%"
            className="h-full w-full"
          />
          {/* Cinematic scrim — readable text, gold-warmed shadow at the base */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/80 to-midnight/35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-midnight/85 via-midnight/40 to-transparent"
          />
        </div>

        {/* Ambient depth layers — parallax decor (cheap transforms) */}
        <ParallaxLayer speed={40} className="pointer-events-none absolute inset-0 -z-10">
          <LatticeOverlay opacity={0.08} />
        </ParallaxLayer>

        {/* Top hairline */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />

        {/* Guiding golden stroke — sweeps in from the corner */}
        <DrawLine
          aria-hidden="true"
          d="M2 92 C 28 72, 40 56, 70 40 S 96 18, 98 8"
          viewBox="0 0 100 100"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
          strokeWidth={0.8}
          delay={0.2}
        />

        {/* Decorative ghost glyph — gold on the dark ground, anchors the corner */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 end-3 select-none font-sora text-[9rem] leading-none text-gold/20 md:text-[13rem]"
        >
          ↗
        </span>

        <div className={`relative z-10 w-full p-6 md:p-10 lg:p-14 ${alignClasses}`}>
          {/* Eyebrow */}
          {badge ? (
            <Reveal>
              <Eyebrow
                tone="gold"
                arabic="الهجرة المهنية"
                className={align === "center" ? "justify-center" : ""}
              >
                {badge}
              </Eyebrow>
            </Reveal>
          ) : null}

          {/* Title — rises out of the dark */}
          <SandReveal delay={0.05}>
            <h1
              id={heroId}
              className="mt-6 max-w-3xl font-sora text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-pearl"
            >
              <SplitText text={title} />
            </h1>
          </SandReveal>

          {/* Subtitle */}
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-pearl/75 md:text-base">
              {subtitle}
            </p>
          </Reveal>

          {/* Feature chips */}
          {features?.length ? (
            <Stagger
              className={`mt-6 flex flex-wrap gap-2.5 text-xs ${
                align === "center" ? "justify-center" : ""
              }`}
            >
              {features.map((f) => (
                <StaggerItem key={f}>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-pearl/85 ring-1 ring-gold/40 backdrop-blur-sm">
                    <Check />
                    <span>{f}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          ) : null}

          {/* CTAs */}
          <div
            className={`mt-8 flex flex-wrap items-center gap-3 ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            <Magnetic>
              <Link
                href={primaryHref}
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-midnight transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-8px_rgba(212,175,55,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
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
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-6 py-3 text-pearl backdrop-blur-sm transition-colors duration-300 hover:border-gold/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label={secondaryText}
              >
                <Download />
                {secondaryText}
              </a>
            ) : (
              <Link
                href={secondaryHref}
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-6 py-3 text-pearl backdrop-blur-sm transition-colors duration-300 hover:border-gold/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label={secondaryText}
              >
                <Open />
                {secondaryText}
              </Link>
            )}

            {/* NEW: Brochure (optional) */}
            {brochureHref
              ? isBrochurePdf ? (
                  <a
                    href={brochureHref}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-6 py-3 text-pearl backdrop-blur-sm transition-colors duration-300 hover:border-gold/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    aria-label={brochureText}
                  >
                    <Download />
                    {brochureText}
                  </a>
                ) : (
                  <Link
                    href={brochureHref}
                    prefetch={false}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-6 py-3 text-pearl backdrop-blur-sm transition-colors duration-300 hover:border-gold/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    aria-label={brochureText}
                  >
                    <Open />
                    {brochureText}
                  </Link>
                )
              : null}

            {/* NEW: Check Eligibility (optional) */}
            {eligibilityHref ? (
              <Link
                href={eligibilityHref}
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-6 py-3 text-pearl backdrop-blur-sm transition-colors duration-300 hover:border-gold/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label={eligibilityText}
              >
                <Open />
                {eligibilityText}
              </Link>
            ) : null}

            {/* Micro reassurance */}
            <span className="ms-0 md:ms-2 text-xs text-pearl/65">
              No obligation · Response within 24 hours
            </span>
          </div>

          {/* Count-up proof strip — content-first credibility on the dark ground */}
          <Stagger
            className={`mt-9 flex flex-wrap gap-x-10 gap-y-4 border-t border-gold/15 pt-6 ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="flex flex-col">
                  <Counter
                    to={s.to}
                    suffix={s.suffix}
                    className="font-sora text-3xl font-semibold leading-none tracking-tight text-gold"
                  />
                  <span className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-pearl/60">
                    {s.label}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
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
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
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
