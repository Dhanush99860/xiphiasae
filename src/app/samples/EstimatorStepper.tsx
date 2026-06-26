"use client";

// VARIANT ③ "Guided Stepper" — concierge cost-estimator reskin for the XIA Utility tools.
// Real programme + cost data: programmes/min-investment mirror src/lib/eligibility/programCatalog.ts
// (via the parsed `investmentUsd` the explorer feeds the estimator); the estimate math replicates
// src/lib/cost-estimator.ts exactly (track model: govt fee %/floor, due-diligence/applicant,
// per-dependant add-on, flat service fee). Images via @/components/Countries/country-image.

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Users, Minus, Plus, Check, CalendarClock } from "lucide-react";

import LuxeHeader from "@/components/HomeLuxe/LuxeHeader";
import LuxeFooter from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { countryImage } from "@/components/Countries/country-image";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

// ── REAL programmes (from programCatalog.ts) — investmentUsd is the min realistic value
//    parseMoney() would extract from each minInvestmentUSD string. ──────────────────────
type Track = "citizenship" | "residency" | "skilled" | "corporate";
type Prog = {
  id: string; title: string; country: string; countrySlug: string; region?: string;
  track: Track; investmentUsd: number; investmentLabel: string; timelineLabel: string;
};
const PROGRAMS: Prog[] = [
  { id: "tr-cbi", title: "Turkey Citizenship by Investment", country: "Turkey", countrySlug: "turkey", track: "citizenship", investmentUsd: 400_000, investmentLabel: "USD 400k+ real estate route; other options vary", timelineLabel: "4-9 months" },
  { id: "gd-cbi", title: "Grenada Citizenship by Investment", country: "Grenada", countrySlug: "grenada", track: "citizenship", investmentUsd: 235_000, investmentLabel: "USD 235k+ indicative contribution plus fees", timelineLabel: "4-8 months" },
  { id: "mt-cbi", title: "Malta (Exceptional Services)", country: "Malta", countrySlug: "malta", track: "citizenship", investmentUsd: 600_000, investmentLabel: "≈ 600k–750k+ contribution + property & donation", timelineLabel: "12–36 months" },
  { id: "vu-cbi", title: "Vanuatu Citizenship by Investment", country: "Vanuatu", countrySlug: "vanuatu", track: "citizenship", investmentUsd: 130_000, investmentLabel: "USD 130k+ indicative donation route plus fees", timelineLabel: "2-4 months" },
  { id: "gr-property", title: "Greece Property Route", country: "Greece", countrySlug: "greece", track: "residency", investmentUsd: 250_000, investmentLabel: "≈ 250k–800k+ (region dependent)", timelineLabel: "3–6 months" },
  { id: "pt-alt", title: "Portugal (Alt. routes)", country: "Portugal", countrySlug: "portugal", track: "residency", investmentUsd: 200_000, investmentLabel: "≈ 200k–500k+ (route dependent)", timelineLabel: "6–12 months" },
  { id: "us-eb5", title: "USA EB-5 Investor Immigrant Visa", country: "United States", countrySlug: "usa", track: "residency", investmentUsd: 800_000, investmentLabel: "USD 800k+ TEA / USD 1.05M+ standard + fees", timelineLabel: "18-48+ months" },
  { id: "ca-suv", title: "Canada Start-Up Visa", country: "Canada", countrySlug: "canada", track: "residency", investmentUsd: 0, investmentLabel: "No fixed government investment; settlement funds apply", timelineLabel: "24-40+ months" },
  { id: "ca-express", title: "Canada Express Entry", country: "Canada", countrySlug: "canada", track: "skilled", investmentUsd: 0, investmentLabel: "No investment route", timelineLabel: "6–12 months" },
];

// ── Cost model — replicates src/lib/cost-estimator.ts (indicative; advisor review required). ──
const TRACK_MODEL: Record<Track, { govtPct: number; govtFloor: number; ddPerApplicant: number; service: number; perDependent: number }> = {
  citizenship: { govtPct: 0.04, govtFloor: 6000, ddPerApplicant: 7500, service: 25000, perDependent: 15000 },
  residency: { govtPct: 0.03, govtFloor: 1500, ddPerApplicant: 2000, service: 15000, perDependent: 6000 },
  skilled: { govtPct: 0, govtFloor: 4000, ddPerApplicant: 600, service: 6000, perDependent: 2500 },
  corporate: { govtPct: 0.02, govtFloor: 3000, ddPerApplicant: 1000, service: 9000, perDependent: 3000 },
};
const DISCLAIMER =
  "Indicative only — figures vary by case, route, dependants and current government schedules. Advisor review required before any decision.";

