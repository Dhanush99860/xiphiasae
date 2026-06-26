"use client";

// SAMPLE · Cost Estimator / Assessment tool reskin — VARIANT ① "Tool Panel".
// DARK navy hero (real image) → a single clean glass calculator panel:
// programme selector + dependants stepper + live INDICATIVE TOTAL + itemized
// breakdown. Data + cost model are REAL: figures mirror src/lib/cost-estimator.ts
// (track fractions, floors, per-applicant due diligence, service fee, per-dependent
// add-ons) and programmes/investment anchors come from the real programme catalog
// (src/lib/eligibility/programCatalog.ts). Images via @/components/Countries/country-image.

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarClock, Minus, Plus, Users } from "lucide-react";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { countryImage } from "@/components/Countries/country-image";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

// ── Cost model (verbatim from src/lib/cost-estimator.ts) ──────────────────────
type Track = "citizenship" | "residency";
type TrackCostModel = {
  govtFeePctOfInvestment: number;
  govtFeeFloorUsd: number;
  dueDiligencePerApplicantUsd: number;
  serviceFeeUsd: number;
  perDependentAddOnUsd: number;
};
const TRACK_MODEL: Record<Track, TrackCostModel> = {
  citizenship: { govtFeePctOfInvestment: 0.04, govtFeeFloorUsd: 6000, dueDiligencePerApplicantUsd: 7500, serviceFeeUsd: 25000, perDependentAddOnUsd: 15000 },
  residency: { govtFeePctOfInvestment: 0.03, govtFeeFloorUsd: 1500, dueDiligencePerApplicantUsd: 2000, serviceFeeUsd: 15000, perDependentAddOnUsd: 6000 },
};

// ── Real programmes (catalog + image slug) ────────────────────────────────────
type Programme = {
  id: string; title: string; country: string; slug: string; region: string;
  track: Track; investmentUsd: number; investmentLabel: string; timelineLabel: string;
};
const PROGRAMMES: Programme[] = [
  { id: "gd-cbi", title: "Grenada Citizenship by Investment", country: "Grenada", slug: "grenada", region: "Caribbean", track: "citizenship", investmentUsd: 235000, investmentLabel: "NTF donation route (indicative)", timelineLabel: "4–8 months" },
  { id: "dm-cbi", title: "Dominica Citizenship by Investment", country: "Dominica", slug: "dominica", region: "Caribbean", track: "citizenship", investmentUsd: 200000, investmentLabel: "EDF contribution route (indicative)", timelineLabel: "3–8 months" },
  { id: "ag-cbi", title: "Antigua & Barbuda Citizenship", country: "Antigua and Barbuda", slug: "antigua-barbuda", region: "Caribbean", track: "citizenship", investmentUsd: 230000, investmentLabel: "NDF contribution route (indicative)", timelineLabel: "4–8 months" },
  { id: "tr-cbi", title: "Turkey Citizenship by Investment", country: "Turkey", slug: "turkey", region: "Europe", track: "citizenship", investmentUsd: 400000, investmentLabel: "Real-estate route (indicative)", timelineLabel: "4–9 months" },
  { id: "vu-cbi", title: "Vanuatu Citizenship by Investment", country: "Vanuatu", slug: "vanuatu", region: "Asia-Pacific", track: "citizenship", investmentUsd: 130000, investmentLabel: "Approved contribution route (indicative)", timelineLabel: "2–4 months" },
  { id: "mt-cbi", title: "Malta (Exceptional Services)", country: "Malta", slug: "malta", region: "Europe", track: "citizenship", investmentUsd: 690000, investmentLabel: "Contribution + property & donation (indicative)", timelineLabel: "12–36 months" },
  { id: "pt-res", title: "Portugal Residency (Alt. routes)", country: "Portugal", slug: "portugal", region: "Europe", track: "residency", investmentUsd: 250000, investmentLabel: "Funds / cultural route (indicative)", timelineLabel: "6–12 months" },
  { id: "gr-res", title: "Greece Property Route Residency", country: "Greece", slug: "greece", region: "Europe", track: "residency", investmentUsd: 250000, investmentLabel: "Real-estate route, region dependent (indicative)", timelineLabel: "3–6 months" },
  { id: "uae-res", title: "UAE Residency / Golden Visa", country: "United Arab Emirates", slug: "uae", region: "Africa & Middle East", track: "residency", investmentUsd: 545000, investmentLabel: "Investor / real-estate route (indicative)", timelineLabel: "1–8 weeks" },
  { id: "us-eb5", title: "USA EB-5 Investor Immigrant Visa", country: "United States", slug: "usa", region: "Americas", track: "residency", investmentUsd: 800000, investmentLabel: "TEA qualifying investment (indicative)", timelineLabel: "18–48+ months" },
  { id: "ca-suv", title: "Canada Start-Up Visa", country: "Canada", slug: "canada", region: "Americas", track: "residency", investmentUsd: 250000, investmentLabel: "Settlement funds & business costs (indicative)", timelineLabel: "24–40+ months" },
  { id: "sg-gip", title: "Singapore Global Investor Programme", country: "Singapore", slug: "singapore", region: "Asia-Pacific", track: "residency", investmentUsd: 2000000, investmentLabel: "Qualifying investment route (indicative)", timelineLabel: "9–18+ months" },
];

