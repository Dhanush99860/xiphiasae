"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

function toText(x: unknown): string {
  if (typeof x === "string") return x;
  if (x && typeof x === "object")
    return Object.values(x as Record<string, unknown>)
      .filter((v) => typeof v === "string")
      .join(" — ");
  return x == null ? "" : String(x);
}

function prettyKey(k: string): string {
  const map: Record<string, string> = {
    structure: "Structure", ownership: "Ownership", office: "Office",
    visaQuota: "Visa quota", bankReady: "Banking", capital: "Capital",
    taxRate: "Tax rate", currency: "Currency", language: "Language",
  };
  return map[k] ?? k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

function fmtAmt(amount: number, currency?: string): string {
  const sym = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : currency === "AED" ? "AED " : currency === "CAD" ? "CA$" : currency === "AUD" ? "AU$" : "";
  return `${sym}${amount.toLocaleString("en-US")}`;
}

export type ProgramData = {
  vertical: string;
  verticalSlug: string;
  country: string;
  countrySlug: string;
  title: string;
  tagline?: string;
  heroImage: string;
  brochure?: string;
  stats: { label: string; value: string }[];
  benefits: string[];
  prices: { label: string; amount?: string; when?: string; notes?: string }[];
  governmentFees: { label: string; amount?: string }[];
  proofOfFunds: { label: string; amount?: string; notes?: string }[];
  requirements: string[];
  disqualifiers: string[];
  faq: { q: string; a: string }[];
  // ── enriched MDX fields ────────────────────────────────────────────────
  documentChecklist?: { group: string; documents: string[]; notes?: string }[];
  familyMatrix?: { childrenUpTo?: number; parentsFromAge?: number; siblings?: boolean; spouse?: boolean };
  projectList?: { name: string; minBuyIn?: number; holdMonths?: number; notes?: string; image?: string }[];
  riskNotes?: string[];
  complianceNotes?: string[];
  processSteps?: { title: string; description?: string }[];
  lastUpdated?: string;
  // ── skilled-specific ──────────────────────────────────────────────────
  language?: { tests?: string[]; minLevel?: string };
  pointsGrid?: { category: string; max?: number; notes?: string }[];
  pointsThreshold?: number;
  occupationLists?: { listName?: string; occupations: string[] }[];
  // ── corporate-specific ────────────────────────────────────────────────
  snapshot?: Record<string, unknown>;
  sponsorship?: {
    title?: string;
    thresholds?: { level: string; amount: number; currency?: string; note?: string }[];
    notes?: string[];
  };
  authorityNotes?: { authority: string; badgeTone?: string; points: string[] }[];
};

/* ── animation helpers ─────────────────────────────────────────────────── */
function Rise({ text, className, delay = 0, play }: { text: string; className?: string; delay?: number; play?: boolean }) {
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" animate={play === undefined ? undefined : play ? "show" : "hidden"} whileInView={play === undefined ? "show" : undefined} viewport={play === undefined ? { once: true, amount: 0.4 } : undefined} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}>
      {text.split(" ").map((w, i, arr) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < arr.length - 1 ? "0.26em" : undefined }}>
          <motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}
function Fade({ children, delay = 0, className, play }: { children: ReactNode; delay?: number; className?: string; play?: boolean }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={play === undefined ? undefined : play ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} whileInView={play === undefined ? { opacity: 1, y: 0 } : undefined} viewport={play === undefined ? { once: true, amount: 0.3 } : undefined} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
}
function Eyebrow({ children, ar }: { children: ReactNode; ar: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />{children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}

/* ── HERO ─ full-screen cinematic ──────────────────────────────────────── */
function Hero({ d, serifClass, play }: { d: ProgramData; serifClass: string; play: boolean }) {
  return (
    <section data-tone="dark" className="relative flex min-h-screen items-center overflow-hidden text-[#eef3fb]" style={{ background: NAVY }}>
      <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={play ? { scale: 1 } : { scale: 1.12 }} transition={{ duration: 8, ease: "easeOut" }}>
        <Image src={d.heroImage} alt={d.title} fill sizes="100vw" priority className="object-cover [filter:grayscale(0.4)_brightness(0.6)_contrast(1.05)]" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(8,18,42,.92) 0%,rgba(8,18,42,.55) 55%,rgba(8,18,42,.3) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(8,18,42,.8) 0%,transparent 45%)" }} />

      <div className="lcp-instant relative z-10 mx-auto w-full max-w-6xl px-6 py-32 sm:px-12 lg:px-20">
        <Fade play={play}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,.5)" }}>
            <a href={`/${d.verticalSlug}`} className="transition-colors hover:text-[#bfa15c]">{d.vertical}</a>
            {" "}<span style={{ color: GOLD }}>/</span>{" "}
            <a href={`/${d.verticalSlug}/${d.countrySlug}`} className="transition-colors hover:text-[#bfa15c]">{d.country}</a>
            {" "}<span style={{ color: GOLD }}>/</span>{" "}Route
          </p>
        </Fade>
        <Fade play={play} delay={0.1}>
          <p className="mt-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
            <span className="h-px w-8" style={{ background: GOLD }} />{d.country} · Investment route
          </p>
        </Fade>
        <h1 className={`${serifClass} mt-6 max-w-[20ch] text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.95]`}>
          <Rise text={d.title} play={play} delay={0.2} />
        </h1>
        {d.tagline ? <Fade play={play} delay={0.6}><p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">{d.tagline}</p></Fade> : null}
        <Fade play={play} delay={0.75}>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
              Book a consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            {d.brochure ? (
              <a href={d.brochure} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">
                Download brochure
              </a>
            ) : null}
          </div>
        </Fade>
        {d.stats.length ? (
          <Fade play={play} delay={0.9}>
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 border-t pt-7 sm:grid-cols-4" style={{ borderColor: "rgba(255,255,255,.12)" }}>
              {d.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className={`${serifClass} text-[clamp(1.4rem,2.2vw,2rem)] font-medium leading-none`} style={{ color: GOLD }}>{s.value}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">{s.label}</span>
                </div>
              ))}
            </div>
            {d.lastUpdated ? <p className="mt-5 text-[11px] text-white/30">Last updated: {d.lastUpdated}</p> : null}
          </Fade>
        ) : d.lastUpdated ? (
          <Fade play={play} delay={0.9}>
            <p className="mt-8 text-[11px] text-white/30">Last updated: {d.lastUpdated}</p>
          </Fade>
        ) : null}
      </div>
      <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-white/55">
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
        <span className="block h-9 w-px" style={{ background: `linear-gradient(${GOLD},transparent)` }} />
      </div>
    </section>
  );
}

