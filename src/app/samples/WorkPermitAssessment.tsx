"use client";

// SAMPLE · Work Permit Intelligence reskin — VARIANT ② "Guided Assessment".
// DARK navy hero (real full-bleed image) → a glass assessment panel that lets the
// visitor pick a TARGET REGION, a DESTINATION, and a quick PROFILE chip (employer
// offer? yes/no). The panel then surfaces the MATCHED destination(s) with their real
// permit types, route-readiness signals, document checklist and advisor checks —
// plus a "Request advisor review" CTA. ALL data is REAL: imported verbatim from
// src/lib/work-permits.ts (workPermitCountries — 8 destinations, real /images webp).
// Selection is live (useMemo). This is an assessment aid, not a final decision.

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  FileText,
  Gauge,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { workPermitCountries, type WorkPermitCountry } from "@/lib/work-permits";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";
const PEARL = "#fbfaf7";

const HERO_IMAGE = workPermitCountries[0].image; // real Canada Global Talent Stream frame

const ASSESSMENT_DISCLAIMER =
  "This is an assessment aid, not a final decision — route viability, evidence and timing vary by case and current rules. Advisor review is required before any application.";

// Distinct regions, derived from the real data (order preserved by first appearance).
const REGIONS = Array.from(new Set(workPermitCountries.map((c) => c.region)));

// Heuristic, data-driven: does a destination read as "needs an employer sponsor/offer"?
// We read the real routeReadiness "Sponsor basis" / "Route basis" rows — no invented figures.
function sponsorPosture(country: WorkPermitCountry): "required" | "flexible" {
  const basis = country.routeReadiness.find((r) =>
    /sponsor|route/i.test(r.label),
  );
  const value = `${basis?.value ?? ""} ${basis?.detail ?? ""}`.toLowerCase();
  // "Required" / "Usually required" / "Employer-led/company" → sponsor-driven.
  if (/required|employer|company|sponsor/.test(value)) return "required";
  // Points / activity / remote / opportunity card → an offer is not strictly needed.
  return "flexible";
}

type OfferFilter = "any" | "yes" | "no";
const OFFERS: { value: OfferFilter; label: string }[] = [
  { value: "any", label: "Not sure yet" },
  { value: "yes", label: "I have an employer offer" },
  { value: "no", label: "No offer yet" },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none fixed left-5 top-5 z-[60] rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
      {children}
    </div>
  );
}

function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}