const COST_DISCLAIMER =
  "Indicative only — figures vary by case, route, dependants and current government schedules. Advisor review required before any decision.";

type LineItem = { key: string; label: string; amountUsd: number; note: string };
function round(n: number) { return Math.max(0, Math.round(n)); }

function estimate(p: Programme, dependents: number) {
  const deps = Math.max(0, Math.min(8, Math.floor(dependents || 0)));
  const familySize = 1 + deps;
  const m = TRACK_MODEL[p.track];
  const base = Math.max(0, p.investmentUsd || 0);
  const items: LineItem[] = [];
  if (base > 0) items.push({ key: "investment", label: "Qualifying investment / contribution", amountUsd: base, note: p.investmentLabel });
  items.push({ key: "govt", label: "Government & application fees", amountUsd: round(Math.max(m.govtFeeFloorUsd, base * m.govtFeePctOfInvestment)), note: "Processing, application and issuance fees — schedule varies and changes often." });
  items.push({ key: "dd", label: `Due diligence & background checks (${familySize} ${familySize === 1 ? "applicant" : "applicants"})`, amountUsd: round(m.dueDiligencePerApplicantUsd * familySize), note: "Charged per applicant including dependants; mandatory on most investment routes." });
  if (deps > 0) items.push({ key: "dep", label: `Dependant government add-ons (${deps})`, amountUsd: round(m.perDependentAddOnUsd * deps), note: "Additional government charges for a spouse and/or dependent children." });
  items.push({ key: "svc", label: "XIPHIAS professional service fee", amountUsd: m.serviceFeeUsd, note: "End-to-end advisory, document readiness and filing support (indicative)." });
  const totalUsd = items.reduce((s, i) => s + i.amountUsd, 0);
  return { familySize, items, totalUsd };
}

const money = (usd: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(usd);

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none fixed left-5 top-5 z-[60] rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">{children}</div>;
}
function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />{children}<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span></p>;
}

const TRACKS = [
  { value: "all", label: "All" },
  { value: "citizenship", label: "Citizenship" },
  { value: "residency", label: "Residency" },
] as const;
type TrackFilter = (typeof TRACKS)[number]["value"];

