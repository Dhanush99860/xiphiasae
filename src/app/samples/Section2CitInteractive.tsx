"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">{children}</div>;
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
  return <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, delay }}>{children}</motion.div>;
}

const PROPS = [
  { no: "01", title: "A dedicated due-diligence desk", line: "Source-of-funds guidance, handled discreetly.", detail: "We map and pre-clear your source of funds before a single application is filed — quietly, and on your terms." },
  { no: "02", title: "Government-approved project vetting", line: "Only vetted routes and projects.", detail: "Every approved project is independently vetted, and we plan your exit before you ever enter." },
  { no: "03", title: "End-to-end execution", line: "Strategy to passports, one desk.", detail: "One named advisor owns the strategy, documents, submission, the oath, and the passports themselves." },
  { no: "04", title: "White-glove for families", line: "Confidential concierge for your family.", detail: "Spouse, children and dependent parents — included, confidential, and concierge-handled throughout." },
];

function InteractiveProps({ serifClass }: { serifClass: string }) {
  const [active, setActive] = useState(0);
  return (
    <section className="relative isolate px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <Badge>V1 · Interactive props (hover a row)</Badge>
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Why work with us<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">لماذا نحن</span></p>
          <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04]`}><Rise text="A private-client approach to" /><span className="italic" style={{ color: GOLD }}><Rise text="second citizenship." delay={0.25} /></span></h2>
          <Fade delay={0.3}><p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/70">Transparent costs, rigorous compliance, and execution without friction.</p></Fade>
          <Fade delay={0.4}><div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="#" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Speak to an advisor <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Download the checklist</a></div></Fade>
        </div>
        <Fade>
          <div>
            {PROPS.map((p, i) => {
              const on = i === active;
              return (
                <a key={p.no} href="#" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="group relative block border-t py-6 ps-5 transition-colors duration-300" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
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
                </a>
              );
            })}
          </div>
        </Fade>
      </div>
    </section>
  );
}

export default function Section2CitInteractive({ serifClass }: { serifClass: string }) {
  return <main><InteractiveProps serifClass={serifClass} /></main>;
}
