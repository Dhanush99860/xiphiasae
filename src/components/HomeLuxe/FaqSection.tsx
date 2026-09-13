"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#bfa15c";
const INK = "#0c1f3f";

const FAQ = [
  { q: "How long does an application take?", a: "Processing may take several weeks or months depending on the program and government review." },
  { q: "How much does citizenship by investment cost?", a: "Costs depend on the country, investment route and number of family members included." },
  { q: "Do Golden Visas require a minimum stay?", a: "Minimum-stay requirements vary by country and Golden Visa program." },
  { q: "Can my family be included?", a: "Many programs allow eligible spouses, children and dependent parents." },
  { q: "Can I hold dual citizenship?", a: "Dual citizenship depends on the nationality laws of both countries." },
  { q: "What checks are required?", a: "Applicants generally undergo identity, criminal-record, financial and source-of-funds checks." },
];

export default function FaqSection({ serifClass }: { serifClass: string }) {
  const [open, setOpen] = useState(0);
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Questions<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">أسئلة شائعة</span></p>
          <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] font-medium leading-[1.05]`}>Frequently Asked <span className="italic" style={{ color: GOLD }}>Questions</span></h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#0c1f3f]/60">Get clear answers from the best immigration consultants about UAE visa eligibility, Golden Visa costs, processing times, family inclusion and due diligence.</p>
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
