"use client";

// VARIANT ② "Interactive Explorer" — app-like split for the XIPHIAS Passport
// Index suite reskin. Data is a faithful snapshot of the REAL server data in
// src/data/passport-index.ts (passportRecords / passportIndexStats) — same
// countries, ISO codes, ranks, scores, bands and advisory lens. Flags via the
// real @/components/Countries/Flag; imagery via @/components/Countries/country-image.

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Flag from "@/components/Countries/Flag";
import { countryImage } from "@/components/Countries/country-image";
import LuxeHeader from "@/components/HomeLuxe/LuxeHeader";
import LuxeFooter from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

/* Faithful snapshot of the real passportRecords (src/data/passport-index.ts):
   country, ISO-2 code, region, rank, score (visa-free), band, lens. `slug` maps
   to the country-image resolver; `profile` is the real /passport/[code] sub-route. */
type Passport = {
  country: string;
  code: string; // ISO-2
  slug: string; // country-image key
  region: string;
  rank: string;
  rankValue: number;
  score: number;
  band: string;
  lens: string;
  destImageRegion?: string;
};

const PASSPORTS: Passport[] = [
  { country: "Singapore", code: "SG", slug: "singapore", region: "Asia", rank: "1st", rankValue: 1, score: 192, band: "Elite access", lens: "Benchmark for long-term Asia access and family relocation optionality." },
  { country: "Japan", code: "JP", slug: "japan", region: "Asia", rank: "2nd", rankValue: 2, score: 188, band: "Elite access", lens: "One of Asia's strongest mobility profiles for benchmarking against Europe.", destImageRegion: "Asia-Pacific" },
  { country: "South Korea", code: "KR", slug: "south-korea", region: "Asia", rank: "2nd", rankValue: 2, score: 188, band: "Elite access", lens: "A top-tier comparison point for families evaluating second-residence strategy.", destImageRegion: "Asia-Pacific" },
  { country: "Denmark", code: "DK", slug: "denmark", region: "Europe", rank: "3rd", rankValue: 3, score: 186, band: "Elite access", lens: "A useful benchmark for clients planning Schengen and EU optionality.", destImageRegion: "Europe" },
  { country: "Luxembourg", code: "LU", slug: "luxembourg", region: "Europe", rank: "3rd", rankValue: 3, score: 186, band: "Elite access", lens: "Shows the value of EU access across residence and citizenship planning.", destImageRegion: "Europe" },
  { country: "Spain", code: "ES", slug: "spain", region: "Europe", rank: "3rd", rankValue: 3, score: 186, band: "Elite access", lens: "Spanish residence, EU living rights and long-term citizenship planning." },
  { country: "Sweden", code: "SE", slug: "sweden", region: "Europe", rank: "3rd", rankValue: 3, score: 186, band: "Elite access", lens: "Nordic mobility strength versus investment-migration routes.", destImageRegion: "Europe" },
  { country: "Switzerland", code: "CH", slug: "switzerland", region: "Europe", rank: "3rd", rankValue: 3, score: 186, band: "Elite access", lens: "For HNI families evaluating residence, tax and lifestyle planning." },
  { country: "United Arab Emirates", code: "AE", slug: "uae", region: "Middle East", rank: "5th", rankValue: 5, score: 184, band: "Elite access", lens: "Highly relevant for investor residence, business setup and Golden Visa planning." },
  { country: "Portugal", code: "PT", slug: "portugal", region: "Europe", rank: "5th group", rankValue: 5, score: 184, band: "Elite access", lens: "Low-presence residence, EU lifestyle and citizenship timelines." },
  { country: "Canada", code: "CA", slug: "canada", region: "North America", rank: "8th", rankValue: 8, score: 181, band: "High access", lens: "Skilled migration, start-up, entrepreneur and family settlement planning." },
  { country: "United States", code: "US", slug: "usa", region: "North America", rank: "Top 10", rankValue: 10, score: 179, band: "High access", lens: "EB-5, EB-1, NIW, L-1, H-1B and family risk-diversification discussions." },
  { country: "China", code: "CN", slug: "china", region: "Asia", rank: "59th", rankValue: 59, score: 141, band: "Strategic mobility", lens: "Rising mobility versus residence-by-investment and family-office strategy.", destImageRegion: "Asia-Pacific" },
  { country: "India", code: "IN", slug: "india", region: "Asia", rank: "80th", rankValue: 80, score: 55, band: "Strategic mobility", lens: "Start with the goal: visa-free travel, education, business, tax residence or Plan B.", destImageRegion: "Asia-Pacific" },
  { country: "Afghanistan", code: "AF", slug: "afghanistan", region: "Global South", rank: "Last", rankValue: 199, score: 24, band: "Restricted access", lens: "A mobility-gap benchmark, not an active XIPHIAS program recommendation.", destImageRegion: "Africa & Middle East" },
];

