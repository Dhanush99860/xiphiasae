// src/app/(site)/insights/page.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import InsightsPage from "@/components/Company/InsightsPage";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Insights — Programme Intelligence, Guides & News | XIPHIAS Immigration",
  description:
    "The XIPHIAS journal: programme intelligence, mobility data and practical guidance on residency, citizenship, golden visas and skilled migration — written by our advisors.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights — The XIPHIAS Journal",
    description: "Programme intelligence, mobility data and practical guidance on global migration.",
    url: "https://www.xiphiasimmigration.com/insights",
    siteName: "XIPHIAS Immigration", locale: "en_US", type: "website",
    images: [{ url: "/xiphias-immigration.png", width: 1200, height: 630, alt: "XIPHIAS Insights" }],
  },
  twitter: { card: "summary_large_image", title: "Insights — The XIPHIAS Journal", description: "Programme intelligence & mobility guidance.", images: ["/xiphias-immigration.png"] },
};

export default function Page() {
  return <InsightsPage serifClass={serif.className} />;
}
