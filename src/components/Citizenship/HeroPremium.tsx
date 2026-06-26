"use client";

import React from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import {
  DrawLine,
  Reveal,
  Stagger,
  StaggerItem,
  ShinyText,
  SplitText,
  KenBurns,
  ParallaxLayer,
  Magnetic,
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
  /** Full-bleed cinematic background image */
  image?: string;
  imageAlt?: string;
};

export default function HeroPremium({
  title = "Second Citizenship. First-class Advisory.",
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
  image = "/images/citizenship/dubai/dubai-country-image.webp",
  imageAlt = "Dubai skyline at golden hour — second citizenship and global mobility advisory",
}: Props) {
  const isPdf =
    typeof secondaryHref === "string" && secondaryHref.endsWith(".pdf");
  const heroId = "hero-premium-title";

  const alignClasses =
    align === "center" ? "text-center md:max-w-3xl mx-auto" : "text-left";

  return (
    <>
      <section
        aria-labelledby={heroId}
        className={[
          // Cinematic full-bleed midnight panel with a gold hairline edge
          "relative isolate overflow-hidden rounded-[1.75rem] text-pearl",
          "border border-gold/30 bg-midnight",
          "min-h-[30rem] md:min-h-[34rem] lg:min-h-[40rem]",
          "flex items-end",
          className,
        ].join(" ")}
      >
        {/* ── Full-bleed KenBurns image (slow scale + drift) ── */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <KenBurns
            src={image}
            alt={imageAlt}
            priority
            sizes="(min-width:1280px) 1200px, 100vw"
            position="center 35%"
            className="h-full w-full"
          />
          {/* cinematic scrim: dark from the bottom + side for legible text */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/85 via-midnight/35 to-transparent" />
          {/* gold underglow drifting on scroll */}
          <ParallaxLayer
            speed={40}
            className="pointer-events-none absolute -bottom-24 end-[-6rem]"
          >
            <div className="h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          </ParallaxLayer>
          {/* top + bottom hairlines */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>

        {/* A thin golden line that draws itself down the left edge */}
        <DrawLine
          d="M1 1 V58"
          viewBox="0 0 2 60"
          className="pointer-events-none absolute start-6 top-8 hidden h-40 w-px md:block"
          strokeWidth={1.5}
        />

        <div
          className={`relative w-full p-6 md:p-10 lg:p-14 ${alignClasses}`}
        >
          {/* Badge / Eyebrow */}
          {badge ? (
            <Reveal y={12}>
              <span className="inline-flex items-center rounded-full border border-gold/40 bg-midnight/40 px-3 py-1 text-xs font-medium text-gold backdrop-blur">
                <Dot className="me-1.5" />
                {badge}
              </span>
            </Reveal>
          ) : null}

          {/* Title — word-by-word rise, last phrase lit with gold shine */}
          <h1
            id={heroId}
            className="mt-4 max-w-3xl font-sora text-[clamp(2.1rem,5.4vw,3.75rem)] font-semibold tracking-tight leading-[1.04] text-pearl"
          >
            {renderTitleWithAccent(title)}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-pearl/75 md:text-base">
            {subtitle}
          </p>

          {/* Feature chips — sequenced in */}
          {features?.length ? (
            <Stagger className="mt-6 flex flex-wrap gap-2.5 text-xs" amount={0.4}>
              {features.map((f) => (
                <StaggerItem
                  key={f}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/35 bg-midnight/40 px-3 py-1 text-pearl/85 backdrop-blur"
                >
                  <Check />
                  <span>{f}</span>
                </StaggerItem>
              ))}
            </Stagger>
          ) : null}

          {/* CTAs */}
          <div
            className={`mt-8 flex flex-wrap items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
          >
            <Magnetic className="inline-block" strength={0.3}>
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
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-midnight/30 px-7 py-3.5 text-[14px] font-semibold text-pearl backdrop-blur transition-all duration-300 hover:border-gold/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
                aria-label={secondaryText}
              >
                <Download />
                {secondaryText}
              </a>
            ) : (
              <Link
                href={secondaryHref}
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-midnight/30 px-7 py-3.5 text-[14px] font-semibold text-pearl backdrop-blur transition-all duration-300 hover:border-gold/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
                aria-label={secondaryText}
              >
                <Open />
                {secondaryText}
              </Link>
            )}

            {/* Micro reassurance */}
            <span className="ms-0 md:ms-2 text-xs text-pearl/65">
              No obligation · Response within 24 hours
            </span>
          </div>
        </div>
      </section>
      <div className="mt-4">
        <Breadcrumb />
      </div>
    </>
  );
}

/* ---------- title accent: gold-shine the trailing phrase ---------- */

function renderTitleWithAccent(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) {
    return (
      <ShinyText baseColor="#f6efe2" shineColor="#d4af37" className="font-semibold">
        {title}
      </ShinyText>
    );
  }
  const lead = words.slice(0, -2).join(" ");
  const accent = words.slice(-2).join(" ");
  return (
    <>
      {lead ? (
        <SplitText
          text={`${lead} `}
          className="font-semibold text-pearl"
        />
      ) : null}
      <ShinyText
        baseColor="#d4af37"
        shineColor="#f2d98a"
        className="font-semibold"
      >
        {accent}
      </ShinyText>
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
function Dot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full bg-gold ${className}`}
    />
  );
}
