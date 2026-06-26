// src/components/PersonalBooking/Sections/index.tsx
"use client";

import { useEffect, useState } from "react";
import Expert from "@/components/PersonalBooking/Expert";
import TestimonialCarouselPro from "@/components/Common/TestimonialCarouselPro";
import AdvisorConsultationCard from "@/components/Citizenship/AdvisorConsultationCard";
import ProblemSolutionCompare from "@/components/PersonalBooking/ProblemSolution";
import { Awards } from "@/components/awards";
import { formatDateUS } from "@/lib/format";

import {
  User,
  AlertTriangle,
  FileText,
  Award,
  MessageCircle,
  DollarSign,
} from "lucide-react";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

type ArticleMeta = {
  title: string;
  url: string;
  date?: string;
  summary?: string;
  hero?: string;
  tags?: string[];
};

const navItems = [
  { label: "About", href: "#about", icon: User },
  { label: "ProblemSolutionCompare", href: "#problem", icon: AlertTriangle },
  { label: "Insights", href: "#articles", icon: FileText },
  { label: "Awards & Media", href: "#awards", icon: Award },
  { label: "Client Stories", href: "#testimonials", icon: MessageCircle },
  { label: "Reserve Your Consultation", href: "#consultation", icon: DollarSign },
] as const;

const SECTION_IDS = navItems.map((n) => n.href.slice(1));

function ArticleCard({ a }: { a: ArticleMeta }) {
  return (
    <a
      href={a.url}
      className="group flex h-full flex-col overflow-hidden rounded-2xl transition"
      style={{ border: "1px solid rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.02)" }}
      aria-label={a.title}
    >
      {a.hero ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={a.hero} alt={a.title} className="w-full h-40 object-cover" />
      ) : null}
      <div className="flex h-full flex-col p-4">
        <h3 className="font-semibold leading-snug text-white transition-colors group-hover:text-[#bfa15c]">
          {a.title}
        </h3>
        {a.summary ? (
          <p className="mt-2 text-sm text-white/55 line-clamp-2">
            {a.summary}
          </p>
        ) : null}
        <div className="mt-auto pt-2 text-xs text-white/40">
          {a.date ? formatDateUS(a.date) : null}
        </div>
      </div>
    </a>
  );
}

