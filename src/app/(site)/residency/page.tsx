// src/app/(site)/residency/page.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { getResidencyCountries, getResidencyPrograms, type ProgramMeta, type CountryMeta } from "@/lib/residency-content";
import { JsonLd } from "@/lib/seo";
import VerticalHub, { type VerticalConfig } from "@/components/Vertical/VerticalHub";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Residency & Golden Visas — Investor Residence, Privately Arranged | XIPHIAS",
  description:
    "A 10-year UAE Golden Visa, EU golden visas and global investor residence across 20+ jurisdictions — real estate, fund and capital-transfer routes, arranged end-to-end. Book a private consultation.",
  alternates: { canonical: "/residency" },
  openGraph: {
    title: "Residency & Golden Visas — Investor Residence, Privately Arranged",
    description:
      "Investor residence across 20+ jurisdictions — the UAE Golden Visa, Portugal, Greece, Malta and more, arranged with discretion from Dubai.",
    url: "https://www.xiphiasimmigration.com/residency",
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: [{ url: "/xiphias-immigration.png", width: 1200, height: 630, alt: "Residency & Golden Visas – XIPHIAS Immigration" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Residency & Golden Visas — Investor Residence, Privately Arranged",
    description: "Investor residence across 20+ jurisdictions, arranged with discretion from Dubai.",
    images: ["/xiphias-immigration.png"],
  },
};

const config: VerticalConfig = {
  verticalSlug: "residency",
  vertical: "Residency & Golden Visas",
  curtainLabel: "Residency & Golden Visas",
  heroImage: "/images/residency/uae/uae-golden-visa.webp",
  heroEyebrow: "Residency & Golden Visas",
  heroEyebrowAr: "الإقامة والفيزا الذهبية",
  heroTitle: "Residency & golden visas,",
  heroTitleItalic: "expertly arranged.",
  heroSummary:
    "A 10-year UAE Golden Visa, an EU golden visa or a global investor residence — the right to live, work and retire across 20+ jurisdictions, arranged end-to-end.",
  heroChips: ["EU & Schengen access", "10-year UAE Golden Visa", "Family included"],
  heroStats: [
    { v: "20+", u: "jurisdictions" },
    { v: "€50k", u: "entry point" },
    { v: "188", u: "visa-free max" },
    { v: "10-yr", u: "residency" },
  ],
  whyHeading: "Investor residence,",
  whyHeadingItalic: "properly arranged.",
  whySubline:
    "We match you to the jurisdiction before we recommend the programme — not the other way around.",
  whyProps: [
    {
      no: "01",
      title: "Jurisdiction matching",
      line: "We match you to the programme — not the other way around.",
      detail:
        "Tax residency, travel patterns, family situation, investment preference — we map all four before recommending a single programme.",
    },
    {
      no: "02",
      title: "Investment-route compliance",
      line: "Source of funds, anti-money-laundering, due diligence.",
      detail:
        "We prepare your compliance file before the government does their checks — so there are no surprises and no rejections at the due-diligence stage.",
    },
    {
      no: "03",
      title: "End-to-end execution",
      line: "From first consultation to residence card.",
      detail:
        "We handle the application, the investment, the legal structuring and the travel — so you appear in the country to collect your card, not to manage paperwork.",
    },
    {
      no: "04",
      title: "Family fully in scope",
      line: "Spouse, children, dependent parents.",
      detail:
        "We plan the family application from day one — not as an add-on when the individual application is already in progress.",
    },
  ],
  destHeading: "Where we secure residency",
  destSub: "Twenty jurisdictions to call home.",
  regions: ["All", "Europe", "Gulf", "Asia", "Caribbean"],
  countries: [
    { name: "United Arab Emirates", slug: "uae",      region: "Gulf",      img: "/images/residency/uae/uae-golden-visa.webp",                                      time: "2–4 wks",  visa: "183", from: "$545k",   note: "10-yr Golden Visa" },
    { name: "Portugal",             slug: "portugal", region: "Europe",    img: "/images/residency/portugal/portugal-golden-visa.webp",                             time: "6–9 mo",   visa: "188", from: "€500k",  note: "EU · citizenship in 5 yrs" },
    { name: "Greece",               slug: "greece",   region: "Europe",    img: "/images/residency/greece/greece-golden-visa.webp",                                  time: "2–4 mo",   visa: "186", from: "€250k",  note: "Schengen" },
    { name: "Malta",                slug: "malta",    region: "Europe",    img: "/images/residency/malta/malta-mprp.webp",                                           time: "4–6 mo",   visa: "184", from: "€182k",  note: "Permanent residence" },
    { name: "Cyprus",               slug: "cyprus",   region: "Europe",    img: "/images/residency/cyprus/cyprus-residential-property.webp",                        time: "2–3 mo",   visa: "182", from: "€300k",  note: "Permanent residence" },
    { name: "Hungary",              slug: "hungary",  region: "Europe",    img: "/images/residency/hungary/hungary-residency-by-investment.webp",                   time: "3–6 mo",   visa: "186", from: "€250k",  note: "Guest Investor" },
    { name: "Bulgaria",             slug: "bulgaria", region: "Europe",    img: "/images/residency/bulgaria/bulgaria-aif.webp",                                     time: "6 mo",     visa: "176", from: "€512k",  note: "EU permanent residence" },
    { name: "Singapore",            slug: "singapore",region: "Asia",      img: "/images/residency/singapore/singapore-gip-pr-investment-hero.webp",                time: "9–12 mo",  visa: "195", from: "S$10M",  note: "Global Investor (GIP)" },
    { name: "Curaçao",              slug: "curacao",  region: "Caribbean", img: "/images/residency/curacao/curacao-3-year-investor-residency.webp",                 time: "3–4 mo",   visa: "187", from: "$280k",  note: "Dutch citizenship in 5 yrs" },
  ],
  routesEyebrow: "How you invest",
  routesEyebrowAr: "طرق الاستثمار",
  routesTitle: "Three routes.",
  routesTitleItalic: "One global residence.",
  routes: [
    {
      k: "Real estate",
      tag: "Tangible & resaleable",
      line: "Buy a qualifying property and hold it — your capital stays in a hard asset that can be sold after the holding period.",
      points: ["Tangible, resaleable asset", "Potential rental yield", "Capital retained, not spent"],
    },
    {
      k: "Investment fund",
      tag: "Regulated & passive",
      line: "Subscribe to a government-approved fund — a hands-off, professionally managed route with no property to maintain.",
      points: ["Fully passive", "Regulated & diversified", "No asset management required"],
    },
    {
      k: "Capital transfer",
      tag: "Simple & liquid",
      line: "A bank deposit, business or talent route — the fastest, cleanest path to a Gulf or EU residence permit.",
      points: ["Fewest moving parts", "Fast to permit", "Liquid capital retained"],
    },
  ],
  process: [
    {
      no: "01",
      title: "Private consultation",
      detail: "We understand your goals — mobility, tax, family, a base or a path to citizenship — and recommend the right residence programme.",
      handle: ["Jurisdiction & route strategy", "Indicative costs & timeline", "Under NDA from day one"],
    },
    {
      no: "02",
      title: "Eligibility & source of funds",
      detail: "We pre-clear your source of funds and confirm eligibility before anything is filed, so there are no surprises.",
      handle: ["Source-of-funds dossier", "Eligibility confirmation", "Full document checklist"],
    },
    {
      no: "03",
      title: "Application & investment",
      detail: "We assemble and submit your application and guide the qualifying investment — property, fund or transfer.",
      handle: ["Full application assembly", "Government submission", "Qualifying investment guide"],
    },
    {
      no: "04",
      title: "Residence granted",
      detail: "Your residence permit or golden visa is issued for you and your family — and we handle the formalities on arrival.",
      handle: ["Permit / visa issued", "Family included", "Banking & relocation"],
    },
    {
      no: "05",
      title: "Renewal & the path onward",
      detail: "We manage renewals and, where you wish, the route to permanent residence and citizenship.",
      handle: ["Renewals managed", "Path to PR & citizenship", "Lifetime concierge"],
    },
  ],
  quotes: [
    {
      q: "XIPHIAS matched us to the UAE Golden Visa and arranged everything — from our investment to the residence cards — in under three months.",
      who: "A family principal",
      where: "Dubai",
    },
    {
      q: "They recommended Portugal's golden visa over three others we were considering, and explained exactly why. That clarity was everything.",
      who: "A business owner",
      where: "Mumbai",
    },
    {
      q: "The most professional advisory I've worked with. Every step documented, every deadline met — and the whole family included.",
      who: "A senior executive",
      where: "Singapore",
    },
  ],
  articles: [
    {
      cat: "Golden Visa",
      title: "UAE Golden Visa 2025: the complete updated guide",
      meta: "8 min read · Residency",
      img: "/images/residency/uae/uae-golden-visa.webp",
      href: "/insights",
    },
    {
      cat: "Investor Residence",
      title: "Portugal Golden Visa: what routes are still open in 2025",
      meta: "6 min read · Residency",
      img: "/images/residency/portugal/portugal-golden-visa.webp",
      href: "/insights",
    },
    {
      cat: "Investor Residence",
      title: "Greece €250k Golden Visa: the complete investor guide",
      meta: "5 min read · Residency",
      img: "/images/residency/greece/greece-golden-visa.webp",
      href: "/insights",
    },
  ],
  ctaHeading: "Begin your",
  ctaItalic: "residence.",
  ctaSummary:
    "Tell us your goals — mobility, tax, family or a path to citizenship. A senior advisor will match the right programme and jurisdiction, privately.",
  ctaImage: "/images/residency/portugal/portugal-golden-visa.webp",
};

export default function ResidencyPage() {
  const countries: CountryMeta[] = getResidencyCountries();
  const programs: ProgramMeta[] = getResidencyPrograms();

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Residency & Golden Visas — Investor Residence, Privately Arranged",
    url: "https://www.xiphiasimmigration.com/residency",
    description: "Investor residence across 20+ jurisdictions — the UAE Golden Visa, Portugal, Greece, Malta and more.",
  };
  const countryListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Residency Countries",
    itemListElement: countries.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `https://www.xiphiasimmigration.com/residency/${c.countrySlug}`,
      name: c.title || c.country,
    })),
  };
  const topProgramsLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top Residency Programmes",
    itemListElement: programs.slice(0, 5).map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `https://www.xiphiasimmigration.com/residency/${p.countrySlug}/${p.programSlug}`,
      name: p.title,
    })),
  };

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={countryListLd} />
      <JsonLd data={topProgramsLd} />
      <VerticalHub c={config} serifClass={serif.className} />
    </>
  );
}
