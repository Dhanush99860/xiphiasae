"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import type { PassportRecord, PassportRegion } from "@/data/passport-index";
import Flag from "@/components/Countries/Flag";
import {
  bandClass,
  passportProfileHref,
  PassportIndexShell,
  PassportSourceNote,
  regionClass,
  serifClass,
  type PassportStats,
} from "@/components/PassportIndex/PassportIndexShared";

type Props = {
  records: PassportRecord[];
  regions: Array<PassportRegion | "All">;
  stats: PassportStats;
};

export default function PassportRankingClient({ records, regions, stats }: Props) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<PassportRegion | "All">("All");

  const filteredRecords = useMemo(() => {
    const term = query.trim().toLowerCase();

    return records.filter((record) => {
      const regionMatch = region === "All" || record.region === region;
      const textMatch =
        !term ||
        record.country.toLowerCase().includes(term) ||
        record.code.toLowerCase().includes(term) ||
        record.rank.toLowerCase().includes(term) ||
        record.band.toLowerCase().includes(term);

      return regionMatch && textMatch;
    });
  }, [query, records, region]);

  return (
    <PassportIndexShell
      active="ranking"
      eyebrow="Passport ranking"
      title="Search passport strength without losing the advisor context."
      description="Use the table to understand the mobility score, then open a passport profile for the practical XIPHIAS interpretation."
    >
      <section className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6">

        {/* ── Section header ── */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#bfa15c]">
              Global mobility table
            </p>
            <h2 className={`${serifClass} mt-1.5 text-2xl font-medium text-white`}>
              {filteredRecords.length} passports ranked
            </h2>
            <p className="mt-1 text-[13px] leading-relaxed text-white/60">
              Filter by region or search by name. Ranking is a starting point — not the final recommendation.
            </p>
          </div>

          {/* Search */}
          <label className="relative block w-full sm:w-72 shrink-0">
            <span className="sr-only">Search passports</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/45" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search country, code, or band…"
              className="w-full rounded-lg border border-white/15 bg-white/[0.05] py-2.5 pl-9 pr-3 text-[13px] text-white placeholder:text-white/45 outline-none focus:border-[#bfa15c] focus:ring-1 focus:ring-[#bfa15c]"
            />
          </label>
        </div>

        {/* ── Region filter pills ── */}
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
          {regions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRegion(item)}
              className={[
                "shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition",
                region === item
                  ? "border-[#bfa15c] bg-[#bfa15c] text-[#0c1f3f]"
                  : "border-white/15 bg-white/[0.05] text-white/65 hover:border-[#bfa15c] hover:text-[#bfa15c]",
              ].join(" ")}
            >
              {item}
            </button>
          ))}
        </div>

        {/* ── Table ── */}
        <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] shadow-xl shadow-black/30 backdrop-blur-sm">

          {/* Table header */}
          <div className="hidden grid-cols-[68px_1fr_110px_80px_1fr_80px] gap-x-4 bg-white/[0.05] px-5 py-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50 lg:grid">
            <span>Rank</span>
            <span>Passport</span>
            <span>Region</span>
            <span>Score</span>
            <span>XIPHIAS lens</span>
            <span>Profile</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/8">
            {filteredRecords.length === 0 ? (
              <div className="px-5 py-14 text-center">
                <p className="text-sm font-semibold text-white/60">No passports match your search.</p>
                <button
                  type="button"
                  onClick={() => { setQuery(""); setRegion("All"); }}
                  className="mt-3 text-sm font-semibold text-[#bfa15c] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              filteredRecords.map((record) => (
                <article
                  key={record.code}
                  className={[
                    "grid items-center gap-x-4 gap-y-2 px-5 py-3.5 transition-colors hover:bg-white/[0.05]",
                    "lg:grid-cols-[68px_1fr_110px_80px_1fr_80px]",
                  ].join(" ")}
                >
                  {/* Rank */}
                  <div className="flex items-center">
                    <span className="text-[15px] font-semibold leading-tight text-[#bfa15c]">
                      {record.rank}
                    </span>
                  </div>

                  {/* Passport — flag + country name + band on one row */}
                  <div className="flex min-w-0 items-center gap-2">
                    <Flag code={record.code} size={26} />
                    <h3 className="text-[13.5px] font-semibold text-white">{record.country}</h3>
                    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${bandClass(record.band)}`}>
                      {record.band}
                    </span>
                  </div>

                  {/* Region */}
                  <span className={`w-fit rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${regionClass(record.region)}`}>
                    {record.region}
                  </span>

                  {/* Score — pill only, no bar */}
                  <span className="inline-flex w-fit min-w-[44px] items-center justify-center rounded-full bg-[#bfa15c] px-2.5 py-1 text-[12px] font-semibold text-[#0c1f3f] tabular-nums">
                    {record.score}
                  </span>

                  {/* XIPHIAS lens */}
                  <p className="text-[12.5px] leading-[1.6] text-white/60">
                    {record.xiphiasLens}
                  </p>

                  {/* Profile link */}
                  <Link
                    href={passportProfileHref(record)}
                    className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-[12px] font-semibold text-[#bfa15c] transition hover:border-[#bfa15c] hover:bg-[#bfa15c]/10"
                  >
                    Open <ArrowRight className="size-3" />
                  </Link>
                </article>
              ))
            )}
          </div>

          {/* Table footer */}
          {filteredRecords.length > 0 && (
            <div className="flex items-center justify-between border-t border-white/12 bg-white/[0.05] px-5 py-2.5">
              <p className="text-[11.5px] text-white/60">
                Showing{" "}
                <span className="font-semibold text-white">{filteredRecords.length}</span>
                {" "}of{" "}
                <span className="font-semibold text-white">{records.length}</span> passports
                {region !== "All" && (
                  <> · <span className="font-semibold text-[#bfa15c]">{region}</span></>
                )}
              </p>
              <p className="hidden text-[11px] text-white/45 sm:block">
                Top score: <span className="font-semibold text-white">{stats.topScore}</span>
              </p>
            </div>
          )}
        </div>
      </section>

      <PassportSourceNote />
    </PassportIndexShell>
  );
}
