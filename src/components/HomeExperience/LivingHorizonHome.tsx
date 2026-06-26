"use client";

/**
 * LivingHorizonHome — the "Living Horizon" Home, rebuilt to the approved
 * INTERACTION_SPEC.json: one night→day background canvas + a varied, hover-rich,
 * scroll-driven interaction system. Every section ARRIVES via its own distinct
 * grammar (no slide-in-once), there is one pinned text-swap, one velocity marquee,
 * scroll-scrubbed counters, a signature dawn cursor that lifts the night off the
 * photo beneath your hand, spotlight + passport-seal destination cards, and a
 * single canonical gold button language. Mobile-light + reduced-motion safe.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Eyebrow } from "@/components/ui";
import {
  HorizonCanvas,
  DawnCursor,
  DawnMeter,
  IrisReveal,
  LightWindow,
  GoldSweepButton,
  PinnedVerbSwap,
  VelocityMarquee,
  ScrubReveal3D,
  OdometerTally,
  PassportSeal,
  ParallaxLayer,
  ParallaxBackdrop,
  KenBurns,
  CollectionRail,
  SplitText,
  TextType,
  ShinyText,
  Reveal,
  Magnetic,
  DrawLine,
} from "@/components/motion";
import type { VerbState } from "@/components/motion/PinnedVerbSwap";

const IMG = {
  residency: "/images/residency/uae/uae-golden-visa.webp",
  citizenship: "/images/citizenship/grenada/grenada-citizenship.webp",
  skilled: "/images/residency/singapore/singapore-gip-pr-investment-hero.webp",
  corporate: "/images/corporate/uae/dubai-corporate-immigration.webp",
} as const;

const VERB_STATES: VerbState[] = [
  { verb: "LIVE", name: "Residency", href: "/residency", tag: "Golden visas", img: IMG.residency },
  { verb: "BELONG", name: "Citizenship", href: "/citizenship", tag: "Second passport", img: IMG.citizenship },
  { verb: "WORK", name: "Skilled", href: "/skilled", tag: "PR pathways", img: IMG.skilled },
  { verb: "BUILD", name: "Corporate", href: "/corporate", tag: "Workforce mobility", img: IMG.corporate },
];

type PathMode = "curtain" | "shutter" | "blurscale" | "hpan";
const PATHWAYS: {
  no: string; eyebrow: string; label: string; line: string; stat: string;
  href: string; img: string; mode: PathMode;
}[] = [
  { no: "01", eyebrow: "Investment-backed", label: "Residency", line: "Golden Visas and residency-by-investment — long-term status, world-class healthcare and the freedom to come and go.", stat: "5 countries · 2–8 months", href: "/residency", img: IMG.residency, mode: "curtain" },
  { no: "02", eyebrow: "A second passport", label: "Citizenship", line: "Citizenship by investment — visa-free access to 140+ countries, secured for you and your family for life.", stat: "140+ visa-free · 4–6 months", href: "/citizenship", img: IMG.citizenship, mode: "shutter" },
  { no: "03", eyebrow: "Merit-based", label: "Skilled", line: "Points-based and employer-sponsored routes to permanent residency in the world's most sought-after economies.", stat: "PR pathways · 12–24 months", href: "/skilled", img: IMG.skilled, mode: "blurscale" },
  { no: "04", eyebrow: "For enterprise", label: "Corporate", line: "Intra-company transfers, work authorisations and relocation programmes for multinational teams.", stat: "Global workforce mobility", href: "/corporate", img: IMG.corporate, mode: "hpan" },
];

const DESTINATIONS = [
  { name: "United Arab Emirates", tag: "Golden Visa", href: "/residency/uae", img: IMG.residency },
  { name: "Portugal", tag: "Golden Visa", href: "/residency/portugal", img: "/images/residency/portugal/portugal-golden-visa.webp" },
  { name: "Grenada", tag: "Citizenship", href: "/citizenship/grenada", img: IMG.citizenship },
  { name: "Greece", tag: "Golden Visa", href: "/residency/greece", img: "/images/residency/greece/greece-golden-visa.webp" },
  { name: "Malta", tag: "Residency", href: "/residency/malta", img: "/images/residency/malta/malta-mprp.webp" },
  { name: "Turkey", tag: "Citizenship", href: "/citizenship/turkey", img: "/images/citizenship/turkey/turkey.webp" },
] as const;

const RIBBON = [
  "17+ YEARS ADVISING", "10,000+ FAMILIES GUIDED", "98% APPROVAL RATE",
  "35 DESTINATIONS", "LICENSED ADVISORS", "DUBAI · LONDON · BENGALURU",
];

const STEPS = [
  { no: "01", title: "Tell us your goal", line: "A two-minute brief — where you want to be, your budget and your timeline.", detail: "No documents needed yet. Just your ambition and a few facts." },
  { no: "02", title: "XIA maps your routes", line: "Our intelligence engine ranks every eligible pathway by cost, speed and certainty.", detail: "Side-by-side: investment, timeline, family inclusion and passport power." },
  { no: "03", title: "A licensed advisor takes over", line: "One trusted desk runs your case end-to-end, from filing to landing.", detail: "Filing, liaison and follow-through — handled, in writing, by name." },
];

const STATS = [
  { to: 17, suffix: "+", label: "Years advising" },
  { to: 25, suffix: "+", label: "Countries served" },
  { to: 10000, suffix: "+", label: "Families guided" },
  { to: 98, suffix: "%", label: "Approval rate" },
] as const;

const METER_SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "what", label: "Purpose" },
  { id: "pathways", label: "Pathways" },
  { id: "destinations", label: "Destinations" },
  { id: "how", label: "How it works" },
  { id: "proof", label: "Proof" },
  { id: "cta", label: "Begin" },
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Spotlight: write pointer position to the element's --mx/--my (radial overlays read it). */
function spotlight(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
  el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
}

