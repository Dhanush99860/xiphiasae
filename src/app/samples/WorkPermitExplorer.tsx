"use client";

// VARIANT ① "Destination Explorer" — app-like split for the XIA "Work Permit
// Intelligence" module. Uses the REAL workPermitCountries data from
// src/lib/work-permits.ts (8 destinations: Canada, USA, UK, Australia, Germany,
// UAE, Portugal, Spain) — each country's own `image`, permitTypes, routeReadiness,
// advisorChecks and real `href`. Flags via @/components/Countries/Flag (the data
// already carries ISO-2 codes). Locked navy/gold system + reused luxe chrome.

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Flag from "@/components/Countries/Flag";
import LuxeHeader from "@/components/HomeLuxe/LuxeHeader";
import LuxeFooter from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { workPermitCountries } from "@/lib/work-permits";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

export default function WorkPermitExplorer({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  // Default = Canada (first real destination).
  const [activeSlug, setActiveSlug] = useState(workPermitCountries[0].slug);

  const selected = useMemo(
    () => workPermitCountries.find((c) => c.slug === activeSlug) ?? workPermitCountries[0],
    [activeSlug],
  );

  const ease = reduce ? undefined : ([0.16, 1, 0.3, 1] as const);

  return (
    <div className="bg-[#fbfaf7] text-[#0c1f3f]">
      <LuxeHeader serifClass={serifClass} />

      <main id="main">
        {/* ── Dark navy hero ───────────────────────────────────────── */}
        <section
          data-tone="dark"
          className="relative isolate overflow-hidden px-6 pb-20 pt-28 text-[#eef3fb] sm:px-12 lg:px-20"
          style={{ background: `radial-gradient(120% 90% at 80% 0%, #13284f 0%, ${NAVY} 62%)` }}
        >
          <Image
            src={selected.image}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-25"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{ background: "linear-gradient(180deg, rgba(10,23,51,0.80), rgba(10,23,51,0.94))" }}
          />
          <Ambient tone="dark" />

          <div className="relative z-10 mx-auto max-w-6xl">
            <p className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
              <span className="h-px w-8" style={{ background: GOLD }} />
              XIA · Work Permit Intelligence
              <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
                ذكاء تصاريح العمل
              </span>
            </p>
            <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.3rem,5vw,4rem)] font-medium leading-[1.04]`}>
              Where can you <span className="italic" style={{ color: GOLD }}>work next?</span>
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
              Assess employer-led and points-based work routes across eight destinations.
              Read each market&apos;s permit types, route readiness and advisor checks — then
              turn intent into an advisor-reviewed plan.
            </p>

            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["8", "Destinations"],
                ["Employer", "Sponsor-led routes"],
                ["Points", "Profile-based routes"],
                ["1:1", "Advisor review"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className={`${serifClass} text-[clamp(1.6rem,3.6vw,2.4rem)] font-medium`} style={{ color: GOLD }}>{n}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/55">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Destination Explorer (split) ─────────────────────────── */}
        <section data-tone="light" className="relative isolate bg-[#f7f4ef] px-6 py-16 sm:px-12 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <h2 className={`${serifClass} text-[clamp(1.7rem,3.4vw,2.6rem)] font-medium`} style={{ color: INK }}>
              The destination explorer
            </h2>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#3c485e]">
              Pick a destination — the spotlight updates instantly with its work routes,
              readiness and advisor checks.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              {/* LEFT — destination chip grid */}
              <div className="rounded-2xl border border-[#e4ddcf] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(12,31,63,0.4)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b7588]">
                  Destinations
                </p>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2" aria-label="Work permit destinations">
                  {workPermitCountries.map((c) => {
                    const active = c.slug === activeSlug;
                    return (
                      <li key={c.slug}>
                        <button
                          type="button"
                          onClick={() => setActiveSlug(c.slug)}
                          onMouseEnter={() => setActiveSlug(c.slug)}
                          onFocus={() => setActiveSlug(c.slug)}
                          aria-pressed={active}
                          className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                            active
                              ? "border-[#bfa15c] bg-[#bfa15c]/10"
                              : "border-transparent hover:bg-[#f4efe6]"
                          }`}
                        >
                          <Flag code={c.code} size={34} />
                          <span className="min-w-0 flex-1">
                            <span className={`${serifClass} block truncate text-[1.02rem] font-medium`} style={{ color: INK }}>
                              {c.country}
                            </span>
                            <span className="block truncate text-[11px] uppercase tracking-[0.12em] text-[#8a93a5]">
                              {c.region}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* RIGHT — spotlight of the selected destination */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.slug}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease }}
                  className="relative isolate overflow-hidden rounded-2xl border border-[#1c3157] text-[#eef3fb] shadow-[0_24px_70px_-32px_rgba(10,23,51,0.7)]"
                  style={{ background: NAVY }}
                >
                  <Image
                    src={selected.image}
                    alt={`${selected.country} — work and relocation imagery`}
                    fill
                    sizes="(min-width:1024px) 55vw, 100vw"
                    className="object-cover opacity-30"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,23,51,0.55), rgba(10,23,51,0.93))" }} />

                  <div className="relative z-10 flex h-full flex-col p-7 sm:p-9">
                    <div className="flex items-center gap-4">
                      <Flag code={selected.code} size={72} className="ring-white/30" />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                          {selected.region}
                        </p>
                        <h3 className={`${serifClass} text-[clamp(1.8rem,3.4vw,2.6rem)] font-medium leading-tight`}>
                          {selected.country}
                        </h3>
                        <p className="text-[12px] uppercase tracking-[0.14em] text-white/50">
                          {selected.processingSignal}
                        </p>
                      </div>
                    </div>

                    {/* Permit types as gold chips */}
                    <div className="mt-7">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                        Permit types
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selected.permitTypes.map((p) => (
                          <span
                            key={p}
                            className="rounded-full border border-[#bfa15c]/45 bg-[#bfa15c]/[0.12] px-3 py-1 text-[12.5px] font-medium"
                            style={{ color: GOLD }}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Route readiness — the 3 items */}
                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      {selected.routeReadiness.map((r) => (
                        <div key={r.label} className="rounded-xl border border-white/12 bg-white/[0.04] p-4">
                          <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/55">
                            {r.label}
                          </p>
                          <p className={`${serifClass} mt-1 text-[1.15rem] font-medium`} style={{ color: GOLD }}>
                            {r.value}
                          </p>
                          <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/70">
                            {r.detail}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* A couple of advisor checks */}
                    <div className="mt-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                        Advisor checks
                      </p>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {selected.advisorChecks.slice(0, 2).map((check) => (
                          <li key={check} className="flex items-start gap-2.5 text-[14px] text-white/85">
                            <span aria-hidden className="mt-1 shrink-0" style={{ color: GOLD }}>✓</span>
                            <span>{check}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto flex flex-wrap gap-3 pt-8">
                      <a
                        href={selected.href}
                        className="group inline-flex items-center gap-2 rounded-full bg-[#bfa15c] px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0c1f3f] transition hover:bg-[#d8bd78]"
                      >
                        Explore {selected.country} routes
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </a>
                      <a
                        href="/contact"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:border-[#bfa15c] hover:text-[#bfa15c]"
                      >
                        Get an advisor review
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── Closing CTA ──────────────────────────────────────────── */}
        <section
          data-tone="dark"
          className="relative isolate overflow-hidden px-6 py-20 text-center text-[#eef3fb] sm:px-12 lg:px-20"
          style={{ background: `radial-gradient(110% 120% at 50% 0%, #13284f 0%, ${NAVY} 60%)` }}
        >
          <Image src={selected.image} alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,23,51,0.82), rgba(10,23,51,0.95))" }} />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className={`${serifClass} text-[clamp(1.9rem,4vw,3rem)] font-medium leading-tight`}>
              Turn a work route into a <span className="italic" style={{ color: GOLD }}>filed plan</span>.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/75">
              Our advisors assess your profile against employer-led and points-based routes,
              then build a document and timing strategy for your move.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-[#bfa15c] px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0c1f3f] transition hover:bg-[#d8bd78]">
                Get an advisor review <span className="transition-transform group-hover:translate-x-1">→</span>
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
