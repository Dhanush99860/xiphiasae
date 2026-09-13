import type { Metadata } from "next";
import { cormorant } from "@/lib/local-fonts";

import { JsonLd } from "@/lib/seo";
import XiaSuiteGatewayClient from "@/components/XiaIntelligence/XiaSuiteGatewayClient";

const serif = cormorant;

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