export default function LivingHorizonHome() {
  return (
    <div className="relative">
      <DawnCursor />
      <HorizonCanvas />
      <DawnMeter sections={METER_SECTIONS} />

      <div className="relative z-10">
        {/* ─── 1 · HERO [night] ─────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-transparent px-6 py-28 text-center text-pearl"
        >
          {/* Immersive full-bleed parallax scene — irises open on load, then dawn
              reveals the city beneath your hand as you move the cursor */}
          <div className="absolute inset-0 z-0">
            <IrisReveal immediate duration={1.6} className="absolute inset-0">
              <LightWindow edgeGlow demo overlayOpacity={0.28} className="h-full w-full">
                <ParallaxLayer speed={120} className="absolute -inset-y-[16%] inset-x-0">
                  <KenBurns
                    src="/images/citizenship/dubai/dubai-country-image.webp"
                    alt="Dubai at first light"
                    className="h-full w-full"
                    sizes="100vw"
                    priority
                    duration={38}
                    position="center 38%"
                  />
                </ParallaxLayer>
                {/* lighter, bottom-anchored scrim so the skyline stays visible while text reads */}
                <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,18,0.55)_0%,rgba(7,10,18,0.08)_38%,rgba(7,10,18,0.8)_100%)]" />
              </LightWindow>
            </IrisReveal>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <Reveal y={14}>
              <Eyebrow tone="gold" arabic="عالمك بلا حدود" className="justify-center">
                XIPHIAS Immigration · Dubai
              </Eyebrow>
            </Reveal>

            <h1 className="mt-8 max-w-4xl text-[clamp(2.8rem,8.5vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] [text-shadow:0_2px_40px_rgba(0,0,0,0.55)]">
              <SplitText text="Your world," className="block" />
              <span className="block text-gold">
                <SplitText text="without borders." delay={0.18} />
              </span>
            </h1>

            <Reveal delay={0.5} y={12}>
              <p className="mx-auto mt-8 max-w-xl text-[15px] leading-relaxed text-pearl/85 [text-shadow:0_1px_20px_rgba(0,0,0,0.5)] sm:text-base">
                We open the door to{" "}
                <TextType
                  className="font-medium text-pearl"
                  text={["residency by investment.", "a second passport.", "skilled migration.", "global relocation."]}
                />
              </p>
            </Reveal>

            <Reveal delay={0.65} y={12}>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <GoldSweepButton href="/eligibility">
                  Start your assessment
                  <ArrowRight className="size-4" aria-hidden />
                </GoldSweepButton>
                <GoldSweepButton href="/countries" variant="ghost" className="text-pearl">
                  Explore destinations
                </GoldSweepButton>
              </div>
            </Reveal>
          </div>

          {/* Scroll cue */}
          <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-pearl/55">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
            <span aria-hidden className="block h-10 w-px bg-gradient-to-b from-gold/70 to-transparent" />
          </div>
        </section>

        {/* ─── 2 · WHAT WE DO [night→dawn] · pinned verb-swap ───────────── */}
        <section id="what" className="bg-transparent">
          <PinnedVerbSwap
            states={VERB_STATES}
            bgSrc="/images/blogs/why-dubai-dominating.webp"
            bgTone="dawn"
            eyebrow={
              <Eyebrow tone="gold" arabic="ماذا نفعل" className="justify-center">
                What we do
              </Eyebrow>
            }
          />
        </section>

        {/* ─── 3 · PATHWAYS [dawn] · four distinct entrances ───────────── */}
        <section id="pathways" className="relative bg-transparent px-6 py-16 text-pearl">
          <Container>
            <div className="flex flex-col gap-28 lg:gap-44">
              {/* Block 1 — full-width signature LightWindow, text overlaid */}
              <ScrubReveal3D mode={PATHWAYS[0].mode}>
                <Link
                  href={PATHWAYS[0].href}
                  data-cursor="link"
                  className="group relative block aspect-[16/10] w-full overflow-hidden rounded-3xl ring-1 ring-pearl/15 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.7)] sm:aspect-[16/8]"
                >
                  <LightWindow edgeGlow className="h-full w-full">
                    <ParallaxLayer speed={40} className="absolute -inset-y-[12%] inset-x-0">
                      <KenBurns src={PATHWAYS[0].img} alt={PATHWAYS[0].label} className="h-full w-full" sizes="100vw" duration={26} position="center 45%" />
                    </ParallaxLayer>
                    <div aria-hidden className="absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </LightWindow>
                  <div className="absolute inset-x-0 bottom-0 z-[3] p-8 sm:p-12">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-gold">{PATHWAYS[0].no} — {PATHWAYS[0].eyebrow}</p>
                    <h3 className="mt-3 text-[clamp(2.4rem,7vw,4.5rem)] font-semibold leading-[0.9] tracking-[-0.02em]">{PATHWAYS[0].label}</h3>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-pearl/80">{PATHWAYS[0].line}</p>
                    <span className="mt-5 inline-flex items-center gap-3 text-[15px] font-semibold text-gold">
                      {PATHWAYS[0].stat}
                      <span className="text-pearl/70 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180">→</span>
                    </span>
                  </div>
                </Link>
              </ScrubReveal3D>

              {/* Blocks 2-4 — mirrored two-column, distinct entrances, caption-slide hover */}
              {PATHWAYS.slice(1).map((p, idx) => {
                const flip = idx % 2 === 0; // block2 image right
                return (
                  <ScrubReveal3D key={p.label} mode={p.mode}>
                    <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                      <Link
                        href={p.href}
                        data-cursor="link"
                        onPointerMove={spotlight}
                        className="group relative block aspect-[5/4] w-full overflow-hidden rounded-3xl ring-1 ring-pearl/15 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.7)]"
                        style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
                      >
                        <ParallaxLayer speed={40} className="absolute -inset-y-[12%] inset-x-0">
                          <KenBurns src={p.img} alt={p.label} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]" sizes="(min-width:1024px) 36rem, 100vw" duration={26} position="center 45%" />
                        </ParallaxLayer>
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                        {/* caption slides up on hover (content, not glow) */}
                        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-[12px] font-semibold text-gold backdrop-blur-sm">
                            {p.stat}
                          </span>
                        </div>
                      </Link>

                      <div className={flip ? "lg:pe-4" : "lg:ps-4"}>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-gold">{p.no} — {p.eyebrow}</p>
                        <h3 className="mt-4 text-[clamp(2.2rem,6vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.02em]">{p.label}</h3>
                        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-pearl/72">{p.line}</p>
                        <div className="mt-8">
                          <GoldSweepButton href={p.href} variant="ghost" className="text-pearl">
                            Explore {p.label}
                          </GoldSweepButton>
                        </div>
                      </div>
                    </div>
                  </ScrubReveal3D>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ─── 4 · DESTINATIONS [dawn→day] · velocity ribbon + spotlight rail ─ */}
        <section id="destinations" className="relative overflow-hidden bg-transparent py-24 lg:py-32">
          {/* velocity-aware credential ribbon */}
          <VelocityMarquee
            className="border-y border-gold/15 py-4"
            items={RIBBON.map((t) => (
              <span key={t} className="inline-flex items-center gap-10 text-[13px] font-semibold uppercase tracking-[0.28em] text-pearl/70">
                {t}
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
            ))}
          />

          <Container>
            <div className="mb-12 mt-16 flex flex-wrap items-end justify-between gap-4">
              <div>
                <Reveal>
                  <Eyebrow tone="gold" arabic="الوجهات">The collection</Eyebrow>
                </Reveal>
                <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1] tracking-[-0.02em] text-pearl [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]">
                  Where we take you.
                </h2>
              </div>
              <GoldSweepButton href="/countries" variant="ghost" className="text-gold">
                All 35 destinations
              </GoldSweepButton>
            </div>
          </Container>

          <Container className="!max-w-none !px-0">
            <CollectionRail className="group/rail px-6 lg:px-10">
              {DESTINATIONS.map((d) => (
                <Link
                  key={d.name}
                  href={d.href}
                  data-cursor="link"
                  onPointerMove={spotlight}
                  className="group relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl ring-1 ring-pearl/10 transition-[filter,transform] duration-300 active:scale-[0.99] group-hover/rail:saturate-[.55] hover:!saturate-100 sm:w-[52vw] lg:w-[28rem]"
                  style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                    <KenBurns src={d.img} alt={d.name} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.05]" sizes="(min-width:1024px) 28rem, 78vw" duration={24} />
                  </div>
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  {/* spotlight follows cursor */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(16rem 16rem at var(--mx) var(--my), rgba(232,200,150,0.18), transparent 60%)", mixBlendMode: "screen" }} />
                  {/* passport seal on dwell */}
                  <PassportSeal id={slug(d.name)} label={d.name} />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{d.tag}</p>
                    <h3 className="mt-1.5 text-[22px] font-semibold leading-tight text-white">{d.name}</h3>
                    <span className="mt-2 inline-flex translate-y-1 items-center gap-1.5 text-[13px] font-medium text-white/80 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      Explore <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </CollectionRail>
          </Container>
        </section>

        {/* ─── 5 · HOW XIA WORKS [day] · glass panel, sequence + spotlight ─ */}
        <section id="how" className="relative bg-transparent px-6 py-24 lg:py-32">
          <Container>
            <Reveal y={28} amount={0.3}>
              <div className="mx-auto max-w-5xl rounded-[2rem] bg-pearl/85 p-8 shadow-[0_30px_90px_-40px_rgba(20,30,50,0.35)] ring-1 ring-ink/5 backdrop-blur-xl transition-transform sm:p-12 lg:p-16">
                <div className="text-center">
                  <Reveal>
                    <Eyebrow tone="gold" arabic="كيف نعمل" className="justify-center">How it works</Eyebrow>
                  </Reveal>
                  <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.8rem,4.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
                    One brief. Every route, ranked. One desk to run it.
                  </h2>
                </div>

                <div className="mt-14 grid gap-6 sm:grid-cols-3">
                  {STEPS.map((s, i) => (
                    <Reveal key={s.no} delay={i * 0.12} y={20}>
                      <div
                        onPointerMove={spotlight}
                        className="group relative h-full overflow-hidden rounded-2xl border border-ink/5 bg-white/40 p-6 transition-transform duration-300 hover:-translate-y-1"
                        style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
                      >
                        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(12rem 12rem at var(--mx) var(--my), rgba(212,175,55,0.16), transparent 60%)" }} />
                        <div className="relative">
                          <div className="flex items-center gap-3">
                            <span className="text-[13px] font-semibold tracking-widest text-gold_deep transition-colors group-hover:text-gold">{s.no}</span>
                            {i < STEPS.length - 1 ? (
                              <DrawLine d="M0 1 L200 1" viewBox="0 0 200 2" preserveAspectRatio="none" strokeWidth={1.5} delay={0.3 + i * 0.12} className="hidden h-px flex-1 sm:block" />
                            ) : null}
                          </div>
                          <h3 className="mt-3 text-lg font-semibold text-ink">{s.title}</h3>
                          <p className="mt-2 text-[14px] leading-relaxed text-ink/65">{s.line}</p>
                          {/* content-expand on hover */}
                          <p className="mt-0 max-h-0 overflow-hidden text-[13px] leading-relaxed text-ink/55 opacity-0 transition-all duration-500 group-hover:mt-3 group-hover:max-h-24 group-hover:opacity-100">
                            {s.detail}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <div className="mt-12 flex justify-center">
                  <GoldSweepButton href="/eligibility">
                    Map my routes with XIA
                    <ArrowRight className="size-4" aria-hidden />
                  </GoldSweepButton>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* ─── 6 · PROOF [day] · scroll-scrubbed tally ──────────────────── */}
        <section id="proof" className="relative isolate overflow-hidden bg-transparent px-6 py-24 lg:py-28">
          <ParallaxBackdrop src="/images/blogs/dubai.webp" tone="day" speed={60} position="center 35%" />
          <Container className="relative z-10">
            <div className="text-center">
              <Reveal>
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-gold_deep">A credential, not a claim</p>
              </Reveal>
              <div className="mt-12 grid grid-cols-2 gap-y-12 sm:gap-y-16 lg:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label} className="group">
                    <div className="text-[clamp(2.6rem,6vw,4.25rem)] font-semibold leading-none text-ink">
                      <OdometerTally to={s.to} suffix={s.suffix} />
                    </div>
                    <div className="mt-3 text-[12px] uppercase tracking-[0.18em] text-ink/50 transition-all duration-300 group-hover:tracking-[0.26em] group-hover:text-ink/70">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ─── 7 · FINAL CTA [day] · light-bloom arrival ────────────────── */}
        <section id="cta" className="relative bg-transparent px-6 pb-32 pt-10 lg:pb-40">
          <Container>
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <BloomGlow />
              <Reveal y={14}>
                <Eyebrow tone="gold" arabic="مستقبلك" className="justify-center">Your next move</Eyebrow>
              </Reveal>
              <DrawLine d="M2 6 C 60 0, 140 0, 198 6" viewBox="0 0 200 12" className="mt-8 h-3 w-44" strokeWidth={1.5} duration={1.4} />
              <h2 className="mt-7 text-[clamp(2.1rem,6vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-ink">
                <SplitText text="Your global future" className="block" />
                <span className="mt-1 block">
                  <SplitText text="starts " delay={0.2} />
                  <ShinyText baseColor="#a87d1f" shineColor="#e1b923" speed={4} className="font-semibold">here</ShinyText>
                </span>
              </h2>
              <Reveal delay={0.45} y={12}>
                <p lang="ar" dir="rtl" className="mt-6 font-arabic-display text-2xl leading-none text-gold_deep sm:text-3xl">
                  مستقبلك العالمي يبدأ من هنا
                </p>
              </Reveal>
              <Reveal delay={0.55} y={12}>
                <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-ink/65">
                  Tell us your goal. Our licensed advisors will map the most secure, cost-effective
                  pathway — from the Emirates to the world — and pair you with the desk best suited to your case.
                </p>
              </Reveal>
              <Reveal delay={0.68} y={12}>
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <GoldSweepButton href="/eligibility">
                    Start your assessment
                    <ArrowRight className="size-4" aria-hidden />
                  </GoldSweepButton>
                  <Link
                    href="/booking"
                    data-cursor="link"
                    className="group relative inline-flex items-center gap-2 rounded-full border border-gold/40 px-7 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                  >
                    Book a consultation
                  </Link>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
}

/* One-time gold light-bloom behind the final CTA (full daybreak). */
function BloomGlow() {
  return (
    <Reveal y={0} amount={0.4}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.18), transparent 62%)" }}
      />
    </Reveal>
  );
}
