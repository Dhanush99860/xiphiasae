// src/components/Insights/InsightCard.tsx
"use client";

import Link from "next/link";
import { ImageReveal } from "@/components/motion";
import type { InsightMeta } from "@/types/insights";

/** Format date in UTC for consistent display (e.g., 16 Sep 2025) */
function formatDateUTC(input?: string) {
  if (!input) return null;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

/* ───────── field pickers (support multiple keys from MDX) ───────── */
function pickImage(a: any): string | null {
  return (
    a?.hero ??
    a?.heroImage ??
    a?.cover ??
    a?.image ??
    a?.thumbnail ??
    a?.banner ??
    a?.ogImage ??
    a?.og_image ??
    a?.featuredImage ??
    a?.featured_image ??
    null
  );
}
function pickSummary(a: any): string | null {
  return a?.summary ?? a?.excerpt ?? a?.description ?? null;
}

/* ───────── kind UI — Midnight Embassy: gold pill, one accent ───────── */
type KindKey = NonNullable<InsightMeta["kind"]> | "default";

const KIND_LABEL: Record<KindKey, string> = {
  articles: "Article",
  blog: "Blog",
  news: "News",
  media: "Media",
  default: "Insight",
};

export default function InsightCard({
  item,
  showKindBadge = true,
  priority = false,
}: {
  item: InsightMeta;
  showKindBadge?: boolean;
  priority?: boolean;
}) {
  const displayDate = formatDateUTC(item.updated || item.date);
  const author =
    (typeof (item as any).author === "string"
      ? (item as any).author
      : (item as any).author?.name) || "";

  const label = KIND_LABEL[item.kind as KindKey] ?? KIND_LABEL.default;

  // tolerate multiple front-matter keys
  const img = pickImage(item);
  const desc = pickSummary(item);

  return (
    <Link
      href={item.url}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-gold/45 transition-all duration-300 hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_30px_70px_-30px_rgba(15,23,42,0.22)] motion-reduce:transform-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
    >
      <article className="flex h-full flex-col">
        {/* Media (fixed aspect, cinematic masked reveal) */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand">
          {img ? (
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transform-none">
              <ImageReveal
                src={img}
                alt={item.heroAlt || item.title}
                ratio="aspect-[16/9]"
                priority={priority}
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="h-full w-full rounded-none"
              />
            </div>
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-sand to-white">
              <span className="text-xs text-ink/40">{label}</span>
            </div>
          )}

          {/* legibility veil + gold hairline at the base */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-white/85 via-transparent to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          />

          {showKindBadge && (
            <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-gold/45 bg-sand/70 px-2.5 py-0.5 text-[11px] font-semibold text-gold backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              {label}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col px-4 sm:px-5 py-4">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-ink/40">
            {displayDate && (
              <time
                dateTime={(item.updated || item.date)!}
                className="whitespace-nowrap"
              >
                {displayDate}
              </time>
            )}
            {author && (
              <>
                <span aria-hidden className="text-ink/50">
                  •
                </span>
                <span className="truncate">{author}</span>
              </>
            )}
            {typeof item.readingTimeMins === "number" && (
              <>
                <span aria-hidden className="text-ink/50">
                  •
                </span>
                <span className="whitespace-nowrap">
                  {item.readingTimeMins} min read
                </span>
              </>
            )}
          </div>

          {/* Title + summary */}
          <h3 className="mt-3 line-clamp-2 font-sora text-[18px] font-semibold leading-6 tracking-tight text-ink">
            {item.title}
          </h3>
          {desc && (
            <p className="mt-2 line-clamp-2 text-[14px] leading-5 text-ink/55">
              {desc}
            </p>
          )}

          {/* Read affordance pinned to bottom for even card heights */}
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-gold/80 transition-colors group-hover:text-gold">
            Read
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </div>
      </article>
    </Link>
  );
}
