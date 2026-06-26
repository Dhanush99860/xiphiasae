"use client";

import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";

import { countryImage } from "@/components/Countries/country-image";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

export type CompareColumn = {
  id: string;
  title: string;
  subtitle?: string;
  href?: string;
  /** Country slug used to resolve a real full-bleed image for the column header. */
  imageSlug?: string;
  onRemove?: () => void;
};

export type CompareRow = {
  key: string;
  label: string;
  hint?: string;
  /** One cell per column, in column order. */
  cells: ReactNode[];
  /** Visually emphasise this row (e.g. the headline cost row). */
  emphasize?: boolean;
};

/**
 * Reusable comparison grid — navy/gold luxury idiom. Presentational only:
 * callers supply columns + aligned cells. Sticky metric column, horizontal
 * scroll on mobile, real full-bleed country image per programme column so the
 * header reads as a visual card rather than plain text.
 */
export function ComparisonTable({ columns, rows }: { columns: CompareColumn[]; rows: CompareRow[] }) {
  const cols = columns.length;
  const template = `minmax(150px,180px) repeat(${cols}, minmax(210px,1fr))`;
  const hair = "rgba(191,161,92,0.22)";

  return (
    <div
      className="overflow-x-auto rounded-2xl border"
      style={{ borderColor: "rgba(191,161,92,0.35)", background: "rgba(255,255,255,0.04)" }}
    >
      <div role="table" className="min-w-[680px]" style={{ display: "grid", gridTemplateColumns: template }}>
        {/* Header row */}
        <div
          role="columnheader"
          className="sticky left-0 z-10 border-b p-4"
          style={{ borderColor: hair, background: NAVY }}
        />
        {columns.map((c) => (
          <div
            key={c.id}
            role="columnheader"
            className="relative overflow-hidden border-b border-l p-0"
            style={{ borderColor: hair }}
          >
            {/* Real full-bleed country image */}
            <div className="relative h-24 w-full overflow-hidden">
              <Image
                src={countryImage(c.imageSlug ?? "", c.subtitle)}
                alt={`${c.subtitle ?? ""} — ${c.title}`}
                fill
                sizes="(min-width:1024px) 25vw, 50vw"
                className="object-cover [filter:brightness(0.72)_contrast(1.05)]"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.94) 6%, rgba(8,18,42,0.35) 70%, rgba(8,18,42,0.12) 100%)" }}
              />
              {c.onRemove ? (
                <button
                  type="button"
                  onClick={c.onRemove}
                  aria-label={`Remove ${c.title}`}
                  className="absolute right-2 top-2 grid size-7 place-items-center rounded-full transition hover:bg-black/30"
                  style={{ background: "rgba(10,23,51,0.6)", color: GOLD }}
                >
                  <X className="size-3.5" />
                </button>
              ) : null}
            </div>
            <div className="p-4">
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-[#eef3fb]">{c.title}</p>
                {c.subtitle ? (
                  <p className="mt-0.5 truncate text-[12px] uppercase tracking-[0.14em] text-white/55">{c.subtitle}</p>
                ) : null}
              </div>
              {c.href ? (
                <Link
                  href={c.href}
                  className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold transition hover:opacity-80"
                  style={{ color: GOLD }}
                >
                  Programme page <ArrowUpRight className="size-3.5" />
                </Link>
              ) : null}
            </div>
          </div>
        ))}

        {/* Metric rows */}
        {rows.map((row) => (
          <Fragment key={row.key}>
            <div
              role="rowheader"
              className="sticky left-0 z-10 border-b p-4"
              style={{
                borderColor: hair,
                background: row.emphasize ? "rgba(191,161,92,0.12)" : NAVY,
              }}
            >
              <p className="text-[11px] font-bold uppercase tracking-wide text-white/55">{row.label}</p>
              {row.hint ? <p className="mt-0.5 text-[11.5px] leading-snug text-white/40">{row.hint}</p> : null}
            </div>
            {row.cells.map((cell, i) => (
              <div
                key={`${row.key}-${columns[i]?.id ?? i}`}
                role="cell"
                className="border-b border-l p-4 text-[14px] text-white/85"
                style={{
                  borderColor: hair,
                  background: row.emphasize ? "rgba(191,161,92,0.06)" : "transparent",
                }}
              >
                {cell}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
