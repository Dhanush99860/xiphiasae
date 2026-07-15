"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";
const PEARL = "#eef3fb";
const LIGHT = "#f3f7fd";

/* ── animations ── */
function Rise({ text, className, delay = 0, play }: { text: string; className?: string; delay?: number; play?: boolean }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" animate={play === undefined ? undefined : play ? "show" : "hidden"} whileInView={play === undefined ? "show" : undefined} viewport={play === undefined ? { once: true, amount: 0.4 } : undefined} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}>
          <motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}
function Fade({ children, delay = 0, className, play }: { children: React.ReactNode; delay?: number; className?: string; play?: boolean }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={play === undefined ? undefined : play ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} whileInView={play === undefined ? { opacity: 1, y: 0 } : undefined} viewport={play === undefined ? { once: true, amount: 0.25 } : undefined} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
}
function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar: string; light?: boolean }) {
  const c = light ? INK : GOLD;
  const lineC = light ? `${INK}55` : GOLD;
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: light ? `${INK}80` : GOLD }}>
      <span className="h-px w-8" style={{ background: lineC }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal" style={{ color: c }}>{ar}</span>
    </p>
  );
}

/* ── data ── */
const HERO_STATS = [
  { v: "2007", u: "Founded" },
  { v: "17+", u: "Years advising" },
  { v: "10,000+", u: "Families" },
  { v: "35+", u: "Jurisdictions" },
];

const BIG_STATS = [
  { v: "17+", u: "Years of private advisory" },
  { v: "10,000+", u: "Families relocated globally" },
  { v: "35+", u: "Jurisdictions covered" },
  { v: "100+", u: "Immigration programmes" },
  { v: "98%", u: "Visa approval rate" },
  { v: "50+", u: "Countries served" },
  { v: "40+", u: "Industry awards" },
  { v: "3", u: "Global offices" },
];

const MILESTONES = [
  { year: "2007", title: "Founded in Bengaluru", text: "Varun Singh establishes XIPHIAS with one conviction: immigration advisory must be personal, rigorous and truly end-to-end." },
  { year: "2009", title: "Dubai office opens", text: "A presence established in Dubai — the crossroads of global mobility — serving Gulf and Middle East clients from the heart of the region." },
  { year: "2014", title: "Top 5 recognition", text: "Silicon India names XIPHIAS among India's Top 5 Immigration Consultants. The first of more than forty industry awards to follow." },
  { year: "2016", title: "ISO 9001:2015 Certified", text: "Quality management certification formalises our commitment to process excellence, client outcomes and regulatory compliance." },
  { year: "2019", title: "UK & global expansion", text: "Corporate LiveWire (UK) Corporate Excellence Award. Practice extended to corporate mobility, work permits and employer-sponsored visas." },
  { year: "2022", title: "London · Mayfair opens", text: "European HNI advisory desk established in Mayfair to serve the growing EU golden-visa and citizenship market." },
  { year: "2025", title: "Forbes India recognition", text: "Named India's Most Trusted Global Mobility Brand by Forbes India — 10,000 families relocated, four continents served." },
];

const VALUES = [
  { no: "01", title: "One accountable desk", text: "Every client has a named senior advisor from first call to passport in hand. No handoffs, no call centres, no processing factories." },
  { no: "02", title: "Discretion as standard", text: "HNI-grade confidentiality, encrypted data storage and source-of-funds rigour — before a single application is filed." },
  { no: "03", title: "Regulation-first advisory", text: "Every route we recommend is government-approved. Every project is independently vetted and we plan your exit before you enter." },
  { no: "04", title: "Transparent, milestone fees", text: "No hidden charges. You know exactly what you'll pay and when, before you commit to anything." },
  { no: "05", title: "35+ jurisdiction depth", text: "Caribbean, European, Gulf, Asia-Pacific — we know the programmes that match your goals, not just the ones we are paid to sell." },
  { no: "06", title: "Family-first planning", text: "We map mobility, tax, education and security in one unified strategy — not just the visa, but the life that comes after it." },
];

