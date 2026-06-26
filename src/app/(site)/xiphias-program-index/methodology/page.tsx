import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";

import Ambient from "@/components/HomeLuxe/Ambient";
import LuxeHeader from "@/components/HomeLuxe/LuxeHeader";
import LuxeFooter from "@/components/HomeLuxe/LuxeFooter";
import { countryImage } from "@/components/Countries/country-image";
import { INDEX_FACTORS, INDEX_DISCLAIMER } from "@/lib/program-index";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

export const metadata: Metadata = {
  title: "Program Index Methodology — XIA Intelligence",
  description:
    "The transparent, documented composite weighting behind the XIPHIAS Program Index: affordability, speed, presence, family, due diligence and passport power.",
  alternates: { canonical: "/xiphias-program-index/methodology" },
};

const MAX_WEIGHT = Math.max(...INDEX_FACTORS.map((f) => f.weight));

export default function ProgramIndexMethodologyPage() {
  const heroImg = countryImage("portugal");
  return (
    <div className="relative">
      <LuxeHeader serifClass={serif.className} />

      {/* ── HERO (real full-bleed image, navy overlay) ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-16 pt-32 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <div className="absolute inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt="Program Index methodology" className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 90% at 15% 0%, rgba(19,40,79,0.86) 0%, rgba(10,23,51,0.94) 60%, ${NAVY} 100%)`,
            }}
          />
        </div>
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-screen-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p
                className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
                style={{ color: GOLD }}
              >
                <span className="h-px w-8" style={{ background: GOLD }} />
                XIA · Program Index
                <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
                  المنهجية
                </span>
              </p>
              <h1 className={`${serif.className} mt-5 text-[clamp(2.2rem,4.8vw,3.8rem)] font-medium leading-[1.04]`}>
                How the Program Index is <span className="italic" style={{ color: GOLD }}>scored.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75">
                A transparent composite, published so advisors and clients can see exactly what drives each score.
                Sub-scores are 0–100; the index is their weighted average.
              </p>
            </div>
            <Link
              href="/xiphias-program-index"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-[13px] font-semibold text-[#eef3fb] transition hover:bg-white/[0.05]"
              style={{ borderColor: `${GOLD}40` }}
            >
              <ArrowLeft className="size-4" /> Back to the Index
            </Link>
          </div>
        </div>
      </section>

      {/* ── FACTORS (dark) ── */}
      <section
        data-tone="dark"
        className="relative isolate px-6 pb-24 pt-12 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 90% at 85% 0%, #13284f 0%, ${NAVY} 65%)` }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-screen-2xl">
          <div className="grid gap-5 lg:grid-cols-2">
            {INDEX_FACTORS.map((f) => {
              const pct = Math.round((f.weight / MAX_WEIGHT) * 100);
              return (
                <div
                  key={f.key}
                  className="rounded-2xl border p-6 transition hover:border-[#bfa15c]/65"
                  style={{ borderColor: `${GOLD}40`, background: "rgba(8,18,40,0.6)" }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className={`${serif.className} text-[22px] font-semibold text-[#eef3fb]`}>{f.label}</h2>
                    <span
                      className="rounded-full border px-3 py-1 text-[13px] font-black tabular-nums"
                      style={{ borderColor: `${GOLD}66`, background: `${GOLD}1a`, color: GOLD }}
                    >
                      {f.weight}%
                    </span>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: GOLD }} />
                  </div>
                  <p className="mt-3 text-[13px] font-semibold" style={{ color: GOLD }}>
                    {f.direction}
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/60">{f.description}</p>
                </div>
              );
            })}
          </div>

          <div
            className="mt-6 rounded-2xl border p-6"
            style={{ borderColor: `${GOLD}40`, background: "rgba(8,18,40,0.6)" }}
          >
            <h2 className={`${serif.className} text-[22px] font-semibold text-[#eef3fb]`}>
              How the score is combined
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">
              Each factor produces a 0–100 sub-score from the parsed programme data. The index is the weight-multiplied
              average of those sub-scores (weights sum to 100). Destinations outside the passport snapshot use a neutral
              baseline for the passport-power factor, clearly flagged on each card.
            </p>
            <p
              className="mt-4 rounded-xl border px-4 py-3 text-[12.5px] font-medium"
              style={{ borderColor: `${GOLD}66`, background: `${GOLD}1a`, color: GOLD }}
            >
              {INDEX_DISCLAIMER}
            </p>
          </div>

          <p className="mt-6 text-center text-[12.5px]" style={{ color: GOLD_DEEP }}>
            Indicative composite benchmark only — verified by your advisor before any decision.
          </p>
        </div>
      </section>

      <LuxeFooter serifClass={serif.className} />
    </div>
  );
}
