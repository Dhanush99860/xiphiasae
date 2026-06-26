"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const STEEL = "#9fb4d8";

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">{children}</div>;
}
function Replay({ onClick, dark }: { onClick: () => void; dark?: boolean }) {
  return (
    <button onClick={onClick} className="mt-12 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors" style={{ borderColor: dark ? "rgba(12,31,63,0.25)" : "rgba(255,255,255,0.25)", color: dark ? "#0c1f3f" : "#eef3fb" }}>
      <span>↻</span> Replay animation
    </button>
  );
}

/* ════════ CONCEPT 1 · The official seal stamps down ════════ */
function ConceptSeal({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [k, setK] = useState(0);
  const play = inView;
  return (
    <section ref={ref} className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center text-[#eef3fb]" style={{ background: `radial-gradient(120% 90% at 50% 0%, #13284f 0%, ${NAVY} 60%)` }}>
      <Badge>Concept 1 · The seal (citizenship granted)</Badge>
      <div key={k} className="relative flex flex-col items-center">
        {/* shock ring at impact */}
        <motion.span aria-hidden className="absolute top-[clamp(8rem,16vw,11rem)] h-[clamp(16rem,32vw,22rem)] w-[clamp(16rem,32vw,22rem)] -translate-y-1/2 rounded-full border-2" style={{ borderColor: GOLD }} initial={{ scale: 0.3, opacity: 0 }} animate={play ? { scale: [0.3, 1.9], opacity: [0, 0.5, 0] } : {}} transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }} />
        {/* the seal */}
        <motion.div className="h-[clamp(16rem,32vw,22rem)] w-[clamp(16rem,32vw,22rem)]" initial={{ scale: 2.6, opacity: 0, rotate: -18 }} animate={play ? { scale: [2.6, 0.92, 1], opacity: [0, 1, 1], rotate: [-18, 3, 0] } : {}} transition={{ duration: 0.85, times: [0, 0.72, 1], ease: "easeOut" }}>
          <svg viewBox="0 0 220 220" className="h-full w-full" style={{ filter: `drop-shadow(0 8px 30px ${GOLD}33)` }}>
            <defs><path id="sealArc" d="M110,110 m0,-84 a84,84 0 1,1 -0.01,0" /></defs>
            <circle cx="110" cy="110" r="105" fill="none" stroke={GOLD} strokeWidth="2.5" />
            <circle cx="110" cy="110" r="90" fill="none" stroke={GOLD} strokeWidth="1" strokeOpacity="0.55" />
            <circle cx="110" cy="110" r="62" fill="none" stroke={GOLD} strokeWidth="1" strokeOpacity="0.35" />
            <text fill={GOLD} fontSize="12.5" letterSpacing="3.4" fontWeight="600"><textPath href="#sealArc" startOffset="0">★ CITIZENSHIP BY INVESTMENT ★ XIPHIAS ★ DUBAI&nbsp;&nbsp;</textPath></text>
            <text x="110" y="98" textAnchor="middle" fill={GOLD} className={serifClass} fontSize="30" fontWeight="600" letterSpacing="1">GRANTED</text>
            <text x="110" y="128" textAnchor="middle" fill={GOLD} fillOpacity="0.7" fontSize="11" letterSpacing="3">APPROVED</text>
            <path d="M110 138 l4 8 9 1 -6.5 6.5 1.5 9 -8-4.5 -8 4.5 1.5-9 -6.5-6.5 9-1z" fill={GOLD} />
          </svg>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={play ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.95 }}>
          <h2 className={`${serifClass} mt-10 text-[clamp(2.2rem,5vw,3.8rem)] font-medium`}>Citizenship <span className="italic" style={{ color: GOLD }}>granted.</span></h2>
          <p className="mt-3 text-[13px] uppercase tracking-[0.24em] text-white/55">Welcome — you are now a global citizen</p>
          <p lang="ar" dir="rtl" className="mt-3 font-arabic-display text-xl" style={{ color: GOLD }}>تهانينا، أصبحت مواطناً عالمياً</p>
        </motion.div>
      </div>
      <Replay onClick={() => setK((v) => v + 1)} />
    </section>
  );
}

