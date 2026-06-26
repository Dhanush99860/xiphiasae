// ==============================================
// components/team/Events.tsx – navy/gold light band
// ==============================================
import React from "react";
import Link from "next/link";
import { EventItem } from "@/components/Team/team";
import { formatDate } from "@/components/Team/formatDate";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

export function Events({ items, serifClass = "" }: { items: EventItem[]; serifClass?: string }) {
  if (!items.length) return null;
  return (
    <section
      aria-labelledby="events-title"
      data-tone="light"
      className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
      style={{ background: "#fbfaf7", color: INK }}
    >
      <Ambient tone="light" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="md:flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: GOLD_DEEP }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD_DEEP }}>Events &amp; Social</span>
              <span lang="ar" dir="rtl" className="font-arabic-display text-base" style={{ color: GOLD_DEEP }}>فعاليات</span>
            </div>
            <h2 id="events-title" className={`${serifClass} mt-5 text-[clamp(1.7rem,3.6vw,2.6rem)] font-medium`} style={{ color: INK }}>
              We share <span className="italic" style={{ color: GOLD_DEEP }}>openly</span>.
            </h2>
          </div>
          <Link
            href="https://www.linkedin.com/company/example/posts/"
            prefetch={false}
            className="group mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5"
            style={{ background: GOLD_DEEP, color: "#fff" }}
          >
            Follow on LinkedIn <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </header>
        <ul className="mt-10 grid grid-cols-1 gap-6 items-stretch md:grid-cols-3">
          {items.map((e) => (
            <li
              key={e.id}
              className="group flex h-full flex-col rounded-2xl p-6 transition-colors hover:border-[#a87d1f]"
              style={{ border: "1px solid rgba(168,125,31,0.3)", background: "#fff" }}
            >
              <time dateTime={e.date} className="text-xs uppercase tracking-[0.14em]" style={{ color: "rgba(12,31,63,0.45)" }}>{formatDate(e.date)}</time>
              <h3 className={`${serifClass} mt-2 text-lg font-medium leading-tight`} style={{ color: INK }}>{e.title}</h3>
              {e.summary && <p className="mt-2 text-sm" style={{ color: "rgba(12,31,63,0.6)" }}>{e.summary}</p>}
              {e.link && (
                <Link href={e.link} prefetch={false} className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: GOLD_DEEP }}>
                  View details <span aria-hidden>↗</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
