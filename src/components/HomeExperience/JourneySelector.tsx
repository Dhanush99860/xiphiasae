"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Section, Eyebrow, Button } from "@/components/ui";
import {
  AuroraBackground,
  LatticeOverlay,
  SandReveal,
  Reveal,
  ShinyText,
  DrawLine,
  ImageReveal,
  ParallaxLayer,
  CollectionRail,
} from "@/components/motion";
import { JOURNEY_PATHS, type JourneyId } from "./data";

const EASE = [0.22, 1, 0.36, 1] as const;

// ── Per-vertical editorial hero imagery (verified real files in public/images) ──
const PATH_IMAGE: Record<JourneyId, { src: string; alt: string; position?: string }> = {
  residency: {
    src: "/images/residency/uae/uae-golden-visa-real-estate.webp",
    alt: "Dubai waterfront residences — investment-backed residency",
    position: "center",
  },
  citizenship: {
    src: "/images/citizenship/grenada/grenada-real-estate.webp",
    alt: "Caribbean coastline — citizenship by investment",
    position: "center",
  },
  skilled: {
    src: "/images/skilled/canada/canada.webp",
    alt: "Canadian skyline — merit-based skilled migration",
    position: "center",
  },
  corporate: {
    src: "/images/corporate/usa/usa-corporate-immigration.webp",
    alt: "Corporate towers — global workforce mobility",
    position: "center",
  },
};

// ── Destinations rail: real per-country hero image for each card ────────────────
type Destination = { name: string; img: string; href: string; tag: string };

const DESTINATIONS: Destination[] = [
  {
    name: "United Arab Emirates",
    img: "/images/residency/uae/uae-golden-visa.webp",
    href: "/residency/uae",
    tag: "Golden Visa",
  },
  {
    name: "Portugal",
    img: "/images/residency/portugal/portugal-golden-visa.webp",
    href: "/residency/portugal",
    tag: "Residency",
  },
  {
    name: "Greece",
    img: "/images/residency/greece/greece-golden-visa.webp",
    href: "/residency/greece",
    tag: "Residency",
  },
  {
    name: "Malta",
    img: "/images/residency/malta/malta-mprp.webp",
    href: "/residency/malta",
    tag: "Residency",
  },
  {
    name: "Grenada",
    img: "/images/citizenship/grenada/grenada-citizenship.webp",
    href: "/citizenship/grenada",
    tag: "Citizenship",
  },
  {
    name: "Turkey",
    img: "/images/citizenship/turkey/turkey.webp",
    href: "/citizenship/turkey",
    tag: "Citizenship",
  },
  {
    name: "St. Kitts & Nevis",
    img: "/images/citizenship/st-kitts-nevis/saintkitts.webp",
    href: "/citizenship/st-kitts-nevis",
    tag: "Citizenship",
  },
  {
    name: "Canada",
    img: "/images/skilled/canada/canada.webp",
    href: "/skilled/canada",
    tag: "Skilled",
  },
  {
    name: "Australia",
    img: "/images/skilled/australia/skilled-australia-xiphias-immigration.webp",
    href: "/skilled/australia",
    tag: "Skilled",
  },
  {
    name: "Singapore",
    img: "/images/residency/singapore/singapore-gip-pr-investment-hero.webp",
    href: "/residency/singapore",
    tag: "Residency",
  },
];

