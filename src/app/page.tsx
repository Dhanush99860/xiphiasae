import type { Metadata } from "next";
import { cormorant } from "@/lib/local-fonts";
import LuxeHome from "@/components/HomeLuxe/LuxeHome";
import { getCountryDirectory } from "@/lib/countries-content";

const serif = cormorant;

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Top Immigration Consultants in Dubai | Golden Visa & Citizenship",
  description:
    "Best immigration consultants in Dubai for Golden Visas, residency, citizenship by investment and skilled migration. Get a confidential eligibility assessment.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Visa & Immigration Consultants in Dubai | XIPHIAS",
    description:
      "Golden visas, second passports & investor residency across 35+ jurisdictions. Licensed IMC advisors — XIPHIAS since 2009, XIPHIAS Dubai since 2017.",
    url: "https://www.xiphiasimmigration.com",
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: ["/xiphias-immigration.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "XIPHIAS — Your second passport, privately arranged",
    description:
      "A private global-mobility practice — golden visas, residency and citizenship by investment, arranged from Dubai.",
    images: ["/xiphias-immigration.png"],
  },
};

export default function Home() {
  // Full programme + country catalogue, read at build time and rendered directly
  // under the hero as the first thing on the page a visitor can click.
  const directory = getCountryDirectory();
  return <LuxeHome serifClass={serif.className} directory={directory} />;
}
