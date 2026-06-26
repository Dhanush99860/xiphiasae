import type { Metadata } from "next";
import React from "react";
import { Cormorant_Garamond } from "next/font/google";
import { awardsData } from "@/components/awards/awards.data";
import { HeroAwards } from "@/components/awards/HeroAwards"; // hero stays static for optimal LCP
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
// Dynamically import the heavier below-the-fold grid to reduce initial JS payload.
import nextDynamic from "next/dynamic";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Dynamically import the heavier below-the-fold client sections. The module
// exports a named component (no default export), so we explicitly select the
// correct export in the promise to avoid passing the entire module to the
// client component.
const SpotlightSections = nextDynamic(() =>
  import("@/components/awards/SpotlightSections").then((mod) => mod.SpotlightSections)
);

export const metadata: Metadata = {
  title: "Awards & Recognition",
  description:
    "Independent accolades that recognize our quality, leadership, and client service.",
  alternates: { canonical: "/awards" },
  openGraph: {
    title: "Awards & Recognition",
    description:
      "Independent accolades that recognize our quality, leadership, and client service.",
    url: "https://www.xiphiasimmigration.com/awards",
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/xiphias-immigration.png",
        width: 1200,
        height: 630,
        alt: "Awards & Recognition – XIPHIAS Immigration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Awards & Recognition",
    description:
      "Independent accolades that recognize our quality, leadership, and client service.",
    images: ["/xiphias-immigration.png"],
  },
};

export default function Page() {
  return (
    <main style={{ background: "#0a1733", color: "#fff" }}>
      <Header serifClass={serif.className} />
      <HeroAwards serifClass={serif.className} />
      <SpotlightSections items={awardsData} serifClass={serif.className} />
      <Footer serifClass={serif.className} />
    </main>
  );
}
