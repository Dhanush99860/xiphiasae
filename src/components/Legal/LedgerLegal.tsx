"use client";

/**
 * Obsidian Ledger — the navy/gold legal-document template (owner-approved).
 * A reusable shell + inline primitives shared by all legal pages
 * (privacy-policy, terms, cookies, refunds, accessibility, anti-fraud).
 *
 * Usage (in a server page.tsx that keeps its own `metadata` + JSON-LD):
 *   <LedgerShell serifClass={serif.className} crumb="Privacy Policy" eyebrow="Privacy"
 *      eyebrowAr="الخصوصية" title={<>Privacy <span className="italic" style={{color:LEDGER.GOLD}}>Policy.</span></>}
 *      intro="…" effectiveDate="09 Oct 2025" nav={NAV} heroExtra={<…optional cards…/>}>
 *     <Section id="overview" num="01" title="Who we are"> … </Section>
 *     …
 *   </LedgerShell>
 */

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

export const LEDGER = {
  GOLD: "#bfa15c",
  NAVY: "#0a1733",
  HEAD: "#eef3fb",
  TEXT: "rgba(238,243,251,0.78)",
  MUTE: "rgba(238,243,251,0.55)",
  FAINT: "rgba(238,243,251,0.45)",
  GLASS: "linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0))",
  GLASS_BORDER: "rgba(191,161,92,0.22)",
  HERO_BG: "radial-gradient(120% 90% at 15% 0%, #13284f 0%, #0a1733 60%)",
} as const;

const { GOLD, NAVY, HEAD, TEXT, MUTE, FAINT, GLASS, GLASS_BORDER, HERO_BG } = LEDGER;

export type TocItem = { id: string; label: string; num: string };

/* ------------------------------- primitives ------------------------------- */

export function GoldLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="underline underline-offset-2 transition hover:opacity-80" style={{ color: GOLD }}>
      {children}
    </a>
  );
}

export function Eyebrow({ children, ar }: { children: ReactNode; ar?: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span aria-hidden className="h-px w-8" style={{ background: GOLD }} />
      {children}
      {ar ? (
        <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
          {ar}
        </span>
      ) : null}
    </p>
  );
}

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg border p-5 transition-colors hover:border-[#bfa15c]/45 ${className}`}
      style={{ borderColor: GLASS_BORDER, background: GLASS, color: TEXT }}
    >
      {children}
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium"
      style={{ borderColor: GLASS_BORDER, background: "rgba(255,255,255,0.04)", color: TEXT }}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
      {children}
    </span>
  );
}

/** Outline button-style link used in hero / inline CTAs. */
export function GhostLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-sm transition hover:opacity-80"
      style={{ borderColor: GLASS_BORDER, color: TEXT }}
    >
      {children}
    </a>
  );
}

export function DLRow({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 border-t py-3 first:border-t-0 md:grid-cols-5" style={{ borderColor: GLASS_BORDER }}>
      <dt className="text-sm font-semibold md:col-span-2" style={{ color: HEAD }}>{term}</dt>
      <dd className="text-sm md:col-span-3" style={{ color: TEXT }}>{children}</dd>
    </div>
  );
}

export function Accordion({ summary, children, defaultOpen = false }: { summary: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border" style={{ borderColor: GLASS_BORDER, background: GLASS }}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold"
        style={{ color: HEAD }}
      >
        <span>{summary}</span>
        <span aria-hidden className="transition-transform duration-300" style={{ color: GOLD, transform: open ? "rotate(180deg)" : "none" }}>▾</span>
      </button>
      {open && <div className="px-4 pb-4 text-sm" style={{ color: TEXT }}>{children}</div>}
    </div>
  );
}

