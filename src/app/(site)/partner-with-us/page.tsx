import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import PartnerWithUsView from "./PartnerWithUsView";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const CANONICAL = "/partner-with-us";
const ABSOLUTE_URL = "https://www.xiphiasimmigration.com/partner-with-us";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Partner With Us | XIPHIAS Immigration",
  description:
    "Strategic global mobility partnerships for private advisory firms, corporate mobility teams, and referral partners backed by 17+ years, 25+ jurisdictions, and compliance-first execution.",
  keywords: [
    "partner with XIPHIAS Immigration",
    "global mobility partner",
    "immigration backend partner",
    "corporate mobility partnership",
    "investment migration partner",
    "referral partner immigration",
    "private advisory immigration support",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: "Partner With Us | XIPHIAS Immigration",
    description:
      "Trusted B2B global mobility support for private advisory firms, corporations, and referral partners seeking structured, compliance-first immigration execution.",
    url: ABSOLUTE_URL,
    siteName: "XIPHIAS Immigration",
    type: "website",
    images: [
      {
        url: "/xiphias-immigration.png",
        width: 1200,
        height: 630,
        alt: "Partner with XIPHIAS Immigration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner With Us | XIPHIAS Immigration",
    description:
      "Trusted experts in global mobility and migration for partner firms, corporates, and referral networks.",
    images: ["/xiphias-immigration.png"],
  },
  robots: { index: true, follow: true },
};

export default function PartnerWithUsPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Immigration partnership and global mobility advisory",
    name: "Partner With Us",
    provider: {
      "@type": "Organization",
      name: "XIPHIAS Immigration",
      url: "https://www.xiphiasimmigration.com",
    },
    areaServed: "Worldwide",
    url: ABSOLUTE_URL,
    description:
      "Structured global mobility support for private advisory firms, corporate mobility teams, and strategic referral partners, with strategy-led consultation for qualified opportunities.",
  };

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: "/" },
          { name: "Partner With Us", url: CANONICAL },
        ])}
      />
      <JsonLd data={serviceJsonLd} />
      <PartnerWithUsView serifClass={serif.className} />
    </>
  );
}
