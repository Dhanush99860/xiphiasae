import type { Metadata } from "next";
import MidnightEmbassyHero from "@/components/Home/Hero/MidnightEmbassyHero";

// Prototype preview route for the "Midnight Embassy" hero direction.
// Not linked in nav — visit /hero-preview to review. Safe to delete once the
// direction is promoted into HomeExperience (or discarded).
export const metadata: Metadata = {
  title: "Hero Preview — Midnight Embassy",
  robots: { index: false, follow: false },
  alternates: { canonical: "/hero-preview" },
};

export default function HeroPreviewPage() {
  return (
    <main id="main">
      <MidnightEmbassyHero />
    </main>
  );
}
