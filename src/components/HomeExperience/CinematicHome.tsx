"use client";

/**
 * CinematicHome — the Home page rebuilt to the cinematic-luxury bar (Plan ①
 * "The Gateway"). Dark moody full-bleed chapters, oversized type, visible
 * multi-layer parallax, big numbers, a swipeable destination rail. Content-first
 * (introduces every pathway + destinations) but dramatic. Reduced-motion safe,
 * mobile-light (no scrolljack; native-swipe rail; reveals degrade to fades).
 */

import Link from "next/link";
import { Container, Button } from "@/components/ui";
import {
  KenBurns,
  ParallaxLayer,
  CollectionRail,
  SplitText,
  Reveal,
  SandReveal,
  Counter,
  Magnetic,
  DrawLine,
} from "@/components/motion";
import CinematicHero from "@/components/Home/Hero/CinematicHero";
import HomeFinalCTA from "./HomeFinalCTA";

const PATHWAYS = [
  {
    eyebrow: "01 — Investment-backed",
    label: "Residency",
    line: "Golden Visas granting long-term residency, world-class healthcare and the freedom to move.",
    stat: "5 countries · 2–8 months",
    href: "/residency",
    img: "/images/residency/uae/uae-golden-visa.webp",
  },
  {
    eyebrow: "02 — A second passport",
    label: "Citizenship",
    line: "Citizenship by investment — visa-free access to 140+ countries, for you and your family.",
    stat: "140+ visa-free · 4–6 months",
    href: "/citizenship",
    img: "/images/citizenship/grenada/grenada-citizenship.webp",
  },
  {
    eyebrow: "03 — Merit-based",
    label: "Skilled",
    line: "Points-based and employer-sponsored routes to permanent residency in the world's top tier.",
    stat: "PR pathways · 12–24 months",
    href: "/skilled",
    img: "/images/residency/singapore/singapore-gip-pr-investment-hero.webp",
  },
  {
    eyebrow: "04 — For enterprise",
    label: "Corporate",
    line: "Intra-company transfers, work authorisations and relocation for multinational teams.",
    stat: "Global workforce mobility",
    href: "/corporate",
    img: "/images/corporate/uae/dubai-corporate-immigration.webp",
  },
] as const;

const DESTINATIONS = [
  { name: "United Arab Emirates", tag: "Golden Visa", href: "/residency/uae", img: "/images/residency/uae/uae-golden-visa.webp" },
  { name: "Portugal", tag: "Golden Visa", href: "/residency/portugal", img: "/images/residency/portugal/portugal-golden-visa.webp" },
  { name: "Grenada", tag: "Citizenship", href: "/citizenship/grenada", img: "/images/citizenship/grenada/grenada-citizenship.webp" },
  { name: "Greece", tag: "Golden Visa", href: "/residency/greece", img: "/images/residency/greece/greece-golden-visa.webp" },
  { name: "Malta", tag: "Residency", href: "/residency/malta", img: "/images/residency/malta/malta-mprp.webp" },
  { name: "Turkey", tag: "Citizenship", href: "/citizenship/turkey", img: "/images/citizenship/turkey/turkey.webp" },
] as const;

const STATS = [
  { to: 17, suffix: "+", label: "Years advising" },
  { to: 25, suffix: "+", label: "Countries served" },
  { to: 10000, suffix: "+", label: "Families guided" },
  { to: 98, suffix: "%", label: "Approval rate" },
] as const;

