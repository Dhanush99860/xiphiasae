// src/app/(site)/about/page.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import AboutPage from "@/components/Company/AboutPage";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

const SITE_URL = "https://www.xiphiasimmigration.com";
const OG_IMAGE = "/xiphias-immigration.png";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "About XIPHIAS — Licensed Immigration Advisors, Dubai",
  description:
    "UAE-licensed immigration firm since 2007. 10,000+ families, 35 jurisdictions. IMC Fellow-led, offices in Dubai, London & Bengaluru.",
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About XIPHIAS — Licensed Immigration Advisors Since 2007",
    description:
      "Founded 2007. 10,000+ families, 35 jurisdictions. IMC Fellow-led, UAE-licensed, with offices in Dubai, London and Bengaluru.",
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
