import Link from "next/link";

import { CollectionRail, ImageReveal } from "@/components/motion";
import type { CountrySummary } from "@/lib/countries-shared";
import { TRACK_PILL } from "@/lib/countries-shared";
import { countryImage } from "./country-image";

type Props = {
  countries: CountrySummary[];
};

/**
 * Horizontal scroll-snap rail of flagship destinations — real per-country
 * frames that wipe up under a midnight scrim, captioned with the country name,
 * pathway pills and programme count. Native-swipe on mobile. Server component
 * (CollectionRail + ImageReveal carry the motion). Pure UI; data is passed in.
 */
export default function CountryRail({ countries }: Props) {
  return (
    <CollectionRail>
      {countries.map((c, i) => (
        <Link
          key={c.slug}
          href={`/countries/${c.slug}`}
          className="group relative snap-start shrink-0 w-[78vw] sm:w-[58vw] md:w-[28rem] lg:w-[24rem] overflow-hidden rounded-3xl border border-gold/40 bg-pearl transition-colors duration-500 hover:border-gold/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
        >
          <ImageReveal
            src={countryImage(c.slug, c.region)}
            alt={`${c.name} — destinations we serve`}
            ratio="aspect-[5/6]"
            sizes="(min-width:1024px) 24rem, (min-width:768px) 28rem, 78vw"
            priority={i === 0}
            className="rounded-none"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-pearl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              {String(i + 1).padStart(2, "0")} · {c.region}
            </span>
            <h3 className="mt-2 font-sora text-2xl font-semibold leading-tight">{c.name}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.tracks.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-gold/40 bg-midnight/30 px-2.5 py-1 text-[10.5px] font-semibold text-gold backdrop-blur"
                >
                  {TRACK_PILL[t]}
                </span>
              ))}
            </div>
            <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-pearl/85 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              {c.programmeCount} programme{c.programmeCount === 1 ? "" : "s"}
              <span aria-hidden className="rtl:-scale-x-100">
                →
              </span>
            </span>
          </div>
        </Link>
      ))}

      {/* Tail card — see all */}
      <Link
        href="#country-grid"
        className="group snap-start shrink-0 flex w-[60vw] sm:w-[42vw] md:w-[18rem] flex-col items-start justify-center gap-4 rounded-3xl border border-dashed border-gold/50 bg-dune/40 p-7 text-ink transition-colors duration-500 hover:border-gold hover:bg-dune/60"
      >
        <span className="font-sora text-2xl font-semibold leading-tight">Every destination</span>
        <p className="text-[13px] leading-6 text-ink/60">
          Search and filter the full country atlas below.
        </p>
        <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold_deep transition-transform duration-300 group-hover:translate-x-1">
          Explore all <span aria-hidden>↓</span>
        </span>
      </Link>
    </CollectionRail>
  );
}