export default function CinematicHome() {
  return (
    <>
      <CinematicHero />

      {/* ── Statement (parallax, bold) ─────────────────────────────── */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#0b0b0e] text-white">
        <ParallaxLayer speed={90} className="absolute -inset-y-[20%] inset-x-0">
          <KenBurns src="/images/blogs/why-dubai-dominating.webp" alt="" className="h-full w-full" sizes="100vw" position="center 40%" />
        </ParallaxLayer>
        <div aria-hidden className="absolute inset-0 bg-[#0b0b0e]/82" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#0b0b0e] via-[#0b0b0e]/40 to-transparent" />
        <Container className="relative z-10 py-24">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.32em] text-gold">From the Emirates, outward</p>
          </Reveal>
          <h2 className="mt-6 max-w-4xl font-sora text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
            <SplitText text="Twenty-five countries." className="block" />
            <span className="block text-white/55">
              <SplitText text="One trusted desk." delay={0.2} />
            </span>
          </h2>
        </Container>
      </section>

      {/* ── Pathway chapters (full-bleed, parallax, bold) ──────────── */}
      {PATHWAYS.map((p, i) => (
        <PathwayChapter key={p.label} {...p} flip={i % 2 === 1} index={i} />
      ))}

      {/* ── Destination rail (horizontal collection) ───────────────── */}
      <section className="relative overflow-hidden bg-sand py-24 text-ink lg:py-28">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Reveal>
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-gold_deep">The collection</p>
              </Reveal>
              <SandReveal>
                <h2 className="mt-3 font-sora text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1] tracking-tight text-ink">
                  Where we take you.
                </h2>
              </SandReveal>
            </div>
            <Link href="/countries" className="group inline-flex items-center gap-2 text-[14px] font-semibold text-gold_deep">
              All 35 destinations
              <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180">→</span>
            </Link>
          </div>
        </Container>
        <Container className="!max-w-none !px-0">
          <CollectionRail className="px-6 lg:px-10">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.name}
                href={d.href}
                className="group relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[52vw] lg:w-[30rem]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                  <KenBurns src={d.img} alt={d.name} className="h-full w-full" sizes="(min-width:1024px) 30rem, 78vw" duration={24} />
                </div>
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{d.tag}</p>
                  <h3 className="mt-1.5 font-sora text-[24px] font-semibold leading-tight text-white">{d.name}</h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/80">
                    Explore <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </CollectionRail>
        </Container>
      </section>

      {/* ── Trust (big numbers over cinematic dark) ────────────────── */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#0b0b0e] text-white">
        <ParallaxLayer speed={80} className="absolute -inset-y-[20%] inset-x-0">
          <KenBurns src="/images/blogs/dubai.webp" alt="" className="h-full w-full" sizes="100vw" position="center 45%" />
        </ParallaxLayer>
        <div aria-hidden className="absolute inset-0 bg-[#0b0b0e]/85" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.10)_0%,transparent_60%)]" />
        <Container className="relative z-10 py-24 text-center">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-gold">A credential, not a claim</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-y-12 sm:gap-y-16 lg:grid-cols-4">
            {STATS.map((s) => (
              <Reveal key={s.label} y={24}>
                <div className="font-sora text-[clamp(2.8rem,6vw,4.5rem)] font-semibold leading-none text-white">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-3 text-[12px] uppercase tracking-[0.18em] text-white/45">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <HomeFinalCTA />
    </>
  );
}

/* ── Full-bleed pathway chapter ──────────────────────────────────── */
function PathwayChapter({
  eyebrow,
  label,
  line,
  stat,
  href,
  img,
  flip,
}: {
  eyebrow: string;
  label: string;
  line: string;
  stat: string;
  href: string;
  img: string;
  flip: boolean;
  index: number;
}) {
  return (
    <section className="relative flex min-h-[90vh] items-end overflow-hidden bg-black text-white">
      <ParallaxLayer speed={120} className="absolute -inset-y-[18%] inset-x-0">
        <KenBurns src={img} alt="" className="h-full w-full" sizes="100vw" position="center 42%" />
      </ParallaxLayer>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/35 to-black/25" />
      <div
        aria-hidden
        className={`absolute inset-0 ${flip ? "bg-gradient-to-l from-black/75 to-transparent" : "bg-gradient-to-r from-black/75 to-transparent"}`}
      />
      <Container className={`relative z-10 pb-20 lg:pb-28 ${flip ? "text-end" : "text-start"}`}>
        <div className={`max-w-2xl ${flip ? "ms-auto" : ""}`}>
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
          </Reveal>
          <h2 className="mt-4 font-sora text-[clamp(3.25rem,11vw,8rem)] font-semibold leading-[0.85] tracking-[-0.03em]">
            <SplitText text={label} />
          </h2>
          <DrawLine
            d="M0 1 L160 1"
            viewBox="0 0 160 2"
            preserveAspectRatio="none"
            strokeWidth={1.5}
            delay={0.3}
            className={`mt-6 h-px w-40 ${flip ? "ms-auto" : ""}`}
          />
          <Reveal delay={0.25}>
            <p className={`mt-6 text-lg leading-relaxed text-white/72 ${flip ? "ms-auto" : ""} max-w-md`}>{line}</p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className={`mt-8 flex flex-wrap items-center gap-7 ${flip ? "justify-end" : ""}`}>
              <span className="font-sora text-[19px] font-semibold text-gold">{stat}</span>
              <Magnetic strength={0.25}>
                <Link
                  href={href}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-[14px] font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-gold/70 hover:text-gold"
                >
                  Explore {label}
                  <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180">→</span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