const STATS = {
  snapshotLabel: "2026 public snapshot",
  trackedPassports: 199,
  trackedDestinations: 227,
  topScore: 192,
  mobilityGap: 168,
};

const REGIONS = ["All", "Asia", "Europe", "Middle East", "North America", "Global South"];

const SUBROUTES = [
  { label: "Full ranking", href: "/passport-index/ranking" },
  { label: "Compare passports", href: "/passport-index/compare" },
  { label: "My passport", href: "/passport-index/my-passport" },
  { label: "Improve a passport", href: "/passport-index/improve" },
];

function bandColor(band: string) {
  if (band === "Elite access") return GOLD;
  if (band === "High access") return "#d8bd78";
  if (band === "Strategic mobility") return "#9fb0cf";
  return "#c98b6b";
}

export default function PassportExplorer({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [selectedCode, setSelectedCode] = useState("SG");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PASSPORTS.filter((p) => {
      const matchesRegion = region === "All" || p.region === region;
      const matchesQuery = !q || p.country.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
      return matchesRegion && matchesQuery;
    }).sort((a, b) => a.rankValue - b.rankValue);
  }, [query, region]);

  const selected = useMemo(
    () => PASSPORTS.find((p) => p.code === selectedCode) ?? PASSPORTS[0],
    [selectedCode],
  );

  const heroImg = countryImage(selected.slug, selected.destImageRegion);
  const profileHref = `/passport-index/passport/${selected.code.toLowerCase()}`;
  const ease = reduce ? undefined : ([0.16, 1, 0.3, 1] as const);

  return (
    <div className="bg-[#fbfaf7] text-[#0c1f3f]">
      <LuxeHeader serifClass={serifClass} />

      <main id="main">
        {/* ── Landing hero ─────────────────────────────────────────── */}
        <section
          className="relative isolate overflow-hidden px-6 pb-20 pt-28 text-[#eef3fb] sm:px-12 lg:px-20"
          style={{ background: `radial-gradient(120% 90% at 80% 0%, #13284f 0%, ${NAVY} 62%)` }}
        >
          <Image
            src={countryImage("singapore")}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(180deg, rgba(10,23,51,0.78), rgba(10,23,51,0.94))` }} />
          <Ambient tone="dark" />

          <div className="relative z-10 mx-auto max-w-6xl">
            <p className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
              <span className="h-px w-8" style={{ background: GOLD }} />
              XIPHIAS Passport Index
              <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">مؤشر الجوازات</span>
            </p>
            <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.3rem,5vw,4rem)] font-medium leading-[1.04]`}>
              Explore the world&apos;s passports, <span className="italic" style={{ color: GOLD }}>side by side</span>.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
              Search any passport, read its real power score and visa-free reach, then turn
              mobility ranking into an advisor-led route plan. {STATS.snapshotLabel}.
            </p>

            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["199", "Passports tracked"],
                ["227", "Destinations"],
                ["192", "Top power score"],
                ["168", "Mobility gap"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className={`${serifClass} text-[clamp(1.8rem,4vw,2.6rem)] font-medium`} style={{ color: GOLD }}>{n}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/55">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Interactive Explorer (split) ─────────────────────────── */}
        <section className="relative isolate bg-[#f7f4ef] px-6 py-16 sm:px-12 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <h2 className={`${serifClass} text-[clamp(1.7rem,3.4vw,2.6rem)] font-medium`} style={{ color: INK }}>
              The interactive explorer
            </h2>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#3c485e]">
              Pick a passport on the left — the profile updates instantly on the right.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              {/* LEFT — searchable list */}
              <div className="rounded-2xl border border-[#e4ddcf] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(12,31,63,0.4)]">
                <label htmlFor="pp-search" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b7588]">
                  Search passports
                </label>
                <input
                  id="pp-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Country or ISO code…"
                  className="mt-2 w-full rounded-lg border border-[#dfd7c7] bg-[#fbfaf7] px-4 py-2.5 text-[15px] text-[#0c1f3f] outline-none focus:border-[#bfa15c] focus:ring-2 focus:ring-[#bfa15c]/30"
                />

                <fieldset className="mt-4">
                  <legend className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b7588]">Region</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {REGIONS.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRegion(r)}
                        aria-pressed={region === r}
                        className={`rounded-full border px-3 py-1 text-[12px] font-medium transition ${
                          region === r
                            ? "border-transparent bg-[#0a1733] text-white"
                            : "border-[#dfd7c7] bg-white text-[#3c485e] hover:border-[#bfa15c]"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <ul className="mt-5 max-h-[26rem] space-y-1.5 overflow-y-auto pr-1" aria-label="Passport list">
                  {filtered.map((p) => {
                    const active = p.code === selectedCode;
                    return (
                      <li key={p.code}>
                        <button
                          type="button"
                          onClick={() => setSelectedCode(p.code)}
                          onMouseEnter={() => setSelectedCode(p.code)}
                          onFocus={() => setSelectedCode(p.code)}
                          aria-pressed={active}
                          className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                            active
                              ? "border-[#bfa15c] bg-[#bfa15c]/10"
                              : "border-transparent hover:bg-[#f4efe6]"
                          }`}
                        >
                          <Flag code={p.code} size={34} />
                          <span className="min-w-0 flex-1">
                            <span className={`${serifClass} block truncate text-[1.05rem] font-medium`} style={{ color: INK }}>
                              {p.country}
                            </span>
                            <span className="text-[11px] uppercase tracking-[0.12em] text-[#8a93a5]">
                              {p.code} · Rank {p.rank}
                            </span>
                          </span>
                          <span className={`${serifClass} text-[1.2rem] font-medium`} style={{ color: GOLD_DEEP }}>
                            {p.score}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                  {filtered.length === 0 && (
                    <li className="px-3 py-6 text-center text-[14px] text-[#8a93a5]">No passports match your search.</li>
                  )}
                </ul>
              </div>

              {/* RIGHT — spotlight */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.code}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease }}
                  className="relative isolate overflow-hidden rounded-2xl border border-[#1c3157] text-[#eef3fb] shadow-[0_24px_70px_-32px_rgba(10,23,51,0.7)]"
                  style={{ background: NAVY }}
                >
                  <Image
                    src={heroImg}
                    alt={`${selected.country} — country imagery`}
                    fill
                    sizes="(min-width:1024px) 55vw, 100vw"
                    className="object-cover opacity-30"
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(10,23,51,0.55), rgba(10,23,51,0.93))` }} />

                  <div className="relative z-10 flex h-full flex-col p-7 sm:p-9">
                    <div className="flex items-center gap-4">
                      <Flag code={selected.code} size={72} className="ring-white/30" />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: bandColor(selected.band) }}>
                          {selected.band}
                        </p>
                        <h3 className={`${serifClass} text-[clamp(1.8rem,3.4vw,2.6rem)] font-medium leading-tight`}>
                          {selected.country}
                        </h3>
                        <p className="text-[12px] uppercase tracking-[0.14em] text-white/50">
                          {selected.code} · {selected.region}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-5">
                      <div>
                        <div className={`${serifClass} text-[clamp(2.2rem,5vw,3.4rem)] font-medium leading-none`} style={{ color: GOLD }}>
                          {selected.score}
                        </div>
                        <div className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-white/55">Power score</div>
                      </div>
                      <div>
                        <div className={`${serifClass} text-[clamp(2.2rem,5vw,3.4rem)] font-medium leading-none`}>
                          {selected.score}
                        </div>
                        <div className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-white/55">Visa-free reach</div>
                      </div>
                      <div>
                        <div className={`${serifClass} text-[clamp(2.2rem,5vw,3.4rem)] font-medium leading-none`}>
                          {selected.rank}
                        </div>
                        <div className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-white/55">Global rank</div>
                      </div>
                    </div>

                    <p className="mt-7 max-w-lg rounded-xl border border-[#bfa15c]/30 bg-[#bfa15c]/[0.08] px-5 py-4 text-[14.5px] leading-relaxed text-white/85">
                      <span className="font-semibold" style={{ color: GOLD }}>XIPHIAS lens — </span>
                      {selected.lens}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-3 pt-8">
                      <a
                        href={profileHref}
                        className="group inline-flex items-center gap-2 rounded-full bg-[#bfa15c] px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0c1f3f] transition hover:bg-[#d8bd78]"
                      >
                        Full profile <span className="transition-transform group-hover:translate-x-1">→</span>
                      </a>
                      <a
                        href="/passport-index/improve"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:border-[#bfa15c] hover:text-[#bfa15c]"
                      >
                        Improve this passport <span className="transition-transform group-hover:translate-x-1">→</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── Sub-route rail ───────────────────────────────────────── */}
        <section className="bg-[#fbfaf7] px-6 py-14 sm:px-12 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <h2 className={`${serifClass} text-[clamp(1.5rem,3vw,2.2rem)] font-medium`} style={{ color: INK }}>
              The full suite
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SUBROUTES.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  className="group flex items-center justify-between rounded-xl border border-[#e4ddcf] bg-white px-5 py-4 transition hover:border-[#bfa15c] hover:shadow-[0_16px_40px_-26px_rgba(12,31,63,0.4)]"
                >
                  <span className={`${serifClass} text-[1.1rem] font-medium`} style={{ color: INK }}>{r.label}</span>
                  <span className="transition-transform group-hover:translate-x-1" style={{ color: GOLD_DEEP }}>→</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing CTA ──────────────────────────────────────────── */}
        <section
          className="relative isolate overflow-hidden px-6 py-20 text-center text-[#eef3fb] sm:px-12 lg:px-20"
          style={{ background: `radial-gradient(110% 120% at 50% 0%, #13284f 0%, ${NAVY} 60%)` }}
        >
          <Image src={countryImage("uae")} alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(10,23,51,0.8), rgba(10,23,51,0.95))` }} />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className={`${serifClass} text-[clamp(1.9rem,4vw,3rem)] font-medium leading-tight`}>
              Turn your passport score into a <span className="italic" style={{ color: GOLD }}>route plan</span>.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/75">
              Our advisors translate mobility ranking into a second-residence or citizenship strategy for your family.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/eligibility" className="group inline-flex items-center gap-2 rounded-full bg-[#bfa15c] px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0c1f3f] transition hover:bg-[#d8bd78]">
                Check your eligibility <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:border-[#bfa15c] hover:text-[#bfa15c]">
                Speak to an advisor
              </a>
            </div>
          </div>
        </section>
      </main>

      <LuxeFooter serifClass={serifClass} />
    </div>
  );
}
