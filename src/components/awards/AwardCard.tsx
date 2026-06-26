"use client";

import React from "react";
import Link from "next/link";
import type { Award } from "./awards.data";

type Props = { award: Award; compact?: boolean };

export function AwardCard({ award, compact = false }: Props) {
  const Tag = award.href ? (Link as any) : ("div" as any);
  const tagProps = award.href ? { href: award.href as string, prefetch: false } : {};

  return (
    <Tag
      {...tagProps}
      className={[
        "group relative block h-full rounded-2xl focus:outline-none",
        "border border-gold/45 bg-white",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/65",
        "focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-sand",
        compact ? "w-[300px] max-w-full" : "w-full",
      ].join(" ")}
      aria-label={`${award.tag} — ${award.year}`}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl p-5 md:p-6">
        {/* subtle gold corner glow */}
        <span aria-hidden className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl" />

        {/* ribbon / tag */}
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/45 bg-sand/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold">
          <Star className="h-3.5 w-3.5" />
          {award.tag}
        </div>

        {/* content */}
        <div className="relative pt-4">
          <h3 className="font-sora text-base md:text-lg font-semibold leading-snug text-ink">
            {award.title}
          </h3>
          <p className="mt-1 text-sm text-ink/55">
            {award.issuer}
          </p>
        </div>

        {/* footer */}
        <div className="relative mt-auto flex items-center justify-between pt-4">
          <span className="inline-flex items-center justify-center rounded-full border border-gold/45 bg-sand/50 px-3 py-1 text-sm font-semibold text-gold">
            {award.year}
          </span>

          {award.href ? (
            <span className="inline-flex items-center gap-1 text-sm text-gold transition group-hover:translate-x-0.5">
              View <Arrow className="h-4 w-4" />
            </span>
          ) : (
            <span className="text-xs uppercase tracking-[0.14em] text-ink/40">Recognized</span>
          )}
        </div>

        {/* gold hairline at base */}
        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>
    </Tag>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 3l2.47 5.16L20 9.27l-4 3.9.94 5.48L12 16.99 7.06 18.65 8 13.17 4 9.27l5.53-1.11L12 3z" />
    </svg>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M5 12.75h11.19l-3.72 3.72a.75.75 0 1 0 1.06 1.06l5.25-5.25a.75.75 0 0 0 0-1.06L13.53 5.97a.75.75 0 1 0-1.06 1.06l3.72 3.72H5a.75.75 0 0 0 0 1.5z" />
    </svg>
  );
}
