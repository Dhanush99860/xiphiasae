"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import LuxeHeader from "@/components/HomeLuxe/LuxeHeader";
import LuxeFooter from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import Flag from "@/components/Countries/Flag";
import { countryImage } from "@/components/Countries/country-image";
import type { PassportRecord } from "@/data/passport-index";
import type { PassportStats } from "@/components/PassportIndex/PassportIndexShared";

/**
 * Variant ① "Power Index" — navy/gold luxury landing for /passport-index.
 * Wired to the REAL loader data (passportRecords + passportIndexStats) passed in
 * from the server page. Renders its own LuxeHeader/LuxeFooter chrome.
 */

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

type Props = {
  records: PassportRecord[];
  stats: PassportStats;
  serifClass: string;
};

/** Map a passport ISO-2 code → the country-image slug, when one exists. */
const CODE_TO_SLUG: Record<string, string> = {
  SG: "singapore",
  ES: "spain",
  CH: "switzerland",
  AE: "uae",
  PT: "portugal",
  CA: "canada",
  US: "usa",
};

const SUBROUTES = [
  { label: "Full ranking", href: "/passport-index/ranking", note: "All 199 passports" },
  { label: "Compare", href: "/passport-index/compare", note: "Two passports, side by side" },
  { label: "My passport", href: "/passport-index/my-passport", note: "Your personal mobility report" },
  { label: "Improve mobility", href: "/passport-index/improve", note: "Routes to a stronger passport" },
];

function Eyebrow({ children, ar, tone = "dark" }: { children: React.ReactNode; ar?: string; tone?: "dark" | "light" }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: tone === "dark" ? GOLD : GOLD_DEEP }}>
      <span className="h-px w-8" style={{ background: tone === "dark" ? GOLD : GOLD_DEEP }} />
      {children}
      {ar ? <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span> : null}
    </p>
  );
}

