"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Minus, Plus, Scale, ShieldAlert, Users, X } from "lucide-react";

import Ambient from "@/components/HomeLuxe/Ambient";
import LuxeHeader from "@/components/HomeLuxe/LuxeHeader";
import LuxeFooter from "@/components/HomeLuxe/LuxeFooter";
import { CurrencyProvider, useCurrency } from "@/lib/CurrencyProvider";
import { GlassSelect } from "@/components/XiaTools/GlassSelect";
import { INDICATIVE_NOTE } from "@/components/XiaTools/ToolShell";
import { ComparisonTable, type CompareColumn, type CompareRow } from "./ComparisonTable";
import { estimateCost, type CostProgram } from "@/lib/cost-estimator";
import {
  passportRecordForCountry,
  PRESENCE_LABEL,
  PRESENCE_DETAIL,
  TAX_ADVISOR_NOTE,
  type PresenceKey,
} from "@/lib/program-metrics";
import { bandClass, ScorePill } from "@/components/PassportIndex/PassportIndexShared";
import { MeterBar } from "@/components/XiaTools/MeterBar";
import { passportIndexStats } from "@/data/passport-index";
import { BOOKING_ROUTE } from "@/lib/topmate";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

const CURRENCIES = [
  { value: "USD", label: "USD $" },
  { value: "INR", label: "INR ₹" },
  { value: "AED", label: "AED د.إ" },
  { value: "EUR", label: "EUR €" },
];

/** Currency picker tuned for the dark navy hero (gold label). */
function DarkCurrencyPicker() {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className="flex items-center gap-2 text-[13px] font-medium text-white/70">
      <span className="uppercase tracking-wide">Currency</span>
      <GlassSelect
        value={currency}
        onChange={(v) => setCurrency(v as "USD" | "INR" | "AED" | "EUR")}
        options={CURRENCIES}
        className="w-[112px]"
        ariaLabel="Select display currency"
      />
    </div>
  );
}

export type ComparableProgram = CostProgram & {
  presence: PresenceKey;
  risk: "standard" | "enhanced" | "high";
  family: boolean;
};

const MAX = 4;

export default function ProgramComparisonClient({
  programs,
  serifClass,
}: {
  programs: ComparableProgram[];
  serifClass: string;
}) {
  return (
    <CurrencyProvider defaultCurrency="USD">
      <Inner programs={programs} serifClass={serifClass} />
    </CurrencyProvider>
  );
}

function useMoney() {
  const { currency, convert } = useCurrency();
  return (usd: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 0 }).format(
      convert(usd, "USD", currency),
    );
}

/** Gold "indicative" pill on the dark surface. */
function DarkIndicativeChip() {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
      style={{ borderColor: "rgba(191,161,92,0.45)", background: "rgba(191,161,92,0.1)", color: GOLD }}
    >
      <ShieldAlert className="size-3" />
      {INDICATIVE_NOTE}
    </span>
  );
}

/** Placeholder for data we deliberately do not fabricate — dark surface variant. */
function DarkAdvisorNote({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md border border-dashed px-2.5 py-1 text-[12px] font-medium text-white/55"
      style={{ borderColor: "rgba(191,161,92,0.4)", background: "rgba(255,255,255,0.03)" }}
    >
      <ShieldAlert className="size-3.5" style={{ color: "rgba(191,161,92,0.8)" }} />
      {children}
    </span>
  );
}