/* ════════ CONCEPT 2 · The passport opens to your citizen page ════════ */
const PHOTO = "/images/Pexels/pexels-gatsby-yang-857486579-37669246.jpg";
function ConceptPassport({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [k, setK] = useState(0);
  const play = inView;
  return (
    <section ref={ref} className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center text-[#eef3fb]" style={{ background: NAVY }}>
      <Badge>Concept 2 · The passport opens</Badge>
      <p className="mb-12 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Your new passport<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">جواز سفرك</span></p>
      <div key={k} className="relative h-[27rem] w-[20rem] [perspective:1600px]">
        {/* inside page (revealed) */}
        <div className="absolute inset-0 overflow-hidden rounded-r-lg rounded-l-sm border text-left" style={{ background: "linear-gradient(135deg,#eef1f7,#dfe6f2)", borderColor: `${GOLD}55`, color: "#0c1f3f" }}>
          <div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: `repeating-linear-gradient(115deg, ${GOLD}14 0 2px, transparent 2px 9px)` }} />
          <div className="relative flex h-full flex-col p-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/55">Republic of Global Mobility · جواز سفر</p>
            <div className="mt-3 flex gap-4">
              <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-sm border" style={{ borderColor: `${GOLD}66` }}><Image src={PHOTO} alt="" fill sizes="6rem" className="object-cover [filter:grayscale(1)_contrast(1.05)]" /></div>
              <div className="flex flex-col gap-1.5 text-[10px]">
                <div><p className="text-[8px] uppercase tracking-[0.14em] text-[#0c1f3f]/45">Surname / Given names</p><p className={`${serifClass} text-[15px] font-semibold leading-tight`}>GLOBAL CITIZEN</p></div>
                <div className="flex gap-5"><div><p className="text-[8px] uppercase tracking-[0.14em] text-[#0c1f3f]/45">Type</p><p className="font-semibold">P</p></div><div><p className="text-[8px] uppercase tracking-[0.14em] text-[#0c1f3f]/45">Code</p><p className="font-semibold">GMX</p></div><div><p className="text-[8px] uppercase tracking-[0.14em] text-[#0c1f3f]/45">Passport №</p><p className="font-semibold">X 1788452</p></div></div>
                <div><p className="text-[8px] uppercase tracking-[0.14em] text-[#0c1f3f]/45">Nationality</p><p className="font-semibold">CITIZEN BY INVESTMENT</p></div>
              </div>
            </div>
            <div className="mt-auto font-mono text-[10px] leading-tight text-[#0c1f3f]/70">P&lt;GMXCITIZEN&lt;&lt;GLOBAL&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br />X17884520GMX8804159M3007158&lt;&lt;&lt;&lt;&lt;&lt;06</div>
            {/* stamp imprint */}
            <motion.div className="absolute right-3 top-20 rotate-[-14deg]" initial={{ opacity: 0, scale: 1.8 }} animate={play ? { opacity: 0.85, scale: 1 } : {}} transition={{ duration: 0.4, delay: 1.15, ease: "easeOut" }}>
              <div className="rounded-full border-[2.5px] px-3.5 py-2 text-center" style={{ borderColor: GOLD, color: GOLD }}><p className={`${serifClass} text-[15px] font-bold leading-none`}>CITIZEN</p><p className="text-[7px] uppercase tracking-[0.16em]">★ admitted ★</p></div>
            </motion.div>
          </div>
        </div>
        {/* cover (front) — flips open to the left */}
        <motion.div className="absolute inset-0 rounded-r-lg rounded-l-sm border" style={{ background: `linear-gradient(150deg,#13284f,${NAVY})`, borderColor: `${GOLD}66`, transformOrigin: "left center", transformStyle: "preserve-3d", backfaceVisibility: "hidden", boxShadow: "0 30px 60px -25px rgba(0,0,0,0.7)" }} initial={{ rotateY: 0 }} animate={play ? { rotateY: -162 } : { rotateY: 0 }} transition={{ duration: 1.1, delay: 0.35, ease: [0.7, 0, 0.25, 1] }}>
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em]" style={{ color: `${GOLD}cc` }}>Republic of Global Mobility</p>
            <svg viewBox="0 0 80 80" className="h-20 w-20"><circle cx="40" cy="40" r="36" fill="none" stroke={GOLD} strokeWidth="1.5" /><path d="M40 16 l5 12 13 1 -10 9 3 13 -11-7 -11 7 3-13 -10-9 13-1z" fill="none" stroke={GOLD} strokeWidth="1.5" /></svg>
            <p className={`${serifClass} text-[1.7rem] font-semibold tracking-[0.12em]`} style={{ color: GOLD }}>PASSPORT</p>
            <p lang="ar" dir="rtl" className="font-arabic-display text-lg" style={{ color: `${GOLD}cc` }}>جواز سفر</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/40">XIPHIAS</p>
          </div>
        </motion.div>
      </div>
      <Replay onClick={() => setK((v) => v + 1)} />
    </section>
  );
}

