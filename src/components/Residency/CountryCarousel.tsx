"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useMemo, useRef, useState, useEffect } from "react";

// ---- Accept ALL verticals + the old "items" prop ----
import type { CountryMeta as ResidencyCountry } from "@/lib/residency-content";
import type { CountryMeta as CitizenshipCountry } from "@/lib/citizenship-content";
import type { CountryMeta as SkilledCountry } from "@/lib/skilled-content";
import type { CountryMeta as CorporateCountry } from "@/lib/corporate-content";

type AnyCountry =
  | ResidencyCountry
  | CitizenshipCountry
  | SkilledCountry
  | CorporateCountry;

type OldItem = {
  country: string;
  countrySlug: string;
  heroImage?: string;
  summary?: string;
  introPoints?: string[];
  region?: string;
};

// ---- helpers ----
function baseFromCategory(cat?: AnyCountry["category"]) {
  switch (cat) {
    case "citizenship":
      return "/citizenship";
    case "skilled":
      return "/skilled";
    case "corporate":
      return "/corporate";
    case "residency":
    default:
      return "/residency";
  }
}
function nounFromCategory(cat?: AnyCountry["category"]) {
  switch (cat) {
    case "citizenship":
      return "Citizenship";
    case "skilled":
      return "Skilled";
    case "corporate":
      return "Residency";
    case "residency":
    default:
      return "Residency";
  }
}
function truncateWords(text = "", maxWords = 15) {
  const words = (text || "").trim().split(/\s+/);
  return words.length <= maxWords
    ? (text || "").trim()
    : words.slice(0, maxWords).join(" ") + "…";
}
function normalizeImageSrc(src?: string, fallback = "/xiphias-immigration.png") {
  const val = (src && src.trim()) || fallback;
  if (/^https?:\/\//i.test(val) || val.startsWith("/")) return val;
  return `/${val.replace(/^\/+/, "")}`;
}
function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

/* ==============================
   Global theme vars (black/white)
   ============================== */
const ThemeVars = () => (
  <style jsx global>{`
    :root {
      /* Midnight Embassy — dark ground, ONE gold accent */
      --c-bg: transparent;
      --c-text: #f4f0e6; /* pearl */
      --c-card: #0a0e1a; /* ink */
      --c-border: rgba(244, 240, 230, 0.1); /* pearl/10 */
      --c-primary: #d4af37; /* gold */
      --c-secondary: #d4af37; /* gold (focus ring) */
      --c-invert: #050810; /* midnight */
      --c-input-bg: rgba(5, 8, 16, 0.6); /* midnight/60 */
    }
  `}</style>
);

/* =========================================================
   FeatureList — separated so hooks are at the top (no errors)
   Layout: Left 60% (hero + 2 small) | Right 40% (7 rows)
   ========================================================= */
function FeatureList({
  list,
  derivedBase,
  title,
  description,
  ctaText,
  viewAllHref,
  rightInitialDesktop = 7,
  rightInitialMobile = 2,
  showSearch = true,
  showRegionFilter = false,
  seoItemListJsonLd = false,
}: {
  list: (AnyCountry | OldItem)[];
  derivedBase: string;
  title: string;
  description: string;
  ctaText: string;
  viewAllHref: string;
  rightInitialDesktop?: number;
  rightInitialMobile?: number;
  showSearch?: boolean;
  showRegionFilter?: boolean;
  seoItemListJsonLd?: boolean;
}) {
  const [first, second, third, ...restAll] = list;

  // hero unify
  const isNew = first && "category" in (first as any);
  const country = (first as any)?.country || (first as any)?.title || "Country";
  const countrySlug = (first as any)?.countrySlug || "country";
  const heroImage =
    (first as any)?.heroImage || `/images/countries/${countrySlug}-hero-poster.jpg`;
  const summary = (first as any)?.summary;
  const introPoints = ((first as any)?.introPoints || []).slice(0, 3) as string[];
  const base = isNew ? baseFromCategory((first as any).category) : derivedBase;
  const href = `${base}/${countrySlug}`;
  const ctaNoun = isNew ? nounFromCategory((first as any).category) : "Residency";

  // RIGHT: query + region + responsive counts
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const clearQuery = () => {
    setQuery("");
    searchRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const [rightVisible, setRightVisible] = useState<number>(rightInitialDesktop);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () =>
      setRightVisible(mq.matches ? rightInitialDesktop : rightInitialMobile);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [rightInitialDesktop, rightInitialMobile]);

  const allRegions = useMemo(
    () =>
      ["All"].concat(
        uniq(
          restAll
            .map((r: any) => (r?.region || "").trim())
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b)),
        ),
      ),
    [restAll],
  );
  const [region, setRegion] = useState<string>(allRegions[0] || "All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return restAll.filter((raw: any) => {
      const name = (raw?.country || raw?.title || "").toLowerCase();
      const slug = (raw?.countrySlug || "").toLowerCase();
      const reg = (raw?.region || "All").toLowerCase();
      const passRegion = !showRegionFilter || region === "All" || reg === region.toLowerCase();
      const passText = !q || name.includes(q) || slug.includes(q);
      return passRegion && passText;
    });
  }, [restAll, query, region, showRegionFilter]);

  // exact rows rendered on right (no inner scroll)
  const rightItems = filtered.slice(0, Math.max(0, rightVisible));

  // small-card on left column
  function SmallCard({ raw }: { raw: any }) {
    const isN = "category" in (raw as any);
    const ctry = raw?.country || raw?.title || "Country";
    const slug = raw?.countrySlug || "country";
    const img = raw?.heroImage || `/images/countries/${slug}-hero-poster.jpg`;
    const sum = raw?.summary;
    const base2 = isN ? baseFromCategory(raw.category) : derivedBase;
    const href2 = `${base2}/${slug}`;
    const noun = isN ? nounFromCategory(raw.category) : "Residency";

    return (
      <article className="group flex h-full overflow-hidden rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/65 motion-reduce:transform-none">
        <Link href={href2} className="relative block w-1/3 min-h-[120px] overflow-hidden rounded-l-2xl bg-sand">
          <Image
            src={normalizeImageSrc(img, `/images/${slug}.jpg`)}
            alt={`${ctry} image`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 40vw, 33vw"
            loading="lazy"
            unoptimized
          />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 end-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
        </Link>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-sora text-base font-semibold leading-tight text-ink">
            <Link href={href2} className="rounded hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold">
              {ctry}
            </Link>
          </h3>
          <p className="mt-1 text-sm leading-6 text-ink/55 line-clamp-2">
            {truncateWords(sum || `${noun} pathways in ${ctry}.`, 22)}
          </p>
          <div className="mt-auto pt-3 border-t border-gold/45">
            <Link href={href2} className="group/cta inline-flex items-center text-sm font-bold tracking-wide text-gold">
              <span>Explore</span>
              <span className="ml-1 inline-block transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // right-side row
  function HRow({ raw, i }: { raw: any; i: number }) {
    const isN = "category" in (raw as any);
    const ctry = raw?.country || raw?.title || "Country";
    const slug = raw?.countrySlug || "country";
    const img = raw?.heroImage || `/images/countries/${slug}-hero-poster.jpg`;
    const sum = raw?.summary;
    const base2 = isN ? baseFromCategory(raw.category) : derivedBase;
    const href2 = `${base2}/${slug}`;
    const noun = isN ? nounFromCategory(raw.category) : "Residency";
    return (
      <li key={`${slug}-${i}`}>
        <Link
          href={href2}
          className="group flex items-center gap-3 rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-3 transition-all duration-300 hover:border-gold/65"
        >
          <div className="relative w-20 h-14 rounded-md overflow-hidden flex-none bg-sand">
            <Image
              src={normalizeImageSrc(img, `/images/${slug}.jpg`)}
              alt={`${ctry} image`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="80px"
              loading="lazy"
              unoptimized
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-sora text-sm font-semibold truncate text-ink">{ctry}</h3>
              <span className="text-base text-gold opacity-0 transition group-hover:opacity-100">→</span>
            </div>
            <p className="mt-0.5 text-xs leading-5 text-ink/55 line-clamp-2">
              {truncateWords(sum || `${noun} pathways in ${ctry}.`, 18)}
            </p>
          </div>
        </Link>
      </li>
    );
  }

  // SEO
  const jsonLd =
    seoItemListJsonLd &&
    (() => {
      const visibleLinks = rightItems.map((r: any) => {
        const base2 = "category" in r ? baseFromCategory(r.category) : derivedBase;
        return { name: r.country || r.title || "Country", url: `${base2}/${r.countrySlug || "country"}` };
      });
      return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [{ name: country, url: href }, ...visibleLinks].map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          url: it.url,
        })),
      };
    })();

  return (
    <div className="py-8 lg:max-w-screen-2xl bg-[var(--c-bg)] text-[var(--c-text)]">
      {/* Header */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-4 sm:p-5 md:p-6">
        {/* soft background accents (clipped inside) — gold underglow */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-24 h-56 w-56 rounded-full bg-gold/[0.07] blur-3xl" />
          <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-gold/[0.05] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04] text-gold [mask-image:radial-gradient(70%_70%_at_10%_10%,black,transparent_75%)]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:22px_22px]" />
          </div>
          {/* top gold hairline */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>

        {/* content */}
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-sora text-2xl md:text-3xl font-semibold tracking-tight text-ink break-words">
              {title}
            </h2>
            <p className="mt-2 text-base md:text-lg leading-relaxed text-ink/55 break-words">
              {description}
            </p>
          </div>

          {/* Desktop header CTA (right-aligned) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 rounded-xl border border-gold/40 bg-sand/50 px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-midnight focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {ctaText} ({list.length}) <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Left 60% | Right 40% */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        {/* LEFT (hero + 2 small) */}
        <div className="md:col-span-3">
          <article className="group mb-6 overflow-hidden rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] transition-all duration-300 hover:border-gold/65">
            <Link href={href} aria-label={`${country} ${ctaNoun}`}>
              <div className="relative h-64 sm:h-72 lg:h-[420px] bg-sand">
                <Image
                  src={normalizeImageSrc(heroImage, `/images/${countrySlug}.jpg`)}
                  alt={`${country} image`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 66vw"
                  priority
                />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              </div>
            </Link>

            <div className="px-5 py-4">
              <h2 className="font-sora text-xl font-semibold leading-tight text-ink">
                <Link href={href} className="rounded hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold">
                  {country}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-7 text-ink/55">
                {truncateWords(summary || `${ctaNoun} pathways in ${country}.`, 36)}
              </p>

              {!!introPoints.length && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {introPoints.map((t, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-gold/45 bg-sand/50 px-3 py-1 text-xs font-medium text-ink/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Mobile CTA */}
              <div className="md:hidden mt-4">
                <Link
                  href={viewAllHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gold/40 bg-sand/50 px-4 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-midnight"
                >
                  {ctaText} ({list.length}) <span>→</span>
                </Link>
              </div>

              <div className="mt-3 border-t border-gold/45 pt-4">
                <Link href={href} className="group/cta inline-flex items-center text-base font-bold tracking-wide text-gold">
                  <span>Explore {country} {ctaNoun}</span>
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </article>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {second && <SmallCard raw={second} />}
            {third && <SmallCard raw={third} />}
          </div>
        </div>

        {/* RIGHT (search + rows) */}
        <aside className="md:col-span-2">
          <div
            role="search"
            aria-label="Country filters"
            className="mb-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-3"
          >
            <div className="grid grid-cols-1 gap-3">
              {showSearch && (
                <div>
                  <label className="sr-only" htmlFor="country-search">Search countries</label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                      <Search className="h-4 w-4 opacity-70" aria-hidden />
                    </span>

                    <input
                      ref={searchRef}
                      id="country-search"
                      aria-describedby="country-search-hint"
                      placeholder="Search countries by name…"
                      className="w-full rounded-xl border border-gold/45 bg-sand/60 pl-9 pr-9 py-2 text-sm text-ink placeholder:text-ink/40 outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape" && query) clearQuery();
                      }}
                      inputMode="search"
                    />

                    {query && (
                      <button
                        type="button"
                        onClick={clearQuery}
                        aria-label="Clear search"
                        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-gold/45 bg-sand/60 text-ink/70 transition-colors hover:border-gold/65 hover:text-gold"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="mt-1 flex items-center justify-between">
                    <p id="country-search-hint" className="text-[11px] tracking-wide text-ink/50">
                      Tip: type a few letters (e.g., “gre” for Grenada).
                    </p>
                    <div aria-hidden className="hidden sm:flex items-center gap-1 text-[11px] text-ink/55">
                      <span className="rounded-md border border-gold/45 px-1.5 py-[2px]">Ctrl</span>
                      <span>+</span>
                      <span className="rounded-md border border-gold/45 px-1.5 py-[2px]">K</span>
                      <span className="ml-1">to focus</span>
                    </div>
                  </div>
                </div>
              )}

              {showRegionFilter && allRegions.length > 1 && (
                <div className="flex items-center gap-2">
                  <label className="sr-only" htmlFor="country-region">Filter by region</label>
                  <select
                    id="country-region"
                    className="w-full rounded-xl border border-gold/45 bg-sand/60 px-3 py-2 text-sm text-ink outline-none focus:border-gold focus:ring-1 focus:ring-gold [&>option]:bg-white [&>option]:text-ink"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    {allRegions.map((r) => (
                      <option key={r} value={r}>
                        {r === "All" ? "All regions" : r}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {rightItems.length === 0 ? (
            <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-6 text-sm text-ink/70">
              No countries match your search.
            </div>
          ) : (
            <ul className="space-y-3">
              {rightItems.map((raw, i) => (
                <HRow key={`${(raw as any)?.countrySlug || "country"}-${i}`} raw={raw} i={i} />
              ))}
            </ul>
          )}

          {/* Mobile view-all at bottom */}
          <div className="mt-4 md:hidden">
            <Link
              href={viewAllHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gold/40 bg-sand/50 px-4 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-midnight"
            >
              {ctaText} ({list.length}) <span>→</span>
            </Link>
          </div>
        </aside>
      </div>

      {seoItemListJsonLd && jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </div>
  );
}

/* ===========================
   Main exported component
   =========================== */
export default function CountryCarousel({
  countries,
  items,
  title = "Residency by Country",
  description = "Discover trusted residency pathways across popular countries.",
  ctaText = "View all countries",
  ctaHref,
  variant = "standard",
  layout = "carousel",
  showSearch = true,
  showRegionFilter = false,
  rightInitialDesktop = 7,
  rightInitialMobile = 2,
  seoItemListJsonLd = false,
}: {
  countries?: (AnyCountry | null | undefined)[];
  items?: OldItem[];
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  variant?: "compact" | "standard" | "plush";
  layout?: "carousel" | "featureList";
  showSearch?: boolean;
  showRegionFilter?: boolean;
  rightInitialDesktop?: number;
  rightInitialMobile?: number;
  seoItemListJsonLd?: boolean;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  const list =
    ((countries && countries.filter(Boolean)) ||
      (items && items.filter(Boolean)) ||
      []) as (AnyCountry | OldItem)[];

  if (!list.length) {
    return (
      <>
        <ThemeVars />
      </>
    );
  }

  const derivedBase =
    "category" in (list[0] as any)
      ? baseFromCategory((list[0] as any).category)
      : "/residency";
  const viewAllHref = ctaHref || derivedBase;

  // preset sizes per variant (image height only) for carousel
  const imgHeight =
    variant === "compact"
      ? "h-40 sm:h-44"
      : variant === "plush"
        ? "h-56 sm:h-60"
        : "h-48 sm:h-52";

  const scrollOne = (dir: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("div[data-card]") as HTMLElement | null;
    if (!card) return;
    const unit = card.getBoundingClientRect().width + 24; // 24px gap
    rail.scrollBy({ left: dir * unit, behavior: "smooth" });
  };

  // Render feature list or carousel
  if (layout === "featureList") {
    return (
      <>
        <ThemeVars />
        <FeatureList
          list={list}
          derivedBase={derivedBase}
          title={title}
          description={description}
          ctaText={ctaText}
          viewAllHref={viewAllHref}
          rightInitialDesktop={rightInitialDesktop}
          rightInitialMobile={rightInitialMobile}
          showSearch={showSearch}
          showRegionFilter={showRegionFilter}
          seoItemListJsonLd={seoItemListJsonLd}
        />
      </>
    );
  }

  // ====== Carousel (unchanged) ======
  return (
    <section className="py-8 container lg:max-w-screen-2xl bg-[var(--c-bg)] text-ink">
      <ThemeVars />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <h2 className="mb-4 font-sora text-2xl md:text-3xl font-semibold tracking-tight text-ink">{title}</h2>
          <p className="mb-6 text-base md:text-lg leading-relaxed text-ink/55">{description}</p>
          <Link
            href={ctaHref || derivedBase}
            className="inline-block rounded-xl border border-gold/40 bg-sand/50 px-6 py-2.5 text-sm md:text-base font-semibold text-gold transition-colors hover:bg-gold hover:text-midnight"
          >
            {ctaText}
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => scrollOne(-1)}
            aria-label="Scroll countries left"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/45 bg-white text-ink transition-colors hover:border-gold/65 hover:text-gold"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => scrollOne(1)}
            aria-label="Scroll countries right"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/45 bg-white text-ink transition-colors hover:border-gold/65 hover:text-gold"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="flex flex-nowrap items-stretch gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pe-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {list.map((raw, idx) => {
          const isNew = "category" in (raw as any);
          const country = (raw as any).country || (raw as any).title || "Country";
          const countrySlug = (raw as any).countrySlug || "country";
          const heroImage =
            (raw as any).heroImage || `/images/countries/${countrySlug}-hero-poster.jpg`;
          const summary = (raw as any).summary;
          const introPoints = (raw as any).introPoints || [];
          const base = isNew ? baseFromCategory((raw as any).category) : derivedBase;
          const href = `${base}/${countrySlug}`;
          const chips = (introPoints as string[]).slice(0, 2);
          const ctaNoun = isNew ? nounFromCategory((raw as any).category) : "Residency";

          return (
            <div key={`${countrySlug}-${idx}`} data-card className="flex-none snap-start basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/65 motion-reduce:transform-none">
                <Link href={href} aria-label={`${country} ${ctaNoun}`}>
                  <div className={`relative ${imgHeight} overflow-hidden bg-sand`}>
                    <Image
                      src={normalizeImageSrc(heroImage, `/images/${countrySlug}.jpg`)}
                      alt={`${country} image`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      loading={idx === 0 ? "eager" : "lazy"}
                      unoptimized
                    />
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                  </div>
                </Link>

                <div className="flex flex-1 flex-col px-4 py-3">
                  <h3 className="font-sora text-base sm:text-lg font-semibold leading-tight text-ink">
                    <Link href={href} className="rounded hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold">
                      {country}
                    </Link>
                  </h3>

                  <p className="mt-1 min-h-[44px] text-sm leading-6 text-ink/55 line-clamp-2">
                    {truncateWords(summary || `${ctaNoun} pathways in ${country}.`, 20)}
                  </p>

                  <div className="mt-2 min-h-[28px]">
                    {!!chips.length && (
                      <div className="flex flex-wrap gap-2">
                        {chips.map((t, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-gold/45 bg-sand/50 px-3 py-1 text-xs font-medium text-ink/70">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-auto w-full border-t border-gold/45 pt-4">
                    <Link href={href} className="group/cta flex w-full items-center text-base font-bold tracking-wide text-gold">
                      <span>Explore {country} {ctaNoun}</span>
                      <span className="ml-2 inline-block transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
        <div className="flex-none w-1" />
      </div>
    </section>
  );
}
