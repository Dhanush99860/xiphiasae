"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

function Rise({ text, className, play }: { text: string; className?: string; play?: boolean }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" animate={play === undefined ? undefined : play ? "show" : "hidden"} whileInView={play === undefined ? "show" : undefined} viewport={play === undefined ? { once: true, amount: 0.4 } : undefined} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}>
      {words.map((w, i) => (<span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}><motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span></span>))}
    </motion.span>
  );
}

type Article = { slug: string; title: string; cat: string; date: string; read: string; excerpt?: string };
const ARTICLES: Article[] = [
  { slug: "dubai-golden-visa-real-estate", title: "Secure Dubai's Golden Visa through real estate", cat: "Golden Visa", date: "Mar 2025", read: "6 min", excerpt: "The property thresholds, eligible developments and exact steps to a 10-year UAE residency — with the costs nobody else spells out." },
  { slug: "investment-migration-2025", title: "Investment migration in 2025: strategy, compliance & global mobility", cat: "Insight", date: "2025", read: "8 min" },
  { slug: "golden-visa-programs", title: "Golden Visa programmes: how they actually work", cat: "Golden Visa", date: "2026", read: "7 min" },
  { slug: "greece-golden-visa-benefits", title: "Greece Golden Visa: why investors are choosing Greece", cat: "Residency", date: "2026", read: "5 min" },
  { slug: "us-passport-visa-free-countries-2026", title: "US passport visa-free countries in 2026", cat: "Mobility", date: "2026", read: "4 min" },
  { slug: "singapore-pr-by-investment", title: "Singapore PR by investment: invest today, citizenship tomorrow", cat: "Residency", date: "2025", read: "5 min" },
  { slug: "new-zealand-investor-visa-2026", title: "Why HNW investors are looking at New Zealand again", cat: "Residency", date: "2026", read: "6 min" },
  { slug: "italy-digital-nomad-visa", title: "Who qualifies for Italy's digital-nomad visa", cat: "Skilled", date: "2026", read: "4 min" },
];
const CATS = ["All", "Golden Visa", "Residency", "Mobility", "Skilled", "Insight"];
const img = (s: string) => `/images/blogs/${s}.webp`;

export default function InsightsPage({ serifClass }: { serifClass: string }) {
  const [cat, setCat] = useState("All");
  const list = ARTICLES.filter((a) => cat === "All" || a.cat === cat);
  const [featured, ...rest] = list;
  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      <section data-tone="dark" className="relative isolate px-6 pb-16 pt-32 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: `radial-gradient(120% 90% at 80% 0%, #13284f 0%, ${NAVY} 60%)` }}>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-6xl">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Insights &amp; intelligence<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">رؤى</span></p>
          <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[0.98]`}><Rise text="The XIPHIAS journal." play /></h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">Programme intelligence, mobility data and the practical guidance families act on — written by the advisors who do the work.</p>
          <div className="mt-9 flex flex-wrap gap-2.5">
            {CATS.map((c) => <button key={c} onClick={() => setCat(c)} className="rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200" style={{ borderColor: cat === c ? GOLD : "rgba(255,255,255,0.2)", background: cat === c ? GOLD : "transparent", color: cat === c ? NAVY : "rgba(238,243,251,0.7)" }}>{c}</button>)}
          </div>
        </div>
      </section>

      <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <div className="mx-auto max-w-6xl">
          <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {featured ? (
                <motion.a key={featured.slug} layout href={`/blog/${featured.slug}`} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.4 }} className="group block md:col-span-2 lg:col-span-2 lg:row-span-2">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg lg:aspect-[16/11]">
                    <Image src={img(featured.slug)} alt={featured.title} fill sizes="(min-width:1024px) 44rem, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a1733]" style={{ background: GOLD }}>{featured.cat}</span>
                  </div>
                  <h2 className={`${serifClass} mt-5 text-[clamp(1.7rem,2.8vw,2.4rem)] font-medium leading-tight transition-colors group-hover:text-[#bfa15c]`}>{featured.title}</h2>
                  {featured.excerpt ? <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#0c1f3f]/65">{featured.excerpt}</p> : null}
                  <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-[#0c1f3f]/45">{featured.date} · {featured.read} read</p>
                </motion.a>
              ) : null}
              {rest.map((a) => (
                <motion.a key={a.slug} layout href={`/blog/${a.slug}`} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.4 }} className="group block">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md">
                    <Image src={img(a.slug)} alt={a.title} fill sizes="(min-width:1024px) 22rem, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0a1733]" style={{ background: GOLD }}>{a.cat}</span>
                  </div>
                  <h3 className={`${serifClass} mt-3 text-[1.3rem] font-medium leading-snug transition-colors group-hover:text-[#bfa15c]`}>{a.title}</h3>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#0c1f3f]/45">{a.date} · {a.read} read</p>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section data-tone="dark" className="relative isolate px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-2xl">
          <h2 className={`${serifClass} text-[clamp(2rem,4vw,3.2rem)] font-medium`}>Intelligence, to your <span className="italic" style={{ color: GOLD }}>inbox.</span></h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">Programme changes, deadlines and mobility intelligence — a few times a year, never spam.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input type="email" required placeholder="you@example.com" className="w-full rounded-full border bg-white/5 px-5 py-3.5 text-[15px] text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#bfa15c]" style={{ borderColor: "rgba(255,255,255,0.2)" }} />
            <button className="shrink-0 rounded-full px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Subscribe</button>
          </form>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
