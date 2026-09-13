// Sample 2 — MIX: video hero + handcrafted animations + wow (the version that existed).
import type { Metadata } from "next";
import { cormorant } from "@/lib/local-fonts";
import Sample2Mix from "@/components/HomeSamples/Sample2Mix";

const serif = cormorant;

export const metadata: Metadata = { title: "Sample 2 · Mix — XIPHIAS", robots: { index: false } };

export default function Sample2() {
  return <Sample2Mix serifClass={serif.className} />;
}