export default function JourneySelector() {
  const [active, setActive] = useState<JourneyId>("residency");
  const reduce = useReducedMotion();

  const activeData = JOURNEY_PATHS.find((p) => p.id === active)!;
  const activeImage = PATH_IMAGE[active];

  return (
    <Section tone="sand" spacing="lg" contained={false}>
      <div className="relative overflow-hidden">
        {/* Ambient drifting glow + faint Emirati lattice texture */}
        <AuroraBackground tone="oasis" intensity={0.5} />
        <LatticeOverlay opacity={0.06} />

        <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6 sm:px-10 xl:px-16">
          {/* Section opener */}
          <SandReveal className="mb-14 max-w-2xl">
            <Reveal>
              <Eyebrow arabic="المسارات" tone="gold">
                Four Pathways
              </Eyebrow>
            </Reveal>
            <h2 className="mt-6 font-sora text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.05] tracking-tight text-ink">
              Choose the route that fits your{" "}
              <ShinyText
                baseColor="#a87d1f"
                shineColor="#f5e6b0"
                speed={4.5}
                className="font-semibold"
              >
                future.
              </ShinyText>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/60">
              Four advisory pathways, each tailored to a different ambition — from
              Emirati residency to a second passport. Select one to explore its
              destinations.
            </p>
            <DrawLine
              d="M0 1 L260 1"
              viewBox="0 0 260 2"
              preserveAspectRatio="none"
              strokeWidth={2}
              duration={1.4}
              className="mt-8 h-px w-44"
            />
          </SandReveal>

          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            {/* ── Pathway list ─────────────────────────────────────────── */}
            <ul
              role="tablist"
              aria-label="Immigration pathways"
              className="flex flex-col"
            >
              {JOURNEY_PATHS.map((path, i) => {
                const isActive = active === path.id;
                return (
                  <li key={path.id} className="relative">
                    <button
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(path.id)}
                      className="group relative flex w-full items-center gap-5 border-t border-gold/45 py-7 text-start transition-colors duration-300 last:border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                    >
                      {/* Active underglow tinted by the per-item accent */}
                      {isActive ? (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-x-0 bottom-0 top-0"
                          style={{
                            background: `linear-gradient(90deg, ${path.accentColor}1f, transparent 70%)`,
                          }}
                        />
                      ) : null}

                      {/* Active gold draw-line on the start edge */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute bottom-0 start-0 top-0 w-px"
                      >
                        <motion.span
                          className="absolute inset-x-0 top-1/2 block w-px -translate-y-1/2 bg-gold"
                          initial={false}
                          animate={{
                            height: isActive ? "100%" : "0%",
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={
                            reduce
                              ? { duration: 0 }
                              : { duration: 0.5, ease: EASE }
                          }
                          style={{
                            boxShadow: isActive
                              ? "0 0 14px 1px rgba(212,175,55,0.7)"
                              : "none",
                          }}
                        />
                      </span>

                      {/* Index number */}
                      <span
                        className={`relative w-9 shrink-0 font-sora text-sm tabular-nums transition-colors duration-300 ${
                          isActive ? "text-gold" : "text-ink/45 group-hover:text-ink/70"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Title + subtitle */}
                      <span className="relative flex-1">
                        <span
                          className={`block font-sora text-xl font-semibold leading-snug tracking-tight transition-colors duration-300 sm:text-2xl ${
                            isActive
                              ? "text-ink"
                              : "text-ink/65 group-hover:text-ink"
                          }`}
                        >
                          {path.title}
                        </span>
                        <span className="mt-1 block text-[13px] text-ink/60">
                          {path.subtitle}
                        </span>
                      </span>

                      {/* Chevron */}
                      <ArrowRight
                        aria-hidden
                        className={`relative size-5 shrink-0 transition-all duration-300 ${
                          isActive
                            ? "text-gold opacity-100"
                            : "-translate-x-1 text-ink/30 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        } rtl:rotate-180`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* ── Detail panel: big editorial image + content ──────────── */}
            <div className="relative">
              {/* Per-vertical hero image — masked reveal, swaps with the active path */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`img-${active}`}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative"
                >
                  <ImageReveal
                    src={activeImage.src}
                    alt={activeImage.alt}
                    ratio="aspect-[16/9]"
                    position={activeImage.position}
                    sizes="(min-width:1024px) 48vw, 100vw"
                    className="border border-gold/30 shadow-[0_24px_60px_-36px_rgba(168,125,31,0.5)]"
                  />
                  {/* gold corner tag with the live programme count */}
                  <span className="pointer-events-none absolute end-4 top-4 rounded-full border border-gold/50 bg-midnight/55 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-pearl backdrop-blur-sm">
                    {activeData.countries.length} destinations
                  </span>
                </motion.div>
              </AnimatePresence>

              <div
                className="relative mt-5 overflow-hidden rounded-3xl border border-gold/45 bg-white p-8 shadow-[0_18px_50px_-30px_rgba(168,125,31,0.4)] sm:p-10"
              >
                {/* Accent corner glow from data */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-colors duration-500"
                  style={{
                    background: `radial-gradient(closest-side, ${activeData.accentColor}33, transparent 70%)`,
                  }}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    role="tabpanel"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="relative flex flex-col"
                  >
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.24em]"
                      style={{ color: activeData.accentColor }}
                    >
                      {activeData.subtitle}
                    </span>
                    <h3 className="mt-3 font-sora text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                      {activeData.title}
                    </h3>
                    <p className="mt-5 text-[15px] leading-relaxed text-ink/60">
                      {activeData.description}
                    </p>

                    {/* Country chips — staggered, gold-bordered */}
                    <div className="mt-8">
                      <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.22em] text-gold_deep">
                        Destinations
                      </span>
                      <ul className="flex flex-wrap gap-2.5">
                        {activeData.countries.map((country, i) => (
                          <motion.li
                            key={country}
                            initial={
                              reduce ? false : { opacity: 0, y: 10, scale: 0.96 }
                            }
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              duration: reduce ? 0 : 0.35,
                              delay: reduce ? 0 : 0.1 + i * 0.06,
                              ease: EASE,
                            }}
                            className="rounded-full border border-gold/45 bg-gold/[0.04] px-4 py-2 text-[13px] font-medium text-ink/85 transition-colors duration-300 hover:border-gold/60 hover:text-ink"
                          >
                            {country}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA — preserves the pathway href */}
                    <div className="pt-10">
                      <Button
                        href={activeData.href}
                        variant="primary"
                        size="md"
                      >
                        Explore {activeData.title}
                        <ArrowRight aria-hidden className="size-4 rtl:rotate-180" />
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── Destinations collection rail ─────────────────────────── */}
          <div className="mt-20">
            <SandReveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow arabic="الوجهات" tone="gold">
                  Destinations
                </Eyebrow>
                <h3 className="mt-4 font-sora text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight tracking-tight text-ink">
                  Ten countries. One advisory desk.
                </h3>
              </div>
              <p className="max-w-xs text-[13.5px] leading-relaxed text-ink/55">
                Swipe through our most sought-after jurisdictions — each backed by a
                live, government-compliant programme.
              </p>
            </SandReveal>

            <ParallaxLayer speed={28} className="hidden lg:block">
              <DestinationRail reduce={!!reduce} />
            </ParallaxLayer>
            <div className="lg:hidden">
              <DestinationRail reduce={!!reduce} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function DestinationRail({ reduce }: { reduce: boolean }) {
  return (
    <CollectionRail className="px-1">
      {DESTINATIONS.map((d, i) => (
        <motion.a
          key={d.name}
          href={d.href}
          aria-label={`Explore ${d.name} programmes`}
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.05, ease: EASE }}
          className="group relative block w-[78vw] shrink-0 snap-start overflow-hidden rounded-3xl border border-gold/30 bg-ink shadow-[0_20px_50px_-32px_rgba(10,14,26,0.7)] sm:w-[300px] lg:w-[330px]"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={d.img}
              alt={`${d.name} — ${d.tag} programme`}
              fill
              sizes="(min-width:1024px) 330px, (min-width:640px) 300px, 78vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            {/* legibility scrim */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent"
            />
            {/* gold edge on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/50"
            />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="inline-block rounded-full border border-gold/50 bg-midnight/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
                {d.tag}
              </span>
              <div className="mt-3 flex items-center justify-between gap-3">
                <h4 className="font-sora text-lg font-semibold leading-tight text-pearl">
                  {d.name}
                </h4>
                <ArrowRight
                  aria-hidden
                  className="size-4 shrink-0 -translate-x-1 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 rtl:rotate-180"
                />
              </div>
            </div>
          </div>
        </motion.a>
      ))}
    </CollectionRail>
  );
}
