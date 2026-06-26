"use client";

/**
 * VARIANT ① — "Gallery Explorer" for the XIPHIAS Programme Explorer reskin
 * (representative of the Tools cluster). DARK navy, visual-first grid of real
 * programme cards: each card carries a REAL full-bleed country image (object-cover
 * top, navy gradient), serif programme name, country + vertical tag, and a gold
 * key stat (min investment, falling back to timeline). Gold filter chips (vertical
 * + region) sit across the top of a dark hero ("Explore every programme" + count).
 *
 * DATA: programmes are the project's REAL enriched catalog — Programs in
 * src/lib/eligibility/programCatalog.ts (the same source the live server-only
 * getProgrammeExplorerData() in src/lib/programme-explorer.ts feeds /programme-explorer
 * and /compare-programs). Fields used per card: name, country, track (vertical),
 * minInvestmentUSD (gold stat) and processingTime (fallback stat). Per-programme
 * imagery is resolved client-safe via countryImage() from
 * @/components/Countries/country-image, keyed by the programme's country. No
 * programmes or images are invented.
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
  name: string;
  country: string;
  track: Track;
  region: string;
  imageSlug: string; // key for countryImage()
  investment: string;
  timeline: string;
};

const TRACK_LABEL: Record<Track, string> = {
  residency: "Residency",
  citizenship: "Citizenship",
  corporate: "Corporate mobility",
  skilled: "Skilled migration",
};

// REAL programmes drawn from Programs in src/lib/eligibility/programCatalog.ts.
// imageSlug maps each programme's country to the client-safe countryImage() table.
const PROGRAMMES: Programme[] = [
  // Residency
  { name: "Portugal (Alt. routes)", country: "Portugal", track: "residency", region: "Europe", imageSlug: "portugal", investment: "≈ 200k–500k+", timeline: "6–12 months" },
  { name: "Greece Property Route", country: "Greece", track: "residency", region: "Europe", imageSlug: "greece", investment: "≈ 250k–800k+", timeline: "3–6 months" },
  { name: "UAE Residency", country: "United Arab Emirates", track: "residency", region: "Africa & Middle East", imageSlug: "uae", investment: "Route dependent", timeline: "1–8 weeks" },
  { name: "USA EB-5 Investor Immigrant Visa", country: "United States", track: "residency", region: "Americas", imageSlug: "usa", investment: "USD 800k+ TEA", timeline: "18–48+ months" },
  { name: "Canada Start-Up Visa", country: "Canada", track: "residency", region: "Americas", imageSlug: "canada", investment: "No fixed investment", timeline: "24–40+ months" },
  { name: "UK Innovator Founder Visa", country: "United Kingdom", track: "residency", region: "Europe", imageSlug: "united-kingdom", investment: "Credible business funding", timeline: "3–8 weeks" },
  { name: "New Zealand Active Investor Plus", country: "New Zealand", track: "residency", region: "Asia-Pacific", imageSlug: "new-zealand", investment: "High-capital route", timeline: "6–18+ months" },
  { name: "Singapore Global Investor Programme", country: "Singapore", track: "residency", region: "Asia-Pacific", imageSlug: "singapore", investment: "High-capital route", timeline: "9–18+ months" },
  { name: "Spain Digital Nomad Residence", country: "Spain", track: "residency", region: "Europe", imageSlug: "spain", investment: "No investment route", timeline: "1–4 months" },
  // Citizenship
  { name: "Italy by Descent", country: "Italy", track: "citizenship", region: "Europe", imageSlug: "italy", investment: "No investment route", timeline: "6–24+ months" },
  { name: "Caribbean CBI", country: "Caribbean", track: "citizenship", region: "Caribbean", imageSlug: "grenada", investment: "≈ 200k+ + fees", timeline: "3–8 months" },
  { name: "Malta (Exceptional Services)", country: "Malta", track: "citizenship", region: "Europe", imageSlug: "malta", investment: "≈ 600k–750k+", timeline: "12–36 months" },
  { name: "Turkey Citizenship by Investment", country: "Turkey", track: "citizenship", region: "Europe", imageSlug: "turkey", investment: "USD 400k+ real estate", timeline: "4–9 months" },
  { name: "Egypt Citizenship by Investment", country: "Egypt", track: "citizenship", region: "Africa & Middle East", imageSlug: "egypt", investment: "Route dependent", timeline: "6–12+ months" },
  { name: "Vanuatu Citizenship by Investment", country: "Vanuatu", track: "citizenship", region: "Asia-Pacific", imageSlug: "vanuatu", investment: "USD 130k+ donation", timeline: "2–4 months" },
  { name: "Antigua & Barbuda CBI", country: "Antigua and Barbuda", track: "citizenship", region: "Caribbean", imageSlug: "antigua-barbuda", investment: "USD 230k+ + fees", timeline: "4–8 months" },
  { name: "Dominica Citizenship by Investment", country: "Dominica", track: "citizenship", region: "Caribbean", imageSlug: "dominica", investment: "USD 200k+ + fees", timeline: "4–8 months" },
  { name: "Grenada Citizenship by Investment", country: "Grenada", track: "citizenship", region: "Caribbean", imageSlug: "grenada", investment: "USD 235k+ + fees", timeline: "4–8 months" },
  // Corporate mobility
  { name: "UAE Golden Visa", country: "United Arab Emirates", track: "corporate", region: "Africa & Middle East", imageSlug: "uae", investment: "Real estate ≈ AED 2M+", timeline: "2–6 weeks" },
  { name: "USA L-1 Intra-Company Transfer", country: "United States", track: "corporate", region: "Americas", imageSlug: "usa", investment: "Setup & payroll costs", timeline: "1–6 months" },
  { name: "USA E-2 Treaty Investor Visa", country: "United States", track: "corporate", region: "Americas", imageSlug: "usa", investment: "Substantial & active", timeline: "2–6 months" },
  { name: "UK Sponsor Licence + Skilled Worker", country: "United Kingdom", track: "corporate", region: "Europe", imageSlug: "united-kingdom", investment: "Sponsor & employment costs", timeline: "4–12+ weeks" },
  { name: "Singapore Employment Pass", country: "Singapore", track: "corporate", region: "Asia-Pacific", imageSlug: "singapore", investment: "Salary & employer costs", timeline: "3–8 weeks" },
  { name: "Canada Global Talent Stream", country: "Canada", track: "corporate", region: "Americas", imageSlug: "canada", investment: "Employer compliance costs", timeline: "2–8+ weeks" },
  // Skilled migration
  { name: "Canada Express Entry", country: "Canada", track: "skilled", region: "Americas", imageSlug: "canada", investment: "No investment route", timeline: "6–12 months" },
  { name: "Australia Skilled (189/190)", country: "Australia", track: "skilled", region: "Asia-Pacific", imageSlug: "australia", investment: "No investment route", timeline: "Round dependent" },
  { name: "USA EB-1A Extraordinary Ability", country: "United States", track: "skilled", region: "Americas", imageSlug: "usa", investment: "No investment route", timeline: "8–24+ months" },
  { name: "UK Global Talent Visa", country: "United Kingdom", track: "skilled", region: "Europe", imageSlug: "united-kingdom", investment: "No investment route", timeline: "3–10 weeks" },
  { name: "Germany EU Blue Card", country: "Germany", track: "skilled", region: "Europe", imageSlug: "germany", investment: "No investment route", timeline: "1–4 months" },
  { name: "New Zealand Skilled Migrant Category", country: "New Zealand", track: "skilled", region: "Asia-Pacific", imageSlug: "new-zealand", investment: "No investment route", timeline: "6–18+ months" },
];

const TRACK_FILTERS: Array<{ id: Track | "all"; label: string }> = [
  { id: "all", label: "All tracks" },
  { id: "residency", label: "Residency" },
  { id: "citizenship", label: "Citizenship" },
  { id: "corporate", label: "Corporate mobility" },
  { id: "skilled", label: "Skilled migration" },
];

const REGIONS = [
  "Africa & Middle East",
  "Europe",
  "Caribbean",
  "Asia-Pacific",
  "Americas",
];

function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return (
    <p
      className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
      style={{ color: GOLD }}
    >
      <span className="h-px w-8" style={{ background: GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
        {ar}
      </span>
    </p>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="shrink-0 rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition"
      style={{
        borderColor: active ? GOLD : "rgba(191,161,92,0.4)",
        background: active ? GOLD : "transparent",
        color: active ? NAVY : "rgba(238,243,251,0.82)",
      }}
    >
      {children}
    </button>
  );
}

export default function ToolsGallery({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [track, setTrack] = useState<Track | "all">("all");
  const [region, setRegion] = useState<string>("all");

  const visible = useMemo(
    () =>
      PROGRAMMES.filter(
        (p) =>
          (track === "all" || p.track === track) &&
          (region === "all" || p.region === region),
      ),
    [track, region],
  );

  const fade = reduce
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO + GALLERY (dark) ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-24 pt-28 text-[#eef3fb] sm:px-12 lg:px-16"
        style={{ background: `radial-gradient(120% 100% at 12% 0%, #13284f 0%, ${NAVY} 58%)` }}
      >
        <Ambient tone="dark" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div {...fade}>
            <Eyebrow ar="مستكشف البرامج">Programme Explorer</Eyebrow>
          </motion.div>
          <h1 className={`${serifClass} mt-5 text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[0.96]`}>
            Explore every programme.
          </h1>
          <motion.p
            {...(reduce
              ? {}
              : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: 0.2 } })}
            className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/75"
          >
            {PROGRAMMES.length} curated residency, citizenship, corporate-mobility and
            skilled-migration pathways across five regions. Filter the gallery, then open
            a private route review with a senior XIPHIAS advisor.
          </motion.p>

          {/* Filter chips */}
          <div className="mt-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by track">
              {TRACK_FILTERS.map((f) => (
                <Chip key={f.id} active={track === f.id} onClick={() => setTrack(f.id)}>
                  {f.label}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by region">
              <Chip active={region === "all"} onClick={() => setRegion("all")}>
                All regions
              </Chip>
              {REGIONS.map((r) => (
                <Chip key={r} active={region === r} onClick={() => setRegion(r)}>
                  {r}
                </Chip>
              ))}
            </div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-white/55">
              Showing{" "}
              <span style={{ color: GOLD }}>{visible.length}</span> of {PROGRAMMES.length} programmes
            </p>
          </div>
        </div>

        {/* Gallery grid */}
        <h2 className="sr-only">Programme gallery</h2>
        <div className="relative z-10 mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => {
            const stat = p.investment !== "No investment route" ? p.investment : p.timeline;
            const statLabel = p.investment !== "No investment route" ? "Min investment" : "Indicative timeline";
            return (
              <motion.a
                key={`${p.track}-${p.name}`}
                href="/contact"
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, y: 18 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.5, delay: Math.min(i * 0.04, 0.4), ease: [0.16, 1, 0.3, 1] },
                    })}
                className="group relative isolate flex flex-col overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-1.5"
                style={{ borderColor: "rgba(191,161,92,0.28)", background: "rgba(255,255,255,0.04)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(191,161,92,0.28)")}
              >
                {/* Full-bleed image thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={countryImage(p.imageSlug, p.region)}
                    alt={`${p.country} — ${p.name}`}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 [filter:brightness(0.82)_contrast(1.04)]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.94) 4%, rgba(8,18,42,0.32) 55%, rgba(8,18,42,0.1) 100%)" }}
                  />
                  <span
                    className="absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                    style={{ borderColor: "rgba(191,161,92,0.6)", background: "rgba(10,23,51,0.6)", color: GOLD }}
                  >
                    {TRACK_LABEL[p.track]}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    {p.country}
                  </p>
                  <h3 className={`${serifClass} mt-2 text-[1.4rem] font-medium leading-[1.08]`}>
                    {p.name}
                  </h3>
                  <div
                    className="mt-auto flex items-end justify-between gap-3 border-t pt-4"
                    style={{ borderColor: "rgba(255,255,255,0.12)" }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className={`${serifClass} text-[1.25rem] font-medium leading-none`} style={{ color: GOLD }}>
                        {stat}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                        {statLabel}
                      </span>
                    </div>
                    <span
                      aria-hidden
                      className="text-[15px] transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: GOLD }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="relative z-10 mx-auto mt-10 max-w-6xl text-center text-[15px] text-white/60">
            No programmes match this combination — clear a filter to see the full gallery.
          </p>
        )}
      </section>

      {/* ── Closing CTA (light) ── */}
      <section
        data-tone="light"
        className="relative isolate px-6 py-28 text-center text-[#0c1f3f] sm:px-12 lg:px-20"
        style={{ background: "#fbfaf7" }}
      >
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="flex justify-center">
            <Eyebrow ar="ابدأ">Begin</Eyebrow>
          </div>
          <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.02]`}>
            Found a programme that fits?{" "}
            <span className="italic" style={{ color: GOLD_DEEP }}>
              Let&apos;s pressure-test it.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-[#0c1f3f]/70">
            Share your goals and a senior XIPHIAS advisor will return a tailored route
            review — eligibility, true cost and timeline — privately, within 24 hours.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]"
              style={{ background: NAVY, color: "#eef3fb" }}
            >
              Book a private consultation{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
