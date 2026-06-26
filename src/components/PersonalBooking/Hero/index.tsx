// src/components/PersonalBooking/Hero/index.tsx
"use client";

import React from "react";
import Link from "next/link";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

type Props = {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryText?: string;
  secondaryHref?: string;
  secondaryText?: string;
  className?: string;
  /** Eyebrow above the title */
  badge?: string;
  /** Feature chips below subtitle */
  features?: string[];
  /** Text alignment on larger screens */
  align?: "left" | "center";
  /** Tiny reassurance beside CTAs (e.g., SLA) */
  microNote?: string;
  /** Paid-call note under CTAs */
  priceNote?: string;
  /** Cormorant serif class for display headings */
  serifClass?: string;
};

export default function HeroPremium({
  title = "Book Your RBI / CBI Strategy Call",
  subtitle = "Your objectives, comfort, and clarity are at the core of all we do at XIPHIAS. You receive ethical, transparent, and fully compliant immigration support that is customized to meet your specific needs, with IMC Fellow-certified specialists advising you at every step. We facilitate a more seamless and assured journey by",
  primaryHref = "/booking",
  primaryText = "Book Paid Consultation",
  secondaryHref = "/images/residency/xiphias-corporate-mobility.pdf",
  secondaryText = "Investment Programs Guide (PDF)",
  className = "",
  badge = "Private Client • Investment Migration",
  features = [
    "IMC Fellow–led, ethics & compliance first",
    "Tailored Program Solution",
    "Precise ROI and risk insights",
    "Refined source of funds advice",
    "Complete assistance with business, financial, and legal documentation",
    "Accurate comparisons between nations with revised policies",
  ],
  align = "left",
  microNote = "Confidential • NDA on request",
  priceNote = "Paid strategy call • 60 mins • Credited on engagement",
  serifClass = "",
}: Props) {
  const isPdf =
    typeof secondaryHref === "string" &&
    secondaryHref.toLowerCase().endsWith(".pdf");

  const heroId = "hero-premium-title";
  const alignClasses =
    align === "center" ? "text-center md:max-w-3xl mx-auto" : "text-left";

  return (
    <section
      data-tone="dark"
      aria-labelledby={heroId}
      className={[
        "relative overflow-hidden px-6 pb-24 pt-36 md:px-10 lg:px-16",
        className,
      ].join(" ")}
      style={{
        background: `radial-gradient(120% 90% at 50% 0%, #13284f 0%, ${NAVY} 60%)`,
        color: "#fff",
      }}
    >
      <Ambient tone="dark" />

      <div className={`relative z-10 mx-auto max-w-6xl ${alignClasses}`}>
        {/* Eyebrow / badge */}
        {badge ? (
          <div
            className={[
              "flex items-center gap-3",
              align === "center" ? "justify-center" : "",
            ].join(" ")}
          >
            <span className="h-px w-10" style={{ background: GOLD }} />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: GOLD }}
            >
              {badge}
            </span>
          </div>
        ) : null}

        {/* Page-level heading for this booking page */}
        <h1
          id={heroId}
          className={`${serifClass} mt-6 max-w-4xl text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.0]`}
        >
          {title}
        </h1>

        <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/60 md:text-base">
          {subtitle}
        </p>

        {features?.length ? (
          <ul
            className={[
              "mt-7 flex flex-wrap gap-2.5 text-xs",
              align === "center" ? "justify-center" : "",
            ].join(" ")}
          >
            {features.map((f) => (
              <li
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-white/70"
                style={{ border: "1px solid rgba(191,161,92,0.32)", background: "rgba(255,255,255,0.03)" }}
              >
                <Check />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* FEATURED spotlight — the booking call, called out large */}
        <div
          className="mt-14 grid items-center gap-8 rounded-3xl p-8 md:grid-cols-[auto_1fr] md:p-12"
          style={{ border: "1px solid rgba(191,161,92,0.4)", background: "rgba(255,255,255,0.03)" }}
        >
          <div className="flex flex-col items-start gap-4">
            <span
              className={`${serifClass} text-[clamp(3rem,8vw,6rem)] font-medium leading-none`}
              style={{ color: GOLD }}
            >
              01
            </span>
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.26em]"
              style={{ color: GOLD }}
            >
              Strategy Call
            </span>
          </div>

          <div>
            <h2 className={`${serifClass} text-[clamp(1.6rem,3.2vw,2.6rem)] font-medium leading-tight`}>
              Reserve a private consultation
            </h2>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={primaryHref}
                prefetch={false}
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5"
                style={{ background: GOLD, color: NAVY }}
                aria-label={primaryText}
              >
                {primaryText}
                <ArrowRight />
              </Link>

              {secondaryHref
                ? isPdf
                  ? (
                    <a
                      href={secondaryHref}
                      download
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/85 transition hover:text-white"
                      style={{ border: "1px solid rgba(191,161,92,0.4)" }}
                      aria-label={secondaryText}
                    >
                      <Download />
                      {secondaryText}
                    </a>
                  )
                  : (
                    <Link
                      href={secondaryHref}
                      prefetch={false}
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/85 transition hover:text-white"
                      style={{ border: "1px solid rgba(191,161,92,0.4)" }}
                      aria-label={secondaryText}
                    >
                      <Open />
                      {secondaryText}
                    </Link>
                  )
                : null}

              {microNote ? (
                <span className="ml-0 md:ml-2 text-xs text-white/45">
                  {microNote}
                </span>
              ) : null}
            </div>

            {priceNote ? (
              <p className="mt-3 text-xs text-white/45">
                {priceNote}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- tiny inline icons (no extra deps) ---------- */

function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5"
      style={{ fill: GOLD }}
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