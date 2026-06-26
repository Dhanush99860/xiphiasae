// src/components/Citizenship/CountryCardPro.tsx
import Link from "next/link";
import React from "react";
import { formatTimelineShort } from "@/lib/timeline";

type Props = {
  href: string;
  title: string;
  summary?: string;
  heroImage?: string;
  country?: string;
  visaFreeCount?: number;
  passportRank?: number;
  minInvestment?: number;
  currency?: string; // e.g. USD
  timelineMonths?: number; // typical processing
  timelineLabel?: string;
  tags?: string[];
  className?: string;
};

const SITE_URL = "https://www.xiphiasimmigration.com";
const SERVICE_TYPE = "Citizenship by Investment";

/* ---------------- utils ---------------- */

function slugify(s: string) {
  return (s || "")
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stableIds(href: string, title: string) {
  const base = `ccp-${slugify(href || title || "card")}`;
  return { hId: `${base}-h`, dId: `${base}-d` };
}

function ensureAbsoluteImage(src?: string) {
  if (!src) return undefined;
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) return src;
  return `/${src.replace(/^\.?\/*/, "")}`;
}

function toInternalPath(url: string) {
  try {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      const u = new URL(url);
      return u.pathname || "/";
    }
  } catch {
    // ignore
  }
  return url.startsWith("/") ? url : `/${url}`;
}

function ensureAbsoluteUrl(href: string) {
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  return `${SITE_URL}${href.startsWith("/") ? href : `/${href}`}`;
}

// locale pinned to avoid SSR/CSR differences
function fmtCurrency(amount?: number, cur = "USD", locale = "en-IN") {
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

/* ---------------- component ---------------- */

export default function CountryCardPro({
  href,
  title,
  summary,
  heroImage,
  country,
  visaFreeCount,
  passportRank,
  minInvestment,
  currency = "USD",
  timelineMonths,
  timelineLabel,
  tags = [],
  className = "",
}: Props) {
  const hrefInternal = toInternalPath(href);           // ✅ for <Link>
  const absoluteHref = ensureAbsoluteUrl(hrefInternal); // ✅ for schema

  const price = fmtCurrency(minInvestment, currency, "en-IN");
  const time = formatTimelineShort(timelineMonths, timelineLabel);

  const normalizedImg = ensureAbsoluteImage(heroImage);
  const { hId, dId } = stableIds(hrefInternal, title);

  return (
    <Link
      href={hrefInternal}
      aria-labelledby={hId}
      aria-describedby={summary ? dId : undefined}
      className={[
        "group block overflow-hidden rounded-2xl",
        "bg-white border border-gold/45",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/65 motion-reduce:transform-none",
        "hover:shadow-[0_18px_50px_-20px_rgba(15,23,42,0.08)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70",
        className,
      ].join(" ")}
    >
      {/* ✅ Microdata is Service (NOT Product) */}
      <article itemScope itemType="https://schema.org/Service">
        {/* Hidden schema values - no UI impact */}
        <link itemProp="url" href={absoluteHref} />
        <meta itemProp="name" content={title} />
        <meta itemProp="serviceType" content={SERVICE_TYPE} />
        {summary ? <meta itemProp="description" content={summary} /> : null}

        {/* areaServed as Country object */}
        {country ? (
          <div
            itemProp="areaServed"
            itemScope
            itemType="https://schema.org/Country"
            className="hidden"
          >
            <meta itemProp="name" content={country} />
          </div>
        ) : null}

        <div
          itemProp="provider"
          itemScope
          itemType="https://schema.org/Organization"
          className="hidden"
        >
          <meta itemProp="name" content="XIPHIAS Immigration" />
          <link itemProp="url" href={SITE_URL} />
        </div>

        {/* Optional pricing only when minInvestment exists */}
        {typeof minInvestment === "number" ? (
          <div
            itemProp="offers"
            itemScope
            itemType="https://schema.org/Offer"
            className="hidden"
          >
            <meta itemProp="priceCurrency" content={currency.toUpperCase()} />
            <meta itemProp="price" content={String(minInvestment)} />
            <link itemProp="availability" href="https://schema.org/InStock" />
          </div>
        ) : null}

        {/* ---------- Hero ---------- */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {normalizedImg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={normalizedImg}
              alt={`${title}${country ? ` — ${country}` : ""}`}
              decoding="async"
              loading="lazy"
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              onError={(e) => {
                e.currentTarget.src = "/xiphias-immigration.png";
              }}
            />
          ) : (
            <div className="h-full w-full bg-sand grid place-items-center">
              <span className="text-xs text-ink/40">
                {country || "Program"}
              </span>
            </div>
          )}

          {/* overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          {country ? (
            <span
              className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-sand/50 px-2 py-1 text-[11px] font-medium text-ink/70 border border-gold/45 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              {country}
            </span>
          ) : null}
        </div>

        {/* ---------- Body ---------- */}
        <div className="p-4 sm:p-5">
          <h3
            id={hId}
            className="font-sora text-base font-semibold tracking-tight text-ink"
          >
            {title}
          </h3>

          {summary ? (
            <p
              id={dId}
              className="mt-1 text-sm text-ink/55 line-clamp-2"
            >
              {summary}
            </p>
          ) : null}

          {/* Key metrics */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-[13px]">
            <div className="rounded-xl p-2 border border-gold/45 bg-sand/50">
              <div className="font-semibold text-gold">
                {price}
              </div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-ink/40">
                Min investment
              </div>
            </div>
            <div className="rounded-xl p-2 border border-gold/45 bg-sand/50">
              <div className="font-semibold text-ink">
                {time}
              </div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-ink/40">
                Typical timeline
              </div>
            </div>
          </div>

          {passportRank || visaFreeCount ? (
            <div className="mt-2 grid grid-cols-2 gap-2 text-[13px]">
              <div className="rounded-xl p-2 border border-gold/45 bg-sand/50">
                <div className="font-semibold text-ink">
                  {passportRank ?? "—"}
                </div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-ink/40">
                  Passport rank
                </div>
              </div>
              <div className="rounded-xl p-2 border border-gold/45 bg-sand/50">
                <div className="font-semibold text-ink">
                  {visaFreeCount ?? "—"}
                </div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-ink/40">
                  Visa-free countries
                </div>
              </div>
            </div>
          ) : null}

          {/* Tags */}
          {!!tags.length && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px]
                             border border-gold/45 bg-sand/50 text-ink/70"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
