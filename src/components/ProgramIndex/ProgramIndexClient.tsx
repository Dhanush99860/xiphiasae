"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, FileDown, Gauge, Loader2, ShieldAlert } from "lucide-react";

import Ambient from "@/components/HomeLuxe/Ambient";
import LuxeHeader from "@/components/HomeLuxe/LuxeHeader";
import LuxeFooter from "@/components/HomeLuxe/LuxeFooter";
import { CurrencyProvider, useCurrency } from "@/lib/CurrencyProvider";
import { GlassSelect } from "@/components/XiaTools/GlassSelect";
import { INDICATIVE_NOTE } from "@/components/XiaTools/ToolShell";
import { countryImage } from "@/components/Countries/country-image";
import ProgramRankingClient from "./ProgramRankingClient";
import { INDEX_DISCLAIMER, type ProgramIndexItem } from "@/lib/program-index";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

export default function ProgramIndexClient({
  programs,
  serifClass,
}: {
  programs: ProgramIndexItem[];
  serifClass: string;
}) {
  return (
    <CurrencyProvider defaultCurrency="USD">
      <Inner programs={programs} serifClass={serifClass} />
    </CurrencyProvider>
  );
}

/** Currency picker tuned for the dark navy hero (gold label). */
function DarkCurrencyPicker() {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className="flex items-center gap-2 text-[13px] font-medium text-white/70">
      <span className="uppercase tracking-wide">Currency</span>
      <GlassSelect
        value={currency}
        onChange={(v) => setCurrency(v as "USD" | "INR" | "AED" | "EUR")}
        options={[
          { value: "USD", label: "USD $" },
          { value: "INR", label: "INR ₹" },
          { value: "AED", label: "AED د.إ" },
          { value: "EUR", label: "EUR €" },
        ]}
        className="w-[112px]"
        buttonClassName="border-[#bfa15c]/40 bg-white/[0.05] text-[#eef3fb] hover:border-[#bfa15c]/65"
        ariaLabel="Select display currency"
      />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
        مؤشر البرامج
      </span>
    </p>
  );
}

function DarkIndicativeChip() {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
      style={{ borderColor: `${GOLD}73`, background: `${GOLD}1a`, color: GOLD }}
    >
      <ShieldAlert className="size-3" />
      {INDICATIVE_NOTE}
    </span>
  );
}

