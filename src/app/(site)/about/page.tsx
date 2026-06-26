// src/app/(site)/about/page.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import AboutPage from "@/components/Company/AboutPage";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

const SITE_URL = "https://www.xiphiasimmigration.com";
const OG_IMAGE = "/xiphias-immigration.png";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "About XIPHIAS Immigration — 17 Years of Private Global Mobility",
  description:
    "Since 2007 XIPHIAS has arranged residency, citizenship and second passports for 10,000+ families across 35 jurisdictions — from offices in Dubai, London and Bengaluru. Licensed, discreet, end-to-end.",
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About XIPHIAS Immigration — Private Global Mobility Since 2007",
    description:
      "17 years, 10,000+ families, 35 jurisdictions. Our story, our people, our credentials.",
    url: `${SITE_URL}/about`,
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "XIPHIAS Immigration" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About XIPHIAS Immigration",
    description: "Private global mobility since 2007 — 10,000+ families across 35 jurisdictions.",
    images: [OG_IMAGE],
  },
};

export default function Page() {
  return <AboutPage serifClass={serif.className} />;
}
