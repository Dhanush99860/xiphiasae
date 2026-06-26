// Fast & SEO-first landing alternatives — pure server components:
// next/image, real headings/links, CSS-only hover. No video, no GSAP/Lenis, no client JS.
import Image from "next/image";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

const NAV = ["Citizenship", "Residence", "Golden Visa", "Passport Index", "Insights", "About"];
const NUMS = [
  { v: "35", u: "jurisdictions" },
  { v: "17", u: "years" },
  { v: "10,000+", u: "families" },
  { v: "98%", u: "approval rate" },
];

function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar: string; light?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />{children}
      <span lang="ar" dir="rtl" className={`font-arabic-display text-sm tracking-normal ${light ? "" : ""}`}>{ar}</span>
    </p>
  );
}
function Nav({ serifClass, overDark }: { serifClass: string; overDark?: boolean }) {
  const fg = overDark ? "#eef3fb" : INK;
  return (
    <nav className="flex items-center justify-between px-6 py-5 sm:px-10" style={{ borderBottom: overDark ? "none" : `1px solid ${INK}14` }}>
      <span className={`${serifClass} text-[1.4rem] font-semibold tracking-[0.05em]`} style={{ color: fg }}>XIPHIAS</span>
      <div className="hidden items-center gap-7 lg:flex">
        {NAV.map((n) => <a key={n} href="#" className="text-[13px] font-medium transition-colors hover:text-[#bfa15c]" style={{ color: overDark ? "rgba(238,243,251,0.8)" : `${INK}cc` }}>{n}</a>)}
        <a href="#" className="rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ background: GOLD, color: NAVY }}>Book a consultation</a>
      </div>
      <a href="#" className="rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] lg:hidden" style={{ background: GOLD, color: NAVY }}>Consult</a>
    </nav>
  );
}
function Numbers() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden border-y sm:grid-cols-4" style={{ borderColor: `${INK}14`, background: `${INK}10` }}>
      {NUMS.map((s) => (
        <div key={s.u} className="bg-[#f6f9fd] px-6 py-7 text-center">
          <div className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tabular-nums" style={{ color: GOLD }}>{s.v}</div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0c1f3f]/55">{s.u}</div>
        </div>
      ))}
    </div>
  );
}
function ProgrammeCard({ img, tag, title, note, serifClass }: { img: string; tag: string; title: string; note: string; serifClass: string }) {
  return (
    <a href="#" className="group block">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
        <Image src={img} alt={title} fill sizes="(min-width:1024px) 24rem, 100vw" className="object-cover [filter:grayscale(0.35)_brightness(0.82)] transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.7) 0%, transparent 55%)" }} />
        <span className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ background: GOLD, color: NAVY }}>{tag}</span>
        <h3 className={`${serifClass} absolute bottom-4 left-4 text-[1.5rem] font-medium text-[#eef3fb]`}>{title}</h3>
      </div>
      <p className="mt-3 text-[14px] leading-relaxed text-[#0c1f3f]/60">{note}</p>
      <span className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>Explore <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>
    </a>
  );
}
function CTABand({ serifClass }: { serifClass: string }) {
  return (
    <section className="px-6 py-20 text-center sm:px-12" style={{ background: NAVY }}>
      <Eyebrow ar="ابدأ الآن"><span className="inline-flex justify-center">Your next move</span></Eyebrow>
      <h2 className={`${serifClass} mx-auto mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] font-medium text-[#eef3fb]`}>Speak with a senior advisor.</h2>
      <p className="mx-auto mt-4 max-w-lg text-[15px] text-white/70">A private, no-obligation consultation — we map the right jurisdiction and route to your goals.</p>
      <a href="#" className="mt-7 inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a consultation →</a>
    </section>
  );
}
function MiniFooter({ serifClass }: { serifClass: string }) {
  return (
    <footer className="px-6 py-10 sm:px-12" style={{ background: "#f6f9fd", borderTop: `1px solid ${INK}14` }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-[12px] text-[#0c1f3f]/50 sm:flex-row">
        <span className={`${serifClass} text-[1.3rem] font-semibold tracking-[0.04em] text-[#0c1f3f]`}>XIPHIAS</span>
        <span>Dubai · London · Bengaluru · Licensed in the UAE</span>
        <span>© 2026 XIPHIAS Immigration</span>
      </div>
    </footer>
  );
}
function Label({ children }: { children: React.ReactNode }) {
  return <div className="sticky top-0 z-50 px-6 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-white" style={{ background: "#06122b" }}>{children}</div>;
}

/* ════════ A · EDITORIAL SPLIT (airy light hero) ════════ */
function LandingA({ serifClass }: { serifClass: string }) {
  const PROGS = [
    { img: "/images/residency/uae/uae-golden-visa.webp", tag: "Golden Visa", title: "United Arab Emirates", note: "10-year residency for investors, founders and talent." },
    { img: "/images/citizenship/grenada/grenada-citizenship.webp", tag: "Citizenship", title: "Grenada", note: "A Caribbean passport with a U.S. E-2 route, in 4–6 months." },
    { img: "/images/residency/portugal/portugal-golden-visa.webp", tag: "Residence", title: "Portugal", note: "EU residence with a path to citizenship in five years." },
    { img: "/images/residency/malta/malta-mprp.webp", tag: "Residence", title: "Malta", note: "Permanent residence in a stable EU jurisdiction." },
  ];
  return (
    <div style={{ background: "#f6f9fd" }} className="text-[#0c1f3f]">
      <Nav serifClass={serifClass} />
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <Eyebrow ar="التنقل العالمي الخاص">Private Global Mobility</Eyebrow>
          <h1 className={`${serifClass} mt-5 text-[clamp(2.6rem,6vw,4.6rem)] font-medium leading-[1.0]`}>Global citizenship & residence, <span className="italic" style={{ color: GOLD }}>privately advised.</span></h1>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-[#0c1f3f]/70">Golden visas, residence and second passports across 35 jurisdictions — arranged end-to-end from Dubai, with transparent costs and rigorous compliance.</p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href="#" className="rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a consultation →</a>
            <a href="#" className="rounded-full border px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-[#0c1f3f]/60" style={{ borderColor: `${INK}33`, color: INK }}>Explore programmes</a>
          </div>
          <p className="mt-8 text-[12px] uppercase tracking-[0.16em] text-[#0c1f3f]/45">35 jurisdictions · 17 years · 10,000+ families</p>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
          <Image src="/images/citizenship/dubai/dubai-country-image.webp" alt="Dubai" fill sizes="45vw" priority className="object-cover [filter:grayscale(0.2)_contrast(1.03)]" />
          <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}55` }} />
          <span aria-hidden className="absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2" style={{ borderColor: GOLD }} />
          <span aria-hidden className="absolute bottom-4 right-4 h-7 w-7 border-b-2 border-r-2" style={{ borderColor: GOLD }} />
        </div>
      </section>
      <Numbers />
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <div className="flex items-end justify-between gap-4">
          <div><Eyebrow ar="برامجنا">Our programmes</Eyebrow><h2 className={`${serifClass} mt-4 text-[clamp(2rem,4vw,3rem)] font-medium`}>Where we secure your future.</h2></div>
          <a href="#" className="hidden text-[13px] font-semibold uppercase tracking-[0.1em] sm:inline" style={{ color: GOLD }}>All programmes →</a>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{PROGS.map((p) => <ProgrammeCard key={p.title} {...p} serifClass={serifClass} />)}</div>
      </section>
      <CTABand serifClass={serifClass} />
      <MiniFooter serifClass={serifClass} />
    </div>
  );
}

/* ════════ B · CINEMATIC MINIMAL (one full-bleed image) ════════ */
function LandingB({ serifClass }: { serifClass: string }) {
  const WHAT = [
    { t: "Citizenship by Investment", d: "Second passports across the Caribbean, Türkiye and beyond — donation and real-estate routes." },
    { t: "Residence & Golden Visas", d: "Residence in the UAE, Portugal, Greece, Malta and more — for you and your family." },
    { t: "Corporate Mobility", d: "Relocation and global expansion for businesses and their teams." },
  ];
  const ROWS = [
    { img: "/images/residency/uae/uae-golden-visa.webp", tag: "Golden Visa", t: "United Arab Emirates", d: "A 10-year renewable residency for investors, entrepreneurs and exceptional talent — zero income tax and a world-class base." },
    { img: "/images/citizenship/grenada/grenada-citizenship.webp", tag: "Citizenship", t: "Grenada", d: "A Caribbean passport with visa-free access to 145 destinations and a treaty route to the U.S. E-2 investor visa." },
  ];
  return (
    <div className="text-[#0c1f3f]" style={{ background: "#fff" }}>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-10"><Nav serifClass={serifClass} overDark /></div>
        <section className="relative flex min-h-[88vh] items-center overflow-hidden px-6 sm:px-12" style={{ background: NAVY }}>
          <Image src="/images/corporate/uae/dubai-corporate-immigration.webp" alt="Dubai skyline" fill sizes="100vw" priority className="object-cover [filter:grayscale(0.4)_brightness(0.5)_contrast(1.05)]" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.4) 50%, rgba(8,18,42,0.7) 100%)" }} />
          <div className="relative z-10 mx-auto w-full max-w-4xl text-center text-[#eef3fb]">
            <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Private Global Mobility<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">من نحن</span></p>
            <h1 className={`${serifClass} mt-6 text-[clamp(2.8rem,7vw,5.6rem)] font-medium leading-[0.98]`}>Your second passport, <span className="italic" style={{ color: GOLD }}>privately arranged.</span></h1>
            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">Golden visas and citizenship by investment across 35 jurisdictions — arranged for those who value discretion, certainty and time.</p>
            <a href="#" className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation →</a>
          </div>
        </section>
      </div>
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <Eyebrow ar="ماذا نقدم">What we do</Eyebrow>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {WHAT.map((w, i) => (
            <div key={w.t} className="border-t pt-6" style={{ borderColor: `${INK}1f` }}>
              <span className={`${serifClass} text-[1.4rem]`} style={{ color: GOLD }}>0{i + 1}</span>
              <h3 className={`${serifClass} mt-2 text-[1.6rem] font-medium`}>{w.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#0c1f3f]/65">{w.d}</p>
              <a href="#" className="mt-4 inline-block text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>Learn more →</a>
            </div>
          ))}
        </div>
      </section>
      {ROWS.map((r, i) => (
        <section key={r.t} className="px-6 py-12 sm:px-10" style={{ background: i % 2 ? "#f6f9fd" : "#fff" }}>
          <div className={`mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 ${i % 2 ? "" : ""}`}>
            <div className={`relative aspect-[16/11] overflow-hidden rounded-lg ${i % 2 ? "lg:order-2" : ""}`}>
              <Image src={r.img} alt={r.t} fill sizes="50vw" className="object-cover [filter:grayscale(0.3)_contrast(1.03)]" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{r.tag}</span>
              <h3 className={`${serifClass} mt-2 text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium`}>{r.t}</h3>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#0c1f3f]/70">{r.d}</p>
              <a href="#" className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>Explore <span>→</span></a>
            </div>
          </div>
        </section>
      ))}
      <CTABand serifClass={serifClass} />
      <MiniFooter serifClass={serifClass} />
    </div>
  );
}

/* ════════ C · MAGAZINE GRID (content + link dense, SEO-forward) ════════ */
function LandingC({ serifClass }: { serifClass: string }) {
  const GOALS = ["Citizenship by Investment", "Residence & Golden Visa", "Corporate Mobility", "Family Relocation"];
  const COUNTRIES = ["United Arab Emirates", "Grenada", "Portugal", "Malta", "Greece", "Türkiye", "Saint Lucia", "Singapore"];
  const POSTS = [
    { img: "/images/residency/portugal/portugal-golden-visa.webp", tag: "Guide", t: "Golden visas in 2026: the complete comparison" },
    { img: "/images/residency/singapore/singapore-gip-pr-investment-hero.webp", tag: "Insight", t: "Where the world's investors are moving — and why" },
    { img: "/images/residency/greece/greece-golden-visa.webp", tag: "Article", t: "EU residence routes, ranked by cost and speed" },
  ];
  return (
    <div className="text-[#0c1f3f]" style={{ background: "#fff" }}>
      <Nav serifClass={serifClass} />
      <section className="px-6 py-16 sm:px-10" style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl text-[#eef3fb]">
          <Eyebrow ar="التنقل العالمي">Private Global Mobility</Eyebrow>
          <h1 className={`${serifClass} mt-5 max-w-4xl text-[clamp(2.4rem,5.5vw,4.2rem)] font-medium leading-[1.0]`}>Residence & citizenship by investment, for the world's families.</h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/70">Compare programmes across 35 jurisdictions, explore the passport index, and speak with a senior advisor — all in one place.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#" className="rounded-full px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ background: GOLD, color: NAVY }}>Find your programme →</a>
            <a href="#" className="rounded-full border border-white/25 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-white">Passport index</a>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">Explore by goal</h2>
            <ul className="mt-5 flex flex-col">
              {GOALS.map((g) => <li key={g}><a href="#" className={`${serifClass} group flex items-center justify-between border-b py-4 text-[1.4rem] font-medium transition-colors hover:text-[#bfa15c]`} style={{ borderColor: `${INK}14` }}>{g}<span className="text-[#bfa15c] transition-transform duration-300 group-hover:translate-x-1">→</span></a></li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">Popular destinations</h2>
            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-1">
              {COUNTRIES.map((c) => <a key={c} href="#" className="flex items-center justify-between border-b py-3 text-[15px] transition-colors hover:text-[#bfa15c]" style={{ borderColor: `${INK}12` }}>{c}<span className="text-[#bfa15c]">→</span></a>)}
            </div>
          </div>
        </div>
      </section>
      <Numbers />
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="flex items-end justify-between"><h2 className={`${serifClass} text-[clamp(1.8rem,3.5vw,2.6rem)] font-medium`}>Latest insights</h2><a href="#" className="text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>All insights →</a></div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <a key={p.t} href="#" className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-md"><Image src={p.img} alt="" fill sizes="33vw" className="object-cover [filter:grayscale(0.3)] transition-transform duration-700 group-hover:scale-105" /><span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ background: GOLD, color: NAVY }}>{p.tag}</span></div>
              <h3 className={`${serifClass} mt-3 text-[1.3rem] font-medium leading-snug transition-colors group-hover:text-[#bfa15c]`}>{p.t}</h3>
            </a>
          ))}
        </div>
      </section>
      <CTABand serifClass={serifClass} />
      <MiniFooter serifClass={serifClass} />
    </div>
  );
}

export default function LandingAlternatives({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <Label>Concept A · Editorial Split — airy, light, image-led</Label>
      <LandingA serifClass={serifClass} />
      <Label>Concept B · Cinematic Minimal — one image hero, very few elements</Label>
      <LandingB serifClass={serifClass} />
      <Label>Concept C · Magazine Grid — content & link dense, SEO-forward</Label>
      <LandingC serifClass={serifClass} />
    </main>
  );
}
