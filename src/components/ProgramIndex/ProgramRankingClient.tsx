"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MessageSquare } from "lucide-react";

import { useCurrency } from "@/lib/CurrencyProvider";
import { rankPrograms, type ProgramIndexItem, type ScoredProgram } from "@/lib/program-index";
import { passportRecordForCountry, PRESENCE_LABEL } from "@/lib/program-metrics";
import { ScorePill } from "@/components/PassportIndex/PassportIndexShared";
import { GlassSelect } from "@/components/XiaTools/GlassSelect";
import { countryImage } from "@/components/Countries/country-image";
import { BOOKING_ROUTE } from "@/lib/topmate";

const GOLD = "#bfa15c";

const TRACKS = [
  { value: "all", label: "All" },
  { value: "citizenship", label: "Citizenship" },
  { value: "residency", label: "Residency" },
  { value: "skilled", label: "Skilled" },
  { value: "corporate", label: "Corporate" },
] as const;
type TrackFilter = (typeof TRACKS)[number]["value"];

type SortKey = "index" | "cost" | "speed";
const SORTS: { value: SortKey; label: string }[] = [
  { value: "index", label: "Index score" },
  { value: "cost", label: "Lowest cost" },
  { value: "speed", label: "Fastest" },
];

const TIER_COLOR: Record<ScoredProgram["tier"], string> = {
  Standout: "#bfa15c", // gold
  Strong: "#d6b060", // gold bright
  Balanced: "#a87d1f", // gold deep
  Specialist: "#8a8270", // muted pearl/sand
};

const DISPLAY_CAP = 30;
const SPRING = { type: "spring" as const, stiffness: 360, damping: 30 };
const GRID = "lg:grid-cols-[44px_minmax(0,1fr)_158px_120px_108px_98px_96px]";

/** Indicative pill tuned for the dark navy surface. */
function DarkSortSelect({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <GlassSelect
      value={value}
      onChange={(v) => onChange(v as SortKey)}
      options={SORTS.map((s) => ({ value: s.value, label: s.label }))}
      className="w-40"
      buttonClassName="border-[#bfa15c]/40 bg-white/[0.05] text-[#eef3fb] hover:border-[#bfa15c]/65"
      ariaLabel="Sort ranking"
    />
  );
}

