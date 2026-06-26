// ==============================================
// components/team/Hero.tsx – navy/gold Spotlight hero with featured MD
// ==============================================
"use client";
import React from "react";
import Link from "next/link";
import { Person } from "@/components/Team/team";
import { Avatar } from "@/components/Team/Avatar";
import { SocialLink } from "./_Social";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

type HeroProps = {
  title: string;
  subtitle: string;
  primaryHref: string;
  primaryText: string;
  secondaryHref: string;
  secondaryText: string;
  badge?: string;
  featured?: Person;
  serifClass?: string;
};

export function Hero({ title, subtitle, primaryHref, primaryText, secondaryHref, secondaryText, badge = "", featured, serifClass = "" }: HeroProps) {
  const isPdf = typeof secondaryHref === "string" && secondaryHref.endsWith(".pdf");
  const heroId = "team-hero-title";

  return (
    <section
      aria-labelledby={heroId}
      data-tone="dark"
      className="relative overflow-hidden px-6 pb-24 pt-36 md:px-10 lg:px-16"
      style={{ background: `radial-gradient(120% 90% at 50% 0%, #13284f 0%, ${NAVY} 60%)`, color: "#fff" }}
    >
      <Ambient tone="dark" />
      <div className="relative z-10 mx-auto max-w-6xl">
        {badge ? (
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: GOLD }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>{badge}</span>
            <span lang="ar" dir="rtl" className="font-arabic-display text-base" style={{ color: `${GOLD}cc` }}>فريقنا</span>
          </div>
        ) : null}

        <h1 id={heroId} className={`${serifClass} mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,5rem)] font-medium leading-[0.98]`}>
          Meet the people <span className="italic" style={{ color: GOLD }}>behind the work</span>
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/60 md:text-base">{subtitle}</p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href={primaryHref}
            prefetch={false}
            aria-label={primaryText}
            className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
            style={{ background: GOLD, color: NAVY }}
          >
            {primaryText} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          {isPdf ? (
            <a
              href={secondaryHref}
              download
              aria-label={secondaryText}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-white/5"
              style={{ border: "1px solid rgba(191,161,92,0.5)", color: GOLD }}
            >
              {secondaryText}
            </a>
          ) : (
            <Link
              href={secondaryHref}
              prefetch={false}
              aria-label={secondaryText}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-white/5"
              style={{ border: "1px solid rgba(191,161,92,0.5)", color: GOLD }}
            >
              {secondaryText}
            </Link>
          )}
          <span className="text-xs text-white/40">No obligation · Response within 24 hours</span>
        </div>

        {/* FEATURED spotlight — Managing Director called out large */}
        {featured && (
          <div
            className="mt-14 grid items-center gap-8 rounded-3xl p-8 md:grid-cols-[auto_1fr] md:p-12"
            style={{ border: "1px solid rgba(191,161,92,0.4)", background: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex flex-col items-start gap-5">
              <span className={`${serifClass} text-[clamp(3rem,8vw,6rem)] font-medium leading-none`} style={{ color: GOLD }}>01</span>
              <Avatar src={featured.headshot} alt={featured.name} size="lg" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>{featured.role}</span>
              <h2 className={`${serifClass} mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-tight`}>{featured.name}</h2>
              {featured.location && <p className="mt-3 text-sm uppercase tracking-[0.14em] text-white/55">{featured.location}</p>}
              {featured.bio && <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/65">{featured.bio}</p>}
              {featured.tags?.length ? (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {featured.tags.map((t) => (
                    <li key={t} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em]" style={{ border: "1px solid rgba(191,161,92,0.4)", color: GOLD }}>
                      <span className="h-1 w-1 rounded-full" style={{ background: GOLD }} aria-hidden />{t}
                    </li>
                  ))}
                </ul>
              ) : null}
              {featured.socials?.length ? (
                <ul className="mt-5 flex flex-wrap gap-4 text-xs">
                  {featured.socials.map((s, i) => (<li key={i}><SocialLink s={s} tone="dark" /></li>))}
                </ul>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
