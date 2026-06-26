"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";

import { ImageReveal, Stagger, StaggerItem } from "@/components/motion";
import type { CountrySummary, Vertical } from "@/lib/countries-shared";
import { TRACK_LABEL, TRACK_PILL } from "@/lib/countries-shared";
import Flag from "./Flag";
import { countryImage } from "./country-image";

type RegionGroup = { region: string; countries: CountrySummary[] };

type Props = {
  regions: RegionGroup[];
};

const ALL = "all" as const;

/**
 * Searchable, region-grouped country index. Server passes the pre-grouped
 * regions; this client layer adds free-text search + a track filter, then
 * renders the matching countries as gold-edged Desert Sand cards.
 */
export default function CountryExplorer({ regions }: Props) {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState<Vertical | typeof ALL>(ALL);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return regions
      .map(({ region, countries }) => ({
        region,
        countries: countries.filter((c) => {
          const matchesQuery =
            !q ||
            c.name.toLowerCase().includes(q) ||
            c.region.toLowerCase().includes(q) ||
            c.slug.toLowerCase().includes(q);
          const matchesTrack = track === ALL || c.tracks.includes(track);
          return matchesQuery && matchesTrack;
        }),
      }))
      .filter((g) => g.countries.length > 0);
  }, [regions, query, track]);

  const visibleCount = filtered.reduce((sum, g) => sum + g.countries.length, 0);

  return (
    <div>
      {/* Controls */}
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search
            aria-hidden
            className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-gold"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a destination…"
            aria-label="Search countries"
            className="w-full rounded-full border border-gold/40 bg-white px-11 py-3 text-[14px] text-ink shadow-[0_8px_24px_-18px_rgba(15,23,42,0.25)] outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by pathway">
          <FilterPill active={track === ALL} onClick={() => setTrack(ALL)}>
            All pathways
          </FilterPill>
          {(Object.keys(TRACK_PILL) as Vertical[]).map((t) => (
            <FilterPill key={t} active={track === t} onClick={() => setTrack(t)} title={TRACK_LABEL[t]}>
              {TRACK_PILL[t]}
            </FilterPill>
          ))}
        </div>
      </div>

      {visibleCount === 0 ? (
        <p className="rounded-2xl border border-gold/30 bg-white/70 px-6 py-12 text-center text-[15px] text-ink/60">
          No destinations match “{query}”. Try a different search or pathway.
        </p>
      ) : (
        filtered.map(({ region, countries }) => (
          <div key={region} className="mb-14">
            <div className="mb-6 flex items-center gap-3">
              <MapPin aria-hidden className="size-4 text-gold" />
              <h2 className="font-sora text-[13px] font-bold uppercase tracking-[0.2em] text-ink">
                {region}
              </h2>
              <span aria-hidden className="h-px flex-1 bg-gold/30" />
              <span className="text-[12px] font-semibold text-ink/45">{countries.length}</span>
            </div>

            <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" amount={0.1}>
              {countries.map((c) => (
                <StaggerItem key={c.slug}>
                  <Link
                    href={`/countries/${c.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/40 bg-white shadow-[0_12px_36px_-20px_rgba(15,23,42,0.22)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_24px_52px_-22px_rgba(168,125,31,0.4)]"
                  >
                    {/* Real per-country frame */}
                    <div className="relative">
                      <ImageReveal
                        src={countryImage(c.slug, c.region)}
                        alt={`${c.name} — programmes we run`}
                        ratio="aspect-[16/10]"
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="rounded-none"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/75 via-midnight/5 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                        <div className="flex items-center gap-2.5">
                          <Flag code={c.code} size={30} />
                          <div>
                            <h3 className="font-sora text-[17px] font-semibold leading-tight text-pearl">
                              {c.name}
                            </h3>
                            <p className="text-[11.5px] text-pearl/75">
                              {c.programmeCount} programme{c.programmeCount === 1 ? "" : "s"}
                            </p>
                          </div>
                        </div>
                        <ArrowRight
                          aria-hidden
                          className="size-4 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 p-5">
                      {c.tracks.map((t) => (
                        <span
                          key={t}
                          title={TRACK_LABEL[t]}
                          className="rounded-full border border-gold/30 bg-sand px-2.5 py-1 text-[11px] font-semibold text-gold_deep"
                        >
                          {TRACK_PILL[t]}
                        </span>
                      ))}
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        ))
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={active}
      className={
        "rounded-full px-4 py-2 text-[12.5px] font-semibold transition " +
        (active
          ? "bg-gold text-midnight shadow-[0_8px_24px_-12px_rgba(168,125,31,0.55)]"
          : "border border-gold/40 bg-white text-ink/70 hover:border-gold hover:text-ink")
      }
    >
      {children}
    </button>
  );
}
