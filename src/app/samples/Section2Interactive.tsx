"use client";

import { useState } from "react";
import Image from "next/image";

const GOLD = "#bfa15c";
const INK = "#14110c";

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-black/15 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 backdrop-blur">{children}</div>;
}
function Eyebrow({ center }: { center?: boolean }) {
  return <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] ${center ? "justify-center" : ""}`} style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />What brings you here<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">ما الذي تبحث عنه</span></p>;
}

type Media = { type: "img" | "video"; src: string };
const INTENTS: { no: string; title: string; line: string; tag: string; media: Media }[] = [
  { no: "01", title: "Freedom to move", line: "A second passport and visa-free access to 140+ countries — for you and your family.", tag: "Citizenship", media: { type: "img", src: "/images/Pexels/pexels-gatsby-yang-857486579-37669246.jpg" } },
  { no: "02", title: "A plan B for your family", line: "Security, education and a place to belong — whatever tomorrow brings.", tag: "Residency", media: { type: "img", src: "/images/Pexels/pexels-m-munzevi-2155457440-37119543.jpg" } },
  { no: "03", title: "A private advisor", line: "One named advisor who handles every step — filing, liaison, follow-through.", tag: "Concierge", media: { type: "video", src: "/videos/7706747-uhd_2160_4096_25fps.mp4" } },
  { no: "04", title: "Global business reach", line: "Corporate mobility and relocation across 35 jurisdictions.", tag: "Corporate", media: { type: "video", src: "/videos/14361063_1440_2560_30fps.mp4" } },
];

function MediaLayer({ m, active }: { m: Media; active: boolean }) {
  return (
    <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: active ? 1 : 0 }}>
      <div className="absolute inset-0" style={{ transform: active ? "scale(1)" : "scale(1.06)", transition: "transform 1.2s ease" }}>
        {m.type === "img" ? <Image src={m.src} alt="" fill sizes="50vw" className="object-cover" style={{ filter: "saturate(0.92) contrast(1.03)" }} /> : <video src={m.src} autoPlay muted loop playsInline className="h-full w-full object-cover" style={{ filter: "saturate(0.95) contrast(1.03)" }} />}
      </div>
    </div>
  );
}

/* ── A · Interactive intent switch (list → media card swaps) ──────────── */
function IntentSwitch({ serifClass }: { serifClass: string }) {
  const [active, setActive] = useState(0);
  const a = INTENTS[active];
  return (
    <section className="relative px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f6f1e8" }}>
      <Badge>A · Interactive intent switch</Badge>
      <div className="mx-auto max-w-6xl">
        <Eyebrow />
        <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium`}>Why people come to us.</h2>
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <ul>
              {INTENTS.map((it, i) => (
                <li key={it.no} className="border-b" style={{ borderColor: `${INK}1a` }}>
                  <button onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="group flex w-full items-baseline gap-5 py-5 text-left">
                    <span className="text-[12px] font-semibold tabular-nums" style={{ color: i === active ? GOLD : `${INK}40` }}>{it.no}</span>
                    <span className={`${serifClass} text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-none transition-colors duration-300`} style={{ color: i === active ? INK : `${INK}55` }}>{it.title}</span>
                    <span className="ms-auto self-center text-lg transition-all duration-300" style={{ color: GOLD, opacity: i === active ? 1 : 0, transform: i === active ? "translateX(0)" : "translateX(-6px)" }}>→</span>
                  </button>
                </li>
              ))}
            </ul>
            <p key={active} className="mt-7 max-w-md text-[16px] leading-relaxed text-[#14110c]/65" style={{ animation: "fadeUp .5s ease" }}>{a.line}</p>
            <a href="#" className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>Explore {a.tag} <span>→</span></a>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md ring-1" style={{ boxShadow: `0 40px 110px -50px rgba(20,17,12,0.5)` }}>
            <div className="absolute inset-0 z-10" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}40` }} />
            {INTENTS.map((it, i) => <MediaLayer key={it.no} m={it.media} active={i === active} />)}
            <div className="absolute inset-0 z-[5]" style={{ background: "linear-gradient(0deg, rgba(8,10,14,0.7) 0%, transparent 55%)" }} />
            <div className="absolute inset-x-0 bottom-0 z-20 p-7 text-[#f3efe6]"><span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{a.tag}</span><h3 className={`${serifClass} mt-1 text-[1.8rem] font-medium`}>{a.title}</h3></div>
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}

/* ── B · Expanding media panels (hover to open, video plays) ──────────── */
function ExpandingPanels({ serifClass }: { serifClass: string }) {
  const [active, setActive] = useState(0);
  return (
    <section className="relative px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f6f1e8" }}>
      <Badge>B · Expanding media panels</Badge>
      <div className="mx-auto max-w-6xl">
        <Eyebrow />
        <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium`}>Why people come to us.</h2>
        <div className="mt-12 flex h-[68vh] flex-col gap-3 lg:flex-row">
          {INTENTS.map((it, i) => {
            const on = i === active;
            return (
              <div key={it.no} onMouseEnter={() => setActive(i)} className="group relative cursor-pointer overflow-hidden rounded-sm transition-all duration-500 ease-out" style={{ flex: on ? 3.2 : 1 }}>
                {it.media.type === "img" ? <Image src={it.media.src} alt="" fill sizes="60vw" className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: "saturate(0.92) contrast(1.03)" }} /> : <video src={it.media.src} autoPlay muted loop playsInline className="h-full w-full object-cover" style={{ filter: "saturate(0.95)" }} />}
                <div className="absolute inset-0" style={{ background: on ? "linear-gradient(0deg, rgba(8,10,14,0.85) 0%, rgba(8,10,14,0.1) 55%)" : "linear-gradient(0deg, rgba(8,10,14,0.7), rgba(8,10,14,0.45))" }} />
                <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
                <span className={`${serifClass} absolute right-4 top-3 text-[3rem] font-medium leading-none`} style={{ color: `${GOLD}3a` }}>{it.no}</span>
                <div className="absolute inset-x-0 bottom-0 p-6 text-[#f3efe6]">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{it.tag}</span>
                  <h3 className={`${serifClass} mt-1 font-medium leading-tight transition-all duration-500`} style={{ fontSize: on ? "1.9rem" : "1.25rem" }}>{it.title}</h3>
                  <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-white/70 transition-all duration-500" style={{ maxHeight: on ? "6rem" : "0", opacity: on ? 1 : 0 }}>{it.line}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Section2Interactive({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <IntentSwitch serifClass={serifClass} />
      <ExpandingPanels serifClass={serifClass} />
    </main>
  );
}
