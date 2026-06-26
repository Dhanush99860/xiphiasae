"use client";

import { Eyebrow } from "@/components/ui";
import {
  Reveal,
  SplitText,
  SandReveal,
  DrawLine,
  LatticeOverlay,
  ImageReveal,
  ParallaxLayer,
} from "@/components/motion";

import { PROCESS_STEPS } from "./data";

/**
 * PassportProcess — LIGHT editorial journey timeline with imagery.
 *
 * A warm sand band: an editorial opener with a big parallaxed lifestyle image,
 * then a vertical gold-spine timeline where each of the six stages carries its
 * own masked ImageReveal so the process reads as a cinematic story — first
 * meeting through landing day — not a flat list. Reduced-motion safe; content is
 * always present and only the spine draw + reveals are motion.
 */

// Per-step editorial imagery (verified real files in public/images).
const STEP_IMAGE: Record<string, { src: string; alt: string }> = {
  "01": {
    src: "/images/blogs/immigration-consultants-xiphias.webp",
    alt: "Advisor reviewing a client profile at the XIPHIAS desk",
  },
  "02": {
    src: "/images/articles/australia-pr-process-guide.webp",
    alt: "Route strategy mapped against a client's profile",
  },
  "03": {
    src: "/images/blogs/required-documents-visa.webp",
    alt: "Legal, financial and identity documents prepared for filing",
  },
  "04": {
    src: "/images/blogs/canadian-immigration-consultant.webp",
    alt: "Licensed advisor preparing a government-compliant submission",
  },
  "05": {
    src: "/images/blogs/dubai-immigration.webp",
    alt: "Managed communication with authorities through to approval",
  },
  "06": {
    src: "/images/blogs/family-unity.webp",
    alt: "A family settling into life in the Emirates after landing",
  },
};

