// ==============================================
// components/team/TeamDirectory.tsx – search + tag filter (navy/gold light band)
// ==============================================
"use client";
import React, { useMemo, useState } from "react";
import { Person } from "@/components/Team/team";
import { Avatar } from "@/components/Team/Avatar";
import { SocialIcon } from "./_Social";
import { SearchIcon } from "@/components/Team/Icons";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD_DEEP = "#a87d1f";
const INK = "#0c1f3f";

export function TeamDirectory({ people, serifClass = "" }: { people: Person[]; serifClass?: string }) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | "all">("all");

  const allTags = useMemo(() => {
    const t = new Set<string>();
    people.forEach((p) => p.tags?.forEach((x) => t.add(x)));
    return Array.from(t).sort();
  }, [people]);

  const filtered = useMemo(() => {
    const hay = (p: Person) => `${p.name} ${p.role} ${(p.tags || []).join(" ")}`.toLowerCase();
    return people.filter((p) => {
      const byText = hay(p).includes(q.toLowerCase());
      const byTag = tag === "all" ? true : p.tags?.includes(tag);
      return byText && byTag;
    });
  }, [people, q, tag]);

  return (
    <section
      aria-labelledby="team-title"
      data-tone="light"
      className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
      style={{ background: "#f7f4ef", color: INK }}
    >
      <Ambient tone="light" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="md:flex items-end justify-between md:space-x-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: GOLD_DEEP }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD_DEEP }}>Team</span>
              <span lang="ar" dir="rtl" className="font-arabic-display text-base" style={{ color: GOLD_DEEP }}>الفريق</span>
            </div>
            <h2 id="team-title" className={`${serifClass} mt-5 text-[clamp(1.7rem,3.6vw,2.6rem)] font-medium`} style={{ color: INK }}>The wider bench.</h2>
            <p className="mt-2 text-sm" style={{ color: "rgba(12,31,63,0.55)" }}>Search by name, role, or tag.</p>
          </div>
          <div className="mt-5 md:mt-0 flex gap-3">
            <label className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm focus-within:border-[#a87d1f]" style={{ border: "1px solid rgba(168,125,31,0.3)", background: "#fff", color: INK }}>
              <SearchIcon className="h-4 w-4" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search team…" className="bg-transparent outline-none placeholder:text-[#0c1f3f]/40" style={{ color: INK }} aria-label="Search team" />
            </label>
            <select value={tag} onChange={(e) => setTag(e.target.value as any)} aria-label="Filter by tag" className="rounded-full px-4 py-2.5 text-sm focus:border-[#a87d1f] focus:outline-none" style={{ border: "1px solid rgba(168,125,31,0.3)", background: "#fff", color: INK }}>
              <option value="all">All disciplines</option>
              {allTags.map((t) => (<option key={t} value={t}>{t}</option>))}
            </select>
          </div>
        </header>

        <ul className="mt-10 grid grid-cols-2 gap-4 items-stretch sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((p) => (
            <li
              key={p.id}
              className="group flex h-full flex-col rounded-2xl p-4 transition-colors hover:border-[#a87d1f]"
              style={{ border: "1px solid rgba(168,125,31,0.3)", background: "#fff" }}
            >
              <Avatar src={p.headshot} alt={p.name} size="lg" />
              <h3 className={`${serifClass} mt-3 text-base font-medium leading-tight`} style={{ color: INK }}>{p.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: GOLD_DEEP }}>{p.role}</p>
              {p.tags?.length ? (
                <ul className="mt-2 flex flex-wrap gap-1">
                  {p.tags.map((t) => (
                    <li key={t} className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]" style={{ border: "1px solid rgba(168,125,31,0.3)", color: "rgba(12,31,63,0.7)" }}>
                      <span className="h-1 w-1 rounded-full" style={{ background: GOLD_DEEP }} aria-hidden />{t}
                    </li>
                  ))}
                </ul>
              ) : null}
              {p.socials?.length ? (
                <ul className="mt-auto flex gap-2 pt-3" style={{ color: "rgba(12,31,63,0.6)" }}>
                  {p.socials.map((s, i) => (<li key={i}><SocialIcon s={s} /></li>))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
