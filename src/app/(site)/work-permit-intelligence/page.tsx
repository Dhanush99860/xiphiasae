import type { Metadata } from "next";
import { cormorant } from "@/lib/local-fonts";
import WorkPermitIntelligenceView from "@/components/WorkPermits/WorkPermitIntelligenceView";
import { JsonLd } from "@/lib/seo";

const serif = cormorant;

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
