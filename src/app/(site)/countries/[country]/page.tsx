import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";

import { getCountryOverview, getCountrySlugs } from "@/lib/countries-content";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import CountryDetail from "@/components/Countries/CountryDetail";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return getCountrySlugs().map((country) => ({ country }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const overview = getCountryOverview(country);
  if (!overview) return { title: "Country not found" };
  return {
    title: `${overview.name} — Residency, Citizenship & Migration Programmes`,
    description: `Every immigration pathway XIPHIAS offers in ${overview.name}: ${overview.groups
      .map((g) => g.label)
      .join(", ")}. Compare investment, timeline and routes in one place.`,
    alternates: { canonical: `/countries/${overview.slug}` },
  };
}

export default async function CountryOverviewPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const overview = getCountryOverview(country);
  if (!overview) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Countries", url: "/countries" },
          { name: overview.name, url: `/countries/${overview.slug}` },
        ])}
      />
      <CountryDetail overview={overview} serifClass={serif.className} />
    </>
  );
}
