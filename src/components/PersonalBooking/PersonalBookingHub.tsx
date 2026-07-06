"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK  = "#0c1f3f";

/* ── animation atoms ── */
function Rise({ text, delay = 0, play, className }: { text: string; delay?: number; play?: boolean; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }}
      initial="hidden"
      animate={play === undefined ? undefined : play ? "show" : "hidden"}
      whileInView={play === undefined ? "show" : undefined}
      viewport={play === undefined ? { once: true, amount: 0.4 } : undefined}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}
    >
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
    <motion.div className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={play === undefined ? undefined : play ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={play === undefined ? { opacity: 1, y: 0 } : undefined}
      viewport={play === undefined ? { once: true, amount: 0.3 } : undefined}
      transition={{ duration: 0.65, delay }}
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

/* ── 1. HERO ── */
function Hero({ serifClass, play }: { serifClass: string; play: boolean }) {
  const CHIPS = ["IMC Fellow-led", "NDA on request", "60-minute session", "Fee credited on engagement"];
  const STATS = [{ v: "17+", u: "years advising" }, { v: "10,000+", u: "families helped" }, { v: "98%", u: "approval rate" }, { v: "35", u: "countries" }];
  return (
    <section data-tone="dark" className="relative flex min-h-screen items-center overflow-hidden text-[#eef3fb]" style={{ background: NAVY }}>
      <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={play ? { scale: 1 } : { scale: 1.12 }} transition={{ duration: 8, ease: "easeOut" }}>
        <Image src="/images/home/dubai-global-mobility.webp" alt="" fill sizes="100vw" priority className="object-cover [filter:grayscale(0.4)_brightness(0.55)_contrast(1.05)]" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.94) 0%, rgba(8,18,42,0.6) 55%, rgba(8,18,42,0.3) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.82) 0%, transparent 45%)" }} />
      <div className="lcp-instant relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-20">
        <Fade play={play}><p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}><a href="/" className="transition-colors hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> Personal Booking</p></Fade>
        <Fade play={play} delay={0.1}><div className="mt-8"><Eyebrow ar="حجز خاص">Private Consultation</Eyebrow></div></Fade>
        <h1 className="mt-6 max-w-3xl">
          <span className={`${serifClass} block text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.98]`}>
            <Rise text="A private, expert-led" play={play} delay={0.2} className="block" />
            <span className="block italic" style={{ color: GOLD }}><Rise text="strategy call." play={play} delay={0.5} /></span>
          </span>
        </h1>
        <Fade play={play} delay={0.9}><p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">Reserve 60 minutes with a licensed advisor — IMC Fellow-certified, under NDA on request. Your goals, your jurisdiction, your plan.</p></Fade>
        <Fade play={play} delay={1.05}>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href="/booking" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Reserve your session <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>
            <a href="#how-it-works" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">See how it works</a>
          </div>
        </Fade>
        <motion.div className="mt-9 flex flex-wrap gap-2.5" initial="hidden" animate={play ? "show" : "hidden"} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } } }}>
          {CHIPS.map((x) => <motion.span key={x} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="rounded-full border px-3 py-1.5 text-[12px] text-white/70" style={{ borderColor: "rgba(191,161,92,0.4)" }}>{x}</motion.span>)}
        </motion.div>
        <Fade play={play} delay={1.3}>
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t pt-7" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            {STATS.map((x) => (
              <div key={x.u} className="flex flex-col">
                <span className="text-[clamp(1.3rem,2vw,1.8rem)] font-semibold tabular-nums" style={{ color: GOLD }}>{x.v}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">{x.u}</span>
              </div>
            ))}
          </div>
        </Fade>
      </div>
      <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-white/55">
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
        <span className="block h-9 w-px" style={{ background: `linear-gradient(${GOLD},transparent)` }} />
      </div>
    </section>
  );
}