function PassportCell({ country }: { country: string }) {
  const rec = passportRecordForCountry(country);
  if (!rec) return <DarkAdvisorNote>Not in ranked snapshot</DarkAdvisorNote>;
  return (
    <div>
      <div className="flex items-center gap-2">
        <ScorePill score={rec.score} />
        <span className="text-[12px] text-white/55">{rec.rank}</span>
      </div>
      <MeterBar value={rec.score} max={passportIndexStats.topScore} color={GOLD} height="h-1.5" className="mt-2" />
      <span className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-[10.5px] font-black ${bandClass(rec.band)}`}>
        {rec.band}
      </span>
    </div>
  );
}

function firstDistinct(programs: ComparableProgram[], n: number) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of programs) {
    if (seen.has(p.country)) continue;
    seen.add(p.country);
    out.push(p.id);
    if (out.length >= n) break;
  }
  return out;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
      style={{ color: GOLD }}
    >
      <span className="h-px w-8" style={{ background: GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
        مقارنة البرامج
      </span>
    </p>
  );
}

function Inner({ programs, serifClass }: { programs: ComparableProgram[]; serifClass: string }) {
  const reduce = useReducedMotion();
  const money = useMoney();

  const byId = useMemo(() => new Map(programs.map((p) => [p.id, p])), [programs]);
  const [selectedIds, setSelectedIds] = useState<string[]>(() => firstDistinct(programs, 2));
  const [dependents, setDependents] = useState(0);

  const selected = selectedIds.map((id) => byId.get(id)).filter(Boolean) as ComparableProgram[];
  const remaining = programs.filter((p) => !selectedIds.includes(p.id));

  const add = (id: string) => {
    if (!id || selectedIds.includes(id) || selectedIds.length >= MAX) return;
    setSelectedIds((ids) => [...ids, id]);
  };
  const remove = (id: string) => setSelectedIds((ids) => ids.filter((x) => x !== id));

  const columns: CompareColumn[] = selected.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.country,
    href: p.href,
    imageSlug: p.countrySlug,
    onRemove: selected.length > 1 ? () => remove(p.id) : undefined,
  }));

  const rows: CompareRow[] = selected.length
    ? [
        {
          key: "cost",
          label: "Indicative cost",
          hint: `Family-tailored for ${1 + dependents} applicant(s)`,
          emphasize: true,
          cells: selected.map((p) => (
            <span className="text-[16px] font-black tabular-nums" style={{ color: GOLD }}>
              {money(estimateCost(p, dependents).totalUsd)}
            </span>
          )),
        },
        {
          key: "timeline",
          label: "Timeline",
          cells: selected.map((p) => <span>{p.timelineLabel}</span>),
        },
        {
          key: "presence",
          label: "Physical presence",
          hint: "Residency proxy — not day counts",
          cells: selected.map((p) => (
            <div>
              <span className="font-semibold text-[#eef3fb]">{PRESENCE_LABEL[p.presence]}</span>
              <span className="mt-0.5 block text-[12px] leading-snug text-white/50">{PRESENCE_DETAIL[p.presence]}</span>
            </div>
          )),
        },
        {
          key: "tax",
          label: "Tax position",
          cells: selected.map(() => <DarkAdvisorNote>{TAX_ADVISOR_NOTE}</DarkAdvisorNote>),
        },
        {
          key: "passport",
          label: "Passport power gained",
          hint: "Visa-free mobility of the destination passport",
          cells: selected.map((p) => <PassportCell country={p.country} />),
        },
        {
          key: "risk",
          label: "Due-diligence intensity",
          cells: selected.map((p) => (
            <span className="capitalize">{p.risk === "high" ? "High — enhanced checks" : p.risk}</span>
          )),
        },
      ]
    : [];

  const fade = reduce
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

  return (
    <div className="relative">
      <LuxeHeader serifClass={serifClass} />

      {/* ── HERO + COMPARISON (dark) ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-24 pt-28 text-[#eef3fb] sm:px-12 lg:px-16"
        style={{ background: `radial-gradient(120% 100% at 12% 0%, #13284f 0%, ${NAVY} 58%)` }}
      >
        <Ambient tone="dark" />

        <div className="relative z-10 mx-auto max-w-screen-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <motion.div {...fade}>
                <Eyebrow>XIA · Compare Programmes</Eyebrow>
              </motion.div>
              <h1 className={`${serifClass} mt-5 text-[clamp(2.4rem,5.4vw,4.4rem)] font-medium leading-[0.98]`}>
                Compare programmes on the numbers that matter.
              </h1>
              <motion.p
                {...(reduce
                  ? {}
                  : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: 0.2 } })}
                className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75"
              >
                Put 2–4 routes side by side — indicative cost, timeline, physical presence,
                tax position and the passport power you&apos;d gain.
              </motion.p>
            </div>
            <div className="shrink-0">
              <DarkCurrencyPicker />
            </div>
          </div>

          {/* Picker (raised z so its dropdown overlays the comparison table below) */}
          <div
            className="relative z-30 mt-10 rounded-3xl border p-5 sm:p-6"
            style={{ borderColor: "rgba(191,161,92,0.35)", background: "rgba(255,255,255,0.04)" }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <AnimatePresence initial={false} mode="popLayout">
                {selected.map((p) => (
                  <motion.span
                    key={p.id}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-semibold text-[#eef3fb]"
                    style={{ borderColor: "rgba(191,161,92,0.4)", background: "rgba(191,161,92,0.1)" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} aria-hidden />
                    {p.country} — {p.title}
                    {selected.length > 1 && (
                      <button
                        type="button"
                        aria-label={`Remove ${p.title}`}
                        onClick={() => remove(p.id)}
                        className="grid size-4 place-items-center rounded-full text-white/55 transition hover:text-[#bfa15c]"
                      >
                        <X className="size-3.5" />
                      </button>
                    )}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              {selectedIds.length < MAX ? (
                <div className="block w-full sm:max-w-md">
                  <span className="mb-1.5 block text-[12.5px] font-medium text-white/70">
                    Add a programme (up to {MAX})
                  </span>
                  <GlassSelect
                    value=""
                    onChange={add}
                    searchable
                    options={remaining.map((p) => ({ value: p.id, label: `${p.country} — ${p.title}` }))}
                    placeholder="Select a programme…"
                    ariaLabel="Add a programme to compare"
                  />
                </div>
              ) : (
                <p className="text-[13px] text-white/45">Maximum of {MAX} programmes — remove one to add another.</p>
              )}

              {/* Family size */}
              <div
                className="flex items-center gap-3 rounded-xl border px-4 py-2.5"
                style={{ borderColor: "rgba(191,161,92,0.4)", background: "rgba(255,255,255,0.04)" }}
              >
                <span className="flex items-center gap-2 text-[13px] text-white/75">
                  <Users className="size-4" style={{ color: GOLD }} /> Dependants
                </span>
                <button
                  type="button"
                  aria-label="Fewer dependants"
                  onClick={() => setDependents((d) => Math.max(0, d - 1))}
                  className="grid size-8 place-items-center rounded-lg border text-[#eef3fb] transition hover:bg-white/[0.06]"
                  style={{ borderColor: "rgba(191,161,92,0.4)" }}
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-5 text-center font-black tabular-nums text-[#eef3fb]">{dependents}</span>
                <button
                  type="button"
                  aria-label="More dependants"
                  onClick={() => setDependents((d) => Math.min(8, d + 1))}
                  className="grid size-8 place-items-center rounded-lg border text-[#eef3fb] transition hover:bg-white/[0.06]"
                  style={{ borderColor: "rgba(191,161,92,0.4)" }}
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mt-6">
            {selected.length >= 2 ? (
              <>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <DarkIndicativeChip />
                </div>
                <ComparisonTable columns={columns} rows={rows} />
              </>
            ) : (
              <div
                className="grid min-h-[200px] place-items-center rounded-3xl border border-dashed p-8 text-center"
                style={{ borderColor: "rgba(191,161,92,0.4)", background: "rgba(255,255,255,0.03)" }}
              >
                <div>
                  <Scale className="mx-auto size-7" style={{ color: GOLD }} />
                  <p className="mt-3 text-[15px] text-white/70">Add at least two programmes to compare.</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer CTAs */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/passport-index/compare"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-[14px] font-semibold text-[#eef3fb] transition hover:bg-white/[0.04]"
              style={{ borderColor: "rgba(191,161,92,0.4)" }}
            >
              Compare passports side by side
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={BOOKING_ROUTE}
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-bold transition"
              style={{ background: GOLD, color: NAVY }}
            >
              Discuss these routes with an advisor
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <LuxeFooter serifClass={serifClass} />
    </div>
  );
}