export default function PassportPowerClient({ records, stats, serifClass }: Props) {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");

  const top = records[0];
  const max = stats.trackedDestinations;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return records;
    return records.filter(
      (r) =>
        r.country.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q) ||
        r.region.toLowerCase().includes(q),
    );
  }, [query, records]);

  return (
    <div className="bg-[#0a1733]">
      <LuxeHeader serifClass={serifClass} />

      {/* HERO — full-screen full-bleed real image, navy gradient scrims for legibility */}
      <section data-tone="dark" className="relative flex min-h-screen items-center overflow-hidden text-[#eef3fb]" style={{ background: NAVY }}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={reduce ? { scale: 1.12 } : { scale: 1 }} transition={{ duration: 8, ease: "easeOut" }}>
          <Image src="/images/blogs/american-passport-visa-free.webp" alt="" fill priority sizes="100vw" className="object-cover [filter:grayscale(0.5)_brightness(0.55)_contrast(1.05)]" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.3) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.8) 0%, transparent 45%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-40 sm:px-12 lg:px-20">
          <Eyebrow ar="مؤشر الجوازات">Passport Index</Eyebrow>
          <h1 className={`${serifClass} mt-6 max-w-4xl text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.02]`}>
            The Power Index — how far your <span className="italic" style={{ color: GOLD }}>passport</span> reaches.
          </h1>
          <p className="mt-6 max-w-2xl text-[clamp(1rem,1.6vw,1.25rem)] leading-relaxed text-white/75">
            A living ranking of global mobility — {stats.trackedPassports} passports scored across {stats.trackedDestinations} destinations. Find your standing, then plan the residence or citizenship route that closes the gap.
          </p>
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
            {[["Passports tracked", stats.trackedPassports], ["Destinations", stats.trackedDestinations], ["Top score", stats.topScore], ["Mobility gap", stats.mobilityGap]].map(([k, v]) => (
              <div key={String(k)}>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-white/45">{k}</dt>
                <dd className={`${serifClass} mt-1 text-[2rem] font-medium`} style={{ color: GOLD }}>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-white/40">{stats.snapshotLabel}</p>
        </div>
        <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-white/55"><span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span><span className="block h-9 w-px" style={{ background: `linear-gradient(${GOLD},transparent)` }} /></div>
      </section>

      {/* TOP-PASSPORT SPOTLIGHT — real country image + flag */}
      <section className="relative isolate overflow-hidden px-6 py-20 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: `radial-gradient(110% 100% at 15% 0%, #13284f 0%, ${NAVY} 60%)` }}>
        <Ambient tone="dark" />
        <div className="relative mx-auto max-w-6xl">
          <Eyebrow ar="الأقوى عالمياً">Number one</Eyebrow>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:items-center">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-white/15"
            >
              <Image src={countryImage(CODE_TO_SLUG[top.code] ?? "", top.region)} alt={`${top.country} skyline`} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 35%, rgba(10,23,51,0.85) 100%)" }} />
              <div className="absolute bottom-5 left-5 flex items-center gap-3">
                <Flag code={top.code} size={44} />
                <span className={`${serifClass} text-2xl font-medium`}>{top.country}</span>
              </div>
            </motion.div>
            <div>
              <h2 className={`${serifClass} text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05]`}>
                {top.country} leads the <span className="italic" style={{ color: GOLD }}>index</span>.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/75">
                With {top.score} destinations reachable visa-free, the {top.country} passport sets the global benchmark for mobility — the standard against which every second-residence and citizenship strategy is measured.
              </p>
              <div className="mt-8 flex items-end gap-10">
                <div>
                  <div className={`${serifClass} text-[clamp(3rem,6vw,4.5rem)] font-medium leading-none`} style={{ color: GOLD }}>{top.score}</div>
                  <div className="mt-1 text-[12px] uppercase tracking-[0.16em] text-white/50">visa-free destinations</div>
                </div>
                <div>
                  <div className={`${serifClass} text-[clamp(2rem,4vw,3rem)] font-medium leading-none`}>#{top.rankValue}</div>
                  <div className="mt-1 text-[12px] uppercase tracking-[0.16em] text-white/50">global rank</div>
                </div>
              </div>
              <Link href="/passport-index/ranking" className="group mt-9 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
                See the full ranking <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* POWER RANKING — searchable list of real passports */}
      <section className="px-6 py-20 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow ar="الترتيب">Power ranking</Eyebrow>
              <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05]`}>
                Every passport, by <span className="italic" style={{ color: GOLD }}>reach</span>.
              </h2>
            </div>
            <div className="w-full max-w-xs">
              <label htmlFor="ppi-search" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Search passports</label>
              <input
                id="ppi-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Country, region or ISO code"
                className="mt-2 w-full rounded-lg border px-4 py-2.5 text-[15px] text-[#eef3fb] outline-none placeholder:text-white/35 focus:ring-2"
                style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.04)" }}
              />
            </div>
          </div>

          <ul className="mt-10 flex flex-col divide-y" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {filtered.map((r, idx) => (
              <motion.li
                key={r.code}
                initial={reduce ? false : { opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: Math.min(idx, 8) * 0.04 }}
                className="border-t border-white/8"
              >
                <Link
                  href={`/passport-index/passport/${r.code.toLowerCase()}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 transition-colors hover:bg-white/[0.03] sm:gap-6"
                >
                  <span className={`${serifClass} w-12 text-[1.4rem] font-medium tabular-nums`} style={{ color: GOLD }}>#{r.rankValue}</span>
                  <span className="flex min-w-0 items-center gap-3">
                    <Flag code={r.code} size={34} />
                    <span className="min-w-0">
                      <span className={`${serifClass} block truncate text-[1.2rem] font-medium`}>{r.country}</span>
                      <span className="text-[11px] uppercase tracking-[0.14em] text-white/45">{r.region} · {r.band}</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="hidden w-40 sm:block">
                      <span className="block h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <motion.span
                          initial={reduce ? false : { width: 0 }}
                          whileInView={{ width: `${(r.score / max) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          className="block h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${GOLD}, #d8bd78)` }}
                        />
                      </span>
                    </span>
                    <span className="text-right">
                      <span className={`${serifClass} block text-[1.3rem] font-medium`} style={{ color: GOLD }}>{r.score}</span>
                      <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">visa-free</span>
                    </span>
                    <span className="text-white/30 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </motion.li>
            ))}
            {filtered.length === 0 ? (
              <li className="py-10 text-center text-[15px] text-white/55">No passport matches &ldquo;{query}&rdquo;.</li>
            ) : null}
          </ul>
        </div>
      </section>

      {/* QUICK LINKS — real sub-routes */}
      <section className="px-6 py-20 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: `radial-gradient(110% 100% at 85% 0%, #13284f 0%, ${NAVY} 60%)` }}>
        <div className="mx-auto max-w-6xl">
          <Eyebrow ar="الأدوات">Explore the suite</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05]`}>Put the index to work.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SUBROUTES.map((s, idx) => (
              <motion.div
                key={s.href}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
              >
                <Link
                  href={s.href}
                  className="group flex h-full flex-col justify-between rounded-2xl border p-6 transition-colors hover:border-[#bfa15c]/60"
                  style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.03)", minHeight: 180 }}
                >
                  <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">{s.note}</span>
                  <span className={`${serifClass} mt-6 inline-flex items-center gap-2 text-[1.4rem] font-medium`}>
                    {s.label}
                    <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: GOLD }}>→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow ar="استشارة خاصة">Your move</Eyebrow>
          <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.6vw,3.6rem)] font-medium leading-[1.05]`}>
            Turn your ranking into a <span className="italic" style={{ color: GOLD }}>route</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
            See where your passport stands today, then plan the residence or citizenship pathway that closes the mobility gap — guided by a XIPHIAS advisor.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/eligibility" className="rounded-full px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#0c1f3f] transition-transform hover:-translate-y-0.5" style={{ background: GOLD }}>
              Check your eligibility
            </Link>
            <Link href="/contact" className="rounded-full border px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-[#bfa15c]" style={{ borderColor: "rgba(255,255,255,0.3)", color: "#eef3fb" }}>
              Speak to an advisor
            </Link>
          </div>
        </div>
      </section>

      <LuxeFooter serifClass={serifClass} />
    </div>
  );
}
