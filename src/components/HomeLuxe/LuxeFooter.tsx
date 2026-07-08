"use client";

const GOLD = "#bfa15c";
const INK = "#0c1f3f";

const NAV = [
  {
    heading: "Programmes",
    links: [
      { label: "Golden Visa", href: "/golden-visa" },
      { label: "Citizenship by Investment", href: "/citizenship" },
      { label: "Residency & Relocation", href: "/residency" },
      { label: "Skilled Migration", href: "/skilled" },
      { label: "Corporate Mobility", href: "/corporate" },
      { label: "Work Permits", href: "/work-permits" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { label: "XIA Intelligence", href: "/xia-intelligence" },
      { label: "Passport Power", href: "/passport-index" },
      { label: "Compare Programs", href: "/compare-programs" },
      { label: "Cost Estimator", href: "/cost-estimator" },
      { label: "Eligibility Check", href: "/eligibility" },
      { label: "Route Intelligence", href: "/route-intelligence" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Insights", href: "/insights" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Awards", href: "/awards" },
      { label: "Events", href: "/events" },
      { label: "Gallery", href: "/gallery" },
      { label: "Partner With Us", href: "/partner-with-us" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Anti-fraud Notice", href: "/anti-fraud" },
      { label: "Cookie Preferences", href: "#" },
    ],
  },
] as const;

const OFFICES = [
  "Dubai", "Bengaluru", "Gurugram", "Leicester",
  "Larnaca", "Lisbon", "Valletta", "València",
  "Waterloo", "Montreal", "Melbourne", "Auckland",
  "Los Angeles", "Doha", "São Paulo",
];

export default function LuxeFooter({ serifClass }: { serifClass: string }) {
  return (
    <footer data-tone="light" className="relative px-6 pb-8 pt-12 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f7faff" }}>
      <div className="mx-auto max-w-6xl">

        {/* ── brand row ── */}
        <div
          className="flex flex-col gap-5 border-b pb-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: `${INK}18` }}
        >
          <div className="flex items-baseline gap-4">
            <span className={`${serifClass} text-[1.8rem] font-semibold tracking-[0.04em]`}>XIPHIAS</span>
            <span className="hidden text-[12px] text-[#0c1f3f]/40 sm:inline">Private global mobility · Est. 2007</span>
          </div>
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em]"
            style={{ background: GOLD, color: "#0a1733" }}
          >
            Book a consultation
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* ── nav columns ── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-8 md:grid-cols-4">
          {NAV.map((col) => (
            <div key={col.heading}>
              <p
                className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: GOLD }}
              >
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href === "#" ? (
                      <button
                        type="button"
                        onClick={() => { (window as Window & { showCookiePreferences?: () => void }).showCookiePreferences?.(); }}
                        className="text-left text-[12.5px] text-[#0c1f3f]/55 transition-colors hover:text-[#0c1f3f]"
                      >
                        {l.label}
                      </button>
                    ) : (
                      <a
                        href={l.href}
                        className="text-[12.5px] text-[#0c1f3f]/55 transition-colors hover:text-[#0c1f3f]"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── bottom bar ── */}
        <div
          className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: `${INK}12` }}
        >
          {/* office cities */}
          <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
            {OFFICES.map((city, i) => (
              <span key={city} className="text-[11px] text-[#0c1f3f]/38">
                {city}{i < OFFICES.length - 1 && <span className="mx-1 opacity-30">·</span>}
              </span>
            ))}
          </div>

          {/* copyright */}
          <p className="shrink-0 text-[11px] text-[#0c1f3f]/38">
            © {new Date().getFullYear()} XIPHIAS Immigration DMCC · Licensed in the UAE
          </p>
        </div>

        {/* ── compliance note ── */}
        <p className="mt-4 max-w-2xl text-[10.5px] leading-relaxed text-[#0c1f3f]/28">
          XIPHIAS Immigration DMCC advises on lawful immigration pathways. We do not provide legal advice. Content is for informational purposes only. Results may vary based on individual circumstances and jurisdiction.
        </p>
      </div>
    </footer>
  );
}
