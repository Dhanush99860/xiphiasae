"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { countryImage } from "@/components/Countries/country-image";

// ── Locked navy/gold luxury tokens ──
const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

// ── REAL Golden Visa destinations (GOLDEN_VISA_SLUGS from
//    src/app/(site)/golden-visa/page.tsx). Real region + key stat, real image
//    via countryImage(slug), each linking to its real /residency/[slug] route. ──
const DEST = (
  [
    { name: "Portugal", slug: "portugal", region: "Europe", stat: "From €250K · Schengen mobility" },
    { name: "Greece", slug: "greece", region: "Europe", stat: "From €250K · Real-estate route" },
    { name: "United Arab Emirates", slug: "uae", region: "Africa & Middle East", stat: "10-year visa · 0% income tax" },
    { name: "Malta", slug: "malta", region: "Europe", stat: "Mediterranean base · EU residence" },
    { name: "Cyprus", slug: "cyprus", region: "Europe", stat: "Fast-track PR · Family included" },
    { name: "Hungary", slug: "hungary", region: "Europe", stat: "Guest investor · 10-year permit" },
    { name: "Latvia", slug: "latvia", region: "Europe", stat: "Schengen access · Low entry" },
    { name: "Mauritius", slug: "mauritius", region: "Africa & Middle East", stat: "20-year permit · Indian Ocean base" },
  ] as const
).map((d) => ({ ...d, img: countryImage(d.slug, d.region) }));

// Real stats from the live golden-visa page.
const STATS = [
  { v: "8", u: "Headline destinations" },
  { v: "€250K", u: "Entry investment from" },
  { v: "90+", u: "Visa-free destinations unlocked" },
];

const WHY = [
  { k: "Global mobility", line: "Schengen and Gulf travel on EU and regional routes — visa-free movement that follows your whole family." },
  { k: "Schooling & lifestyle", line: "International schools, world-class healthcare and a second home base in a stable jurisdiction." },
  { k: "Security & status", line: "Long-term residence rights, a clear plan-B, and a path to permanence on eligible routes." },
  { k: "Diversified base", line: "Hold residency and assets across Europe, the Mediterranean and the UAE to spread risk and opportunity." },
];

const PROCESS = [
  { no: "01", title: "Discovery", detail: "We map your objectives, family profile and budget against every Golden Visa route." },
  { no: "02", title: "Route selection", detail: "Real-estate, fund or deposit — we shortlist the destinations that fit, with transparent costing." },
  { no: "03", title: "Vetting & filing", detail: "Projects and funds are vetted; documents prepared and lodged with the authority." },
  { no: "04", title: "Approval & onward", detail: "Residence issued, with a tax-aware plan and the path to permanence or citizenship." },
];

const PROOF = [
  { v: "20+", u: "Years advising HNW families" },
  { v: "8", u: "Golden Visa jurisdictions" },
  { v: "100%", u: "Bespoke, single-desk service" },
];

const DUO = "object-cover [filter:grayscale(0.4)_brightness(0.7)_contrast(1.05)]";

