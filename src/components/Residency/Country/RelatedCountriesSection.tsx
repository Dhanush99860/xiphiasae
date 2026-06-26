import * as React from "react";
import Link from "next/link";

import type { CountryMeta as ResidencyCountry } from "@/lib/residency-content";
import type { CountryMeta as CitizenshipCountry } from "@/lib/citizenship-content";
import type { CountryMeta as SkilledCountry } from "@/lib/skilled-content";
import type { CountryMeta as CorporateCountry } from "@/lib/corporate-content";

type AnyCountry =
  | ResidencyCountry
  | CitizenshipCountry
  | SkilledCountry
  | CorporateCountry;

type Props = { related: AnyCountry[]; title?: string; subtitle?: string };

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

export default function RelatedCountriesSection({
  related,
  title = "Explore other countries",
  subtitle = "You may also like these destinations",
}: Props) {
  if (!related?.length) return null;

  return (
    <section className="mt-12">
      <header className="mb-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-sand/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Related
        </div>
        <h2 className="mt-2 font-sora text-xl font-semibold text-ink">{title}</h2>
        <p className="text-sm text-ink/55">{subtitle}</p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((c) => {
          const href = `${baseFromCategory(c.category)}/${c.countrySlug}`;
          const img = (c as any).heroImage as string | undefined;

          return (
            <li key={c.countrySlug}>
              <Link
                href={href}
                className="group block overflow-hidden rounded-2xl border border-gold/45 bg-white hover:-translate-y-0.5 hover:border-gold/65 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label={`View ${c.country}`}
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-sand">
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img}
                      alt={c.title || c.country}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="h-full w-full bg-sand grid place-items-center">
                      <span className="text-xs text-ink/40">{c.country}</span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="font-sora text-base font-semibold leading-6 text-ink">
                    {c.title || c.country}
                  </h3>
                  {c.summary ? (
                    <p className="mt-1 text-sm text-ink/55 line-clamp-2">
                      {c.summary}
                    </p>
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}