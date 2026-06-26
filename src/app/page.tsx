import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import LuxeHome from "@/components/HomeLuxe/LuxeHome";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "XIPHIAS — Private Global Mobility · Golden Visas & Citizenship by Investment, Dubai",
  description:
    "A private global-mobility practice for those who value discretion. Golden visas, residency and second passports across 35 jurisdictions — arranged end-to-end from Dubai. 17 years, 10,000+ families.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "XIPHIAS — Your second passport, privately arranged",
    description:
      "Golden visas and citizenship by investment across 35 jurisdictions, arranged with discretion from Dubai.",
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
  return <LuxeHome serifClass={serif.className} />;
}
