// ==============================================
// components/team/Advisors.tsx – navy/gold dark band
// ==============================================
import React from "react";
import { Person } from "@/components/Team/team";
import { Avatar } from "@/components/Team/Avatar";
import { SocialLink } from "./_Social";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

export function Advisors({ people, serifClass = "" }: { people: Person[]; serifClass?: string }) {
  if (!people.length) return null;
  return (
    <section
      aria-labelledby="advisors-title"
      data-tone="dark"
      className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
      style={{ background: NAVY, color: "#fff" }}
    >
      <Ambient tone="dark" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: GOLD }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>Advisory</span>
            <span lang="ar" dir="rtl" className="font-arabic-display text-base" style={{ color: `${GOLD}cc` }}>المستشارون</span>
          </div>
          <h2 id="advisors-title" className={`${serifClass} mt-5 text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.06]`}>
            Practical guidance from <span className="italic" style={{ color: GOLD }}>seasoned operators</span>.
          </h2>
        </header>
        <ul className="mt-12 grid grid-cols-1 gap-6 items-stretch sm:grid-cols-2 lg:grid-cols-3">
          {people.map((p) => (
            <li
              key={p.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-colors hover:border-[#bfa15c]"
              style={{ border: "1px solid rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex items-start gap-4">
                <Avatar src={p.headshot} alt={p.name} />
                <div>
                  <h3 className={`${serifClass} text-xl font-medium leading-tight`}>{p.name}</h3>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: GOLD }}>{p.role}</p>
                </div>
              </div>
              {p.socials?.length ? (
                <ul className="mt-auto flex flex-wrap gap-3 pt-4 text-xs">
                  {p.socials.map((s, i) => (<li key={i}><SocialLink s={s} tone="dark" /></li>))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
