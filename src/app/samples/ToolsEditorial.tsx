"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import { countryImage } from "@/components/Countries/country-image";

/* ── LOCKED navy/gold system ── */
const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

/* ── Tracks (verticals) ── */
type Track = "citizenship" | "residency" | "corporate" | "skilled";
const TRACK_LABEL: Record<Track, string> = {
  citizenship: "Citizenship",
  residency: "Residency",
  corporate: "Corporate mobility",
  skilled: "Skilled migration",
};
const REGIONS = ["Europe", "Caribbean", "Asia-Pacific", "Americas", "Africa & Middle East"] as const;
type Region = (typeof REGIONS)[number];
const BUDGETS = ["No investment", "Under USD 250k", "USD 250k+", "USD 600k+"] as const;
type Budget = (typeof BUDGETS)[number];

type Programme = {
  name: string;
  country: string;
  slug: string; // country-image resolver key
  region: Region;
  track: Track;
  pathway: string;
  investment: string;
  timeline: string;
  budget: Budget;
};

/* ── REAL programmes (verbatim from src/lib/eligibility/programCatalog.ts → Programs).
   investment/timeline/pathway are the catalog's minInvestmentUSD / processingTime / pathway. ── */
const PROGRAMMES: Programme[] = [
  // Citizenship
  { name: "Italy by Descent", country: "Italy", slug: "italy", region: "Europe", track: "citizenship", pathway: "Citizenship jure sanguinis (by descent)", investment: "N/A — by descent", timeline: "6–24+ months", budget: "No investment" },
  { name: "Malta (Exceptional Services)", country: "Malta", slug: "malta", region: "Europe", track: "citizenship", pathway: "Citizenship for exceptional services by direct investment", investment: "≈ USD 600k–750k+ contribution", timeline: "12–36 months", budget: "USD 600k+" },
  { name: "Turkey Citizenship by Investment", country: "Turkey", slug: "turkey", region: "Europe", track: "citizenship", pathway: "Real estate, deposit or investment options", investment: "USD 400k+ real estate route", timeline: "4–9 months", budget: "USD 250k+" },
  { name: "Grenada Citizenship by Investment", country: "Grenada", slug: "grenada", region: "Caribbean", track: "citizenship", pathway: "Contribution or approved real estate", investment: "USD 235k+ contribution + fees", timeline: "4–8 months", budget: "USD 250k+" },
  { name: "Dominica Citizenship by Investment", country: "Dominica", slug: "dominica", region: "Caribbean", track: "citizenship", pathway: "Contribution or approved real estate", investment: "USD 200k+ route + fees", timeline: "4–8 months", budget: "Under USD 250k" },
  { name: "Antigua & Barbuda Citizenship by Investment", country: "Antigua and Barbuda", slug: "antigua-barbuda", region: "Caribbean", track: "citizenship", pathway: "Contribution, real estate or business options", investment: "USD 230k+ contribution + fees", timeline: "4–8 months", budget: "Under USD 250k" },
  { name: "Vanuatu Citizenship by Investment", country: "Vanuatu", slug: "vanuatu", region: "Asia-Pacific", track: "citizenship", pathway: "Approved contribution route", investment: "USD 130k+ donation + fees", timeline: "2–4 months", budget: "Under USD 250k" },
  { name: "Egypt Citizenship by Investment", country: "Egypt", slug: "egypt", region: "Africa & Middle East", track: "citizenship", pathway: "Donation, real estate, deposit or business", investment: "Route dependent", timeline: "6–12+ months", budget: "USD 250k+" },
  // Residency
  { name: "Portugal (Alt. routes)", country: "Portugal", slug: "portugal", region: "Europe", track: "residency", pathway: "Funds / donation / arts / VC or professional routes", investment: "≈ USD 200k–500k+", timeline: "6–12 months", budget: "USD 250k+" },
  { name: "Greece Property Route", country: "Greece", slug: "greece", region: "Europe", track: "residency", pathway: "Residency by real estate investment", investment: "≈ USD 250k–800k+", timeline: "3–6 months", budget: "USD 250k+" },
  { name: "Spain Digital Nomad Residence", country: "Spain", slug: "spain", region: "Europe", track: "residency", pathway: "Residence for remote workers & professionals", investment: "No investment route", timeline: "1–4 months", budget: "No investment" },
  { name: "UAE Residency", country: "United Arab Emirates", slug: "uae", region: "Africa & Middle East", track: "residency", pathway: "Employment, company, investor & remote-worker routes", investment: "Varies by route", timeline: "1–8 weeks", budget: "Under USD 250k" },
  { name: "USA EB-5 Investor Immigrant Visa", country: "United States", slug: "usa", region: "Americas", track: "residency", pathway: "Green Card via qualifying investment & job creation", investment: "USD 800k+ TEA / 1.05M+ standard", timeline: "18–48+ months", budget: "USD 600k+" },
  { name: "Canada Start-Up Visa", country: "Canada", slug: "canada", region: "Americas", track: "residency", pathway: "PR for founders with designated-org support", investment: "Settlement & business costs", timeline: "24–40+ months", budget: "No investment" },
  { name: "Singapore Global Investor Programme", country: "Singapore", slug: "singapore", region: "Asia-Pacific", track: "residency", pathway: "PR for established entrepreneurs & investors", investment: "High-capital route", timeline: "9–18+ months", budget: "USD 600k+" },
  { name: "New Zealand Active Investor Plus", country: "New Zealand", slug: "new-zealand", region: "Asia-Pacific", track: "residency", pathway: "Investor residence via active investments", investment: "High-capital route", timeline: "6–18+ months", budget: "USD 600k+" },
  // Corporate mobility
  { name: "UAE Golden Visa", country: "United Arab Emirates", slug: "uae", region: "Africa & Middle East", track: "corporate", pathway: "Long-term residence for investors / talents", investment: "Real estate ≈ AED 2M+", timeline: "2–6 weeks", budget: "USD 250k+" },
  { name: "USA L-1 Intra-Company Transfer", country: "United States", slug: "usa", region: "Americas", track: "corporate", pathway: "Transfer manager / specialist to a US entity", investment: "N/A — company costs apply", timeline: "1–6 months", budget: "No investment" },
  { name: "UK Sponsor Licence + Skilled Worker", country: "United Kingdom", slug: "united-kingdom", region: "Europe", track: "corporate", pathway: "Employer sponsorship via licensed UK sponsor", investment: "N/A — sponsor & employment costs", timeline: "4–12+ weeks", budget: "No investment" },
  { name: "Singapore Employment Pass", country: "Singapore", slug: "singapore", region: "Asia-Pacific", track: "corporate", pathway: "Work pass for managers, executives & specialists", investment: "N/A — salary & employer costs", timeline: "3–8 weeks", budget: "No investment" },
  // Skilled migration
  { name: "Canada Express Entry", country: "Canada", slug: "canada", region: "Americas", track: "skilled", pathway: "Points-based permanent residence (CRS)", investment: "N/A", timeline: "6–12 months after ITA", budget: "No investment" },
  { name: "Australia Skilled (189/190)", country: "Australia", slug: "australia", region: "Asia-Pacific", track: "skilled", pathway: "Points-based skilled migration", investment: "N/A", timeline: "Varies by round / state", budget: "No investment" },
  { name: "USA EB-1A Extraordinary Ability", country: "United States", slug: "usa", region: "Americas", track: "skilled", pathway: "Green Card for sustained acclaim", investment: "N/A", timeline: "8–24+ months", budget: "No investment" },
  { name: "Germany EU Blue Card", country: "Germany", slug: "germany", region: "Europe", track: "skilled", pathway: "Skilled work residence for qualified professionals", investment: "N/A", timeline: "1–4 months", budget: "No investment" },
];