const AWARDS = [
  { img: "/images/awards/xiphias-award-2019.png", label: "National Excellence Award", year: "2019", source: "National Excellence Forum" },
  { img: "/images/awards/XIPHIAS-Awards-2021.jpg", label: "Consultant of the Year", year: "2021", source: "The Global Hues" },
  { img: "/images/awards/XIPHIAS-awards-toi-2022.jpg", label: "Best Immigration Consultant", year: "2022", source: "Times of India" },
  { img: "/images/awards/xiphias-awards-uk-2019.png", label: "Corporate Excellence", year: "2019", source: "Corporate LiveWire UK" },
];

const RECENT_AWARDS = [
  { year: "2025", title: "India's Most Trusted Global Mobility Brand", source: "Forbes India" },
  { year: "2025", title: "Most Visionary Leader Inspiring the Business World", source: "Achiever Magazine" },
  { year: "2024", title: "Most Trusted Immigration Consultancy", source: "Corporate Vision" },
  { year: "2024", title: "Top Influential Business Leaders", source: "The Times of India" },
  { year: "2024", title: "Fastest Growing Immigration Company", source: "The Business Fame" },
  { year: "2023", title: "India's Most Trusted Immigration Consultant", source: "The CIO Look India" },
];


const CREDS = [
  "Fellow · Investment Migration Council",
  "IMI Professional · CPD credentials",
  "ISO 9001:2015 Certified",
  "RCIC Registered · R516194",
  "MARA Aligned · #1680615",
  "Licensed in the UAE",
  "ICCRC/CICC-aligned counsel",
  "KYC / AML compliant",
];

const GALLERY = [
  "/images/events/seminar-2018-dubai/1.JPG",
  "/images/events/seminar-2018-dubai/2.JPG",
  "/images/events/seminar-2018-dubai/3.jpg",
  "/images/events/seminar-2018-dubai/4.jpg",
  "/images/events/seminar-2018-dubai-iccr/2.jpg",
  "/images/events/seminar-2018-dubai-iccr/3.jpg",
];

/* ══════════════════════════════════════════════════════════
   1 · HERO — full-screen Dubai skyline
══════════════════════════════════════════════════════════ */
function Hero({ serifClass, play }: { serifClass: string; play: boolean }) {
  return (
    <section data-tone="dark" className="relative flex min-h-screen items-end overflow-hidden pb-24 text-[#eef3fb]" style={{ background: NAVY }}>
      {/* Dubai skyline banner */}
      <motion.div className="absolute inset-0" initial={{ scale: 1.1 }} animate={play ? { scale: 1 } : { scale: 1.1 }} transition={{ duration: 10, ease: "easeOut" }}>
        <Image src="/images/home/dubai-global-mobility.webp" alt="Dubai skyline — XIPHIAS Immigration" fill sizes="100vw" priority className="object-cover object-center [filter:brightness(0.82)_contrast(1.06)_saturate(0.9)]" />
      </motion.div>
      {/* gradient — heavy at bottom so text reads cleanly */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,18,42,0.45) 0%, rgba(8,18,42,0.1) 30%, rgba(8,18,42,0.75) 65%, rgba(8,18,42,0.97) 100%)" }} />
      {/* left scrim for text column */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.7) 0%, transparent 60%)" }} />

      <div className="lcp-instant relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-20">
        <Fade play={play}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}>
            <a href="/" className="hover:text-[#bfa15c]">Home</a>
            <span style={{ color: GOLD }}> / </span>
            About
          </p>
        </Fade>
        <Fade play={play} delay={0.1}>
          <p className="mt-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
            <span className="h-px w-8" style={{ background: GOLD }} />
            About XIPHIAS
            <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">من نحن</span>
          </p>
        </Fade>
        <h1 className={`${serifClass} mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.96]`}>
          <Rise text="Seventeen years of" play={play} delay={0.2} className="block" />
          <span className="block italic" style={{ color: GOLD }}>
            <Rise text="moving families forward." play={play} delay={0.45} />
          </span>
        </h1>
        <Fade play={play} delay={0.85}>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75">
            A private global-mobility practice for those who value discretion. Since 2007 we have arranged residency, citizenship and second passports for more than 10,000 families across 35 jurisdictions — quietly, rigorously and end to end.
          </p>
        </Fade>
        <Fade play={play} delay={1.0}>
          <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-5 border-t pt-8 sm:grid-cols-4" style={{ borderColor: "rgba(191,161,92,0.3)" }}>
            {HERO_STATS.map((s) => (
              <div key={s.u} className="flex flex-col gap-1">
                <span className={`${serifClass} text-[clamp(1.6rem,2.5vw,2.2rem)] font-medium leading-none`} style={{ color: GOLD }}>{s.v}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">{s.u}</span>
              </div>
            ))}
          </div>
        </Fade>
        <Fade play={play} delay={1.15}>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
              Book a consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="/teams" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">
              Meet our advisors
            </a>
          </div>
        </Fade>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-white/50">
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
        <span className="block h-9 w-px" style={{ background: `linear-gradient(${GOLD},transparent)` }} />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   2 · STORY
