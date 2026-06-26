"use client";

import * as React from "react";
import InsightCard from "./InsightCard";
import { Stagger, StaggerItem } from "@/components/motion";
import type { InsightMeta } from "@/types/insights";

type SortKey = "new" | "popular" | "az";

type Props = {
  items: InsightMeta[];
  isLoading?: boolean;
  pageSize?: number;
  defaultView?: "grid" | "list";
  sort?: SortKey;

  /** Next 15 client prop rule: callbacks must be named *Action */
  onSortChangeAction?: (s: SortKey) => void;
  showToolbar?: boolean;
  onResetFiltersAction?: () => void;
};

export default function InsightsList({
  items,
  isLoading = false,
  pageSize = 9,
  defaultView = "grid",
  sort = "new",
  onSortChangeAction,
  showToolbar = true,
  onResetFiltersAction,
}: Props) {
  const [view, setView] = React.useState<"grid" | "list">(defaultView);
  const [page, setPage] = React.useState(1);

  const total = items?.length ?? 0;
  const visible = Math.min(page * pageSize, total);
  const endRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!endRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPage((p) => (p * pageSize < total ? p + 1 : p));
        }
      },
      { rootMargin: "360px 0px" },
    );
    io.observe(endRef.current);
    return () => io.disconnect();
  }, [pageSize, total]);

  if (!isLoading && (!items || items.length === 0)) {
    return <EmptyState onResetFiltersAction={onResetFiltersAction} />;
  }

  const liveMsg = `${visible} of ${total} insights`;

  return (
    <section aria-label="Insights">
      <h2 className="sr-only">Insights results</h2>
      {showToolbar && (
        <Toolbar
          countText={liveMsg}
          view={view}
          onViewChange={setView}
          sort={sort}
          onSortChangeAction={onSortChangeAction}
        />
      )}

      {view === "grid" ? (
        <Stagger
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          amount={0.05}
        >
          {isLoading
            ? Array.from({ length: pageSize }).map((_, i) => (
                <StaggerItem key={i} className="h-full">
                  <SkeletonCard />
                </StaggerItem>
              ))
            : items.slice(0, visible).map((it, i) => (
                <StaggerItem key={it.url} className="h-full">
                  <InsightCard item={it} priority={i < 3} />
                </StaggerItem>
              ))}
        </Stagger>
      ) : (
        <div className="divide-y divide-gold/10 rounded-2xl ring-1 ring-gold/10 overflow-hidden bg-white">
          {isLoading
            ? Array.from({ length: pageSize }).map((_, i) => <SkeletonRow key={i} />)
            : items.slice(0, visible).map((it) => <Row key={it.url} item={it} />)}
        </div>
      )}

      {!isLoading && visible < total && (
        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="inline-flex items-center gap-2 rounded-lg border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
            aria-label="Load more insights"
          >
            <ArrowDown className="h-4 w-4" /> Load more
          </button>
        </div>
      )}

      <div ref={endRef} aria-hidden className="h-1" />
      <p className="sr-only" aria-live="polite">
        {liveMsg}
      </p>
    </section>
  );
}

/* ───────── Toolbar ───────── */

