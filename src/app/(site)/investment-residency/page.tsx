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
  title: "Investment & Residency Evaluator",
  description:
    "Evaluate golden visa, CBI, RBI, investor, entrepreneur, and corporate expansion routes using XIPHIAS programme intelligence.",
  alternates: {
    canonical: "/investment-residency",
  },
};

export default function InvestmentResidencyPage() {
  return (
    <XiaIntelligenceClient
      data={getXiaIntelligenceData()}
      initialEngine="investment"
      lockedEngine
      title="Investment & Residency Evaluator"
      subtitle="A focused investment and residency workspace for capital, country, family, source-of-funds, presence, and timeline fit."
      serifClass={serif.className}
    />
  );
}
