"use client";

const GOLD = "#bfa15c";
const INK = "#14110c";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-20 z-40 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
      {children}
    </div>
  );
}

const NAV = ["Programmes", "Destinations", "Intelligence", "Insights", "About"];

function Wordmark({ serifClass, dark = true, sub = true }: { serifClass: string; dark?: boolean; sub?: boolean }) {
  return (
    <div className="flex items-end gap-2.5">
      <span className={`${serifClass} text-[1.6rem] font-semibold leading-none tracking-[0.04em] ${dark ? "text-[#f3efe6]" : "text-[#14110c]"}`}>XIPHIAS</span>
      {sub ? <span className="mb-0.5 text-[9px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>Dubai</span> : null}
    </div>
  );
}

function Lang({ dark = true }: { dark?: boolean }) {
  return (
    <span className={`text-[12px] font-semibold tracking-widest ${dark ? "text-white/70" : "text-[#14110c]/70"}`}>
      EN <span style={{ color: GOLD }}>·</span> <span className="font-arabic-display">ع</span>
    </span>
  );
}

function BookBtn() {
  return (
    <a href="#" className="rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#0b0e13] transition-transform hover:-translate-y-0.5" style={{ background: GOLD }}>
      Book a consultation
    </a>
  );
}

function HeroBlock({ children, serifClass, label }: { children: React.ReactNode; serifClass: string; label: string }) {
  return (
    <div className="relative h-[64vh] overflow-hidden" style={{ background: "radial-gradient(120% 90% at 50% -10%, #1a2230 0%, #0b0e13 60%)" }}>
      <Badge>{label}</Badge>
      {children}
      <div className="flex h-full flex-col items-center justify-center px-6 text-center text-[#f3efe6]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>Private Global Mobility</p>
        <h1 className={`${serifClass} mt-5 text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.98]`}>Your second passport, <span className="italic" style={{ color: GOLD }}>privately arranged.</span></h1>
      </div>
    </div>
  );
}

/* ── H1 · Glass minimal — logo left, nav right ────────────────────────── */
function H1({ serifClass }: { serifClass: string }) {
  return (
    <HeroBlock serifClass={serifClass} label="H1 · Glass minimal">
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between border-b px-6 py-5 backdrop-blur-md sm:px-10" style={{ background: "rgba(11,14,19,0.35)", borderColor: `${GOLD}26` }}>
        <Wordmark serifClass={serifClass} />
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => <a key={n} href="#" className="text-[13px] font-medium text-white/75 transition-colors hover:text-[#bfa15c]">{n}</a>)}
        </nav>
        <div className="flex items-center gap-5"><Lang /><BookBtn /></div>
      </header>
    </HeroBlock>
  );
}

/* ── H2 · Centered wordmark — nav split ───────────────────────────────── */
function H2({ serifClass }: { serifClass: string }) {
  return (
    <HeroBlock serifClass={serifClass} label="H2 · Centered wordmark">
      <header className="absolute inset-x-0 top-0 z-30 grid grid-cols-3 items-center px-6 py-5 sm:px-10">
        <nav className="hidden items-center gap-7 lg:flex">{NAV.slice(0, 3).map((n) => <a key={n} href="#" className="text-[13px] font-medium text-white/75 hover:text-[#bfa15c]">{n}</a>)}</nav>
        <div className="flex justify-center"><Wordmark serifClass={serifClass} sub={false} /></div>
        <div className="flex items-center justify-end gap-5"><Lang /><BookBtn /></div>
      </header>
      <div className="absolute inset-x-0 top-[68px] z-20 h-px" style={{ background: `linear-gradient(90deg,transparent,${GOLD}55,transparent)` }} />
    </HeroBlock>
  );
}

/* ── H3 · Two-tier concierge bar ──────────────────────────────────────── */
function H3({ serifClass }: { serifClass: string }) {
  return (
    <HeroBlock serifClass={serifClass} label="H3 · Two-tier concierge">
      <div className="absolute inset-x-0 top-0 z-30">
        <div className="flex items-center justify-between border-b px-6 py-2 text-[11px] uppercase tracking-[0.16em] text-white/45 sm:px-10" style={{ borderColor: "#ffffff14", background: "rgba(11,14,19,0.4)" }}>
          <span>By appointment · Dubai · London · Bengaluru</span>
          <span className="flex items-center gap-4"><span>+971 4 000 0000</span><Lang /></span>
        </div>
        <header className="flex items-center justify-between px-6 py-4 backdrop-blur-md sm:px-10" style={{ background: "rgba(11,14,19,0.3)" }}>
          <Wordmark serifClass={serifClass} />
          <nav className="hidden items-center gap-8 lg:flex">{NAV.map((n) => <a key={n} href="#" className="text-[13px] font-medium text-white/75 hover:text-[#bfa15c]">{n}</a>)}</nav>
          <BookBtn />
        </header>
      </div>
    </HeroBlock>
  );
}

