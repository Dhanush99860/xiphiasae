// Fast & SEO-first homepage (Concept A · Editorial Split).
// Pure server component: next/image, real headings + links, CSS-only hover.
// No video, no GSAP/Lenis, no client JS.
import Image from "next/image";
import Link from "next/link";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

const NAV: [string, string][] = [
  ["Citizenship", "/citizenship"],
  ["Residence", "/residency"],
  ["Golden Visa", "/golden-visa"],
  ["Passport Index", "/passport-index"],
  ["Insights", "/insights"],
  ["About", "/about"],
];

function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />{children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}

function Header({ serifClass }: { serifClass: string }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur" style={{ background: "rgba(246,249,253,0.9)", borderBottom: `1px solid ${INK}14` }}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className={`${serifClass} text-[1.5rem] font-semibold tracking-[0.05em]`} style={{ color: INK }}>XIPHIAS</Link>
        <div className="hidden items-center gap-7 lg:flex">
          {NAV.map(([label, href]) => <Link key={label} href={href} className="text-[13px] font-medium transition-colors hover:text-[#bfa15c]" style={{ color: `${INK}cc` }}>{label}</Link>)}
          <Link href="/contact" className="rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ background: GOLD, color: NAVY }}>Book a consultation</Link>
        </div>
        <Link href="/contact" className="rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] lg:hidden" style={{ background: GOLD, color: NAVY }}>Consult</Link>
      </nav>
    </header>
  );
}

const NUMS = [
  { v: "35", u: "jurisdictions" },
  { v: "17", u: "years" },
  { v: "10,000+", u: "families" },
  { v: "98%", u: "approval rate" },
];

const PROGS: { img: string; tag: string; title: string; note: string; href: string }[] = [
  { img: "/images/residency/uae/uae-golden-visa.webp", tag: "Golden Visa", title: "United Arab Emirates", note: "A 10-year residency for investors, founders and talent — zero income tax.", href: "/golden-visa" },
  { img: "/images/citizenship/grenada/grenada-citizenship.webp", tag: "Citizenship", title: "Grenada", note: "A Caribbean passport with a U.S. E-2 route, in 4–6 months.", href: "/citizenship/grenada" },
  { img: "/images/residency/portugal/portugal-golden-visa.webp", tag: "Residence", title: "Portugal", note: "EU residence with a path to citizenship in five years.", href: "/residency/portugal" },
  { img: "/images/residency/malta/malta-mprp.webp", tag: "Residence", title: "Malta", note: "Permanent residence in a stable EU jurisdiction.", href: "/residency/malta" },
];

const WHY = [
  { t: "A dedicated due-diligence desk", d: "Source-of-funds guidance, pre-cleared before a single application is filed." },
  { t: "One accountable desk", d: "A single named advisor owns strategy, documents, submission and delivery." },
  { t: "Discretion by default", d: "Under NDA from day one — confidential at every step, for the whole family." },
  { t: "Transparent costs", d: "Every government and professional fee set out in writing, with no surprises." },
];

const INDEX = [
  { c: "Singapore", n: "195" },
  { c: "United Arab Emirates", n: "179" },
  { c: "Grenada", n: "145" },
  { c: "Türkiye", n: "118" },
];

const POSTS: { img: string; tag: string; t: string; href: string }[] = [
  { img: "/images/residency/greece/greece-golden-visa.webp", tag: "Guide", t: "Golden visas in 2026: the complete comparison", href: "/insights" },
  { img: "/images/residency/singapore/singapore-gip-pr-investment-hero.webp", tag: "Insight", t: "Where the world's investors are moving — and why", href: "/insights" },
  { img: "/images/corporate/uae/dubai-corporate-immigration.webp", tag: "Article", t: "Citizenship vs residence: which route fits your goals", href: "/insights" },
];

const FCOLS: { h: string; items: [string, string][] }[] = [
  { h: "Programmes", items: [["Golden Visa", "/golden-visa"], ["Citizenship by Investment", "/citizenship"], ["Residency & Relocation", "/residency"], ["Corporate Mobility", "/corporate"]] },
  { h: "Destinations", items: [["United Arab Emirates", "/golden-visa"], ["Portugal", "/residency/portugal"], ["Greece", "/residency/greece"], ["Malta", "/residency/malta"], ["Grenada", "/citizenship/grenada"]] },
  { h: "Intelligence", items: [["Passport Index", "/passport-index"], ["Eligibility", "/eligibility"], ["Compare Programmes", "/compare-programs"], ["Cost Estimator", "/cost-estimator"]] },
  { h: "Company", items: [["About", "/about"], ["Insights", "/insights"], ["Careers", "/careers"], ["Events", "/events"], ["Contact", "/contact"]] },
];

