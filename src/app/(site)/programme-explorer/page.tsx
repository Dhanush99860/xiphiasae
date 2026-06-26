import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

import ProgrammeExplorerMix, {
  type MixProgramme,
} from "@/components/ProgrammeExplorer/ProgrammeExplorerMix";
import { JsonLd } from "@/lib/seo";
import {
  getProgrammeExplorerData,
  type ProgrammeExplorerItem,
} from "@/lib/programme-explorer";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Programme Explorer — Every Residency, Citizenship & Mobility Route | XIPHIAS",
  description:
    "Explore every XIPHIAS immigration programme — residency, citizenship, corporate mobility and skilled migration — with indicative investment, timeline and family detail. Book a private route review.",
  alternates: {
    canonical: "/programme-explorer",
  },
};

const SITE = "https://www.xiphiasimmigration.com";

/** Map a country (name + content slug) to a verified countryImage() key. */
function imageSlugFor(item: ProgrammeExplorerItem): string {
  const direct = item.countrySlug?.toLowerCase().replace(/\s+/g, "-") ?? "";
  const name = item.country.toLowerCase();
  const aliases: Record<string, string> = {
    "united states": "usa",
    "united states of america": "usa",
    usa: "usa",
    "united arab emirates": "uae",
    uae: "uae",
    "united kingdom": "united-kingdom",
    uk: "united-kingdom",
    "antigua and barbuda": "antigua-barbuda",
    "saint kitts and nevis": "saintkitts",
    "st kitts and nevis": "saintkitts",
    "saint lucia": "saint-lucia",
    "hong kong": "hong-kong",
    "new zealand": "new-zealand",
    "sao tome and principe": "saotome",
  };
  return aliases[name] ?? aliases[direct] ?? direct;
}

/** Bucket a country into the editorial region used for image fallback + chips. */
function regionFor(item: ProgrammeExplorerItem): string {
  const c = item.country.toLowerCase();
  const europe = ["portugal", "greece", "spain", "italy", "malta", "turkey", "germany", "united kingdom", "cyprus", "hungary", "latvia", "switzerland", "monaco", "bulgaria", "ireland"];
  const africaME = ["united arab emirates", "uae", "egypt", "mauritius", "saudi arabia", "sao tome"];
  const caribbean = ["grenada", "dominica", "antigua", "saint kitts", "st kitts", "saint lucia", "caribbean", "curacao", "nauru"];
  const asiaPac = ["singapore", "malaysia", "hong kong", "new zealand", "australia", "vanuatu"];
  const americas = ["united states", "usa", "canada", "panama", "uruguay"];

  if (americas.some((k) => c.includes(k))) return "Americas";
  if (caribbean.some((k) => c.includes(k))) return "Caribbean";
  if (africaME.some((k) => c.includes(k))) return "Africa & Middle East";
  if (asiaPac.some((k) => c.includes(k))) return "Asia-Pacific";
  if (europe.some((k) => c.includes(k))) return "Europe";
  return "Europe";
}

function presenceLabel(presence: ProgrammeExplorerItem["presence"]): string {
  switch (presence) {
    case "low":
      return "Low";
    case "moderate":
      return "Moderate";
    case "high":
      return "High";
    default:
      return "Case dependent";
  }
}

function toMixProgramme(item: ProgrammeExplorerItem): MixProgramme {
  return {
    id: item.id,
    name: item.title,
    country: item.country,
    track: item.track,
    region: regionFor(item),
    imageSlug: imageSlugFor(item),
    pathway: item.summary,
    investment: item.investmentLabel,
    timeline: item.timelineLabel,
    family: item.family ? "Yes" : "Separate review",
    presence: presenceLabel(item.presence),
    href: item.href,
  };
}

export default function ProgrammeExplorerPage() {
  const data = getProgrammeExplorerData();
  const programmes: MixProgramme[] = data.items.map(toMixProgramme);

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Programme Explorer — XIPHIAS Immigration",
    url: `${SITE}/programme-explorer`,
    description:
      "Explore every XIPHIAS residency, citizenship, corporate-mobility and skilled-migration programme with indicative investment, timeline and family detail.",
  };

  const programmesLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "XIPHIAS Programmes",
    numberOfItems: data.totals.programmes,
    itemListElement: programmes.slice(0, 25).map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: p.href.startsWith("http") ? p.href : `${SITE}${p.href}`,
      name: `${p.name} — ${p.country}`,
    })),
  };

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={programmesLd} />
      <ProgrammeExplorerMix data={programmes} serifClass={serif.className} />
    </>
  );
}
