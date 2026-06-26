"use client";

// Sample · XIA Cost Estimator reskin — VARIANT ② "Split Estimator".
// App-like two-pane tool: LEFT inputs on navy glass, RIGHT live results spotlight.
// Cost model + figures mirror src/lib/cost-estimator.ts (TRACK_MODEL) and the
// REAL programme/cost labels from src/lib/eligibility/programCatalog.ts.
// Country imagery via @/components/Countries/country-image (countryImage).

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { countryImage } from "@/components/Countries/country-image";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

// REAL track cost model — copied from src/lib/cost-estimator.ts (TRACK_MODEL).
type Track = "citizenship" | "residency" | "skilled" | "corporate";
const TRACK_MODEL: Record<Track, {
  govtFeePctOfInvestment: number;
  govtFeeFloorUsd: number;
  dueDiligencePerApplicantUsd: number;
  serviceFeeUsd: number;
  perDependentAddOnUsd: number;
}> = {
  citizenship: { govtFeePctOfInvestment: 0.04, govtFeeFloorUsd: 6000, dueDiligencePerApplicantUsd: 7500, serviceFeeUsd: 25000, perDependentAddOnUsd: 15000 },
  residency: { govtFeePctOfInvestment: 0.03, govtFeeFloorUsd: 1500, dueDiligencePerApplicantUsd: 2000, serviceFeeUsd: 15000, perDependentAddOnUsd: 6000 },
  skilled: { govtFeePctOfInvestment: 0, govtFeeFloorUsd: 4000, dueDiligencePerApplicantUsd: 600, serviceFeeUsd: 6000, perDependentAddOnUsd: 2500 },
  corporate: { govtFeePctOfInvestment: 0.02, govtFeeFloorUsd: 3000, dueDiligencePerApplicantUsd: 1000, serviceFeeUsd: 9000, perDependentAddOnUsd: 3000 },
};

const COST_DISCLAIMER =
  "Indicative only — figures vary by case, route, dependants and current government schedules. Advisor review required before any decision.";

// REAL programmes — name / country / investment + timeline LABELS verbatim from
// programCatalog.ts; investmentUsd anchors parsed the same way as programme-explorer.
type Programme = {
  id: string; title: string; country: string; slug: string; track: Track;
  investmentUsd: number; investmentLabel: string; timelineLabel: string;
};
const PROGRAMMES: Programme[] = [
  { id: "uae-golden", title: "UAE Golden Visa", country: "United Arab Emirates", slug: "uae", track: "residency", investmentUsd: 250000, investmentLabel: "Real estate ≈ AED 2M+ (or other qualifying routes)", timelineLabel: "2–6 weeks (route dependent)" },
  { id: "gr-property", title: "Greece Property Route", country: "Greece", slug: "greece", track: "residency", investmentUsd: 250000, investmentLabel: "≈ 250k–800k+ (region dependent)", timelineLabel: "3–6 months (typical after purchase)" },
  { id: "pt-alt", title: "Portugal (Alt. routes)", country: "Portugal", slug: "portugal", track: "residency", investmentUsd: 200000, investmentLabel: "≈ 200k–500k+ (route dependent)", timelineLabel: "6–12 months (typical)" },
  { id: "us-eb5", title: "USA EB-5 Investor Immigrant Visa", country: "United States", slug: "usa", track: "residency", investmentUsd: 800000, investmentLabel: "USD 800k+ TEA / USD 1.05M+ standard + fees", timelineLabel: "18-48+ months" },
  { id: "tr-cbi", title: "Turkey Citizenship by Investment", country: "Turkey", slug: "turkey", track: "citizenship", investmentUsd: 400000, investmentLabel: "USD 400k+ real estate route; other options vary", timelineLabel: "4-9 months" },
  { id: "gd-cbi", title: "Grenada Citizenship by Investment", country: "Grenada", slug: "grenada", track: "citizenship", investmentUsd: 235000, investmentLabel: "USD 235k+ indicative contribution plus fees", timelineLabel: "4-8 months (due diligence dependent)" },
  { id: "dm-cbi", title: "Dominica Citizenship by Investment", country: "Dominica", slug: "dominica", track: "citizenship", investmentUsd: 200000, investmentLabel: "USD 200k+ indicative route plus fees", timelineLabel: "4-8 months (due diligence dependent)" },
  { id: "ag-cbi", title: "Antigua and Barbuda Citizenship by Investment", country: "Antigua and Barbuda", slug: "antigua-barbuda", track: "citizenship", investmentUsd: 230000, investmentLabel: "USD 230k+ indicative contribution plus fees", timelineLabel: "4-8 months (due diligence dependent)" },
  { id: "vu-cbi", title: "Vanuatu Citizenship by Investment", country: "Vanuatu", slug: "vanuatu", track: "citizenship", investmentUsd: 130000, investmentLabel: "USD 130k+ indicative donation route plus fees", timelineLabel: "2-4 months (case dependent)" },
  { id: "ca-suv", title: "Canada Start-Up Visa", country: "Canada", slug: "canada", track: "residency", investmentUsd: 250000, investmentLabel: "Settlement funds and business costs apply", timelineLabel: "24-40+ months" },
  { id: "sg-gip", title: "Singapore Global Investor Programme", country: "Singapore", slug: "singapore", track: "residency", investmentUsd: 250000, investmentLabel: "High-capital route; qualifying investment options apply", timelineLabel: "9-18+ months (case dependent)" },
  { id: "ca-express", title: "Canada Express Entry", country: "Canada", slug: "canada", track: "skilled", investmentUsd: 0, investmentLabel: "No investment route", timelineLabel: "6–12 months after ITA" },
  { id: "uae-corp", title: "UAE Golden Visa (Corporate)", country: "United Arab Emirates", slug: "uae", track: "corporate", investmentUsd: 250000, investmentLabel: "Real estate ≈ AED 2M+ (or other qualifying routes)", timelineLabel: "2–6 weeks (route dependent)" },
];

