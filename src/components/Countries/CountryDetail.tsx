"use client";

/**
 * Navy/gold DETAIL view for /countries/[country] — the country-first page that
 * aggregates EVERY programme XIPHIAS runs in a country across all four verticals
 * (citizenship, residency, skilled, corporate). Replicates the locked navy/gold
 * CountryHub idiom (dark full-bleed-image hero, sticky facts, track groups,
 * process, FAQ, closing CTA) but is purpose-built for the multi-track
 * CountryOverview shape rather than the single-vertical CountryData used by
 * CountryHub. All data is real (passed from the server page); every programme
 * link points at its real /[track]/[country]/[program] route, and each track
 * group links to the real /[track]/[country] overview.
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Flag from "@/components/Countries/Flag";
import { countryImage } from "@/components/Countries/country-image";
import { TRACK_PILL } from "@/lib/countries-shared";
import type { CountryOverview } from "@/lib/countries-shared";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

const PROCESS_STEPS = [
  "Private consultation — a senior advisor maps your goals, family profile and budget.",
  "Programme selection — we shortlist the routes that fit, with costs and timelines.",
  "Document preparation — our team assembles and vets your full application file.",
  "Submission & approval — we lodge with the authority and manage every milestone to grant.",
];

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

function Rise({ text, serifClass }: { text: string; serifClass?: string }) {
  return <span className={serifClass}>{text}</span>;
}

export default function CountryDetail({
  overview,
  serifClass,
}: {
  overview: CountryOverview;
  serifClass: string;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const hero = countryImage(overview.slug, overview.region);
  const pathways = overview.groups.length;

  const faq = [
    {
      q: `How many immigration programmes does XIPHIAS run in ${overview.name}?`,
      a: `We currently manage ${overview.programmeCount} programme${overview.programmeCount === 1 ? "" : "s"} in ${overview.name} across ${pathways} pathway${pathways === 1 ? "" : "s"}: ${overview.groups.map((g) => g.label).join(", ")}.`,
    },
    {
      q: `Which is the right route for me in ${overview.name}?`,
      a: `It depends on your goals, timeline and budget. A senior XIPHIAS advisor will compare the available routes — residency, citizenship, skilled or corporate — and recommend the best fit in a private consultation.`,
    },
    {
      q: `Can my family be included?`,
      a: `Most ${overview.name} programmes allow you to include a spouse and dependent children, and several extend to parents. We confirm the exact dependant rules for your chosen route during your consultation.`,
    },
  ];

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO (dark, full-bleed country image) ── */}
      <section
        data-tone="dark"
        className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 100% at 15% 0%, #13284f 0%, ${NAVY} 55%)` }}
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}>
              <Link href="/" className="hover:text-[#bfa15c]">
                Home
              </Link>{" "}
              <span style={{ color: GOLD }}>/</span>{" "}
              <Link href="/countries" className="hover:text-[#bfa15c]">
                Countries
              </Link>{" "}
              <span style={{ color: GOLD }}>/</span> {overview.name}
            </p>
            <div className="mt-7 flex items-center gap-3">
              <Flag code={overview.code} size={34} className="rounded-sm" />
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
                <span className="h-px w-8" style={{ background: GOLD }} />
                {overview.region}
              </p>
            </div>
            <h1 className={`${serifClass} mt-5 text-[clamp(3rem,8vw,6rem)] font-medium leading-[0.92]`}>
              <Rise text={overview.name} serifClass={serifClass} />
            </h1>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-white/75">
              Every immigration pathway XIPHIAS offers in {overview.name} — {overview.groups.map((g) => g.label).join(", ")} — compared in one place.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]"
                style={{ background: GOLD, color: NAVY }}
              >
                Book a private consultation{" "}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t pt-7 sm:grid-cols-3" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              <div className="flex flex-col gap-1">
                <span className={`${serifClass} text-[clamp(1.4rem,2.2vw,2rem)] font-medium leading-none`} style={{ color: GOLD }}>
                  {overview.programmeCount}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  Programme{overview.programmeCount === 1 ? "" : "s"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className={`${serifClass} text-[clamp(1.4rem,2.2vw,2rem)] font-medium leading-none`} style={{ color: GOLD }}>
                  {pathways}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  Pathway{pathways === 1 ? "" : "s"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className={`${serifClass} text-[clamp(1.4rem,2.2vw,2rem)] font-medium leading-none`} style={{ color: GOLD }}>
                  {overview.code || "—"}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">ISO code</span>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative aspect-[4/5] w-full overflow-hidden rounded-lg"
          >
            <Image
              src={hero}
              alt={overview.name}
              fill
              sizes="45vw"
              priority
              className="object-cover [filter:grayscale(0.4)_brightness(0.72)_contrast(1.05)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.85)] group-hover:scale-105"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.6) 0%, transparent 50%)" }} />
            <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}55` }} />
            <span aria-hidden className="absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2" style={{ borderColor: GOLD }} />
            <span aria-hidden className="absolute bottom-4 right-4 h-7 w-7 border-b-2 border-r-2" style={{ borderColor: GOLD }} />
          </motion.div>
        </div>
      </section>

      {/* ── PROGRAMME GROUPS (one section per track) ── */}
      {overview.groups.map((group, gi) => {
        const dark = gi % 2 === 0;
        return (
          <section
            key={group.track}
            data-tone={dark ? "dark" : "light"}
            className={`relative isolate px-6 py-24 sm:px-12 lg:px-20 ${dark ? "text-[#eef3fb]" : "text-[#0c1f3f]"}`}
            style={{ background: dark ? NAVY : "#f3f7fd" }}
          >
            <Ambient tone={dark ? "dark" : "light"} />
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <Eyebrow ar="مسار">{TRACK_PILL[group.track]}</Eyebrow>
                  <h2 className={`${serifClass} mt-5 text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.05]`}>
                    {group.label}
                  </h2>
                </div>
                <Link
                  href={`/${group.track}/${overview.slug}`}
                  className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: GOLD }}
                >
                  {TRACK_PILL[group.track]} overview{" "}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </Link>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {group.items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      className="group block h-full rounded-lg border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#bfa15c]"
                      style={
                        dark
                          ? {
                              borderColor: "rgba(191,161,92,0.28)",
                              background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0))",
                            }
                          : {
                              borderColor: `${INK}16`,
                              background: "rgba(255,255,255,0.6)",
                            }
                      }
                    >
                      <h3 className={`${serifClass} text-[clamp(1.35rem,2.2vw,1.85rem)] font-medium leading-tight transition-colors group-hover:text-[#bfa15c]`}>
                        {item.title}
                      </h3>
                      <p className={`mt-3 text-[14.5px] leading-relaxed ${dark ? "text-white/70" : "text-[#0c1f3f]/70"}`}>
                        {item.summary}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-5" style={{ borderColor: dark ? "rgba(255,255,255,0.12)" : `${INK}14` }}>
                        <span className={`text-[12px] uppercase tracking-[0.1em] ${dark ? "text-white/55" : "text-[#0c1f3f]/55"}`}>
                          {item.investmentLabel}
                        </span>
                        <span className={`text-[12px] uppercase tracking-[0.1em] ${dark ? "text-white/55" : "text-[#0c1f3f]/55"}`}>
                          {item.timelineLabel}
                        </span>
                        <span className="ms-auto inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
                          View route <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── PROCESS (light) ── */}
      <section
        data-tone="light"
        className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20"
        style={{ background: "#eef3fb" }}
      >
        <Ambient tone="light" />
        <div className="mx-auto max-w-5xl">
          <Eyebrow ar="كيف نعمل">The process</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}>From first call to approval.</h2>
          <div className="mt-12 flex flex-col">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="flex items-start gap-6 border-t py-7"
                style={{ borderColor: `${INK}16` }}
              >
                <span className={`${serifClass} shrink-0 text-[2.4rem] font-medium leading-none`} style={{ color: GOLD }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="max-w-2xl text-[16px] leading-relaxed text-[#0c1f3f]/75">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (light) ── */}
      <section
        data-tone="light"
        className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20"
        style={{ background: "#f3f7fd" }}
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Eyebrow ar="أسئلة شائعة">Questions</Eyebrow>
            <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05]`}>
              {overview.name}, <span className="italic" style={{ color: GOLD }}>answered.</span>
            </h2>
          </div>
          <div>
            {faq.map((f, i) => {
              const id = `faq-${i}`;
              const on = open === id;
              return (
                <div key={id} className="border-b" style={{ borderColor: `${INK}16` }}>
                  <button
                    onClick={() => setOpen(on ? null : id)}
                    aria-expanded={on}
                    aria-controls={`country-faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className={`${serifClass} text-[1.25rem] font-medium leading-snug transition-colors ${on ? "text-[#bfa15c]" : ""}`}>
                      {f.q}
                    </span>
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[15px] transition-all duration-300"
                      style={{ borderColor: on ? GOLD : `${INK}33`, color: on ? GOLD : INK, transform: on ? "rotate(45deg)" : "none" }}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on ? (
                      <motion.div
                        id={`country-faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-10 text-[15px] leading-relaxed text-[#0c1f3f]/70">{f.a}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA (dark, full-bleed image) ── */}
      <section
        data-tone="dark"
        className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <Image
          src={hero}
          alt=""
          fill
          sizes="100vw"
          className="object-cover [filter:grayscale(0.5)_brightness(0.35)_contrast(1.05)]"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.6) 50%, rgba(8,18,42,0.88) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="flex justify-center">
            <Eyebrow ar="ابدأ الآن">Begin</Eyebrow>
          </div>
          <h2 className={`${serifClass} mt-6 text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.0]`}>
            Begin your <span className="italic" style={{ color: GOLD }}>{overview.name}</span> application.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
            A senior advisor will map your route, costs and timeline — privately, and entirely off the record.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]"
              style={{ background: GOLD, color: NAVY }}
            >
              Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]"
            >
              All countries
            </Link>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
