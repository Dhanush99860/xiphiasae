// Sample 2 — MIX: video hero + handcrafted animations + wow (the version that existed).
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Sample2Mix from "@/components/HomeSamples/Sample2Mix";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

export const metadata: Metadata = { title: "Sample 2 · Mix — XIPHIAS", robots: { index: false } };

export default function Sample2() {
  return <Sample2Mix serifClass={serif.className} />;
}
