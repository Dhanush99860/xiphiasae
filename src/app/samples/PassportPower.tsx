"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">{children}</div>;
}

// Approximate visa-free scores & global ranks (Henley-style).
const CURRENT = [
  { name: "India", vf: 62, rank: 80 },
  { name: "China", vf: 85, rank: 60 },
  { name: "Nigeria", vf: 45, rank: 91 },
  { name: "Pakistan", vf: 32, rank: 96 },
  { name: "Bangladesh", vf: 40, rank: 93 },
  { name: "Egypt", vf: 51, rank: 87 },
  { name: "South Africa", vf: 106, rank: 53 },
  { name: "Russia", vf: 116, rank: 51 },
];
// Passports we can secure (citizenship), ranked by visa-free reach.
const TARGETS = [
  { flag: "Malta", name: "Malta", vf: 187, note: "EU citizenship" },
  { flag: "st-kitts-nevis", name: "St Kitts & Nevis", vf: 156, note: "Caribbean" },
  { flag: "Antigua-barbuda", name: "Antigua & Barbuda", vf: 151, note: "Caribbean" },
  { flag: "st-lucia", name: "Saint Lucia", vf: 146, note: "Caribbean" },
  { flag: "grenada", name: "Grenada", vf: 145, note: "E-2 to USA" },
  { flag: "Dominica", name: "Dominica", vf: 145, note: "Caribbean" },
  { flag: "turkey", name: "Türkiye", vf: 113, note: "E-2 to USA" },
];
const MAX = 199;
const TOP = TARGETS[0].vf;

export default function PassportPower({ serifClass }: { serifClass: string }) {
  const [i, setI] = useState(0);
  const cur = CURRENT[i];
  const uplift = TOP - cur.vf;
  return (
    <main>
      <section className="relative isolate px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: `radial-gradient(120% 90% at 85% 0%, #13284f 0%, ${NAVY} 60%)` }}>
        <Badge>Info section · Passport power (interactive)</Badge>
        <div className="mx-auto max-w-6xl">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Intelligence<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">مؤشر الجوازات</span></p>
          <h2 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.2rem,4.6vw,3.6rem)] font-medium leading-[1.04]`}>How far could your passport <span className="italic" style={{ color: GOLD }}>really</span> take you?</h2>

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            {/* interactive: current passport → uplift */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Your passport today</label>
              <div className="mt-3 inline-flex w-full max-w-sm items-center justify-between rounded-lg border px-4 py-3" style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.04)" }}>
                <select value={i} onChange={(e) => setI(Number(e.target.value))} className="w-full appearance-none bg-transparent text-[16px] font-medium text-[#eef3fb] outline-none [&>option]:text-[#0c1f3f]">
                  {CURRENT.map((c, idx) => <option key={c.name} value={idx}>{c.name}</option>)}
                </select>
                <span className="pointer-events-none text-[#bfa15c]">▾</span>
              </div>

              <div className="mt-8 flex items-end gap-8">
                <div>
                  <div className={`${serifClass} text-[clamp(3rem,7vw,5rem)] font-medium leading-none`}>{cur.vf}</div>
                  <div className="mt-1 text-[12px] uppercase tracking-[0.16em] text-white/50">destinations visa-free</div>
                  <div className="mt-1 text-[12px] text-white/40">Global rank #{cur.rank}</div>
                </div>
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-3 pb-6" style={{ color: GOLD }}>
                  <span className="text-3xl">→</span>
                  <div><div className={`${serifClass} text-[clamp(2rem,4vw,3rem)] font-medium leading-none`}>{TOP}</div><div className="mt-1 text-[11px] uppercase tracking-[0.14em]">with a second passport</div></div>
                </motion.div>
              </div>

              <motion.p key={`u${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-7 max-w-md rounded-lg border px-5 py-4 text-[15px] leading-relaxed text-white/80" style={{ borderColor: "rgba(191,161,92,0.3)", background: "rgba(191,161,92,0.06)" }}>
                That&apos;s <span style={{ color: GOLD }} className="font-semibold">+{uplift} destinations</span> visa-free — plus the right to live, bank, invest and educate your family across the world, wherever tomorrow takes them.
              </motion.p>
              <a href="#" className="group mt-7 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>Explore the full passport index <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>
            </div>

            {/* leaderboard */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Passports we secure — by visa-free reach</p>
              <div className="mt-5 flex flex-col gap-3.5">
                {TARGETS.map((t, idx) => (
                  <motion.div key={t.name} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: idx * 0.06 }} className="group">
                    <div className="flex items-center justify-between gap-3 text-[14px]">
                      <span className="flex items-center gap-3">
                        <span className="relative h-4 w-6 shrink-0 overflow-hidden rounded-sm ring-1 ring-white/15"><Image src={`/images/flags/${t.flag}.png`} alt="" fill sizes="24px" className="object-cover" /></span>
                        <span className={`${serifClass} text-[1.15rem] font-medium`}>{t.name}</span>
                        <span className="text-[11px] uppercase tracking-[0.12em] text-white/40">{t.note}</span>
                      </span>
                      <span className={`${serifClass} text-[1.15rem] font-medium`} style={{ color: GOLD }}>{t.vf}</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${(t.vf / MAX) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }} className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${GOLD}, #d8bd78)` }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
