"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const GOLD = "#bfa15c";
const INK = "#0c1f3f";

const BENEFITS = [
  { t: "Global mobility", d: "Visa-free or visa-on-arrival access to 140+ destinations — the UK, Schengen, Singapore and Hong Kong — so you travel for business or family without the friction of visa applications." },
  { t: "A genuine plan B", d: "Whatever changes at home — political, economic or personal — a second citizenship is an insurance policy your family can rely on, for life and for the generations after you." },
  { t: "Tax efficiency", d: "Relocate your tax residence to jurisdictions with no tax on foreign income, capital gains or inheritance, and structure your wealth with certainty rather than guesswork." },
  { t: "Family & future generations", d: "One application can include your spouse, children and dependent parents — and citizenship passes to children yet to be born. Three generations, secured at once." },
  { t: "Education & healthcare", d: "Access leading universities at domestic rates and world-class healthcare across the EU and the Commonwealth — for your children and your parents alike." },
  { t: "Business & banking", d: "Open international bank accounts, enter new markets and move capital freely — as a citizen with standing, not an outsider waiting on permissions." },
];

export default function WhyInvest({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section data-tone="light" ref={ref} className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#eef3fb" }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* text */}
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Why invest<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">لماذا الاستثمار</span></p>
            <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] font-medium leading-[1.05]`}>Why a second residence or <span className="italic" style={{ color: GOLD }}>citizenship?</span></h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#0c1f3f]/75">For internationally mobile families, a second residence or citizenship is no longer a luxury — it is sound planning. It is the difference between options and dependence: where you can live, bank, invest, school your children and retire, on your own terms.</p>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[#0c1f3f]/65">We advise on the full spectrum — from a 10-year UAE Golden Visa to a Caribbean or European passport — matching the right programme to your goals, budget and timeline, and handling every step from the source-of-funds dossier to the passport in your hand.</p>
          </div>
          {/* parallax image */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
            <motion.div className="absolute -inset-y-[8%] inset-x-0" style={{ y }}>
              <Image src="/images/citizenship/dubai/dubai-country-image.webp" alt="Dubai" fill sizes="45vw" className="object-cover [filter:grayscale(0.15)_contrast(1.03)]" />
            </motion.div>
            <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}40` }} />
            <span aria-hidden className="absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2" style={{ borderColor: GOLD }} />
            <span aria-hidden className="absolute bottom-4 right-4 h-7 w-7 border-b-2 border-r-2" style={{ borderColor: GOLD }} />
          </div>
        </div>

        {/* benefit grid (text-rich) */}
        <div className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <motion.div key={b.t} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: (i % 3) * 0.08 }} className="border-t pt-6" style={{ borderColor: `${INK}1f` }}>
              <span className={`${serifClass} text-[1.3rem]`} style={{ color: GOLD }}>0{i + 1}</span>
              <h3 className={`${serifClass} mt-1 text-[1.5rem] font-medium leading-tight`}>{b.t}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#0c1f3f]/65">{b.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
