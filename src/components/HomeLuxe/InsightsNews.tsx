"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const GOLD = "#bfa15c";
const INK = "#0c1f3f";

function Fade({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6, delay }}>{children}</motion.div>;
}

type FeaturedInsight = {
  cat: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  img: string;
  href: string;
};

type InsightItem = {
  cat: string;
  title: string;
  date: string;
  read: string;
  img: string;
  href: string;
};

const FEATURED: FeaturedInsight = {
  cat: "Guide",
  title: "Secure Dubai's Golden Visa through real estate",
  excerpt: "A practical walk-through of the property thresholds, eligible developments and the exact steps to a 10-year UAE residency — with the costs nobody else spells out.",
  date: "Mar 2025",
  read: "6 min read",
  img: "/images/blogs/dubai-golden-visa-real-estate.webp",
  href: "/blog/dubai-golden-visa-real-estate",
};
const LIST: InsightItem[] = [
  { cat: "Insight", title: "Investment migration in 2025: strategy, compliance & global mobility", date: "2025", read: "8 min", img: "/images/blogs/investment-migration-2025.webp", href: "/blog/investment-migration-2025" },
  { cat: "Article", title: "Greece Golden Visa: why investors are choosing Greece", date: "2026", read: "5 min", img: "/images/blogs/greece-golden-visa-benefits.webp", href: "/blog/greece-golden-visa-benefits" },
  { cat: "Mobility", title: "US passport visa-free countries in 2026", date: "2026", read: "4 min", img: "/images/blogs/us-passport-visa-free-countries-2026.webp", href: "/blog/us-passport-visa-free-countries-2026" },
];

export default function InsightsNews({
  serifClass,
  featured = FEATURED,
  list = LIST,
  imageOverrides,
}: {
  serifClass: string;
  featured?: FeaturedInsight;
  list?: InsightItem[];
  imageOverrides?: Record<string, string>;
}) {
  const displayedFeatured = {
    ...featured,
    img: imageOverrides?.[featured.href] ?? featured.img,
  };
  const displayedList = list.map((item) => ({
    ...item,
    img: imageOverrides?.[item.href] ?? item.img,
  }));

  return (
    <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Insights &amp; news<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">رؤى وأخبار</span></p>
            <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] font-medium leading-[1.05]`}>Know the ground <span className="italic" style={{ color: GOLD }}>before you move.</span></h2>
          </div>
          <a href="/insights" className="group inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>All insights <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Fade>
            <a href={displayedFeatured.href} className="group block">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
                <Image src={displayedFeatured.img} alt={displayedFeatured.title} fill sizes="(min-width:1024px) 40rem, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}26` }} />
                <span className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a1733]" style={{ background: GOLD }}>{displayedFeatured.cat}</span>
              </div>
              <h3 className={`${serifClass} mt-5 text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium leading-tight transition-colors group-hover:text-[#bfa15c]`}>{displayedFeatured.title}</h3>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#0c1f3f]/65">{displayedFeatured.excerpt}</p>
              <p className="mt-4 text-[12px] uppercase tracking-[0.14em] text-[#0c1f3f]/45">{displayedFeatured.date} · {displayedFeatured.read}</p>
            </a>
          </Fade>

          <div className="flex flex-col">
            {displayedList.map((a, i) => (
              <Fade key={a.title} delay={i * 0.08}>
                <a href={a.href} className="group flex items-center gap-5 border-b py-5 first:border-t" style={{ borderColor: `${INK}16` }}>
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md">
                    <Image src={a.img} alt={a.title} fill sizes="7rem" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD }}>{a.cat}</span>
                    <h3 className={`${serifClass} mt-1 text-[1.25rem] font-medium leading-snug transition-colors group-hover:text-[#bfa15c]`}>{a.title}</h3>
                    <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-[#0c1f3f]/45">{a.date} · {a.read}</p>
                  </div>
                </a>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
