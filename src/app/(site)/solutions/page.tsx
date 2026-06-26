import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

import { JsonLd } from "@/lib/seo";
import { countryImage } from "@/components/Countries/country-image";
import CategoryHub, { type CategoryHubItem } from "@/components/Marketing/CategoryHub";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Solutions by Profile | XIPHIAS",
  description:
    "Your goals, mapped to a route. XIPHIAS solutions for investors, families, professionals, businesses and entrepreneurs — each a curated path to residency or citizenship.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solutions by Profile | XIPHIAS",
    description:
      "Tailored migration solutions for investors, families, professionals, businesses and entrepreneurs.",
    url: "https://www.xiphiasimmigration.com/solutions",
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: ["/xiphias-immigration.png"],
  },
};

// Audience-led solutions — short descriptions drawn from the SolutionPage
// (src/lib/solutions.ts) intros, condensed to one line per card.
const SOLUTIONS_ITEMS: CategoryHubItem[] = [
  {
    name: "For Investors",
    href: "/for-investors",
    image: countryImage("uae"),
    description: "Turn capital into a second residency or passport with vetted investment routes.",
  },
  {
    name: "For Families",
    href: "/for-families",
    image: countryImage("portugal"),
    description: "A safer future and a stronger passport for your spouse, children and parents.",
  },
  {
    name: "For Professionals",
    href: "/for-professionals",
    image: countryImage("canada"),
    description: "Points-based PR and skilled work routes mapped to your profile.",
  },
  {
    name: "For Businesses",
    href: "/for-businesses",
    image: countryImage("singapore"),
    description: "Move talent and expand across borders with compliant corporate mobility.",
  },
  {
    name: "For Entrepreneurs",
    href: "/for-entrepreneurs",
    image: countryImage("grenada"),
    description: "Start-up and entrepreneur routes to build your venture from a new base.",
  },
];

export default function SolutionsPage() {
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Solutions by Profile | XIPHIAS",
    url: "https://www.xiphiasimmigration.com/solutions",
    description:
      "Your goals, mapped to a route. XIPHIAS solutions for investors, families, professionals, businesses and entrepreneurs.",
  };
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "XIPHIAS Solutions by Profile",
    itemListElement: SOLUTIONS_ITEMS.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `https://www.xiphiasimmigration.com${s.href}`,
      name: s.name,
    })),
  };

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={itemListLd} />
      <CategoryHub
        serifClass={serif.className}
        eyebrow="Solutions"
        eyebrowAr="حلول"
        title={
          <>
            <span className="block">Your goals,</span>
            <span className="block italic" style={{ color: "#bfa15c" }}>
              mapped to a route.
            </span>
          </>
        }
        intro="However you self-identify — investor, family, professional, business or entrepreneur — XIPHIAS curates the right residency or citizenship route, with the tools and advisors to see it through."
        items={SOLUTIONS_ITEMS}
      />
    </>
  );
}