export default function LandingHome({ serifClass }: { serifClass: string }) {
  return (
    <div className="text-[#0c1f3f]" style={{ background: "#f6f9fd" }}>
      <Header serifClass={serifClass} />

      {/* HERO */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <Eyebrow ar="التنقل العالمي الخاص">Private Global Mobility</Eyebrow>
          <h1 className={`${serifClass} mt-5 text-[clamp(2.6rem,6vw,4.6rem)] font-medium leading-[1.0]`}>Global citizenship &amp; residence, <span className="italic" style={{ color: GOLD }}>privately advised.</span></h1>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-[#0c1f3f]/70">Golden visas, residence and second passports across 35 jurisdictions — arranged end-to-end from Dubai, with transparent costs and rigorous compliance.</p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link href="/contact" className="rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a consultation →</Link>
            <Link href="/citizenship" className="rounded-full border px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-[#0c1f3f]/60" style={{ borderColor: `${INK}33`, color: INK }}>Explore programmes</Link>
          </div>
          <p className="mt-8 text-[12px] uppercase tracking-[0.16em] text-[#0c1f3f]/45">35 jurisdictions · 17 years · 10,000+ families</p>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
          <Image src="/images/citizenship/dubai/dubai-country-image.webp" alt="Dubai — XIPHIAS global mobility" fill sizes="(min-width:1024px) 45vw, 100vw" priority className="object-cover [filter:grayscale(0.2)_contrast(1.03)]" />
          <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}55` }} />
          <span aria-hidden className="absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2" style={{ borderColor: GOLD }} />
          <span aria-hidden className="absolute bottom-4 right-4 h-7 w-7 border-b-2 border-r-2" style={{ borderColor: GOLD }} />
        </div>
      </section>

      {/* NUMBERS */}
      <div className="grid grid-cols-2 gap-px overflow-hidden border-y sm:grid-cols-4" style={{ borderColor: `${INK}14`, background: `${INK}10` }}>
        {NUMS.map((s) => (
          <div key={s.u} className="bg-[#f6f9fd] px-6 py-7 text-center">
            <div className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tabular-nums" style={{ color: GOLD }}>{s.v}</div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0c1f3f]/55">{s.u}</div>
          </div>
        ))}
      </div>

      {/* PROGRAMMES */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
        <div className="flex items-end justify-between gap-4">
          <div><Eyebrow ar="برامجنا">Our programmes</Eyebrow><h2 className={`${serifClass} mt-4 text-[clamp(2rem,4vw,3rem)] font-medium`}>Where we secure your future.</h2></div>
          <Link href="/citizenship" className="hidden text-[13px] font-semibold uppercase tracking-[0.1em] sm:inline" style={{ color: GOLD }}>All programmes →</Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROGS.map((p) => (
            <Link key={p.title} href={p.href} className="group block">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
                <Image src={p.img} alt={p.title} fill sizes="(min-width:1024px) 22rem, 100vw" className="object-cover [filter:grayscale(0.35)_brightness(0.82)] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.7) 0%, transparent 55%)" }} />
                <span className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ background: GOLD, color: NAVY }}>{p.tag}</span>
                <h3 className={`${serifClass} absolute bottom-4 left-4 text-[1.5rem] font-medium text-[#eef3fb]`}>{p.title}</h3>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-[#0c1f3f]/60">{p.note}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>Explore <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY XIPHIAS */}
      <section className="px-6 py-20 sm:px-10" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-7xl">
          <Eyebrow ar="لماذا نحن">Why XIPHIAS</Eyebrow>
          <h2 className={`${serifClass} mt-4 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-medium`}>A private-client practice, not a processing factory.</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <div key={w.t} className="border-t pt-6" style={{ borderColor: `${INK}1f` }}>
                <span className={`${serifClass} text-[1.4rem]`} style={{ color: GOLD }}>0{i + 1}</span>
                <h3 className={`${serifClass} mt-2 text-[1.4rem] font-medium leading-tight`}>{w.t}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#0c1f3f]/65">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PASSPORT INDEX TEASER */}
      <section className="px-6 py-20 sm:px-10" style={{ background: NAVY }}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="text-[#eef3fb]">
            <Eyebrow ar="مؤشر الجوازات">Intelligence</Eyebrow>
            <h2 className={`${serifClass} mt-4 text-[clamp(2rem,4vw,3rem)] font-medium`}>The XIPHIAS Passport Index.</h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/70">See how far each passport takes you — visa-free access, ranked and compared across every programme we advise.</p>
            <Link href="/passport-index" className="group mt-6 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>Explore the index <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {INDEX.map((p) => (
              <div key={p.c} className="rounded-lg border p-5" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)" }}>
                <div className={`${serifClass} text-[2rem] font-medium leading-none`} style={{ color: GOLD }}>{p.n}</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">visa-free</div>
                <div className="mt-2 text-[13px] text-white/75">{p.c}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
        <div className="flex items-end justify-between"><h2 className={`${serifClass} text-[clamp(1.8rem,3.5vw,2.6rem)] font-medium`}>Latest insights</h2><Link href="/insights" className="text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>All insights →</Link></div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <Link key={p.t} href={p.href} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-md"><Image src={p.img} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover [filter:grayscale(0.3)] transition-transform duration-700 group-hover:scale-105" /><span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ background: GOLD, color: NAVY }}>{p.tag}</span></div>
              <h3 className={`${serifClass} mt-3 text-[1.3rem] font-medium leading-snug transition-colors group-hover:text-[#bfa15c]`}>{p.t}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center sm:px-12" style={{ background: "#0e2143" }}>
        <h2 className={`${serifClass} mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] font-medium text-[#eef3fb]`}>Speak with a senior advisor.</h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] text-white/70">A private, no-obligation consultation — we map the right jurisdiction and route to your goals.</p>
        <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a consultation →</Link>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-16 sm:px-10" style={{ background: "#fff", borderTop: `1px solid ${INK}14` }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-b pb-12 md:grid-cols-2 lg:grid-cols-4" style={{ borderColor: `${INK}14` }}>
            {FCOLS.map((c) => (
              <div key={c.h}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{c.h}</p>
                <ul className="mt-4 flex flex-col gap-2.5">{c.items.map(([label, href]) => <li key={label}><Link href={href} className="text-[13px] text-[#0c1f3f]/60 hover:text-[#0c1f3f]">{label}</Link></li>)}</ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 text-[12px] text-[#0c1f3f]/50 sm:flex-row sm:items-center">
            <span className={`${serifClass} text-[1.4rem] font-semibold tracking-[0.04em] text-[#0c1f3f]`}>XIPHIAS</span>
            <span>Dubai · London · Bengaluru · Licensed in the UAE</span>
            <span>© 2026 XIPHIAS Immigration</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
