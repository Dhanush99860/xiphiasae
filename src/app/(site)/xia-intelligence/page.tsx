import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

import { JsonLd } from "@/lib/seo";
import XiaSuiteGatewayClient from "@/components/XiaIntelligence/XiaSuiteGatewayClient";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "XIA Intelligence Suite",
  description:
    "Explore route-fit, high-skill visa evidence, investment pathways, document readiness, reports, and advisor workflow with XIPHIAS XIA.",
  alternates: {
    canonical: "/xia-intelligence",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "XIA Intelligence Suite",
  description:
    "Explore route-fit, high-skill visa evidence, investment pathways, document readiness, reports, and advisor workflow with XIPHIAS XIA.",
  url: "/xia-intelligence",
};

export default function XiaIntelligencePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <XiaSuiteGatewayClient serifClass={serif.className} />
    </>
  );
}