const ALL = "All" as const;

function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar?: string; light?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: light ? GOLD : GOLD_DEEP }}>
      <span className="h-px w-8" style={{ background: light ? GOLD : GOLD_DEEP }} />
      {children}
      {ar ? <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span> : null}
    </p>
  );
}

export default function ToolsEditorial({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [track, setTrack] = useState<Track | typeof ALL>(ALL);
  const [region, setRegion] = useState<Region | typeof ALL>(ALL);
  const [budget, setBudget] = useState<Budget | typeof ALL>(ALL);

  const rows = useMemo(
    () =>
      PROGRAMMES.filter(
        (p) =>
          (track === ALL || p.track === track) &&
          (region === ALL || p.region === region) &&
          (budget === ALL || p.budget === budget),
      ),
    [track, region, budget],
  );

  const reset = () => {
    setTrack(ALL);
    setRegion(ALL);
    setBudget(ALL);
  };

  const Pill = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors"
      style={
        active
          ? { background: NAVY, color: "#fbfaf7", borderColor: NAVY }
          : { background: "transparent", color: INK, borderColor: "rgba(12,31,63,0.22)" }
      }
    >
      {children}
    </button>
  );

  return (
    <div className="relative">
      <div className="pointer-events-none fixed left-5 top-5 z-[60] rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
        Sample · Tools ② Editorial List
      </div>
      <Header serifClass={serifClass} />

      {/* ── SLIM NAVY HERO BAND ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-14 pt-32 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 140% at 12% 0%, #13284f 0%, ${NAVY} 60%)` }}
      >
        <Ambient tone="dark" />
        <div className="mx-auto max-w-6xl">
          <Eyebrow light ar="مستكشف البرامج">XIPHIAS Tools · Programme Explorer</Eyebrow>
          <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.4rem,5.2vw,4.2rem)] font-medium leading-[1.02]`}>
            Every route, on one editorial index.
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/75">
            A whitepaper-style ledger of {PROGRAMMES.length} verified XIPHIAS programmes across citizenship, residency,
            corporate mobility and skilled migration — filter by route, region and budget to find the right fit.
          </p>
        </div>
      </section>

      {/* ── EXPLORER: filter sidebar + editorial rows ── */}
      <section data-tone="light" className="relative isolate px-6 py-16 sm:px-12 lg:px-20" style={{ background: "#fbfaf7", color: INK }}>
        <Ambient tone="light" />
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[260px_1fr]">
          {/* FILTER SIDEBAR */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className={`${serifClass} text-[1.6rem] font-medium`}>Refine</h2>
            <div className="mt-6 space-y-7">
              <fieldset>
                <legend className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD_DEEP }}>
                  By route
                </legend>
                <div className="flex flex-wrap gap-2">
                  <Pill active={track === ALL} onClick={() => setTrack(ALL)}>All</Pill>
                  {(Object.keys(TRACK_LABEL) as Track[]).map((t) => (
                    <Pill key={t} active={track === t} onClick={() => setTrack(t)}>
                      {TRACK_LABEL[t]}
                    </Pill>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD_DEEP }}>
                  By region
                </legend>
                <div className="flex flex-wrap gap-2">
                  <Pill active={region === ALL} onClick={() => setRegion(ALL)}>All</Pill>
                  {REGIONS.map((r) => (
                    <Pill key={r} active={region === r} onClick={() => setRegion(r)}>
                      {r}
                    </Pill>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD_DEEP }}>
                  By budget
                </legend>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2.5 text-[13px]">
                    <input type="radio" name="budget" checked={budget === ALL} onChange={() => setBudget(ALL)} className="accent-[#0a1733]" />
                    Any budget
                  </label>
                  {BUDGETS.map((b) => (
                    <label key={b} className="flex items-center gap-2.5 text-[13px]">
                      <input type="radio" name="budget" checked={budget === b} onChange={() => setBudget(b)} className="accent-[#0a1733]" />
                      {b}
                    </label>
                  ))}
                </div>
              </fieldset>
              <button
                type="button"
                onClick={reset}
                className="text-[12px] font-semibold uppercase tracking-[0.14em] underline-offset-4 hover:underline"
                style={{ color: GOLD_DEEP }}
              >
                Reset filters
              </button>
            </div>
          </aside>

          {/* EDITORIAL ROWS */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD_DEEP }}>
              {rows.length} {rows.length === 1 ? "programme" : "programmes"}
            </p>
            <ul className="mt-4 border-t" style={{ borderColor: "rgba(168,125,31,0.4)" }}>
              {rows.map((p, i) => (
                <motion.li
                  key={`${p.name}-${p.track}`}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
                  className="border-b py-7"
                  style={{ borderColor: "rgba(168,125,31,0.4)" }}
                >
                  <article className="grid items-center gap-6 sm:grid-cols-[200px_1fr]">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
                      <Image
                        src={countryImage(p.slug, p.region)}
                        alt={`${p.country} — ${p.name}`}
                        fill
                        sizes="(min-width: 640px) 200px, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(10,23,51,0.45) 0%, rgba(10,23,51,0.05) 60%)" }} />
                      <span className="absolute left-2.5 top-2.5 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                        {TRACK_LABEL[p.track]}
                      </span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className={`${serifClass} text-[clamp(1.4rem,2.4vw,1.9rem)] font-medium leading-tight`}>{p.name}</h3>
                        <span className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD_DEEP }}>
                          {p.country} · {p.region}
                        </span>
                      </div>
                      <p className="mt-2 max-w-xl text-[14px] leading-relaxed" style={{ color: "rgba(12,31,63,0.7)" }}>
                        {p.pathway}
                      </p>
                      <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-2 border-t pt-3.5 text-[13px]" style={{ borderColor: "rgba(12,31,63,0.1)" }}>
                        <div>
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD_DEEP }}>Investment</dt>
                          <dd className="mt-0.5 font-medium">{p.investment}</dd>
                        </div>
                        <div>
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD_DEEP }}>Timeline</dt>
                          <dd className="mt-0.5 font-medium">{p.timeline}</dd>
                        </div>
                        <div>
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD_DEEP }}>Pathway</dt>
                          <dd className="mt-0.5 font-medium">{TRACK_LABEL[p.track]}</dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                </motion.li>
              ))}
            </ul>
            {rows.length === 0 ? (
              <p className="py-12 text-center text-[15px]" style={{ color: "rgba(12,31,63,0.6)" }}>
                No programmes match these filters.{" "}
                <button type="button" onClick={reset} className="font-semibold underline" style={{ color: GOLD_DEEP }}>
                  Reset
                </button>
                .
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 140% at 50% 0%, #13284f 0%, ${NAVY} 60%)` }}
      >
        <Ambient tone="dark" />
        <div className="mx-auto max-w-3xl">
          <Eyebrow light ar="تحدث إلى مستشار">Speak to an advisor</Eyebrow>
          <h2 className={`${serifClass} mx-auto mt-5 text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.05]`}>
            Not sure which route is yours?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
            Tell us your goals and we will narrow {PROGRAMMES.length}+ programmes to the handful that fit your family,
            budget and timeline — privately, end to end.
          </p>
          <a
            href="/contact"
            className="mt-9 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
            style={{ background: GOLD, color: NAVY }}
          >
            Book a consultation <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
