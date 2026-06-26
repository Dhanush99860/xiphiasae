// ==============================================
// components/team/Values.tsx – navy/gold dark band with serif numerals
// ==============================================
import React from "react";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

export function Values({ serifClass = "" }: { serifClass?: string }) {
  const items = [
    { t: "Lightweight by default", d: "We choose simple designs that scale gracefully before adding complexity." },
    { t: "Accessibility-first", d: "Keyboard-friendly, semantic HTML, and colour contrast as a habit." },
    { t: "Measure outcomes", d: "Ship, learn, and iterate with transparent metrics." },
  ];
  return (
    <section
      aria-labelledby="values-title"
      data-tone="dark"
      className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
      style={{ background: NAVY, color: "#fff" }}
    >
      <Ambient tone="dark" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: GOLD }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>How We Work</span>
            <span lang="ar" dir="rtl" className="font-arabic-display text-base" style={{ color: `${GOLD}cc` }}>منهجنا</span>
          </div>
          <h2 id="values-title" className={`${serifClass} mt-5 text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.06]`}>
            Lightweight processes, <span className="italic" style={{ color: GOLD }}>high ownership</span>.
          </h2>
        </header>
        <ul className="mt-12 grid grid-cols-1 gap-6 items-stretch md:grid-cols-3">
          {items.map((x, i) => (
            <li
              key={i}
              className="group flex h-full flex-col rounded-2xl p-7 transition-colors hover:border-[#bfa15c]"
              style={{ border: "1px solid rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.02)" }}
            >
              <span className={`${serifClass} text-3xl font-medium`} style={{ color: GOLD }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={`${serifClass} mt-3 text-xl font-medium`}>{x.t}</h3>
              <p className="mt-2 text-sm leading-6 text-white/55">{x.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