export default function EstimatorPanel({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [trackFilter, setTrackFilter] = useState<TrackFilter>("all");
  const filtered = useMemo(() => PROGRAMMES.filter((p) => trackFilter === "all" || p.track === trackFilter), [trackFilter]);
  const [selectedId, setSelectedId] = useState(PROGRAMMES[0].id);
  const selected = useMemo(() => filtered.find((p) => p.id === selectedId) ?? filtered[0] ?? PROGRAMMES[0], [filtered, selectedId]);
  const [dependents, setDependents] = useState(0);
  const breakdown = useMemo(() => estimate(selected, dependents), [selected, dependents]);
  const heroImg = countryImage(selected.slug, selected.region);

  return (
    <div className="relative">
      <Badge>Sample · Cost Estimator · ① Tool Panel</Badge>
      <Header serifClass={serifClass} />

      {/* ── HERO (real full-bleed image, navy overlay for legibility) ── */}
      <section data-tone="dark" className="relative isolate overflow-hidden px-6 pb-16 pt-32 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <div className="absolute inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt={`${selected.country} — ${selected.title}`} className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 90% at 15% 0%, rgba(19,40,79,0.86) 0%, rgba(10,23,51,0.94) 60%, ${NAVY} 100%)` }} />
        </div>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}><a href="/" className="hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> XIA Intelligence / Cost Estimator</p>
          <p className="mt-7"><Eyebrow ar="حاسبة التكلفة">XIA · Cost Estimator</Eyebrow></p>
          <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.4rem,5.2vw,4.4rem)] font-medium leading-[1.02]`}>What will this route <span className="italic" style={{ color: GOLD }}>cost your family?</span></h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75">Choose a programme and your family size for an itemized, indicative estimate — qualifying investment, government fees, due diligence, dependant add-ons and our professional fee — ready for advisor review.</p>
        </div>
      </section>

      {/* ── CALCULATOR PANEL ── */}
      <section data-tone="dark" className="relative isolate px-6 pb-24 pt-16 sm:px-12 lg:px-20" style={{ background: `radial-gradient(120% 90% at 85% 0%, #13284f 0%, ${NAVY} 65%)` }}>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-7xl rounded-3xl border p-6 sm:p-10 lg:p-12" style={{ borderColor: `${GOLD}40`, background: "rgba(8,18,40,0.6)", boxShadow: "0 50px 130px -60px rgba(0,0,0,0.85)" }}>
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
            {/* Controls */}
            <div>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>1 · Choose a programme</h2>

              <div className="mt-3 flex flex-wrap gap-1 rounded-xl border p-1" style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}>
                {TRACKS.map((t) => {
                  const active = trackFilter === t.value;
                  return (
                    <button key={t.value} type="button" onClick={() => setTrackFilter(t.value)} className="relative rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors">
                      {active && <motion.span layoutId="ep-track-active" className="absolute inset-0 rounded-lg" style={{ background: GOLD }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 30 }} />}
                      <span className="relative" style={{ color: active ? NAVY : "rgba(238,243,251,0.6)" }}>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              <label className="mt-5 block">
                <span className="mb-1.5 block text-[12px] font-medium text-white/70">Programme</span>
                <select
                  value={selected.id}
                  onChange={(e) => setSelectedId(e.target.value)}
                  aria-label="Select a programme"
                  className="w-full appearance-none rounded-md border bg-[#0b1730] px-4 py-3 text-[15px] text-[#eef3fb] outline-none transition-colors focus:border-[#bfa15c] focus:ring-2 focus:ring-[#bfa15c]/60"
                  style={{ borderColor: `${GOLD}40` }}
                >
                  {filtered.map((p) => (<option key={p.id} value={p.id}>{p.country} — {p.title}</option>))}
                </select>
              </label>

              <h2 className="mt-7 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>2 · Family size</h2>
              <div className="mt-3 flex items-center justify-between rounded-xl border px-4 py-3" style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}>
                <span className="flex items-center gap-2 text-[14px] text-white/85"><Users className="size-4" style={{ color: GOLD }} /> Dependants (besides you)</span>
                <div className="flex items-center gap-3">
                  <motion.button whileTap={reduce ? undefined : { scale: 0.94 }} type="button" aria-label="Fewer dependants" onClick={() => setDependents((d) => Math.max(0, d - 1))} className="grid size-9 place-items-center rounded-lg border text-[#eef3fb] transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#bfa15c]/60" style={{ borderColor: `${GOLD}40` }}><Minus className="size-4" /></motion.button>
                  <span className="w-6 text-center text-lg font-black tabular-nums text-white">{dependents}</span>
                  <motion.button whileTap={reduce ? undefined : { scale: 0.94 }} type="button" aria-label="More dependants" onClick={() => setDependents((d) => Math.min(8, d + 1))} className="grid size-9 place-items-center rounded-lg border text-[#eef3fb] transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#bfa15c]/60" style={{ borderColor: `${GOLD}40` }}><Plus className="size-4" /></motion.button>
                </div>
              </div>
              <p className="mt-2 text-[12.5px] text-white/45">Total applicants: <span className="font-semibold tabular-nums text-white/80">{breakdown.familySize}</span> (you + {dependents})</p>

              <div className="mt-6 overflow-hidden rounded-2xl border" style={{ borderColor: `${GOLD}33` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={countryImage(selected.slug, selected.region)} alt={`${selected.country}`} className="h-32 w-full object-cover" />
                <div className="flex items-center justify-between gap-3 px-4 py-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <span className="text-[13px] font-semibold text-white/85">{selected.country}</span>
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] text-white/65"><CalendarClock className="size-4" style={{ color: GOLD }} /> {selected.timelineLabel}</span>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="rounded-2xl border p-6 sm:p-7" style={{ borderColor: `${GOLD}40`, background: "rgba(255,255,255,0.04)" }}>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>Indicative total</p>
              <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-1">
                <motion.span key={breakdown.totalUsd} initial={reduce ? false : { opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} className={`${serifClass} text-[clamp(2.2rem,5vw,3.4rem)] font-semibold leading-none tabular-nums`} style={{ color: GOLD }}>{money(breakdown.totalUsd)}</motion.span>
                <span className="pb-1 text-[14px] text-white/55">for {breakdown.familySize} {breakdown.familySize === 1 ? "applicant" : "applicants"}</span>
              </div>
              <span className="mt-3 inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ borderColor: `${GOLD}55`, color: GOLD }}>Indicative · advisor-reviewed</span>

              <h3 className="mt-6 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>Itemized estimate</h3>
              <ul className="mt-3 overflow-hidden rounded-2xl border" style={{ borderColor: `${GOLD}33` }}>
                {breakdown.items.map((item) => {
                  const pct = breakdown.totalUsd > 0 ? Math.round((item.amountUsd / breakdown.totalUsd) * 100) : 0;
                  return (
                    <li key={item.key} className="border-b px-4 py-3.5 last:border-b-0" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                      <div className="flex items-start justify-between gap-4">
                        <span className="min-w-0">
                          <span className="block text-[14px] font-semibold text-white">{item.label}</span>
                          <span className="mt-0.5 block text-[12px] leading-relaxed text-white/50">{item.note}</span>
                        </span>
                        <span className="shrink-0 text-[15px] font-black tabular-nums text-white">{money(item.amountUsd)}</span>
                      </div>
                      <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div className="h-full rounded-full" style={{ background: GOLD }} initial={reduce ? false : { width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
                      </div>
                    </li>
                  );
                })}
                <li className="flex items-center justify-between gap-4 px-4 py-3.5" style={{ background: `${GOLD}1f` }}>
                  <span className="text-[14px] font-black uppercase tracking-[0.1em]" style={{ color: GOLD }}>Estimated total</span>
                  <span className="text-[18px] font-black tabular-nums text-white">{money(breakdown.totalUsd)}</span>
                </li>
              </ul>
              <p className="mt-3 text-[12px] leading-relaxed text-white/45">{COST_DISCLAIMER}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA → /contact ── */}
      <section data-tone="dark" className="relative isolate px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: `radial-gradient(120% 100% at 50% 0%, #13284f 0%, ${NAVY} 60%)` }}>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-2xl">
          <p className="flex justify-center"><Eyebrow ar="ابدأ الآن">Your route, costed precisely</Eyebrow></p>
          <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-[1.05]`}>Turn this estimate into a <span className="italic" style={{ color: GOLD }}>committed plan.</span></h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/70">A senior advisor will refine these figures against current government schedules and your family structure — privately, under NDA.</p>
          <a href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-[14px] font-bold uppercase tracking-[0.14em] transition-colors" style={{ background: GOLD, color: NAVY }}>
            Request a private consultation <ArrowRight className="size-4" />
          </a>
          <p className="mt-4 text-[12.5px]" style={{ color: GOLD_DEEP }}>Indicative figures only — verified by your advisor before any decision.</p>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
