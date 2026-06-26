"use client";

// Cost Estimator — VARIANT ① "Tool Panel" reskin (navy/gold luxury).
// DARK navy hero (real image) → a WIDE glass calculator panel: programme selector
// + dependants stepper + live INDICATIVE TOTAL + gated itemized breakdown + paid
// PDF report. PRESENTATION ONLY — all production logic is preserved verbatim:
// getProgrammeExplorerData/toCostProgram (server) → estimateCost, currency
// conversion, the LeadGate lead capture (/api/platform/lead), the JioPay PDF
// checkout (/api/payments/jiopay/create-checkout), dependants/estimate math, and
// every input/result. Imagery via @/components/Countries/country-image.

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarClock, FileDown, Loader2, Minus, Plus, Users } from "lucide-react";

import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { countryImage } from "@/components/Countries/country-image";
import { CurrencyProvider, useCurrency } from "@/lib/CurrencyProvider";
import { CurrencyGlassSelect } from "@/components/XiaTools/GlassSelect";
import { LeadGate } from "@/components/Eligibility/LeadGate";
import type { AnswerMap, Track } from "@/lib/eligibility/types";
import { estimateCost, COST_DISCLAIMER, type CostProgram } from "@/lib/cost-estimator";
import { BOOKING_ROUTE } from "@/lib/topmate";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

const TRACKS = [
  { value: "all", label: "All" },
  { value: "citizenship", label: "Citizenship" },
  { value: "residency", label: "Residency" },
  { value: "skilled", label: "Skilled" },
  { value: "corporate", label: "Corporate" },
] as const;
type TrackFilter = (typeof TRACKS)[number]["value"];

const SPRING = { type: "spring" as const, stiffness: 360, damping: 30 };

function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
        {ar}
      </span>
    </p>
  );
}

