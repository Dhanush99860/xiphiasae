"use client";

const GOLD = "#bfa15c";
const INK = "#0c1f3f";

function Btn({ children, href = "/contact" }: { children: React.ReactNode; href?: string }) {
  return <a href={href} className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0a1733] transition-transform hover:-translate-y-0.5" style={{ background: GOLD }}>{children}<span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>;
}

/* ─────────── FOOTER (editorial white) ─────────── */
const FCOLS = [["Programmes", ["Golden Visa", "Citizenship by Investment", "Residency & Relocation", "Corporate Mobility"]], ["Destinations", ["United Arab Emirates", "Portugal", "Greece", "Malta", "Grenada"]], ["Intelligence", ["XIA Assessment", "Eligibility", "Passport Index", "Compare Programmes"]], ["Company", ["About", "Our Advisors", "Insights", "Careers", "Contact"]]] as const;

// Map every footer label to its real route.
const FHREF: Record<string, string> = {
  // Programmes
  "Golden Visa": "/golden-visa",
  "Citizenship by Investment": "/citizenship",
  "Residency & Relocation": "/residency",
  "Corporate Mobility": "/corporate",
  // Destinations
  "United Arab Emirates": "/residency/uae",
  Portugal: "/residency/portugal",
  Greece: "/residency/greece",
  Malta: "/residency/malta",
  Grenada: "/citizenship/grenada",
  // Intelligence
  "XIA Assessment": "/xia-intelligence",
  Eligibility: "/eligibility",
  "Passport Index": "/passport-index",
  "Compare Programmes": "/compare-programs",
  // Company
  About: "/about",
  "Our Advisors": "/teams",
  Insights: "/insights",
  Careers: "/careers",
  Contact: "/contact",
};

/** Shared luxe footer used by the homepage and every vertical hub. */
export default function LuxeFooter({ serifClass }: { serifClass: string }) {
  return (
    <footer data-tone="light" className="relative px-6 py-20 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f7faff" }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 border-b pb-12 lg:flex-row lg:items-end" style={{ borderColor: `${INK}1f` }}><div><span className={`${serifClass} text-[2.4rem] font-semibold tracking-[0.04em]`}>XIPHIAS</span><p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#0c1f3f]/60">A private global-mobility practice. Residency, citizenship and second passports — arranged with discretion since 2007.</p></div><Btn>Book a consultation</Btn></div>
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">{FCOLS.map((c) => (<div key={c[0]}><p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{c[0]}</p><ul className="mt-4 flex flex-col gap-2.5">{c[1].map((it) => <li key={it}><a href={FHREF[it] ?? "#"} className="text-[13px] text-[#0c1f3f]/60 hover:text-[#0c1f3f]">{it}</a></li>)}</ul></div>))}</div>
        <div className="grid gap-6 border-t pt-8 text-[12px] text-[#0c1f3f]/55 sm:grid-cols-3" style={{ borderColor: `${INK}15` }}><span><span className="font-semibold text-[#0c1f3f]">Dubai</span> · DIFC, Gate Village</span><span><span className="font-semibold text-[#0c1f3f]">London</span> · Mayfair</span><span><span className="font-semibold text-[#0c1f3f]">Bengaluru</span> · UB City</span></div>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-[12px] text-[#0c1f3f]/45 sm:flex-row sm:items-center"><span>© 2026 XIPHIAS Immigration · Licensed in the UAE</span><span className="flex gap-5"><a href="/privacy-policy" className="hover:text-[#0c1f3f]">Privacy</a><a href="/terms" className="hover:text-[#0c1f3f]">Terms</a><a href="/anti-fraud" className="hover:text-[#0c1f3f]">Anti-fraud</a></span></div>
      </div>
    </footer>
  );
}
