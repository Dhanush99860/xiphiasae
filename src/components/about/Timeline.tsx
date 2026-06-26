// components/about/Timeline.tsx
import React from "react";
import { Eyebrow } from "@/components/ui";

type Milestone = {
  year: string;
  title: string;
  text: string;
  tone?: "brand" | "legal"; // optional chip to distinguish legal vs brand milestones
  meta?: string;
};

const milestones: Milestone[] = [
  {
    year: "2009",
    title: "Founded in Bangalore",
    text:
      "XIPHIAS established with a regulation-first approach across skilled, investor and corporate tracks.",
    tone: "brand",
  },
  {
    year: "2015",
    title: "Incorporated as Xiphias Immigration Private Limited",
    text: "Legal incorporation in India (RoC-Bangalore).",
    tone: "legal",
    meta: "CIN: U74900KA2015PTC078396",
  },
  {
    year: "2017",
    title: "Enterprise Mobility",
    text:
      "Scaled corporate immigration and compliance programs for multi-country deployments.",
    tone: "brand",
  },
  {
    year: "2021",
    title: "HNI Investment Migration",
    text:
      "Expanded Golden Visa and investment migration advisory with white-glove handling.",
    tone: "brand",
  },
  {
    year: "2024",
    title: "Multi-country Footprint",
    text:
      "On-ground presence and representation across key markets, including the Gulf & EU corridors.",
    tone: "brand",
  },
  {
    year: "2025",
    title: "Thought Leadership Elevation",
    text:
      "Strengthened positioning in investment migration via strategic communications and media features.",
    tone: "brand",
  },
];

export default function Timeline() {
  const titleId = "timeline-title";

  return (
    <section
      id="timeline"
      className="py-6 md:py-6"
      aria-labelledby={titleId}
    >
      {/* container aligned with hero + overflow safety */}
      <div className="container mx-auto lg:max-w-screen-2xl px-4 sm:px-6 lg:px-8 overflow-x-clip">
        {/* dark ink wrapper (Midnight Embassy) */}
        <div
          className={[
            "relative overflow-hidden rounded-3xl p-6 md:p-8 lg:p-10",
            "bg-white border border-gold/45",
            "text-ink",
          ].join(" ")}
        >
          {/* soft background accents (clipped) */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="hidden sm:block absolute -top-24 -end-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
            <div className="hidden sm:block absolute -bottom-28 -start-10 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />
            <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent_80%)]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.06)_1px,transparent_1px)] bg-[size:22px_22px]" />
            </div>
          </div>

          {/* header */}
          <header className="relative mb-6 md:mb-8">
            <Eyebrow arabic="مسيرتنا">Our Journey</Eyebrow>

            <h2
              id={titleId}
              className="mt-3 font-sora text-2xl font-semibold tracking-tight text-ink md:text-3xl lg:text-[32px] break-words"
            >
              Milestones That Shape Our Expertise
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-ink/55">
              A decade-plus of building trust through diligent work and measurable outcomes.
            </p>
          </header>

          {/* legend */}
          <div className="relative mb-4 flex flex-wrap gap-2 text-[11px]">
            <LegendChip tone="brand">Brand milestone</LegendChip>
            <LegendChip tone="legal">Legal/registration milestone</LegendChip>
          </div>

          {/* timeline — gold guiding line */}
          <ol className="relative border-s border-gold/45 ps-6">
            {milestones.map((m) => (
              <li key={`${m.year}-${m.title}`} className="mb-8 last:mb-0">
                {/* node */}
                <span
                  className={[
                    "absolute -start-[7px] inline-block h-3.5 w-3.5 rounded-full ring-2 ring-midnight",
                    m.tone === "legal" ? "bg-gold/60" : "bg-gold",
                  ].join(" ")}
                />

                <div className="rounded-2xl border border-gold/45 bg-sand/50 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs uppercase tracking-widest text-gold">
                      {m.year}
                    </p>
                    {m.tone && (
                      <span
                        className={[
                          "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
                          m.tone === "legal"
                            ? "border-gold/45 bg-white text-gold/80"
                            : "border-gold/45 bg-white text-ink/70",
                        ].join(" ")}
                      >
                        {m.tone === "legal" ? "Legal" : "Brand"}
                      </span>
                    )}
                    {m.meta && (
                      <span className="inline-flex items-center rounded-full border border-gold/45 bg-white px-2 py-0.5 text-[10px] text-ink/60">
                        {m.meta}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-1 font-sora text-base font-semibold leading-tight text-ink break-words">
                    {m.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/55 break-words">
                    {m.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* disclaimer */}
          <p className="relative mt-4 text-[11px] text-ink/45">
            *Timeline blends brand and legal milestones sourced from publicly available records and
            company materials. No guarantees. Eligibility & rules apply.
          </p>
        </div>
      </div>
    </section>
  );
}

/* tiny UI atoms */
function LegendChip({
  tone,
  children,
}: {
  tone: "brand" | "legal";
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/45 bg-sand/50 px-2 py-0.5 text-ink/70">
      <span
        className={`h-1.5 w-1.5 rounded-full ${tone === "legal" ? "bg-gold/60" : "bg-gold"}`}
        aria-hidden
      />
      {children}
    </span>
  );
}