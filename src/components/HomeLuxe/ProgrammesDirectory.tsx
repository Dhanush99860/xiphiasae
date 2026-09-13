"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Flag from "@/components/Countries/Flag";
import { TRACK_PILL, TRACK_ORDER, type Vertical, type DirectoryRegion } from "@/lib/countries-shared";

const GOLD = "#bfa15c";
const INK = "#0c1f3f";

/** Vertical → its hub page, used by the filter chips when a track is selected. */
const TRACK_HUB: Record<Vertical, string> = {
  citizenship: "/citizenship",
  residency: "/residency",
  skilled: "/skilled",
  corporate: "/corporate",
};

const TRACK_DOT: Record<Vertical, string> = {
  citizenship: "#bfa15c",
  residency: "#3f7fc1",
  skilled: "#4e9d84",
  corporate: "#a4739c",
};

type Filter = "all" | Vertical;

/**
 * The full programme + country directory — every jurisdiction we work in and
 * every programme inside it, one click from the homepage. Sits immediately
 * below the hero: this is the first thing a visitor is meant to click.
 */
export default function ProgrammesDirectory({
  serifClass,
  regions,
}: {
  serifClass: string;
  regions: DirectoryRegion[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const allCountries = useMemo(() => regions.flatMap((r) => r.countries), [regions]);

  const counts = useMemo(() => {
    const out: Record<Filter, number> = { all: 0, citizenship: 0, residency: 0, skilled: 0, corporate: 0 };
    for (const c of allCountries) {
      for (const p of c.programmes) {
        out.all += 1;
        out[p.track] += 1;
      }
    }
    return out;
  }, [allCountries]);

  const q = query.trim().toLowerCase();
  const view = useMemo(() => {
    return regions
      .map((r) => ({
        region: r.region,
        countries: r.countries
          .map((c) => {
            const programmes = c.programmes.filter((p) => filter === "all" || p.track === filter);
            if (programmes.length === 0) return null;
            if (!q) return { ...c, programmes };
            const countryHit = c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q);
            if (countryHit) return { ...c, programmes };
            const hits = programmes.filter((p) => p.title.toLowerCase().includes(q));
            return hits.length > 0 ? { ...c, programmes: hits } : null;
          })
          .filter((c): c is NonNullable<typeof c> => c !== null),
      }))
      .filter((r) => r.countries.length > 0);
  }, [regions, filter, q]);

  const shownCountries = view.reduce((n, r) => n + r.countries.length, 0);
  const shownProgrammes = view.reduce((n, r) => n + r.countries.reduce((m, c) => m + c.programmes.length, 0), 0);

  return (
    <section
      id="programmes"
      data-tone="light"
      className="relative isolate scroll-mt-24 px-5 py-20 text-[#0c1f3f] sm:px-12 sm:py-24 lg:px-20"
      style={{ background: "linear-gradient(180deg,#ffffff 0%,#f7fafe 100%)" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* ── heading ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-0">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
              <span className="h-px w-8" style={{ background: GOLD }} />
              Programmes &amp; countries
              <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">البرامج والدول</span>
            </p>
            <h2 className={`${serifClass} mt-5 text-[clamp(2.1rem,4.4vw,3.4rem)] font-medium leading-[1.05]`}>
              Every programme, in <span className="italic" style={{ color: GOLD }}>every country we cover</span>
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#0c1f3f]/60">
              {counts.all} immigration programmes across {allCountries.length} jurisdictions — citizenship by investment,
              residency and golden visas, skilled migration and corporate mobility. Pick a country to see costs,
              timelines and eligibility.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 text-center">
            {[
              [String(allCountries.length), "countries"],
              [String(counts.all), "programmes"],
              [String(counts.citizenship), "citizenship"],
              [String(counts.residency), "residency"],
            ].map(([v, u]) => (
              <div key={u} className="rounded-lg border px-4 py-2.5" style={{ borderColor: `${INK}1a` }}>
                <div className={`${serifClass} text-[1.4rem] font-semibold leading-none`} style={{ color: GOLD }}>{v}</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0c1f3f]/50">{u}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── filters ───────────────────────────────────────────────────── */}
        <div className="mt-10 flex flex-col gap-4 border-y py-4 lg:flex-row lg:items-center lg:justify-between" style={{ borderColor: `${INK}14` }}>
          <div className="flex flex-wrap gap-2">
            {(["all", ...TRACK_ORDER] as Filter[]).map((key) => {
              const on = filter === key;
              const label = key === "all" ? "All programmes" : TRACK_PILL[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  aria-pressed={on}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-colors"
                  style={{
                    borderColor: on ? GOLD : `${INK}1f`,
                    background: on ? `${GOLD}14` : "transparent",
                    color: on ? INK : `${INK}99`,
                  }}
                >
                  {key !== "all" ? <span className="h-1.5 w-1.5 rounded-full" style={{ background: TRACK_DOT[key] }} /> : null}
                  {label}
                  <span className="tabular-nums text-[11px] font-medium text-[#0c1f3f]/45">{counts[key]}</span>
                </button>
              );
            })}
          </div>
          <label className="relative w-full lg:w-72">
            <span className="sr-only">Search a country or programme</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a country or programme…"
              className="w-full rounded-full border bg-white px-4 py-2.5 text-[13px] outline-none transition-colors placeholder:text-[#0c1f3f]/40 focus:border-[#bfa15c]"
              style={{ borderColor: `${INK}1f` }}
            />
          </label>
        </div>

        {/* ── directory ─────────────────────────────────────────────────── */}
        {view.length === 0 ? (
          <p className="mt-14 text-center text-[15px] text-[#0c1f3f]/55">
            No programme matches “{query}”. Try a country name, or{" "}
            <button type="button" onClick={() => { setQuery(""); setFilter("all"); }} className="font-semibold underline" style={{ color: GOLD }}>
              clear the filters
            </button>.
          </p>
        ) : (
          view.map((r) => (
            <div key={r.region} className="mt-12">
              <div className="flex items-center gap-4">
                <h3 className={`${serifClass} text-[1.55rem] font-medium leading-none`}>{r.region}</h3>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0c1f3f]/40">
                  {r.countries.length} {r.countries.length === 1 ? "country" : "countries"}
                </span>
                <span className="h-px flex-1" style={{ background: `${INK}14` }} />
              </div>

              {/* CSS columns rather than a grid: programme counts differ wildly per
                  country, and masonry packing avoids the dead space a row-aligned
                  grid leaves under the short cards. */}
              <div className="mt-6 gap-4 md:columns-2 xl:columns-3">
                {r.countries.map((c, i) => (
                  <motion.article
                    key={c.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: Math.min(i, 5) * 0.04 }}
                    className="mb-4 break-inside-avoid rounded-lg border bg-white p-5 transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(12,31,63,0.55)]"
                    style={{ borderColor: `${INK}14` }}
                  >
                    <a href={`/countries/${c.slug}`} className="group flex items-center gap-3">
                      <Flag code={c.code} size={30} loading="lazy" />
                      <span className="min-w-0 flex-1">
                        <span className={`${serifClass} block truncate text-[1.25rem] font-medium leading-tight transition-colors group-hover:text-[#bfa15c]`}>
                          {c.name}
                        </span>
                        <span className="mt-0.5 block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#0c1f3f]/40">
                          {c.programmes.length} {c.programmes.length === 1 ? "programme" : "programmes"}
                        </span>
                      </span>
                      <span className="shrink-0 text-[#bfa15c] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
                    </a>

                    <ul className="mt-4 space-y-px border-t pt-2" style={{ borderColor: `${INK}0f` }}>
                      {c.programmes.map((p) => (
                        <li key={p.href}>
                          <a
                            href={p.href}
                            className="group flex items-start gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-[#f3f7fd]"
                          >
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: TRACK_DOT[p.track] }} />
                            <span className="min-w-0 flex-1">
                              <span className="block text-[13.5px] font-medium leading-snug transition-colors group-hover:text-[#bfa15c]">
                                {p.title}
                              </span>
                              <span className="mt-0.5 block text-[11.5px] text-[#0c1f3f]/50">
                                {TRACK_PILL[p.track]} · {p.investmentLabel} · {p.timelineLabel}
                              </span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </div>
          ))
        )}

        {/* ── footer row ────────────────────────────────────────────────── */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6" style={{ borderColor: `${INK}14` }}>
          <p className="text-[13px] text-[#0c1f3f]/55">
            Showing {shownProgrammes} of {counts.all} programmes across {shownCountries} of {allCountries.length} countries.
          </p>
          <div className="flex flex-wrap gap-5">
            <a href="/countries" className="group inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
              All countries <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href={filter === "all" ? "/compare-programs" : TRACK_HUB[filter]}
              className="group inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]"
              style={{ color: GOLD }}
            >
              {filter === "all" ? "Compare programmes" : `All ${TRACK_PILL[filter].toLowerCase()} programmes`}{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