const TRACK_LABEL: Record<Track, string> = { citizenship: "Citizenship", residency: "Residency", skilled: "Skilled", corporate: "Corporate" };

function round(n: number) { return Math.max(0, Math.round(n)); }

// estimateCost — mirrors src/lib/cost-estimator.ts.
function estimate(p: Programme, dependents: number) {
  const deps = Math.max(0, Math.min(8, Math.floor(dependents || 0)));
  const familySize = 1 + deps;
  const m = TRACK_MODEL[p.track];
  const base = Math.max(0, p.investmentUsd || 0);
  const items: { key: string; label: string; amountUsd: number }[] = [];
  if (base > 0) items.push({ key: "investment", label: "Qualifying investment / contribution", amountUsd: base });
  items.push({ key: "govt", label: "Government & application fees", amountUsd: round(Math.max(m.govtFeeFloorUsd, base * m.govtFeePctOfInvestment)) });
  items.push({ key: "dd", label: `Due diligence & background checks (${familySize} ${familySize === 1 ? "applicant" : "applicants"})`, amountUsd: round(m.dueDiligencePerApplicantUsd * familySize) });
  if (deps > 0) items.push({ key: "deps", label: `Dependant government add-ons (${deps})`, amountUsd: round(m.perDependentAddOnUsd * deps) });
  items.push({ key: "service", label: "XIPHIAS professional service fee", amountUsd: m.serviceFeeUsd });
  const totalUsd = items.reduce((s, i) => s + i.amountUsd, 0);
  return { familySize, baseUsd: base, items, totalUsd };
}

