import type { Metadata } from "next";
import { cormorant } from "@/lib/local-fonts";

import XiaIntelligenceClient from "@/components/XiaIntelligence/XiaIntelligenceClient";
import { getXiaIntelligenceData } from "@/lib/xia-intelligence";

const serif = cormorant;

export const metadata: Metadata = {
  title: "Document & Evidence Readiness",
  description:
    "Check immigration document and evidence readiness for CV, proof of funds, source of funds, awards, education, company, and family records.",
  alternates: {
    canonical: "/document-readiness",
  },
};

export default function DocumentReadinessPage() {
  return (
    <XiaIntelligenceClient
      data={getXiaIntelligenceData()}
      initialEngine="documents"
      lockedEngine
      title="Document & Evidence Readiness"
      subtitle="A focused readiness workspace for the documents and evidence needed before advisor review or detailed report generation."
      serifClass={serif.className}
    />
  );
}
