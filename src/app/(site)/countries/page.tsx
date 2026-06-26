import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

import { getCountriesByRegion } from "@/lib/countries-content";
import type { CountrySummary } from "@/lib/countries-shared";
import { JsonLd } from "@/lib/seo";
import CountriesSpotlightIndex from "@/components/Countries/CountriesSpotlightIndex";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Countries We Serve — Residency, Citizenship & Migration",
  description:
    "Browse every country XIPHIAS Immigration supports. Explore residency, citizenship, skilled and corporate programmes for each destination in one place.",
  alternates: { canonical: "/countries" },
};

export default function CountriesIndexPage() {
  const regions = getCountriesByRegion();

  // Flatten the region-grouped data into the real roster the spotlight index
  // renders. Each carries slug, name, code (ISO-2), region, programmeCount and
  // tracks[] straight from the live programme catalogues.
  const countries: CountrySummary[] = regions.flatMap((r) => r.countries);
  const total = countries.length;

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Countries We Serve — Residency, Citizenship & Migration",
    url: "https://www.xiphiasimmigration.com/countries",
    description:
      "Browse every country XIPHIAS Immigration supports. Explore residency, citizenship, skilled and corporate programmes for each destination.",
  };
  const countryListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Countries We Serve",
    numberOfItems: total,
    itemListElement: countries.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `https://www.xiphiasimmigration.com/countries/${c.slug}`,
      name: c.name,
    })),
  };

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={countryListLd} />
      <CountriesSpotlightIndex countries={countries} serifClass={serif.className} />
    </>
  );
}