const money = (usd: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(usd);

function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />{children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}

export default function EstimatorSplit({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [track, setTrack] = useState<"all" | Track>("all");
  const filtered = useMemo(() => PROGRAMMES.filter((p) => track === "all" || p.track === track), [track]);
  const [selectedId, setSelectedId] = useState(PROGRAMMES[0].id);
  const selected = useMemo(() => filtered.find((p) => p.id === selectedId) ?? filtered[0] ?? PROGRAMMES[0], [filtered, selectedId]);
  const [dependents, setDependents] = useState(0);
  const breakdown = useMemo(() => estimate(selected, dependents), [selected, dependents]);
  const img = countryImage(selected.slug);

  const TRACKS: ("all" | Track)[] = ["all", "citizenship", "residency", "skilled", "corporate"];

  return (
    <div className="relative">
      <div className="pointer-events-none fixed left-5 top-5 z-[60] rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
        Sample · Cost estimator ② Split
      </div>
      <Header serifClass={serifClass} />

      {/* HERO — full-bleed image + the split tool on navy glass */}
      <section data-tone="dark" className="relative isolate overflow-hidden px-6 pb-24 pt-32 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <div className="absolute inset-0 -z-10">
          <Image src={img} alt={`${selected.country} — ${selected.title}`} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 100% at 12% 0%, rgba(19,40,79,0.86) 0%, ${NAVY}f0 55%, ${NAVY} 100%)` }} />
        </div>
        <Ambient tone="dark" />

        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
            <a href="/" className="hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> XIA tools <span style={{ color: GOLD }}>/</span> Cost estimator
          </p>
          <div className="mt-7"><Eyebrow ar="حاسبة التكلفة">XIA · Cost estimator</Eyebrow></div>
          <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.5rem,5.4vw,4.4rem)] font-medium leading-[1.02]`}>
            What will this route <span className="italic" style={{ color: GOLD }}>cost your family?</span>
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">
            Choose a programme and your family size for an itemized, indicative estimate — investment, government fees, due
            diligence and professional fees — ready for advisor review.
          </p>

          {/* Split two-pane */}
          <div className="mt-12 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            {/* LEFT · inputs on navy glass */}
            <div className="rounded-2xl border p-6 sm:p-7" style={{ borderColor: `${GOLD}40`, background: "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))", backdropFilter: "blur(6px)" }}>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: GOLD }}>1 · Choose a programme</h2>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {TRACKS.map((t) => {
                  const active = track === t;
                  return (
                    <button key={t} type="button" onClick={() => setTrack(t)}
                      className="rounded-full border px-3.5 py-1.5 text-[12px] font-semibold capitalize transition-colors"
                      style={{ borderColor: active ? GOLD : "rgba(255,255,255,0.2)", background: active ? GOLD : "transparent", color: active ? NAVY : "rgba(238,243,251,0.7)" }}>
                      {t === "all" ? "All" : TRACK_LABEL[t]}
                    </button>
                  );
                })}
              </div>

              <label className="mt-5 block">
                <span className="text-[12px] font-medium text-white/65">Programme</span>
                <select
                  value={selected.id}
                  onChange={(e) => setSelectedId(e.target.value)}
                  aria-label="Select a programme"
                  className="mt-1.5 w-full rounded-md border bg-[#0a1733] px-4 py-3 text-[15px] text-[#eef3fb] outline-none transition-colors focus:ring-2"
                  style={{ borderColor: `${GOLD}55`, ["--tw-ring-color" as string]: GOLD }}
                >
                  {filtered.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#0a1733] text-[#eef3fb]">
                      {p.country} — {p.title}
                    </option>
                  ))}
                </select>
              </label>

              <h2 className="mt-7 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: GOLD }}>2 · Family size</h2>
              <div className="mt-3 flex items-center justify-between rounded-xl border px-4 py-3" style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}>
                <span className="text-[14px] text-white/80">Dependants (besides you)</span>
                <div className="flex items-center gap-3">
                  <motion.button whileTap={reduce ? undefined : { scale: 0.94 }} type="button" aria-label="Fewer dependants"
                    onClick={() => setDependents((d) => Math.max(0, d - 1))}
                    className="grid size-9 place-items-center rounded-lg border text-[#eef3fb] transition-colors hover:bg-white/10" style={{ borderColor: `${GOLD}55` }}>–</motion.button>
                  <span className="w-6 text-center text-lg font-black tabular-nums">{dependents}</span>
                  <motion.button whileTap={reduce ? undefined : { scale: 0.94 }} type="button" aria-label="More dependants"
                    onClick={() => setDependents((d) => Math.min(8, d + 1))}
                    className="grid size-9 place-items-center rounded-lg border text-[#eef3fb] transition-colors hover:bg-white/10" style={{ borderColor: `${GOLD}55` }}>+</motion.button>
                </div>
              </div>
              <p className="mt-2 text-[12.5px] text-white/45">
                Total applicants: <span className="font-semibold text-white/75 tabular-nums">{breakdown.familySize}</span> (you + {dependents})
              </p>

              <p className="mt-6 rounded-lg border px-4 py-3 text-[12px] leading-relaxed text-white/55" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                {COST_DISCLAIMER}
              </p>
            </div>

            {/* RIGHT · live results spotlight on light */}
            <motion.div key={selected.id + dependents} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
              className="overflow-hidden rounded-2xl border bg-[#fbfaf7] text-[#0c1f3f]" style={{ borderColor: `${GOLD}40`, boxShadow: "0 40px 110px -50px rgba(0,0,0,0.7)" }}>
              <div className="relative h-44 w-full">
                <Image src={img} alt={`${selected.country} — ${selected.title}`} fill sizes="(max-width:1024px) 100vw, 560px" className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,23,51,0.15) 0%, rgba(10,23,51,0.78) 100%)" }} />
                <div className="absolute bottom-4 left-5 right-5 text-[#eef3fb]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{TRACK_LABEL[selected.track]} · {selected.country}</p>
                  <p className={`${serifClass} mt-1 text-[1.55rem] font-medium leading-tight`}>{selected.title}</p>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD_DEEP }}>Indicative total</p>
                <div className="mt-1 flex flex-wrap items-end gap-x-3">
                  <motion.span key={breakdown.totalUsd} initial={reduce ? false : { opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
                    className={`${serifClass} text-[clamp(2.2rem,5vw,3.2rem)] font-medium leading-none tabular-nums`}>
                    {money(breakdown.totalUsd)}
                  </motion.span>
                  <span className="pb-1 text-[14px] text-[#0c1f3f]/55">for {breakdown.familySize} {breakdown.familySize === 1 ? "applicant" : "applicants"}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-[12.5px]">
                  <span className="rounded-lg border px-3 py-1.5" style={{ borderColor: `${GOLD}55`, background: "#f7f4ef", color: `${INK}cc` }}>Timeline: {selected.timelineLabel}</span>
                  <span className="rounded-lg border px-3 py-1.5" style={{ borderColor: `${GOLD}55`, color: GOLD_DEEP }}>Indicative</span>
                </div>

                {/* itemized breakdown — updates live */}
                <ul className="mt-5 divide-y rounded-xl border" style={{ borderColor: `${GOLD}33`, ["--tw-divide-opacity" as string]: "1" }}>
                  {breakdown.items.map((it) => {
                    const pct = breakdown.totalUsd ? Math.round((it.amountUsd / breakdown.totalUsd) * 100) : 0;
                    return (
                      <li key={it.key} className="px-4 py-3" style={{ borderColor: `${GOLD}22` }}>
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-[13.5px] font-semibold">{it.label}</span>
                          <span className="shrink-0 text-[14px] font-black tabular-nums">{money(it.amountUsd)}</span>
                        </div>
                        <div className="mt-2 h-1 w-full overflow-hidden rounded-full" style={{ background: `${INK}12` }}>
                          <motion.div initial={false} animate={{ width: `${pct}%` }} transition={reduce ? { duration: 0 } : { duration: 0.4 }} className="h-full rounded-full" style={{ background: GOLD }} />
                        </div>
                      </li>
                    );
                  })}
                  <li className="flex items-center justify-between gap-4 rounded-b-xl px-4 py-3.5" style={{ background: `${GOLD}1f` }}>
                    <span className="text-[13px] font-black uppercase tracking-[0.1em]" style={{ color: GOLD_DEEP }}>Estimated total</span>
                    <span className="text-[17px] font-black tabular-nums">{money(breakdown.totalUsd)}</span>
                  </li>
                </ul>

                <a href="/contact" className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
                  Book a review <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA → /contact */}
      <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f7f4ef" }}>
        <Ambient tone="light" />
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow ar="تحدث مع مستشار"><span className="mx-auto">Speak with an advisor</span></Eyebrow>
          <h2 className={`${serifClass} mx-auto mt-5 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-medium`}>
            Turn an estimate into a <span className="italic" style={{ color: GOLD_DEEP }}>tailored plan.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-[#0c1f3f]/65">
            A senior advisor will validate these figures against current government schedules and map your route, cost and timeline — privately.
          </p>
          <a href="/contact" className="group mt-9 inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: NAVY, color: "#eef3fb" }}>
            Book a private review <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
