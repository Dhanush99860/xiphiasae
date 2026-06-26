"use client";

/**
 * TrustEmbassy — DARK cinematic credibility band.
 *
 * A full-bleed Dubai cityscape (KenBurns) under layered scrims carries an
 * asymmetric "stat wall" of dark glass tiles. Each stat string is parsed into a
 * number that counts up on scroll-in via <Counter>. The drama is high; the
 * content (six proof points + a credentials strip) is fully preserved.
 * Reduced-motion safe (all motion primitives honour the global rule).
 */

import { Eyebrow } from "@/components/ui";
import {
  Counter,
  LatticeOverlay,
  Reveal,
  SplitText,
  SandReveal,
  Stagger,
  StaggerItem,
  TiltCard,
  DrawLine,
  KenBurns,
} from "@/components/motion";
import { TRUST_POINTS } from "./data";

/** Split a stat string (e.g. "4,500+", "98%", "3") into a number + suffix. */
function parseStat(stat: string): { to: number; suffix: string } {
  const to = Number(stat.replace(/[^0-9.]/g, "")) || 0;
  const suffix = stat.replace(/[0-9.,]/g, "");
  return { to, suffix };
}

/**
 * Layout rhythm: indices 1 (4,500+ Families) and 2 (98% Approval) are the
 * featured, wider tiles. The asymmetric span map breaks the 6-equal-card grid.
 */
const SPAN: Record<number, string> = {
  0: "lg:col-span-4",
  1: "lg:col-span-8", // featured — Family Relocation
  2: "lg:col-span-7", // featured — Success Rate
  3: "lg:col-span-5",
  4: "lg:col-span-6",
  5: "lg:col-span-6",
};

export default function TrustEmbassy() {
  return (
    <section
      className="relative w-full overflow-hidden bg-midnight py-24 text-pearl lg:py-32"
      aria-label="Trust and credentials"
    >
      {/* ── Full-bleed cinematic cityscape behind everything ── */}
      <div aria-hidden className="absolute inset-0">
        <KenBurns
          src="/images/blogs/why-dubai-dominating.webp"
          alt=""
          className="h-full w-full"
          sizes="100vw"
          duration={30}
          position="center 40%"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/88 to-midnight" />
        <div className="absolute inset-0 bg-midnight/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(212,175,55,0.12)_0%,transparent_58%)]" />
      </div>

      <LatticeOverlay opacity={0.05} />

      {/* Top hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 sm:px-10 xl:px-16">
        {/* ── Header ───────────────────────────────────────────── */}
        <SandReveal className="max-w-3xl">
          <Reveal>
            <Eyebrow tone="gold" arabic="الثقة">
              Why XIPHIAS
            </Eyebrow>
          </Reveal>

          <SplitText
            text="A credential, not a claim."
            delay={0.08}
            className="mt-6 text-balance font-sora text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-pearl"
          />

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-pearl/65">
              We operate as a private advisory firm, not a visa processing shop.
              Every engagement across the Emirates and beyond is compliance-first,
              family-aware, and advisor-led.
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
        </SandReveal>

        {/* ── Asymmetric stat wall ─────────────────────────────── */}
        <Stagger
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12"
          amount={0.15}
        >
          {TRUST_POINTS.map((point, i) => {
            const { to, suffix } = parseStat(point.stat);
            const featured = i === 1 || i === 2;
            return (
              <StaggerItem
                key={point.title}
                className={SPAN[i] ?? "lg:col-span-4"}
              >
                <TiltCard max={6} className="h-full">
                  <article
                    className={[
                      "group relative flex h-full flex-col overflow-hidden rounded-3xl",
                      "border border-gold/30 bg-ink/45 backdrop-blur-md shadow-[0_24px_60px_-34px_rgba(0,0,0,0.8)]",
                      "transition-colors duration-500 hover:border-gold/60",
                      featured ? "p-8 sm:p-10" : "p-7",
                    ].join(" ")}
                  >
                    {/* hover underglow — a gold line, never a flat fill */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    {/* Big count-up number */}
                    <div className="flex items-baseline gap-2">
                      <Counter
                        to={to}
                        suffix={suffix}
                        className={[
                          "font-sora font-semibold leading-none tracking-tight text-gold",
                          featured
                            ? "text-[clamp(3.25rem,7vw,5.5rem)]"
                            : "text-[clamp(2.5rem,5vw,3.5rem)]",
                        ].join(" ")}
                      />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                        {point.statLabel}
                      </span>
                    </div>

                    {/* Title + description */}
                    <h3
                      className={[
                        "mt-6 font-sora font-medium text-pearl",
                        featured ? "text-xl sm:text-2xl" : "text-base",
                      ].join(" ")}
                    >
                      {point.title}
                    </h3>
                    <p
                      className={[
                        "mt-2 text-pearl/60",
                        featured
                          ? "max-w-md text-[15px] leading-relaxed"
                          : "text-[13.5px] leading-relaxed",
                      ].join(" ")}
                    >
                      {point.description}
                    </p>
                  </article>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* ── Credentials strip ────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-gold/30 pt-8">
            {[
              "AML & KYC Compliant",
              "Source-of-Funds Guidance",
              "Family Relocation Support",
              "Licensed Across Jurisdictions",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-[12px] font-medium text-pearl/60"
              >
                <svg
                  className="size-3.5 flex-shrink-0 text-gold"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm2.77 4.47-3 3a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 1 1 1.06-1.06l.97.97 2.47-2.47a.75.75 0 0 1 1.06 1.06Z" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
