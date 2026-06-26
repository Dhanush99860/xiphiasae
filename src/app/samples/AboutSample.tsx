"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import WhyXiphias from "@/components/HomeLuxe/WhyXiphias";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none fixed left-5 top-5 z-[60] rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">{children}</div>;
}
function Rise({ text, className, delay = 0, play }: { text: string; className?: string; delay?: number; play?: boolean }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" animate={play === undefined ? undefined : play ? "show" : "hidden"} whileInView={play === undefined ? "show" : undefined} viewport={play === undefined ? { once: true, amount: 0.4 } : undefined} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}>
      {words.map((w, i) => (<span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}><motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span></span>))}
    </motion.span>
  );
}
function Fade({ children, delay = 0, className, play }: { children: React.ReactNode; delay?: number; className?: string; play?: boolean }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={play === undefined ? undefined : play ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} whileInView={play === undefined ? { opacity: 1, y: 0 } : undefined} viewport={play === undefined ? { once: true, amount: 0.3 } : undefined} transition={{ duration: 0.7, delay }}>{children}</motion.div>;
}
function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />{children}<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span></p>;
}

const STATS = [{ v: "2007", u: "founded" }, { v: "10,000+", u: "families relocated" }, { v: "35", u: "jurisdictions" }, { v: "3", u: "global offices" }];
const OFFICES = [
  { city: "Dubai", note: "DIFC · Gate Village", ar: "دبي" },
  { city: "London", note: "Mayfair", ar: "لندن" },
  { city: "Bengaluru", note: "UB City", ar: "بنغالورو" },
];
const GALLERY = [1, 2, 3, 4, 5, 6].map((n) => `/images/gallery/xiphias-immigration-gallery-0${n}.jpeg`);

export default function AboutSample({ serifClass }: { serifClass: string }) {
  const [play, setPlay] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPlay(true), 120); return () => clearTimeout(t); }, []);
  return (
    <div className="relative">
      <Badge>Sample · About page</Badge>
      <Header serifClass={serifClass} />

      {/* HERO */}
      <section data-tone="dark" className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: `radial-gradient(120% 100% at 15% 0%, #13284f 0%, ${NAVY} 55%)` }}>
        <div className="lcp-instant mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Fade play={play}><p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}><a href="/" className="hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> About</p></Fade>
            <Fade play={play} delay={0.1}><p className="mt-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />About XIPHIAS<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">من نحن</span></p></Fade>
            <h1 className={`${serifClass} mt-5 text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[0.98]`}><Rise text="Seventeen years of" play={play} delay={0.2} className="block" /><span className="block italic" style={{ color: GOLD }}><Rise text="moving families forward." play={play} delay={0.5} /></span></h1>
            <Fade play={play} delay={0.9}><p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">A private global-mobility practice for those who value discretion. Since 2007 we have arranged residency, citizenship and second passports for more than 10,000 families — quietly, and end to end.</p></Fade>
            <Fade play={play} delay={1.05}><div className="mt-9 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t pt-7 sm:grid-cols-4" style={{ borderColor: "rgba(255,255,255,0.12)" }}>{STATS.map((s) => <div key={s.u} className="flex flex-col gap-1"><span className={`${serifClass} text-[clamp(1.4rem,2.2vw,2rem)] font-medium leading-none`} style={{ color: GOLD }}>{s.v}</span><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">{s.u}</span></div>)}</div></Fade>
          </div>
          <motion.div initial={{ opacity: 0, scale: 1.06 }} animate={play ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
            <Image src="/images/gallery/xiphias-immigration-gallery-02.jpeg" alt="XIPHIAS Immigration" fill sizes="45vw" priority className="object-cover [filter:grayscale(0.35)_brightness(0.78)_contrast(1.05)]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.5) 0%, transparent 50%)" }} />
            <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}55` }} />
            <span aria-hidden className="absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2" style={{ borderColor: GOLD }} />
            <span aria-hidden className="absolute bottom-4 right-4 h-7 w-7 border-b-2 border-r-2" style={{ borderColor: GOLD }} />
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Ambient tone="light" />
        <div className="mx-auto max-w-4xl">
          <Eyebrow ar="قصتنا">Our story</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.08]`}><Rise text="From a single desk to a global practice." /></h2>
          <Fade delay={0.1}><p className="mt-7 text-[17px] leading-relaxed text-[#0c1f3f]/75">XIPHIAS Immigration began in 2007 as a single advisory with one conviction: that a family&apos;s global future is too important to leave to a processing factory. Today, from offices in Dubai, London and Bengaluru, we advise internationally mobile families and businesses on residency, citizenship and skilled migration across more than thirty-five jurisdictions.</p></Fade>
          <Fade delay={0.2}><p className="mt-4 text-[16px] leading-relaxed text-[#0c1f3f]/65">We do not sell programmes. We map the right jurisdiction and route to each client&apos;s goals — mobility, tax, education, security or a genuine plan B — and we handle every step ourselves, from the source-of-funds dossier to the passport in hand. One accountable desk. Transparent costs. Discretion as standard.</p></Fade>
          <Fade delay={0.3}><blockquote className={`${serifClass} mt-12 border-l-2 pl-7 text-[clamp(1.5rem,3vw,2.2rem)] font-medium italic leading-snug`} style={{ borderColor: GOLD }}>&ldquo;We measure success in families settled — not files processed.&rdquo;</blockquote></Fade>
        </div>
      </section>

      {/* MD · credentials · awards · numbers (reused) */}
      <WhyXiphias serifClass={serifClass} />

      {/* OFFICES */}
      <section data-tone="dark" className="relative isolate px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-6xl">
          <Eyebrow ar="مكاتبنا">Where to find us</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="Three cities. One standard." /></h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {OFFICES.map((o, i) => (
              <Fade key={o.city} delay={i * 0.1}>
                <div className="group rounded-lg border p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#bfa15c]" style={{ borderColor: "rgba(191,161,92,0.28)", background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0))" }}>
                  <div className="flex items-baseline justify-between"><h3 className={`${serifClass} text-[2rem] font-medium transition-colors group-hover:text-[#bfa15c]`}>{o.city}</h3><span lang="ar" dir="rtl" className="font-arabic-display text-lg" style={{ color: `${GOLD}cc` }}>{o.ar}</span></div>
                  <p className="mt-3 text-[14px] uppercase tracking-[0.14em] text-white/55">{o.note}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>By appointment <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#eef3fb" }}>
        <div className="mx-auto max-w-6xl">
          <Eyebrow ar="من الداخل">Inside XIPHIAS</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="Seventeen years, in person." /></h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((src, i) => (
              <Fade key={src} delay={(i % 3) * 0.08}>
                <div className={`group relative overflow-hidden rounded-md ${i === 0 ? "aspect-[16/10] sm:col-span-2" : "aspect-[4/3]"}`}>
                  <Image src={src} alt="" fill sizes="(min-width:1024px) 26rem, 100vw" className="object-cover [filter:grayscale(0.3)_contrast(1.03)] transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}26` }} />
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-tone="dark" className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Image src="/images/gallery/xiphias-immigration-gallery-05.jpeg" alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.5)_brightness(0.32)_contrast(1.05)]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.6) 50%, rgba(8,18,42,0.9) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className={`${serifClass} text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.0]`}>Let&apos;s discuss your <span className="italic" style={{ color: GOLD }}>global future.</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">A private, no-obligation conversation with a senior advisor — wherever you are in the world.</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Our advisors</a></div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
