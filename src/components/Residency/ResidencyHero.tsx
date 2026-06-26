"use client";

import React from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Eyebrow } from "@/components/ui";
import {
  Reveal,
  SplitText,
  CharReveal,
  Magnetic,
  DrawLine,
  ParallaxLayer,
  KenBurns,
} from "@/components/motion";

type Props = {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryText?: string;
  secondaryHref?: string;
  secondaryText?: string;
  className?: string;
  /** Optional pill above the title, e.g. "Premium Advisory" */
  badge?: string;
  /** Optional feature chips under the subtitle */
  features?: string[];
  /** Text alignment on larger screens */
  align?: "left" | "center";
  /** Full-bleed cinematic backdrop image. */
  image?: string;
  imageAlt?: string;
};

export default function HeroPremium({
  title = "Discover Your Ideal Residency by Investment",
  subtitle = "Concierge guidance across donation and real-estate routes. Transparent costs, rigorous compliance, and end-to-end execution.",
  primaryHref = "/contact",
  primaryText = "Book a Free Consultation",
  secondaryHref = "/images/residency/xiphias-corporate-mobility.pdf",
  secondaryText = "Download Guide",
  className = "",
  badge = "Private Client Service",
  features = [
    "Dedicated due-diligence desk",
    "Discreet & confidential",
    "Project vetting",
  ],
  align = "left",
  image = "/images/residency/uae/uae-specialized-talent-hero.webp",
  imageAlt = "Sunlit towers of the Dubai skyline at golden hour",
}: Props) {
  const isPdf =
    typeof secondaryHref === "string" && secondaryHref.endsWith(".pdf");
  const heroId = "hero-premium-title";

  const alignClasses =
    align === "center" ? "text-center md:max-w-3xl mx-auto" : "text-start";

  return (
    <>
      <section
        aria-labelledby={heroId}
        className={[
          "relative isolate overflow-hidden rounded-3xl",
          "border border-gold/30 bg-midnight text-pearl",
          "min-h-[78vh] lg:min-h-[88vh]",
          "flex items-end",
          className,
        ].join(" ")}
      >
        {/* ── Full-bleed cinematic backdrop (Ken Burns drift) ── */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <KenBurns
            src={image}
            alt={imageAlt}
            priority
            duration={26}
            position="center 35%"
            sizes="100vw"
            className="h-full w-full"
          />
          {/* Cinematic scrims — keep editorial copy legible over any frame */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/55 to-midnight/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/85 via-midnight/35 to-transparent" />
          {/* Faint gold vignette breath at the base */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gold/10 to-transparent mix-blend-screen" />
        </div>

        {/* Slow parallax gold halo for depth */}
        <ParallaxLayer
          speed={70}
          className="pointer-events-none absolute -end-24 top-10 -z-10 hidden md:block"
        >
          <span
            aria-hidden
            className="block h-80 w-80 rounded-full bg-gold/15 blur-3xl"
          />
        </ParallaxLayer>

        {/* Top hairline */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
        />

        {/* Golden guiding line drawing down the trailing edge */}
        <DrawLine
          d="M1 0 L1 100"
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
          strokeWidth={1}
          className="pointer-events-none absolute end-0 top-0 hidden h-full w-px md:block"
        />

        <div
          className={`relative z-10 w-full px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 ${alignClasses}`}
        >
          {/* Eyebrow / kicker */}
          <Reveal>
            <Eyebrow tone="onDark" arabic="الإقامة">
              Residency
            </Eyebrow>
          </Reveal>

          {/* Optional badge */}
          {badge ? (
            <Reveal delay={0.05}>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-pearl/80 backdrop-blur">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-gold"
                />
                {badge}
              </span>
            </Reveal>
          ) : null}

          {/* Title */}
          <SplitText
            text={title}
            delay={0.08}
            className="mt-6 block max-w-[18ch] text-balance font-sora text-[clamp(2.2rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-pearl drop-shadow-[0_2px_30px_rgba(0,0,0,0.45)]"
          />
          <h1 id={heroId} className="sr-only">
            {title}
          </h1>

          {/* Gold underline accent */}
          <DrawLine
            d="M0 1 L120 1"
            viewBox="0 0 120 2"
            preserveAspectRatio="none"
            strokeWidth={1.5}
            delay={0.4}
            className={[
              "mt-6 h-px w-32",
              align === "center" ? "mx-auto" : "",
            ].join(" ")}
          />

          {/* Subtitle */}
          <Reveal delay={0.15}>
            <p
              className={[
                "mt-6 text-[15px] leading-7 text-pearl/75 md:text-base",
                align === "center" ? "mx-auto max-w-2xl" : "max-w-xl",
              ].join(" ")}
            >
              {subtitle}
            </p>
          </Reveal>

          {/* Feature chips */}
          {features?.length ? (
            <Reveal delay={0.2}>
              <ul
                className={[
                  "mt-6 flex flex-wrap gap-2.5 text-xs",
                  align === "center" ? "justify-center" : "",
                ].join(" ")}
              >
                {features.map((f) => (
                  <li
                    key={f}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-white/10 px-3 py-1 text-pearl/85 backdrop-blur"
                  >
                    <Check />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          {/* CTAs */}
          <Reveal delay={0.25}>
            <div
              className={`mt-8 flex flex-wrap items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
            >
              <Magnetic>
                <Link
                  href={primaryHref}
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[14px] font-semibold text-midnight transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-8px_rgba(212,175,55,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
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
                  className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/10 px-7 py-3.5 text-[14px] font-semibold text-pearl backdrop-blur transition-colors duration-300 hover:border-gold hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
                  aria-label={secondaryText}
                >
                  <Download />
                  {secondaryText}
                </a>
              ) : (
                <Link
                  href={secondaryHref}
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/10 px-7 py-3.5 text-[14px] font-semibold text-pearl backdrop-blur transition-colors duration-300 hover:border-gold hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
                  aria-label={secondaryText}
                >
                  <Open />
                  {secondaryText}
                </Link>
              )}

              {/* Micro reassurance */}
              <span className="text-xs text-pearl/65 ms-0 md:ms-2">
                No obligation · Response within 24 hours
              </span>
            </div>
          </Reveal>

          {/* Whisper line — Arabic + English scroll hint */}
          <Reveal delay={0.32}>
            <div className="mt-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-pearl/45">
              <span aria-hidden className="h-px w-10 bg-gold/50" />
              <CharReveal text="A residence for every chapter of life" delay={0.4} />
            </div>
          </Reveal>
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
