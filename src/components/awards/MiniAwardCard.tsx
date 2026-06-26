"use client";

import React from "react";
import type { Award } from "./awards.data";

export function MiniAwardCard({ award }: { award: Award }) {
  return (
    <div
      className="group relative h-[176px] w-[240px] overflow-hidden rounded-2xl border border-gold/45 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/65 md:h-[184px] md:w-[260px]"
      aria-label={`${award.tag} — ${award.year}`}
    >
      <div className="relative flex h-full flex-col">
        <span aria-hidden className="pointer-events-none absolute -right-8 -bottom-8 h-20 w-20 rounded-full bg-gold/10 blur-2xl" />

        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase">
          <span className="truncate rounded-full border border-gold/45 bg-sand/50 px-2 py-0.5 text-gold">{award.tag}</span>
        </div>

        <h3 className="mt-2 line-clamp-2 font-sora text-[13.5px] font-semibold leading-snug text-ink">
          {award.title}
        </h3>

        <p className="mt-1 truncate text-[12px] text-ink/55">
          {award.issuer}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="rounded-full border border-gold/45 bg-sand/50 px-2.5 py-0.5 text-[12px] font-semibold text-gold">
            {award.year}
          </span>
          <span className="text-[11px] uppercase tracking-[0.12em] text-ink/40">
            Recognized
          </span>
        </div>

        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>
    </div>
  );
}
