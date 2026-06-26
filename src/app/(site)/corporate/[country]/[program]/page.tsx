// src/app/(site)/corporate/[country]/[program]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";
import { getCorporateCountrySlugs, getCorporatePrograms, loadProgramPageSections } from "@/lib/corporate-content";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import ProgramHub, { type ProgramData } from "@/components/Country/ProgramHub";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getCorporateCountrySlugs().flatMap((c) => getCorporatePrograms(c).map((p) => ({ country: c, program: p.programSlug })));
}

export async function generateMetadata(props: { params: Promise<{ country: string; program: string }> }): Promise<Metadata> {
  const params = await props.params;
  try {
    const { meta } = await loadProgramPageSections(params.country, params.program);
    const m = meta as Record<string, any> & { title: string; country: string };
    const seo = m.seo as { title?: string; description?: string; keywords?: string[] } | undefined;
    const title = seo?.title ?? m.title;
    const description = seo?.description ?? m.tagline;
    const heroImage = m.heroImage as string | undefined;
    return { title, description, keywords: seo?.keywords ?? [title, m.country, ...(m.tags ?? [])].join(", "), alternates: { canonical: `/corporate/${params.country}/${params.program}` }, openGraph: { title, description, type: "article", url: `https://www.xiphiasimmigration.com/corporate/${params.country}/${params.program}`, siteName: "XIPHIAS Immigration", locale: "en_US", images: [{ url: heroImage ?? "/xiphias-immigration.png", width: 1200, height: 630, alt: `${title} – XIPHIAS Immigration` }] }, twitter: { card: "summary_large_image", title, description, images: [heroImage ?? "/xiphias-immigration.png"] } };
  } catch { return { title: "Programme not found" }; }
}

function money(n?: number, c?: string) { if (typeof n !== "number") return undefined; const sym = c === "USD" ? "$" : c === "EUR" ? "€" : c === "GBP" ? "£" : ""; return `${sym}${n.toLocaleString("en-US")}${sym ? "" : c ? ` ${c}` : ""}`; }
const ROUTE_LABEL: Record<string, string> = { donation: "Donation", "real-estate": "Real estate", bond: "Bond", naturalisation: "Naturalisation" };

export default async function ProgramPage(props: { params: Promise<{ country: string; program: string }> }) {
  const { country, program } = await props.params;
  const p = getCorporatePrograms(country).find((x) => x.programSlug === program) as (Record<string, any> & { title: string; country: string; countrySlug: string }) | undefined;
  if (!p) return notFound();
  const stats: { label: string; value: string }[] = [];
  if (typeof p.minInvestment === "number") stats.push({ label: "From", value: money(p.minInvestment, p.currency)! });
  if (p.timelineLabel || typeof p.timelineMonths === "number") stats.push({ label: "Timeline", value: p.timelineLabel ?? `${p.timelineMonths} mo` });
  if (p.routeType) stats.push({ label: "Route", value: ROUTE_LABEL[p.routeType] ?? String(p.routeType) });
  const data: ProgramData = { vertical: "Corporate Mobility", verticalSlug: "corporate", country: p.country, countrySlug: p.countrySlug ?? country, title: p.title, tagline: typeof p.tagline === "string" ? p.tagline : undefined, heroImage: (p.heroImage as string) ?? "/xiphias-immigration.png", brochure: typeof p.brochure === "string" ? p.brochure : undefined, stats: stats.slice(0, 4), benefits: Array.isArray(p.benefits) ? p.benefits : [], prices: Array.isArray(p.prices) ? p.prices.map((r: any) => ({ label: r.label, amount: money(r.amount, r.currency ?? p.currency), when: r.when, notes: r.notes })) : [], governmentFees: Array.isArray(p.governmentFees) ? p.governmentFees.map((g: any) => ({ label: g.label, amount: money(g.amount, g.currency ?? p.currency) })) : [], proofOfFunds: Array.isArray(p.proofOfFunds) ? p.proofOfFunds.map((x: any) => ({ label: x.label, amount: money(x.amount, x.currency ?? p.currency), notes: x.notes })) : [], requirements: Array.isArray(p.requirements) ? p.requirements : [], disqualifiers: Array.isArray(p.disqualifiers) ? p.disqualifiers : [], faq: Array.isArray(p.faq) ? p.faq : [] };
  return (<><JsonLd data={breadcrumbLd([{ name: "Corporate", url: "/corporate" }, { name: p.country, url: `/corporate/${country}` }, { name: p.title, url: `/corporate/${country}/${program}` }])} /><ProgramHub data={data} serifClass={serif.className} /></>);
}
