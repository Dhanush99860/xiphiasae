"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { awardsData, type Award } from "@/components/awards/awards.data";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";
const IVORY = "#fbfaf7";
const BAND = "#f7f4ef";

// Group awards by year (descending) for an editorial, chronological layout.
function groupByYear(items: Award[]) {
  const map = new Map<number, Award[]>();
  for (const a of items) {
    if (!map.has(a.year)) map.set(a.year, []);
    map.get(a.year)!.push(a);
  }
  return [...map.entries()].sort((x, y) => y[0] - x[0]);
}

function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return (
    <p
      className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
      style={{ color: GOLD }}
    >
      <span className="h-px w-8" style={{ background: GOLD }} />
      {children}
      <span
        lang="ar"
        dir="rtl"
        className="font-arabic-display text-sm tracking-normal"
        style={{ color: GOLD }}
      >
        {ar}
      </span>
    </p>
  );
}

function Initials({ issuer }: { issuer: string }) {
  const letters = issuer
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  return (
    <span
      aria-hidden
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[13px] font-semibold tracking-wide"
      style={{ border: `1px solid ${GOLD}66`, color: GOLD_DEEP, background: "#fff" }}
    >
      {letters || "X"}
    </span>
  );
}

function AwardCard({ award, reduce, i }: { award: Award; reduce: boolean; i: number }) {
  const inner = (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(10,23,51,0.35)]"
      style={{ background: "#fff", border: `1px solid ${GOLD}3a` }}
    >
      {/* thin gold top-rule */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
      />
      <div className="flex items-start gap-3">
        {award.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={award.image}
            alt={`${award.issuer} award badge`}
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <Initials issuer={award.issuer} />
        )}
        <div className="min-w-0">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: GOLD_DEEP }}
          >
            {award.tag}
          </p>
          <h3 className="mt-1 text-[15px] font-medium leading-snug" style={{ color: INK }}>
            {award.title}
          </h3>
        </div>
      </div>
      <div
        className="mt-4 flex items-center justify-between border-t pt-3 text-[12px]"
        style={{ borderColor: `${GOLD}26` }}
      >
        <span style={{ color: `${INK}b3` }}>{award.issuer}</span>
        <span className="font-semibold tabular-nums" style={{ color: GOLD_DEEP }}>
          {award.year}
        </span>
      </div>
    </article>
  );

  if (reduce) return inner;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
    >
      {inner}
    </motion.div>
  );
}

export default function CompanyIvory({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const grouped = groupByYear(awardsData);
  const total = awardsData.length;

  return (
    <div style={{ background: IVORY }}>
      <Header serifClass={serifClass} />

      {/* ── HERO (slim navy band) ───────────────────────────────── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-16 pt-32 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 90% at 15% 0%, #13284f 0%, ${NAVY} 60%)` }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <Eyebrow ar="تقدير">Recognition</Eyebrow>
          <h1
            className={`${serifClass} mt-5 text-[clamp(2.6rem,5.5vw,4.4rem)] font-medium leading-[1.02]`}
          >
            Awards &amp; Recognition
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#c8d4ea] md:text-base">
            The Most Awarded Immigration Company — independent publications and
            global bodies have, year after year, recognised our innovation,
            leadership, and client-first execution.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="flex items-baseline gap-2">
              <span className={`${serifClass} text-3xl`} style={{ color: GOLD }}>
                {total}
              </span>
              <span className="text-[12px] uppercase tracking-[0.2em] text-[#a9b8d6]">
                accolades
              </span>
            </span>
            <span className="flex items-baseline gap-2">
              <span className={`${serifClass} text-3xl`} style={{ color: GOLD }}>
                {grouped.length}
              </span>
              <span className="text-[12px] uppercase tracking-[0.2em] text-[#a9b8d6]">
                years honoured
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* ── HEADLINE BAND ───────────────────────────────────────── */}
      <section
        data-tone="light"
        className="relative px-6 pt-16 sm:px-12 lg:px-20"
        style={{ background: IVORY }}
      >
        <div className="mx-auto max-w-6xl">
          <h2
            className={`${serifClass} text-[clamp(2rem,4vw,3.2rem)] font-medium leading-tight`}
            style={{ color: NAVY }}
          >
            Most Awarded Immigration Company
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-7" style={{ color: `${INK}b0` }}>
            A decade of independent accolades — sorted by year of recognition.
          </p>
          <span
            aria-hidden
            className="mt-6 block h-px w-full"
            style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }}
          />
        </div>
      </section>

      {/* ── AWARDS, GROUPED BY YEAR ─────────────────────────────── */}
      <section
        data-tone="light"
        className="relative isolate px-6 pb-20 pt-10 sm:px-12 lg:px-20"
        style={{ background: IVORY }}
      >
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-6xl">
          {grouped.map(([year, items], gi) => (
            <div
              key={year}
              className="mb-14 rounded-3xl p-6 sm:p-8"
              style={{ background: gi % 2 === 1 ? BAND : "transparent" }}
            >
              <div className="mb-6 flex items-center gap-4">
                <span
                  className={`${serifClass} text-4xl font-medium tabular-nums`}
                  style={{ color: GOLD_DEEP }}
                >
                  {year}
                </span>
                <span className="h-px flex-1" style={{ background: `${GOLD}40` }} />
                <span className="text-[12px] uppercase tracking-[0.2em]" style={{ color: `${INK}80` }}>
                  {items.length} {items.length === 1 ? "award" : "awards"}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((a, i) => (
                  <AwardCard key={a.id} award={a} reduce={!!reduce} i={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLOSING CTA ─────────────────────────────────────────── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 py-20 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 120% at 85% 0%, #13284f 0%, ${NAVY} 65%)` }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Eyebrow ar="استشارة">Private counsel</Eyebrow>
          <h2 className={`${serifClass} mx-auto mt-5 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-medium leading-tight`}>
            Let our award-winning team chart your path.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-[#c8d4ea]">
            Speak with a senior advisor in confidence about citizenship,
            residency, and global mobility.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD, color: NAVY }}
            >
              Book a private consultation
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
