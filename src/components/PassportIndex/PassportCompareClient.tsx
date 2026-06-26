"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, ShieldCheck, TrendingUp } from "lucide-react";
import type { PassportRecord } from "@/data/passport-index";
import Flag from "@/components/Countries/Flag";
import {
  bandClass,
  passportProfileHref,
  PassportIndexShell,
  PassportSourceNote,
  regionClass,
  scoreWidth,
  serifClass,
  type PassportStats,
} from "@/components/PassportIndex/PassportIndexShared";

type Props = {
  records: PassportRecord[];
  stats: PassportStats;
};

function PassportSelect({
  id,
  label,
  accentColor,
  records,
  value,
  onChange,
}: {
  id: string;
  label: string;
  accentColor: string;
  records: PassportRecord[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-2">
        <span className="size-2 rounded-full" style={{ backgroundColor: accentColor }} />
        <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-white/70">{label}</span>
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-lg border border-white/15 bg-white/[0.05] py-2.5 pl-3 pr-8 text-[13px] font-semibold text-white outline-none focus:border-[#bfa15c] focus:ring-1 focus:ring-[#bfa15c] [&>option]:bg-[#0c1f3f] [&>option]:text-white"
        >
          {records.map((record) => (
            <option key={record.code} value={record.code}>
              {record.country} · {record.rank} · {record.score}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-white/45" aria-hidden="true" />
      </div>
    </div>
  );
}

function PassportCard({
  record,
  stats,
  accentColor,
  label,
}: {
  record: PassportRecord;
  stats: PassportStats;
  accentColor: string;
  label: string;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] shadow-xl shadow-black/30 backdrop-blur-sm">
      {/* Card top accent bar */}
      <div className="h-1 w-full" style={{ backgroundColor: accentColor }} />

      <div className="flex flex-1 flex-col p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3">
            <Flag code={record.code} size={36} />
            <div>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em]" style={{ color: accentColor }}>
                {label} · {record.code}
              </span>
              <h3 className={`${serifClass} mt-1 text-xl font-medium text-white`}>{record.country}</h3>
            </div>
          </div>
          <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10.5px] font-semibold ${bandClass(record.band)}`}>
            {record.band}
          </span>
        </div>

        {/* Region pill */}
        <div className="mt-2">
          <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${regionClass(record.region)}`}>
            {record.region}
          </span>
        </div>

        {/* Stats row */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/12 bg-white/[0.04] p-3">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/45">Global rank</p>
            <p className="mt-1 text-2xl font-semibold text-white">{record.rank}</p>
          </div>
          <div className="rounded-lg border border-white/12 bg-white/[0.04] p-3">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/45">Visa-free score</p>
            <p className="mt-1 text-2xl font-semibold" style={{ color: accentColor }}>{record.score}</p>
          </div>
        </div>

        {/* Score bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] font-medium text-white/60">
            <span>Against top score</span>
            <span className="tabular-nums">{record.score} / {stats.topScore}</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: scoreWidth(record.score, stats.topScore), backgroundColor: accentColor }}
            />
          </div>
        </div>

        {/* Advisory note */}
        <p className="mt-4 flex-1 text-[12.5px] leading-[1.65] text-white/60">
          {record.advisoryNote}
        </p>

        {/* Open profile */}
        <Link
          href={passportProfileHref(record)}
          className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-black transition hover:gap-2.5"
          style={{ color: accentColor }}
        >
          Open full profile <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}

export default function PassportCompareClient({ records, stats }: Props) {
  const [leftCode, setLeftCode] = useState("IN");
  const [rightCode, setRightCode] = useState("PT");

  const left = records.find((record) => record.code === leftCode) ?? records[0];
  const right = records.find((record) => record.code === rightCode) ?? records[1];
  const scoreDelta = right.score - left.score;
  const stronger = scoreDelta >= 0 ? right : left;
  const weaker = scoreDelta >= 0 ? left : right;
  const isSame = left.code === right.code;

  const LEFT_COLOR = "#cdd6e4";
  const RIGHT_COLOR = "#bfa15c";

  return (
    <PassportIndexShell
      active="compare"
      eyebrow="Passport comparison"
      title="Compare two passports, then understand what the gap means."
      description="A visa-free score difference becomes useful only when it is connected to budget, timeline, family needs, and program eligibility."
    >
      <section className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6">
        <div className="grid gap-5 lg:grid-cols-[300px_1fr]">

          {/* ── Left selector panel ── */}
          <aside className="flex flex-col gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-xl shadow-black/30 backdrop-blur-sm">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#bfa15c]">Compare passports</p>
              <h2 className={`${serifClass} mt-1 text-lg font-medium text-white`}>Choose two passports</h2>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/60">
                Select a current passport and a target, then review the gap and what it means for your client.
              </p>
            </div>

            {/* Selectors */}
            <div className="grid gap-3">
              <PassportSelect
                id="passport-left"
                label="Current passport"
                accentColor={LEFT_COLOR}
                records={records}
                value={leftCode}
                onChange={setLeftCode}
              />

              {/* VS divider */}
              <div className="flex items-center gap-3">
                <span className="flex-1 border-t border-dashed border-white/15" />
                <span className="flex size-7 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-[10px] font-semibold text-white/60">
                  VS
                </span>
                <span className="flex-1 border-t border-dashed border-white/15" />
              </div>

              <PassportSelect
                id="passport-right"
                label="Target passport"
                accentColor={RIGHT_COLOR}
                records={records}
                value={rightCode}
                onChange={setRightCode}
              />
            </div>

            {/* Mobility gap */}
            {isSame ? (
              <div className="rounded-lg border border-white/12 bg-white/[0.04] p-4 text-center">
                <p className="text-[12.5px] text-white/60">Select two different passports to see the mobility gap.</p>
              </div>
            ) : (
              <div className={[
                "rounded-lg border p-4",
                scoreDelta > 0 ? "border-[#bfa15c]/40 bg-[#bfa15c]/[0.1]" : "border-white/12 bg-white/[0.04]",
              ].join(" ")}>
                <div className="flex items-center gap-2">
                  <TrendingUp className={`size-4 ${scoreDelta >= 0 ? "text-[#bfa15c]" : "text-white/60"}`} />
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${scoreDelta >= 0 ? "text-[#bfa15c]" : "text-white/60"}`}>
                    Mobility gap
                  </p>
                </div>
                <p className={`mt-2 text-4xl font-semibold tabular-nums ${scoreDelta >= 0 ? "text-[#bfa15c]" : "text-white"}`}>
                  {scoreDelta >= 0 ? "+" : ""}{scoreDelta}
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-white/60">
                  <span className="font-semibold text-white">{stronger.country}</span> currently shows stronger visa-free access than{" "}
                  <span className="font-semibold text-white">{weaker.country}</span>.
                </p>
              </div>
            )}

            {/* CTA */}
            <Link
              href="/personal-booking"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#bfa15c] px-4 py-2.5 text-[13px] font-semibold text-[#0c1f3f] transition hover:bg-[#d8bd78]"
            >
              Talk to an advisor <ArrowRight className="size-3.5" />
            </Link>
          </aside>

          {/* ── Right content ── */}
          <div className="flex flex-col gap-5">

            {/* Two passport cards */}
            <div className="grid gap-5 sm:grid-cols-2">
              <PassportCard record={left} stats={stats} accentColor={LEFT_COLOR} label="Current" />
              <PassportCard record={right} stats={stats} accentColor={RIGHT_COLOR} label="Target" />
            </div>

            {/* XIPHIAS interpretation */}
            <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-xl shadow-black/30 backdrop-blur-sm">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#bfa15c]">Advisor interpretation</p>
              <h2 className={`${serifClass} mt-1.5 text-xl font-medium text-white`}>What XIPHIAS checks next</h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { text: "Whether the target route is residence, citizenship, skilled migration, or corporate mobility." },
                  { text: "Whether the family can satisfy budget, source-of-funds, document, and physical-presence rules." },
                  { text: "Whether the mobility gain is worth the timeline, tax, risk, and compliance obligations." },
                ].map((item) => (
                  <div key={item.text} className="flex gap-2.5 rounded-lg border border-white/12 bg-white/[0.04] p-3.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#bfa15c]" aria-hidden="true" />
                    <p className="text-[12.5px] leading-[1.6] text-white/60">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/eligibility"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#bfa15c] px-4 py-2.5 text-[13px] font-semibold text-[#0c1f3f] transition hover:bg-[#d8bd78]"
                >
                  Run eligibility check <ArrowRight className="size-3.5" />
                </Link>
                <Link
                  href="/personal-booking"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-[13px] font-semibold text-[#bfa15c] transition hover:border-[#bfa15c] hover:bg-[#bfa15c]/10"
                >
                  Talk to advisor
                </Link>
              </div>
            </div>

            {/* Compliance reminder */}
            <div className="flex gap-3 rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-xl shadow-black/30 backdrop-blur-sm">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#bfa15c]/15 text-[#bfa15c]">
                <ShieldCheck className="size-4.5" />
              </span>
              <div>
                <h3 className="text-[13.5px] font-semibold text-white">Compliance reminder</h3>
                <p className="mt-1 text-[12.5px] leading-[1.65] text-white/60">
                  A high-ranking passport can still be the wrong route if source of funds, family eligibility, minimum stay, tax exposure, or sanction-screening risk does not fit the client profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PassportSourceNote />
    </PassportIndexShell>
  );
}
