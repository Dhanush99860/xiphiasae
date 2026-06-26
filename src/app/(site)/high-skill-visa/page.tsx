import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

import XiaIntelligenceClient from "@/components/XiaIntelligence/XiaIntelligenceClient";
import { getXiaIntelligenceData } from "@/lib/xia-intelligence";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "High-Skill Visa Evaluator",
  description:
    "Evaluate high-skill visa directions using role, education, evidence, sponsorship, and achievement signals.",
  alternates: {
    canonical: "/high-skill-visa",
  },
};

export default function HighSkillVisaPage() {
  return (
    <XiaIntelligenceClient
      data={getXiaIntelligenceData()}
      initialEngine="high-skill"
      lockedEngine
      title="High-Skill Visa Evaluator"
      subtitle="A focused evidence review for high-skill, talent, founder, employer-sponsored, and transfer visa pathways."
      serifClass={serif.className}
    />
  );
}
