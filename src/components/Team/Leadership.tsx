// ==============================================
// components/team/Leadership.tsx – navy/gold Spotlight showcase
// ==============================================
import React from "react";
import { Person } from "@/components/Team/team";
import { Avatar } from "@/components/Team/Avatar";
import { SocialLink } from "./_Social";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const INK = "#0c1f3f";

export function Leadership({ people, serifClass = "" }: { people: Person[]; serifClass?: string }) {
  if (!people.length) return null;
  return (
    <section
      aria-labelledby="leadership-title"
      data-tone="light"
      className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
      style={{ background: "#fbfaf7", color: INK }}
    >
      <Ambient tone="light" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: GOLD_DEEP }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD_DEEP }}>Leadership</span>
            <span lang="ar" dir="rtl" className="font-arabic-display text-base" style={{ color: GOLD_DEEP }}>القيادة</span>
          </div>
          <h2 id="leadership-title" className={`${serifClass} mt-5 text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.06]`} style={{ color: INK }}>
            Operators with <span className="italic" style={{ color: GOLD_DEEP }}>skin in the game</span>.
          </h2>
        </header>
        <ul className="mt-12 grid grid-cols-1 gap-6 items-stretch sm:grid-cols-2 lg:grid-cols-3">
          {people.map((p) => (
            <li
              key={p.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-colors hover:border-[#a87d1f]"
              style={{ border: "1px solid rgba(168,125,31,0.3)", background: "#fff" }}
            >
              <div className="flex items-start gap-4">
                <Avatar src={p.headshot} alt={p.name} />
                <div>
                  <h3 className={`${serifClass} text-xl font-medium leading-tight`} style={{ color: INK }}>{p.name}</h3>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: GOLD_DEEP }}>{p.role}</p>
                  {p.location && <p className="mt-1 text-xs" style={{ color: "rgba(12,31,63,0.45)" }}>{p.location}</p>}
                </div>
              </div>
              {p.bio && <p className="mt-4 text-sm leading-6" style={{ color: "rgba(12,31,63,0.6)" }}>{p.bio}</p>}
              {p.socials?.length ? (
                <ul className="mt-auto flex flex-wrap gap-3 pt-4 text-xs">
                  {p.socials.map((s, i) => (<li key={i}><SocialLink s={s} tone="light" /></li>))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
