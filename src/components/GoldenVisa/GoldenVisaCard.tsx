import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ImageReveal } from "@/components/motion";
import type { CountryMeta } from "@/lib/residency-content";
import { countryImage } from "@/components/Countries/country-image";

type Props = {
  country: CountryMeta;
  /** Eager-load the first row of thumbnails. */
  priority?: boolean;
};

/**
 * One Golden Visa destination card — a real per-country frame that wipes up on
 * scroll under a midnight scrim, with an Arabic-aware timeline chip and up to
 * three intro value-props. Links to the country's residency page. Server
 * component (no client hooks; ImageReveal carries the motion).
 */
export default function GoldenVisaCard({ country, priority }: Props) {
  const href = `/residency/${country.countrySlug}`;
  const points = (country.introPoints ?? []).slice(0, 3);
  const timeline = country.timelineLabel;
  const img = countryImage(country.countrySlug);

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gold/40 bg-white shadow-[0_14px_40px_-22px_rgba(15,23,42,0.25)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_28px_60px_-24px_rgba(168,125,31,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      {/* Media header */}
      <div className="relative">
        <ImageReveal
          src={img}
          alt={`${country.country} — residency by investment`}
          ratio="aspect-[16/11]"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          priority={priority}
          className="rounded-none"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
          <div className="min-w-0">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-gold">
              {country.country}
            </p>
            <h3 className="mt-1 font-sora text-xl font-semibold leading-tight text-pearl">
              {country.title}
            </h3>
          </div>
          <span
            aria-hidden
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-midnight/40 text-gold backdrop-blur transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-midnight"
          >
            <ArrowUpRight className="size-4 rtl:-scale-x-100" />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        {country.summary ? (
          <p className="line-clamp-3 text-[13.5px] leading-relaxed text-ink/70">
            {country.summary}
          </p>
        ) : null}

        {points.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-[12.5px] leading-snug text-ink/75"
              >
                <span
                  aria-hidden
                  className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-gold"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          {timeline ? (
            <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold text-gold_deep">
              {timeline}
            </span>
          ) : (
            <span />
          )}
          <span className="text-[12px] font-semibold text-gold_deep underline-offset-4 group-hover:underline">
            Explore route
          </span>
        </div>
      </div>
    </Link>
  );
}
