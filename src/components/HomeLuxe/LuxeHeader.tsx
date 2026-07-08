"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const GOLD = "#bfa15c";
const INK = "#0c1f3f";
const NAVY = "#0a1733";
const NAVY2 = "#0d1f3f";
const OFFWHITE = "#eef3fb";

const MARK_T = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

/** Menu trigger mark: three extending lines that fold into a chevron (with a gold
 *  dot sliding to the tip) when the trigger is hovered/focused. */
function MenuMark({ on, color }: { on: boolean; color: string }) {
  return (
    <svg width="26" height="20" viewBox="0 0 28 24" fill="none" aria-hidden>
      <motion.line stroke={color} strokeWidth="1.5" strokeLinecap="round" transition={MARK_T}
        animate={{ x1: on ? 7 : 2, y1: on ? 5 : 7, x2: on ? 20 : 26, y2: on ? 12 : 7 }} />
      <motion.line stroke={color} strokeWidth="1.5" strokeLinecap="round" transition={MARK_T}
        animate={{ x1: on ? 7 : 4, y1: 12, x2: on ? 11 : 22, y2: 12, opacity: on ? 0.25 : 1 }} />
      <motion.line stroke={color} strokeWidth="1.5" strokeLinecap="round" transition={MARK_T}
        animate={{ x1: on ? 7 : 2, y1: on ? 19 : 17, x2: on ? 20 : 26, y2: on ? 12 : 17 }} />
      <motion.circle r="1.6" fill={GOLD} transition={MARK_T} animate={{ cx: on ? 20 : 26, cy: on ? 12 : 7 }} />
    </svg>
  );
}

const GRENADA = "/images/citizenship/grenada/grenada-citizenship.webp";
const DUBAI = "/images/residency/uae/uae-golden-visa.webp";
const PORTUGAL = "/images/residency/portugal/portugal-golden-visa.webp";
const MALTA = "/images/residency/malta/malta-mprp.webp";
const TURKEY = "/images/citizenship/turkey/bank-deposit-turkey.webp";
const TOOLS_IMG = "/images/home/singapore-due-diligence.webp";

type Item = { name: string; href: string; img?: string };
type Group = { label: string; items: Item[]; img: string; caption: string };

