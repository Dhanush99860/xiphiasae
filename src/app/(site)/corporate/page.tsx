// src/app/(site)/corporate/page.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { getCorporateCountries, type CountryMeta } from "@/lib/corporate-content";
import { JsonLd } from "@/lib/seo";
import VerticalHub, { type VerticalConfig } from "@/components/Vertical/VerticalHub";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Corporate Mobility — Intra-Company Transfers, Market Entry & Relocation | XIPHIAS",
  description:
    "Corporate immigration done end-to-end: intra-company transfers (L-1/ICT), company setup and compliant workforce relocation across the UAE, UK, EU and US. One accountable partner for founders, HR and global teams.",
  alternates: { canonical: "/corporate" },
  openGraph: {
    title: "Corporate Mobility — Move Your People Across Borders",
    description: "Intra-company transfers, market entry and compliant workforce relocation, arranged from Dubai.",
    url: "https://www.xiphiasimmigration.com/corporate",
    siteName: "XIPHIAS Immigration", locale: "en_US", type: "website",
    images: [{ url: "/xiphias-immigration.png", width: 1200, height: 630, alt: "Corporate Mobility – XIPHIAS Immigration" }],
  },
  twitter: { card: "summary_large_image", title: "Corporate Mobility — XIPHIAS", description: "Intra-company transfers, market entry and relocation.", images: ["/xiphias-immigration.png"] },
};

const config: VerticalConfig = {
  verticalSlug: "corporate",
  vertical: "Corporate Mobility",
  curtainLabel: "Corporate Mobility",
  heroImage: "/images/corporate/uae/dubai-corporate-immigration.webp",
  heroEyebrow: "Corporate Mobility",
  heroEyebrowAr: "تنقل الشركات",
  heroTitle: "Move your people,",
  heroTitleItalic: "across borders.",
  heroSummary: "Intra-company transfers, market entry and compliant workforce relocation — one accountable partner for founders, HR and global teams across seven jurisdictions.",
  heroChips: ["Intra-company transfers", "Market entry", "Compliant at scale"],
  heroStats: [{ v: "7", u: "jurisdictions" }, { v: "L-1 · ICT", u: "transfers" }, { v: "EOR", u: "& payroll" }, { v: "17 yrs", u: "advising" }],
  destHeading: "Where we move your teams",
  destSub: "Seven markets, one partner.",
  regions: ["All", "Europe", "Gulf", "Americas"],
  countries: [
    { name: "United Arab Emirates", slug: "uae", region: "Gulf", img: "/images/corporate/uae/dubai-corporate-immigration.webp", note: "Free-zone & mainland setup" },
    { name: "United Kingdom", slug: "united-kingdom", region: "Europe", img: "/images/corporate/uk/expansion-worker-visa.webp", note: "Expansion Worker · sponsor licence" },
    { name: "United States", slug: "usa", region: "Americas", img: "/images/corporate/usa/l1-visa-usa.webp", note: "L-1 intra-company transfer" },
    { name: "Canada", slug: "canada", region: "Americas", img: "/images/corporate/canada/canada-corporate-immigration.webp", note: "ICT & Global Talent" },
    { name: "Portugal", slug: "portugal", region: "Europe", img: "/images/corporate/portugal/portugal-corporate-immigration.webp", note: "EU base & relocation" },
    { name: "Spain", slug: "spain", region: "Europe", img: "/images/corporate/spain/spain-company-formation.webp", note: "Company formation" },
    { name: "Cyprus", slug: "cyprus", region: "Europe", img: "/images/corporate/cyprus/cyprus-company-setup.webp", note: "HQ & company setup" },
  ],
  routesEyebrow: "What we handle",
  routesEyebrowAr: "خدماتنا",
  routesTitle: "Mobility,",
  routesTitleItalic: "without the friction.",
  routes: [
    { k: "Intra-company transfer", tag: "Move key people", line: "L-1, ICT and sponsor-licence routes to move executives and specialists between your offices — fast and compliant.", points: ["L-1 / ICT visas", "Sponsor-licence support", "Executive & specialist transfers"] },
    { k: "Market entry & setup", tag: "Establish a new market", line: "Company formation, free-zone or mainland setup and the visas to staff it — in the UAE, UK, EU and US.", points: ["Company formation", "Free-zone & mainland", "Director & investor visas"] },
    { k: "Workforce relocation", tag: "Relocate at scale", line: "End-to-end relocation for teams — immigration, payroll, employer-of-record and the family logistics that come with it.", points: ["Team relocation", "EOR & payroll", "Family & settling-in"] },
  ],
  process: [
    { no: "01", title: "Discovery & scope", detail: "We map your move — who, where and by when — and the entities, visas and compliance involved.", handle: ["Headcount & roles", "Target jurisdictions", "Under NDA"] },
    { no: "02", title: "Structure & strategy", detail: "We design the right entity, visa categories and timeline for your expansion or transfer.", handle: ["Entity & visa strategy", "Cost & timeline", "Compliance map"] },
    { no: "03", title: "Filing & setup", detail: "We establish entities, secure sponsor licences and file every application — managed by one desk.", handle: ["Company formation", "Sponsor licence", "Visa applications"] },
    { no: "04", title: "Approvals", detail: "Visas and permits are granted for your people, and we manage every government interaction.", handle: ["Visa approvals", "Government liaison", "Status tracking"] },
    { no: "05", title: "Relocation & ongoing", detail: "We relocate your teams and stay on for renewals, payroll and new hires.", handle: ["Relocation & settling-in", "Payroll / EOR", "Renewals & new hires"] },
  ],
  ctaHeading: "Mobilise your",
  ctaItalic: "team.",
  ctaSummary: "Tell us where you're going. A senior advisor will map the visas, entities and timelines — privately, and end to end.",
  ctaImage: "/images/corporate/uae/dubai-corporate-immigration.webp",
};

export default function CorporatePage() {
  const countries: CountryMeta[] = getCorporateCountries();
  const ld = {
    "@context": "https://schema.org", "@type": "ItemList", name: "Corporate Mobility Destinations",
    itemListElement: countries.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `https://www.xiphiasimmigration.com/corporate/${c.countrySlug}`, name: c.title || c.country })),
  };
  return (<><JsonLd data={ld} /><VerticalHub c={config} serifClass={serif.className} /></>);
}
