// ✅ src/app/(site)/[vertical]/page.tsx
// Vertical index: lists countries for a given vertical

import { getAllContentCached } from "@/lib/content";
import type { Metadata } from "next";
import type { Vertical, ProgramDoc } from "@/lib/content/types";
import { notFound } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";

import { JsonLd, breadcrumbLd } from "@/lib/seo"; // ✅ add

import { VerticalLanding, type VerticalLandingData } from "@/components/Vertical/CatchAllHubs";
import { countryImage } from "@/components/Countries/country-image";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

// Editorial frames for the full-bleed vertical hero / CTA (real assets in /public).
const VERTICAL_HERO: Record<string, { hero: string; cta: string }> = {
  residency: { hero: "/images/blogs/european-investment.webp", cta: "/images/blogs/global-millionaire-migration.webp" },
  citizenship: { hero: "/images/blogs/caribbean-second-passport.webp", cta: "/images/blogs/global-millionaire-migration.webp" },
  skilled: { hero: "/images/blogs/canada-investment-immigration.webp", cta: "/images/blogs/global-millionaire-migration.webp" },
  corporate: { hero: "/images/blogs/dubai-expat-destination.webp", cta: "/images/blogs/global-millionaire-migration.webp" },
};

export const runtime = "nodejs"; // ensure Node.js runtime on Vercel (fs OK)

const VERTICALS: Vertical[] = ["residency", "citizenship", "skilled", "corporate"];

export function generateStaticParams() {
  return VERTICALS.map((v) => ({ vertical: v }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { vertical: Vertical };
}): Promise<Metadata> {
  const { vertical } = params;
  if (!VERTICALS.includes(vertical)) {
    return { title: "Not found" };
  }

  const capVertical = vertical.charAt(0).toUpperCase() + vertical.slice(1);
  const title = `${capVertical} Programs by Country`;
  const description = `Browse ${vertical} programs, grouped by country.`;
  const canonicalPath = `/${vertical}`;
  const canonicalUrl = `https://www.xiphiasimmigration.com${canonicalPath}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "XIPHIAS Immigration",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/xiphias-immigration.png",
          width: 1200,
          height: 630,
          alt: `${title} – XIPHIAS Immigration`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/xiphias-immigration.png"],
    },
  };
}

export default function VerticalPage({
  params,
}: {
  params: { vertical: Vertical };
}) {
  const { vertical } = params;

  // Extra guard (helps keep logs clean on Vercel)
  if (!VERTICALS.includes(vertical)) return notFound();

  const docs = getAllContentCached();

  // Narrow AnyDoc -> ProgramDoc
  const programs = docs.filter(
    (d): d is ProgramDoc => d.kind === "program" && d.vertical === vertical
  );

  // Aggregate counts by country
  const byCountry = new Map<string, number>();
  for (const p of programs) {
    if (!p.country) continue; // safety
    byCountry.set(p.country, (byCountry.get(p.country) ?? 0) + 1);
  }

  const countries = [...byCountry.entries()].sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  const capVertical = vertical.charAt(0).toUpperCase() + vertical.slice(1);

  // ✅ Breadcrumb JSON-LD (absolute URLs + valid schema format)
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Home", url: "/" },
    { name: capVertical, url: `/${vertical}` },
  ]);

  const frames = VERTICAL_HERO[vertical] ?? VERTICAL_HERO.residency;

  const data: VerticalLandingData = {
    verticalSlug: vertical,
    vertical: capVertical,
    heroImage: frames.hero,
    ctaImage: frames.cta,
    totalPrograms: programs.length,
    countries: countries.map(([country, count]) => ({
      name: country.replace(/-/g, " "),
      slug: country,
      count,
      img: countryImage(country),
    })),
  };

  return (
    <>
      {/* ✅ JSON-LD */}
      <JsonLd data={breadcrumbJsonLd} />
      <VerticalLanding d={data} serifClass={serif.className} />
    </>
  );
}
