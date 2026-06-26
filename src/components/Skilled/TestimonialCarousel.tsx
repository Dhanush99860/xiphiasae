"use client";

import React from "react";
import Script from "next/script";
import { LatticeOverlay, KenBurns, ParallaxLayer } from "@/components/motion";

/* ============================ Types ============================ */

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  avatarUrl?: string;
  organization?: string;
  url?: string;
};

type Props = {
  items: Testimonial[];
  intervalMs?: number;
  className?: string;
  title?: string;
  ariaLabel?: string;
};

/* ========================= Helpers ========================== */

function getSite(): string {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://www.xiphiasimmigration.com";

  const base = env.startsWith("http") ? env : `https://${env}`;
  return base.replace(/\/$/, "");
}

function toAbsUrl(site: string, u?: string) {
  if (!u) return undefined;
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  return `${site}${u.startsWith("/") ? u : `/${u}`}`;
}

/* ========================= Component ========================== */

export default function TestimonialCarousel({
  items,
  intervalMs = 6000,
  className = "",
  title = "Client testimonials",
  ariaLabel = "Testimonials carousel",
}: Props) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  const length = items?.length ?? 0;
  const safeItems = Array.isArray(items) ? items : [];
  if (!length) return null;

  const idBase = React.useId();
  const quoteId = `${idBase}-quote-${index}`;

  React.useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq) {
      const apply = () => setReduceMotion(mq.matches);
      apply();
      mq.addEventListener?.("change", apply);
      return () => mq.removeEventListener?.("change", apply);
    }
  }, []);

  React.useEffect(() => {
    const onVisibility = () => document.hidden && setPaused(true);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  React.useEffect(() => {
    if (paused || reduceMotion || length <= 1) return;
    const id = setInterval(
      () => setIndex((v) => (v + 1) % length),
      Math.max(intervalMs, 2000),
    );
    return () => clearInterval(id);
  }, [paused, reduceMotion, intervalMs, length]);

  const goTo = (i: number) => setIndex((i + length) % length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const t = safeItems[index];
  const SITE = getSite();
  const ORG_ID = `${SITE}/#organization`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Client Testimonials",
    description: "Client feedback about services provided by XIPHIAS Immigration.",
    itemListElement: safeItems.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        reviewBody: it.quote,
        ...(toAbsUrl(SITE, it.url) ? { url: toAbsUrl(SITE, it.url) } : {}),
        itemReviewed: {
          "@type": "Organization",
          "@id": ORG_ID,
          name: "XIPHIAS Immigration",
          url: SITE,
        },
        author: {
          "@type": "Person",
          name: it.author,
          ...(it.organization
            ? { worksFor: { "@type": "Organization", name: it.organization } }
            : {}),
          ...(it.role ? { jobTitle: it.role } : {}),
        },
      },
    })),
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className={[
        "relative isolate overflow-hidden rounded-3xl p-6 md:p-8",
        "bg-midnight text-pearl border border-gold/30",
        "flex flex-col",
        className,
      ].join(" ")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Script
        id={`testimonials-jsonld-${idBase}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Cinematic backdrop — a softly drifting real destination, deeply scrimmed */}
      <div className="absolute inset-0 -z-10">
        <KenBurns
          src="/images/skilled/germany/germany-immigration.webp"
          alt=""
          sizes="(min-width:1024px) 33vw, 100vw"
          position="center 40%"
          duration={30}
          className="h-full w-full opacity-50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/90 to-midnight/70"
        />
      </div>

      {/* Ambient texture — parallax lattice for depth */}
      <ParallaxLayer speed={24} className="pointer-events-none absolute inset-0 -z-10">
        <LatticeOverlay opacity={0.08} />
      </ParallaxLayer>

      {/* Top hairline */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <h2 className="sr-only">{title}</h2>

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Oversized gold quote glyph — readable gold on the dark ground */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-3 -start-1 font-sora text-6xl leading-none text-gold/35"
        >
          &ldquo;
        </span>

        <blockquote
          id={quoteId}
          className="relative pt-4 text-[15px] leading-7 text-pearl/90 md:text-lg md:leading-8"
          aria-live="polite"
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        <div className="mt-auto flex items-center gap-3 pt-5">
          <Avatar name={t.author} url={t.avatarUrl} />
          <div className="min-w-0">
            <div className="text-sm font-medium truncate text-pearl">{t.author}</div>
            {(t.role || t.organization) && (
              <div className="text-xs text-pearl/60 truncate">
                {[t.role, t.organization].filter(Boolean).join(" • ")}
              </div>
            )}
          </div>
        </div>

        {length > 1 && (
          <div className="mt-6 flex items-center gap-2">
            <CarouselButton onClick={prev} ariaLabel="Previous testimonial" />
            <CarouselButton onClick={next} ariaLabel="Next testimonial" direction="next" />
            <span className="ms-1 text-xs text-pearl/60 tabular-nums">
              {index + 1}/{length}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

/* ========================== Subcomponents ========================== */

function Avatar({ name, url }: { name: string; url?: string }) {
  const initials = name
    .split(" ")
    .map((w) => w.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const altText = name && name.trim().length > 0 ? `${name}'s photo` : "Client photo";

  return url ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={altText}
      className="h-9 w-9 rounded-full ring-1 ring-gold/40 object-cover bg-ink"
    />
  ) : (
    <div className="h-9 w-9 rounded-full bg-gold/15 text-gold grid place-items-center ring-1 ring-gold/40">
      <span className="text-xs font-semibold">{initials}</span>
    </div>
  );
}

function CarouselButton({
  onClick,
  ariaLabel,
  direction = "prev",
}: {
  onClick: () => void;
  ariaLabel: string;
  direction?: "prev" | "next";
}) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-white/10 text-pearl/80 backdrop-blur-sm transition-colors duration-300 hover:border-gold/70 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        {isNext ? (
          <path d="M5 12.75h11.19l-3.72 3.72a.75.75 0 1 0 1.06 1.06l5.25-5.25a.75.75 0 0 0 0-1.06L13.53 5.97a.75.75 0 1 0-1.06 1.06l3.72 3.72H5a.75.75 0 0 0 0 1.5z" />
        ) : (
          <path d="M19 11.25H7.81l3.72-3.72a.75.75 0 1 0-1.06-1.06L5.22 11.72a.75.75 0 0 0 0 1.06l5.25 5.25a.75.75 0 1 0 1.06-1.06l-3.72-3.72H19a.75.75 0 0 0 0-1.5z" />
        )}
      </svg>
    </button>
  );
}
