"use client";

import { KenBurns, ImageReveal, SplitText, Reveal } from "@/components/motion";
import { Eyebrow } from "@/components/ui";

type Stat = { value: string; label: string };

type Props = {
  /** Uppercase Latin kicker, e.g. "Insights & Stories". */
  eyebrow: string;
  /** Optional Arabic calligraphic word for the eyebrow. */
  arabic?: string;
  /** Large display title (animated word-by-word). */
  title: string;
  /** Supporting paragraph under the title. */
  description: string;
  /** Full-bleed hero image (verified to exist in /public). */
  image: string;
  /** Alt text for the hero image. */
  imageAlt: string;
  /** object-position for the hero image, e.g. "center 35%". */
  imagePosition?: string;
  /** Optional small framed image on the right (light editorial accent). */
  asideImage?: string;
  asideAlt?: string;
  /** Optional facts shown as a gold-ruled stat row. */
  stats?: Stat[];
};

/**
 * ListHero — the cinematic editorial opener shared by the content list pages
 * (blog / news / articles / media / insights). A DARK full-bleed KenBurns image
 * behind a midnight scrim, a SplitText display title, gold eyebrow + Arabic,
 * and an optional LIGHT framed aside image with stat facts. Reduced-motion safe
 * via the underlying primitives.
 */
export default function ListHero({
  eyebrow,
  arabic,
  title,
  description,
  image,
  imageAlt,
  imagePosition = "center",
  asideImage,
  asideAlt,
  stats,
}: Props) {
  return (
    <section className="relative -mx-4 mb-10 overflow-hidden bg-midnight text-pearl sm:mb-14">
      {/* DARK full-bleed cinematic ground */}
      <KenBurns
        src={image}
        alt={imageAlt}
        priority
        position={imagePosition}
        sizes="100vw"
        className="absolute inset-0 h-full w-full"
      />
      {/* legibility scrims */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/35 to-transparent"
      />
      {/* gold hairline at base */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
      />

      <div className="relative mx-auto grid w-full max-w-screen-xl items-center gap-8 px-4 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        {/* Copy column */}
        <div className="max-w-2xl">
          <Eyebrow arabic={arabic} className="mb-5">
            {eyebrow}
          </Eyebrow>

          <h1 className="font-sora text-[clamp(2.4rem,7vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-white">
            <SplitText text={title} />
          </h1>

          <Reveal delay={0.35}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-pearl/70 sm:text-base">
              {description}
            </p>
          </Reveal>

          {stats && stats.length > 0 && (
            <Reveal delay={0.5}>
              <dl className="mt-9 flex flex-wrap items-stretch gap-x-8 gap-y-4 border-t border-gold/25 pt-6">
                {stats.map((s) => (
                  <div key={s.label} className="min-w-[6rem]">
                    <dt className="font-sora text-2xl font-semibold text-gold sm:text-3xl">
                      {s.value}
                    </dt>
                    <dd className="mt-1 text-[11px] uppercase tracking-[0.22em] text-pearl/50">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>

        {/* LIGHT framed editorial aside */}
        {asideImage && (
          <div className="hidden lg:block">
            <div className="relative ms-auto w-full max-w-sm rounded-[1.75rem] border border-gold/30 bg-white/5 p-2.5 backdrop-blur-sm">
              <ImageReveal
                src={asideImage}
                alt={asideAlt || imageAlt}
                ratio="aspect-[4/5]"
                sizes="(min-width:1024px) 24rem, 0px"
                className="rounded-[1.4rem]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-3 -left-3 h-16 w-16 rounded-full bg-gold/15 blur-xl"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
