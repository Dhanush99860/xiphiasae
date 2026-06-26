"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GOLD = "#bfa15c";
const INK = "#14110c";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-24 z-50 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
      {children}
    </div>
  );
}

const LINKS = [
  { n: "01", t: "Programmes" },
  { n: "02", t: "Destinations" },
  { n: "03", t: "Intelligence" },
  { n: "04", t: "Insights" },
  { n: "05", t: "About" },
  { n: "06", t: "Contact" },
];

function Wordmark({ serifClass }: { serifClass: string }) {
  return <span className={`${serifClass} text-[1.6rem] font-semibold leading-none tracking-[0.05em] text-[#f3efe6]`}>XIPHIAS</span>;
}

/* Animated trigger: two lines that morph to an × when open. */
function Burger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-7">
      <motion.span className="absolute left-0 block h-px w-7" style={{ background: open ? GOLD : "#f3efe6", top: "5px" }} animate={{ rotate: open ? 45 : 0, y: open ? 2 : 0 }} transition={{ duration: 0.3 }} />
      <motion.span className="absolute left-0 block h-px w-7" style={{ background: open ? GOLD : "#f3efe6", top: "11px" }} animate={{ rotate: open ? -45 : 0, y: open ? -2 : 0 }} transition={{ duration: 0.3 }} />
    </span>
  );
}

/* The animated full overlay menu. */
function Overlay({ serifClass, onClose, withPreview }: { serifClass: string; onClose: () => void; withPreview?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 z-40 flex" style={{ background: "linear-gradient(135deg, #0b0e13 0%, #11161f 100%)" }}>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="absolute left-0 top-0 h-full w-1 origin-top" style={{ background: GOLD }} />
      <div className="flex flex-1 flex-col justify-center px-10 sm:px-20">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>Menu</motion.p>
        <nav className="mt-6 flex flex-col gap-1">
          {LINKS.map((l, i) => (
            <span key={l.t} className="overflow-hidden">
              <motion.a href="#" initial={{ y: "110%" }} animate={{ y: 0 }} exit={{ y: "110%" }} transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="group flex items-baseline gap-4 py-1">
                <span className="text-[12px] font-semibold" style={{ color: `${GOLD}99` }}>{l.n}</span>
                <span className={`${serifClass} text-[clamp(2.2rem,6vw,4.5rem)] font-medium leading-[1.05] text-[#f3efe6] transition-colors duration-300 group-hover:text-[#bfa15c]`}>{l.t}</span>
              </motion.a>
            </span>
          ))}
        </nav>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 flex flex-wrap items-center gap-6 text-[12px] uppercase tracking-[0.16em] text-white/50">
          <span>EN · <span className="font-arabic-display" style={{ color: GOLD }}>ع</span></span>
          <span>Dubai · London · Bengaluru</span>
          <a href="#" className="rounded-full px-5 py-2.5 text-[#0b0e13]" style={{ background: GOLD }}>Book a consultation →</a>
        </motion.div>
      </div>
      {withPreview ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.3 }} className="hidden flex-1 lg:block" style={{ background: "radial-gradient(120% 100% at 80% 20%, #2a3447 0%, transparent 60%)" }} />
      ) : null}
      <button onClick={onClose} className="absolute right-8 top-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-[#bfa15c]">Close ×</button>
    </motion.div>
  );
}

function HeroBlock({ children, serifClass, label, trigger }: { children?: React.ReactNode; serifClass: string; label: string; trigger: "burger" | "menu"; }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative h-[84vh] overflow-hidden" style={{ background: "radial-gradient(120% 90% at 50% -10%, #1a2230 0%, #0b0e13 60%)" }}>
      <Badge>{label}</Badge>
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 sm:px-10">
        <Wordmark serifClass={serifClass} />
        <button data-menu onClick={() => setOpen(true)} className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#f3efe6] transition-colors hover:text-[#bfa15c]">
          {trigger === "menu" ? <span>Menu</span> : null}
          <Burger open={open} />
        </button>
      </div>
      <div className="flex h-full flex-col items-center justify-center px-6 text-center text-[#f3efe6]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>Private Global Mobility</p>
        <h1 className={`${serifClass} mt-5 text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.98]`}>Your second passport, <span className="italic" style={{ color: GOLD }}>privately arranged.</span></h1>
        <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-white/40">(transparent bar · click the {trigger === "menu" ? "“Menu”" : "symbol"} top-right)</p>
      </div>
      {children}
      <AnimatePresence>{open ? <Overlay serifClass={serifClass} onClose={() => setOpen(false)} withPreview={trigger === "menu"} /> : null}</AnimatePresence>
    </div>
  );
}

/* ── Editorial WHITE footer (F1 layout, light) ────────────────────────── */
const COLS = [
  { h: "Programmes", items: ["Golden Visa", "Citizenship by Investment", "Residency & Relocation", "Corporate Mobility"] },
  { h: "Destinations", items: ["United Arab Emirates", "Portugal", "Greece", "Malta", "Grenada"] },
  { h: "Intelligence", items: ["XIA Assessment", "Eligibility", "Passport Index", "Compare Programmes"] },
  { h: "Company", items: ["About", "Our Advisors", "Insights", "Careers", "Contact"] },
];

function FooterLight({ serifClass }: { serifClass: string }) {
  return (
    <footer className="relative px-6 py-20 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#faf7f0" }}>
      <Badge>F · Editorial WHITE footer</Badge>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 border-b pb-12 lg:flex-row lg:items-end" style={{ borderColor: `${INK}1f` }}>
          <div>
            <span className={`${serifClass} text-[2.4rem] font-semibold tracking-[0.04em]`}>XIPHIAS</span>
            <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#14110c]/60">A private global-mobility practice. Residency, citizenship and second passports — arranged with discretion since 2007.</p>
          </div>
          <a href="#" className="inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#0b0e13]" style={{ background: GOLD }}>Book a consultation →</a>
        </div>
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {COLS.map((c) => (
            <div key={c.h}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{c.h}</p>
              <ul className="mt-4 flex flex-col gap-2.5">{c.items.map((it) => <li key={it}><a href="#" className="text-[13px] text-[#14110c]/60 hover:text-[#14110c]">{it}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="grid gap-6 border-t pt-8 text-[12px] text-[#14110c]/55 sm:grid-cols-3" style={{ borderColor: `${INK}15` }}>
          <span><span className="font-semibold text-[#14110c]">Dubai</span> · DIFC, Gate Village</span>
          <span><span className="font-semibold text-[#14110c]">London</span> · Mayfair</span>
          <span><span className="font-semibold text-[#14110c]">Bengaluru</span> · UB City</span>
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-[12px] text-[#14110c]/45 sm:flex-row sm:items-center">
          <span>© 2026 XIPHIAS Immigration · Licensed in the UAE</span>
          <span className="flex gap-5"><a href="#" className="hover:text-[#14110c]">Privacy</a><a href="#" className="hover:text-[#14110c]">Terms</a><a href="#" className="hover:text-[#14110c]">Anti-fraud</a></span>
        </div>
      </div>
    </footer>
  );
}

export default function ChromeSamples2({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <HeroBlock serifClass={serifClass} label="HV1 · Transparent bar · symbol → overlay" trigger="burger" />
      <HeroBlock serifClass={serifClass} label="HV2 · Transparent bar · “Menu” → overlay + preview" trigger="menu" />
      <FooterLight serifClass={serifClass} />
    </main>
  );
}
