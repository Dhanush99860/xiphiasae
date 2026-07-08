import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import PersonalBookingHub from "@/components/PersonalBooking/PersonalBookingHub";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

export const revalidate = 86400;

const SITE = "https://www.xiphiasimmigration.com";

export const metadata: Metadata = {
  title: "Book a Private Immigration Consultation | XIPHIAS",
  description:
    "60-min strategy session with Varun Singh, IMC Fellow & MD. Citizenship, residency or skilled migration — fee credited on engagement.",
  alternates: { canonical: `${SITE}/personal-booking` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Book a Private Immigration Consultation | XIPHIAS",
    description:
      "60-minute private strategy call with Varun Singh, IMC Fellow. Residency, citizenship or skilled migration — clear plan, fee credited on engagement.",
    url: `${SITE}/personal-booking`,
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: [{ url: `${SITE}/xiphias-immigration.png`, width: 1200, height: 630, alt: "Book a Consultation — XIPHIAS Immigration" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Private Consultation | XIPHIAS Immigration",
    description: "60-minute strategy call. IMC Fellow-led. Fee credited on engagement.",
    images: [`${SITE}/xiphias-immigration.png`],
  },
};

export default function PersonalBookingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Private Immigration Consultation",
            provider: { "@type": "Organization", name: "XIPHIAS Immigration", url: SITE },
            description: "60-minute private strategy call with an IMC-certified immigration advisor.",
            url: `${SITE}/personal-booking`,
            areaServed: "Worldwide",
          }),
        }}
      />
      <PersonalBookingHub serifClass={serif.className} />
    </>
  );
}
