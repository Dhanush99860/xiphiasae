// src/app/(site)/contact/page.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import ContactPage from "@/components/Company/ContactPage";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Contact XIPHIAS — Book a Private Consultation",
  description:
    "Speak to a senior global-mobility advisor at XIPHIAS — call, WhatsApp or request a confidential consultation. Offices in Dubai, London and Bengaluru.",
  keywords: ["Contact XIPHIAS", "Immigration consultants", "Citizenship by Investment", "Golden Visa consultants", "Residency by Investment"],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact XIPHIAS — Book a Private Consultation",
    description: "Speak to a senior advisor — Dubai · London · Bengaluru. Confidential and by appointment.",
    url: "https://www.xiphiasimmigration.com/contact",
    siteName: "XIPHIAS Immigration", locale: "en_US", type: "website",
    images: [{ url: "/xiphias-immigration.png", width: 1200, height: 630, alt: "Contact XIPHIAS Immigration" }],
  },
  twitter: { card: "summary_large_image", title: "Contact XIPHIAS", description: "Book a private consultation — Dubai · London · Bengaluru.", images: ["/xiphias-immigration.png"] },
};

export default function Page() {
  return <ContactPage serifClass={serif.className} />;
}
