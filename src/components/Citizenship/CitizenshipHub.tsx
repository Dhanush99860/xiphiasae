"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";
const STEEL = "#9fb4d8";

/* ─────────── shared text animations (whileInView by default, or `play`-gated) ─────────── */
function Rise({ text, className, delay = 0, stagger = 0.05, play }: { text: string; className?: string; delay?: number; stagger?: number; play?: boolean }) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      initial="hidden"
      animate={play === undefined ? undefined : play ? "show" : "hidden"}
      whileInView={play === undefined ? "show" : undefined}
      viewport={play === undefined ? { once: true, amount: 0.4 } : undefined}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => (<span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}><motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span></span>))}
    </motion.span>
  );
}
function Fade({ children, delay = 0, className, play }: { children: React.ReactNode; delay?: number; className?: string; play?: boolean }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={play === undefined ? undefined : play ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      whileInView={play === undefined ? { opacity: 1, y: 0 } : undefined}
      viewport={play === undefined ? { once: true, amount: 0.3 } : undefined}
      transition={{ duration: 0.7, delay }}
    >{children}</motion.div>
  );
}
function Eyebrow({ children, ar, center }: { children: React.ReactNode; ar: string; center?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] ${center ? "justify-center" : ""}`} style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />{children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}
function spotlight(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget; const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
  el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
}

/* ═══════════ 1 · HERO ═══════════ */
const HERO_IMG = "/images/citizenship/grenada/grenada-citizenship.webp";
const CHIPS = ["Private client service", "Due-diligence desk", "Discreet & confidential"];
function Hero({ serifClass, play }: { serifClass: string; play: boolean }) {
  return (
    <section data-tone="dark" className="relative flex min-h-screen items-center overflow-hidden text-[#eef3fb]" style={{ background: NAVY }}>
      <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={play ? { scale: 1 } : { scale: 1.12 }} transition={{ duration: 8, ease: "easeOut" }}>
        <Image src={HERO_IMG} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.5)_brightness(0.6)_contrast(1.05)]" priority />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.3) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.8) 0%, transparent 45%)" }} />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-20">
        <Fade play={play}><p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.55)" }}><a href="/" className="transition-colors hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> Citizenship by Investment</p></Fade>
        <Fade play={play} delay={0.1}><p className="mt-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Citizenship by Investment<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">الجنسية بالاستثمار</span></p></Fade>
        <h1 className={`${serifClass} mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.98]`}><Rise text="Second citizenship," play={play} delay={0.2} className="block" /><span className="block italic" style={{ color: GOLD }}><Rise text="first-class advisory." play={play} delay={0.5} /></span></h1>
        <Fade play={play} delay={0.9}><p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">Donation and real-estate routes across the Caribbean, Türkiye and beyond — arranged end-to-end, with transparent costs and rigorous compliance.</p></Fade>
        <Fade play={play} delay={1.05}><div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href="/guide" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Download the guide</a></div></Fade>
        <motion.div className="mt-10 flex flex-wrap gap-2.5" initial="hidden" animate={play ? "show" : "hidden"} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } } }}>{CHIPS.map((c) => <motion.span key={c} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="rounded-full border px-3 py-1.5 text-[12px] text-white/70" style={{ borderColor: "rgba(191,161,92,0.4)" }}>{c}</motion.span>)}</motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-white/55"><span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span><span className="block h-9 w-px" style={{ background: `linear-gradient(${GOLD},transparent)` }} /></div>
    </section>
  );
}

/* ═══════════ 2 · WHY WORK WITH US (interactive props) ═══════════ */
const PROPS = [
  { no: "01", title: "A dedicated due-diligence desk", line: "Source-of-funds guidance, handled discreetly.", detail: "We map and pre-clear your source of funds before a single application is filed — quietly, and on your terms." },
  { no: "02", title: "Government-approved project vetting", line: "Only vetted routes and projects.", detail: "Every approved project is independently vetted, and we plan your exit before you ever enter." },
  { no: "03", title: "End-to-end execution", line: "Strategy to passports, one desk.", detail: "One named advisor owns the strategy, documents, submission, the oath, and the passports themselves." },
  { no: "04", title: "White-glove for families", line: "Confidential concierge for your family.", detail: "Spouse, children and dependent parents — included, confidential, and concierge-handled throughout." },
];
function WhyUs({ serifClass }: { serifClass: string }) {
  const [active, setActive] = useState(0);
  return (
    <section data-tone="dark" className="relative isolate px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <Eyebrow ar="لماذا نحن">Why work with us</Eyebrow>
          <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04]`}><Rise text="A private-client approach to" /><span className="italic" style={{ color: GOLD }}><Rise text="second citizenship." delay={0.25} /></span></h2>
          <Fade delay={0.3}><p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/70">Transparent costs, rigorous compliance, and execution without friction.</p></Fade>
          <Fade delay={0.4}><div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Speak to an advisor <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href="/document-readiness" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Download the checklist</a></div></Fade>
        </div>
        <Fade>
          <div>
            {PROPS.map((p, i) => {
              const on = i === active;
              return (
                <button key={p.no} type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="group relative block w-full border-t py-6 ps-5 text-left transition-colors duration-300" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
                  <span aria-hidden className="absolute left-0 top-6 bottom-6 w-0.5 origin-top transition-transform duration-300" style={{ background: GOLD, transform: on ? "scaleY(1)" : "scaleY(0)" }} />
                  <div className="flex items-baseline gap-5">
                    <span className={`${serifClass} text-[2rem] font-medium transition-all duration-300`} style={{ color: on ? GOLD : "rgba(255,255,255,0.3)" }}>{p.no}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className={`${serifClass} text-[1.7rem] font-medium leading-tight transition-colors duration-300`} style={{ color: on ? GOLD : "#eef3fb" }}>{p.title}</h3>
                        <span className="text-lg transition-all duration-300" style={{ color: GOLD, opacity: on ? 1 : 0, transform: on ? "translateX(0)" : "translateX(-6px)" }}>→</span>
                      </div>
                      <p className="mt-1.5 text-[14px] text-white/55">{p.line}</p>
                      <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: on ? "6rem" : "0", opacity: on ? 1 : 0 }}>
                        <p className="mt-3 max-w-md text-[14px] italic leading-relaxed text-white/75">{p.detail}</p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ═══════════ 3 · DESTINATIONS ═══════════ */
const COUNTRIES = [
  { name: "Grenada", slug: "grenada", region: "Caribbean", img: "/images/citizenship/grenada/coral-bay-residences.webp", time: "4–6 mo", visa: "145", from: "$235k", routes: 2 },
  { name: "Antigua & Barbuda", slug: "antigua-barbuda", region: "Caribbean", img: "/images/citizenship/antigua/antigua-barbuda-business-investment.webp", time: "3–6 mo", visa: "150+", from: "$230k", routes: 3 },
  { name: "Dominica", slug: "dominica", region: "Caribbean", img: "/images/citizenship/dominica/dominica-citizenship-by-investment.webp", time: "3–6 mo", visa: "145", from: "$200k", routes: 2 },
  { name: "St Kitts & Nevis", slug: "saintkitts", region: "Caribbean", img: "/images/citizenship/st-kitts-nevis/ntf-st-principel.webp", time: "3–6 mo", visa: "150+", from: "$250k", routes: 3 },
  { name: "Saint Lucia", slug: "saint-lucia", region: "Caribbean", img: "/images/citizenship/saint-lucia-citizenship/nef-saint-lucia.webp", time: "3–6 mo", visa: "146", from: "$240k", routes: 2 },
  { name: "Türkiye", slug: "turkey", region: "Eurasia", img: "/images/citizenship/turkey/bank-deposit-turkey.webp", time: "6 mo", visa: "113", from: "$400k", routes: 6 },
  { name: "Egypt", slug: "egypt", region: "Africa", img: "/images/citizenship/egypt/business-investment.webp", time: "6–9 mo", visa: "51", from: "$250k", routes: 4 },
  { name: "São Tomé & Príncipe", slug: "saotome", region: "Africa", img: "/images/citizenship/saotome/saotome_cbi.webp", time: "2–4 mo", visa: "145", from: "$90k", routes: 1 },
  { name: "Nauru", slug: "nauru", region: "Pacific", img: "/images/citizenship/nauru/donation-nauru.webp", time: "3–4 mo", visa: "86", from: "$105k", routes: 1 },
  { name: "Vanuatu", slug: "vanuatu", region: "Pacific", img: "/images/citizenship/vanuatu/Vanuatu-Citizenship.webp", time: "1–2 mo", visa: "90+", from: "$130k", routes: 1 },
];
const REGIONS = ["All", "Caribbean", "Eurasia", "Africa", "Pacific"];
const DUO_DEST = "object-cover [filter:grayscale(0.55)_brightness(0.66)_contrast(1.05)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.82)] group-hover:scale-105";
function Destinations({ serifClass }: { serifClass: string }) {
  const [region, setRegion] = useState("All");
  const list = COUNTRIES.filter((c) => region === "All" || c.region === region);
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow ar="الوجهات">Where we secure citizenship</Eyebrow>
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
              <motion.a key={c.name} href={`/citizenship/${c.slug}`} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4 }} className="group block aspect-[4/5] [perspective:1100px]">
                <div
                  onPointerMove={(e) => { const el = e.currentTarget; const r = el.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height; el.style.setProperty("--mx", `${px * 100}%`); el.style.setProperty("--my", `${py * 100}%`); el.style.setProperty("--rx", `${(py - 0.5) * -7}deg`); el.style.setProperty("--ry", `${(px - 0.5) * 9}deg`); }}
                  onPointerLeave={(e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); }}
                  className="relative h-full w-full overflow-hidden rounded-md transition-transform duration-300 ease-out group-hover:shadow-[0_30px_60px_-30px_rgba(8,18,42,0.6)]"
                  style={{ transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))", transformStyle: "preserve-3d", ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
                >
                  <Image src={c.img} alt={c.name} fill sizes="(min-width:1024px) 22rem, 50vw" className={DUO_DEST} />
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
  );
}

