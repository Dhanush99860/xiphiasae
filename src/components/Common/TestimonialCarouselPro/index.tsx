"use client";

import * as React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { Star, BadgeCheck, Quote } from "lucide-react";

import { TESTIMONIALS_PRO, type Testimonial } from "@/app/api/testimonials";

/* =============================================================================
   TestimonialCarouselMarquee
   - Uniform cards (all equal)
   - No read-more, no pause/play, no arrows/dots
   - Auto + slow marquee-style movement (right → left)
   - Reusable: uses imported data by default; can accept items prop
   - NEW: Initials-only by default (no images needed). Toggle with showInitialsOnly.
   ============================================================================= */

export type TestimonialCarouselProps = {
  items?: Testimonial[];
  title?: string;
  subtitle?: string;
  className?: string;
  /** If true (default), ignore item.image and render initials instead */
  showInitialsOnly?: boolean;
};

export default function TestimonialCarouselMarquee({
  items,
  title = "What our clients say",
  subtitle = "Real feedback from people who trusted us.",
  className = "",
  showInitialsOnly = true,
}: TestimonialCarouselProps) {
  const data = (items?.length ? items : TESTIMONIALS_PRO) as Testimonial[];

  return (
    <section
      role="region"
      className={[
        "mx-auto max-w-screen-2xl px-4 py-5",
        "bg-sand",
        className,
      ].join(" ")}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 text-[12px] text-ink/70">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="font-semibold">Testimonials</span>
          </div>
          <h2 className="mt-1 font-sora text-2xl md:text-3xl font-semibold tracking-tight text-ink">
            {title}
          </h2>
          <p className="mt-1 text-sm md:text-[15px] text-ink/55">
            {subtitle}
          </p>
        </div>

        {/* Marquee-style slider: slow, continuous, right → left */}
        <Swiper
          modules={[A11y, Autoplay, FreeMode]}
          a11y={{ enabled: true }}
          freeMode={{ enabled: true, momentum: false }}
          allowTouchMove={false}
          loop
          speed={9000} // slow, smooth
          autoplay={{
            delay: 0, // continuous
            disableOnInteraction: false,
            pauseOnMouseEnter: false, // keep moving
          }}
          slidesPerView={1}
          spaceBetween={18}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 18 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="!pb-2"
        >
          {data.map((t, idx) => (
            <SwiperSlide key={`${t.name}-${idx}`} className="!h-auto">
              <Card item={t} showInitialsOnly={showInitialsOnly} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

/* ================================= Card ================================ */

function Card({
  item: t,
  showInitialsOnly,
}: {
  item: Testimonial;
  showInitialsOnly: boolean;
}) {
  const stars = Math.max(0, Math.min(5, t.rating ?? 0));
  return (
    <article
      className={[
        "h-full flex flex-col justify-between",
        "rounded-2xl border border-gold/45 bg-white p-6 md:p-7",
        "transition-colors hover:border-gold/65",
      ].join(" ")}
    >
      {/* Top meta */}
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gold">
          <Quote className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-wide">
            Review
          </span>
        </div>
        <div
          className="flex items-center gap-1"
          aria-label={`${stars} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < stars
                  ? "text-gold fill-gold"
                  : "text-ink/50"
              }
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* Quote */}
      <p className="text-ink/70 leading-relaxed">
        “{t.text}”
      </p>

      {/* Person */}
      <div className="mt-5 flex items-center gap-3">
        <Avatar src={showInitialsOnly ? undefined : t.image} alt={t.name} />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-[15px] font-semibold text-ink">
              {t.name}
            </h3>
            {t.verified && (
              <span
                title="Verified reviewer"
                className="inline-flex items-center gap-1 rounded-full border border-gold/45 bg-sand/50 px-2 py-0.5 text-[11px] font-medium text-gold"
              >
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Verified
              </span>
            )}
          </div>
          <p className="truncate text-sm text-ink/55">
            {t.role}
          </p>
        </div>
      </div>
    </article>
  );
}

/* =============================== Avatar =============================== */

function Avatar({
  src,
  alt,
  size = 48,
}: {
  src?: string;
  alt: string;
  size?: number;
}) {
  const [error, setError] = React.useState(false);
  const letters = initials(alt);

  const label =
    alt && alt.trim().length > 0 ? `${alt}'s avatar` : "Client avatar";

  // Always fallback if no src OR error
  if (!src || error) {
    return (
      <div
        role="img"
        aria-label={label}
        className="flex items-center justify-center rounded-full border border-gold/45 bg-sand/50 text-gold"
        style={{ width: size, height: size }}
      >
        <span className="text-sm font-semibold">{letters}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={label}
      width={size}
      height={size}
      onError={() => setError(true)}
      className="rounded-full object-cover ring-1 ring-gold/[0.08]"
      style={{ width: size, height: size }}
      loading="lazy"
    />
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "U";
}