import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import WorkPermitIntelligenceView from "@/components/WorkPermits/WorkPermitIntelligenceView";
import { JsonLd } from "@/lib/seo";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Work Permit Intelligence | XIPHIAS",
  description:
    "Assess employer-led and points-based work routes across eight destinations — permit types, route-readiness signals, and document checklists, prepared for XIPHIAS advisor review.",
  alternates: {
    canonical: "/work-permit-intelligence",
  },
};

export default function WorkPermitIntelligencePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Work Permit Intelligence | XIPHIAS",
    description:
      "Assess employer-led and points-based work routes across eight destinations — permit types, route-readiness signals, and document checklists.",
    url: "https://www.xiphiasimmigration.com/work-permit-intelligence",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <WorkPermitIntelligenceView serifClass={serif.className} />
    </>
  );
}
