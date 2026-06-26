"use client";

import React from "react";
import Link from "next/link";
import { MiniAwardCard } from "./MiniAwardCard";
import type { Award } from "./awards.data";

type Props = {
  items: Award[];
  hrefAll?: string;
  className?: string;
  speed?: number;    // seconds per full loop
  limit?: number;
};

export function AwardsMarquee({
  items,
  hrefAll = "/awards",
  className = "mx-auto max-w-screen-2xl px-4 py-5",
  speed = 80,       // slower default
  limit,
}: Props) {
  const list = limit ? items.slice(0, limit) : items;

  return (
    <section className={className}>

      {/* Header (card-style, keeps your structure & CTA) */}
<div className="mb-6 md:mb-8">
  <div className="relative overflow-hidden rounded-2xl border border-gold/45 bg-white p-4 sm:p-5 md:p-6">
    {/* soft gold accents (clipped inside) */}
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -top-20 -left-24 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-gold/[0.06] blur-3xl" />
    </div>

    {/* content: responsive flex with title + CTA */}
    <div className="relative flex flex-wrap items-center justify-between gap-3">
      <h2
        id="insights-top6-title"
        className="font-sora text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-ink break-words"
      >
        Awards & Recognition
      </h2>

      <div className="shrink-0">
        <Link
          href={hrefAll}
          className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-sand/60 px-3.5 py-2 text-sm font-medium text-ink transition hover:border-gold/65 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          View all
          <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
  </div>
</div>

      <div className="relative overflow-hidden">
        <div
          className="flex w-max gap-3 md:gap-4 animate-marquee"
          style={{ ["--speed" as any]: `${speed}s` }}
        >
          {[...list, ...list].map((a, i) => (
            <MiniAwardCard key={`${a.id}-${i}`} award={a} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-midnight to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-midnight to-transparent" />
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee var(--speed) linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .animate-marquee { animation: none; } }
      `}</style>
    </section>
  );
}