export default function PassportProcess() {
  return (
    <section
      className="relative w-full overflow-hidden bg-sand py-24 text-ink lg:py-28"
      aria-label="Immigration journey process"
    >
      {/* Faint Emirati lattice so the sand band has texture, not flat fill */}
      <LatticeOverlay opacity={0.06} />

      {/* Top + bottom gold hairlines tie the band to the global scroll guide */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6 sm:px-10 xl:px-16">
        {/* ── Editorial header: copy + parallaxed opener image ───────────── */}
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow tone="gold" arabic="رحلتك">
                The Journey
              </Eyebrow>
            </Reveal>

            <h2 className="mt-6 font-sora text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-ink">
              <SplitText text="From first meeting" />
              <br />
              <span className="text-gold_deep">
                <SplitText text="to landing day" delay={0.18} />
              </span>
            </h2>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink/60">
                A licensed, single-desk advisory process — six considered stages that
                carry your file from first conversation through to settling into the
                Emirates and beyond.
              </p>
            </Reveal>

            <DrawLine
              d="M0 1 L260 1"
              viewBox="0 0 260 2"
              preserveAspectRatio="none"
              strokeWidth={2}
              duration={1.4}
              delay={0.2}
              className="mt-8 h-px w-44"
            />
          </div>

          {/* Opener image — drifts on scroll for depth (desktop only) */}
          <ParallaxLayer speed={36} className="hidden lg:block">
            <ImageReveal
              src="/images/blogs/dubai-expat-destination.webp"
              alt="A family arriving in the Emirates at the start of their journey"
              ratio="aspect-[4/5]"
              position="center"
              sizes="(min-width:1024px) 38vw, 100vw"
              className="border border-gold/30 shadow-[0_24px_64px_-38px_rgba(168,125,31,0.5)]"
            />
          </ParallaxLayer>
        </div>

        {/* ── Timeline — alternating editorial rows with imagery ─────────── */}
        <div className="relative mt-20">
          {/* Static spine track — always present so the layout is stable. */}
          <div
            aria-hidden
            className="absolute bottom-2 start-[19px] top-2 w-px bg-gradient-to-b from-gold/40 via-gold/55 to-gold/25 sm:start-[27px] lg:start-1/2 lg:-translate-x-1/2"
          />

          {/* Gold filament that draws DOWN the spine on scroll. */}
          <DrawLine
            d="M1 0 L1 1000"
            viewBox="0 0 2 1000"
            preserveAspectRatio="none"
            strokeWidth={2}
            duration={2.2}
            className="pointer-events-none absolute bottom-2 start-[19px] top-2 h-[calc(100%-1rem)] w-px overflow-visible sm:start-[27px] lg:start-1/2 lg:-translate-x-1/2"
          />

          <ol className="space-y-12 sm:space-y-16 lg:space-y-24">
            {PROCESS_STEPS.map((step, i) => {
              const img = STEP_IMAGE[step.number];
              const imageRight = i % 2 === 0; // alternate sides on desktop
              return (
                <li
                  key={step.number}
                  className="relative ps-16 sm:ps-24 lg:ps-0"
                >
                  {/* Node dot on the spine — lights as the row reveals */}
                  <Reveal
                    delay={0.05}
                    y={0}
                    className="absolute start-0 top-1.5 sm:top-2 lg:start-1/2 lg:top-0 lg:-translate-x-1/2"
                  >
                    <span className="relative flex h-10 w-10 items-center justify-center sm:h-[55px] sm:w-[55px]">
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-gold/20 blur-md"
                      />
                      <span className="relative flex h-3 w-3 items-center justify-center rounded-full border border-gold bg-pearl shadow-[0_0_0_4px_rgba(232,220,200,1),0_0_16px_rgba(212,175,55,0.7)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      </span>
                    </span>
                  </Reveal>

                  {/* Desktop two-column editorial row; single column below lg */}
                  <div
                    className={`lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 ${
                      imageRight ? "" : "lg:[&>*:first-child]:order-2"
                    }`}
                  >
                    {/* Copy block — emerges from the sand */}
                    <SandReveal
                      delay={0.08}
                      y={32}
                      blur={8}
                      className={`relative ${imageRight ? "lg:pe-6 lg:text-end" : "lg:ps-6"}`}
                    >
                      {/* Ghosted gold number */}
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute -top-12 select-none font-sora text-[5.5rem] font-bold leading-none text-gold_deep/20 sm:text-[7rem] ${
                          imageRight
                            ? "start-0 lg:start-auto lg:end-0"
                            : "start-0"
                        }`}
                      >
                        {step.number}
                      </span>

                      <div
                        className={`relative flex items-center gap-3 ${
                          imageRight ? "lg:flex-row-reverse" : ""
                        }`}
                      >
                        <span className="font-sora text-xs font-semibold tracking-[0.22em] text-gold_deep">
                          STEP {step.number}
                        </span>
                        <span
                          aria-hidden
                          className="h-px flex-1 bg-gradient-to-r from-gold/50 to-transparent"
                        />
                      </div>

                      <h3 className="relative mt-3 font-sora text-[clamp(1.25rem,2.4vw,1.6rem)] font-semibold leading-tight tracking-tight text-ink">
                        {step.title}
                      </h3>

                      <p
                        className={`relative mt-2 max-w-md text-[15px] leading-relaxed text-ink/60 ${
                          imageRight ? "lg:ms-auto" : ""
                        }`}
                      >
                        {step.description}
                      </p>

                      {/* Closing flourish under the final step */}
                      {i === PROCESS_STEPS.length - 1 ? (
                        <span
                          lang="ar"
                          dir="rtl"
                          className="relative mt-4 inline-block font-arabic-display text-lg text-gold_deep"
                        >
                          أهلاً بكم في الإمارات
                        </span>
                      ) : null}
                    </SandReveal>

                    {/* Stage image — masked reveal (desktop + tablet) */}
                    {img ? (
                      <div className="mt-6 lg:mt-0">
                        <ParallaxLayer speed={i % 2 === 0 ? 24 : -24} className="hidden lg:block">
                          <ImageReveal
                            src={img.src}
                            alt={img.alt}
                            ratio="aspect-[16/11]"
                            position="center"
                            sizes="(min-width:1024px) 42vw, 90vw"
                            className="border border-gold/30 shadow-[0_20px_54px_-36px_rgba(168,125,31,0.5)]"
                          />
                        </ParallaxLayer>
                        {/* Mobile/tablet: static reveal, no parallax weight */}
                        <div className="lg:hidden">
                          <ImageReveal
                            src={img.src}
                            alt={img.alt}
                            ratio="aspect-[16/10]"
                            position="center"
                            sizes="90vw"
                            className="border border-gold/30 shadow-[0_16px_44px_-32px_rgba(168,125,31,0.5)]"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
