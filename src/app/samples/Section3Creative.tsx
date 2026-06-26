"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

const GOLD = "#bfa15c";
const INK = "#14110c";

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-black/15 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 backdrop-blur">{children}</div>;
}
function Eyebrow() {
  return <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />What we secure<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">خدماتنا</span></p>;
}
const DUO = "object-cover [filter:grayscale(0.6)_sepia(0.3)_contrast(1.04)_brightness(0.95)]";

const PROGS = [
  { no: "01", name: "Golden Visa", line: "Long-term residency by investment — keep your life, gain the freedom to move.", img: "/images/residency/uae/uae-golden-visa.webp", facts: [["From", "$200k"], ["Timeline", "2–8 months"], ["Renewable", "10 years"]], dests: ["UAE", "Portugal", "Greece", "Malta"] },
  { no: "02", name: "Citizenship by Investment", line: "A second passport in months — visa-free access to 140+ countries, for life.", img: "/images/citizenship/grenada/grenada-citizenship.webp", facts: [["From", "$235k"], ["Timeline", "4–6 months"], ["Visa-free", "140+"]], dests: ["Grenada", "Malta", "Türkiye", "Caribbean"] },
  { no: "03", name: "Residency & Relocation", line: "Skilled, corporate and family routes to permanent residency.", img: "/images/residency/singapore/singapore-gip-pr-investment-hero.webp", facts: [["Routes", "PR · Skilled"], ["Timeline", "12–24 mo"], ["Family", "Included"]], dests: ["Singapore", "Canada", "Australia", "UK"] },
];

/* ── A · Programme explorer (tabs → transitioning detail panel) ───────── */
function ExplorerTabs({ serifClass }: { serifClass: string }) {
  const [a, setA] = useState(0);
  const p = PROGS[a];
  return (
    <section className="relative px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f6f1e8" }}>
      <Badge>A · Programme explorer (tabs)</Badge>
      <div className="mx-auto max-w-6xl">
        <Eyebrow />
        <h2 className={`${serifClass} mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}>What we secure.</h2>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-b" style={{ borderColor: `${INK}1a` }}>
          {PROGS.map((pr, i) => (
            <button key={pr.name} onMouseEnter={() => setA(i)} onFocus={() => setA(i)} className="relative -mb-px pb-4 pt-1 text-left">
              <span className={`${serifClass} text-[clamp(1.3rem,2.4vw,1.9rem)] font-medium transition-colors duration-300`} style={{ color: i === a ? INK : `${INK}55` }}>{pr.name}</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left transition-transform duration-300" style={{ background: GOLD, transform: i === a ? "scaleX(1)" : "scaleX(0)" }} />
            </button>
          ))}
        </div>
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-md">
            <div className="absolute inset-0 z-10" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}40` }} />
            {PROGS.map((pr, i) => (
              <div key={pr.name} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === a ? 1 : 0 }}>
                <div className="absolute inset-0" style={{ transform: i === a ? "scale(1)" : "scale(1.05)", transition: "transform 1.1s ease" }}><Image src={pr.img} alt="" fill sizes="50vw" className={DUO} /></div>
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,10,14,0.35), transparent 50%)" }} />
              </div>
            ))}
          </div>
          <motion.div key={a} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-[12px] font-semibold tracking-[0.2em]" style={{ color: GOLD }}>{p.no}</span>
            <h3 className={`${serifClass} mt-2 text-[clamp(2rem,3.4vw,2.8rem)] font-medium leading-tight`}>{p.name}</h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#14110c]/65">{p.line}</p>
            <div className="mt-7 grid grid-cols-3 gap-4 border-y py-5" style={{ borderColor: `${INK}14` }}>
              {p.facts.map(([k, v]) => (<div key={k}><div className={`${serifClass} text-[1.5rem] font-medium`} style={{ color: GOLD }}>{v}</div><div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#14110c]/45">{k}</div></div>))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">{p.dests.map((d) => <span key={d} className="rounded-full border px-3 py-1.5 text-[12px] text-[#14110c]/70" style={{ borderColor: `${INK}22` }}>{d}</span>)}</div>
            <a href="#" className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#0b0e13]" style={{ background: GOLD }}>Explore {p.name} →</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── B · Editorial index + cursor-following media preview ─────────────── */
function IndexPreview({ serifClass }: { serifClass: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const mx = useMotionValue(-9999), my = useMotionValue(-9999);
  const sx = useSpring(mx, { stiffness: 150, damping: 22 }), sy = useSpring(my, { stiffness: 150, damping: 22 });
  return (
    <section className="relative px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f6f1e8" }} onPointerMove={(e) => { mx.set(e.clientX); my.set(e.clientY); }}>
      <Badge>B · Editorial index + cursor preview</Badge>
      <div className="mx-auto max-w-5xl">
        <Eyebrow />
        <h2 className={`${serifClass} mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}>What we secure.</h2>
        <ul className="mt-12">
          {PROGS.map((p, i) => (
            <li key={p.name} className="border-t" style={{ borderColor: `${INK}1a` }}>
              <a href="#" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover((h) => (h === i ? null : h))} className="group flex items-center gap-6 py-8 transition-opacity duration-300" style={{ opacity: hover === null || hover === i ? 1 : 0.4 }}>
                <span className="text-[12px] font-semibold" style={{ color: GOLD }}>{p.no}</span>
                <div className="min-w-0 flex-1">
                  <h3 className={`${serifClass} text-[clamp(1.9rem,4.4vw,3.2rem)] font-medium leading-none transition-colors duration-300`} style={{ color: hover === i ? GOLD : INK }}>{p.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[12px] uppercase tracking-[0.12em] text-[#14110c]/55 transition-all duration-300" style={{ maxHeight: hover === i ? "2rem" : "0", opacity: hover === i ? 1 : 0 }}>{p.facts.map(([k, v]) => <span key={k}>{k} · <span className="text-[#14110c]">{v}</span></span>)}</div>
                </div>
                <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1" style={{ color: GOLD }}>→</span>
              </a>
            </li>
          ))}
          <li className="border-t" style={{ borderColor: `${INK}1a` }} />
        </ul>
      </div>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block" style={{ x: sx, y: sy, marginLeft: 28, marginTop: -110, opacity: hover !== null ? 1 : 0 }} transition={{ opacity: { duration: 0.2 } }}>
        {hover !== null ? <div className="h-52 w-72 overflow-hidden rounded-lg ring-1 ring-black/10 shadow-[0_30px_70px_-25px_rgba(20,17,12,0.5)]"><Image src={PROGS[hover].img} alt="" width={288} height={208} className="h-full w-full object-cover" /></div> : null}
      </motion.div>
    </section>
  );
}

export default function Section3Creative({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <ExplorerTabs serifClass={serifClass} />
      <IndexPreview serifClass={serifClass} />
    </main>
  );
}
