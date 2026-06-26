"use client";

/**
 * VARIANT ③ — "Filter + Preview" for the PROGRAMME EXPLORER reskin
 * (representative of the Tools cluster). App-like split:
 *  LEFT  — filter panel (vertical / region / budget chips) + a scrollable,
 *          labelled results list of real immigration programmes.
 *  RIGHT — a large SPOTLIGHT preview of the selected programme: a REAL
 *          full-bleed image filling the whole panel, serif name, country,
 *          key stats (min investment / timeline / family / presence) and a
 *          "View programme →" link. Hover/select a result updates the
 *          spotlight (client state). Navy ground; collapses to list +
 *          spotlight on mobile. Matches the locked navy/gold CountryHub idiom.
 *
 * DATA: programmes mirror the real XIPHIAS programme catalog
 *   (src/lib/eligibility/programCatalog.ts) — the same source the live
 *   /programme-explorer and /compare-programs pages are built from via
 *   getProgrammeExplorerData(). Fields used: name, country, track (vertical),
 *   pathway, minInvestmentUSD, processingTime, familyIncluded,
 *   requiresPhysicalPresence. The server-only loader can't run in a client
 *   preview, so the catalog rows are mirrored here verbatim — no invented
 *   programmes. Imagery is resolved per-programme by the client-safe
 *   countryImage() helper (src/components/Countries/country-image.ts).
 */

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import { countryImage } from "@/components/Countries/country-image";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

type Track = "residency" | "citizenship" | "corporate" | "skilled";

type Programme = {
  id: string;
  name: string;
  country: string;
  track: Track;
  region: string;
  imageSlug: string; // resolves via countryImage()
  pathway: string;
  investment: string;
  timeline: string;
  family: string;
  presence: string;
  href: string;
};

