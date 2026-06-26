// Hero redesign options — real imagery (family photo + real falcon logo),
// keyword-dense copy for SEO, navy/gold. Static (server-renderable).
import Image from "next/image";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";
const FAMILY = "/images/hero/top-immigration-counsultent.webp";
const LOGO = "/images/logo/xiphias-immigration-white.png";

const NAV = ["Immigration", "Citizenship", "Residency", "Golden Visa", "Passport Index", "About"];
const QUICK = ["Golden Visa", "Citizenship by Investment", "Residency", "Skilled Migration", "Corporate Mobility"];
const STATS = [
  { v: "35", u: "jurisdictions" },
  { v: "17 yrs", u: "advising" },
  { v: "10,000+", u: "families" },
  { v: "98%", u: "approval" },
];

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none absolute left-5 top-5 z-50 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">{children}</div>;
}
function Logo({ className = "h-11" }: { className?: string }) {
  return <span className={`relative block w-32 ${className}`}><Image src={LOGO} alt="XIPHIAS Immigration" fill sizes="128px" className="object-contain object-left" priority /></span>;
}
function Nav({ overDark = true }: { overDark?: boolean }) {
  const fg = overDark ? "rgba(238,243,251,0.82)" : `${INK}cc`;
  return (
    <nav className="relative z-40 flex items-center justify-between px-6 py-4 sm:px-10">
      <Logo />
      <div className="hidden items-center gap-7 lg:flex">
        {NAV.map((n) => <a key={n} href="#" className="text-[13px] font-medium transition-colors hover:text-[#bfa15c]" style={{ color: fg }}>{n}</a>)}
        <a href="#" className="rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ background: GOLD, color: NAVY }}>Book a consultation</a>
      </div>
    </nav>
  );
}
function Stats({ light }: { light?: boolean }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3">
      {STATS.map((s) => (
        <div key={s.u} className="flex flex-col">
          <span className="text-[clamp(1.3rem,2vw,1.8rem)] font-semibold tabular-nums" style={{ color: GOLD }}>{s.v}</span>
          <span className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${light ? "text-[#0c1f3f]/55" : "text-white/50"}`}>{s.u}</span>
        </div>
      ))}
    </div>
  );
}

/* ───── A · Editorial split (content left, real family photo framed right) ───── */
function HeroA({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative isolate overflow-hidden text-[#eef3fb]" style={{ background: `radial-gradient(120% 100% at 12% 0%, #13284f 0%, ${NAVY} 58%)` }}>
      <Badge>Hero A · split + real family photo</Badge>
      <Nav />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-6 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Dubai · Global mobility since 2007<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">الهجرة والإقامة</span></p>
          <h1 className={`${serifClass} mt-5 text-[clamp(2.5rem,5.2vw,4.4rem)] font-medium leading-[1.02]`}>Immigration, residency &amp; <span className="italic" style={{ color: GOLD }}>citizenship</span> — expertly advised.</h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">Golden visas, residency and second passports across 35 jurisdictions — handled end-to-end by XIPHIAS Immigration. 17 years of advisory, 10,000+ families relocated.</p>
          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a href="#" className="rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation →</a>
            <a href="#" className="rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Check your eligibility</a>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {QUICK.map((q) => <a key={q} href="#" className="rounded-full border px-3.5 py-1.5 text-[12px] text-white/75 transition-colors hover:border-[#bfa15c] hover:text-[#bfa15c]" style={{ borderColor: "rgba(191,161,92,0.35)" }}>{q}</a>)}
          </div>
          <div className="mt-9 border-t pt-7" style={{ borderColor: "rgba(255,255,255,0.12)" }}><Stats /></div>
        </div>
        <div className="relative aspect-[5/6] w-full overflow-hidden rounded-lg lg:aspect-[4/5]">
          <Image src={FAMILY} alt="A family with XIPHIAS Immigration at the airport, holding their new passports" fill sizes="(min-width:1024px) 45vw, 100vw" priority className="object-cover" />
          <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}55` }} />
          <span aria-hidden className="absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2" style={{ borderColor: GOLD }} />
          <span aria-hidden className="absolute bottom-4 right-4 h-7 w-7 border-b-2 border-r-2" style={{ borderColor: GOLD }} />
          <div className="absolute bottom-4 left-4 rounded-full bg-black/55 px-4 py-2 text-[12px] font-semibold backdrop-blur" style={{ color: GOLD }}>Licensed in the UAE · ICCRC & IMC members</div>
        </div>
      </div>
    </section>
  );
}

/* ───── B · Full-bleed real photo (family left, copy over the bright window-right) ───── */
function HeroB({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden text-[#eef3fb]" style={{ background: NAVY }}>
      <Badge>Hero B · full-bleed real photo</Badge>
      <Image src={FAMILY} alt="A family with XIPHIAS Immigration at the airport, holding their new passports" fill sizes="100vw" priority className="object-cover object-left" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.35) 0%, rgba(8,18,42,0.55) 42%, rgba(8,18,42,0.92) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.6) 0%, transparent 40%)" }} />
      <div className="relative z-10">
        <Nav />
        <div className="mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-6 sm:px-10">
          <div className="ml-auto max-w-2xl text-right lg:max-w-xl">
            <p className="flex items-center justify-end gap-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>Dubai · Global mobility since 2007<span className="h-px w-8" style={{ background: GOLD }} /></p>
            <h1 className={`${serifClass} mt-5 text-[clamp(2.6rem,5.6vw,5rem)] font-medium leading-[1.0]`}>Your global future, <span className="italic" style={{ color: GOLD }}>expertly advised</span> from Dubai.</h1>
            <p className="ml-auto mt-5 max-w-md text-[16px] leading-relaxed text-white/80">Immigration, residency, golden visas and citizenship by investment across 35 jurisdictions — end-to-end, with 17 years and 10,000+ families behind us.</p>
            <div className="mt-7 flex flex-col items-end gap-3 sm:flex-row sm:justify-end">
              <a href="#" className="rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation →</a>
              <a href="#" className="rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white">Check your eligibility</a>
            </div>
            <div className="mt-9 flex justify-end border-t pt-7" style={{ borderColor: "rgba(255,255,255,0.14)" }}><Stats /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeHeroSamples({ serifClass }: { serifClass: string }) {
  return (
    <main className="bg-[#0a1733]">
      <HeroA serifClass={serifClass} />
      <div className="h-3" style={{ background: GOLD }} />
      <HeroB serifClass={serifClass} />
    </main>
  );
}
