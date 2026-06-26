// src/components/Skilled/Overoffer.tsx
"use client";

import React from "react";
import Link from "next/link";
import Script from "next/script";
import { Eyebrow } from "@/components/ui";
import {
  Counter,
  DrawLine,
  LatticeOverlay,
  Reveal,
  SandReveal,
  Stagger,
  StaggerItem,
  ShinyText,
  ImageReveal,
  ParallaxLayer,
} from "@/components/motion";

type Props = {
  /** Bulleted value props shown in the list */
  bullets?: string[];
  /** Primary CTA */
  primaryHref?: string;
  primaryText?: string;
  /** Secondary CTA (pdf supported) */
  secondaryHref?: string;
  secondaryText?: string;
  /** Optional title (defaults to "Why work with us") */
  title?: string;
  /** Optional short blurb under the title for context (SEO + UX) */
  subtitle?: string;
  /** Visual tweaks */
  className?: string;
  align?: "left" | "center";
  /** Optional SEO overrides */
  seo?: {
    serviceName?: string;
    serviceDescription?: string;
    priceCurrency?: string; // default USD
    offerPrice?: number; // default 0 for free consult
    brandName?: string; // your firm name for Service.brand
  };
};

export default function OurOffer({
  bullets = [
    "Dedicated due-diligence desk and source-of-funds guidance.",
    "Government-approved project vetting and exit planning.",
    "End-to-end execution: strategy, documentation, submission, oath & passports.",
    "Confidential handling and white-glove concierge for families.",
  ],
  primaryHref = "/personal-booking",
  primaryText = "Speak to an Advisor",
  secondaryHref = "/images/residency/xiphias-corporate-mobility.pdf",
  secondaryText = "Download Checklist",
  title = "Why work with us",
  subtitle = "A private-client approach to skilled migration: transparent costs, rigorous compliance, and execution without friction.",
  className = "",
  align = "left",
  seo = {},
}: Props) {
  const isPdf =
    typeof secondaryHref === "string" &&
    secondaryHref.toLowerCase().endsWith(".pdf");
  const headingId = "our-offer-heading";

  // --- SEO defaults ---
  const serviceName = seo.serviceName ?? "Skilled Migration Advisory";
  const serviceDescription =
    seo.serviceDescription ??
    "Concierge guidance across points-tested PR, employer sponsorships, and talent visas with transparent costs, compliance, and end-to-end execution.";
  const priceCurrency = seo.priceCurrency ?? "USD";
  const offerPrice = typeof seo.offerPrice === "number" ? seo.offerPrice : 0;
  const brandName = seo.brandName ?? "XIPHIAS Immigration";

  // JSON-LD (Service + Offer + ItemList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    brand: { "@type": "Brand", name: brandName },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      name: primaryText,
      url: primaryHref,
      price: offerPrice,
      priceCurrency,
      availability: "https://schema.org/InStock",
      category: "Consultation",
    },
    hasPart: {
      "@type": "ItemList",
      itemListElement: bullets.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b,
      })),
    },
  };

  const alignCls =
    align === "center" ? "text-center md:max-w-3xl mx-auto" : "text-start";

  const stats: { to: number; suffix: string; label: string }[] = [
    { to: 20, suffix: "+", label: "Years advising" },
    { to: 30, suffix: "+", label: "Destinations" },
    { to: 24, suffix: "h", label: "Response time" },
  ];

  return (
    <section
      aria-labelledby={headingId}
      className={[
        "relative overflow-hidden rounded-3xl p-6 md:p-10",
        "bg-white text-ink",
        "border border-gold/45",
        className,
      ].join(" ")}
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* Ambient texture */}
      <LatticeOverlay opacity={0.06} />

      {/* Top hairline */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      {/* Decorative ghost monogram — readable gold on the ivory card */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 end-0 select-none font-sora text-[10rem] font-semibold leading-none text-gold_deep/25"
      >
        X
      </span>

      {/* JSON-LD for SEO */}
      <Script
        id="our-offer-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <meta itemProp="name" content={serviceName} />
      <meta itemProp="serviceType" content="ProfessionalService" />
      <meta itemProp="areaServed" content="Worldwide" />
      <meta itemProp="brand" content={brandName} />
      <meta itemProp="description" content={serviceDescription} />

      <div className={`relative z-10 ${alignCls}`}>
        <Reveal>
          <Eyebrow
            tone="gold"
            arabic="الميزة"
            className={align === "center" ? "justify-center" : ""}
          >
            The XIPHIAS Edge
          </Eyebrow>
        </Reveal>

        <SandReveal delay={0.05}>
          <h2
            id={headingId}
            className="mt-5 font-sora text-xl md:text-2xl font-semibold tracking-tight text-ink"
          >
            <ShinyText baseColor="#0a0e1a" shineColor="#a87d1f" speed={5}>
              {title}
            </ShinyText>
          </h2>
        </SandReveal>

        {subtitle ? (
          <Reveal delay={0.1}>
            <p
              className="mt-3 max-w-xl text-[15px] leading-7 text-ink/60"
              itemProp="description"
            >
              {subtitle}
            </p>
          </Reveal>
        ) : null}

        {/* Count-up stat strip */}
        <Stagger
          className={`mt-6 flex flex-wrap gap-x-10 gap-y-4 ${
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
                <span className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold_deep">
                  {s.label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Golden connector line leading into the benefits */}
        <DrawLine
          aria-hidden="true"
          d="M0 4 L 100 4"
          viewBox="0 0 100 8"
          className="mt-8 h-2 w-full"
          strokeWidth={1.4}
          delay={0.1}
        />

        {/* Benefits list (ItemList microdata) */}
        <Reveal delay={0.1}>
          <ol
            className="mt-6 grid gap-2.5 sm:grid-cols-2"
            itemScope
            itemType="https://schema.org/ItemList"
            aria-label="Key benefits"
          >
            {bullets.map((b, i) => (
              <li
                key={b}
                className="flex items-start gap-2 rounded-xl border border-gold/45 bg-sand/50 px-3 py-2.5 transition-colors duration-300 hover:border-gold/70 hover:-translate-y-0.5"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <meta itemProp="position" content={String(i + 1)} />
                <CheckIcon />
                <span className="text-sm leading-6 text-ink/80" itemProp="name">
                  {b}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* CTAs */}
        <div
          className={`mt-7 flex flex-wrap items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
        >
          <Link
            href={primaryHref}
            prefetch={false}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-midnight transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-8px_rgba(212,175,55,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            aria-label={primaryText}
            itemProp="offers"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <meta itemProp="priceCurrency" content={priceCurrency} />
            <meta itemProp="price" content={String(offerPrice)} />
            <meta
              itemProp="availability"
              content="https://schema.org/InStock"
            />
            {primaryText}
            <ArrowRight />
          </Link>

          {isPdf ? (
            <a
              href={secondaryHref}
              download
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-sand/50 px-6 py-3 text-ink transition-colors duration-300 hover:border-gold/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={secondaryText}
              rel="noopener"
            >
              <Download />
              {secondaryText}
            </a>
          ) : (
            <Link
              href={secondaryHref}
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-sand/50 px-6 py-3 text-ink transition-colors duration-300 hover:border-gold/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={secondaryText}
            >
              <Open />
              {secondaryText}
            </Link>
          )}

          <span className="ms-0 md:ms-2 text-xs text-ink/60">
            No obligation · Response within 24 hours
          </span>
        </div>

        {/* Trust chips (optional, subtle credibility cues) */}
        <ul
          className={`mt-5 flex flex-wrap gap-2 ${align === "center" ? "justify-center" : ""}`}
        >
          <Chip>Licensed local agents</Chip>
          <Chip>KYC/AML workflows</Chip>
          <Chip>Transparent fee schedule</Chip>
        </ul>

        {/* Editorial media frame — masked clip-wipe over a real destination,
            with a parallax gold caption rail. Cinematic, content-supportive. */}
        <div className="relative mt-8">
          <ParallaxLayer speed={28}>
            <ImageReveal
              src="/images/skilled/canada/provincial-nominee-program.webp"
              alt="Skilled professionals building their future abroad with XIPHIAS"
              ratio="aspect-[16/9]"
              position="center 40%"
              sizes="(min-width:1024px) 60vw, 100vw"
              className="border border-gold/30"
            />
          </ParallaxLayer>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-midnight/80 to-transparent p-4 md:p-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              White-glove execution
            </span>
            <p className="mt-1 max-w-md text-[13px] leading-6 text-pearl/85">
              Strategy, documentation, submission and oath &mdash; handled
              end to end by a dedicated advisory desk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- UI bits ------------------------------- */

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full bg-sand/50 px-3 py-1 text-xs text-ink/70 ring-1 ring-gold/40">
      {children}
    </li>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-1 h-4 w-4 shrink-0 fill-gold"
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
