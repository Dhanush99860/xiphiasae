"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
function Fade({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay }}>{children}</motion.div>;
}

const OVERVIEW =
  "Grenada’s Citizenship by Investment programme offers two routes — a non-refundable contribution to the National Transformation Fund, or an investment in a government-approved real-estate project. Applications undergo enhanced due diligence and a brief virtual interview, preserving the integrity and the visa-free strength of the passport.";
const KEY_POINTS = [
  { t: "Family-friendly", d: "Inclusive benefits for spouse, children, parents and siblings — at a competitive total cost." },
  { t: "Well-regulated", d: "A transparent, established Caribbean programme with two clear investment routes." },
  { t: "U.S. E-2 eligible", d: "Grenada’s treaty with the United States opens a route to the E-2 investor visa." },
];
const FACTS = [
  { l: "Capital", v: "St. George’s" },
  { l: "Population", v: "112,523" },
  { l: "Language", v: "English" },
  { l: "Currency", v: "East. Caribbean $ (XCD)" },
  { l: "Time zone", v: "UTC−4" },
  { l: "Climate", v: "Tropical maritime" },
];

export default function Section2CountryAbout({ serifClass }: { serifClass: string }) {
  const [hov, setHov] = useState(-1);
  return (
    <main>
      <section className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Ambient tone="light" />
        <Badge>Country · §2 About + facts</Badge>
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* left — about + key points */}
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />About Grenada<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">نبذة</span></p>
            <h2 className={`${serifClass} mt-5 max-w-xl text-[clamp(2.2rem,4.4vw,3.4rem)] font-medium leading-[1.05]`}><Rise text="A well-regulated Caribbean programme." /></h2>
            <Fade delay={0.15}><p className="mt-6 max-w-xl text-[16px] leading-relaxed text-[#0c1f3f]/70">{OVERVIEW}</p></Fade>
            <div className="mt-9 flex flex-col">
              {KEY_POINTS.map((k, i) => {
                const on = hov === i;
                return (
                  <div key={k.t} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)} className="group relative border-t py-5 ps-5 transition-colors duration-300" style={{ borderColor: `${INK}18` }}>
                    <span aria-hidden className="absolute left-0 top-5 bottom-5 w-0.5 origin-top transition-transform duration-300" style={{ background: GOLD, transform: on ? "scaleY(1)" : "scaleY(0)" }} />
                    <div className="flex items-baseline gap-3">
                      <span className="text-[15px]" style={{ color: GOLD }}>✦</span>
                      <div>
                        <h3 className={`${serifClass} text-[1.45rem] font-medium leading-tight transition-colors duration-300`} style={{ color: on ? GOLD : INK }}>{k.t}</h3>
                        <p className="mt-1 max-w-md text-[14px] leading-relaxed text-[#0c1f3f]/65">{k.d}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* right — facts panel */}
          <Fade delay={0.2}>
            <div className="rounded-lg border p-7 lg:p-8" style={{ borderColor: `${INK}16`, background: "rgba(255,255,255,0.55)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">Grenada at a glance</p>
              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-md" style={{ background: `${INK}12` }}>
                {FACTS.map((f) => (
                  <div key={f.l} className="group relative bg-[#f3f7fd] p-5 transition-colors duration-300 hover:bg-white">
                    <span aria-hidden className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100" style={{ background: GOLD }} />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0c1f3f]/45">{f.l}</p>
                    <p className={`${serifClass} mt-1.5 text-[1.25rem] font-medium leading-tight transition-colors duration-300 group-hover:text-[#bfa15c]`}>{f.v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t pt-5" style={{ borderColor: `${INK}14` }}>
                <span className="text-[12px] uppercase tracking-[0.14em] text-[#0c1f3f]/50">Official brochure</span>
                <a href="#" className="group inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>Download PDF <span className="transition-transform duration-300 group-hover:translate-x-1">↓</span></a>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </main>
  );
}
