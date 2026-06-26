"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import WhyInvest from "@/components/HomeLuxe/WhyInvest";
import ProgrammesTable from "@/components/HomeLuxe/ProgrammesTable";
import WhatWeProvide from "@/components/HomeLuxe/WhatWeProvide";
import PassportPower from "@/components/HomeLuxe/PassportPower";
import FaqSection from "@/components/HomeLuxe/FaqSection";
import WhyXiphias from "@/components/HomeLuxe/WhyXiphias";
import InsightsNews from "@/components/HomeLuxe/InsightsNews";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";
const HERO_IMG = "/images/residency/uae/uae-golden-visa.webp";
const CTA_IMG = "/images/residency/portugal/portugal-golden-visa.webp";

function Rise({ text, className, delay = 0, play }: { text: string; className?: string; delay?: number; play?: boolean }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" animate={play === undefined ? undefined : play ? "show" : "hidden"} whileInView={play === undefined ? "show" : undefined} viewport={play === undefined ? { once: true, amount: 0.4 } : undefined} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}>
      {words.map((w, i) => (<span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}><motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span></span>))}
    </motion.span>
  );
}
function Fade({ children, delay = 0, className, play }: { children: React.ReactNode; delay?: number; className?: string; play?: boolean }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 18 }} animate={play === undefined ? undefined : play ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} whileInView={play === undefined ? { opacity: 1, y: 0 } : undefined} viewport={play === undefined ? { once: true, amount: 0.3 } : undefined} transition={{ duration: 0.7, delay }}>{children}</motion.div>;
}
function Eyebrow({ children, ar, center }: { children: React.ReactNode; ar: string; center?: boolean }) {
  return <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] ${center ? "justify-center" : ""}`} style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />{children}<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span></p>;
}
function spotlight(e: React.PointerEvent<HTMLElement>) { const el = e.currentTarget; const r = el.getBoundingClientRect(); el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`); el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`); }

/* ── HERO ── */
const CHIPS = ["EU & Schengen", "10-year UAE Golden Visa", "Family included"];
const STATS = [{ v: "20+", u: "jurisdictions" }, { v: "€50k", u: "entry point" }, { v: "188", u: "visa-free max" }, { v: "10-yr", u: "residency" }];
function Hero({ serifClass, play }: { serifClass: string; play: boolean }) {
  return (
    <section data-tone="dark" className="relative flex min-h-screen items-center overflow-hidden text-[#eef3fb]" style={{ background: NAVY }}>
      <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={play ? { scale: 1 } : { scale: 1.12 }} transition={{ duration: 8, ease: "easeOut" }}>
        <Image src={HERO_IMG} alt="" fill sizes="100vw" priority className="object-cover [filter:grayscale(0.5)_brightness(0.6)_contrast(1.05)]" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.3) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.8) 0%, transparent 45%)" }} />
      <div className="lcp-instant relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-20">
        <Fade play={play}><p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.55)" }}><a href="/" className="transition-colors hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> Residency & Golden Visas</p></Fade>
        <Fade play={play} delay={0.1}><p className="mt-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Residency & Golden Visas<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">الإقامة والفيزا الذهبية</span></p></Fade>
        <h1 className={`${serifClass} mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.98]`}><Rise text="Residency & golden visas," play={play} delay={0.2} className="block" /><span className="block italic" style={{ color: GOLD }}><Rise text="expertly arranged." play={play} delay={0.5} /></span></h1>
        <Fade play={play} delay={0.9}><p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">A 10-year UAE Golden Visa, an EU golden visa or a global investor residence — the right to live, work and retire across 20+ jurisdictions, arranged end-to-end.</p></Fade>
        <Fade play={play} delay={1.05}><div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href="/citizenship" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Or explore citizenship</a></div></Fade>
        <motion.div className="mt-10 flex flex-wrap gap-2.5" initial="hidden" animate={play ? "show" : "hidden"} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } } }}>{CHIPS.map((c) => <motion.span key={c} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="rounded-full border px-3 py-1.5 text-[12px] text-white/70" style={{ borderColor: "rgba(191,161,92,0.4)" }}>{c}</motion.span>)}</motion.div>
        <Fade play={play} delay={1.3}><div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t pt-7" style={{ borderColor: "rgba(255,255,255,0.12)" }}>{STATS.map((s) => <div key={s.u} className="flex flex-col"><span className="text-[clamp(1.3rem,2vw,1.8rem)] font-semibold tabular-nums" style={{ color: GOLD }}>{s.v}</span><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">{s.u}</span></div>)}</div></Fade>
      </div>
    </section>
  );
}

/* ── DESTINATIONS ── */
const COUNTRIES = [
  { name: "United Arab Emirates", slug: "uae", region: "Gulf", img: "/images/residency/uae/uae-golden-visa.webp", time: "2–4 wks", visa: "183", from: "$545k", note: "10-yr Golden Visa" },
  { name: "Portugal", slug: "portugal", region: "Europe", img: "/images/residency/portugal/portugal-golden-visa.webp", time: "6–9 mo", visa: "188", from: "€500k", note: "EU · citizenship 5 yrs" },
  { name: "Greece", slug: "greece", region: "Europe", img: "/images/residency/greece/greece-golden-visa.webp", time: "2–4 mo", visa: "186", from: "€250k", note: "Schengen" },
  { name: "Malta", slug: "malta", region: "Europe", img: "/images/residency/malta/malta-mprp.webp", time: "4–6 mo", visa: "184", from: "€182k", note: "Permanent residence" },
  { name: "Cyprus", slug: "cyprus", region: "Europe", img: "/images/residency/cyprus/cyprus-residential-property.webp", time: "2–3 mo", visa: "182", from: "€300k", note: "Permanent residence" },
  { name: "Hungary", slug: "hungary", region: "Europe", img: "/images/residency/hungary/hungary-residency-by-investment.webp", time: "3–6 mo", visa: "186", from: "€250k", note: "Guest Investor" },
  { name: "Bulgaria", slug: "bulgaria", region: "Europe", img: "/images/residency/bulgaria/bulgaria-aif.webp", time: "6 mo", visa: "176", from: "€512k", note: "EU permanent residence" },
  { name: "Singapore", slug: "singapore", region: "Asia", img: "/images/residency/singapore/singapore-gip-pr-investment-hero.webp", time: "9–12 mo", visa: "195", from: "S$10M", note: "Global Investor (GIP)" },
  { name: "Curaçao", slug: "curacao", region: "Caribbean", img: "/images/residency/curacao/curacao-3-year-investor-residency.webp", time: "3–4 mo", visa: "187", from: "$280k", note: "Dutch citizenship 5 yrs" },
];
const REGIONS = ["All", "Europe", "Gulf", "Asia", "Caribbean"];
const DUO = "object-cover [filter:grayscale(0.55)_brightness(0.66)_contrast(1.05)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.82)] group-hover:scale-105";
function Destinations({ serifClass }: { serifClass: string }) {
  const [region, setRegion] = useState("All");
  const list = COUNTRIES.filter((c) => region === "All" || c.region === region);
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow ar="الوجهات">Where we secure residency</Eyebrow>
            <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}><Rise text="Twenty jurisdictions to call home." /></h2>
            <p className="mt-3 text-[13px] text-[#0c1f3f]/55">From the UAE Golden Visa to EU golden visas — investor residence across four regions.</p>
          </div>
          <div className="flex flex-wrap gap-2">{REGIONS.map((r) => <button key={r} onClick={() => setRegion(r)} className="rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200" style={{ borderColor: region === r ? GOLD : `${INK}22`, background: region === r ? GOLD : "transparent", color: region === r ? "#0a1733" : `${INK}aa` }}>{r}</button>)}</div>
        </div>
        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((c) => (
              <motion.a key={c.name} href={`/residency/${c.slug}`} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4 }} className="group block aspect-[4/5] [perspective:1100px]">
                <div onPointerMove={(e) => { const el = e.currentTarget; const r = el.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height; el.style.setProperty("--mx", `${px * 100}%`); el.style.setProperty("--my", `${py * 100}%`); el.style.setProperty("--rx", `${(py - 0.5) * -7}deg`); el.style.setProperty("--ry", `${(px - 0.5) * 9}deg`); }} onPointerLeave={(e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); }} className="relative h-full w-full overflow-hidden rounded-md transition-transform duration-300 ease-out group-hover:shadow-[0_30px_60px_-30px_rgba(8,18,42,0.6)]" style={{ transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))", transformStyle: "preserve-3d", ["--mx" as string]: "50%", ["--my" as string]: "50%" }}>
                  <Image src={c.img} alt={c.name} fill sizes="(min-width:1024px) 22rem, 50vw" className={DUO} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.1) 55%, rgba(8,18,42,0.4) 100%)" }} />
                  <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(14rem 14rem at var(--mx) var(--my), rgba(191,161,92,0.25), transparent 60%)", mixBlendMode: "screen" }} />
                  <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-[#eef3fb]" style={{ transform: "translateZ(40px)" }}>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{c.region}</span>
                    <h3 className={`${serifClass} mt-1 text-[1.7rem] font-medium leading-tight`}>{c.name}</h3>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-white/70"><span>{c.time}</span><span>·</span><span>{c.visa} visa-free</span><span>·</span><span>from {c.from}</span></div>
                    <span className="mt-2 block text-[12px]" style={{ color: GOLD }}>{c.note}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ── ROUTES ── */
const ROUTES = [
  { k: "Real estate", from: "from €250,000", tag: "Tangible & resaleable", line: "Buy a qualifying property and hold it — your capital stays in a hard asset that can be sold after the holding period.", points: ["Tangible, resaleable asset", "Potential rental yield", "Capital retained, not spent"] },
  { k: "Investment fund", from: "from €250,000", tag: "Regulated & passive", line: "Subscribe to a government-approved fund — a hands-off, professionally managed route with no property to maintain.", points: ["Fully passive", "Regulated & diversified", "No asset management"] },
  { k: "Capital transfer", from: "from $545,000", tag: "Simple & liquid", line: "A bank deposit, business or talent route — the fastest, cleanest path to a Gulf or EU residence permit.", points: ["Fewest moving parts", "Fast to permit", "Liquid capital"] },
];
const BENEFITS = [
  { v: "Live & work", t: "Anywhere", d: "Across the EU, the Gulf and beyond." },
  { v: "Whole family", t: "Included", d: "Spouse, children & dependent parents." },
  { v: "Light or no", t: "Stay rules", d: "Most programmes need few or no days." },
  { v: "Tax-efficient", t: "Regimes", d: "Relocate to favourable jurisdictions." },
  { v: "Path to", t: "Citizenship", d: "Many routes lead to a passport." },
  { v: "2 weeks–", t: "9 months", d: "From application to residence permit." },
];
function Routes({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="dark" className="relative isolate flex min-h-screen items-center px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto w-full max-w-6xl">
        <Eyebrow ar="طرق الاستثمار">How you invest</Eyebrow>
        <h2 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04]`}><Rise text="Three routes." /><span className="italic" style={{ color: GOLD }}><Rise text="One global residence." delay={0.2} /></span></h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {ROUTES.map((rt, i) => (
            <Fade key={rt.k} delay={i * 0.1}>
              <a href="/contact" onPointerMove={spotlight} className="group relative block h-full cursor-pointer overflow-hidden rounded-lg border p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.7)]" style={{ borderColor: "rgba(191,161,92,0.28)", background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0))", ["--mx" as string]: "50%", ["--my" as string]: "50%" }}>
                <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(18rem 18rem at var(--mx) var(--my), rgba(191,161,92,0.16), transparent 60%)" }} />
                <div className="relative flex items-start justify-between"><div><p className="text-[12px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>{rt.tag}</p><h3 className={`${serifClass} mt-2 text-[clamp(1.6rem,2.6vw,2.1rem)] font-medium transition-colors group-hover:text-[#bfa15c]`}>{rt.k}</h3></div><span className={`${serifClass} text-[1.1rem] italic`} style={{ color: GOLD }}>{rt.from}</span></div>
                <p className="relative mt-5 text-[15px] leading-relaxed text-white/70">{rt.line}</p>
                <ul className="relative mt-6 flex flex-col gap-3">{rt.points.map((pt) => <li key={pt} className="flex items-center gap-3 text-[14px] text-white/80"><span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />{pt}</li>)}</ul>
              </a>
            </Fade>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {BENEFITS.map((bn, i) => (
            <Fade key={bn.t} delay={i * 0.05}>
              <div onPointerMove={spotlight} className="group relative h-full cursor-default overflow-hidden rounded-lg border p-5 transition-all duration-300 hover:-translate-y-1" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", ["--mx" as string]: "50%", ["--my" as string]: "50%" }}>
                <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(10rem 10rem at var(--mx) var(--my), rgba(191,161,92,0.14), transparent 60%)" }} />
                <div className={`${serifClass} relative text-[clamp(1.05rem,1.5vw,1.4rem)] font-medium leading-none`} style={{ color: GOLD }}>{bn.v}</div>
                <div className="relative mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">{bn.t}</div>
                <p className="relative mt-2 text-[12px] leading-relaxed text-white/55">{bn.d}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROCESS ── */
const STEPS = [
  { no: "01", title: "Private consultation", detail: "We understand your goals — mobility, tax, family, a base or a path to citizenship — and recommend the right residence programme.", handle: ["Jurisdiction & route strategy", "Indicative costs & timeline", "Under NDA from day one"] },
  { no: "02", title: "Eligibility & source of funds", detail: "We pre-clear your source of funds and confirm eligibility before anything is filed, so there are no surprises.", handle: ["Source-of-funds dossier", "Eligibility confirmation", "Full document checklist"] },
  { no: "03", title: "Application & investment", detail: "We assemble and submit your application and guide the qualifying investment — property, fund or transfer.", handle: ["Full application assembly", "Government submission", "Qualifying investment"] },
  { no: "04", title: "Residence granted", detail: "Your residence permit or golden visa is issued for you and your family — and we handle the formalities on arrival.", handle: ["Permit / visa issued", "Family included", "Banking & relocation"] },
  { no: "05", title: "Renewal & the path onward", detail: "We manage renewals and, where you wish, the route to permanent residence and citizenship.", handle: ["Renewals managed", "Path to PR & citizenship", "Lifetime concierge"] },
];
function Process({ serifClass }: { serifClass: string }) {
  const [active, setActive] = useState(0);
  const s = STEPS[active];
  const pct = (active / (STEPS.length - 1)) * 100;
  return (
    <section data-tone="light" className="relative isolate flex min-h-screen items-center px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto w-full max-w-6xl">
        <Eyebrow ar="كيف نعمل">How we do it</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}><Rise text="Five steps. One desk." /></h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative ps-8">
            <div className="absolute left-1 top-2 bottom-2 w-px" style={{ background: `${INK}1a` }}><div className="w-full origin-top transition-[height] duration-500" style={{ height: `${pct}%`, background: GOLD }} /></div>
            <ul className="flex flex-col">{STEPS.map((st, i) => { const on = i === active; return (
              <li key={st.no}><button onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="group relative block w-full py-4 text-left">
                <span className="absolute -left-[2.05rem] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full transition-all duration-300" style={{ background: i <= active ? GOLD : "#f3f7fd", boxShadow: `0 0 0 4px #f3f7fd`, outline: `1px solid ${GOLD}` }} />
                <span className="flex items-baseline gap-3"><span className={`${serifClass} text-[1.2rem] font-medium`} style={{ color: on ? GOLD : `${INK}40` }}>{st.no}</span><span className={`${serifClass} text-[clamp(1.2rem,2.2vw,1.7rem)] font-medium transition-colors duration-300`} style={{ color: on ? INK : `${INK}66` }}>{st.title}</span></span>
              </button></li>
            ); })}</ul>
          </div>
          <motion.div key={active} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="flex flex-col justify-center rounded-lg border p-9 lg:p-12" style={{ borderColor: `${INK}14`, background: "rgba(255,255,255,0.5)" }}>
            <span className={`${serifClass} text-[5rem] font-medium leading-none`} style={{ color: GOLD }}>{s.no}</span>
            <h3 className={`${serifClass} mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-medium`}>{s.title}</h3>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#0c1f3f]/70">{s.detail}</p>
            <div className="mt-7 border-t pt-6" style={{ borderColor: `${INK}12` }}><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">What we handle</p><ul className="mt-4 flex flex-col gap-3">{s.handle.map((h) => <li key={h} className="flex items-center gap-3 text-[14px] text-[#0c1f3f]/80"><span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />{h}</li>)}</ul></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTA({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <section ref={ref} data-tone="dark" className="relative flex min-h-screen items-center overflow-hidden px-6 py-28 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <motion.div className="absolute inset-0" style={{ y }}><Image src={CTA_IMG} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.45)_brightness(0.42)_contrast(1.05)]" /></motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.9) 0%, rgba(8,18,42,0.55) 50%, rgba(8,18,42,0.85) 100%)" }} />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Eyebrow ar="ابدأ الآن" center>Your next move</Eyebrow>
        <h2 className={`${serifClass} mt-6 text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.0]`}>Secure your <span className="italic" style={{ color: GOLD }}>residency.</span></h2>
        <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">Tell us your goal. A senior advisor will recommend the residence programme and route that fit — privately, and entirely off the record.</p>
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href="/residency/eligibility-check" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Check your eligibility</a></div>
        <p className="mt-8 text-[12px] uppercase tracking-[0.18em] text-white/45">By appointment · Dubai · London · Bengaluru</p>
      </div>
    </section>
  );
}

/* ── ENTRANCE CURTAIN ── */
function Curtain({ serifClass, onDone }: { serifClass: string; onDone: () => void }) {
  const [wipe, setWipe] = useState(false);
  return (
    <motion.div className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden" style={{ background: NAVY, transformOrigin: "right" }} animate={{ scaleX: wipe ? 0 : 1 }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} onAnimationComplete={() => { if (wipe) onDone(); }}>
      <motion.span className={`${serifClass} text-[clamp(1.4rem,3vw,2.4rem)] font-medium italic`} style={{ color: GOLD }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} onAnimationComplete={() => setTimeout(() => setWipe(true), 450)}>Residency & Golden Visas</motion.span>
      <span className="absolute bottom-0 left-0 h-0.5 w-full" style={{ background: GOLD }} />
    </motion.div>
  );
}

export default function ResidencyHub({ serifClass }: { serifClass: string }) {
  const [entered, setEntered] = useState(false);
  const [play, setPlay] = useState(false);
  return (
    <div className="relative">
      <Header serifClass={serifClass} />
      <Hero serifClass={serifClass} play={play} />
      <WhyInvest serifClass={serifClass} />
      <Destinations serifClass={serifClass} />
      <ProgrammesTable serifClass={serifClass} defaultTab="residency" />
      <Routes serifClass={serifClass} />
      <WhatWeProvide serifClass={serifClass} />
      <PassportPower serifClass={serifClass} />
      <Process serifClass={serifClass} />
      <FaqSection serifClass={serifClass} />
      <WhyXiphias serifClass={serifClass} />
      <InsightsNews serifClass={serifClass} />
      <CTA serifClass={serifClass} />
      <Footer serifClass={serifClass} />
      <AnimatePresence>{!entered ? <Curtain serifClass={serifClass} onDone={() => { setEntered(true); setPlay(true); }} /> : null}</AnimatePresence>
    </div>
  );
}
