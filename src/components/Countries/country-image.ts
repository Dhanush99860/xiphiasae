// Client-safe resolver mapping a country slug → a real, verified image in
// /public. UI-only: no content/data logic lives here. Every path below has been
// confirmed to exist on disk; unknown slugs fall back to a region-appropriate
// editorial frame, then a global default — so a thumbnail is never broken and
// we never invent a path.

/** Per-country hero frame, keyed by the content directory slug. */
const COUNTRY_IMAGE: Record<string, string> = {
  // Europe
  portugal: "/images/residency/portugal/portugal-golden-visa.webp",
  greece: "/images/residency/greece/greece-golden-visa.webp",
  malta: "/images/residency/malta/malta-mprp.webp",
  cyprus: "/images/residency/cyprus/cyprus-golden-visa-residency-by-investment.webp",
  hungary: "/images/residency/hungary/hungary-residency-by-investment.webp",
  latvia: "/images/residency/latvia/latvia-residency-by-investment-golden-visa.webp",
  switzerland: "/images/residency/switzerland/switzerland-business-investment.webp",
  monaco: "/images/residency/Monaco/monaco-residency-bank-deposit.webp",
  bulgaria: "/images/residency/bulgaria/bulgaria-aif.webp",
  germany: "/images/blogs/germany.webp",
  spain: "/images/blogs/spain-golden-visa-abolish.webp",
  italy: "/images/blogs/italy-digital-nomad-visa.webp",
  turkey: "/images/citizenship/turkey/bank-deposit-turkey.webp",
  "united-kingdom": "/images/blogs/uk-investment.webp",

  // Africa & Middle East
  uae: "/images/residency/uae/uae-golden-visa.webp",
  egypt: "/images/citizenship/egypt/business-investment.webp",
  mauritius: "/images/residency/mauritius/mauritius-residency-investment.webp",
  saotome: "/images/citizenship/saotome/saotome_cbi.webp",

  // Caribbean
  grenada: "/images/citizenship/grenada/coral-bay-residences.webp",
  dominica: "/images/citizenship/dominica/dominica-citizenship-by-investment.webp",
  "antigua-barbuda": "/images/citizenship/antigua/antigua-barbuda-business-investment.webp",
  saintkitts: "/images/citizenship/st-kitts-nevis/ntf-st-principel.webp",
  "saint-lucia": "/images/citizenship/saint-lucia-citizenship/nef-saint-lucia.webp",
  curacao: "/images/residency/curacao/curacao-3-year-investor-residency.webp",

  // Asia-Pacific
  singapore: "/images/residency/singapore/singapore-gip-business-investment.webp",
  malaysia: "/images/residency/malaysia/malaysia-mm2h-gold.webp",
  "hong-kong": "/images/residency/hong-kong/hong-kong-business-investment.webp",
  "new-zealand":
    "/images/residency/new-zealand/new-zealand-active-investor-plus-visa-balanced-category.webp",
  australia: "/images/blogs/australia-immigration.webp",
  vanuatu: "/images/citizenship/vanuatu/Vanuatu-Citizenship.webp",
  nauru: "/images/citizenship/nauru/donation-nauru.webp",

  // Americas
  canada: "/images/residency/canada/alberta-self-employed-farmer.webp",
  usa: "/images/residency/usa/eb5-non-targeted-employment-area.webp",
  panama: "/images/residency/panama/panama-residency-bank-deposit.webp",
  uruguay: "/images/residency/uruguay/uruguay-business-investment.webp",
};

/** Region → editorial fallback frame for slugs without a per-country image. */
const REGION_IMAGE: Record<string, string> = {
  Europe: "/images/blogs/european-investment.webp",
  "Africa & Middle East": "/images/blogs/dubai-expat-destination.webp",
  Caribbean: "/images/blogs/caribbean-second-passport.webp",
  "Asia-Pacific": "/images/blogs/singapore-pr-by-investment.webp",
  Americas: "/images/blogs/canada-investment-immigration.webp",
};

const DEFAULT_IMAGE = "/images/blogs/global-millionaire-migration.webp";

/** Best real image for a country, given its slug and (optional) region. */
export function countryImage(slug: string, region?: string): string {
  return (
    COUNTRY_IMAGE[slug] ??
    (region ? REGION_IMAGE[region] : undefined) ??
    DEFAULT_IMAGE
  );
}

/** A small, varied set of featured slugs for the destinations rail. */
export const FEATURED_COUNTRY_SLUGS = [
  "uae",
  "portugal",
  "greece",
  "singapore",
  "malta",
  "canada",
  "cyprus",
  "grenada",
  "usa",
  "switzerland",
] as const;
