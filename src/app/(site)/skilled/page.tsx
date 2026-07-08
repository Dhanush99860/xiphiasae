// src/app/(site)/skilled/page.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { getSkilledCountries, type CountryMeta } from "@/lib/skilled-content";
import { JsonLd } from "@/lib/seo";
import VerticalHub, { type VerticalConfig } from "@/components/Vertical/VerticalHub";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Skilled Migration Visa — Canada, Australia & UK | XIPHIAS",
  description:
    "Canada Express Entry, Australia skilled visa, UK Skilled Worker & Germany Blue Card. Permanent residence through your profession. Dubai.",
  alternates: { canonical: "/skilled" },
  openGraph: {
    title: "Skilled Migration Visa — Canada, Australia & UK | XIPHIAS",
    description: "Canada Express Entry, Australia points visa, UK Skilled Worker & Germany Opportunity Card. PR through your profession, arranged from Dubai.",
    url: "https://www.xiphiasimmigration.com/skilled",
    siteName: "XIPHIAS Immigration", locale: "en_US", type: "website",
    images: [{ url: "/xiphias-immigration.png", width: 1200, height: 630, alt: "Skilled Migration – XIPHIAS Immigration" }],
  },
  twitter: { card: "summary_large_image", title: "Skilled Migration — XIPHIAS", description: "Express Entry, points-based and employer-sponsored PR routes.", images: ["/xiphias-immigration.png"] },
};

