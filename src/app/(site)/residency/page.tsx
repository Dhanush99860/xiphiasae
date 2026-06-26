// src/app/(site)/residency/page.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import {
  getResidencyCountries,
  getResidencyPrograms,
  ProgramMeta,
  CountryMeta,
} from "@/lib/residency-content";
import { JsonLd } from "@/lib/seo";
import ResidencyHub from "@/components/Residency/ResidencyHub";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

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

export default function ResidencyPage() {
  const countries: CountryMeta[] = getResidencyCountries();
  const programs: ProgramMeta[] = getResidencyPrograms();

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Residency & Golden Visas — Investor Residence, Privately Arranged",
    url: "https://www.xiphiasimmigration.com/residency",
    description:
      "Investor residence across 20+ jurisdictions — the UAE Golden Visa, Portugal, Greece, Malta and more. Book a private consultation.",
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
      <ResidencyHub serifClass={serif.className} />
    </>
  );
}