/* ── 2. MEET YOUR ADVISOR ── */
function Expert({ serifClass }: { serifClass: string }) {
  const CREDS = [
    { label: "IMC Fellow", sub: "Investment Migration Council", href: "https://investmentmigration.org/", logo: "/images/personal/credentials/imc-fellow-logo.svg" },
    { label: "IMI Professional", sub: "imi-online.net", href: "https://www.imi-online.net/", logo: "/images/personal/credentials/imi-professionals-logo.png" },
  ];
  const FACTS = [
    { v: "17+", u: "Years advising" },
    { v: "35", u: "Countries" },
    { v: "UAE", u: "Licensed" },
    { v: "10k+", u: "Families" },
  ];
  return (
    <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="مستشارك">Meet your advisor</Eyebrow>
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
          <Fade>
            <figure className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: `${INK}14` }}>
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image src="/images/avtar/varun-singh-md-xiphias.jpg" alt="Varun Singh, Managing Director of XIPHIAS Immigration" fill sizes="300px" className="object-cover object-top" />
                <span aria-hidden className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}40` }} />
              </div>
              <figcaption className="px-5 py-4">
                <p className="text-[14px] font-semibold">Varun Singh</p>
                <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: GOLD }}>Managing Director, XIPHIAS</p>
              </figcaption>
            </figure>
          </Fade>
          <div className="flex flex-col gap-7">
            <Fade>
              <h2 className={`${serifClass} text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.04]`}>You&apos;re speaking to the expert, <span className="italic" style={{ color: GOLD }}>not a junior.</span></h2>
            </Fade>
            <Fade delay={0.08}>
              <p className="max-w-xl text-[16px] leading-relaxed text-[#0c1f3f]/70">Varun Singh, Cert IMC, has spent 17 years advising investors, entrepreneurs and families on citizenship, residency and global mobility. Every consultation is led by him — not passed to a junior.</p>
            </Fade>
            <Fade delay={0.14}>
              <div className="flex flex-wrap gap-px overflow-hidden rounded-lg" style={{ background: `${INK}12` }}>
                {FACTS.map((f) => (
                  <div key={f.u} className="flex flex-1 flex-col items-center bg-[#f3f7fd] px-4 py-5 text-center">
                    <span className={`${serifClass} text-[clamp(1.4rem,2vw,1.9rem)] font-semibold leading-none`} style={{ color: GOLD }}>{f.v}</span>
                    <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0c1f3f]/45">{f.u}</span>
                  </div>
                ))}
              </div>
            </Fade>
            <Fade delay={0.18}>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/40">Credentials</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-7 gap-y-3">
                  {CREDS.map((c) => (
                    <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 transition-opacity hover:opacity-80">
                      <span className="relative h-9 w-9 shrink-0"><Image src={c.logo} alt="" fill sizes="36px" className="object-contain" /></span>
                      <span className="text-[12px] font-medium leading-snug text-[#0c1f3f]/70 underline-offset-2 group-hover:underline">{c.label}</span>
                    </a>
                  ))}
                  {["Licensed in the UAE", "ICCRC-trained (Canada)", "Source-of-funds & KYC"].map((t) => (
                    <span key={t} className="rounded-full border px-3 py-1 text-[11px] font-medium text-[#0c1f3f]/60" style={{ borderColor: `${INK}20` }}>{t}</span>
                  ))}
                </div>
              </div>
            </Fade>
            <Fade delay={0.22}>
              <blockquote className={`${serifClass} border-l-2 pl-5 text-[1.35rem] italic leading-relaxed text-[#0c1f3f]/75`} style={{ borderColor: GOLD }}>
                &ldquo;We don&apos;t sell programmes. We build a family&apos;s plan B — and I stand behind every case, personally.&rdquo;
              </blockquote>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. WHY BOOK ── */
const WHY_PROPS = [
  { no: "01", title: "You speak to the specialist", line: "Every call is led by Varun Singh, Cert IMC — not a junior.", detail: "We don't route strategy calls through account managers. You get 60 minutes with the same person who has advised 10,000+ families across 35 countries." },
  { no: "02", title: "A bespoke strategy — not a brochure", line: "We tailor the session to your specific goals, timeline and family.", detail: "Whether you're a first-time investor or evaluating your third residency, the session is prepared around your profile — not a standard script." },
  { no: "03", title: "Complete discretion, NDA on request", line: "Your information is never shared, profiled or stored beyond the engagement.", detail: "We operate under client confidentiality as standard. Where required, we sign an NDA before the call." },
  { no: "04", title: "The fee is credited on engagement", line: "The consultation cost applies against your full engagement.", detail: "If you proceed with XIPHIAS after the call, the strategy-call fee is deducted from the advisory fee — you pay once, not twice." },
];
function WhyBook({ serifClass }: { serifClass: string }) {
  const [active, setActive] = useState(0);
  return (
    <section data-tone="dark" className="relative isolate px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <Eyebrow ar="لماذا تحجز">Why book a call</Eyebrow>
          <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04]`}>
            <Rise text="Sixty minutes that" />
            <span className="block italic" style={{ color: GOLD }}><Rise text="change the plan." delay={0.2} /></span>
          </h2>
          <Fade delay={0.3}><p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/65">One focused session clarifies the programme, the jurisdiction and the timeline — everything you need before committing a single dirham.</p></Fade>
          <Fade delay={0.4}>
            <a href="/booking" className="group mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Reserve your session <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>
          </Fade>
        </div>
        <Fade>
          <div>
            {WHY_PROPS.map((p, i) => {
              const on = i === active;
              return (
                <button key={p.no} type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="group relative block w-full border-t py-6 ps-5 text-left transition-colors duration-300" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
                  <span aria-hidden className="absolute left-0 top-6 bottom-6 w-0.5 origin-top transition-transform duration-300" style={{ background: GOLD, transform: on ? "scaleY(1)" : "scaleY(0)" }} />
                  <div className="flex items-baseline gap-5">
                    <span className={`${serifClass} text-[2rem] font-medium transition-all duration-300`} style={{ color: on ? GOLD : "rgba(255,255,255,0.25)" }}>{p.no}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className={`${serifClass} text-[1.6rem] font-medium leading-tight transition-colors duration-300`} style={{ color: on ? GOLD : "#eef3fb" }}>{p.title}</h3>
                        <span className="text-lg transition-all duration-300" style={{ color: GOLD, opacity: on ? 1 : 0 }}>→</span>
                      </div>
                      <p className="mt-1 text-[14px] text-white/50">{p.line}</p>
                      <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: on ? "6rem" : "0", opacity: on ? 1 : 0 }}>
                        <p className="mt-3 max-w-md text-[14px] italic leading-relaxed text-white/70">{p.detail}</p>
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

/* ── 4. HOW IT WORKS ── */
const STEPS = [
  { no: "01", title: "Reserve & pay", detail: "Choose a time that suits you and pay the strategy-call fee online. You'll receive a confirmation immediately.", handle: ["Online booking", "Instant confirmation", "Secure payment"] },
  { no: "02", title: "We prepare your brief", detail: "We review your profile and goals before the call so we arrive informed — not reading from a generic script.", handle: ["Profile review", "Tailored agenda", "NDA signed if required"] },
  { no: "03", title: "Your 60-minute session", detail: "A focused, private conversation covering your programme options, jurisdiction fit, investment and timeline.", handle: ["Programme options", "Jurisdiction comparison", "Timeline & cost clarity"] },
  { no: "04", title: "Written strategy note", detail: "After the call you receive a short written summary of the strategy discussed — yours to keep.", handle: ["Summary note sent", "Next steps outlined", "Fee credited on engagement"] },
];
function HowItWorks({ serifClass }: { serifClass: string }) {
  const [active, setActive] = useState(0);
  const s = STEPS[active];
  const pct = (active / (STEPS.length - 1)) * 100;
  return (
    <section id="how-it-works" data-tone="light" className="relative isolate flex min-h-screen items-center scroll-mt-20 px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto w-full max-w-6xl">
        <Eyebrow ar="كيف يعمل">How it works</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}><Rise text="Four steps. One clear plan." /></h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative ps-8">
            <div className="absolute left-1 top-2 bottom-2 w-px" style={{ background: `${INK}1a` }}>
              <div className="w-full origin-top transition-[height] duration-500" style={{ height: `${pct}%`, background: GOLD }} />
            </div>
            <ul className="flex flex-col">
              {STEPS.map((st, i) => {
                const on = i === active;
                return (
                  <li key={st.no}>
                    <button onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="group relative block w-full py-4 text-left">
                      <span className="absolute -left-[2.05rem] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full transition-all duration-300" style={{ background: i <= active ? GOLD : "#f3f7fd", boxShadow: "0 0 0 4px #f3f7fd", outline: `1px solid ${GOLD}` }} />
                      <span className="flex items-baseline gap-3">
                        <span className={`${serifClass} text-[1.2rem] font-medium`} style={{ color: on ? GOLD : `${INK}40` }}>{st.no}</span>
                        <span className={`${serifClass} text-[clamp(1.2rem,2.2vw,1.7rem)] font-medium transition-colors duration-300`} style={{ color: on ? INK : `${INK}66` }}>{st.title}</span>
                      </span>
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
              <ul className="mt-4 flex flex-col gap-3">
                {s.handle.map((h) => <li key={h} className="flex items-center gap-3 text-[14px] text-[#0c1f3f]/80"><span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />{h}</li>)}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── 5. WHAT'S COVERED ── */
const TOPICS = [
  { tag: "Residency", title: "Golden visas & investor residence", line: "UAE Golden Visa, Portugal, Greece, Malta, Cyprus — matched to your tax and travel profile." },
  { tag: "Citizenship", title: "Citizenship by investment", line: "Grenada, Malta, St Kitts, Dominica — second passport routes assessed against your needs." },
  { tag: "Skilled", title: "Skilled & points-based migration", line: "Canada Express Entry, Australia, UK — profile scored and route recommended." },
  { tag: "Corporate", title: "Corporate & workforce mobility", line: "Entity setup, intra-company transfers, team relocation — across seven jurisdictions." },
];
function WhatsCovered({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="dark" className="relative isolate px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="ما يشمله">What we cover</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] font-medium`}><Rise text="Any immigration goal." /> <span className="italic" style={{ color: GOLD }}><Rise text="One call." delay={0.2} /></span></h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {TOPICS.map((t, i) => (
            <Fade key={t.title} delay={i * 0.07}>
              <div className="rounded-lg border p-7 transition-colors" style={{ borderColor: "rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.03)" }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{t.tag}</p>
                <h3 className={`${serifClass} mt-2 text-[1.5rem] font-medium`}>{t.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/60">{t.line}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 6. TESTIMONIALS ── */
const QUOTES = [
  { q: "The call gave us everything we needed to decide. We had three options clearly compared, costs mapped, and a timeline. We engaged XIPHIAS the next day.", who: "A family principal", where: "Dubai" },
  { q: "I'd spoken to two other firms before. Varun's session was different — specific, honest, and genuinely tailored to our situation.", who: "A business owner", where: "Mumbai" },
  { q: "It wasn't a sales call. It was a strategy session. That's rare — and that's why we chose XIPHIAS.", who: "A senior executive", where: "Singapore" },
];
function Testimonials({ serifClass }: { serifClass: string }) {
  const [i, setI] = useState(0);
  const move = (d: number) => setI((p) => (p + d + QUOTES.length) % QUOTES.length);
  const t = QUOTES[i];
  return (
    <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-5xl text-center">
        <Eyebrow ar="تجاربهم" center>What clients say</Eyebrow>
        <span className="mt-8 block font-serif text-[5rem] leading-[0.4]" style={{ color: GOLD }}>"</span>
        <div className="relative mt-6 min-h-[9rem]">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.45 }}>
              <p className={`${serifClass} mx-auto max-w-3xl text-[clamp(1.5rem,3.2vw,2.4rem)] font-medium italic leading-[1.25] text-[#0c1f3f]`}>{t.q}</p>
              <p className="mt-6 text-[12px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>{t.who} <span className="text-[#0c1f3f]/40">· {t.where}</span></p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-9 flex items-center justify-center gap-5">
          <button onClick={() => move(-1)} aria-label="Previous" className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-[#bfa15c]" style={{ borderColor: `${INK}25` }}>←</button>
          <div className="flex gap-2">{QUOTES.map((_, j) => <button key={j} onClick={() => setI(j)} aria-label={`Quote ${j + 1}`} className="h-2 rounded-full transition-all duration-300" style={{ width: j === i ? 28 : 8, background: j === i ? GOLD : `${INK}25` }} />)}</div>
          <button onClick={() => move(1)} aria-label="Next" className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-[#bfa15c]" style={{ borderColor: `${INK}25` }}>→</button>
        </div>
      </div>
    </section>
  );
}

/* ── 7. CTA ── */
function CTA({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <section ref={ref} data-tone="dark" className="relative flex min-h-[80vh] items-center overflow-hidden px-6 py-28 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image src="/images/residency/uae/uae-golden-visa.webp" alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.4)_brightness(0.4)_contrast(1.05)]" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.6) 50%, rgba(8,18,42,0.88) 100%)" }} />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Eyebrow ar="احجز الآن" center>Reserve your session</Eyebrow>
        <h2 className={`${serifClass} mt-6 text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.0]`}>
          One call.<span className="block italic" style={{ color: GOLD }}>A clear path forward.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/70">
          60 minutes with a licensed expert. Your jurisdiction, your investment route, your timeline — mapped privately.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3">
          <a href="/booking" className="group inline-flex items-center gap-2 rounded-full px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
            Book a paid consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Paid strategy call · 60 mins · Fee credited on engagement</p>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-white/45">
          {["Confidential", "NDA on request", "By appointment", "Dubai · London · Bengaluru"].map((c, k, arr) => (
            <span key={c} className="flex items-center gap-7">{c}{k < arr.length - 1 && <span style={{ color: GOLD }}>·</span>}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CURTAIN ── */
function Curtain({ serifClass, onDone }: { serifClass: string; onDone: () => void }) {
  const [wipe, setWipe] = useState(false);
  return (
    <motion.div className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden" style={{ background: NAVY, transformOrigin: "right" }} animate={{ scaleX: wipe ? 0 : 1 }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} onAnimationComplete={() => { if (wipe) onDone(); }}>
      <motion.span className={`${serifClass} text-[clamp(1.4rem,3vw,2.4rem)] font-medium italic`} style={{ color: GOLD }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} onAnimationComplete={() => setTimeout(() => setWipe(true), 450)}>Private Consultation</motion.span>
      <span className="absolute bottom-0 left-0 h-0.5 w-full" style={{ background: GOLD }} />
    </motion.div>
  );
}

/* ── ASSEMBLED HUB ── */
export default function PersonalBookingHub({ serifClass }: { serifClass: string }) {
  const [entered, setEntered] = useState(false);
  const [play,    setPlay]    = useState(false);
  return (
    <div className="relative">
      <Header serifClass={serifClass} />
      <Hero          serifClass={serifClass} play={play} />
      <Expert        serifClass={serifClass} />
      <WhyBook       serifClass={serifClass} />
      <HowItWorks    serifClass={serifClass} />
      <WhatsCovered  serifClass={serifClass} />
      <Testimonials  serifClass={serifClass} />
      <CTA           serifClass={serifClass} />
      <Footer        serifClass={serifClass} />
      <AnimatePresence>{!entered && <Curtain serifClass={serifClass} onDone={() => { setEntered(true); setPlay(true); }} />}</AnimatePresence>
    </div>
  );
}