const config: VerticalConfig = {
  verticalSlug: "skilled",
  vertical: "Skilled Migration",
  curtainLabel: "Skilled Migration",
  heroImage: "/images/skilled/canada/canada-express-entry.webp",
  heroEyebrow: "Skilled Migration",
  heroEyebrowAr: "الهجرة الماهرة",
  heroTitle: "Your skills,",
  heroTitleItalic: "your new country.",
  heroSummary: "Permanent residence through your profession — Express Entry, points-based and employer-sponsored routes to Canada, Australia, the UK, Germany and beyond.",
  heroChips: ["Points-based PR", "Employer-sponsored", "Whole family"],
  heroStats: [{ v: "7", u: "countries" }, { v: "PR", u: "pathways" }, { v: "Family", u: "included" }, { v: "17 yrs", u: "advising" }],
  whyHeading: "A private-client approach",
  whyHeadingItalic: "to skilled migration.",
  whySubline: "Most advisers submit and hope. We score, optimise and track your profile through every draw.",
  whyProps: [
    { no: "01", title: "Profile scoring & strategy", line: "We assess every points factor before you commit.", detail: "Canada CRS, Australia points test, UK shortage SOL — we model your score across systems and optimise every factor before the first submission." },
    { no: "02", title: "Credential & language planning", line: "We map your qualifications to each country's recognition rules.", detail: "Assessment bodies, language benchmarks and occupational thresholds — we identify gaps early and plan around them." },
    { no: "03", title: "End-to-end submission", line: "From your expression of interest to your PR grant.", detail: "One desk handles your EOI, provincial nomination, ITA and final application — with status updates at every stage." },
    { no: "04", title: "Family included from day one", line: "Spouse, children and dependants — all in scope.", detail: "We plan for your whole family from the first consultation, not as an afterthought when the process is already underway." },
  ],
  quotes: [
    { q: "XIPHIAS managed our Canada PR from start to finish — CRS scoring, PNP, ITA and landing. Genuinely end-to-end.", who: "A software architect", where: "Bengaluru" },
    { q: "They optimised my points, found the right provincial stream and had me with an ITA in 6 months.", who: "A registered nurse", where: "Hyderabad" },
    { q: "The most professional advisory. Every document, every deadline — managed without us chasing once.", who: "A finance professional", where: "Mumbai" },
  ],
  articles: [
    { cat: "Express Entry", title: "Canada Express Entry 2025: what changed and what's next", meta: "7 min read · Skilled", img: "/images/skilled/canada/canada-express-entry.webp", href: "/insights" },
    { cat: "Points-based", title: "Australia 189 vs 190 visa: which route fits your profile", meta: "5 min read · Skilled", img: "/images/skilled/australia/australia-186-employer-visa.webp", href: "/insights" },
    { cat: "Global Talent", title: "UK Global Talent Visa: who qualifies and how to apply", meta: "6 min read · Skilled", img: "/images/skilled/united-kingdom/uk-global-talent.webp", href: "/insights" },
  ],
  destHeading: "Where your skills take you",
  destSub: "Seven skilled-migration destinations.",
  regions: ["All", "Americas", "Europe", "Oceania"],
  countries: [
    { name: "Canada", slug: "canada", region: "Americas", img: "/images/skilled/canada/canada-express-entry.webp", note: "Express Entry · PNP" },
    { name: "Australia", slug: "australia", region: "Oceania", img: "/images/skilled/australia/australia-186-employer-visa.webp", note: "Points-based · 189/190/186" },
    { name: "United Kingdom", slug: "united-kingdom", region: "Europe", img: "/images/skilled/united-kingdom/uk-global-talent.webp", note: "Skilled Worker · Global Talent" },
    { name: "Germany", slug: "germany", region: "Europe", img: "/images/skilled/germany/germany-immigration.webp", note: "Opportunity Card · Blue Card" },
    { name: "United States", slug: "usa", region: "Americas", img: "/images/skilled/usa/eb1a.webp", note: "EB-1 · EB-2 NIW" },
    { name: "Italy", slug: "italy", region: "Europe", img: "/images/skilled/italy/italy-digital-nomad-visa.webp", note: "Work & talent routes" },
    { name: "Spain", slug: "spain", region: "Europe", img: "/images/skilled/spain/spain-digital-nomad-visa.webp", note: "Work & digital-nomad routes" },
  ],
  routesEyebrow: "How you qualify",
  routesEyebrowAr: "المسارات",
  routesTitle: "Four routes,",
  routesTitleItalic: "one new life.",
  routes: [
    { k: "Points-based PR", tag: "Express Entry & equivalents", line: "Permanent residence scored on age, education, language and experience — Canada's Express Entry, Australia's points test and more.", points: ["Direct to permanent residence", "No job offer required", "Profile optimisation & ranking"] },
    { k: "Employer-sponsored", tag: "A job offer to a visa", line: "A confirmed role becomes a work visa and a route to settlement — UK Skilled Worker, US H-1B/EB, Australia 186.", points: ["Employer sponsorship", "Work visa to PR", "Sponsor & role matching"] },
    { k: "Provincial / state nomination", tag: "Regional fast-tracks", line: "Province- and state-level streams with lower thresholds and faster timelines for in-demand occupations.", points: ["PNP & state nomination", "In-demand occupations", "Faster processing"] },
    { k: "Global talent", tag: "For exceptional skills", line: "Fast-track routes for leaders in tech, science, academia and the arts — UK Global Talent, US EB-1 and equivalents.", points: ["Talent endorsement", "Top-tier fast-track", "Minimal restrictions"] },
  ],
  process: [
    { no: "01", title: "Private consultation", detail: "We understand your profession, goals and family, and recommend the country and route that fit best.", handle: ["Goals & profile", "Country & route fit", "Under NDA"] },
    { no: "02", title: "Eligibility & scoring", detail: "We score your profile against each system and optimise it — points, language, credentials, experience.", handle: ["Points / eligibility score", "Profile optimisation", "Credential & language plan"] },
    { no: "03", title: "Application & submission", detail: "We assemble and submit your expression of interest, profile or visa application end to end.", handle: ["EOI / profile", "Document assembly", "Government submission"] },
    { no: "04", title: "Invitation & approval", detail: "On invitation or sponsorship, we file your permanent-residence or work-visa application and track it through.", handle: ["Invitation to apply", "PR / visa application", "Status tracking"] },
    { no: "05", title: "Arrival & settlement", detail: "Your residence is granted for you and your family — and we help with the landing, banking and schooling.", handle: ["PR / visa granted", "Family included", "Settling-in support"] },
  ],
  ctaHeading: "Begin your",
  ctaItalic: "skilled visa.",
  ctaSummary: "Tell us your profession and goal. A senior advisor will score your profile and map the fastest route — privately.",
  ctaImage: "/images/skilled/australia/australia-186-employer-visa.webp",
};

export default function SkilledPage() {
  const countries: CountryMeta[] = getSkilledCountries();
  const ld = {
    "@context": "https://schema.org", "@type": "ItemList", name: "Skilled Migration Destinations",
    itemListElement: countries.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `https://www.xiphiasimmigration.com/skilled/${c.countrySlug}`, name: c.title || c.country })),
  };
  return (<><JsonLd data={ld} /><VerticalHub c={config} serifClass={serif.className} /></>);
}