const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n)));

function estimate(p: Prog, dependents: number) {
  const deps = Math.max(0, Math.min(8, Math.floor(dependents)));
  const familySize = 1 + deps;
  const m = TRACK_MODEL[p.track];
  const base = Math.max(0, p.investmentUsd);
  const items: { key: string; label: string; amount: number }[] = [];
  if (base > 0) items.push({ key: "investment", label: "Qualifying investment / contribution", amount: base });
  items.push({ key: "govt", label: "Government & application fees", amount: Math.round(Math.max(m.govtFloor, base * m.govtPct)) });
  items.push({ key: "dd", label: `Due diligence & background checks (${familySize} ${familySize === 1 ? "applicant" : "applicants"})`, amount: Math.round(m.ddPerApplicant * familySize) });
  if (deps > 0) items.push({ key: "deps", label: `Dependant government add-ons (${deps})`, amount: Math.round(m.perDependent * deps) });
  items.push({ key: "service", label: "XIPHIAS professional service fee", amount: m.service });
  const total = items.reduce((s, i) => s + i.amount, 0);
  return { familySize, items, total };
}

const STEPS = ["Choose programme", "Family size", "Your estimate"] as const;

export default function EstimatorStepper({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [selectedId, setSelectedId] = useState(PROGRAMS[0].id);
  const [dependents, setDependents] = useState(0);

  const selected = useMemo(() => PROGRAMS.find((p) => p.id === selectedId) ?? PROGRAMS[0], [selectedId]);
  const breakdown = useMemo(() => estimate(selected, dependents), [selected, dependents]);
  const img = countryImage(selected.countrySlug, selected.region);

  const anim = (d = 0) => (reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });

  return (
    <div className="relative min-h-screen bg-[#fbfaf7] text-[#0c1f3f]">
      <Ambient tone="light" />
      <LuxeHeader serifClass={serifClass} />

      {/* ── HERO ── */}
      <section className="relative isolate overflow-hidden bg-[#0a1733]">
        <Image src={img} alt={`${selected.country} — ${selected.title}`} fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: `radial-gradient(120% 120% at 50% 0%, rgba(19,40,79,0.55) 0%, ${NAVY} 72%)` }} />
        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center sm:py-36">
          <p className="text-[12px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>
            XIA · Cost Estimator
          </p>
          <p className="mt-3 text-[15px] tracking-[0.2em] text-[#eef3fb]/70 font-arabic-display" dir="rtl">
            تقدير التكلفة الموجّه
          </p>
          <h1 className={`mt-5 text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.04] text-[#fbfaf7] ${serifClass}`}>
            What will this route cost your family?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-[#eef3fb]/75">
            A calm, guided estimate — programme, family size, then an itemized indicative total covering
            government fees, due diligence, dependants and our professional service fee, ready for advisor review.
          </p>
        </div>
      </section>

      {/* ── STEPPER TOOL ── */}
      <section className="bg-[#f7f4ef]">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          {/* Gold progress indicator */}
          <ol className="mb-12 flex items-center justify-center gap-2 sm:gap-4" aria-label="Estimator progress">
            {STEPS.map((label, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <li key={label} className="flex items-center gap-2 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => i <= step && setStep(i)}
                    disabled={i > step}
                    className="flex items-center gap-2.5 disabled:cursor-not-allowed"
                    aria-current={active ? "step" : undefined}
                  >
                    <span
                      className="grid size-9 place-items-center rounded-full border text-[13px] font-bold tabular-nums transition-colors"
                      style={{
                        borderColor: active || done ? GOLD : "rgba(12,31,63,0.2)",
                        background: done ? GOLD : active ? "rgba(191,161,92,0.12)" : "transparent",
                        color: done ? NAVY : active ? GOLD_DEEP : "rgba(12,31,63,0.45)",
                      }}
                    >
                      {done ? <Check className="size-4" /> : i + 1}
                    </span>
                    <span
                      className="hidden text-[13.5px] font-semibold sm:inline"
                      style={{ color: active ? GOLD_DEEP : done ? "#0c1f3f" : "rgba(12,31,63,0.45)" }}
                    >
                      {label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && <span className="h-px w-6 sm:w-10" style={{ background: i < step ? GOLD : "rgba(12,31,63,0.18)" }} />}
                </li>
              );
            })}
          </ol>

          {/* ── STEP 1: programme ── */}
          {step === 0 && (
            <motion.div key="s1" {...anim()} className="rounded-3xl border border-[#bfa15c]/40 bg-white p-7 sm:p-9 shadow-[0_24px_60px_-30px_rgba(10,23,51,0.4)]">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD_DEEP }}>Step 1 — Choose your programme</h2>
              <label htmlFor="programme" className="mt-4 block text-[14px] font-medium text-[#0c1f3f]/70">Programme</label>
              <select
                id="programme"
                value={selected.id}
                onChange={(e) => setSelectedId(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#0a1733]/15 bg-[#0a1733] px-4 py-3.5 text-[15px] font-medium text-[#fbfaf7] outline-none transition focus:border-[#bfa15c] focus:ring-2 focus:ring-[#bfa15c]/60"
              >
                {PROGRAMS.map((p) => (
                  <option key={p.id} value={p.id}>{p.country} — {p.title}</option>
                ))}
              </select>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[#bfa15c]/35 bg-[#f7f4ef] px-4 py-3">
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#0c1f3f]/45">Qualifying investment</p>
                  <p className="mt-1 text-[14px] font-semibold text-[#0c1f3f]">{selected.investmentLabel}</p>
                </div>
                <div className="rounded-xl border border-[#bfa15c]/35 bg-[#f7f4ef] px-4 py-3">
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#0c1f3f]/45">Indicative timeline</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[14px] font-semibold text-[#0c1f3f]"><CalendarClock className="size-4" style={{ color: GOLD_DEEP }} />{selected.timelineLabel}</p>
                </div>
              </div>
              <StepNav onNext={() => setStep(1)} nextLabel="Continue to family size" />
            </motion.div>
          )}

          {/* ── STEP 2: family ── */}
          {step === 1 && (
            <motion.div key="s2" {...anim()} className="rounded-3xl border border-[#bfa15c]/40 bg-white p-7 sm:p-9 shadow-[0_24px_60px_-30px_rgba(10,23,51,0.4)]">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD_DEEP }}>Step 2 — Your family size</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#0c1f3f]/70">
                How many dependants will join your application, besides you? This drives due-diligence
                charges per applicant and government add-ons for a spouse and children.
              </p>
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-[#bfa15c]/40 bg-[#f7f4ef] px-5 py-4">
                <span className="flex items-center gap-2.5 text-[15px] text-[#0c1f3f]/85"><Users className="size-5" style={{ color: GOLD_DEEP }} /> Dependants (besides you)</span>
                <div className="flex items-center gap-4">
                  <motion.button whileTap={reduce ? undefined : { scale: 0.92 }} type="button" aria-label="Fewer dependants" onClick={() => setDependents((d) => Math.max(0, d - 1))}
                    className="grid size-10 place-items-center rounded-lg border border-[#bfa15c]/45 bg-white text-[#0c1f3f] transition hover:border-[#bfa15c]"><Minus className="size-4" /></motion.button>
                  <span className="w-7 text-center text-2xl font-black tabular-nums text-[#0c1f3f]">{dependents}</span>
                  <motion.button whileTap={reduce ? undefined : { scale: 0.92 }} type="button" aria-label="More dependants" onClick={() => setDependents((d) => Math.min(8, d + 1))}
                    className="grid size-10 place-items-center rounded-lg border border-[#bfa15c]/45 bg-white text-[#0c1f3f] transition hover:border-[#bfa15c]"><Plus className="size-4" /></motion.button>
                </div>
              </div>
              <p className="mt-3 text-[13px] text-[#0c1f3f]/50">Total applicants: <span className="font-semibold text-[#0c1f3f]/80 tabular-nums">{breakdown.familySize}</span> (you + {dependents})</p>
              <StepNav onBack={() => setStep(0)} onNext={() => setStep(2)} nextLabel="See your estimate" />
            </motion.div>
          )}

          {/* ── STEP 3: result summary card ── */}
          {step === 2 && (
            <motion.div key="s3" {...anim()} className="overflow-hidden rounded-3xl border border-[#bfa15c]/40 bg-white shadow-[0_24px_60px_-30px_rgba(10,23,51,0.4)]">
              <div className="relative isolate h-44 sm:h-52">
                <Image src={img} alt={`${selected.country} — ${selected.title}`} fill sizes="(max-width:768px) 100vw, 900px" className="object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${NAVY} 6%, rgba(10,23,51,0.35) 70%, rgba(10,23,51,0.1) 100%)` }} />
                <div className="absolute bottom-4 left-6 right-6">
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>{selected.country}</p>
                  <p className={`text-[22px] leading-tight text-[#fbfaf7] ${serifClass}`}>{selected.title}</p>
                </div>
              </div>
              <div className="p-7 sm:p-9">
                <p className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD_DEEP }}>Indicative total</p>
                <div className="mt-1.5 flex flex-wrap items-end gap-x-4 gap-y-1">
                  <span className="text-[clamp(2.2rem,6vw,3.4rem)] font-black leading-none tabular-nums text-[#0c1f3f]">{usd(breakdown.total)}</span>
                  <span className="pb-1 text-[14px] text-[#0c1f3f]/55">for {breakdown.familySize} {breakdown.familySize === 1 ? "applicant" : "applicants"} · {selected.timelineLabel}</span>
                </div>

                <h3 className="mt-7 text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD_DEEP }}>Itemized estimate</h3>
                <ul className="mt-3 divide-y divide-[#bfa15c]/15 rounded-2xl border border-[#bfa15c]/35 bg-[#f7f4ef]/60">
                  {breakdown.items.map((it) => (
                    <li key={it.key} className="flex items-center justify-between gap-4 px-4 py-3.5">
                      <span className="text-[14px] font-medium text-[#0c1f3f]/85">{it.label}</span>
                      <span className="shrink-0 text-[15px] font-black tabular-nums text-[#0c1f3f]">{usd(it.amount)}</span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between gap-4 rounded-b-2xl px-4 py-3.5" style={{ background: "rgba(191,161,92,0.14)" }}>
                    <span className="text-[13.5px] font-black uppercase tracking-[0.1em]" style={{ color: GOLD_DEEP }}>Estimated total</span>
                    <span className="text-[18px] font-black tabular-nums text-[#0c1f3f]">{usd(breakdown.total)}</span>
                  </li>
                </ul>
                <p className="mt-3 text-[12px] leading-relaxed text-[#0c1f3f]/45">{DISCLAIMER}</p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-bold transition" style={{ background: GOLD, color: NAVY }}>
                    Discuss this route with an advisor <ArrowRight className="size-4" />
                  </Link>
                  <button type="button" onClick={() => setStep(0)} className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#bfa15c]/45 px-5 py-3.5 text-[14px] font-semibold text-[#0c1f3f] transition hover:border-[#bfa15c]">
                    Start a new estimate
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="relative isolate overflow-hidden bg-[#0a1733]">
        <div className="absolute inset-0" style={{ background: `radial-gradient(100% 120% at 50% 0%, rgba(19,40,79,0.9) 0%, ${NAVY} 70%)` }} />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>Concierge guidance</p>
          <h2 className={`mt-4 text-[clamp(2rem,4.5vw,3rem)] leading-tight text-[#fbfaf7] ${serifClass}`}>
            Turn an estimate into a verified plan
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-[#eef3fb]/75">
            Every figure here is indicative. Speak with a XIPHIAS advisor to confirm current government
            schedules, structure dependants and lock a route to your goals.
          </p>
          <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-4 text-[14.5px] font-bold transition" style={{ background: GOLD, color: NAVY }}>
            Speak with an advisor <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <LuxeFooter serifClass={serifClass} />
    </div>
  );
}

function StepNav({ onBack, onNext, nextLabel }: { onBack?: () => void; onNext: () => void; nextLabel: string }) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      {onBack ? (
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 rounded-xl border border-[#bfa15c]/45 px-5 py-3 text-[13.5px] font-semibold text-[#0c1f3f] transition hover:border-[#bfa15c]">
          Back
        </button>
      ) : <span />}
      <button type="button" onClick={onNext} className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold transition" style={{ background: GOLD, color: NAVY }}>
        {nextLabel} <ArrowRight className="size-4" />
      </button>
    </div>
  );
}