/* Few top-level groups; hovering one reveals its sub-items ("Column Drill"). */
const GROUPS: Group[] = [
  { label: "Programmes", img: GRENADA, caption: "Citizenship by Investment", items: [
    { name: "Citizenship by Investment", href: "/citizenship", img: GRENADA },
    { name: "Residency & Golden Visas", href: "/residency", img: PORTUGAL },
    { name: "Skilled Migration", href: "/skilled", img: DUBAI },
    { name: "Corporate Mobility", href: "/corporate", img: MALTA },
    { name: "Work Permits", href: "/work-permits", img: TURKEY },
  ] },
  { label: "Intelligence", img: TURKEY, caption: "Programme Intelligence", items: [
    { name: "Passport Index", href: "/passport-index" },
    { name: "Compare Programmes", href: "/compare-programs" },
    { name: "Cost Estimator", href: "/cost-estimator" },
    { name: "Eligibility Check", href: "/eligibility" },
    { name: "Work Permit Intelligence", href: "/work-permit-intelligence" },
  ] },
  { label: "Company", img: DUBAI, caption: "XIPHIAS Immigration DMCC", items: [
    { name: "About", href: "/about" },
    { name: "Insights", href: "/insights" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Awards", href: "/awards" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
  ] },
  { label: "Tools", img: TOOLS_IMG, caption: "Intelligence & Resources", items: [
    { name: "XIA Intelligence", href: "/xia-intelligence" },
    { name: "Route Intelligence", href: "/route-intelligence" },
    { name: "Deep Analysis", href: "/deep-analysis" },
    { name: "US Visa Intelligence", href: "/us-visa-intelligence" },
    { name: "Cost Estimator", href: "/cost-estimator" },
    { name: "Compare Programs", href: "/compare-programs" },
    { name: "Program Index", href: "/xiphias-program-index" },
    { name: "Passport Power", href: "/passport-index" },
    { name: "Guide", href: "/guide" },
    { name: "Eligibility Check", href: "/eligibility" },
    { name: "Personal Advice", href: "/personal-booking" },
    { name: "Media", href: "/media" },
    { name: "News", href: "/news" },
    { name: "Blog", href: "/blog" },
    { name: "Insights", href: "/insights" },
    { name: "Articles", href: "/articles" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Careers", href: "/careers" },
    { name: "Partner With Us", href: "/partner-with-us" },
    { name: "Reviews", href: "/reviews" },
  ] },
  { label: "Get in touch", img: PORTUGAL, caption: "Private Consultation", items: [
    { name: "Contact", href: "/contact" },
    { name: "Personal Booking", href: "/personal-booking" },
  ] },
];

/**
 * Shared luxe header. Bar adapts foreground to the `[data-tone]` section under it.
 * Menu is the "Column Drill": a few top-level groups; hovering one reveals only
 * that group's sub-items + a small preview thumbnail.
 */
export default function LuxeHeader({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const [active, setActive] = useState(0);
  const [hoverImg, setHoverImg] = useState<string | null>(null);
  const [btnHover, setBtnHover] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const openGroup = useCallback((i: number) => { setActive(i); setHoverImg(null); }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = 32;
      const secs = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
      let t: "dark" | "light" = "dark";
      for (const s of secs) { const r = s.getBoundingClientRect(); if (r.top <= y && r.bottom > y) { t = (s.dataset.tone as "dark" | "light") || "dark"; break; } }
      setTone(t);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  // Reset to the first group when opening; close on Escape.
  useEffect(() => {
    if (!open) return;
    setActive(0);
    setHoverImg(null);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dark = open || tone === "dark";
  const fg = dark ? OFFWHITE : INK;
  const logoSrc = dark ? "/images/logo/xiphias-immigration-white.png" : "/images/logo/xiphias-immigration.png";

  const group = GROUPS[active];
  const img = hoverImg ?? group.img;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-6 py-5 transition-colors duration-300 sm:px-10">
        <a href="/" aria-label="XIPHIAS Immigration — home" className="relative block h-16 w-52"><Image src={logoSrc} alt="XIPHIAS Immigration" fill sizes="208px" className="object-contain object-left" priority /></a>
        <button onClick={() => setOpen(true)} onMouseEnter={() => setBtnHover(true)} onMouseLeave={() => setBtnHover(false)} onFocus={() => setBtnHover(true)} onBlur={() => setBtnHover(false)} aria-expanded={open} aria-label="Open menu" className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300" style={{ color: btnHover ? GOLD : fg }}>
          <span>Menu</span>
          <MenuMark on={btnHover && !reduce} color={btnHover ? GOLD : fg} />
        </button>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex flex-col overflow-y-auto lg:overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 100%)`, color: OFFWHITE }}
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
          >
            {/* Logo — small, top-left, never clipped */}
            <a href="/" onClick={close} className="absolute left-6 top-6 z-50 block w-fit sm:left-10 sm:top-8 lg:left-16" aria-label="XIPHIAS Immigration — home">
              <Image src="/images/logo/xiphias-immigration-white.png" alt="XIPHIAS Immigration" width={260} height={66} priority className="h-14 w-44 object-contain object-left" />
            </a>

            {/* Close */}
            <button type="button" onClick={close} aria-label="Close menu" className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:bg-white/10 sm:right-10 sm:top-8" style={{ borderColor: "rgba(191,161,92,0.5)", color: GOLD }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" /></svg>
            </button>

            <section className="flex flex-1 flex-col px-6 pb-12 pt-28 sm:px-10 lg:flex-row lg:items-center lg:gap-16 lg:px-16 lg:pb-0 lg:pt-0" style={{ background: "transparent" }}>
              <h1 className="sr-only">Site navigation</h1>

              {/* COLUMN 1 — the few top-level groups */}
              <nav aria-label="Primary" className="shrink-0 lg:w-[34%]" onMouseLeave={() => setHoverImg(null)}>
                <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>Menu</p>
                <ul className="flex flex-col gap-3 lg:gap-5">
                  {GROUPS.map((g, i) => {
                    const on = i === active;
                    return (
                      <li key={g.label}>
                        <button type="button" aria-expanded={on} onMouseEnter={() => openGroup(i)} onFocus={() => openGroup(i)} onClick={() => openGroup(i)} className={`group flex items-center gap-3 text-left text-[30px] leading-tight transition-colors sm:text-[38px] lg:text-[42px] ${serifClass}`} style={{ color: on ? OFFWHITE : "rgba(238,243,251,0.55)" }}>
                          <span aria-hidden className="inline-block transition-all duration-300" style={{ width: on ? 28 : 0, height: 1, background: GOLD, opacity: on ? 1 : 0 }} />
                          <span className="transition-colors group-hover:text-[#bfa15c]">{g.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* COLUMN 2 — active group's sub-items + a (larger) preview thumbnail */}
              <div className="mt-10 flex-1 lg:mt-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={group.label}
                    initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                    transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12"
                  >
                    <div className="flex-1">
                      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>{group.label}</p>
                      <ul className="flex flex-col gap-2.5 max-h-[55vh] overflow-y-auto pr-2">
                        {group.items.map((it) => (
                          <li key={it.name + it.href}>
                            <a href={it.href} onClick={close} onMouseEnter={() => setHoverImg(it.img ?? null)} onFocus={() => setHoverImg(it.img ?? null)} onMouseLeave={() => setHoverImg(null)} onBlur={() => setHoverImg(null)} className={`group inline-flex items-center gap-2.5 text-[20px] leading-snug transition-colors hover:text-[#bfa15c] sm:text-[22px] ${serifClass}`} style={{ color: "rgba(238,243,251,0.82)" }}>
                              <span>{it.name}</span>
                              <span aria-hidden className="-translate-x-1 text-base opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" style={{ color: GOLD }}>→</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Preview thumbnail — enlarged ~35% per owner */}
                    <div className="shrink-0">
                      <div className="relative h-60 w-72 overflow-hidden rounded-2xl sm:w-80">
                        <AnimatePresence mode="sync">
                          <motion.div key={img} className="absolute inset-0" initial={reduce ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}>
                            <Image src={img} alt={`${group.label} — ${group.caption}`} fill sizes="20rem" className="object-cover" priority />
                          </motion.div>
                        </AnimatePresence>
                        <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(to top, ${NAVY}d9 0%, transparent 55%)` }} />
                        <p className="absolute bottom-3 left-3 right-3 text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>{group.caption}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>

            {/* Global offices footer bar */}
            <div className="px-6 pb-7 sm:px-10 lg:px-16 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <p className="pt-5 mb-2 text-[9px] font-bold uppercase tracking-[0.32em]" style={{ color: GOLD }}>Global Offices</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {[
                  "Dubai, UAE", "Bengaluru, India", "Gurugram, India",
                  "Leicester, UK", "Larnaca, Cyprus", "Lisbon, Portugal",
                  "Valletta, Malta", "València, Spain", "Waterloo, Canada",
                  "Montreal, Canada", "Melbourne, Australia", "Auckland, NZ",
                  "Los Angeles, USA", "Doha, Qatar", "São Paulo, Brazil",
                ].map((city, i, arr) => (
                  <span key={city} className="text-[11px] tracking-[0.1em] whitespace-nowrap" style={{ color: "rgba(238,243,251,0.42)" }}>
                    {city}{i < arr.length - 1 && <span className="ml-4" style={{ color: "rgba(191,161,92,0.35)" }}>·</span>}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
