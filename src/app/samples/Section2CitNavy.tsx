"use client";

import { motion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

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
  { no: "01", title: "A dedicated due-diligence desk", line: "Source-of-funds guidance, handled discreetly from the very first conversation." },
  { no: "02", title: "Government-approved project vetting", line: "Only vetted routes and projects — with exit planning built in from the start." },
  { no: "03", title: "End-to-end execution", line: "Strategy, documentation, submission, oath and passports — run by one desk." },
  { no: "04", title: "White-glove for families", line: "Confidential handling and concierge for you and everyone you bring." },
];

function SplitProps({ serifClass, dark }: { serifClass: string; dark?: boolean }) {
  const fg = dark ? "#eef3fb" : INK;
  const sub = dark ? "rgba(255,255,255,0.68)" : `${INK}a6`;
  const rule = dark ? "rgba(255,255,255,0.14)" : `${INK}1a`;
  return (
    <section className="relative isolate px-6 py-28 sm:px-12 lg:px-20" style={{ background: dark ? NAVY : "#f3f7fd", color: fg }}>
      <Ambient tone={dark ? "dark" : "light"} />
      <Badge>{dark ? "V1 · NAVY background" : "V1 · Light background"}</Badge>
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Why work with us<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">لماذا نحن</span></p>
          <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04]`}><Rise text="A private-client approach to" /><span className="italic" style={{ color: GOLD }}><Rise text="second citizenship." delay={0.25} /></span></h2>
          <Fade delay={0.3}><p className="mt-6 max-w-md text-[16px] leading-relaxed" style={{ color: sub }}>Transparent costs, rigorous compliance, and execution without friction.</p></Fade>
          <Fade delay={0.4}><div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="#" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Speak to an advisor <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href="#" className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors" style={{ borderColor: dark ? "rgba(255,255,255,0.25)" : `${INK}33`, color: fg }}>Download the checklist</a></div></Fade>
        </div>
        <div>
          {PROPS.map((p, i) => (
            <Fade key={p.no} delay={i * 0.1}>
              <div className="group border-t py-8" style={{ borderColor: rule }}>
                <div className="flex items-baseline gap-5">
                  <span className={`${serifClass} text-[2rem] font-medium`} style={{ color: i === 0 ? GOLD : (dark ? "rgba(255,255,255,0.3)" : `${INK}30`) }}>{p.no}</span>
                  <div><h3 className={`${serifClass} text-[1.7rem] font-medium transition-colors group-hover:text-[#bfa15c]`} style={{ color: fg }}>{p.title}</h3><p className="mt-2 max-w-md text-[15px] leading-relaxed" style={{ color: sub }}>{p.line}</p></div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Section2CitNavy({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <SplitProps serifClass={serifClass} dark />
      <SplitProps serifClass={serifClass} />
    </main>
  );
}
