import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

import { JsonLd } from "@/lib/seo";
import {
  getResidencyCountries,
  getResidencyPrograms,
  type CountryMeta,
} from "@/lib/residency-content";
import GoldenVisaHub, {
  type GoldenVisaDestination,
} from "@/components/Vertical/GoldenVisaHub";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Golden Visa Programs – Residency by Investment",
  description:
    "The headline Golden Visa routes — Portugal, Greece, the UAE, Malta and more. Compare investment, timeline and benefits, then book a consultation.",
  alternates: { canonical: "/golden-visa" },
  openGraph: {
    title: "Golden Visa Programs – Residency by Investment",
    description:
      "The headline Golden Visa routes — Portugal, Greece, the UAE, Malta and more. Compare investment, timeline and benefits.",
    url: "https://www.xiphiasimmigration.com/golden-visa",
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: ["/xiphias-immigration.png"],
  },
};

// The headline residence-by-investment ("Golden Visa") destinations.
const GOLDEN_VISA_SLUGS = new Set([
  "portugal",
  "greece",
  "uae",
  "malta",
  "cyprus",
  "hungary",
  "latvia",
  "mauritius",
]);

// Stable ordering so the marquee destinations lead the grid.
const ORDER = [
  "portugal",
  "greece",
  "uae",
  "malta",
  "cyprus",
  "hungary",
  "latvia",
  "mauritius",
];

// Slug → region, mirroring the editorial regions used by country-image.ts.
const REGION_BY_SLUG: Record<string, string> = {
  portugal: "Europe",
  greece: "Europe",
  malta: "Europe",
  cyprus: "Europe",
  hungary: "Europe",
  latvia: "Europe",
  uae: "Africa & Middle East",
  mauritius: "Africa & Middle East",
};

const CURRENCY_SYMBOL: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  AED: "AED ",
  CHF: "CHF ",
  CAD: "C$",
  INR: "₹",
};

// Real "from" key stat: the lowest meaningful programme minInvestment for a
// country (fees/zeros below 50K are ignored), formatted with its real currency.
function entryStatFor(slug: string): string {
  let min = Infinity;
  let currency = "EUR";
  for (const p of getResidencyPrograms(slug)) {
    const amount = p.minInvestment;
    if (typeof amount === "number" && amount >= 50000 && amount < min) {
      min = amount;
      currency = p.currency ?? currency;
    }
  }
  if (min === Infinity) return "Investment routes";
  const symbol = CURRENCY_SYMBOL[currency] ?? `${currency} `;
  const value =
    min % 1_000_000 === 0 ? `${min / 1_000_000}M` : `${Math.round(min / 1000)}K`;
  return `From ${symbol}${value}`;
}

export default function GoldenVisaPage() {
  const countries: CountryMeta[] = getResidencyCountries()
    .filter((c) => GOLDEN_VISA_SLUGS.has(c.countrySlug))
    .sort((a, b) => ORDER.indexOf(a.countrySlug) - ORDER.indexOf(b.countrySlug));

  const destinations: GoldenVisaDestination[] = countries.map((c) => ({
    name: c.country, // real display name (e.g. "United Arab Emirates")
    slug: c.countrySlug,
    region: REGION_BY_SLUG[c.countrySlug] ?? "Europe",
    stat: entryStatFor(c.countrySlug),
  }));

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Golden Visa Programs – Residency by Investment",
    url: "https://www.xiphiasimmigration.com/golden-visa",
    description:
      "The headline Golden Visa routes — Portugal, Greece, the UAE, Malta and more. Compare investment, timeline and benefits, then book a consultation.",
  };
  const destinationsLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Golden Visa Destinations",
    itemListElement: destinations.map((d, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `https://www.xiphiasimmigration.com/residency/${d.slug}`,
      name: d.name,
    })),
  };

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={destinationsLd} />
      <GoldenVisaHub destinations={destinations} serifClass={serif.className} />
    </>
  );
}