/** Data table. `head` = column labels; `rows` = array of cell arrays (first cell rendered as the row's lead/heading). */
export function LedgerTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  const th = "p-3 text-left font-semibold uppercase tracking-wide text-[11px]";
  const td = "p-3";
  return (
    <div className="overflow-x-auto rounded-lg border" style={{ borderColor: GLASS_BORDER, background: GLASS }}>
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr style={{ color: GOLD, borderBottom: `1px solid ${GOLD}` }}>
            {head.map((h) => (
              <th key={h} className={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="align-top" style={{ color: TEXT }}>
          {rows.map((row, i) => (
            <tr key={i} className="border-t" style={{ borderColor: GLASS_BORDER }}>
              {row.map((cell, j) => (
                <td key={j} className={j === 0 ? `${td} font-medium` : td} style={j === 0 ? { color: HEAD } : undefined}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Section({ id, num, title, children }: { id: string; num: string; title: string; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28"
      style={{ background: "transparent" }}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-baseline gap-4">
        <span aria-hidden className="text-[2rem] font-medium leading-none" style={{ color: GOLD, fontFamily: "var(--font-cormorant, serif)" }}>{num}</span>
        <h2 id={`${id}-title`} className="text-xl font-medium tracking-tight md:text-2xl" style={{ color: HEAD, fontFamily: "var(--font-cormorant, serif)" }}>
          {title}
        </h2>
      </div>
      <div className="mt-4 max-w-none leading-relaxed" style={{ color: TEXT }}>{children}</div>
    </motion.section>
  );
}

/* --------------------------------- shell --------------------------------- */

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);
  return active;
}

export function LedgerShell({
  serifClass,
  crumb,
  eyebrow,
  eyebrowAr,
  title,
  intro,
  effectiveDate,
  heroExtra,
  nav,
  children,
}: {
  serifClass: string;
  crumb: string;
  eyebrow: string;
  eyebrowAr?: string;
  title: ReactNode;
  intro?: ReactNode;
  effectiveDate?: string;
  heroExtra?: ReactNode;
  nav: TocItem[];
  children: ReactNode;
}) {
  const active = useActiveSection(nav.map((n) => n.id));

  return (
    <div className="relative">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:px-3 focus:py-2"
        style={{ background: GOLD, color: NAVY }}
      >
        Skip to content
      </a>

      <Header serifClass={serifClass} />

      <main data-tone="dark" className="relative isolate" style={{ background: HERO_BG, color: TEXT }}>
        <Ambient tone="dark" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: GOLD, opacity: 0.55 }} />

        {/* Hero */}
        <header className="px-6 pb-10 pt-32 sm:px-12 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: MUTE }}>
              <a href="/" className="hover:opacity-80">Home</a> <span style={{ color: GOLD }}>/</span> {crumb}
            </p>
            <div className="mt-7"><Eyebrow ar={eyebrowAr}>{eyebrow}</Eyebrow></div>
            <h1 className={`${serifClass} mt-5 text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.0]`} style={{ color: HEAD }}>
              {title}
            </h1>
            {intro ? <p className="mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: "rgba(238,243,251,0.75)" }}>{intro}</p> : null}
            {effectiveDate ? <p className="mt-4 text-sm" style={{ color: MUTE }}>Effective: {effectiveDate}</p> : null}
            {heroExtra ? <div className="mt-8 max-w-3xl">{heroExtra}</div> : null}
          </div>
        </header>

        {/* Body + sticky right-rail TOC */}
        <div id="content" className="px-6 pb-20 sm:px-12 lg:px-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-12 lg:col-span-9">
              {/* Mobile / inline TOC */}
              <nav aria-label="On this page" className="rounded-lg border p-4 lg:hidden" style={{ borderColor: GLASS_BORDER, background: GLASS }}>
                <p className="mb-2 text-xs uppercase tracking-[0.2em]" style={{ color: FAINT }}>On this page</p>
                <div className="flex flex-wrap gap-2">
                  {nav.map((n) => (
                    <a key={n.id} href={`#${n.id}`} className="inline-flex items-center rounded-md border px-2 py-1 text-xs transition hover:opacity-80" style={{ borderColor: GLASS_BORDER, color: TEXT }}>
                      {n.label}
                    </a>
                  ))}
                </div>
              </nav>

              {children}
            </div>

            {/* Sticky right-rail TOC (desktop) */}
            <aside className="hidden lg:col-span-3 lg:block">
              <nav aria-label="On this page" className="sticky top-28">
                <p className="mb-3 text-xs uppercase tracking-[0.2em]" style={{ color: FAINT }}>On this page</p>
                <ul className="space-y-1">
                  {nav.map((n) => {
                    const isActive = active === n.id;
                    return (
                      <li key={n.id}>
                        <a
                          href={`#${n.id}`}
                          aria-current={isActive ? "true" : undefined}
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition"
                          style={{ color: isActive ? HEAD : "rgba(238,243,251,0.6)" }}
                        >
                          <span
                            aria-hidden
                            className="h-1.5 w-1.5 shrink-0 rounded-full transition"
                            style={{ background: isActive ? GOLD : "transparent", boxShadow: isActive ? `0 0 0 1px ${GOLD}` : `inset 0 0 0 1px ${GLASS_BORDER}` }}
                          />
                          {n.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          </div>
        </div>
      </main>

      <Footer serifClass={serifClass} />
    </div>
  );
}