export default function WorkPermitAssessment({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();

  const [region, setRegion] = useState<string>("all");
  const [offer, setOffer] = useState<OfferFilter>("any");
  const [selectedSlug, setSelectedSlug] = useState<string>(workPermitCountries[0].slug);

  // Live, derived matches — region + (employer-offer posture) filters, no figures invented.
  const matches = useMemo(() => {
    return workPermitCountries.filter((c) => {
      if (region !== "all" && c.region !== region) return false;
      if (offer === "yes" && sponsorPosture(c) === "flexible") {
        // every destination still "works" with an offer; keep all when offer = yes
      }
      if (offer === "no" && sponsorPosture(c) === "required") return false;
      return true;
    });
  }, [region, offer]);

  // Keep the detailed selection valid against the current match list.
  const selected = useMemo(() => {
    return (
      matches.find((c) => c.slug === selectedSlug) ??
      matches[0] ??
      workPermitCountries[0]
    );
  }, [matches, selectedSlug]);

  const heroAlt = `${selected.country} — ${selected.permitTypes[0]} work permit route`;

  return (
    <div className="relative" style={{ background: PEARL, color: INK }}>
      <Badge>Sample · Work Permit Intelligence · ② Guided Assessment</Badge>
      <Header serifClass={serifClass} />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-16 pt-32 sm:px-12 lg:px-20"
        style={{ background: NAVY, color: "#eef3fb" }}
      >
        <div className="absolute inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_IMAGE} alt={heroAlt} className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 100% at 15% 0%, rgba(19,40,79,0.84) 0%, rgba(10,23,51,0.94) 60%, #0a1733 100%)",
            }}
          />
        </div>
        <Ambient tone="dark" />

        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}>
            <a href="/" className="hover:text-[#bfa15c]">Home</a>{" "}
            <span style={{ color: GOLD }}>/</span> XIA Intelligence / Work Permits
          </p>
          <p className="mt-7">
            <Eyebrow ar="ذكاء تصاريح العمل">XIA · Work Permit Intelligence</Eyebrow>
          </p>
          <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.4rem,5.2vw,4.4rem)] font-medium leading-[1.02]`}>
            Find the work-permit route that{" "}
            <span className="italic" style={{ color: GOLD }}>fits your move.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75">
            Tell us where you want to work and whether you already hold an employer
            offer. We will surface the matching destinations — permit types, route
            readiness, the documents to prepare and the checks our advisors run — ready
            for a focused review.
          </p>
        </div>
      </section>

      {/* ───────────────────────── ASSESSMENT PANEL ───────────────────────── */}
      <section
        data-tone="dark"
        className="relative isolate px-6 pb-24 pt-16 sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 90% at 85% 0%, #13284f 0%, ${NAVY} 65%)`, color: "#eef3fb" }}
        aria-labelledby="assessment-heading"
      >
        <Ambient tone="dark" />
        <div
          className="mx-auto max-w-7xl rounded-3xl border p-6 sm:p-10 lg:p-12"
          style={{ borderColor: `${GOLD}40`, background: "rgba(8,18,40,0.6)", boxShadow: "0 50px 130px -60px rgba(0,0,0,0.85)" }}
        >
          <h2 id="assessment-heading" className="sr-only">Guided work-permit assessment</h2>

          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10">
            {/* ── Controls ── */}
            <div>
              {/* Step 1 — region */}
              <h3 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
                <MapPin className="size-4" aria-hidden /> 1 · Target region
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["all", ...REGIONS].map((r) => {
                  const active = region === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRegion(r)}
                      aria-pressed={active}
                      className="relative rounded-full px-4 py-2 text-[13px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#bfa15c]/60"
                      style={{
                        background: active ? GOLD : "rgba(255,255,255,0.05)",
                        color: active ? NAVY : "rgba(238,243,251,0.72)",
                        border: `1px solid ${active ? GOLD : "rgba(191,161,92,0.3)"}`,
                      }}
                    >
                      {r === "all" ? "All regions" : r}
                    </button>
                  );
                })}
              </div>

              {/* Step 2 — employer offer profile chip */}
              <h3 className="mt-7 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
                <Briefcase className="size-4" aria-hidden /> 2 · Your profile
              </h3>
              <div
                className="mt-3 flex flex-wrap gap-1 rounded-xl border p-1"
                style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
                role="group"
                aria-label="Do you have an employer offer?"
              >
                {OFFERS.map((o) => {
                  const active = offer === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => setOffer(o.value)}
                      aria-pressed={active}
                      className="relative rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#bfa15c]/60"
                    >
                      {active && (
                        <motion.span
                          layoutId="wp-offer-active"
                          className="absolute inset-0 rounded-lg"
                          style={{ background: GOLD }}
                          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 30 }}
                        />
                      )}
                      <span className="relative" style={{ color: active ? NAVY : "rgba(238,243,251,0.6)" }}>{o.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Step 3 — destination */}
              <label className="mt-7 block">
                <span className="mb-1.5 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
                  <Gauge className="size-4" aria-hidden /> 3 · Destination
                </span>
                <select
                  value={selected.slug}
                  onChange={(e) => setSelectedSlug(e.target.value)}
                  aria-label="Select a destination"
                  className="w-full appearance-none rounded-md border bg-[#0b1730] px-4 py-3 text-[15px] text-[#eef3fb] outline-none transition-colors focus:border-[#bfa15c] focus:ring-2 focus:ring-[#bfa15c]/60"
                  style={{ borderColor: `${GOLD}40` }}
                >
                  {matches.length === 0 && (
                    <option value={selected.slug}>{selected.country}</option>
                  )}
                  {matches.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.country} · {c.region}
                    </option>
                  ))}
                </select>
              </label>

              {/* Match summary */}
              <p className="mt-4 text-[12.5px] text-white/50">
                <span className="font-semibold tabular-nums text-white/80">{matches.length}</span>{" "}
                {matches.length === 1 ? "destination matches" : "destinations match"} your filters.
              </p>

              {/* Live matched chips */}
              <div className="mt-3 flex flex-wrap gap-2">
                {matches.map((c) => {
                  const active = c.slug === selected.slug;
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setSelectedSlug(c.slug)}
                      aria-pressed={active}
                      className="rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#bfa15c]/60"
                      style={{
                        background: active ? "rgba(191,161,92,0.18)" : "rgba(255,255,255,0.04)",
                        color: active ? GOLD : "rgba(238,243,251,0.6)",
                        border: `1px solid ${active ? GOLD : "rgba(255,255,255,0.1)"}`,
                      }}
                    >
                      {c.country}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Result ── */}
            <div className="rounded-2xl border p-0 overflow-hidden" style={{ borderColor: `${GOLD}40`, background: "rgba(255,255,255,0.04)" }}>
              {/* Image banner */}
              <div className="relative h-44 w-full overflow-hidden sm:h-52">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={selected.slug}
                  src={selected.image}
                  alt={`${selected.country} — work permit destination`}
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(10,23,51,0.2) 0%, rgba(10,23,51,0.9) 100%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">{selected.region}</span>
                    <h3 className={`${serifClass} text-[1.9rem] font-medium leading-none text-white`}>{selected.country}</h3>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
                    style={{ borderColor: `${GOLD}66`, color: GOLD, background: "rgba(10,23,51,0.55)" }}
                  >
                    {sponsorPosture(selected) === "required" ? "Sponsor-led" : "Profile-led"}
                  </span>
                </div>
              </div>

              <motion.div
                key={selected.slug + offer + region}
                initial={reduce ? false : { opacity: 0.4, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-7"
              >
                <p className="text-[14px] leading-relaxed text-white/75">{selected.advisoryFocus}</p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white/50">{selected.processingSignal}</p>

                {/* Permit types */}
                <h4 className="mt-6 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
                  <BadgeCheck className="size-4" aria-hidden /> Permit types
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selected.permitTypes.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border px-3 py-1.5 text-[12.5px] font-medium text-white/85"
                      style={{ borderColor: `${GOLD}40`, background: "rgba(255,255,255,0.04)" }}
                    >
                      {p}
                    </span>
                  ))}
                </div>

                {/* Route readiness signals */}
                <h4 className="mt-6 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
                  <Gauge className="size-4" aria-hidden /> Route readiness
                </h4>
                <ul className="mt-3 overflow-hidden rounded-2xl border" style={{ borderColor: `${GOLD}33` }}>
                  {selected.routeReadiness.map((r) => (
                    <li
                      key={r.label}
                      className="grid gap-1 border-b px-4 py-3.5 last:border-b-0 sm:grid-cols-[0.8fr_1.2fr] sm:items-baseline sm:gap-4"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                      <div className="flex items-center justify-between gap-3 sm:block">
                        <span className="block text-[13px] font-semibold text-white">{r.label}</span>
                        <span className="mt-0.5 inline-block text-[12.5px] font-bold" style={{ color: GOLD }}>{r.value}</span>
                      </div>
                      <span className="block text-[12.5px] leading-relaxed text-white/55">{r.detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Document checklist + advisor checks */}
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
                      <FileText className="size-4" aria-hidden /> Document checklist
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {selected.documentChecklist.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-[13px] leading-snug text-white/75">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: GOLD }} aria-hidden />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
                      <ShieldCheck className="size-4" aria-hidden /> Advisor checks
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {selected.advisorChecks.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-[13px] leading-snug text-white/75">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: GOLD }} aria-hidden />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="/contact"
                  className="mt-7 inline-flex items-center gap-2 rounded-md px-6 py-3 text-[13px] font-bold uppercase tracking-[0.14em] transition-colors hover:brightness-110"
                  style={{ background: GOLD, color: NAVY }}
                >
                  Request advisor review <ArrowRight className="size-4" aria-hidden />
                </a>

                <p className="mt-4 text-[12px] leading-relaxed text-white/45">{ASSESSMENT_DISCLAIMER}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── CLOSING CTA → /contact ───────────────────────── */}
      <section
        data-tone="light"
        className="relative isolate px-6 py-24 text-center sm:px-12 lg:px-20"
        style={{ background: PEARL, color: INK }}
        aria-labelledby="wp-cta-heading"
      >
        <Ambient tone="light" />
        <div className="relative mx-auto max-w-2xl">
          <p className="flex justify-center">
            <span className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD_DEEP }}>
              <span className="h-px w-8" style={{ background: GOLD_DEEP }} />
              Advisor review
              <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">مراجعة المستشار</span>
            </span>
          </p>
          <h2 id="wp-cta-heading" className={`${serifClass} mt-5 text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-[1.05]`}>
            Turn this match into a{" "}
            <span className="italic" style={{ color: GOLD_DEEP }}>filing-ready plan.</span>
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed" style={{ color: "rgba(12,31,63,0.66)" }}>
            A senior XIPHIAS advisor will validate route viability against your profile and
            current rules, then map the documents and timeline — privately, under NDA.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-[14px] font-bold uppercase tracking-[0.14em] transition-colors hover:brightness-110"
            style={{ background: NAVY, color: PEARL }}
          >
            Speak with an advisor <ArrowRight className="size-4" aria-hidden />
          </a>
          <p className="mt-4 text-[12.5px]" style={{ color: GOLD_DEEP }}>
            Assessment aid only — advisor review required before any application.
          </p>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
