// src/app/(site)/citizenship/page.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import {
  getCitizenshipCountries,
  getCitizenshipPrograms,
  ProgramMeta,
  CountryMeta,
} from "@/lib/citizenship-content";
import { JsonLd } from "@/lib/seo";
import CitizenshipHub from "@/components/Citizenship/CitizenshipHub";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Citizenship by Investment — Second Passports, Privately Arranged | XIPHIAS",
  description:
    "Donation and real-estate citizenship routes across the Caribbean, Türkiye and beyond — arranged end-to-end with transparent costs and rigorous compliance. Book a private consultation.",
  alternates: { canonical: "/citizenship" },
  openGraph: {
    title: "Citizenship by Investment — Second Passports, Privately Arranged",
    description:
      "Second citizenship across ten jurisdictions and twenty-five investment routes, arranged with discretion from Dubai.",
    url: "https://www.xiphiasimmigration.com/citizenship",
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/xiphias-immigration.png",
        width: 1200,
        height: 630,
        alt: "Citizenship by Investment – XIPHIAS Immigration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Citizenship by Investment — Second Passports, Privately Arranged",
    description:
      "Second citizenship across ten jurisdictions and twenty-five investment routes, arranged with discretion from Dubai.",
    images: ["/xiphias-immigration.png"],
  },
};

/** Server ranker for JSON-LD only */
function pickTopProgramsForLd(all: ProgramMeta[], n = 5): ProgramMeta[] {
  const key = (x: ProgramMeta) =>
    `${x?.title ?? ""} ${x?.country ?? ""}`.trim();

  const ranked = [...all].sort((a, b) => {
    const tA = a.timelineMonths ?? Number.MAX_SAFE_INTEGER;
    const tB = b.timelineMonths ?? Number.MAX_SAFE_INTEGER;
    if (tA !== tB) return tA - tB;

    const iA = a.minInvestment ?? Number.MAX_SAFE_INTEGER;
    const iB = b.minInvestment ?? Number.MAX_SAFE_INTEGER;
    if (iA !== iB) return iA - iB;

    return key(a).localeCompare(key(b), undefined, { sensitivity: "base" });
  });

  return ranked.slice(0, n);
}

export default function CitizenshipPage() {
  const countries: CountryMeta[] = getCitizenshipCountries();
  const programs: ProgramMeta[] = getCitizenshipPrograms();
  const top5 = pickTopProgramsForLd(programs, 5);

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Citizenship by Investment — Second Passports, Privately Arranged",
    url: "https://www.xiphiasimmigration.com/citizenship",
    description:
      "Donation and real-estate citizenship routes across the Caribbean, Türkiye and beyond — arranged end-to-end. Book a private consultation.",
  };
  const countryListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Citizenship Countries",
    itemListElement: countries.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `https://www.xiphiasimmigration.com/citizenship/${c.countrySlug}`,
      name: c.title || c.country,
    })),
  };
  const topProgramsLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top Citizenship Programs",
    itemListElement: top5.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `https://www.xiphiasimmigration.com/citizenship/${p.countrySlug}/${p.programSlug}`,
      name: p.title,
    })),
  };

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={countryListLd} />
      <JsonLd data={topProgramsLd} />
      <CitizenshipHub serifClass={serif.className} />
    </>
  );
}
