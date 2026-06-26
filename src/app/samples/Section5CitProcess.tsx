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
const STEPS = [
  { no: "01", title: "Private consultation", short: "Goals, budget, the right jurisdiction.", detail: "A confidential conversation to understand your objectives, timeline and budget — and to recommend the jurisdiction and route that fit you best.", handle: ["Jurisdiction & route strategy", "Indicative costs & timeline", "Under NDA from day one"] },
  { no: "02", title: "Due diligence & source of funds", short: "Pre-cleared before anything is filed.", detail: "We map and pre-clear your source of funds and run preliminary background checks, so there are no surprises once your file is submitted.", handle: ["Source-of-funds dossier", "Preliminary background check", "Full document checklist"] },
  { no: "03", title: "Application & submission", short: "Prepared and filed by your desk.", detail: "We assemble your full application and submit it to the government's CBI unit — managed end-to-end by your named advisor.", handle: ["Full application assembly", "Government submission", "Liaison & follow-through"] },
  { no: "04", title: "Approval & investment", short: "Make the qualifying investment.", detail: "On approval in principle, you make the qualifying donation or property investment, and we manage every final formality.", handle: ["Approval in principle", "Donation or real-estate investment", "Final compliance"] },
  { no: "05", title: "Oath & passports", short: "Citizenship — for the family.", detail: "Citizenship is granted and passports are issued for you and your family — and we remain on call for everything that comes after.", handle: ["Oath of allegiance", "Passports issued", "Lifetime concierge"] },
];

export default function Section5CitProcess({ serifClass }: { serifClass: string }) {
  const [active, setActive] = useState(0);
  const s = STEPS[active];
  const pct = (active / (STEPS.length - 1)) * 100;
  return (
    <main>
      <section className="relative isolate flex min-h-screen items-center px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Ambient tone="light" />
        <Badge>Section 5 · The process (hover a step)</Badge>
        <div className="mx-auto w-full max-w-6xl">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />How we do it<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">كيف نعمل</span></p>
          <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}><Rise text="Five steps. One desk." /></h2>

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            {/* interactive step list */}
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
            {/* active step detail */}
            <motion.div key={active} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="flex flex-col justify-center rounded-lg border p-9 lg:p-12" style={{ borderColor: `${INK}14`, background: "rgba(255,255,255,0.5)" }}>
              <span className={`${serifClass} text-[5rem] font-medium leading-none`} style={{ color: `${GOLD}` }}>{s.no}</span>
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
    </main>
  );
}