/* ════════ CONCEPT 3 · Visa stamps rain across the page (mobility) ════════ */
const STAMPS = [
  { t: "DUBAI", s: "ENTRY", l: "5%", top: "6%", rot: -9, round: true, c: GOLD },
  { t: "LONDON", s: "★ UK ★", l: "40%", top: "3%", rot: 6, round: false, c: STEEL },
  { t: "SCHENGEN", s: "EU", l: "71%", top: "11%", rot: -13, round: true, c: GOLD },
  { t: "SINGAPORE", s: "ENTRY", l: "11%", top: "37%", rot: 11, round: false, c: STEEL },
  { t: "TŌKYŌ", s: "日本", l: "46%", top: "34%", rot: -6, round: true, c: GOLD },
  { t: "NEW YORK", s: "E-2", l: "74%", top: "44%", rot: 9, round: false, c: STEEL },
  { t: "HONG KONG", s: "ENTRY", l: "20%", top: "68%", rot: -11, round: false, c: GOLD },
  { t: "GENÈVE", s: "CH", l: "56%", top: "70%", rot: 6, round: true, c: STEEL },
];
function ConceptStamps({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const [k, setK] = useState(0);
  const play = inView;
  return (
    <section ref={ref} className="relative isolate flex min-h-screen items-center px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Badge>Concept 3 · Visa stamps (145 destinations)</Badge>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Where it takes you<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">حرية التنقل</span></p>
          <h2 className={`${serifClass} mt-5 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.0]`}>Visa-free to <span className="italic" style={{ color: GOLD }}>145 destinations.</span></h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[#0c1f3f]/65">From the moment your citizenship is granted, the world opens — the UK, Schengen, Singapore, Hong Kong and beyond, without a visa.</p>
          <Replay onClick={() => setK((v) => v + 1)} dark />
        </div>
        {/* passport page with stamps raining in */}
        <div key={k} className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border" style={{ background: "linear-gradient(135deg,#f7f9fd,#e6ecf6)", borderColor: `${GOLD}44` }}>
          <div className="absolute inset-0 opacity-[0.45]" style={{ backgroundImage: `repeating-linear-gradient(125deg, ${GOLD}12 0 2px, transparent 2px 10px)` }} />
          <div className="absolute inset-x-0 top-3 text-center text-[9px] font-semibold uppercase tracking-[0.3em] text-[#0c1f3f]/35">Visas · Visas · تأشيرات</div>
          {STAMPS.map((st, i) => (
            <motion.div key={st.t} className="absolute" style={{ left: st.l, top: st.top, rotate: `${st.rot}deg` }} initial={{ opacity: 0, scale: 1.9 }} animate={play ? { opacity: 0.92, scale: 1 } : {}} transition={{ duration: 0.34, delay: 0.15 + i * 0.16, ease: "easeOut" }}>
              <div className={`${st.round ? "rounded-full px-4 py-3" : "rounded-[3px] px-3 py-2"} border-[2.5px] text-center`} style={{ borderColor: st.c, color: st.c }}>
                <p className={`${serifClass} text-[clamp(0.8rem,1.3vw,1.05rem)] font-bold leading-none`}>{st.t}</p>
                <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.14em]">{st.s}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CitizenshipFXSamples({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <ConceptSeal serifClass={serifClass} />
      <ConceptPassport serifClass={serifClass} />
      <ConceptStamps serifClass={serifClass} />
    </main>
  );
}
