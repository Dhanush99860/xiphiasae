// src/components/Residency/CountryCard.tsx
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { formatTimelineShort } from "@/lib/timeline";

// --- accept all verticals without changing UI ---
import type { CountryMeta as ResidencyCountry } from "@/lib/residency-content";
import type { CountryMeta as CitizenshipCountry } from "@/lib/citizenship-content";
import type { CountryMeta as SkilledCountry } from "@/lib/skilled-content";
import type { CountryMeta as CorporateCountry } from "@/lib/corporate-content";

type AnyCountry =
  | ResidencyCountry
  | CitizenshipCountry
  | SkilledCountry
  | CorporateCountry;

type Variant = "compact" | "standard" | "plush";

// ✅ CHANGE ONLY HERE if your canonical domain changes later
const SITE_URL = "https://www.xiphiasimmigration.com";

/* ---------------- utils ---------------- */
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

function serviceTypeFromCategory(cat?: AnyCountry["category"]) {
  switch (cat) {
    case "citizenship":
      return "Citizenship by Investment";
    case "skilled":
      return "Skilled Immigration";
    case "corporate":
      return "Corporate Mobility";
    case "residency":
    default:
      return "Residency by Investment";
  }
}

function ensureAbsoluteForImage(src?: string) {
  if (!src) return undefined;
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/"))
    return src;
  return `/${src.replace(/^\.?\/*/, "")}`;
}

// locale is pinned to avoid SSR/CSR differences
function fmtCurrency(amount?: number, cur = "USD", locale = "en-US") {
  if (typeof amount !== "number") return "Varies";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: cur.toUpperCase(),
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString(locale)} ${cur.toUpperCase()}`;
  }
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Stable, deterministic IDs (no useId)
function stableIds(country: AnyCountry, title: string) {
  const base =
    "cc-" +
    (country.countrySlug ? slugify(country.countrySlug) : slugify(title || "untitled"));
  return {
    headingId: `${base}-h`,
    descId: `${base}-d`,
  };
}

/* ---------------- component ---------------- */
export default function CountryCard({
  country,
  variant = "standard",
}: {
  country: AnyCountry;
  variant?: Variant;
}) {
  const sizes = {
    compact: { pad: "p-3", imgAspect: "aspect-[6/3]" },
    standard: { pad: "p-4", imgAspect: "aspect-[16/10] sm:aspect-[4/3]" },
    plush: { pad: "p-5", imgAspect: "aspect-[16/9] sm:aspect-[4/3]" },
  }[variant];

  // Pull common fields (tolerant to vertical meta differences)
  const title = (country as any).title as string;
  const summary = (country as any).summary as string | undefined;
  const heroImage = ensureAbsoluteForImage((country as any).heroImage as string | undefined);
  const minInvestment = (country as any).minInvestment as number | undefined;
  const currency = ((country as any).currency as string | undefined) || "USD";
  const timelineMonths = (country as any).timelineMonths as number | undefined;
  const timelineLabel = (country as any).timelineLabel as string | undefined;
  const tags = ((country as any).tags as string[] | undefined) || [];

  const computedHref = country?.countrySlug
    ? `${baseFromCategory(country.category)}/${country.countrySlug}`
    : undefined;

  const absoluteUrl = computedHref ? `${SITE_URL}${computedHref}` : undefined;
  const serviceType = serviceTypeFromCategory(country.category);

  const price = fmtCurrency(minInvestment, currency, "en-US");
  const time = formatTimelineShort(timelineMonths, timelineLabel);

  const { headingId, descId } = stableIds(country, title);

  const CardShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const common = [
      // Midnight Embassy card — dark ink, gold-on-hover, equal-height in a grid.
      "group flex h-full flex-col overflow-hidden rounded-2xl",
      "bg-white border border-gold/45",
      "transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/65",
      "hover:shadow-[0_18px_50px_-20px_rgba(15,23,42,0.08)] motion-reduce:transform-none",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-sand",
    ].join(" ");

    return computedHref ? (
      <Link
        href={computedHref}
        aria-labelledby={headingId}
        aria-describedby={summary ? descId : undefined}
        className={common}
      >
        {children}
      </Link>
    ) : (
      <div
        role="group"
        aria-labelledby={headingId}
        aria-describedby={summary ? descId : undefined}
        className={common}
      >
        {children}
      </div>
    );
  };

  return (
    <CardShell>
      {/* ✅ SEO microdata (Service) — NO UI impact (hidden/sr-only only) */}
      <article itemScope itemType="https://schema.org/Service" className="flex h-full flex-col">
        {/* Using <data> / <span> avoids invalid <meta> tags in body */}
        {absoluteUrl ? (
          <data itemProp="url" value={absoluteUrl} className="hidden" />
        ) : null}

        <span itemProp="name" className="sr-only">
          {title}
        </span>

        {summary ? (
          <span itemProp="description" className="sr-only">
            {summary}
          </span>
        ) : null}

        <span itemProp="serviceType" className="sr-only">
          {serviceType}
        </span>

        <div
          itemProp="provider"
          itemScope
          itemType="https://schema.org/Organization"
          className="hidden"
        >
          <span itemProp="name">XIPHIAS Immigration</span>
          <data itemProp="url" value={SITE_URL} />
        </div>

        {typeof minInvestment === "number" ? (
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="hidden">
            <data itemProp="priceCurrency" value={currency.toUpperCase()} />
            <data itemProp="price" value={String(minInvestment)} />
            <data itemProp="availability" value="https://schema.org/InStock" />
          </div>
        ) : null}

        {/* Hero */}
        <div
          className={[
            "relative w-full overflow-hidden",
            sizes.imgAspect,
            "bg-sand",
          ].join(" ")}
        >
          {heroImage ? (
            <Image
              src={heroImage}
              alt={`${title} hero image`}
              fill
              loading="lazy"
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="h-full w-full grid place-items-center">
              <span className="text-xs text-ink/40">Program</span>
            </div>
          )}
          {/* legibility veil + gold hairline at the base */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent"
          />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>

        {/* Body */}
        <div className={["flex flex-1 flex-col", sizes.pad].join(" ")}>
          <h3
            id={headingId}
            className="font-sora text-base font-semibold tracking-tight text-ink"
          >
            {title}
          </h3>

          {summary ? (
            <p id={descId} className="mt-1.5 text-sm leading-relaxed text-ink/55 line-clamp-2">
              {summary}
            </p>
          ) : null}

          {/* Key metrics */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-[13px]">
            <div className="rounded-xl border border-gold/45 bg-sand/50 p-2.5">
              <div className="font-semibold text-gold">{price}</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-ink/40">
                Min investment
              </div>
            </div>
            <div className="rounded-xl border border-gold/45 bg-sand/50 p-2.5">
              <div className="font-semibold text-ink">{time}</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-ink/40">
                Typical timeline
              </div>
            </div>
          </div>

          {/* Tags (optional) — pinned to the bottom so cards stay even */}
          {!!tags.length && (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/45 bg-sand/50 px-2.5 py-0.5 text-[11px] text-ink/70"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </CardShell>
  );
}
