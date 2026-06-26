// ==============================================
// components/team/CTA.tsx – navy/gold closing CTA
// ==============================================
import React from "react";
import Link from "next/link";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

export function CTA({ serifClass = "" }: { serifClass?: string }) {
  return (
    <section
      aria-labelledby="cta-title"
      data-tone="light"
      className="relative overflow-hidden px-6 py-28 md:px-10 lg:px-16"
      style={{ background: "#f7f4ef", color: INK }}
    >
      <Ambient tone="light" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 id="cta-title" className={`${serifClass} text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.04]`} style={{ color: INK }}>
          Build with the <span className="italic" style={{ color: GOLD_DEEP }}>senior team</span>.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7" style={{ color: "rgba(12,31,63,0.6)" }}>
          Book a zero-pressure discovery call. We respond within 24 hours.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            prefetch={false}
            className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
            style={{ background: GOLD, color: NAVY }}
          >
            Book a Call <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/capability-deck.pdf"
            prefetch={false}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-[#a87d1f]/10"
            style={{ border: `1px solid ${GOLD_DEEP}`, color: GOLD_DEEP }}
          >
            Download Deck <span aria-hidden>↓</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