export default function GoldenVisaEditorial({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const rise = reduce
    ? {}
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.7 } };

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO (DARK · editorial split) ── */}
      <section data-tone="dark" className="relative grid min-h-screen items-stretch overflow-hidden text-[#eef3fb] lg:grid-cols-2" style={{ background: NAVY }}>
        <div className="relative z-10 flex flex-col justify-center px-6 py-32 sm:px-12 lg:px-20">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
            <span className="h-px w-8" style={{ background: GOLD }} />
            Residency by Investment
            <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">الإقامة</span>
          </p>
          <h1 className={`${serifClass} mt-6 max-w-xl text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[0.98]`}>
            Golden Visa
            <span className="block italic" style={{ color: GOLD }}>programmes.</span>
          </h1>
          <p className="mt-7 max-w-md text-[16px] leading-relaxed text-white/75">
            The headline residence-by-investment routes — Portugal, Greece, the UAE, Malta and more — compared by investment,
            timeline and the lifestyle, schooling and mobility they unlock.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
              Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="#destinations" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">
              Explore destinations
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t pt-7" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            {STATS.map((s) => (
              <div key={s.u} className="flex flex-col">
                <span className="text-[clamp(1.3rem,2vw,1.8rem)] font-semibold tabular-nums" style={{ color: GOLD }}>{s.v}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">{s.u}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[55vh] lg:min-h-full">
          <Image src={countryImage("portugal")} alt="Lisbon waterfront at golden hour — Portugal's Golden Visa" fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,23,51,0.95) 0%, rgba(10,23,51,0.2) 45%, transparent 100%)" }} />
          <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(0deg, rgba(10,23,51,0.6), transparent 50%)" }} />
        </div>
      </section>

      {/* ── WHY A GOLDEN VISA (LIGHT · image + copy) ── */}
      <section data-tone="light" className="relative isolate px-6 py-28 sm:px-12 lg:px-20" style={{ background: "#f3f7fd", color: INK }}>
        <Ambient tone="light" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          <motion.div {...rise} className="relative aspect-[5/6] overflow-hidden rounded-md">
            <Image src={countryImage("uae")} alt="Dubai skyline at dusk — the UAE Golden Visa" fill sizes="(min-width:1024px) 40vw, 100vw" className={DUO} />
            <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}55` }} />
          </motion.div>
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD_DEEP }}>
              <span className="h-px w-8" style={{ background: GOLD_DEEP }} />
              Why a Golden Visa
              <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">لماذا</span>
            </p>
            <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.06]`}>
              One accent, <span className="italic" style={{ color: GOLD_DEEP }}>many doors.</span>
            </h2>
            <div className="mt-9 grid gap-px overflow-hidden rounded-lg sm:grid-cols-2" style={{ background: `${INK}14` }}>
              {WHY.map((w) => (
                <div key={w.k} className="bg-[#f3f7fd] p-6">
                  <h3 className={`${serifClass} text-[1.3rem] font-medium`} style={{ color: INK }}>{w.k}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed" style={{ color: `${INK}b3` }}>{w.line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS (DARK · editorial image cards) ── */}
      <section id="destinations" data-tone="dark" className="relative isolate px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
                <span className="h-px w-8" style={{ background: GOLD }} />
                Explore by country
                <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">الوجهات</span>
              </p>
              <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}>
                Eight Golden Visa <span className="italic" style={{ color: GOLD }}>destinations.</span>
              </h2>
            </div>
            <a href="/golden-visa" className="text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-[#bfa15c]" style={{ color: GOLD }}>
              View all routes →
            </a>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DEST.map((d, i) => (
              <motion.a
                key={d.slug}
                href={`/residency/${d.slug}`}
                {...(reduce ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.6, delay: (i % 4) * 0.06 } })}
                className="group relative block aspect-[3/4] overflow-hidden rounded-md"
              >
                <Image src={d.img} alt={`${d.name} — Golden Visa destination`} fill sizes="(min-width:1024px) 22vw, 50vw" className={`${DUO} transition-transform duration-700 group-hover:scale-105`} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.05) 55%, rgba(8,18,42,0.35) 100%)" }} />
                <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{d.region}</span>
                  <h3 className={`${serifClass} mt-1 text-[1.5rem] font-medium leading-tight`}>{d.name}</h3>
                  <p className="mt-1.5 text-[12px] text-white/70">{d.stat}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
                    Explore <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS (LIGHT · image + steps) ── */}
      <section data-tone="light" className="relative isolate px-6 py-28 sm:px-12 lg:px-20" style={{ background: "#f3f7fd", color: INK }}>
        <Ambient tone="light" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD_DEEP }}>
              <span className="h-px w-8" style={{ background: GOLD_DEEP }} />
              How we do it
              <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">كيف نعمل</span>
            </p>
            <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}>
              Four steps. <span className="italic" style={{ color: GOLD_DEEP }}>One desk.</span>
            </h2>
            <ol className="mt-10 flex flex-col">
              {PROCESS.map((p) => (
                <li key={p.no} className="flex gap-6 border-t py-7" style={{ borderColor: `${INK}1a` }}>
                  <span className={`${serifClass} text-[2.4rem] font-medium leading-none`} style={{ color: GOLD_DEEP }}>{p.no}</span>
                  <div>
                    <h3 className={`${serifClass} text-[1.5rem] font-medium`} style={{ color: INK }}>{p.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: `${INK}b3` }}>{p.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <motion.div {...rise} className="relative aspect-[4/5] overflow-hidden rounded-md lg:sticky lg:top-28">
            <Image src={countryImage("greece")} alt="Aegean coastline — Greece's Golden Visa lifestyle" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}55` }} />
          </motion.div>
        </div>
      </section>

      {/* ── PROOF (DARK · full-bleed image band) ── */}
      <section data-tone="dark" className="relative isolate overflow-hidden px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Image src={countryImage("malta")} alt="Maltese harbour — a Mediterranean residency base" fill sizes="100vw" className="object-cover [filter:grayscale(0.5)_brightness(0.4)_contrast(1.05)]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.9) 0%, rgba(8,18,42,0.78) 50%, rgba(8,18,42,0.9) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
            <span className="h-px w-8" style={{ background: GOLD }} />
            Why XIPHIAS
            <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">لماذا اكسفياس</span>
          </p>
          <h2 className={`${serifClass} mt-5 max-w-2xl text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.06]`}>
            A single desk for <span className="italic" style={{ color: GOLD }}>every route.</span>
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {PROOF.map((p) => (
              <div key={p.u} className="border-t pt-6" style={{ borderColor: "rgba(191,161,92,0.4)" }}>
                <span className={`${serifClass} text-[clamp(2.4rem,5vw,3.6rem)] font-medium`} style={{ color: GOLD }}>{p.v}</span>
                <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">{p.u}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA (DARK · → /contact) ── */}
      <section data-tone="dark" className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-28 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Image src={countryImage("cyprus")} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.45)_brightness(0.4)_contrast(1.05)]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.6) 50%, rgba(8,18,42,0.88) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className={`${serifClass} text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.02]`}>
            Find your route in <span className="italic" style={{ color: GOLD }}>one conversation.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">
            Compare investment, timeline and benefits across every Golden Visa destination, then map the right path for your family with a XIPHIAS advisor.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
              Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="/golden-visa" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">
              All Golden Visa routes
            </a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