/* ── OVERVIEW (compiled MDX body) ──────────────────────────────────────── */
function Overview({ content, serifClass }: { content: ReactNode; serifClass: string }) {
  return (
    <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-4xl">
        <Eyebrow ar="نظرة عامة">Programme overview</Eyebrow>
        <div className={`mt-8 max-w-none text-[15px] leading-relaxed text-[#0c1f3f]/75 [&_h3]:${serifClass} [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[1.5rem] [&_h3]:font-medium [&_h3]:text-[#0c1f3f] [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5 [&_strong]:font-semibold [&_strong]:text-[#0c1f3f] [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_th]:text-left [&_th]:text-[11px] [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-[0.14em] [&_th]:pb-2 [&_th]:border-b [&_td]:py-2.5 [&_td]:pr-4 [&_td]:border-b [&_td]:text-[14px] [&_td]:align-top overflow-x-auto`} style={{ "--border-col": `${INK}18` } as React.CSSProperties}>
          {content}
        </div>
      </div>
    </section>
  );
}

/* ── SNAPSHOT (corporate at-a-glance) ──────────────────────────────────── */
function Snapshot({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  const snap = d.snapshot ?? {};
  const entries = Object.entries(snap)
    .filter(([k, v]) => k !== "highlights" && v !== null && v !== undefined && typeof v !== "object")
    .map(([k, v]) => ({ label: prettyKey(k), value: String(v) }));
  const highlights = Array.isArray((snap as any).highlights) ? (snap as any).highlights as string[] : [];
  if (!entries.length && !highlights.length) return null;
  return (
    <section data-tone="dark" className="relative isolate px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="لمحة">At a glance</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="Structure, in brief." /></h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr]">
          {entries.length ? (
            <div className="overflow-hidden rounded-lg border" style={{ borderColor: "rgba(191,161,92,.28)" }}>
              {entries.map((e, i) => (
                <Fade key={i}>
                  <div className="flex items-start justify-between gap-6 border-b px-5 py-4 last:border-b-0" style={{ borderColor: "rgba(255,255,255,.08)" }}>
                    <span className="text-[13px] text-white/55">{e.label}</span>
                    <span className="text-right text-[14px] font-medium text-white/90">{e.value}</span>
                  </div>
                </Fade>
              ))}
            </div>
          ) : null}
          {highlights.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Key highlights</p>
              <ul className="mt-5 flex flex-col gap-3">
                {highlights.map((h: string, i: number) => (
                  <Fade key={i}>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-[12px]" style={{ color: GOLD }}>✦</span>
                      <span className="text-[15px] leading-relaxed text-white/75">{h}</span>
                    </li>
                  </Fade>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ── BENEFITS ────────────────────────────────────────────────────────────── */
function Benefits({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  if (!d.benefits.length) return null;
  return (
    <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="المزايا">What you get</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="The benefits, in full." /></h2>
        <div className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {d.benefits.map((bn, i) => (
            <Fade key={i}>
              <div className="flex items-start gap-3 border-t pt-5" style={{ borderColor: `${INK}1a` }}>
                <span className="mt-0.5 text-[14px]" style={{ color: GOLD }}>✦</span>
                <p className="text-[15px] leading-relaxed text-[#0c1f3f]/75">{toText(bn)}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── COSTS ───────────────────────────────────────────────────────────────── */
function Costs({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  if (!d.prices.length && !d.governmentFees.length) return null;
  return (
    <section data-tone="dark" className="relative isolate px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="التكاليف">Investment & costs</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="Every figure, in writing." /></h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {d.prices.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Qualifying investment</p>
              <div className="mt-5 overflow-hidden rounded-lg border" style={{ borderColor: "rgba(255,255,255,.12)" }}>
                {d.prices.map((p, i) => (
                  <Fade key={p.label + i}>
                    <div className="flex items-center justify-between gap-4 border-b px-5 py-4 last:border-b-0" style={{ borderColor: "rgba(255,255,255,.08)" }}>
                      <div>
                        <p className="text-[15px] font-medium text-white/90">{p.label}</p>
                        {p.when || p.notes ? <p className="mt-0.5 text-[12px] text-white/45">{[p.when, p.notes].filter(Boolean).join(" · ")}</p> : null}
                      </div>
                      {p.amount ? <span className={`${serifClass} shrink-0 text-[1.25rem] font-medium`} style={{ color: GOLD }}>{p.amount}</span> : null}
                    </div>
                  </Fade>
                ))}
              </div>
            </div>
          ) : <div />}
          {d.governmentFees.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Government & due-diligence fees</p>
              <div className="mt-5 flex flex-col gap-3">
                {d.governmentFees.map((g, i) => (
                  <Fade key={g.label + i}>
                    <div className="flex items-center justify-between gap-3 border-b py-2.5 text-[14px]" style={{ borderColor: "rgba(255,255,255,.1)" }}>
                      <span className="text-white/70">{g.label}</span>
                      {g.amount ? <span className="font-medium text-white/90">{g.amount}</span> : null}
                    </div>
                  </Fade>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <p className="mt-8 text-[13px] text-white/45">Figures are indicative and exclusive of professional fees. Your advisor confirms an exact, written cost breakdown for your family size.</p>
      </div>
    </section>
  );
}

/* ── ELIGIBILITY ─────────────────────────────────────────────────────────── */
function Eligibility({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  if (!d.requirements.length && !d.proofOfFunds.length && !d.disqualifiers.length) return null;
  return (
    <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#eef3fb" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="الأهلية">Eligibility</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="What it takes to qualify." /></h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          {d.requirements.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">Requirements</p>
              <div className="mt-4 flex flex-col gap-3">
                {d.requirements.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1 text-[13px]" style={{ color: GOLD }}>✦</span>
                    <p className="text-[14px] leading-relaxed text-[#0c1f3f]/75">{toText(r)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {d.proofOfFunds.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">Proof of funds</p>
              <div className="mt-4 flex flex-col gap-3">
                {d.proofOfFunds.map((p, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 border-b pb-2.5 text-[14px]" style={{ borderColor: `${INK}14` }}>
                    <span className="text-[#0c1f3f]/70">{p.label ?? "Source of funds"}{p.notes ? ` · ${p.notes}` : ""}</span>
                    {p.amount ? <span className="font-medium" style={{ color: GOLD }}>{p.amount}</span> : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {d.disqualifiers.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">Who cannot apply</p>
              <div className="mt-4 flex flex-col gap-3">
                {d.disqualifiers.map((x, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1 text-[13px] text-[#0c1f3f]/30">—</span>
                    <p className="text-[14px] leading-relaxed text-[#0c1f3f]/65">{toText(x)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ── LANGUAGE (skilled) ──────────────────────────────────────────────────── */
function Language({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  const lang = d.language;
  if (!lang?.tests?.length && !lang?.minLevel) return null;
  return (
    <section data-tone="dark" className="relative isolate px-6 py-20 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="اللغة">Language requirement</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="Prove your proficiency." /></h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {lang.minLevel ? (
            <div className="rounded-lg border p-6" style={{ borderColor: "rgba(191,161,92,.28)", background: "rgba(255,255,255,.03)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Minimum level</p>
              <p className={`${serifClass} mt-3 text-[1.6rem] font-medium`} style={{ color: GOLD }}>{lang.minLevel}</p>
            </div>
          ) : null}
          {lang.tests?.length ? (
            <div className="rounded-lg border p-6" style={{ borderColor: "rgba(255,255,255,.12)", background: "rgba(255,255,255,.02)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Accepted tests</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {lang.tests.map((t, i) => (
                  <span key={i} className="rounded-full border px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ borderColor: `${GOLD}55`, color: GOLD }}>{t}</span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ── POINTS GRID (skilled) ───────────────────────────────────────────────── */
function PointsGrid({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  const grid = d.pointsGrid ?? [];
  if (!grid.length) return null;
  const total = grid.reduce((s, r) => s + (r.max ?? 0), 0);
  return (
    <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="النقاط">Points system</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="How candidates are ranked." /></h2>
        {d.pointsThreshold ? (
          <p className="mt-4 text-[15px] text-[#0c1f3f]/65">
            Minimum score to receive an invitation: <span className="font-semibold" style={{ color: GOLD }}>{d.pointsThreshold}</span> points
          </p>
        ) : null}
        <div className="mt-10 overflow-x-auto rounded-lg border" style={{ borderColor: `${INK}16` }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: `${INK}08` }}>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-[#0c1f3f]/50">Category</th>
                <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.15em] text-[#0c1f3f]/50">Max pts</th>
              </tr>
            </thead>
            <tbody>
              {grid.map((row, i) => (
                <tr key={i} className="border-t" style={{ borderColor: `${INK}10` }}>
                  <td className="px-5 py-3.5 text-[14px] text-[#0c1f3f]/75">{row.category}{row.notes ? <span className="ml-2 text-[12px] text-[#0c1f3f]/40">({row.notes})</span> : null}</td>
                  <td className={`${serifClass} px-5 py-3.5 text-right text-[1.1rem] font-medium`} style={{ color: GOLD }}>{row.max ?? "—"}</td>
                </tr>
              ))}
              {total > 0 ? (
                <tr className="border-t" style={{ borderColor: `${INK}1a`, background: `${INK}05` }}>
                  <td className="px-5 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0c1f3f]/55">Total</td>
                  <td className={`${serifClass} px-5 py-3.5 text-right text-[1.2rem] font-medium`} style={{ color: INK }}>{total}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ── OCCUPATIONS (skilled) ───────────────────────────────────────────────── */
function Occupations({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  const lists = d.occupationLists ?? [];
  if (!lists.length) return null;
  return (
    <section data-tone="dark" className="relative isolate px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="المهن">Eligible occupations</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="In-demand roles." /></h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {lists.map((list, i) => (
            <Fade key={i}>
              <div className="rounded-lg border p-6" style={{ borderColor: "rgba(191,161,92,.28)", background: "rgba(255,255,255,.03)" }}>
                {list.listName ? <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{list.listName}</p> : null}
                <ul className="mt-4 flex flex-col gap-2.5">
                  {list.occupations.map((occ, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="mt-0.5 shrink-0 text-[12px]" style={{ color: GOLD }}>✦</span>
                      <span className="text-[14px] leading-relaxed text-white/75">{occ}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROCESS (all verticals) ─────────────────────────────────────────────── */
function Process({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  const steps = d.processSteps ?? [];
  if (!steps.length) return null;
  return (
    <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#eef3fb" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-5xl">
        <Eyebrow ar="كيف نعمل">The process</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="From first call to approval." /></h2>
        <div className="mt-12 flex flex-col">
          {steps.map((step, i) => (
            <Fade key={i} delay={i * 0.06}>
              <div className="flex items-start gap-6 border-t py-7" style={{ borderColor: `${INK}16` }}>
                <span className={`${serifClass} shrink-0 text-[2.4rem] font-medium leading-none`} style={{ color: GOLD }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  {step.title ? <p className="text-[16px] font-semibold text-[#0c1f3f]">{step.title}</p> : null}
                  {step.description ? <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-[#0c1f3f]/65">{step.description}</p> : null}
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── DOCUMENT CHECKLIST ──────────────────────────────────────────────────── */
function DocumentChecklist({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  const list = d.documentChecklist ?? [];
  if (!list.length) return null;
  return (
    <section data-tone="dark" className="relative isolate px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="الوثائق">Document checklist</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="Everything needed to file." /></h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {list.map((grp, i) => (
            <Fade key={i}>
              <div className="rounded-lg border p-6" style={{ borderColor: "rgba(191,161,92,.28)", background: "rgba(255,255,255,.03)" }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{grp.group}</p>
                {grp.notes ? <p className="mt-2 text-[12px] leading-relaxed text-white/40">{grp.notes}</p> : null}
                <ul className="mt-4 flex flex-col gap-2.5">
                  {(Array.isArray(grp.documents) ? grp.documents : []).map((doc, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="mt-0.5 shrink-0 text-[12px]" style={{ color: GOLD }}>✦</span>
                      <span className="text-[14px] leading-relaxed text-white/75">{String(doc)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Fade>
          ))}
        </div>
        <p className="mt-8 text-[13px] text-white/40">Your XIPHIAS advisor prepares a personalised document list at onboarding. The checklist above is indicative and may vary by family size.</p>
      </div>
    </section>
  );
}

/* ── FAMILY SCOPE ────────────────────────────────────────────────────────── */
function FamilyScope({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  const fm = d.familyMatrix;
  if (!fm) return null;
  const items: string[] = [];
  if (fm.spouse) items.push("Spouse or common-law partner");
  if (fm.childrenUpTo) items.push(`Dependent children up to age ${fm.childrenUpTo}`);
  if (fm.parentsFromAge) items.push(`Parents & grandparents from age ${fm.parentsFromAge}`);
  if (fm.siblings) items.push("Unmarried siblings of applicant or spouse");
  if (!items.length) return null;
  return (
    <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="الأسرة">Family scope</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="Who travels with you." /></h2>
        <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-[#0c1f3f]/65">All eligible dependants can be included in one application or added after approval.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          {items.map((item, i) => (
            <Fade key={i}>
              <div className="flex items-center gap-2.5 rounded-full border px-5 py-3" style={{ borderColor: `${INK}20`, background: "white" }}>
                <span className="text-[12px]" style={{ color: GOLD }}>✦</span>
                <span className="text-[14px] font-medium text-[#0c1f3f]/80">{item}</span>
              </div>
            </Fade>
          ))}
        </div>
        <p className="mt-6 text-[12px] text-[#0c1f3f]/40">Age limits, dependency definitions, and addition fees vary by jurisdiction. Your advisor confirms exact rules at onboarding.</p>
      </div>
    </section>
  );
}

/* ── APPROVED PROJECTS ───────────────────────────────────────────────────── */
function moneyFmt(n?: number): string | undefined {
  if (typeof n !== "number") return undefined;
  return `$${n.toLocaleString("en-US")}`;
}
function Projects({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  const list = (d.projectList ?? []).filter((p) => p.name);
  if (!list.length) return null;
  return (
    <section data-tone="dark" className="relative isolate px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="المشاريع">Approved projects</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="Where your capital is placed." /></h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((proj, i) => (
            <Fade key={i} delay={i * 0.07}>
              <div className="group flex h-full flex-col overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-1.5" style={{ borderColor: "rgba(191,161,92,.28)", background: "rgba(255,255,255,.03)" }}>
                {proj.image ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image src={proj.image} alt={proj.name} fill sizes="400px" className="object-cover [filter:brightness(0.75)] transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(8,18,42,.5) 0%,transparent 60%)" }} />
                  </div>
                ) : (
                  <div className="flex aspect-[16/9] items-center justify-center" style={{ background: "rgba(191,161,92,.06)" }}>
                    <span className="text-3xl" style={{ color: `${GOLD}55` }}>✦</span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className={`${serifClass} text-[1.2rem] font-medium leading-tight`}>{proj.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {proj.minBuyIn ? <span className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ borderColor: `${GOLD}55`, color: GOLD }}>From {moneyFmt(proj.minBuyIn)}</span> : null}
                    {proj.holdMonths ? <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">{proj.holdMonths} mo hold</span> : null}
                  </div>
                  {proj.notes ? <p className="mt-4 flex-1 text-[13px] leading-relaxed text-white/55">{proj.notes}</p> : null}
                </div>
              </div>
            </Fade>
          ))}
        </div>
        <p className="mt-8 text-[13px] text-white/40">Project availability and inventory change. Your advisor confirms current options and any exclusive allocations at onboarding.</p>
      </div>
    </section>
  );
}

/* ── SPONSORSHIP (corporate) ─────────────────────────────────────────────── */
function Sponsorship({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  const sp = d.sponsorship;
  if (!sp?.thresholds?.length && !sp?.notes?.length) return null;
  return (
    <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="الرواتب">Sponsorship & salary rules</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text={sp.title ?? "Salary thresholds & rules."} /></h2>
        {sp.thresholds?.length ? (
          <div className="mt-10 overflow-hidden rounded-lg border" style={{ borderColor: `${INK}16` }}>
            {sp.thresholds.map((t, i) => (
              <Fade key={i}>
                <div className="flex items-start justify-between gap-6 border-b px-6 py-4 last:border-b-0" style={{ borderColor: `${INK}10` }}>
                  <div>
                    <p className="text-[15px] font-medium text-[#0c1f3f]">{t.level}</p>
                    {t.note ? <p className="mt-0.5 text-[12px] text-[#0c1f3f]/45">{t.note}</p> : null}
                  </div>
                  <span className={`${serifClass} shrink-0 text-[1.25rem] font-medium`} style={{ color: GOLD }}>{fmtAmt(t.amount, t.currency)}</span>
                </div>
              </Fade>
            ))}
          </div>
        ) : null}
        {sp.notes?.length ? (
          <ul className="mt-7 flex flex-col gap-2.5">
            {sp.notes.map((n, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 text-[12px]" style={{ color: GOLD }}>✦</span>
                <span className="text-[14px] leading-relaxed text-[#0c1f3f]/70">{n}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

/* ── AUTHORITY NOTES (corporate free zones) ──────────────────────────────── */
function AuthorityNotes({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  const notes = d.authorityNotes ?? [];
  if (!notes.length) return null;
  return (
    <section data-tone="dark" className="relative isolate px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="المناطق الحرة">Free zone comparison</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="Which zone fits your business." /></h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((n, i) => (
            <Fade key={i} delay={i * 0.07}>
              <div className="rounded-lg border p-6" style={{ borderColor: "rgba(191,161,92,.28)", background: "rgba(255,255,255,.03)" }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{n.authority}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {n.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="mt-0.5 shrink-0 text-[12px]" style={{ color: GOLD }}>✦</span>
                      <span className="text-[14px] leading-relaxed text-white/70">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── RISK & COMPLIANCE ───────────────────────────────────────────────────── */
function RiskNotes({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  const risks = d.riskNotes ?? [];
  const compliance = d.complianceNotes ?? [];
  if (!risks.length && !compliance.length) return null;
  return (
    <section data-tone="light" className="relative isolate px-6 py-16 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#eef3fb" }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2">
          {risks.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/40">Risk notes</p>
              <div className="mt-5 flex flex-col gap-3">
                {risks.map((n, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border p-4" style={{ borderColor: `${INK}14`, background: "rgba(255,255,255,.6)" }}>
                    <span className="mt-0.5 shrink-0 text-[12px] text-[#0c1f3f]/30">!</span>
                    <p className="text-[13px] leading-relaxed text-[#0c1f3f]/60">{toText(n)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {compliance.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/40">Compliance</p>
              <div className="mt-5 flex flex-col gap-3">
                {compliance.map((n, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border p-4" style={{ borderColor: `${INK}14`, background: "rgba(255,255,255,.6)" }}>
                    <span className="mt-0.5 shrink-0 text-[12px]" style={{ color: GOLD }}>✓</span>
                    <p className="text-[13px] leading-relaxed text-[#0c1f3f]/60">{toText(n)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────────────────────────── */
function Faq({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  const [open, setOpen] = useState(0);
  if (!d.faq.length) return null;
  return (
    <section data-tone="dark" className="relative isolate px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <Eyebrow ar="أسئلة شائعة">Questions</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05]`}>
            This route, <span className="italic" style={{ color: GOLD }}>answered.</span>
          </h2>
        </div>
        <div>
          {d.faq.map((f, i) => {
            const on = open === i;
            return (
              <div key={i} className="border-b" style={{ borderColor: "rgba(255,255,255,.14)" }}>
                <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} aria-controls={`program-faq-panel-${i}`} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                  <span className={`${serifClass} text-[1.2rem] font-medium leading-snug transition-colors ${on ? "text-[#bfa15c]" : ""}`}>{toText(f.q)}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[15px] transition-all duration-300" style={{ borderColor: on ? GOLD : "rgba(255,255,255,.25)", color: on ? GOLD : "#eef3fb", transform: on ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {on ? (
                    <motion.div id={`program-faq-panel-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <p className="pb-6 pr-10 text-[15px] leading-relaxed text-white/70">{toText(f.a)}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ─────────────────────────────────────────────────────────────────── */
function CTA({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  return (
    <section data-tone="dark" className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Image src={d.heroImage} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.5)_brightness(0.35)_contrast(1.05)]" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(8,18,42,.92) 0%,rgba(8,18,42,.6) 50%,rgba(8,18,42,.88) 100%)" }} />
      <div className="relative z-10 mx-auto max-w-3xl">
        <h2 className={`${serifClass} text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.0]`}>
          Start the <span className="italic" style={{ color: GOLD }}>{d.country}</span> route.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
          A senior advisor will confirm the exact costs, timeline and documents for your case — privately, and entirely off the record.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
            Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a href={`/${d.verticalSlug}/${d.countrySlug}`} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">
            All {d.country} routes
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── ROOT ─────────────────────────────────────────────────────────────────── */
export default function ProgramHub({
  data,
  serifClass,
  overviewSection,
}: {
  data: ProgramData;
  serifClass: string;
  overviewSection?: ReactNode;
}) {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPlay(true), 120);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="relative">
      <Header serifClass={serifClass} />
      <Hero d={data} serifClass={serifClass} play={play} />
      {overviewSection ? <Overview content={overviewSection} serifClass={serifClass} /> : null}
      <Snapshot d={data} serifClass={serifClass} />
      <Benefits d={data} serifClass={serifClass} />
      <Costs d={data} serifClass={serifClass} />
      <Eligibility d={data} serifClass={serifClass} />
      <Language d={data} serifClass={serifClass} />
      <PointsGrid d={data} serifClass={serifClass} />
      <Occupations d={data} serifClass={serifClass} />
      <Process d={data} serifClass={serifClass} />
      <DocumentChecklist d={data} serifClass={serifClass} />
      <FamilyScope d={data} serifClass={serifClass} />
      <Projects d={data} serifClass={serifClass} />
      <Sponsorship d={data} serifClass={serifClass} />
      <AuthorityNotes d={data} serifClass={serifClass} />
      <RiskNotes d={data} serifClass={serifClass} />
      <Faq d={data} serifClass={serifClass} />
      <CTA d={data} serifClass={serifClass} />
      <Footer serifClass={serifClass} />
    </div>
  );
}