function Inner({ programs, serifClass }: { programs: ProgramIndexItem[]; serifClass: string }) {
  const reduce = useReducedMotion();
  const programmes = programs.length;
  const countries = new Set(programs.map((p) => p.country)).size;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [report, setReport] = useState<{ loading: boolean; error: string | null }>({ loading: false, error: null });

  const validReport = name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function startReport() {
    if (!validReport || report.loading) return;
    setReport({ loading: true, error: null });
    try {
      const res = await fetch("/api/payments/jiopay/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          productType: "premium_report",
          productName: "XIPHIAS Program Index report",
          page: "/xiphias-program-index",
          consent: true,
          answers: { programmesIndexed: programmes, countries },
        }),
      });
      const data = await res.json();
      if (data?.ok && data.checkoutUrl) {
        window.location.href = data.checkoutUrl as string;
        return;
      }
      setReport({ loading: false, error: data?.error || "Could not start checkout. Please try again." });
    } catch {
      setReport({ loading: false, error: "Could not start checkout. Please try again." });
    }
  }

  const heroImg = countryImage("uae");

  return (
    <div className="relative">
      <LuxeHeader serifClass={serifClass} />

      {/* ── HERO (real full-bleed image, navy overlay for legibility) ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-16 pt-32 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <div className="absolute inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt="XIPHIAS Program Index" className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 90% at 15% 0%, rgba(19,40,79,0.86) 0%, rgba(10,23,51,0.94) 60%, ${NAVY} 100%)`,
            }}
          />
        </div>
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-screen-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}>
                <Link href="/" className="hover:text-[#bfa15c]">
                  Home
                </Link>{" "}
                <span style={{ color: GOLD }}>/</span> XIA Intelligence / Program Index
              </p>
              <p className="mt-7">
                <Eyebrow>XIA · Program Index</Eyebrow>
              </p>
              <h1 className={`${serifClass} mt-5 text-[clamp(2.4rem,5.2vw,4.4rem)] font-medium leading-[1.02]`}>
                The XIPHIAS <span className="italic" style={{ color: GOLD }}>Program Index.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75">
                A documented composite benchmark across affordability, speed, presence, family, due-diligence and
                passport power — orientation only, not a ranking of guaranteed outcomes.
              </p>
            </div>
            <div className="shrink-0">
              <DarkCurrencyPicker />
            </div>
          </div>
        </div>
      </section>

      {/* ── INDEX BODY (dark) ── */}
      <section
        data-tone="dark"
        className="relative isolate px-6 pb-24 pt-12 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 90% at 85% 0%, #13284f 0%, ${NAVY} 65%)` }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-screen-2xl">
          {/* KPI band */}
          <div className="flex flex-wrap items-center gap-3">
            <Kpi value={programmes} label="programmes indexed" />
            <Kpi value={countries} label="countries" />
            <Kpi value={6} label="scoring factors" />
            <Link
              href="/xiphias-program-index/methodology"
              className="inline-flex items-center gap-1.5 rounded-xl border px-4 py-3 text-[13px] font-semibold transition hover:bg-[#bfa15c]/10"
              style={{ borderColor: `${GOLD}73`, color: GOLD }}
            >
              <Gauge className="size-4" /> How it&apos;s scored
            </Link>
            <DarkIndicativeChip />
          </div>

          {/* Ranking — glass panel; rows scroll inside a bounded container */}
          <div
            className="mt-6 rounded-3xl border p-5 sm:p-6"
            style={{ borderColor: `${GOLD}40`, background: "rgba(8,18,40,0.6)", boxShadow: "0 50px 130px -60px rgba(0,0,0,0.85)" }}
          >
            <ProgramRankingClient programs={programs} />
          </div>

          {/* Full Index report — glass band BELOW the table */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 overflow-hidden rounded-3xl border p-6 sm:p-8"
            style={{ borderColor: `${GOLD}40`, background: "rgba(8,18,40,0.6)" }}
          >
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em]"
                  style={{ borderColor: `${GOLD}66`, background: `${GOLD}1a`, color: GOLD }}
                >
                  <FileDown className="size-3.5" /> Full Index report
                </span>
                <h2 className={`${serifClass} mt-4 text-[clamp(1.8rem,3.6vw,2.6rem)] font-medium leading-tight text-[#eef3fb]`}>
                  The complete ranking, <span className="italic" style={{ color: GOLD }}>ready to share.</span>
                </h2>
                <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-white/65">
                  Every weighted component score, an advisor-ready summary, and all {programmes} programmes — delivered
                  as a polished PDF.
                </p>
                <ul className="mt-5 grid gap-2.5">
                  {[
                    "Per-programme breakdown of all six factors",
                    "Advisor-ready summary & recommended next steps",
                    `All ${programmes} programmes across ${countries} countries`,
                  ].map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-[13.5px] text-white/75">
                      <span
                        className="grid size-5 shrink-0 place-items-center rounded-full"
                        style={{ background: `${GOLD}26`, color: GOLD }}
                      >
                        <Check className="size-3" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-2xl border p-5 sm:p-6"
                style={{ borderColor: `${GOLD}40`, background: "rgba(255,255,255,0.04)" }}
              >
                <div className="space-y-2.5">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    autoComplete="name"
                    className="w-full rounded-xl border bg-[#0b1730] px-3.5 py-3 text-[14px] text-[#eef3fb] placeholder-white/35 outline-none transition focus:border-[#bfa15c] focus:ring-2 focus:ring-[#bfa15c]/60"
                    style={{ borderColor: `${GOLD}40` }}
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    type="email"
                    autoComplete="email"
                    className="w-full rounded-xl border bg-[#0b1730] px-3.5 py-3 text-[14px] text-[#eef3fb] placeholder-white/35 outline-none transition focus:border-[#bfa15c] focus:ring-2 focus:ring-[#bfa15c]/60"
                    style={{ borderColor: `${GOLD}40` }}
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={startReport}
                  disabled={!validReport || report.loading}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-bold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ background: GOLD, color: NAVY }}
                >
                  {report.loading ? <Loader2 className="size-4 animate-spin" /> : <FileDown className="size-4" />}
                  Download full Index report
                </motion.button>
                {report.error && <p className="mt-2 text-[12.5px] text-rose-300">{report.error}</p>}
                <p className="mt-3 text-[11.5px] leading-relaxed text-white/45">{INDEX_DISCLAIMER}</p>
              </div>
            </div>
          </motion.div>

          <div className="mt-6 flex justify-center">
            <Link
              href="/compare-programs"
              className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-[13px] font-semibold text-[#eef3fb] transition hover:bg-white/[0.05]"
              style={{ borderColor: `${GOLD}40` }}
            >
              Compare specific programmes <ArrowRight className="size-4" />
            </Link>
          </div>

          <p className="mt-6 text-center text-[12.5px]" style={{ color: GOLD_DEEP }}>
            Indicative composite benchmark only — verified by your advisor before any decision.
          </p>
        </div>
      </section>

      <LuxeFooter serifClass={serifClass} />
    </div>
  );
}

function Kpi({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="rounded-xl border px-4 py-3"
      style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
    >
      <span className="text-[22px] font-black tabular-nums" style={{ color: GOLD }}>
        {value}
      </span>
      <span className="ml-2 text-[12.5px] text-white/55">{label}</span>
    </div>
  );
}