══════════════════════════════════════════════════════════ */
function Story({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: LIGHT }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow ar="قصتنا" light>Our story</Eyebrow>
            <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.06]`}>
              <Rise text="From a single desk in Bengaluru" className="block" />
              <span className="block italic" style={{ color: GOLD }}><Rise text="to a global practice." delay={0.3} /></span>
            </h2>
            <Fade delay={0.1}>
              <p className="mt-7 text-[16px] leading-relaxed text-[#0c1f3f]/75">
                XIPHIAS Immigration began in 2007 as a single advisory with one conviction: that a family's global future is too important to be left to a processing factory. Varun Singh founded the practice on the belief that every client deserves a named senior advisor — someone who understands not just the visa, but the life being planned around it.
              </p>
            </Fade>
            <Fade delay={0.2}>
              <p className="mt-4 text-[16px] leading-relaxed text-[#0c1f3f]/65">
                Today, from offices in Dubai, London and Bengaluru, we advise internationally mobile families and businesses on residency, citizenship and skilled migration across more than 35 jurisdictions. We cover 100+ programmes — Caribbean citizenship, EU golden visas, UAE Golden Visas, corporate mobility, skilled migration pathways and more.
              </p>
            </Fade>
            <Fade delay={0.3}>
              <p className="mt-4 text-[16px] leading-relaxed text-[#0c1f3f]/65">
                We do not sell programmes. We map the right jurisdiction and route to each client's goals — mobility, tax, education, security or a genuine plan B — and we handle every step ourselves, from the source-of-funds dossier to the passport in hand. One accountable desk. Transparent costs. Discretion as standard.
              </p>
            </Fade>
            <Fade delay={0.4}>
              <blockquote className={`${serifClass} mt-10 border-l-2 pl-6 text-[clamp(1.3rem,2.4vw,1.8rem)] font-medium italic leading-snug text-[#0c1f3f]`} style={{ borderColor: GOLD }}>
                &ldquo;We measure success in families settled — not files processed.&rdquo;
                <footer className="mt-4 text-[13px] font-normal not-italic text-[#0c1f3f]/55">— Varun Singh, Managing Director</footer>
              </blockquote>
            </Fade>
          </div>

          {/* Varun Singh portrait */}
          <Fade delay={0.15}>
            <figure className="relative overflow-hidden rounded-lg" style={{ boxShadow: "0 40px 80px -30px rgba(8,18,42,0.18)" }}>
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image src="/images/avtar/varun-singh-md-xiphias.jpg" alt="Varun Singh, Managing Director — XIPHIAS Immigration" fill sizes="(min-width:1024px) 38rem, 100vw" className="object-cover object-top" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.72) 0%, transparent 45%)" }} />
                <span aria-hidden className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}40` }} />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7 text-[#eef3fb]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Managing Director</p>
                <p className={`${serifClass} mt-1 text-[1.6rem] font-medium`}>Varun Singh</p>
                <p className="mt-1.5 text-[13px] text-white/65">Fellow · Investment Migration Council<br />IMI Professional · 17+ years in global mobility</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["IMC Fellow", "ISO Certified", "RCIC R516194", "UAE Licensed"].map((b) => (
                    <span key={b} className="rounded-full border px-3 py-1 text-[11px] font-medium" style={{ borderColor: `${GOLD}55`, color: GOLD }}>{b}</span>
                  ))}
                </div>
              </div>
            </figure>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   3 · BIG NUMBERS
══════════════════════════════════════════════════════════ */
function Numbers({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="dark" className="relative isolate overflow-hidden px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="بالأرقام">By the numbers</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3rem)] font-medium`}>
          <Rise text="Seventeen years of results." />
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg sm:grid-cols-4" style={{ background: `rgba(191,161,92,0.14)` }}>
          {BIG_STATS.map((s, i) => (
            <Fade key={s.u} delay={i * 0.06}>
              <div className="group flex flex-col gap-2 px-7 py-8 transition-colors duration-300 hover:bg-white/5" style={{ background: "rgba(10,23,51,0.9)" }}>
                <span className={`${serifClass} text-[clamp(2rem,3.5vw,3rem)] font-medium leading-none`} style={{ color: GOLD }}>{s.v}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">{s.u}</span>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   4 · TIMELINE / MILESTONES
══════════════════════════════════════════════════════════ */
function Timeline({ serifClass }: { serifClass: string }) {
  const [active, setActive] = useState(0);
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f8fbff" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="مسيرتنا" light>Our journey</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}>
          <Rise text="A practice built over decades." />
        </h2>
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:gap-16">
          {/* year list */}
          <div className="relative flex flex-col">
            <div className="absolute left-[5.5rem] top-0 bottom-0 w-px" style={{ background: `${INK}14` }} />
            {MILESTONES.map((m, i) => (
              <button
                key={m.year}
                onClick={() => setActive(i)}
                className="group relative flex items-start gap-6 py-4 text-left"
              >
                <span className={`z-10 w-[4.5rem] shrink-0 text-right text-[13px] font-semibold tabular-nums transition-colors duration-200 ${i === active ? "" : "text-[#0c1f3f]/35"}`} style={{ color: i === active ? GOLD : undefined }}>
                  {m.year}
                </span>
                <span className={`relative z-10 mt-[3px] h-3 w-3 shrink-0 rounded-full border-2 transition-all duration-300 ${i === active ? "scale-125" : "scale-100"}`} style={{ borderColor: i === active ? GOLD : `${INK}30`, background: i === active ? GOLD : "white" }} />
                <span className={`text-[14px] font-semibold transition-colors duration-200 ${i === active ? "text-[#0c1f3f]" : "text-[#0c1f3f]/50"}`}>{m.title}</span>
              </button>
            ))}
          </div>
          {/* detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
              className="rounded-lg border p-9 lg:p-12"
              style={{ borderColor: `${GOLD}33`, background: "linear-gradient(160deg, rgba(191,161,92,0.07), rgba(255,255,255,0.9))" }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>{MILESTONES[active].year}</p>
              <h3 className={`${serifClass} mt-4 text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-tight`}>{MILESTONES[active].title}</h3>
              <p className="mt-5 text-[16px] leading-relaxed text-[#0c1f3f]/70">{MILESTONES[active].text}</p>
              <div className="mt-8 h-px" style={{ background: `${GOLD}30` }} />
              <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/35">
                {active + 1} of {MILESTONES.length} milestones
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   5 · VALUES / HOW WE WORK
══════════════════════════════════════════════════════════ */
function Values({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="dark" className="relative isolate px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="كيف نعمل">How we work</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}>
          <Rise text="Six principles. One practice." />
        </h2>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/65">
          We built XIPHIAS around the things that matter most to internationally mobile families — not throughput, not programme commissions, but real outcomes and lasting relationships.
        </p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Fade key={v.no} delay={i * 0.07}>
              <div className="group flex h-full flex-col gap-4 rounded-lg border p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#bfa15c]" style={{ borderColor: "rgba(191,161,92,0.22)", background: "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0))" }}>
                <span className={`${serifClass} text-[2.2rem] font-medium leading-none`} style={{ color: `${GOLD}40` }}>{v.no}</span>
                <h3 className={`${serifClass} text-[1.4rem] font-medium leading-snug transition-colors group-hover:text-[#bfa15c]`}>{v.title}</h3>
                <p className="text-[14px] leading-relaxed text-white/60">{v.text}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   6 · AWARDS & RECOGNITION
══════════════════════════════════════════════════════════ */
function Awards({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: LIGHT }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="التقدير" light>Awards &amp; recognition</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}>
          <Rise text="Forty-plus awards across eleven years." />
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#0c1f3f]/60">
          From Silicon India's Top 5 in 2014 to Forbes India's Most Trusted Global Mobility Brand in 2025 — recognised consistently across publications, geographies and categories.
        </p>

        {/* Award plaques */}
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {AWARDS.map((a, i) => (
            <Fade key={a.label} delay={i * 0.08}>
              <div className="group flex h-full flex-col items-center rounded-lg border bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_-28px_rgba(8,18,42,0.22)]" style={{ borderColor: `${INK}10` }}>
                <div className="relative h-24 w-full">
                  <Image src={a.img} alt={a.label} fill sizes="(min-width:640px) 12rem, 40vw" className="object-contain" />
                </div>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0c1f3f]/45">{a.source}</p>
                <p className={`${serifClass} mt-1.5 text-[1rem] font-medium leading-snug`}>{a.label}</p>
                <span className="mt-2 text-[11px] font-semibold" style={{ color: GOLD }}>{a.year}</span>
              </div>
            </Fade>
          ))}
        </div>

        {/* Recent awards list */}
        <Fade delay={0.3}>
          <div className="mt-14 rounded-lg border" style={{ borderColor: `${INK}12` }}>
            <div className="border-b px-7 py-5" style={{ borderColor: `${INK}12` }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">Recent recognition · 2023–2025</p>
            </div>
            <div className="divide-y" style={{ color: `${INK}10` }}>
              {RECENT_AWARDS.map((a, i) => (
                <div key={i} className="flex items-center gap-6 px-7 py-5 transition-colors hover:bg-white/60">
                  <span className="w-10 shrink-0 text-[13px] font-semibold tabular-nums" style={{ color: GOLD }}>{a.year}</span>
                  <div className="flex flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-4">
                    <span className="text-[14px] font-semibold text-[#0c1f3f]">{a.title}</span>
                    <span className="shrink-0 text-[12px] text-[#0c1f3f]/45">— {a.source}</span>
                  </div>
                  <span className="hidden text-[#bfa15c] sm:block">✦</span>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   7 · CREDENTIALS
══════════════════════════════════════════════════════════ */
function Credentials({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="dark" className="relative isolate px-6 py-20 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: "#061228" }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Eyebrow ar="الاعتمادات">Credentials &amp; compliance</Eyebrow>
            <h2 className={`${serifClass} mt-4 text-[clamp(1.6rem,3vw,2.4rem)] font-medium`}>Licensed, certified, transparent.</h2>
          </div>
          <div className="flex flex-wrap gap-2.5 lg:max-w-xl lg:justify-end">
            {CREDS.map((c) => (
              <Fade key={c}>
                <span className="rounded-full border px-4 py-2 text-[12px] font-medium text-white/70 transition-colors hover:border-[#bfa15c] hover:text-[#bfa15c]" style={{ borderColor: "rgba(191,161,92,0.35)" }}>{c}</span>
              </Fade>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-8 border-t pt-8" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="relative h-12 w-12 shrink-0">
            <Image src="/images/personal/credentials/imc-fellow-logo.svg" alt="IMC Fellow" fill sizes="48px" className="object-contain" />
          </div>
          <div className="relative h-12 w-12 shrink-0">
            <Image src="/images/personal/credentials/imi-professionals-logo.png" alt="IMI Professional" fill sizes="48px" className="object-contain" />
          </div>
          <p className="max-w-lg text-[14px] leading-relaxed text-white/55">
            XIPHIAS maintains the highest compliance standards across all jurisdictions — ISO 9001:2015 quality management, full KYC/AML procedures, and source-of-funds verification before any application is filed.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   8 · OFFICES
══════════════════════════════════════════════════════════ */
/* ── all offices by region ── */
type OfficeEntry = { city: string; entity: string; address: string; phone: string; email: string; phone2?: string };
const ALL_REGIONS: { region: string; offices: OfficeEntry[] }[] = [
  {
    region: "India",
    offices: [
      { city: "Bengaluru", entity: "XIPHIAS IMMIGRATION PVT LTD", address: "First Floor, ESSZED Meridian, Plot No. 780, 80 Feet Rd, 4th Block, Koramangala, Bengaluru, Karnataka 560034", phone: "+91 9021335577", email: "immigration@xiphias.in" },
      { city: "Gurugram", entity: "XIPHIAS IMMIGRATION PVT LTD", address: "Augusta Point, Golf Course Rd, near Parsvnath Exotica, DLF Phase 5, Sector 53, Gurugram, Haryana 122002", phone: "+91-96675 20211", email: "Gurgaon@xiphias.in" },
    ],
  },
  {
    region: "UAE",
    offices: [
      { city: "Dubai", entity: "XIPHIAS IMMIGRATION DMCC", address: "Unit No: 608, Platinum Tower, Plot No: JLT-PH1-I2, Jumeirah Lakes Towers, Dubai, UAE", phone: "+971-527 275 101", email: "dubai@xiphiasimmigration.com" },
    ],
  },
  {
    region: "Europe",
    offices: [
      { city: "Larnaca, Cyprus", entity: "XIPHIAS IMMIGRATION PVT LTD (Represented by Partners)", address: "41-43 Spyros Kyprianou Ave., Patroclos Tower, 6th Floor, Larnaca, 6051", phone: "+357-24-812000", email: "info@xiphiasimmigration.com" },
      { city: "Lisbon, Portugal", entity: "XIPHIAS IMMIGRATION PVT LTD (Represented by Partners)", address: "Rua do Mar Vermelho, nº 2, 2.1, 1990-152 Lisboa", phone: "+351-218 954 290", email: "info@xiphiasimmigration.com" },
      { city: "Valletta, Malta", entity: "XIPHIAS IMMIGRATION PVT LTD (Represented by Partners)", address: "120, St Ursula Street, Valletta, VLT 1236 AD", phone: "+356 2205 6611", email: "info@xiphiasimmigration.com" },
    ],
  },
  {
    region: "United Kingdom",
    offices: [
      { city: "Leicester", entity: "XIPHIAS IMMIGRATION PVT LTD (Represented by Partners)", address: "5 Upper King Street, Leicester, LE1 6XF", phone: "+44 (0) 781 392 9395", phone2: "+44 (0) 116 319 4884", email: "info@xiphiasimmigration.com" },
    ],
  },
  {
    region: "Canada",
    offices: [
      { city: "Waterloo, ON", entity: "XIPHIAS Investment Migration Inc.", address: "3-133 Weber Street North, Suite 514, Waterloo, ON N2J 3G9", phone: "(438) 379-9101", email: "info@xiphiasimmigration.com" },
      { city: "Montreal, QC", entity: "XIPHIAS Projects Inc.", address: "1200 McGill College Avenue, Suite 1100, Montreal QC H3B 4G7", phone: "+1-438-379-9101", email: "info@xiphiasimmigration.com" },
    ],
  },
  {
    region: "Australia",
    offices: [
      { city: "Melbourne", entity: "XIPHIAS Immigration", address: "SSCS-Suite 204, 227 Collins Street, Melbourne, VIC 3000", phone: "+61-0451239 239", email: "info@xiphiasimmigration.com" },
    ],
  },
  {
    region: "New Zealand",
    offices: [
      { city: "Auckland", entity: "XIPHIAS IMMIGRATION PVT LTD (Represented by Belinda Wang, LIA #200902240)", address: "26C Aviemore Drive, Highland Park, Auckland", phone: "+64 9 535 0227", email: "belinda@xiphias.in" },
    ],
  },
  {
    region: "USA",
    offices: [
      { city: "Los Angeles, CA", entity: "XIPHIAS IMMIGRATION PVT LTD (Represented by Partners)", address: "1605 North Cahuenga Blvd, Hollywood, CA 90028", phone: "+1 323 466 1400", email: "info@xiphiasimmigration.com" },
    ],
  },
  {
    region: "Qatar",
    offices: [
      { city: "Doha", entity: "ILC LLC (Represented by Partners)", address: "Doha, Qatar", phone: "+974 4476 0562", email: "info@xiphiasimmigration.com" },
    ],
  },
  {
    region: "Brazil",
    offices: [
      { city: "São Paulo", entity: "HOFF ADVOCACIA", address: "Tabapuã Street, No. 594, Room 46, Itaim Bibi, São Paulo Capital, SP – 04533-002", phone: "(11) 3787-0935", phone2: "(11) 98070-8842", email: "info@xiphiasimmigration.com" },
    ],
  },
];

function Offices({ serifClass }: { serifClass: string }) {
  const [activeRegion, setActiveRegion] = useState<string>("UAE");
  const filtered = ALL_REGIONS.filter((r) => r.region === activeRegion);

  return (
    <section data-tone="dark" className="relative isolate px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto max-w-6xl">

        {/* header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow ar="مكاتبنا">Where to find us</Eyebrow>
            <h2 className={`${serifClass} mt-4 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.0]`}>
              Global offices. <span className="italic" style={{ color: GOLD }}>One standard.</span>
            </h2>
          </div>
          <p className="max-w-xs text-[14px] leading-relaxed text-white/45 sm:text-right">
            14 offices across 10 countries — all by appointment, same senior-led standard worldwide.
          </p>
        </div>

        {/* country filter pills — no "All" button */}
        <div className="mt-8 flex flex-wrap gap-2 border-b pb-8" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          {ALL_REGIONS.map((r) => (
            <button
              key={r.region}
              onClick={() => setActiveRegion(r.region)}
              className="rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-all duration-200"
              style={{
                borderColor: activeRegion === r.region ? GOLD : "rgba(255,255,255,0.15)",
                background: activeRegion === r.region ? GOLD : "transparent",
                color: activeRegion === r.region ? NAVY : "rgba(255,255,255,0.5)",
              }}
            >
              {r.region}
            </button>
          ))}
        </div>

        {/* offices grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion ?? "all"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="mt-8 flex flex-col gap-8"
          >
            {filtered.map((group) => (
              <div key={group.region}>
                {!activeRegion && (
                  <div className="mb-4 flex items-center gap-4">
                    <span className={`${serifClass} text-[1.1rem] font-medium`} style={{ color: GOLD }}>{group.region}</span>
                    <span className="text-[11px] text-white/25">{group.offices.length} {group.offices.length === 1 ? "office" : "offices"}</span>
                    <div className="flex-1 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }} />
                  </div>
                )}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.offices.map((o) => (
                    <div
                      key={o.city}
                      className="group rounded-lg border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bfa15c55]"
                      style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.022)" }}
                    >
                      <p className={`${serifClass} text-[1.15rem] font-medium leading-snug transition-colors group-hover:text-[#bfa15c]`}>{o.city}</p>
                      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: `${GOLD}88` }}>{o.entity}</p>
                      <p className="mt-2.5 text-[12px] leading-relaxed text-white/45">{o.address}</p>
                      <div className="mt-3 flex flex-col gap-1 border-t pt-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                        <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-[12px] text-white/50 transition-colors hover:text-[#bfa15c]">
                          <span className="w-3 text-[9px] font-bold" style={{ color: GOLD }}>T</span>{o.phone}
                        </a>
                        {o.phone2 && (
                          <a href={`tel:${o.phone2.replace(/\s/g, "")}`} className="flex items-center gap-2 text-[12px] text-white/50 transition-colors hover:text-[#bfa15c]">
                            <span className="w-3 text-[9px] font-bold" style={{ color: GOLD }}>T</span>{o.phone2}
                          </a>
                        )}
                        <a href={`mailto:${o.email}`} className="flex items-center gap-2 text-[12px] text-white/50 transition-colors hover:text-[#bfa15c]">
                          <span className="w-3 text-[9px] font-bold" style={{ color: GOLD }}>E</span>{o.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/25">By appointment only · Worldwide</p>
          <p lang="ar" dir="rtl" className="font-arabic-display text-base" style={{ color: `${GOLD}44` }}>مكاتبنا حول العالم</p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   9 · GALLERY
══════════════════════════════════════════════════════════ */
function Gallery({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: PEARL }}>
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="من الداخل" light>Inside XIPHIAS</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}>
          <Rise text="Seventeen years, in person." />
        </h2>
        <p className="mt-3 text-[14px] text-[#0c1f3f]/50">Events and milestones from our Dubai office.</p>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {GALLERY.map((src, i) => (
            <Fade key={src} delay={(i % 3) * 0.07}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-md">
                <Image src={src} alt="" fill sizes="(min-width:1024px) 28rem, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0" style={{ background: "rgba(10,23,51,0.08)" }} />
                <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}22` }} />
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   10 · CTA
══════════════════════════════════════════════════════════ */
function CTA({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="dark" className="relative flex min-h-[65vh] items-center justify-center overflow-hidden px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Image src="/images/gallery/xiphias-immigration-gallery-05.jpeg" alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.55)_brightness(0.3)_contrast(1.05)]" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.95) 0%, rgba(8,18,42,0.65) 50%, rgba(8,18,42,0.92) 100%)" }} />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Eyebrow ar="ابدأ الآن">Let&apos;s talk</Eyebrow>
        <h2 className={`${serifClass} mt-6 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.0]`}>
          Let&apos;s discuss your <span className="italic" style={{ color: GOLD }}>global future.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">
          A private, no-obligation conversation with a senior advisor — wherever you are in the world. Entirely confidential. Always end-to-end.
        </p>
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
            Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a href="/teams" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">
            Meet our advisors
          </a>
        </div>
        <p className="mt-7 text-[12px] uppercase tracking-[0.18em] text-white/35">By appointment · Dubai · London · Bengaluru</p>
        <p lang="ar" dir="rtl" className="mt-3 font-arabic-display text-xl" style={{ color: `${GOLD}aa` }}>مستقبلك العالمي يبدأ من هنا</p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE ASSEMBLY
══════════════════════════════════════════════════════════ */
export default function AboutPage({ serifClass }: { serifClass: string }) {
  const [play, setPlay] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPlay(true), 120); return () => clearTimeout(t); }, []);

  return (
    <div className="relative">
      <Header serifClass={serifClass} />
      <Hero serifClass={serifClass} play={play} />
      <Story serifClass={serifClass} />
      <Numbers serifClass={serifClass} />
      <Timeline serifClass={serifClass} />
      <Values serifClass={serifClass} />
      <Awards serifClass={serifClass} />
      <Credentials serifClass={serifClass} />
      <Offices serifClass={serifClass} />
      <Gallery serifClass={serifClass} />
      <CTA serifClass={serifClass} />
      <Footer serifClass={serifClass} />
    </div>
  );
}
