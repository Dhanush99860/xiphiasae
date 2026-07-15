"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#bfa15c";
const INK = "#0c1f3f";

const FAQ = [
  { q: "How long does a residency or citizenship application take?", a: "Processing times vary by country, program, document readiness and government review. Residency applications may take a few weeks to several months, while citizenship by investment applications commonly take several months. XIPHIAS provides an estimated timeline after assessing your profile." },
  { q: "How much does citizenship by investment cost?", a: "The total cost depends on the country, investment route and number of family members included. Costs may include the qualifying investment, government fees, due-diligence charges and professional fees. XIPHIAS provides a personalized cost breakdown before you proceed." },
  { q: "Do Golden Visa programs have minimum-stay requirements?", a: "Some Golden Visa programs require applicants to spend a minimum number of days in the country, while others have limited or no physical-stay requirements for maintaining residency. The rules vary by program and may differ when applying for permanent residence or citizenship." },
  { q: "Can I include my spouse, children and parents?", a: "Many residency and citizenship programs allow the main applicant to include a spouse and dependent children. Some programs also permit dependent parents and other eligible family members. Age, financial dependency and relationship requirements vary by country." },
  { q: "Can I hold dual citizenship?", a: "Dual citizenship depends on the laws of your current country and the country granting citizenship. Some countries permit multiple citizenships, while others restrict or prohibit them. Applicants should obtain country-specific legal advice before proceeding." },
  { q: "What due-diligence checks are required?", a: "Applicants generally undergo identity, criminal-record, sanctions, source-of-funds and financial-background checks. Governments may also require police clearance certificates, bank statements, business records, interviews and supporting documents for all eligible family members." },
  { q: "How does XIPHIAS manage my immigration application?", a: "XIPHIAS assesses your eligibility, compares suitable programs and provides a clear cost and document plan. A dedicated advisor then coordinates due diligence, documentation, application submission, government communication and post-approval support." },
  { q: "How do I choose the right residency or citizenship program?", a: "The right program depends on your nationality, budget, family structure, preferred destination, timeline and long-term goals. XIPHIAS compares eligible options based on residence requirements, investment protection, family inclusion, mobility and future citizenship opportunities." },
];

export default function FaqSection({ serifClass }: { serifClass: string }) {
  const [open, setOpen] = useState(0);
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Questions<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">أسئلة شائعة</span></p>
          <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] font-medium leading-[1.05]`}>Immigration, Residency <span className="italic" style={{ color: GOLD }}>and Citizenship FAQs</span></h2>
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