export default function ProgramRankingClient({ programs }: { programs: ProgramIndexItem[] }) {
  const reduce = useReducedMotion();
  const { currency, convert } = useCurrency();
  const money = (usd: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 0 }).format(
      convert(usd, "USD", currency),
    );

  const ranked = useMemo(() => rankPrograms(programs), [programs]);
  const [track, setTrack] = useState<TrackFilter>("all");
  const [sort, setSort] = useState<SortKey>("index");

  const view = useMemo(() => {
    const filtered = ranked.filter((p) => track === "all" || p.track === track);
    const sorted = [...filtered].sort((a, b) => {
      if (sort === "cost") return a.investmentUsd - b.investmentUsd;
      if (sort === "speed") return a.timelineMonths - b.timelineMonths;
      return a.rank - b.rank;
    });
    return sorted.slice(0, DISPLAY_CAP);
  }, [ranked, track, sort]);

  const totalInScope = ranked.filter((p) => track === "all" || p.track === track).length;

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="flex flex-wrap gap-1 rounded-xl border p-1"
          style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
        >
          {TRACKS.map((t) => {
            const active = track === t.value;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => setTrack(t.value)}
                className="relative rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bfa15c]/60"
              >
                {active && (
                  <motion.span
                    layoutId="pi-track-active"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: GOLD }}
                    transition={reduce ? { duration: 0 } : SPRING}
                  />
                )}
                <span className="relative" style={{ color: active ? "#0a1733" : "rgba(238,243,251,0.6)" }}>
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="inline-flex items-center gap-2 text-[13px] text-white/70">
          <span>Sort by</span>
          <DarkSortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <p className="text-[12.5px] text-white/45">
          Showing top <span className="font-semibold" style={{ color: GOLD }}>{view.length}</span> of {totalInScope} —
          the full ranking is in the Index report.
        </p>
      </div>

      {/* Column header (desktop) */}
      <div
        className={`mt-4 hidden px-4 pb-1 text-[11px] font-bold uppercase tracking-wide text-white/40 lg:grid lg:items-center lg:gap-4 ${GRID}`}
      >
        <span>#</span>
        <span>Programme</span>
        <span>Index score</span>
        <span>Cost</span>
        <span>Timeline</span>
        <span>Passport</span>
        <span className="text-right">Talk</span>
      </div>

      {/* Ranked rows — bounded internal scroll (data-lenis-prevent so the wheel
          scrolls this natively instead of the page) */}
      <div
        data-lenis-prevent
        className="mt-1 max-h-[58vh] overflow-y-auto overflow-x-hidden pr-1 [scrollbar-width:thin]"
      >
        <ul className="grid gap-2.5">
          {view.map((p, idx) => {
            const rec = passportRecordForCountry(p.country);
            const tierColor = TIER_COLOR[p.tier];
            const img = countryImage(p.countrySlug);
            return (
              <motion.li
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: reduce ? 0 : Math.min(idx * 0.02, 0.18) }}
                className={`group grid grid-cols-1 gap-3 rounded-2xl border p-4 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 lg:items-center lg:gap-4 ${GRID}`}
                style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
              >
                {/* Rank */}
                <div className="flex items-center">
                  <span
                    className="grid size-8 place-items-center rounded-lg text-[13px] font-black"
                    style={{ backgroundColor: `${tierColor}26`, color: tierColor }}
                  >
                    {p.rank}
                  </span>
                </div>

                {/* Programme */}
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="hidden size-11 shrink-0 overflow-hidden rounded-xl border sm:block"
                    style={{ borderColor: `${GOLD}30` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={p.country} className="h-full w-full object-cover" loading="lazy" />
                  </span>
                  <div className="min-w-0">
                    <Link
                      href={p.href}
                      className="text-[15px] font-semibold text-[#eef3fb] underline-offset-4 transition-colors hover:underline"
                      style={{ textDecorationColor: GOLD }}
                    >
                      {p.title}
                    </Link>
                    <p className="mt-0.5 text-[12px] text-white/55">
                      {p.country} · <span className="capitalize">{p.track}</span>
                    </p>
                    <span
                      className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] text-white/70"
                      style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} aria-hidden />
                      Presence: {PRESENCE_LABEL[p.presence]}
                    </span>
                  </div>
                </div>

                {/* Index score */}
                <Cell label="Index score">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[18px] font-black tabular-nums" style={{ color: GOLD }}>
                      {p.indexScore}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: tierColor }}>
                      {p.tier}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full origin-left rounded-full"
                      style={{ width: `${p.indexScore}%`, backgroundColor: tierColor }}
                      initial={reduce ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </Cell>

                {/* Cost */}
                <Cell label="Indicative cost">
                  <span className="text-[14px] font-semibold" style={{ color: GOLD }}>
                    {p.investmentUsd > 0 ? money(p.investmentUsd) : "Fees only"}
                  </span>
                </Cell>

                {/* Timeline */}
                <Cell label="Timeline">
                  <span className="text-[13.5px] text-white/85">{p.timelineLabel}</span>
                </Cell>

                {/* Passport */}
                <Cell label="Passport">
                  {rec ? <ScorePill score={rec.score} /> : <span className="text-[12px] text-white/40">Advisor review</span>}
                </Cell>

                {/* Discuss */}
                <div className="flex lg:justify-end">
                  <Link
                    href={BOOKING_ROUTE}
                    className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-semibold transition hover:bg-[#bfa15c]/20"
                    style={{ borderColor: `${GOLD}40`, background: `${GOLD}1a`, color: GOLD }}
                  >
                    <MessageSquare className="size-3.5" /> Discuss
                  </Link>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/** A metric cell with a label shown only on mobile (the desktop header carries it). */
function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-white/40 lg:hidden">
        {label}
      </span>
      {children}
    </div>
  );
}
