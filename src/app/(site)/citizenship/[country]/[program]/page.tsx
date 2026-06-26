// app/(site)/citizenship/[country]/[program]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";
import {
  getCitizenshipCountrySlugs,
  getCitizenshipPrograms,
  loadProgramPageSections,
} from "@/lib/citizenship-content";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import ProgramHub, { type ProgramData } from "@/components/Country/ProgramHub";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getCitizenshipCountrySlugs().flatMap((c) => getCitizenshipPrograms(c).map((p) => ({ country: c, program: p.programSlug })));
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
    const canonicalPath = `/citizenship/${params.country}/${params.program}`;
    return {
      title, description, keywords: seo?.keywords ?? [title, m.country, ...(m.tags ?? [])].join(", "),
      alternates: { canonical: canonicalPath },
      openGraph: { title, description, type: "article", url: `https://www.xiphiasimmigration.com${canonicalPath}`, siteName: "XIPHIAS Immigration", locale: "en_US", images: [{ url: heroImage ?? "/xiphias-immigration.png", width: 1200, height: 630, alt: `${title} – XIPHIAS Immigration` }] },
      twitter: { card: "summary_large_image", title, description, images: [heroImage ?? "/xiphias-immigration.png"] },
    };
  } catch {
    return { title: "Programme not found" };
  }
}

function money(n?: number, c?: string) {
  if (typeof n !== "number") return undefined;
  const sym = c === "USD" ? "$" : c === "EUR" ? "€" : c === "GBP" ? "£" : "";
  return `${sym}${n.toLocaleString("en-US")}${sym ? "" : c ? ` ${c}` : ""}`;
}
const ROUTE_LABEL: Record<string, string> = { donation: "Donation", "real-estate": "Real estate", bond: "Bond", naturalisation: "Naturalisation" };

export default async function ProgramPage(props: { params: Promise<{ country: string; program: string }> }) {
  const params = await props.params;
  const { country, program } = params;
  const p = getCitizenshipPrograms(country).find((x) => x.programSlug === program) as (Record<string, any> & { title: string; country: string; countrySlug: string }) | undefined;
  if (!p) return notFound();

  const stats: { label: string; value: string }[] = [];
  if (typeof p.minInvestment === "number") stats.push({ label: "Invest from", value: money(p.minInvestment, p.currency)! });
  if (p.timelineLabel || typeof p.timelineMonths === "number") stats.push({ label: "Timeline", value: p.timelineLabel ?? `${p.timelineMonths} mo` });
  if (p.routeType) stats.push({ label: "Route", value: ROUTE_LABEL[p.routeType] ?? String(p.routeType) });
  if (typeof p.holdingPeriodMonths === "number") stats.push({ label: "Hold", value: `${p.holdingPeriodMonths} mo` });

  const data: ProgramData = {
    vertical: "Citizenship by Investment",
    verticalSlug: "citizenship",
    country: p.country,
    countrySlug: p.countrySlug ?? country,
    title: p.title,
    tagline: typeof p.tagline === "string" ? p.tagline : undefined,
    heroImage: (p.heroImage as string) ?? "/xiphias-immigration.png",
    brochure: typeof p.brochure === "string" ? p.brochure : undefined,
    stats: stats.slice(0, 4),
    benefits: Array.isArray(p.benefits) ? p.benefits : [],
    prices: Array.isArray(p.prices) ? p.prices.map((r: any) => ({ label: r.label, amount: money(r.amount, r.currency ?? p.currency), when: r.when, notes: r.notes })) : [],
    governmentFees: Array.isArray(p.governmentFees) ? p.governmentFees.map((g: any) => ({ label: g.label, amount: money(g.amount, g.currency ?? p.currency) })) : [],
    proofOfFunds: Array.isArray(p.proofOfFunds) ? p.proofOfFunds.map((x: any) => ({ label: x.label, amount: money(x.amount, x.currency ?? p.currency), notes: x.notes })) : [],
    requirements: Array.isArray(p.requirements) ? p.requirements : [],
    disqualifiers: Array.isArray(p.disqualifiers) ? p.disqualifiers : [],
    faq: Array.isArray(p.faq) ? p.faq : [],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Citizenship", url: "/citizenship" }, { name: p.country, url: `/citizenship/${country}` }, { name: p.title, url: `/citizenship/${country}/${program}` }])} />
      <ProgramHub data={data} serifClass={serif.className} />
    </>
  );
}