// Real catalog rows (mirror of src/lib/eligibility/programCatalog.ts).
const PROGRAMMES: Programme[] = [
  { id: "uae-residency", name: "UAE Residency", country: "United Arab Emirates", track: "residency", region: "Africa & Middle East", imageSlug: "uae", pathway: "Employment, company setup, investor/real-estate & remote-worker routes", investment: "Route dependent", timeline: "1–8 weeks", family: "Yes", presence: "Low", href: "/residency" },
  { id: "uae-golden-visa", name: "UAE Golden Visa", country: "United Arab Emirates", track: "corporate", region: "Africa & Middle East", imageSlug: "uae", pathway: "10-year long-term residence for investors & talents", investment: "≈ AED 2M+ real estate", timeline: "2–6 weeks", family: "Yes", presence: "Low", href: "/corporate" },
  { id: "pt-alt-routes", name: "Portugal (Alt. routes)", country: "Portugal", track: "residency", region: "Europe", imageSlug: "portugal", pathway: "Residency by investment (funds / cultural / R&D) or professional", investment: "≈ USD 200k–500k+", timeline: "6–12 months", family: "Yes", presence: "Low–Moderate", href: "/residency" },
  { id: "gr-property", name: "Greece Property Route", country: "Greece", track: "residency", region: "Europe", imageSlug: "greece", pathway: "Residency by real-estate investment", investment: "≈ USD 250k–800k+", timeline: "3–6 months", family: "Yes", presence: "Minimal", href: "/residency" },
  { id: "es-digital-nomad", name: "Spain Digital Nomad Residence", country: "Spain", track: "residency", region: "Europe", imageSlug: "spain", pathway: "Residence for remote workers & digital professionals", investment: "No investment route", timeline: "1–4 months", family: "Yes", presence: "Moderate", href: "/residency" },
  { id: "us-eb5", name: "USA EB-5 Investor Immigrant Visa", country: "United States", track: "residency", region: "Americas", imageSlug: "usa", pathway: "Green Card through qualifying investment & job creation", investment: "USD 800k+ (TEA)", timeline: "18–48+ months", family: "Yes", presence: "Settlement", href: "/residency" },
  { id: "ca-suv", name: "Canada Start-Up Visa", country: "Canada", track: "residency", region: "Americas", imageSlug: "canada", pathway: "PR for founders with designated-organisation support", investment: "Settlement funds + costs", timeline: "24–40+ months", family: "Yes", presence: "Settlement", href: "/residency" },
  { id: "uk-innovator", name: "UK Innovator Founder Visa", country: "United Kingdom", track: "residency", region: "Europe", imageSlug: "united-kingdom", pathway: "Founder route for innovative, scalable business ideas", investment: "Credible business funding", timeline: "3–8 weeks", family: "Yes", presence: "High", href: "/residency" },
  { id: "nz-aip", name: "New Zealand Active Investor Plus", country: "New Zealand", track: "residency", region: "Asia-Pacific", imageSlug: "new-zealand", pathway: "Investor residence through acceptable active investments", investment: "High-capital route", timeline: "6–18+ months", family: "Yes", presence: "Moderate", href: "/residency" },
  { id: "sg-gip", name: "Singapore Global Investor Programme", country: "Singapore", track: "residency", region: "Asia-Pacific", imageSlug: "singapore", pathway: "PR for established entrepreneurs & investors", investment: "High-capital route", timeline: "9–18+ months", family: "Yes", presence: "Moderate–High", href: "/residency" },

  { id: "it-descent", name: "Italy by Descent", country: "Italy", track: "citizenship", region: "Europe", imageSlug: "italy", pathway: "Citizenship jure sanguinis (by descent)", investment: "N/A", timeline: "6–24+ months", family: "Lineal descendants", presence: "Varies", href: "/citizenship" },
  { id: "mt-services", name: "Malta (Exceptional Services)", country: "Malta", track: "citizenship", region: "Europe", imageSlug: "malta", pathway: "Citizenship for exceptional services by direct investment", investment: "≈ USD 600k–750k+", timeline: "12–36 months", family: "Yes", presence: "Residence period", href: "/citizenship" },
  { id: "tr-cbi", name: "Turkey Citizenship by Investment", country: "Turkey", track: "citizenship", region: "Europe", imageSlug: "turkey", pathway: "Citizenship via real estate, deposit or investment", investment: "USD 400k+ real estate", timeline: "4–9 months", family: "Yes", presence: "Low", href: "/citizenship" },
  { id: "gd-cbi", name: "Grenada Citizenship by Investment", country: "Grenada", track: "citizenship", region: "Caribbean", imageSlug: "grenada", pathway: "Citizenship via contribution or approved real estate", investment: "USD 235k+", timeline: "4–8 months", family: "Yes", presence: "Usually none", href: "/citizenship" },
  { id: "dm-cbi", name: "Dominica Citizenship by Investment", country: "Dominica", track: "citizenship", region: "Caribbean", imageSlug: "dominica", pathway: "Citizenship via contribution or approved real estate", investment: "USD 200k+", timeline: "4–8 months", family: "Yes", presence: "Usually none", href: "/citizenship" },
  { id: "ag-cbi", name: "Antigua & Barbuda Citizenship", country: "Antigua and Barbuda", track: "citizenship", region: "Caribbean", imageSlug: "antigua-barbuda", pathway: "Citizenship via contribution, real estate or business", investment: "USD 230k+", timeline: "4–8 months", family: "Yes", presence: "Low", href: "/citizenship" },
  { id: "eg-cbi", name: "Egypt Citizenship by Investment", country: "Egypt", track: "citizenship", region: "Africa & Middle East", imageSlug: "egypt", pathway: "Citizenship via donation, real estate, deposit or business", investment: "Route dependent", timeline: "6–12+ months", family: "Yes", presence: "Low–Moderate", href: "/citizenship" },
  { id: "vu-cbi", name: "Vanuatu Citizenship by Investment", country: "Vanuatu", track: "citizenship", region: "Asia-Pacific", imageSlug: "vanuatu", pathway: "Citizenship through approved contribution route", investment: "USD 130k+", timeline: "2–4 months", family: "Yes", presence: "Usually none", href: "/citizenship" },

  { id: "us-l1", name: "USA L-1 Intra-Company Transfer", country: "United States", track: "corporate", region: "Americas", imageSlug: "usa", pathway: "Transfer executives/managers to a US entity", investment: "Setup & legal costs", timeline: "1–6 months", family: "Yes", presence: "High", href: "/corporate" },
  { id: "us-e2", name: "USA E-2 Treaty Investor Visa", country: "United States", track: "corporate", region: "Americas", imageSlug: "usa", pathway: "Treaty investor visa for substantial active investment", investment: "Substantial & active", timeline: "2–6 months", family: "Yes", presence: "High", href: "/corporate" },
  { id: "uk-skilled", name: "UK Sponsor Licence + Skilled Worker", country: "United Kingdom", track: "corporate", region: "Europe", imageSlug: "united-kingdom", pathway: "Employer sponsorship via licensed UK sponsor", investment: "Sponsor & employment costs", timeline: "4–12+ weeks", family: "Yes", presence: "High", href: "/corporate" },
  { id: "sg-ep", name: "Singapore Employment Pass", country: "Singapore", track: "corporate", region: "Asia-Pacific", imageSlug: "singapore", pathway: "Work pass for managers, executives & specialists", investment: "Salary & employer costs", timeline: "3–8 weeks", family: "Yes", presence: "High", href: "/corporate" },
  { id: "ca-gts", name: "Canada Global Talent Stream", country: "Canada", track: "corporate", region: "Americas", imageSlug: "canada", pathway: "Fast work permit for high-demand tech & specialist roles", investment: "Employer LMIA costs", timeline: "2–8+ weeks", family: "Yes", presence: "High", href: "/corporate" },

  { id: "ca-express", name: "Canada Express Entry", country: "Canada", track: "skilled", region: "Americas", imageSlug: "canada", pathway: "Points-based permanent residence (CRS)", investment: "N/A", timeline: "6–12 months", family: "Yes", presence: "Settlement", href: "/skilled" },
  { id: "au-skilled", name: "Australia Skilled (189/190)", country: "Australia", track: "skilled", region: "Asia-Pacific", imageSlug: "australia", pathway: "Points-based skilled migration (independent / state)", investment: "N/A", timeline: "Round dependent", family: "Yes", presence: "Settlement", href: "/skilled" },
  { id: "us-eb1a", name: "USA EB-1A Extraordinary Ability", country: "United States", track: "skilled", region: "Americas", imageSlug: "usa", pathway: "Green Card for sustained national/international acclaim", investment: "N/A", timeline: "8–24+ months", family: "Yes", presence: "Settlement", href: "/skilled" },
  { id: "uk-gt", name: "UK Global Talent Visa", country: "United Kingdom", track: "skilled", region: "Europe", imageSlug: "united-kingdom", pathway: "Talent route for leaders in research, arts & digital tech", investment: "N/A", timeline: "3–10 weeks", family: "Yes", presence: "High", href: "/skilled" },
  { id: "de-blue-card", name: "Germany EU Blue Card", country: "Germany", track: "skilled", region: "Europe", imageSlug: "germany", pathway: "Skilled-work residence for qualified professionals", investment: "N/A", timeline: "1–4 months", family: "Yes", presence: "High", href: "/skilled" },
  { id: "nz-smc", name: "New Zealand Skilled Migrant Category", country: "New Zealand", track: "skilled", region: "Asia-Pacific", imageSlug: "new-zealand", pathway: "Residence for skilled workers with qualifying job", investment: "N/A", timeline: "6–18+ months", family: "Yes", presence: "High", href: "/skilled" },
];

