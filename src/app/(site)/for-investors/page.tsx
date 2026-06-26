import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

import SolutionPage from "@/components/Solutions/SolutionPage";
import { SOLUTIONS, getSolutionProgrammes } from "@/lib/solutions";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cfg = SOLUTIONS["for-investors"];
export const revalidate = 86400;
export const metadata: Metadata = {
  title: `${cfg.eyebrow} — Residency & Citizenship by Investment`,
  description: cfg.intro,
  alternates: { canonical: "/for-investors" },
};

export default function Page() {
  const programmes = getSolutionProgrammes(cfg);
  const { select, ...cfgSafe } = cfg; // strip server-side selector fn before the client boundary
  void select;
  return <SolutionPage cfg={cfgSafe} programmes={programmes} serifClass={serif.className} />;
}
