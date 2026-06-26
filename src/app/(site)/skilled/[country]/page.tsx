// src/app/(site)/skilled/[country]/page.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { getSkilledCountrySlugs, getSkilledPrograms, getCountryFrontmatter } from "@/lib/skilled-content";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import CountryHub, { type CountryData } from "@/components/Country/CountryHub";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateStaticParams() {
  return getSkilledCountrySlugs().map((slug) => ({ country: slug }));
}

export async function generateMetadata(props: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const params = await props.params;
  const m = getCountryFrontmatter(params.country) as Record<string, unknown> & { title: string; summary?: string };
  const seo = m.seo as { title?: string; description?: string; keywords?: string[] } | undefined;
  const title = seo?.title ?? m.title;
  const description = seo?.description ?? m.summary;
  const heroImage = m.heroImage as string | undefined;
  return { title, description, keywords: seo?.keywords, alternates: { canonical: `/skilled/${params.country}` }, openGraph: { title, description, url: `https://www.xiphiasimmigration.com/skilled/${params.country}`, siteName: "XIPHIAS Immigration", locale: "en_US", type: "website", images: [{ url: heroImage ?? "/xiphias-immigration.png", width: 1200, height: 630, alt: `${title} – XIPHIAS Immigration` }] }, twitter: { card: "summary_large_image", title, description, images: [heroImage ?? "/xiphias-immigration.png"] } };
}

function prettyLabel(k: string) { const map: Record<string, string> = { timeZone: "Time zone", population: "Population", capital: "Capital", language: "Language", currency: "Currency", climate: "Climate" }; return map[k] ?? k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()); }
function money(n: number, c?: string) { const sym = c === "USD" ? "$" : c === "EUR" ? "€" : c === "GBP" ? "£" : ""; return `${sym}${n.toLocaleString("en-US")}${sym ? "" : c ? ` ${c}` : ""}`; }

export default async function CountryPage(props: { params: Promise<{ country: string }> }) {
  const { country: slug } = await props.params;
  const m = getCountryFrontmatter(slug) as Record<string, any> & { country: string; summary?: string };
  const programs = getSkilledPrograms(slug);
  const facts = m.facts && typeof m.facts === "object" ? Object.entries(m.facts).map(([k, v]) => ({ label: prettyLabel(k), value: String(v) })) : [];
  const froms = programs.map((p) => p.minInvestment).filter((n): n is number => typeof n === "number");
  const programmes = programs.map((p) => ({ title: p.title, tagline: p.tagline, from: typeof p.minInvestment === "number" ? `from ${money(p.minInvestment, p.currency)}` : undefined, timeline: p.timelineLabel, href: `/skilled/${slug}/${p.programSlug}` }));
  const stats: { label: string; value: string }[] = [];
  if (m.timelineLabel || m.timelineMonths) stats.push({ label: "Timeline", value: m.timelineLabel ?? `${m.timelineMonths} mo` });
  if (typeof m.visaFreeCount === "number") stats.push({ label: "Visa-free", value: String(m.visaFreeCount) });
  if (programmes.length) stats.push({ label: "Pathways", value: String(programmes.length) });
  const data: CountryData = { vertical: "Skilled Migration", verticalSlug: "skilled", country: m.country, slug, region: typeof m.region === "string" ? m.region : undefined, summary: m.summary ?? "", heroImage: (m.heroImage as string) ?? "/xiphias-immigration.png", brochure: typeof m.brochure === "string" ? m.brochure : undefined, stats: stats.slice(0, 4), overview: typeof m.overview === "string" ? m.overview : "", keyPoints: Array.isArray(m.keyPoints) ? m.keyPoints : [], facts, programmes, process: Array.isArray(m.applicationProcess) ? m.applicationProcess : [], requirements: Array.isArray(m.requirements) ? m.requirements : [], faq: Array.isArray(m.faq) ? m.faq : [] };
  return (<><JsonLd data={breadcrumbLd([{ name: "Skilled Migration", url: "/skilled" }, { name: m.country, url: `/skilled/${slug}` }])} /><CountryHub data={data} serifClass={serif.className} /></>);
}
