"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const GOLD = "#bfa15c";
const INK = "#0c1f3f";

type Row = { flag: string; name: string; route: string; from: string; time: string; note: string; href: string };
const DATA: Record<"citizenship" | "residency", Row[]> = {
  citizenship: [
    { flag: "grenada", name: "Grenada", route: "Donation / Real estate", from: "$158,000", time: "4–6 months", note: "E-2 visa to the USA · 145 visa-free", href: "/citizenship/grenada" },
    { flag: "Dominica", name: "Dominica", route: "Donation", from: "$200,000", time: "3–6 months", note: "Most accessible donation · 145", href: "/citizenship/dominica" },
    { flag: "st-kitts-nevis", name: "St Kitts & Nevis", route: "Donation", from: "$250,000", time: "3–6 months", note: "The original CBI · 150+", href: "/citizenship/saintkitts" },
    { flag: "Antigua-barbuda", name: "Antigua & Barbuda", route: "Donation", from: "$230,000", time: "3–6 months", note: "Family-friendly · 150+", href: "/citizenship/antigua-barbuda" },
    { flag: "turkey", name: "Türkiye", route: "Real estate", from: "$400,000", time: "~6 months", note: "E-2 eligible · 113 visa-free", href: "/citizenship/turkey" },
    { flag: "st-lucia", name: "Saint Lucia", route: "Donation / Bonds", from: "$240,000", time: "6–12 months", note: "145 visa-free", href: "/citizenship/saint-lucia" },
    { flag: "Ejypt", name: "Egypt", route: "Donation / Deposit", from: "$250,000", time: "6–9 months", note: "Regional base · fast track", href: "/citizenship/egypt" },
  ],
  residency: [
    { flag: "UAE", name: "United Arab Emirates", route: "Golden Visa · property", from: "$545,000", time: "2–4 weeks", note: "10-year residency · 0% income tax", href: "/golden-visa" },
    { flag: "Portugal", name: "Portugal", route: "Golden Visa · fund", from: "€500,000", time: "6–9 months", note: "EU · citizenship in 5 years", href: "/residency/portugal" },
    { flag: "Greece", name: "Greece", route: "Golden Visa · real estate", from: "€250,000", time: "2–4 months", note: "Schengen · 186 visa-free", href: "/residency/greece" },
    { flag: "Malta", name: "Malta", route: "Permanent residence", from: "€182,000", time: "4–6 months", note: "Stable EU residence", href: "/residency/malta" },
    { flag: "cyprust", name: "Cyprus", route: "Permanent residence", from: "€300,000", time: "2–3 months", note: "182 visa-free", href: "/residency/cyprus" },
    { flag: "hungary", name: "Hungary", route: "Guest Investor · fund", from: "€250,000", time: "3–6 months", note: "10-year EU residence", href: "/residency/hungary" },
    { flag: "Curacao", name: "Curaçao", route: "Residency", from: "$280,000", time: "3–4 months", note: "Dutch citizenship in 5 years", href: "/residency/curacao" },
  ],
};
const TABS: { key: "citizenship" | "residency"; label: string }[] = [
  { key: "citizenship", label: "Citizenship by Investment" },
  { key: "residency", label: "Residency & Golden Visas" },
];

export default function ProgrammesTable({ serifClass, defaultTab = "citizenship" }: { serifClass: string; defaultTab?: "citizenship" | "residency" }) {
  const [tab, setTab] = useState<"citizenship" | "residency">(defaultTab);
  const rows = DATA[tab];
  return (
    <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />What we offer<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">برامجنا</span></p>
            <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] font-medium leading-[1.05]`}>Every route, with the <span className="italic" style={{ color: GOLD }}>real numbers.</span></h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#0c1f3f]/60">No vague promises — the exact investment, timeline and mobility for every programme we run, across 35 jurisdictions.</p>
          </div>
          <div className="flex flex-wrap gap-2.5 text-center">
            {[["35", "jurisdictions"], ["60+", "programmes"], ["$90k", "entry point"], ["190", "destinations"]].map(([v, u]) => (
              <div key={u} className="rounded-lg border px-4 py-2.5" style={{ borderColor: `${INK}1a` }}>
                <div className={`${serifClass} text-[1.4rem] font-semibold leading-none`} style={{ color: GOLD }}>{v}</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0c1f3f]/50">{u}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex gap-2 border-b" style={{ borderColor: `${INK}1a` }}>
          {TABS.map((t) => {
            const on = tab === t.key;
            return (
              <button key={t.key} onClick={() => setTab(t.key)} className="relative px-1 pb-3 pr-7 text-left text-[14px] font-semibold transition-colors" style={{ color: on ? INK : `${INK}66` }}>
                {t.label}
                {on ? <motion.span layoutId="ptabline" className="absolute -bottom-px left-0 h-0.5 w-full" style={{ background: GOLD }} /> : null}
              </button>
            );
          })}
        </div>

        <div className="mt-2 overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[1.8fr_1.4fr_1fr_1fr_1.6fr] gap-4 border-b px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0c1f3f]/45" style={{ borderColor: `${INK}14` }}>
              <span>Jurisdiction</span><span>Route</span><span>Invest from</span><span>Timeline</span><span>Highlight</span>
            </div>
            {rows.map((r, i) => (
              <motion.a
                key={r.name}
                href={r.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group grid grid-cols-[1.8fr_1.4fr_1fr_1fr_1.6fr] items-center gap-4 border-b px-4 py-4 transition-colors hover:bg-white"
                style={{ borderColor: `${INK}10` }}
              >
                <span className="flex items-center gap-3">
                  <span className="relative h-5 w-7 shrink-0 overflow-hidden rounded-sm ring-1 ring-black/10"><Image src={`/images/flags/${r.flag}.png`} alt="" fill sizes="28px" className="object-cover" /></span>
                  <span className={`${serifClass} text-[1.2rem] font-medium leading-tight transition-colors group-hover:text-[#bfa15c]`}>{r.name}</span>
                </span>
                <span className="text-[13px] text-[#0c1f3f]/65">{r.route}</span>
                <span className={`${serifClass} text-[1.15rem] font-medium`} style={{ color: GOLD }}>{r.from}</span>
                <span className="text-[13px] text-[#0c1f3f]/70">{r.time}</span>
                <span className="flex items-center justify-between gap-2 text-[13px] text-[#0c1f3f]/70">{r.note}<span className="shrink-0 text-[#bfa15c] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span></span>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[13px] text-[#0c1f3f]/55">Figures are minimum qualifying investments, exclusive of government and due-diligence fees.</p>
          <a href="/citizenship" className="group inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>Compare all 60+ programmes <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>
        </div>
      </div>
    </section>
  );
}
