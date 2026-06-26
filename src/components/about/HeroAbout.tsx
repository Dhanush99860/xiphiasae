// components/about/HeroAbout.tsx
import React from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Eyebrow } from "@/components/ui";
import { Counter, DrawLine } from "@/components/motion";

type Props = {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryText?: string;
  /** kept for API compatibility, but not rendered as a button */
  secondaryHref?: string;
  secondaryText?: string;
  className?: string;
  badge?: string;
  features?: string[];
  /** kept for API compatibility (defaults to left) */
  align?: "left" | "center";
};

export default function HeroAbout({
  title = "About XIPHIAS Immigration — Where Trust Meets Global Opportunity",
  subtitle = "Licensed, transparent and results-focused advisory for Residency, Citizenship, Corporate Mobility and Skilled Migration — trusted by HNIs and enterprises worldwide.",
  primaryHref = "/contact",
  primaryText = "Book a free Consultation",
  // secondary props intentionally not rendered to keep the flow focused
  secondaryHref,
  secondaryText,
  className = "",
  badge = "Private Client Service",
  features = ["Licensed & Regulated", "White-glove Case Handling", "HNI-grade Confidentiality"],
  align = "left",
}: Props) {
  const heroId = "hero-about-title";
  const alignClasses =
    align === "center" ? "text-center md:max-w-3xl mx-auto" : "text-start md:max-w-3xl";

  return (
    <>
      {/* page container */}
      <div className="container mx-auto lg:max-w-screen-2xl px-4 sm:px-6 lg:px-8 overflow-x-clip">
        {/* CARD hero — NOT full width */}
        <section
          id="about-hero"
          aria-labelledby={heroId}
          className={[
            "relative mx-auto mt-4 overflow-hidden rounded-3xl p-6 md:p-8 lg:p-10",
            "bg-white border border-gold/45",
            "text-ink",
            className,
          ].join(" ")}
        >
          {/* soft background accents (clipped by parent) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="hidden sm:block absolute -top-24 -end-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
            <div className="hidden sm:block absolute -bottom-28 -start-10 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />
            <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent_80%)]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.06)_1px,transparent_1px)] bg-[size:22px_22px]" />
            </div>
          </div>

          {/* gold guiding line into the headline */}
          <DrawLine
            d="M2 40 C 30 10, 70 70, 120 28"
            viewBox="0 0 120 80"
            className="pointer-events-none absolute -top-2 end-6 hidden h-16 w-40 opacity-60 lg:block"
            strokeWidth={1.2}
          />

          <div className="relative">
            <div className="grid items-start gap-8 lg:grid-cols-12">
              {/* LEFT column */}
              <div className="lg:col-span-7 min-w-0">
                {badge && <Eyebrow arabic="موثوق">{badge}</Eyebrow>}

                <div className={alignClasses}>
                  <h1
                    id={heroId}
                    className="mt-4 break-words font-sora text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl"
                  >
                    {title}
                  </h1>

                  <p className="mt-4 break-words text-[15px] leading-7 text-ink/55 md:text-base">
                    {subtitle}
                  </p>

                  {features?.length ? (
                    <ul className="mt-5 flex flex-wrap gap-2.5 text-xs">
                      {features.map((f) => (
                        <li
                          key={f}
                          className="inline-flex items-center gap-1.5 rounded-full border border-gold/45 bg-sand/50 px-3 py-1 text-ink/70"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                          <span className="break-words">{f}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {/* Single primary CTA (direct flow) */}
                  <div
                    className={[
                      "mt-6 flex flex-wrap items-center gap-3 min-w-0",
                      align === "center" ? "justify-center" : "",
                    ].join(" ")}
                  >
                    <Link
                      href={primaryHref}
                      prefetch={false}
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-midnight transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-8px_rgba(212,175,55,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
                      aria-label={primaryText}
                    >
                      {primaryText}
                      <ArrowRight />
                    </Link>

                    <span className="ms-0 text-xs text-ink/45 md:ms-2">
                      No obligation · Response within 24 hours
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT column — simplified stat card (no extra CTAs) */}
              <aside className="lg:col-span-5" aria-label="Firm highlights and trust metrics">
                <div className="mx-auto w-full max-w-md rounded-2xl border border-gold/40 bg-sand/50 p-5">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <Stat label="Years" value={17} suffix="+" />
                    <Stat label="Countries" value={50} suffix="+" />
                    <Stat label="Programs" value={100} suffix="+" />
                  </div>

                  <div className="mt-4 rounded-xl border border-gold/45 bg-white p-3 text-center text-sm">
                    <p className="font-semibold text-ink">
                      Strong approval track record on eligible, well-prepared files*
                    </p>
                    <p className="mt-1 text-[11px] text-ink/45">
                      *No guarantees. Eligibility &amp; rules apply.
                    </p>
                  </div>

                  <p className="mt-3 text-center text-[11px] text-ink/45">
                    ICCRC • MARA • IMC aligned practices
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* breadcrumb under the card */}
        <div className="mt-3">
          <Breadcrumb />
        </div>
      </div>
    </>
  );
}

/* icons */
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
function Stat({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="rounded-xl border border-gold/45 bg-white p-3">
      <div className="font-sora text-lg font-semibold text-gold">
        <Counter to={value} suffix={suffix} />
      </div>
      <div className="text-[11px] uppercase tracking-widest text-ink/40">{label}</div>
    </div>
  );
}
