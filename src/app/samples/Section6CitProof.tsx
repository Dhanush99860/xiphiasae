"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">{children}</div>;
}
const QUOTES = [
  { q: "XIPHIAS arranged our family's second citizenship in four months — discreetly, and without a single surprise.", who: "A family-office principal", where: "Dubai" },
  { q: "They mapped three routes, recommended one, and handled everything from the source-of-funds dossier to our passports.", who: "A private investor", where: "Mumbai" },
  { q: "The most professional advisory we have worked with. Every step in writing, every deadline met.", who: "A technology founder", where: "London" },
];
const CREDENTIALS = ["Licensed in the UAE", "Member · Investment Migration Council", "Recognised — Times of India 2022", "17 years", "10,000+ families"];

export default function Section6CitProof({ serifClass }: { serifClass: string }) {
  const [i, setI] = useState(0);
  const move = (d: number) => setI((p) => (p + d + QUOTES.length) % QUOTES.length);
  const t = QUOTES[i];
  return (
    <main>
      <section className="relative isolate flex min-h-screen items-center px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Ambient tone="dark" />
        <Badge>Section 6 · Proof (carousel)</Badge>
        <div className="mx-auto w-full max-w-5xl">
          <p className="flex items-center justify-center gap-3 text-center text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />In their words<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">بكلماتهم</span></p>

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

            {/* carousel controls */}
            <div className="mt-10 flex items-center justify-center gap-6">
              <button onClick={() => move(-1)} aria-label="Previous" className="flex h-10 w-10 items-center justify-center rounded-full border text-white/70 transition-colors hover:border-[#bfa15c] hover:text-[#bfa15c]" style={{ borderColor: "rgba(255,255,255,0.2)" }}>←</button>
              <div className="flex gap-2.5">{QUOTES.map((_, j) => <button key={j} onClick={() => setI(j)} aria-label={`Quote ${j + 1}`} className="h-2 rounded-full transition-all duration-300" style={{ width: j === i ? 28 : 8, background: j === i ? GOLD : "rgba(255,255,255,0.25)" }} />)}</div>
              <button onClick={() => move(1)} aria-label="Next" className="flex h-10 w-10 items-center justify-center rounded-full border text-white/70 transition-colors hover:border-[#bfa15c] hover:text-[#bfa15c]" style={{ borderColor: "rgba(255,255,255,0.2)" }}>→</button>
            </div>
          </div>

          {/* credential strip */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t pt-8 text-[12px] uppercase tracking-[0.16em] text-white/50" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            {CREDENTIALS.map((c, k) => (<span key={c} className="flex items-center gap-8">{c}{k < CREDENTIALS.length - 1 ? <span style={{ color: GOLD }}>·</span> : null}</span>))}
          </div>
        </div>
      </section>
    </main>
  );
}
