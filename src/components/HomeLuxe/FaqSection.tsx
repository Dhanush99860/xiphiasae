"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#bfa15c";
const INK = "#0c1f3f";

const FAQ = [
  { q: "How long does the process take?", a: "It depends on the route. Caribbean citizenship typically completes in 3–6 months; European residence in 2–9 months; the fastest donation routes in as little as six weeks. We give you a realistic, written timeline at the outset." },
  { q: "How much does it cost?", a: "Qualifying investment starts from around USD 90,000 for the most accessible donation routes and ranges to EUR 500,000+ for European golden visas — plus government, due-diligence and professional fees, every one of which we set out in writing before you commit." },
  { q: "Do I have to live there?", a: "For most citizenship-by-investment programmes, no — there is no physical residence requirement and no need to visit to maintain your status. Golden visas carry light stay requirements; we tell you exactly what applies to you." },
  { q: "Can I include my family?", a: "Yes. A single application can include your spouse and dependent children, and in many programmes your parents, grandparents and siblings. Citizenship also passes to children born afterwards." },
  { q: "Will I lose my current citizenship?", a: "Most countries we advise on permit dual citizenship, so you keep your existing passport. We confirm the position for your specific nationality before any application is filed." },
  { q: "Is my investment safe?", a: "Donations are non-refundable contributions to a national development fund. Real-estate options are tangible, government-approved assets that can usually be resold after a defined holding period — so your capital stays invested rather than spent." },
  { q: "What due diligence is involved?", a: "Every applicant undergoes source-of-funds verification and independent background checks. We pre-clear your file before submission, so there are no surprises once it reaches the government unit." },
  { q: "Why use an advisor rather than apply directly?", a: "Programmes and rules change constantly, and a single error can cost months. One accountable desk manages strategy, documents, compliance and government liaison — discreetly, end to end — so nothing is left to chance." },
];

export default function FaqSection({ serifClass }: { serifClass: string }) {
  const [open, setOpen] = useState(0);
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Questions<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">أسئلة شائعة</span></p>
          <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] font-medium leading-[1.05]`}>Answered, <span className="italic" style={{ color: GOLD }}>plainly.</span></h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#0c1f3f]/60">The questions every family asks before they begin. If yours isn&apos;t here, a senior advisor will answer it in your consultation.</p>
          <a href="/contact" className="group mt-6 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>Ask an advisor <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>
        </div>
        <div>
          {FAQ.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className="border-b" style={{ borderColor: `${INK}16` }}>
                <button onClick={() => setOpen(on ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                  <span className={`${serifClass} text-[1.3rem] font-medium leading-snug transition-colors ${on ? "text-[#bfa15c]" : ""}`}>{f.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[15px] transition-all duration-300" style={{ borderColor: on ? GOLD : `${INK}33`, color: on ? GOLD : INK, transform: on ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {on ? (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <p className="pb-6 pr-10 text-[15px] leading-relaxed text-[#0c1f3f]/70">{f.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
