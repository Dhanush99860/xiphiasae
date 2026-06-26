"use client";

/**
 * MIX — "Gallery + Spotlight" for the XIPHIAS Programme Explorer reskin
 * (representative of the Tools cluster). A blend of two approved variants:
 *  ① ToolsGallery — dark navy hero + gold track/region FILTER CHIPS + a visual
 *      GRID of programme cards, each with a real full-bleed countryImage() and a
 *      gold key stat.
 *  ③ ToolsSplit  — a large SPOTLIGHT panel: a real full-bleed image of the ACTIVE
 *      programme, serif name, country · track, key stats and "View programme →",
 *      updated by client state.
 *
 * THE MIX: dark navy throughout. Hero ("Explore every programme." + live count) +
 * gold filter chips at the top → a large featured SPOTLIGHT of the active programme
 * → below it the visual GALLERY GRID (filtered by the chips). Hovering or clicking
 * a card sets the active programme, which updates the spotlight above. Default
 * active is the first programme.
 *
 * DATA: programmes mirror the real XIPHIAS programme catalog
 *   (src/lib/eligibility/programCatalog.ts) — the same source the live
 *   /programme-explorer and /compare-programs pages are built from via
 *   getProgrammeExplorerData(). Fields used: name, country, track (vertical),
 *   pathway, minInvestmentUSD, processingTime, familyIncluded,
 *   requiresPhysicalPresence. The server-only loader can't run in a client
 *   preview, so the catalog rows are mirrored here verbatim (copied from
 *   ToolsSplit) — no invented programmes. Imagery is resolved per-programme by
 *   the client-safe countryImage() helper (src/components/Countries/country-image.ts).
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

// Real catalog rows (mirror of src/lib/eligibility/programCatalog.ts) — copied
// verbatim from ToolsSplit so the mix reuses the SAME array. No invented programmes.
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

const TRACK_FILTERS: Array<{ id: Track | "all"; label: string }> = [
  { id: "all", label: "All tracks" },
  { id: "residency", label: "Residency" },
  { id: "citizenship", label: "Citizenship" },
  { id: "corporate", label: "Corporate mobility" },
  { id: "skilled", label: "Skilled migration" },
];

const REGIONS = ["Africa & Middle East", "Europe", "Caribbean", "Asia-Pacific", "Americas"];

function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar: string; light?: boolean }) {
  return (
    <p
      className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
      style={{ color: light ? GOLD_DEEP : GOLD }}
    >
      <span className="h-px w-8" style={{ background: light ? GOLD_DEEP : GOLD }} />
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

export default function ToolsMix({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [track, setTrack] = useState<Track | "all">("all");
  const [region, setRegion] = useState<string>("all");
  const [activeId, setActiveId] = useState<string>(PROGRAMMES[0].id);

  const visible = useMemo(
    () =>
      PROGRAMMES.filter(
        (p) =>
          (track === "all" || p.track === track) &&
          (region === "all" || p.region === region),
      ),
    [track, region],
  );

  // Active programme follows the filter: prefer the hovered/clicked id while it
  // remains visible, otherwise fall back to the first visible card.
  const active = visible.find((p) => p.id === activeId) ?? visible[0] ?? PROGRAMMES[0];

  const reset = () => {
    setTrack("all");
    setRegion("all");
  };

  const fade = reduce
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO + FILTERS + SPOTLIGHT + GALLERY (dark) ── */}
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
            skilled-migration pathways across five regions. Filter the gallery, hover a
            card to preview it in the spotlight, then open a private route review with a
            senior XIPHIAS advisor.
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
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-[12px] uppercase tracking-[0.2em] text-white/55">
                Showing <span style={{ color: GOLD }}>{visible.length}</span> of {PROGRAMMES.length} programmes
              </p>
              {(track !== "all" || region !== "all") && (
                <button
                  type="button"
                  onClick={reset}
                  className="text-[12px] font-semibold uppercase tracking-[0.16em] underline-offset-4 transition hover:underline"
                  style={{ color: GOLD }}
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── SPOTLIGHT (from ③) — full-bleed image of the active programme ── */}
        <h2 className="sr-only">Programme spotlight</h2>
        {visible.length > 0 && (
          <motion.div
            key={active.id}
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                })}
            className="relative z-10 mx-auto mt-12 flex min-h-[28rem] max-w-6xl flex-col overflow-hidden rounded-lg border lg:min-h-[34rem]"
            style={{ borderColor: "rgba(191,161,92,0.35)" }}
          >
            <Image
              src={countryImage(active.imageSlug, active.region)}
              alt={`${active.name} — ${active.country}`}
              fill
              sizes="(min-width:1024px) 72rem, 100vw"
              className="object-cover [filter:grayscale(0.25)_brightness(0.7)_contrast(1.05)]"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.97) 0%, rgba(8,18,42,0.55) 46%, rgba(8,18,42,0.2) 100%)" }}
            />
            <span aria-hidden className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2" style={{ borderColor: GOLD }} />
            <span aria-hidden className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2" style={{ borderColor: GOLD }} />

            <div className="relative mt-auto p-6 sm:p-9">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>
                {active.country} · {TRACK_LABELS[active.track]} · {active.region}
              </span>
              <h3 className={`${serifClass} mt-3 text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[0.99]`}>
                {active.name}
              </h3>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-white/75">{active.pathway}</p>

              <dl
                className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4 border-t pt-5 sm:grid-cols-4"
                style={{ borderColor: "rgba(255,255,255,0.14)" }}
              >
                {[
                  { k: "Min. investment", v: active.investment },
                  { k: "Timeline", v: active.timeline },
                  { k: "Family", v: active.family },
                  { k: "Presence", v: active.presence },
                ].map((stat) => (
                  <div key={stat.k} className="flex flex-col gap-1">
                    <dd className={`${serifClass} text-[1.1rem] font-medium leading-tight`} style={{ color: GOLD }}>
                      {stat.v}
                    </dd>
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
        )}

        {/* ── GALLERY GRID (from ①) — hover/click a card to set the spotlight ── */}
        <h2 className="sr-only">Programme gallery</h2>
        <div className="relative z-10 mx-auto mt-8 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => {
            const isActive = p.id === active.id;
            const stat = p.investment !== "No investment route" && p.investment !== "N/A" ? p.investment : p.timeline;
            const statLabel =
              p.investment !== "No investment route" && p.investment !== "N/A" ? "Min investment" : "Indicative timeline";
            return (
              <motion.button
                key={p.id}
                type="button"
                onMouseEnter={() => setActiveId(p.id)}
                onFocus={() => setActiveId(p.id)}
                onClick={() => setActiveId(p.id)}
                aria-pressed={isActive}
                aria-label={`Preview ${p.name} — ${p.country}`}
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, y: 18 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.5, delay: Math.min(i * 0.04, 0.4), ease: [0.16, 1, 0.3, 1] },
                    })}
                className="group relative isolate flex flex-col overflow-hidden rounded-lg border text-left transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  borderColor: isActive ? GOLD : "rgba(191,161,92,0.28)",
                  background: isActive ? "rgba(191,161,92,0.1)" : "rgba(255,255,255,0.04)",
                }}
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
                    {TRACK_LABELS[p.track]}
                  </span>
                  {isActive && (
                    <span
                      className="absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                      style={{ background: GOLD, color: NAVY }}
                    >
                      In spotlight
                    </span>
                  )}
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">{p.country}</p>
                  <h3 className={`${serifClass} mt-2 text-[1.4rem] font-medium leading-[1.08]`}>{p.name}</h3>
                  <div
                    className="mt-auto flex items-end justify-between gap-3 border-t pt-4"
                    style={{ borderColor: "rgba(255,255,255,0.12)" }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className={`${serifClass} text-[1.25rem] font-medium leading-none`} style={{ color: GOLD }}>
                        {stat}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">{statLabel}</span>
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
              </motion.button>
            );
          })}
        </div>

        {visible.length === 0 && (
          <div className="relative z-10 mx-auto mt-10 max-w-6xl text-center">
            <p className="text-[15px] text-white/60">
              No programmes match this combination — clear a filter to see the full gallery.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em]"
              style={{ borderColor: GOLD, color: GOLD }}
            >
              Reset filters
            </button>
          </div>
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
            <Eyebrow ar="ابدأ" light>Begin</Eyebrow>
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
              Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