function Toolbar({
  countText,
  view,
  onViewChange,
  sort,
  onSortChangeAction,
}: {
  countText: string;
  view: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;
  sort?: SortKey;
  onSortChangeAction?: (s: SortKey) => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-gold/45 bg-white/60 px-3 py-2">
      <span className="text-sm text-ink/55">{countText}</span>

      <div className="ml-auto flex items-center gap-2">
        {onSortChangeAction && (
          <label className="inline-flex items-center gap-2 text-sm text-ink/60">
            <span className="whitespace-nowrap">Sort</span>
            <select
              value={sort}
              onChange={(e) => onSortChangeAction(e.target.value as SortKey)}
              className="rounded-md border border-gold/45 bg-white px-2.5 py-1 text-sm text-ink focus:border-gold focus:outline-none"
              aria-label="Sort insights"
            >
              <option value="new">Newest</option>
              <option value="popular">Most popular</option>
              <option value="az">A–Z</option>
            </select>
          </label>
        )}

        <div className="inline-flex overflow-hidden rounded-md ring-1 ring-gold/15">
          <button
            className={`px-2.5 py-1.5 text-sm ${
              view === "grid"
                ? "bg-gold text-midnight"
                : "bg-white text-ink/60 hover:text-ink"
            }`}
            aria-pressed={view === "grid"}
            onClick={() => onViewChange("grid")}
            title="Grid view"
          >
            <GridIcon className="h-4 w-4" />
          </button>
          <button
            className={`px-2.5 py-1.5 text-sm ${
              view === "list"
                ? "bg-gold text-midnight"
                : "bg-white text-ink/60 hover:text-ink"
            }`}
            aria-pressed={view === "list"}
            onClick={() => onViewChange("list")}
            title="List view"
          >
            <ListIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── List Row (image left; badge = type; whole row is a link) ───────── */
function Row({ item }: { item: InsightMeta }) {
  const any = item as any;
  const cover = getCover(any);
  const type = getTypeBadge(any); // always returns a type (defaults to "article")
  const readStr = getReadTime(any);

  return (
    <a
      href={item.url}
      className="
        group grid grid-cols-[112px_minmax(0,1fr)] gap-3 p-3 transition-colors
        hover:bg-sand/40 focus:bg-sand/40
        outline-none
      "
      aria-label={item.title}
    >
      {/* thumbnail */}
      <div className="relative h-24 w-[112px] overflow-hidden rounded-md ring-1 ring-gold/10 bg-sand">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ink to-midnight" />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
      </div>

      {/* content */}
      <div className="min-w-0">
        <div className="flex items-start gap-2">
          <span
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/45 bg-sand/50 px-2 py-0.5 text-[11px] text-gold"
            aria-label={`Content type: ${type}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
            {type}
          </span>

          <h3 className="font-sora text-[15px] font-semibold leading-5 text-ink line-clamp-2">
            {item.title}
          </h3>
        </div>

        {(any.excerpt || any.summary) && (
          <p className="mt-1 text-[13px] leading-5 text-ink/55 line-clamp-2">
            {any.excerpt ?? any.summary}
          </p>
        )}

        <p className="mt-1 text-[11px] text-ink/40">
          {readStr ? `${readStr} · ` : ""}
          {any.date ?? ""}
        </p>
      </div>
    </a>
  );
}

/* ───────── Empty & Skeletons ───────── */

function EmptyState({
  onResetFiltersAction,
}: {
  onResetFiltersAction?: () => void;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-dashed border-gold/45 p-10 text-center"
    >
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/45 bg-gold/10 text-gold">
        <SearchIcon className="h-5 w-5" />
      </div>
      <p className="text-sm text-ink/70">No results</p>
      <p className="mt-1 text-xs text-ink/40">
        Try different keywords or adjust filters.
      </p>
      {onResetFiltersAction && (
        <button
          onClick={onResetFiltersAction}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gold/45 px-3 py-1.5 text-sm text-ink/70 transition-colors hover:border-gold/65 hover:text-ink"
        >
          <RotateIcon className="h-4 w-4" /> Clear filters
        </button>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gold/45 bg-white p-4">
      <div className="h-36 rounded-xl bg-pearl/10" />
      <div className="mt-3 h-4 w-3/4 rounded bg-pearl/10" />
      <div className="mt-2 h-3 w-5/6 rounded bg-pearl/5" />
      <div className="mt-2 h-3 w-2/3 rounded bg-pearl/5" />
    </div>
  );
}
function SkeletonRow() {
  return (
    <div className="grid grid-cols-[112px_minmax(0,1fr)] gap-3 p-3 animate-pulse">
      <div className="h-24 w-[112px] rounded-md bg-pearl/10" />
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-pearl/10" />
        <div className="h-3 w-5/6 rounded bg-pearl/5" />
        <div className="h-3 w-2/3 rounded bg-pearl/5" />
      </div>
    </div>
  );
}

/* ───────── Helpers ───────── */

function getCover(any: any): string | undefined {
  return (
    any?.cover ??
    any?.image ??
    any?.thumbnail ??
    any?.thumb ??
    any?.banner ??
    any?.hero ??
    any?.ogImage ??
    any?.og_image ??
    any?.featuredImage ??
    any?.featured_image ??
    undefined
  );
}

/** Returns normalized type label. Defaults to "article" so badge always shows. */
function getTypeBadge(any: any): "news" | "blog" | "media" | "article" {
  const raw: string | undefined =
    any?.type ??
    any?.kind ??
    any?.format ??
    any?.contentType ??
    any?.content_type ??
    any?.category;
  const pick = (raw ?? "").toString().toLowerCase();

  if (["news"].includes(pick)) return "news";
  if (["blog", "post"].includes(pick)) return "blog";
  if (["media", "press", "press-release", "press_release"].includes(pick))
    return "media";
  if (["article", "insight", "guide"].includes(pick)) return "article";

  const tags: string[] = Array.isArray(any?.tags)
    ? any.tags.map((t: any) => String(t).toLowerCase())
    : [];
  if (tags.includes("news")) return "news";
  if (tags.includes("blog")) return "blog";
  if (tags.includes("media") || tags.includes("press")) return "media";
  if (
    tags.includes("article") ||
    tags.includes("insight") ||
    tags.includes("guide")
  )
    return "article";

  return "article"; // default – ensures badge renders
}

function getReadTime(item: InsightMeta): string | undefined {
  const any = item as any;
  if (typeof any.readTime === "string") return any.readTime;
  if (typeof any.readTime === "number") return `${any.readTime} min`;
  if (typeof any.readMinutes === "number") return `${any.readMinutes} min`;
  if (typeof any.minutes === "number") return `${any.minutes} min`;
  if (typeof any.wordCount === "number") {
    const mins = Math.max(1, Math.ceil(any.wordCount / 220));
    return `${mins} min`;
  }
  return undefined;
}

/* ───────── Icons ───────── */

function GridIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 0h6v6h-6v-6z" />
    </svg>
  );
}
function ListIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z" />
    </svg>
  );
}
function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path d="M10 3a1 1 0 0 1 1 1v8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4A1 1 0 0 1 6.293 10.3L8.586 12.6V4a1 1 0 0 1 1-1z" />
    </svg>
  );
}
function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M10 2a8 8 0 1 0 5.293 14.293l4.707 4.707a1 1 0 0 0 1.414-1.414l-4.707-4.707A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12A6 6 0 0 1 10 4z" />
    </svg>
  );
}
function RotateIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path d="M10 2a8 8 0 0 1 7.937 7H16l3.5 3.5L23 9h-2.063A8.001 8.001 0 1 1 2 10a1 1 0 1 0 2 0 6 6 0 1 0 6 6 1 1 0 1 0 0-2 4 4 0 1 1 0-8 1 1 0 1 0 0-2z" />
    </svg>
  );
}