export default function Sections({
  articles,
  serifClass = "",
}: {
  articles: ArticleMeta[];
  serifClass?: string;
}) {
  const [active, setActive] = useState<string>(SECTION_IDS[0]);
  const [sectionEls, setSectionEls] = useState<Record<string, HTMLElement>>({});

  // Cache section elements once, after DOM is ready
  useEffect(() => {
    if (typeof document === "undefined") return;
    const map: Record<string, HTMLElement> = {};
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) map[id] = el as HTMLElement;
    });
    setSectionEls(map);
  }, []);

  // 1) Initialize from hash; 2) hashchange listener
  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyHash = () => {
      const id = window.location.hash.slice(1);
      if (SECTION_IDS.includes(id)) setActive(id);
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  // IntersectionObserver keeps underline in sync while scrolling
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const ratios = new Map<string, number>(); // id -> last ratio

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
          if (!SECTION_IDS.includes(id)) return;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId = active;
        let bestRatio = -1;
        SECTION_IDS.forEach((id) => {
          const r = ratios.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        });

        if (bestId && bestId !== active) setActive(bestId);
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    Object.values(sectionEls).forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionEls, active]);

  // Optimistic highlight on click (so underline moves instantly)
  const handleNavClick = (href: string) => {
    const id = href.slice(1);
    if (SECTION_IDS.includes(id)) setActive(id);
  };

  return (
    <div className="w-full" style={{ background: NAVY, color: "#fff" }}>
      {/* Sticky Top Nav (Desktop) */}
      <section
        className="sticky top-0 z-40 hidden sm:block backdrop-blur-md"
        style={{ background: "rgba(10,23,51,0.82)", borderBottom: "1px solid rgba(191,161,92,0.28)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 py-5">
          <nav className="relative flex justify-between text-sm sm:text-base font-medium tracking-wide gap-6 sm:gap-10">
            {navItems.map((item) => {
              const isActive = active === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative p-5 transition-all duration-300 ${
                    isActive
                      ? "font-semibold"
                      : "text-white/55 hover:text-white p-1"
                  }`}
                  style={isActive ? { color: GOLD } : undefined}
                >
                  {item.label}
                  {isActive && (
                    <div className="absolute left-0 right-0 -bottom-[20px] h-[3px] rounded-full" style={{ background: GOLD }} />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Floating Bottom Nav (Mobile) */}
      <nav
        role="tablist"
        aria-label="Section navigation"
        className="
          sm:hidden fixed left-1/2 -translate-x-1/2 z-50
          backdrop-blur-xl
          rounded-2xl shadow-lg w-[92%] max-w-md
        "
        style={{ background: "rgba(10,23,51,0.92)", border: "1px solid rgba(191,161,92,0.32)", bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
      >
        <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory px-2 py-2 gap-1">
          {navItems.map((item) => {
            const isActive = active === item.href.replace("#", "");
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? "page" : undefined}
                className={`
                  snap-center shrink-0 grow-0 basis-[84px]
                  flex flex-col items-center justify-center
                  h-16 rounded-xl transition-all
                  ${
                    isActive
                      ? ""
                      : "text-white/55 hover:text-white"
                  }
                `}
                style={isActive ? { color: GOLD } : undefined}
              >
                <div
                  className={`
                    grid place-items-center h-9 w-9 rounded-xl
                    ${
                      isActive
                        ? "bg-[#bfa15c]/10 ring-1 ring-[#bfa15c]/40"
                        : ""
                    }
                  `}
                >
                  <Icon size={18} strokeWidth={2} />
                </div>
                <span className="mt-1 text-[10.5px] leading-none line-clamp-1 text-center">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
        <div className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 h-1.5 w-10 rounded-full" style={{ background: "rgba(191,161,92,0.2)" }} />
      </nav>

      {/* Sections (no animations) */}
      <section
        id="about"
        data-tone="light"
        className="scroll-mt-28"
        style={{ background: "#fbfaf7", color: INK }}
      >
        <Expert serifClass={serifClass} />
      </section>

      {/* Problem & Solution */}
      <section
        id="problem"
        data-tone="dark"
        className="scroll-mt-28"
        style={{ background: NAVY, color: "#fff" }}
      >
        <ProblemSolutionCompare serifClass={serifClass} />
      </section>

      <section
        id="articles"
        data-tone="dark"
        className="scroll-mt-28"
        style={{ background: NAVY, color: "#fff" }}
      >
        <div className="container mx-auto lg:max-w-screen-2xl px-4 py-16">
          {/* Header */}
          <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                Insights
              </span>
              <h2
                id="insights-top6-title"
                className={`${serifClass} mt-3 text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.05] break-words`}
              >
                Latest Articles
              </h2>
            </div>

            <div className="shrink-0">
              <a
                href="/articles"
                className="text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-white"
                style={{ color: GOLD }}
              >
                View all →
              </a>
            </div>
          </div>

          {articles?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a) => (
                <ArticleCard key={a.url} a={a} />
              ))}
            </div>
          ) : (
            <p className="text-white/45">No articles yet.</p>
          )}
        </div>
      </section>

      {/* Awards — shared component (renders its own light/sand band) */}
      <section
        id="awards"
        data-tone="light"
        style={{ background: "#f7f4ef", color: INK }}
      >
        <Awards variant="preview" />
      </section>

      {/* Testimonials — shared component */}
      <section
        id="testimonials"
        data-tone="dark"
        className="scroll-mt-28"
        style={{ background: NAVY, color: "#fff" }}
      >
        <TestimonialCarouselPro className="mt-2" />
      </section>

      {/* Consultation — shared AdvisorConsultationCard */}
      <section
        id="consultation"
        data-tone="light"
        className="scroll-mt-28 py-16 px-4"
        style={{ background: "#fbfaf7", color: INK }}
      >
        <AdvisorConsultationCard bookingHref="/booking?plan=paid" />
      </section>
    </div>
  );
}
