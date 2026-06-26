"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const INK = "#0c1f3f";

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-black/15 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 backdrop-blur">{children}</div>;
}
function Rise({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}>
      {words.map((w, i) => (<span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}><motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span></span>))}
    </motion.span>
  );
}

const COUNTRIES = [
  { name: "Grenada", region: "Caribbean", img: "/images/citizenship/grenada/coral-bay-residences.webp", time: "4–6 mo", visa: "145", from: "$235k", routes: 2 },
  { name: "Antigua & Barbuda", region: "Caribbean", img: "/images/citizenship/antigua/antigua-barbuda-business-investment.webp", time: "3–6 mo", visa: "150+", from: "$230k", routes: 3 },
  { name: "Dominica", region: "Caribbean", img: "/images/citizenship/dominica/dominica-citizenship-by-investment.webp", time: "3–6 mo", visa: "145", from: "$200k", routes: 2 },
  { name: "St Kitts & Nevis", region: "Caribbean", img: "/images/citizenship/st-kitts-nevis/ntf-st-principel.webp", time: "3–6 mo", visa: "150+", from: "$250k", routes: 3 },
  { name: "Saint Lucia", region: "Caribbean", img: "/images/citizenship/saint-lucia-citizenship/nef-saint-lucia.webp", time: "3–6 mo", visa: "146", from: "$240k", routes: 2 },
  { name: "Türkiye", region: "Eurasia", img: "/images/citizenship/turkey/bank-deposit-turkey.webp", time: "6 mo", visa: "113", from: "$400k", routes: 6 },
  { name: "Egypt", region: "Africa", img: "/images/citizenship/egypt/business-investment.webp", time: "6–9 mo", visa: "51", from: "$250k", routes: 4 },
  { name: "São Tomé & Príncipe", region: "Africa", img: "/images/citizenship/saotome/saotome_cbi.webp", time: "2–4 mo", visa: "145", from: "$90k", routes: 1 },
  { name: "Nauru", region: "Pacific", img: "/images/citizenship/nauru/donation-nauru.webp", time: "3–4 mo", visa: "86", from: "$105k", routes: 1 },
  { name: "Vanuatu", region: "Pacific", img: "/images/citizenship/vanuatu/Vanuatu-Citizenship.webp", time: "1–2 mo", visa: "90+", from: "$130k", routes: 1 },
];
const REGIONS = ["All", "Caribbean", "Eurasia", "Africa", "Pacific"];
const DUO = "object-cover [filter:grayscale(0.55)_brightness(0.66)_contrast(1.05)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.82)] group-hover:scale-105";

export default function Section3CitDestinations({ serifClass }: { serifClass: string }) {
  const [region, setRegion] = useState("All");
  const list = COUNTRIES.filter((c) => region === "All" || c.region === region);
  return (
    <main>
      <section className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Ambient tone="light" />
        <Badge>Section 3 · Destinations (filter by region)</Badge>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Where we secure citizenship<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">الوجهات</span></p>
              <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}><Rise text="Ten jurisdictions to a second passport." /></h2>
              <p className="mt-3 text-[13px] text-[#0c1f3f]/55">10 citizenship programmes · 25 investment routes · across four regions.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <button key={r} onClick={() => setRegion(r)} className="rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200" style={{ borderColor: region === r ? GOLD : `${INK}22`, background: region === r ? GOLD : "transparent", color: region === r ? "#0a1733" : `${INK}aa` }}>{r}</button>
              ))}
            </div>
          </div>
          <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((c) => (
                <motion.a key={c.name} href="#" layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4 }} className="group block aspect-[4/5] [perspective:1100px]">
                  <div
                    onPointerMove={(e) => { const el = e.currentTarget; const r = el.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height; el.style.setProperty("--mx", `${px * 100}%`); el.style.setProperty("--my", `${py * 100}%`); el.style.setProperty("--rx", `${(py - 0.5) * -7}deg`); el.style.setProperty("--ry", `${(px - 0.5) * 9}deg`); }}
                    onPointerLeave={(e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); }}
                    className="relative h-full w-full overflow-hidden rounded-md transition-transform duration-300 ease-out group-hover:shadow-[0_30px_60px_-30px_rgba(8,18,42,0.6)]"
                    style={{ transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))", transformStyle: "preserve-3d", ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
                  >
                    <Image src={c.img} alt={c.name} fill sizes="(min-width:1024px) 22rem, 50vw" className={DUO} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.1) 55%, rgba(8,18,42,0.4) 100%)" }} />
                    <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(14rem 14rem at var(--mx) var(--my), rgba(191,161,92,0.25), transparent 60%)", mixBlendMode: "screen" }} />
                    <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
                    <span aria-hidden className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t opacity-0 transition-all duration-500 group-hover:left-4 group-hover:top-4 group-hover:opacity-100" style={{ borderColor: GOLD }} />
                    <span aria-hidden className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r opacity-0 transition-all duration-500 group-hover:bottom-4 group-hover:right-4 group-hover:opacity-100" style={{ borderColor: GOLD }} />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-[#eef3fb]" style={{ transform: "translateZ(40px)" }}>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{c.region}</span>
                      <h3 className={`${serifClass} mt-1 text-[1.7rem] font-medium leading-tight`}>{c.name}</h3>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-white/70"><span>{c.time}</span><span>·</span><span>{c.visa} visa-free</span><span>·</span><span>from {c.from}</span><span>·</span><span style={{ color: GOLD }}>{c.routes} route{c.routes > 1 ? "s" : ""}</span></div>
                      <span className="mt-3 inline-flex translate-y-1 items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" style={{ color: GOLD }}>Explore <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
          <p className="mt-10 text-center text-[12px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>Compare all citizenship programmes →</p>
        </div>
      </section>
    </main>
  );
}