const TRACK_LABELS: Record<Track, string> = {
  residency: "Residency",
  citizenship: "Citizenship",
  corporate: "Corporate mobility",
  skilled: "Skilled migration",
};

const TRACKS: Track[] = ["residency", "citizenship", "corporate", "skilled"];
const REGIONS = ["Africa & Middle East", "Europe", "Caribbean", "Asia-Pacific", "Americas"];

type Budget = { id: string; label: string; test: (p: Programme) => boolean };
const BUDGETS: Budget[] = [
  { id: "none", label: "No investment", test: (p) => /n\/a|no investment/i.test(p.investment) },
  { id: "sub300", label: "Under USD 300k", test: (p) => /USD\s?(130k|200k|230k|235k)/i.test(p.investment) },
  { id: "premium", label: "USD 400k +", test: (p) => /400k|500k|600k|750k|800k|AED 2M/i.test(p.investment) },
];

function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar: string; light?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: light ? GOLD_DEEP : GOLD }}>
      <span className="h-px w-8" style={{ background: light ? GOLD_DEEP : GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}

export default function ToolsSplit({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [track, setTrack] = useState<Track | "all">("all");
  const [region, setRegion] = useState<string | "all">("all");
  const [budget, setBudget] = useState<string | "all">("all");
  const [activeId, setActiveId] = useState<string>(PROGRAMMES[0].id);

  const results = useMemo(() => {
    const budgetDef = BUDGETS.find((b) => b.id === budget);
    return PROGRAMMES.filter(
      (p) =>
        (track === "all" || p.track === track) &&
        (region === "all" || p.region === region) &&
        (!budgetDef || budgetDef.test(p)),
    );
  }, [track, region, budget]);

  const active = results.find((p) => p.id === activeId) ?? results[0] ?? PROGRAMMES[0];

  const fade = reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

  const Chip = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className="shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition"
      style={{ borderColor: on ? GOLD : "rgba(255,255,255,0.2)", background: on ? GOLD : "transparent", color: on ? NAVY : "rgba(255,255,255,0.82)" }}
    >
      {children}
    </button>
  );

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── FILTER + PREVIEW (dark) ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-20 pt-28 text-[#eef3fb] sm:px-12 lg:px-16"
        style={{ background: `radial-gradient(120% 100% at 12% 0%, #13284f 0%, ${NAVY} 58%)` }}
      >
        <Ambient tone="dark" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div {...fade}>
            <Eyebrow ar="مستكشف البرامج">Programme Explorer</Eyebrow>
          </motion.div>
          <h1 className={`${serifClass} mt-5 text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[0.96]`}>
            Find the right route.
          </h1>
          <motion.p
            {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: 0.2 } })}
            className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/75"
          >
            {PROGRAMMES.length} XIPHIAS immigration programmes across residency,
            citizenship, corporate mobility and skilled migration. Filter by track,
            region and budget — the spotlight updates as you explore.
          </motion.p>
        </div>

        {/* App-like split */}
        <div className="relative z-10 mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10">
          {/* LEFT — filter panel + results list */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-lg border p-5" style={{ borderColor: "rgba(191,161,92,0.28)", background: "rgba(255,255,255,0.04)" }}>
              {/* Vertical filter */}
              <fieldset className="m-0 border-0 p-0">
                <legend className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Track</legend>
                <div className="flex flex-wrap gap-2">
                  <Chip on={track === "all"} onClick={() => setTrack("all")}>All</Chip>
                  {TRACKS.map((t) => (
                    <Chip key={t} on={track === t} onClick={() => setTrack(t)}>{TRACK_LABELS[t]}</Chip>
                  ))}
                </div>
              </fieldset>

              {/* Region filter */}
              <fieldset className="m-0 mt-4 border-0 p-0">
                <legend className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Region</legend>
                <div className="flex flex-wrap gap-2">
                  <Chip on={region === "all"} onClick={() => setRegion("all")}>All</Chip>
                  {REGIONS.map((r) => (
                    <Chip key={r} on={region === r} onClick={() => setRegion(r)}>{r}</Chip>
                  ))}
                </div>
              </fieldset>

              {/* Budget filter */}
              <fieldset className="m-0 mt-4 border-0 p-0">
                <legend className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Budget</legend>
                <div className="flex flex-wrap gap-2">
                  <Chip on={budget === "all"} onClick={() => setBudget("all")}>Any</Chip>
                  {BUDGETS.map((b) => (
                    <Chip key={b.id} on={budget === b.id} onClick={() => setBudget(b.id)}>{b.label}</Chip>
                  ))}
                </div>
              </fieldset>

              {/* Results list */}
              <div className="mt-5 flex items-center gap-2 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Programmes</span>
                <span className="h-px flex-1" style={{ background: "rgba(255,255,255,0.12)" }} />
                <span className="text-[13px] font-semibold" style={{ color: GOLD }}>{results.length}</span>
              </div>

              <ul className="mt-3 flex max-h-[58vh] flex-col gap-1 overflow-y-auto pr-1">
                {results.length === 0 ? (
                  <li className="px-1 py-6 text-[14px] text-white/55">No programmes match these filters.</li>
                ) : (
                  results.map((p) => {
                    const on = p.id === active.id;
                    return (
                      <li key={p.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveId(p.id)}
                          onFocus={() => setActiveId(p.id)}
                          onClick={() => setActiveId(p.id)}
                          aria-pressed={on}
                          className="group flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-left transition-colors"
                          style={{ background: on ? "rgba(191,161,92,0.12)" : "transparent" }}
                        >
                          <span aria-hidden className="w-px self-stretch transition-all" style={{ background: on ? GOLD : "transparent" }} />
                          <span className="flex-1">
                            <span className={`block text-[14px] leading-tight transition-colors ${on ? "font-semibold" : ""}`} style={{ color: on ? GOLD : "rgba(238,243,251,0.86)" }}>
                              {p.name}
                            </span>
                            <span className="mt-0.5 block text-[11px] uppercase tracking-[0.14em] text-white/45">
                              {p.country} · {TRACK_LABELS[p.track]}
                            </span>
                          </span>
                          <span aria-hidden className="text-[13px] opacity-0 transition group-hover:opacity-100" style={{ color: GOLD }}>→</span>
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>

          {/* RIGHT — spotlight preview */}
          <motion.div
            key={active.id}
            {...(reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } })}
            className="relative isolate min-h-[30rem] overflow-hidden rounded-lg border lg:min-h-[36rem] lg:self-stretch"
            style={{ borderColor: "rgba(191,161,92,0.35)" }}
          >
            <Image
              src={countryImage(active.imageSlug, active.region)}
              alt={`${active.name} — ${active.country}`}
              fill
              sizes="(min-width:1024px) 56vw, 100vw"
              className="object-cover [filter:grayscale(0.25)_brightness(0.7)_contrast(1.05)]"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.97) 0%, rgba(8,18,42,0.55) 46%, rgba(8,18,42,0.2) 100%)" }} />
            <span aria-hidden className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2" style={{ borderColor: GOLD }} />
            <span aria-hidden className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2" style={{ borderColor: GOLD }} />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>
                {TRACK_LABELS[active.track]} · {active.region}
              </span>
              <h2 className={`${serifClass} mt-3 text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[0.99]`}>
                {active.name}
              </h2>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-white/75">{active.pathway}</p>

              <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4 border-t pt-5 sm:grid-cols-4" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
                {[
                  { k: "Min. investment", v: active.investment },
                  { k: "Timeline", v: active.timeline },
                  { k: "Family", v: active.family },
                  { k: "Presence", v: active.presence },
                ].map((stat) => (
                  <div key={stat.k} className="flex flex-col gap-1">
                    <dd className={`${serifClass} text-[1.1rem] font-medium leading-tight`} style={{ color: GOLD }}>{stat.v}</dd>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">{stat.k}</dt>
                  </div>
                ))}
              </dl>

              <a
                href={active.href}
                className="group mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]"
                style={{ background: GOLD, color: NAVY }}
              >
                View programme <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Closing CTA (light) ── */}
      <section data-tone="light" className="relative isolate px-6 py-28 text-center text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#fbfaf7" }}>
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="flex justify-center">
            <Eyebrow ar="ابدأ" light>Begin</Eyebrow>
          </div>
          <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.02]`}>
            Narrowed it down?{" "}
            <span className="italic" style={{ color: GOLD_DEEP }}>Let&apos;s pressure-test it.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-[#0c1f3f]/70">
            Share the programmes that fit and a senior XIPHIAS advisor will return a
            tailored route comparison — privately, within 24 hours.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]"
              style={{ background: NAVY, color: "#eef3fb" }}
            >
              Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