/* ═══════════ 4 · ROUTES + WHY IT WORKS ═══════════ */
const ROUTES = [
  { k: "Donation", from: "from $200,000", tag: "Speed & simplicity", line: "A non-refundable contribution to a national fund — the fastest, cleanest route, with no asset to manage.", points: ["Lowest entry threshold", "Fewest moving parts", "Fastest to passport"] },
  { k: "Real estate", from: "from $300,000", tag: "Asset-backed value", line: "A government-approved property investment, resaleable after a holding period — your capital stays invested.", points: ["Tangible, resaleable asset", "Potential rental yield", "Capital retained, not spent"] },
];
const BENEFITS = [
  { v: "140+", t: "Visa-free", d: "UK, Schengen, Singapore & more." },
  { v: "Whole family", t: "Included", d: "Spouse, children & dependent parents." },
  { v: "No residency", t: "Required", d: "Never need to live there." },
  { v: "Tax-efficient", t: "Worldwide", d: "No tax on foreign income or estate." },
  { v: "Lifetime", t: "& inheritable", d: "Citizenship that passes to your heirs." },
  { v: "1–6 months", t: "Timeline", d: "From application to passport." },
];
function Routes({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="dark" className="relative isolate flex min-h-screen items-center px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto w-full max-w-6xl">
        <Eyebrow ar="طرق الاستثمار">How you invest</Eyebrow>
        <h2 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04]`}><Rise text="Two routes." /><span className="italic" style={{ color: GOLD }}><Rise text="One second passport." delay={0.2} /></span></h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {ROUTES.map((rt, i) => (
            <Fade key={rt.k} delay={i * 0.1}>
              <a href="/contact" onPointerMove={spotlight} className="group relative block h-full cursor-pointer overflow-hidden rounded-lg border p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.7)]" style={{ borderColor: "rgba(191,161,92,0.28)", background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0))", ["--mx" as string]: "50%", ["--my" as string]: "50%" }}>
                <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(18rem 18rem at var(--mx) var(--my), rgba(191,161,92,0.16), transparent 60%)" }} />
                <div className="relative flex items-start justify-between">
                  <div><p className="text-[12px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>{rt.tag}</p><h3 className={`${serifClass} mt-2 text-[clamp(1.8rem,3vw,2.4rem)] font-medium transition-colors group-hover:text-[#bfa15c]`}>{rt.k}</h3></div>
                  <span className={`${serifClass} text-[1.2rem] italic`} style={{ color: GOLD }}>{rt.from}</span>
                </div>
                <p className="relative mt-5 text-[15px] leading-relaxed text-white/70">{rt.line}</p>
                <ul className="relative mt-6 flex flex-col gap-3">{rt.points.map((pt) => <li key={pt} className="flex items-center gap-3 text-[14px] text-white/80"><span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />{pt}</li>)}</ul>
                <span className="relative mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors group-hover:text-[#bfa15c]" style={{ color: "#eef3fb" }}>Explore this route <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>
              </a>
            </Fade>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {BENEFITS.map((bn, i) => (
            <Fade key={bn.t} delay={i * 0.05}>
              <div onPointerMove={spotlight} className="group relative h-full cursor-default overflow-hidden rounded-lg border p-5 transition-all duration-300 hover:-translate-y-1" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", ["--mx" as string]: "50%", ["--my" as string]: "50%" }}>
                <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(10rem 10rem at var(--mx) var(--my), rgba(191,161,92,0.14), transparent 60%)" }} />
                <div className={`${serifClass} relative text-[clamp(1.1rem,1.6vw,1.5rem)] font-medium leading-none`} style={{ color: GOLD }}>{bn.v}</div>
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

/* ═══════════ 4b · MOBILITY (visa stamps rain in) ═══════════ */
const STAMPS = [
  { t: "DUBAI", s: "ENTRY", l: "4%", top: "8%", rot: -9, round: true, c: GOLD },
  { t: "LONDON", s: "★ UK ★", l: "39%", top: "3%", rot: 6, round: false, c: STEEL },
  { t: "SCHENGEN", s: "EU", l: "70%", top: "10%", rot: -13, round: true, c: GOLD },
  { t: "SINGAPORE", s: "ENTRY", l: "9%", top: "39%", rot: 11, round: false, c: STEEL },
  { t: "TŌKYŌ", s: "日本", l: "45%", top: "36%", rot: -6, round: true, c: GOLD },
  { t: "NEW YORK", s: "E-2", l: "73%", top: "45%", rot: 9, round: false, c: STEEL },
  { t: "HONG KONG", s: "ENTRY", l: "18%", top: "69%", rot: -11, round: false, c: GOLD },
  { t: "GENÈVE", s: "CH", l: "55%", top: "70%", rot: 6, round: true, c: STEEL },
];
function Mobility({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="dark" className="relative isolate flex min-h-screen items-center px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Eyebrow ar="حرية التنقل">Where it takes you</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.0]`}>Visa-free to <span className="italic" style={{ color: GOLD }}>145 destinations.</span></h2>
          <Fade delay={0.1}><p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/70">The moment your citizenship is granted, the world opens — the UK, Schengen, Singapore, Hong Kong and beyond, without a visa.</p></Fade>
          <Fade delay={0.2}><p className="mt-7 text-[12px] uppercase tracking-[0.18em] text-white/45">UK · Schengen · Singapore · Hong Kong · +140 more</p></Fade>
          <Fade delay={0.3}><a href="/passport-index" className="group mt-8 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>Explore the passport index <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a></Fade>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }} className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border" style={{ background: "linear-gradient(135deg,#f7f9fd,#e6ecf6)", borderColor: `${GOLD}44` }}>
          <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: `repeating-linear-gradient(125deg, ${GOLD}12 0 2px, transparent 2px 10px)` }} />
          <div className="absolute inset-x-0 top-3 text-center text-[9px] font-semibold uppercase tracking-[0.3em] text-[#0c1f3f]/35">Visas · Visas · تأشيرات</div>
          {STAMPS.map((st) => (
            <motion.div key={st.t} className="absolute" style={{ left: st.l, top: st.top, rotate: `${st.rot}deg` }} variants={{ hidden: { opacity: 0, scale: 1.9 }, show: { opacity: 0.92, scale: 1, transition: { duration: 0.34, ease: "easeOut" } } }}>
              <div className={`${st.round ? "rounded-full px-4 py-3" : "rounded-[3px] px-3 py-2"} border-[2.5px] text-center`} style={{ borderColor: st.c, color: st.c }}>
                <p className={`${serifClass} text-[clamp(0.8rem,1.3vw,1.05rem)] font-bold leading-none`}>{st.t}</p>
                <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.14em]">{st.s}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════ 5 · THE PROCESS ═══════════ */
const STEPS = [
  { no: "01", title: "Private consultation", short: "Goals, budget, the right jurisdiction.", detail: "A confidential conversation to understand your objectives, timeline and budget — and to recommend the jurisdiction and route that fit you best.", handle: ["Jurisdiction & route strategy", "Indicative costs & timeline", "Under NDA from day one"] },
  { no: "02", title: "Due diligence & source of funds", short: "Pre-cleared before anything is filed.", detail: "We map and pre-clear your source of funds and run preliminary background checks, so there are no surprises once your file is submitted.", handle: ["Source-of-funds dossier", "Preliminary background check", "Full document checklist"] },
  { no: "03", title: "Application & submission", short: "Prepared and filed by your desk.", detail: "We assemble your full application and submit it to the government's CBI unit — managed end-to-end by your named advisor.", handle: ["Full application assembly", "Government submission", "Liaison & follow-through"] },
  { no: "04", title: "Approval & investment", short: "Make the qualifying investment.", detail: "On approval in principle, you make the qualifying donation or property investment, and we manage every final formality.", handle: ["Approval in principle", "Donation or real-estate investment", "Final compliance"] },
  { no: "05", title: "Oath & passports", short: "Citizenship — for the family.", detail: "Citizenship is granted and passports are issued for you and your family — and we remain on call for everything that comes after.", handle: ["Oath of allegiance", "Passports issued", "Lifetime concierge"] },
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
            <ul className="flex flex-col">
              {STEPS.map((st, i) => {
                const on = i === active;
                return (
                  <li key={st.no}>
                    <button onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="group relative block w-full py-4 text-left">
                      <span className="absolute -left-[2.05rem] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ring-4 transition-all duration-300" style={{ background: i <= active ? GOLD : "#f3f7fd", boxShadow: `0 0 0 4px #f3f7fd`, outline: `1px solid ${GOLD}` }} />
                      <span className="flex items-baseline gap-3">
                        <span className={`${serifClass} text-[1.2rem] font-medium`} style={{ color: on ? GOLD : `${INK}40` }}>{st.no}</span>
                        <span className={`${serifClass} text-[clamp(1.2rem,2.2vw,1.7rem)] font-medium transition-colors duration-300`} style={{ color: on ? INK : `${INK}66` }}>{st.title}</span>
                      </span>
                      <span className="ms-9 mt-0.5 block text-[13px] text-[#0c1f3f]/50">{st.short}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <motion.div key={active} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="flex flex-col justify-center rounded-lg border p-9 lg:p-12" style={{ borderColor: `${INK}14`, background: "rgba(255,255,255,0.5)" }}>
            <span className={`${serifClass} text-[5rem] font-medium leading-none`} style={{ color: GOLD }}>{s.no}</span>
            <h3 className={`${serifClass} mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-medium`}>{s.title}</h3>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#0c1f3f]/70">{s.detail}</p>
            <div className="mt-7 border-t pt-6" style={{ borderColor: `${INK}12` }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">What we handle</p>
              <ul className="mt-4 flex flex-col gap-3">{s.handle.map((h) => <li key={h} className="flex items-center gap-3 text-[14px] text-[#0c1f3f]/80"><span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />{h}</li>)}</ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════ 6 · PROOF (testimonial carousel) ═══════════ */
const QUOTES = [
  { q: "XIPHIAS arranged our family's second citizenship in four months — discreetly, and without a single surprise.", who: "A family-office principal", where: "Dubai" },
  { q: "They mapped three routes, recommended one, and handled everything from the source-of-funds dossier to our passports.", who: "A private investor", where: "Mumbai" },
  { q: "The most professional advisory we have worked with. Every step in writing, every deadline met.", who: "A technology founder", where: "London" },
];
const CREDENTIALS = ["Licensed in the UAE", "Member · Investment Migration Council", "Recognised — Times of India 2022", "17 years", "10,000+ families"];
function Proof({ serifClass }: { serifClass: string }) {
  const [i, setI] = useState(0);
  const move = (d: number) => setI((p) => (p + d + QUOTES.length) % QUOTES.length);
  const t = QUOTES[i];
  return (
    <section data-tone="dark" className="relative isolate flex min-h-screen items-center px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto w-full max-w-5xl">
        <Eyebrow ar="بكلماتهم" center>In their words</Eyebrow>
        <div className="relative mt-12 text-center">
          <span className={`${serifClass} block text-[6rem] leading-[0.4]`} style={{ color: GOLD }}>“</span>
          <div className="relative mt-6 min-h-[10rem]">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <p className={`${serifClass} mx-auto max-w-3xl text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium italic leading-[1.25]`}>{t.q}</p>
                <p className="mt-8 text-[12px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>{t.who} <span className="text-white/45">· {t.where}</span></p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex items-center justify-center gap-6">
            <button onClick={() => move(-1)} aria-label="Previous" className="flex h-10 w-10 items-center justify-center rounded-full border text-white/70 transition-colors hover:border-[#bfa15c] hover:text-[#bfa15c]" style={{ borderColor: "rgba(255,255,255,0.2)" }}>←</button>
            <div className="flex gap-2.5">{QUOTES.map((_, j) => <button key={j} onClick={() => setI(j)} aria-label={`Quote ${j + 1}`} className="h-2 rounded-full transition-all duration-300" style={{ width: j === i ? 28 : 8, background: j === i ? GOLD : "rgba(255,255,255,0.25)" }} />)}</div>
            <button onClick={() => move(1)} aria-label="Next" className="flex h-10 w-10 items-center justify-center rounded-full border text-white/70 transition-colors hover:border-[#bfa15c] hover:text-[#bfa15c]" style={{ borderColor: "rgba(255,255,255,0.2)" }}>→</button>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t pt-8 text-[12px] uppercase tracking-[0.16em] text-white/50" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          {CREDENTIALS.map((c, k) => (<span key={c} className="flex items-center gap-8">{c}{k < CREDENTIALS.length - 1 ? <span style={{ color: GOLD }}>·</span> : null}</span>))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════ 7 · INSIGHTS ═══════════ */
const ARTICLES = [
  { cat: "Guide", title: "Caribbean citizenship by investment, compared", meta: "8 min read", img: "/images/citizenship/dominica/dominica-real-estate.webp" },
  { cat: "Article", title: "Grenada CBI in 2025 — routes, costs & timeline", meta: "6 min read", img: "/images/citizenship/grenada/grenada-real-estate.webp" },
  { cat: "Insight", title: "Why a second citizenship now", meta: "5 min read", img: "/images/citizenship/turkey/real-estate-turkey.webp" },
];
const DUO_ART = "object-cover [filter:grayscale(0.5)_brightness(0.7)_contrast(1.05)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.85)] group-hover:scale-105";
function Insights({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow ar="مقالات">Insights</Eyebrow>
            <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] font-medium`}><Rise text="Read before you decide." /></h2>
          </div>
          <a href="/insights" className="text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>All insights →</a>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Fade key={a.title} delay={i * 0.1}>
              <a href="/insights" className="group block">
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-md">
                  <Image src={a.img} alt="" fill sizes="30vw" className={DUO_ART} />
                  <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}26` }} />
                  <span className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a1733]" style={{ background: GOLD }}>{a.cat}</span>
                </div>
                <h3 className={`${serifClass} mt-4 text-[1.35rem] font-medium leading-snug transition-colors group-hover:text-[#bfa15c]`}>{a.title}</h3>
                <p className="mt-2 text-[12px] uppercase tracking-[0.14em] text-[#0c1f3f]/45">{a.meta}</p>
              </a>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════ 8 · CONSULTATION CTA ═══════════ */
const CTA_IMG = "/images/citizenship/saint-lucia-citizenship/saint-lucia-citizenship.webp";
function CTA({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <section ref={ref} data-tone="dark" className="relative flex min-h-screen items-center overflow-hidden px-6 py-28 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image src={CTA_IMG} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.45)_brightness(0.42)_contrast(1.05)]" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.9) 0%, rgba(8,18,42,0.55) 50%, rgba(8,18,42,0.85) 100%)" }} />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Eyebrow ar="ابدأ الآن" center>Your next move</Eyebrow>
        <h2 className={`${serifClass} mt-6 text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.0]`}>Begin your <span className="italic" style={{ color: GOLD }}>second citizenship.</span></h2>
        <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">Tell us your goal. A senior advisor will recommend the jurisdiction and route that fit — privately, and entirely off the record.</p>
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>
          <a href="/guide" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Download the guide</a>
        </div>
        <p lang="ar" dir="rtl" className="mt-8 font-arabic-display text-2xl" style={{ color: GOLD }}>جنسيتك الثانية تبدأ من هنا</p>
        <p className="mt-8 text-[12px] uppercase tracking-[0.18em] text-white/45">By appointment · Dubai · London · Bengaluru</p>
      </div>
    </section>
  );
}

/* ═══════════ ENTRANCE · the seal stamps "GRANTED", then wipes into the hero ═══════════ */
function SealEntrance({ serifClass, onDone }: { serifClass: string; onDone: () => void }) {
  const [phase, setPhase] = useState<"seal" | "wipe">("seal");
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
      style={{ background: `radial-gradient(120% 90% at 50% 0%, #13284f 0%, ${NAVY} 60%)`, transformOrigin: "right" }}
      animate={{ scaleX: phase === "wipe" ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => { if (phase === "wipe") onDone(); }}
    >
      <motion.div animate={{ opacity: phase === "wipe" ? 0 : 1 }} transition={{ duration: 0.25 }} className="relative flex flex-col items-center text-center">
        <motion.span aria-hidden className="absolute top-[clamp(7rem,15vw,10rem)] h-[clamp(15rem,30vw,20rem)] w-[clamp(15rem,30vw,20rem)] -translate-y-1/2 rounded-full border-2" style={{ borderColor: GOLD }} initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: [0.3, 1.9], opacity: [0, 0.5, 0] }} transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }} />
        <motion.div className="h-[clamp(15rem,30vw,20rem)] w-[clamp(15rem,30vw,20rem)]" initial={{ scale: 2.6, opacity: 0, rotate: -18 }} animate={{ scale: [2.6, 0.92, 1], opacity: [0, 1, 1], rotate: [-18, 3, 0] }} transition={{ duration: 0.85, times: [0, 0.72, 1], ease: "easeOut" }}>
          <svg viewBox="0 0 220 220" className="h-full w-full" style={{ filter: `drop-shadow(0 8px 30px ${GOLD}33)` }}>
            <defs><path id="hubSealArc" d="M110,110 m0,-84 a84,84 0 1,1 -0.01,0" /></defs>
            <circle cx="110" cy="110" r="105" fill="none" stroke={GOLD} strokeWidth="2.5" />
            <circle cx="110" cy="110" r="90" fill="none" stroke={GOLD} strokeWidth="1" strokeOpacity="0.55" />
            <circle cx="110" cy="110" r="62" fill="none" stroke={GOLD} strokeWidth="1" strokeOpacity="0.35" />
            <text fill={GOLD} fontSize="12.5" letterSpacing="3.4" fontWeight="600"><textPath href="#hubSealArc" startOffset="0">★ CITIZENSHIP BY INVESTMENT ★ XIPHIAS ★ DUBAI&nbsp;&nbsp;</textPath></text>
            <text x="110" y="98" textAnchor="middle" fill={GOLD} className={serifClass} fontSize="30" fontWeight="600" letterSpacing="1">GRANTED</text>
            <text x="110" y="128" textAnchor="middle" fill={GOLD} fillOpacity="0.7" fontSize="11" letterSpacing="3">APPROVED</text>
            <path d="M110 138 l4 8 9 1 -6.5 6.5 1.5 9 -8-4.5 -8 4.5 1.5-9 -6.5-6.5 9-1z" fill={GOLD} />
          </svg>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.95 }} onAnimationComplete={() => { if (phase === "seal") setTimeout(() => setPhase("wipe"), 480); }}>
          <h2 className={`${serifClass} mt-10 text-[clamp(2rem,4.5vw,3.4rem)] font-medium text-[#eef3fb]`}>Citizenship <span className="italic" style={{ color: GOLD }}>granted.</span></h2>
          <p className="mt-3 text-[12px] uppercase tracking-[0.24em] text-white/55">Welcome — you are now a global citizen</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════ ASSEMBLED HUB ═══════════ */
export default function CitizenshipHub({ serifClass }: { serifClass: string }) {
  const [entered, setEntered] = useState(false);
  const [play, setPlay] = useState(false);
  return (
    <div className="relative">
      <Header serifClass={serifClass} />
      <Hero serifClass={serifClass} play={play} />
      <WhyUs serifClass={serifClass} />
      <Destinations serifClass={serifClass} />
      <Routes serifClass={serifClass} />
      <Mobility serifClass={serifClass} />
      <Process serifClass={serifClass} />
      <Proof serifClass={serifClass} />
      <Insights serifClass={serifClass} />
      <CTA serifClass={serifClass} />
      <Footer serifClass={serifClass} />

      {!entered ? <SealEntrance serifClass={serifClass} onDone={() => { setEntered(true); setPlay(true); }} /> : null}
    </div>
  );
}
