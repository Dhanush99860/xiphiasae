// components/awards/Showcase.tsx
import React from "react";
import { awardsData, Award } from "./awards.data";
import { AwardsGrid } from "./AwardsGrid";
import { AwardsMarquee } from "./AwardsMarquee";
import { Eyebrow } from "@/components/ui";

type Props = {
  /** "page" shows hero + grid. "preview" shows the auto-scroll strip. */
  variant?: "page" | "preview";
  items?: Award[];
  className?: string; // custom container padding if needed
};

export function Awards({ variant = "page", items = awardsData, className = "" }: Props) {
  if (variant === "preview") {
    return <AwardsMarquee items={items} className={className || "mx-auto max-w-screen-2xl px-4 py-5"} />;
  }

  return (
    <section className={className || "mx-auto max-w-7xl px-4 py-10 md:py-12"}>
      <HeroBlock />
      <div className="mt-10 md:mt-12">
        <div className="mb-6">
          <h2 className="font-sora text-2xl font-semibold tracking-tight text-ink">Awards & Recognition</h2>
          <p className="mt-1 text-sm text-ink/55">
            A curated selection of our most meaningful honors.
          </p>
        </div>
        <AwardsGrid items={items} />
      </div>
    </section>
  );
}

/* compact hero — Midnight Embassy */
function HeroBlock() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold/45 bg-white p-6 md:p-8 lg:p-10 text-ink">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-10 h-72 w-72 rounded-full bg-gold/[0.06] blur-3xl" />
      </div>

      <div className="relative">
        <Eyebrow arabic="تقدير">Recognition</Eyebrow>

        <h1 className="mt-4 font-sora text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-ink">
          Awards &amp; Recognition
        </h1>

        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-ink/55 md:text-base">
          Independent publications have highlighted our innovation, industry leadership, and client-first execution.
        </p>
      </div>
    </div>
  );
}
