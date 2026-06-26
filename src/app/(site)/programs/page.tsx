import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

import { JsonLd } from "@/lib/seo";
import { countryImage } from "@/components/Countries/country-image";
import CategoryHub, { type CategoryHubItem } from "@/components/Marketing/CategoryHub";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Immigration Programmes | XIPHIAS",
  description:
    "Every XIPHIAS route to your second home — citizenship by investment, residency and golden visas, skilled migration, corporate mobility and work permits, curated and managed end-to-end.",
  alternates: { canonical: "/programs" },
  openGraph: {
    title: "Immigration Programmes | XIPHIAS",
    description:
      "Citizenship, residency, golden visas, skilled migration, corporate mobility and work permits — curated and managed end-to-end by XIPHIAS.",
    url: "https://www.xiphiasimmigration.com/programs",
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: ["/xiphias-immigration.png"],
  },
};

const PROGRAMMES: CategoryHubItem[] = [
  {
    name: "Citizenship by Investment",
    href: "/citizenship",
    image: countryImage("grenada"),
    description: "Second passports across the Caribbean, Türkiye and beyond.",
  },
  {
    name: "Residency & Golden Visas",
    href: "/residency",
    image: countryImage("portugal"),
    description: "Live, work and settle across Europe, the UAE and more.",
  },
  {
    name: "Golden Visa",
    href: "/golden-visa",
    image: countryImage("uae"),
    description: "Long-term residency in the world's most dynamic hubs.",
  },
  {
    name: "Skilled Migration",
    href: "/skilled",
    image: countryImage("canada"),
    description: "Points-based pathways for in-demand professionals.",
  },
  {
    name: "Corporate Mobility",
    href: "/corporate",
    image: countryImage("singapore"),
    description: "Move teams and expand your business across borders.",
  },
  {
    name: "Work Permits",
    href: "/work-permits",
    image: countryImage("uae", "Africa & Middle East"),
    description: "Compliant work authorisation, handled end-to-end.",
  },
];

export default function ProgramsPage() {
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Immigration Programmes | XIPHIAS",
    url: "https://www.xiphiasimmigration.com/programs",
    description:
      "Every XIPHIAS route to your second home — citizenship by investment, residency and golden visas, skilled migration, corporate mobility and work permits.",
  };
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "XIPHIAS Immigration Programmes",
    itemListElement: PROGRAMMES.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `https://www.xiphiasimmigration.com${p.href}`,
      name: p.name,
    })),
  };

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={itemListLd} />
      <CategoryHub
        serifClass={serif.className}
        eyebrow="Our Programmes"
        eyebrowAr="البرامج"
        title={
          <>
            <span className="block">Every route to</span>
            <span className="block italic" style={{ color: "#bfa15c" }}>
              your second home.
            </span>
          </>
        }
        intro="Six programme families — citizenship, residency, golden visas, skilled migration, corporate mobility and work permits — each curated, compared and managed end-to-end by a dedicated XIPHIAS desk."
        items={PROGRAMMES}
      />
    </>
  );
}