export default function CostEstimatorClient({
  programs,
  serifClass,
}: {
  programs: CostProgram[];
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

function Inner({ programs, serifClass }: { programs: CostProgram[]; serifClass: string }) {
  const reduce = useReducedMotion();
  const money = useMoney();

  const [trackFilter, setTrackFilter] = useState<TrackFilter>("all");
  const filtered = useMemo(
    () => programs.filter((p) => trackFilter === "all" || p.track === trackFilter),
    [programs, trackFilter],
  );
  const [selectedId, setSelectedId] = useState(programs[0]?.id ?? "");
  const selected = useMemo(
    () => filtered.find((p) => p.id === selectedId) ?? filtered[0] ?? programs[0],
    [filtered, selectedId, programs],
  );

  const [dependents, setDependents] = useState(0);
  const breakdown = useMemo(() => (selected ? estimateCost(selected, dependents) : null), [selected, dependents]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pdf, setPdf] = useState<{ loading: boolean; error: string | null }>({ loading: false, error: null });

  async function submitLead() {
    try {
      await fetch("/api/platform/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: "programme_ai",
          page: "/cost-estimator",
          track: selected!.track,
          country: selected!.country,
          program: selected!.title,
          message: `Cost estimator: ${selected!.title} · ${breakdown!.familySize} applicant(s) · ~${Math.round(breakdown!.totalUsd)} USD indicative`,
          consent: true,
          tags: ["cost-estimator", "xia-tools"],
        }),
      });
    } catch {
      /* soft capture — never block the UI on a network error */
    } finally {
      setUnlocked(true);
    }
  }

  async function startPdf() {
    if (!name || !email) return;
    setPdf({ loading: true, error: null });
    try {
      const res = await fetch("/api/payments/jiopay/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          productType: "premium_report",
          productName: `Cost estimate — ${selected!.title}`,
          track: selected!.track,
          country: selected!.country,
          program: selected!.title,
          page: "/cost-estimator",
          consent: true,
          answers: {
            program: selected!.title,
            dependents,
            familySize: breakdown!.familySize,
            estimatedTotalUsd: Math.round(breakdown!.totalUsd),
          },
        }),
      });
      const data = await res.json();
      if (data?.ok && data.checkoutUrl) {
        window.location.href = data.checkoutUrl as string;
        return;
      }
      setPdf({ loading: false, error: data?.error || "Could not start checkout. Please try again." });
    } catch {
      setPdf({ loading: false, error: "Could not start checkout. Please try again." });
    }
  }

  const heroImg = selected ? countryImage(selected.countrySlug, selected.country) : countryImage("uae", "United Arab Emirates");

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO (real full-bleed image, navy overlay for legibility) ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-16 pt-32 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <div className="absolute inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt={selected ? `${selected.country} — ${selected.title}` : "XIPHIAS"} className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 90% at 15% 0%, rgba(19,40,79,0.86) 0%, rgba(10,23,51,0.94) 60%, ${NAVY} 100%)`,
            }}
          />
        </div>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}>
            <a href="/" className="hover:text-[#bfa15c]">
              Home
            </a>{" "}
            <span style={{ color: GOLD }}>/</span> XIA Intelligence / Cost Estimator
          </p>
          <p className="mt-7">
            <Eyebrow ar="حاسبة التكلفة">XIA · Cost Estimator</Eyebrow>
          </p>
          <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.4rem,5.2vw,4.4rem)] font-medium leading-[1.02]`}>
            What will this route{" "}
            <span className="italic" style={{ color: GOLD }}>
              cost your family?
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75">
            Pick a programme and your family size for an itemized, indicative estimate — government fees, due diligence,
            dependants and professional fees — ready for advisor review.
          </p>
        </div>
      </section>

      {/* ── CALCULATOR PANEL ── */}
      <section
        data-tone="dark"
        className="relative isolate px-6 pb-24 pt-16 sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 90% at 85% 0%, #13284f 0%, ${NAVY} 65%)` }}
      >
        <Ambient tone="dark" />
        <div
          className="mx-auto max-w-7xl rounded-3xl border p-6 sm:p-10 lg:p-12"
          style={{ borderColor: `${GOLD}40`, background: "rgba(8,18,40,0.6)", boxShadow: "0 50px 130px -60px rgba(0,0,0,0.85)" }}
        >
          {/* Currency control */}
          <div className="mb-6 flex justify-end">
            <CurrencyGlassSelect />
          </div>

          {!selected || !breakdown ? (
            <div className="rounded-2xl border p-8 text-white/60" style={{ borderColor: `${GOLD}40` }}>
              No programmes are available right now.
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
              {/* ── Controls ── */}
              <div>
                <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
                  1 · Choose a programme
                </h2>

                {/* Track tabs — layoutId active indicator */}
                <div
                  className="mt-3 flex flex-wrap gap-1 rounded-xl border p-1"
                  style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
                >
                  {TRACKS.map((t) => {
                    const active = trackFilter === t.value;
                    return (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setTrackFilter(t.value)}
                        className="relative rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors"
                      >
                        {active && (
                          <motion.span
                            layoutId="ce-track-active"
                            className="absolute inset-0 rounded-lg"
                            style={{ background: GOLD }}
                            transition={reduce ? { duration: 0 } : SPRING}
                          />
                        )}
                        <span className="relative" style={{ color: active ? NAVY : "rgba(238,243,251,0.6)" }}>
                          {t.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Programme select */}
                <label className="mt-5 block">
                  <span className="mb-1.5 block text-[12px] font-medium text-white/70">Programme</span>
                  <select
                    value={selected.id}
                    onChange={(e) => setSelectedId(e.target.value)}
                    aria-label="Select a programme"
                    className="w-full appearance-none rounded-md border bg-[#0b1730] px-4 py-3 text-[15px] text-[#eef3fb] outline-none transition-colors focus:border-[#bfa15c] focus:ring-2 focus:ring-[#bfa15c]/60"
                    style={{ borderColor: `${GOLD}40` }}
                  >
                    {filtered.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.country} — {p.title}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Dependents stepper */}
                <h2 className="mt-7 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
                  2 · Family size
                </h2>
                <div
                  className="mt-3 flex items-center justify-between rounded-xl border px-4 py-3"
                  style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
                >
                  <span className="flex items-center gap-2 text-[14px] text-white/85">
                    <Users className="size-4" style={{ color: GOLD }} /> Dependants (besides you)
                  </span>
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileTap={reduce ? undefined : { scale: 0.94 }}
                      type="button"
                      aria-label="Fewer dependants"
                      onClick={() => setDependents((d) => Math.max(0, d - 1))}
                      className="grid size-9 place-items-center rounded-lg border text-[#eef3fb] transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#bfa15c]/60"
                      style={{ borderColor: `${GOLD}40` }}
                    >
                      <Minus className="size-4" />
                    </motion.button>
                    <span className="w-6 text-center text-lg font-black tabular-nums text-white">{dependents}</span>
                    <motion.button
                      whileTap={reduce ? undefined : { scale: 0.94 }}
                      type="button"
                      aria-label="More dependants"
                      onClick={() => setDependents((d) => Math.min(8, d + 1))}
                      className="grid size-9 place-items-center rounded-lg border text-[#eef3fb] transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#bfa15c]/60"
                      style={{ borderColor: `${GOLD}40` }}
                    >
                      <Plus className="size-4" />
                    </motion.button>
                  </div>
                </div>
                <p className="mt-2 text-[12.5px] text-white/45">
                  Total applicants:{" "}
                  <span className="font-semibold tabular-nums text-white/80">{breakdown.familySize}</span> (you +{" "}
                  {dependents})
                </p>

                {/* Programme imagery + timeline */}
                <div className="mt-6 overflow-hidden rounded-2xl border" style={{ borderColor: `${GOLD}33` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={countryImage(selected.countrySlug, selected.country)}
                    alt={selected.country}
                    className="h-32 w-full object-cover"
                  />
                  <div className="flex items-center justify-between gap-3 px-4 py-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <span className="text-[13px] font-semibold text-white/85">{selected.country}</span>
                    <span className="inline-flex items-center gap-1.5 text-[12.5px] text-white/65">
                      <CalendarClock className="size-4" style={{ color: GOLD }} /> {breakdown.timelineLabel}
                    </span>
                  </div>
                </div>

                <Link
                  href={selected.href}
                  className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-semibold transition-colors hover:opacity-80"
                  style={{ color: GOLD }}
                >
                  View the {selected.country} programme page
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              {/* ── Result ── */}
              <div
                className="rounded-2xl border p-6 sm:p-7"
                style={{ borderColor: `${GOLD}40`, background: "rgba(255,255,255,0.04)" }}
              >
                {/* Free top-line */}
                <p className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
                  Indicative total
                </p>
                <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-1">
                  <motion.span
                    key={breakdown.totalUsd}
                    initial={reduce ? false : { opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className={`${serifClass} text-[clamp(2.2rem,5vw,3.4rem)] font-semibold leading-none tabular-nums`}
                    style={{ color: GOLD }}
                  >
                    {money(breakdown.totalUsd)}
                  </motion.span>
                  <span className="pb-1 text-[14px] text-white/55">
                    for {breakdown.familySize} {breakdown.familySize === 1 ? "applicant" : "applicants"}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[13.5px] text-white/70">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5"
                    style={{ borderColor: `${GOLD}40`, background: "rgba(255,255,255,0.04)" }}
                  >
                    <CalendarClock className="size-4" style={{ color: GOLD }} /> Timeline: {breakdown.timelineLabel}
                  </span>
                  <span
                    className="inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
                    style={{ borderColor: `${GOLD}55`, color: GOLD }}
                  >
                    Indicative · advisor-reviewed
                  </span>
                </div>

                {/* Gated detail */}
                <div className="mt-6 min-h-[320px]">
                  <AnimatePresence mode="wait" initial={false}>
                    {!unlocked ? (
                      <motion.div
                        key="gate"
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                      >
                        <p className="mb-3 text-[14px] text-white/70">
                          Unlock the full itemized breakdown — government fees, due diligence, dependant add-ons and
                          service fees — by sharing where to send it.
                        </p>
                        <LeadGate
                          track={selected.track as Track}
                          answers={{} as AnswerMap}
                          name={name}
                          setName={setName}
                          email={email}
                          setEmail={setEmail}
                          phone={phone}
                          setPhone={setPhone}
                          onSubmitAction={submitLead}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="detail"
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        <h3 className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
                          Itemized estimate
                        </h3>
                        <ul className="mt-3 overflow-hidden rounded-2xl border" style={{ borderColor: `${GOLD}33` }}>
                          {breakdown.lineItems.map((item) => {
                            const pct = breakdown.totalUsd > 0 ? Math.round((item.amountUsd / breakdown.totalUsd) * 100) : 0;
                            return (
                              <li
                                key={item.key}
                                className="border-b px-4 py-3.5 last:border-b-0"
                                style={{ borderColor: "rgba(255,255,255,0.08)" }}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <span className="min-w-0">
                                    <span className="block text-[14px] font-semibold text-white">{item.label}</span>
                                    <span className="mt-0.5 block text-[12px] leading-relaxed text-white/50">
                                      {item.note}
                                    </span>
                                  </span>
                                  <span className="shrink-0 text-[15px] font-black tabular-nums text-white">
                                    {money(item.amountUsd)}
                                  </span>
                                </div>
                                <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                                  <motion.div
                                    className="h-full rounded-full"
                                    style={{ background: GOLD }}
                                    initial={reduce ? false : { width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 0.4 }}
                                  />
                                </div>
                              </li>
                            );
                          })}
                          <li
                            className="flex items-center justify-between gap-4 px-4 py-3.5"
                            style={{ background: `${GOLD}1f` }}
                          >
                            <span className="text-[14px] font-black uppercase tracking-[0.1em]" style={{ color: GOLD }}>
                              Estimated total
                            </span>
                            <span className="text-[18px] font-black tabular-nums text-white">
                              {money(breakdown.totalUsd)}
                            </span>
                          </li>
                        </ul>

                        <p className="mt-3 text-[12px] leading-relaxed text-white/45">{COST_DISCLAIMER}</p>

                        {/* Paid PDF + advisor CTA */}
                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                          <motion.button
                            whileTap={reduce ? undefined : { scale: 0.98 }}
                            type="button"
                            onClick={startPdf}
                            disabled={pdf.loading}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-bold transition disabled:opacity-60"
                            style={{ background: GOLD, color: NAVY }}
                          >
                            {pdf.loading ? <Loader2 className="size-4 animate-spin" /> : <FileDown className="size-4" />}
                            Download full PDF report
                          </motion.button>
                          <Link
                            href={BOOKING_ROUTE}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-[14px] font-semibold text-white transition hover:bg-white/10"
                            style={{ borderColor: `${GOLD}40` }}
                          >
                            Discuss this route
                            <ArrowRight className="size-4" />
                          </Link>
                        </div>
                        {pdf.error && <p className="mt-2 text-[12.5px] text-rose-300">{pdf.error}</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CLOSING CTA → /contact ── */}
      <section
        data-tone="dark"
        className="relative isolate px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 100% at 50% 0%, #13284f 0%, ${NAVY} 60%)` }}
      >
        <Ambient tone="dark" />
        <div className="mx-auto max-w-2xl">
          <p className="flex justify-center">
            <Eyebrow ar="ابدأ الآن">Your route, costed precisely</Eyebrow>
          </p>
          <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-[1.05]`}>
            Turn this estimate into a{" "}
            <span className="italic" style={{ color: GOLD }}>
              committed plan.
            </span>
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/70">
            A senior advisor will refine these figures against current government schedules and your family structure —
            privately, under NDA.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-[14px] font-bold uppercase tracking-[0.14em] transition-colors"
            style={{ background: GOLD, color: NAVY }}
          >
            Request a private consultation <ArrowRight className="size-4" />
          </a>
          <p className="mt-4 text-[12.5px]" style={{ color: GOLD_DEEP }}>
            Indicative figures only — verified by your advisor before any decision.
          </p>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
