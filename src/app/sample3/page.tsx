// Sample 3 — BUGATTI: preloader, particle/cursor hero, magnetic buttons, 3D tilt,
// visa-stamp shower, GSAP-pinned process, counters — full-on, on smooth scroll.
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Sample3Bugatti from "@/components/HomeSamples/Sample3Bugatti";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

export const metadata: Metadata = { title: "Sample 3 · Bugatti — XIPHIAS", robots: { index: false } };

export default function Sample3() {
  return <Sample3Bugatti serifClass={serif.className} />;
}