/* ── F1 · Editorial dark footer ───────────────────────────────────────── */
const COLS = [
  { h: "Programmes", items: ["Golden Visa", "Citizenship by Investment", "Residency & Relocation", "Corporate Mobility"] },
  { h: "Destinations", items: ["United Arab Emirates", "Portugal", "Greece", "Malta", "Grenada"] },
  { h: "Intelligence", items: ["XIA Assessment", "Eligibility", "Passport Index", "Compare Programmes"] },
  { h: "Company", items: ["About", "Our Advisors", "Insights", "Careers", "Contact"] },
];

function F1({ serifClass }: { serifClass: string }) {
  return (
    <footer className="relative px-6 py-20 text-[#f3efe6] sm:px-12 lg:px-20" style={{ background: "#0b0e13" }}>
      <Badge>F1 · Editorial dark footer</Badge>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 border-b pb-12 lg:flex-row lg:items-end" style={{ borderColor: `${GOLD}26` }}>
          <div>
            <span className={`${serifClass} text-[2.4rem] font-semibold tracking-[0.04em]`}>XIPHIAS</span>
            <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-white/55">A private global-mobility practice. Residency, citizenship and second passports — arranged with discretion since 2007.</p>
          </div>
          <a href="#" className="inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#0b0e13]" style={{ background: GOLD }}>Book a consultation →</a>
        </div>
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {COLS.map((c) => (
            <div key={c.h}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{c.h}</p>
              <ul className="mt-4 flex flex-col gap-2.5">{c.items.map((it) => <li key={it}><a href="#" className="text-[13px] text-white/60 hover:text-white">{it}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="grid gap-6 border-t pt-8 text-[12px] text-white/45 sm:grid-cols-3" style={{ borderColor: "#ffffff14" }}>
          <span><span className="font-semibold text-white/70">Dubai</span> · DIFC, Gate Village</span>
          <span><span className="font-semibold text-white/70">London</span> · Mayfair</span>
          <span><span className="font-semibold text-white/70">Bengaluru</span> · UB City</span>
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-[12px] text-white/40 sm:flex-row sm:items-center">
          <span>© 2026 XIPHIAS Immigration · Licensed in the UAE</span>
          <span className="flex gap-5"><a href="#" className="hover:text-white">Privacy</a><a href="#" className="hover:text-white">Terms</a><a href="#" className="hover:text-white">Anti-fraud</a></span>
        </div>
      </div>
    </footer>
  );
}

/* ── F2 · Minimal light footer ────────────────────────────────────────── */
function F2({ serifClass }: { serifClass: string }) {
  return (
    <footer className="relative px-6 py-20 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f6f1e8" }}>
      <Badge>F2 · Minimal light footer</Badge>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <span className={`${serifClass} text-[2.6rem] font-semibold tracking-[0.04em]`}>XIPHIAS</span>
        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13px] font-medium text-[#14110c]/70">{[...NAV, "Tools", "Contact"].map((n) => <a key={n} href="#" className="hover:text-[#14110c]">{n}</a>)}</nav>
        <p className="text-[12px] uppercase tracking-[0.18em]" style={{ color: GOLD }}>By appointment · Dubai · London · Bengaluru</p>
        <div className="h-px w-24" style={{ background: `${INK}1a` }} />
        <div className="flex flex-col items-center gap-3 text-[12px] text-[#14110c]/45 sm:flex-row sm:gap-6">
          <span>© 2026 XIPHIAS Immigration · Licensed in the UAE</span>
          <span className="flex gap-5"><a href="#" className="hover:text-[#14110c]">Privacy</a><a href="#" className="hover:text-[#14110c]">Terms</a></span>
        </div>
      </div>
    </footer>
  );
}

export default function ChromeSamples({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <H1 serifClass={serifClass} />
      <H2 serifClass={serifClass} />
      <H3 serifClass={serifClass} />
      <F1 serifClass={serifClass} />
      <F2 serifClass={serifClass} />
    </main>
  );
}
