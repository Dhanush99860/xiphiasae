// XIPHIAS Global Route Network — Phase 2B data

export type TrackId = "residency" | "citizenship" | "skilled" | "corporate";

export interface GlobalDestination {
  id: string;
  code: string;
  label: string;
  country: string;
  lat: number;
  lng: number;
  tracks: TrackId[];
  programs: string[];
  summary: string;
  href?: string;
  routeLinks?: Partial<Record<TrackId, string>>;
  priority?: boolean;
}

export interface RouteTrack {
  id: TrackId;
  label: string;
  color: string;
}

export const EARTH_R = 1.25;

export const GLOBAL_ROUTE_ORIGIN = {
  id: "bengaluru-hq" as const,
  label: "Bengaluru HQ",
  city: "Bengaluru",
  country: "India",
  lat: 12.9716,
  lng: 77.5946,
};

export const GLOBAL_ROUTE_TRACKS: RouteTrack[] = [
  { id: "residency",   label: "Residency",  color: "#3b82f6" },
  { id: "citizenship", label: "Citizenship", color: "#e1b923" },
  { id: "skilled",     label: "Skilled",    color: "#10b981" },
  { id: "corporate",   label: "Corporate",  color: "#a78bfa" },
];

export const GLOBAL_ROUTE_DESTINATIONS: GlobalDestination[] = [
  // ── Priority destinations ──────────────────────────────────────────────────
  {
    id: "ae", code: "AE", label: "UAE", country: "United Arab Emirates",
    lat: 23.94, lng: 54.22,
    tracks: ["residency", "corporate"],
    programs: ["Golden Visa", "Investor Visa", "Corporate Mobility"],
    summary: "Residency and business mobility routes for investors, founders, and families.",
    href: "/residency/uae",
    routeLinks: { residency: "/residency/uae", corporate: "/corporate/uae" },
    priority: true,
  },
  {
    id: "ca", code: "CA", label: "Canada", country: "Canada",
    lat: 57.74, lng: -101.57,
    tracks: ["residency", "skilled", "corporate"],
    programs: ["Permanent Residency", "Skilled Migration", "Corporate Transfer"],
    summary: "Skilled, family, and corporate mobility pathways for long-term settlement.",
    href: "/residency/canada",
    routeLinks: { residency: "/residency/canada", skilled: "/skilled/canada", corporate: "/corporate/canada" },
    priority: true,
  },
  {
    id: "pt", code: "PT", label: "Portugal", country: "Portugal",
    lat: 39.68, lng: -8.06,
    tracks: ["residency", "corporate"],
    programs: ["Golden Visa", "D7 Passive Income", "Business Mobility"],
    summary: "European residency routes for families, investors, and entrepreneurs.",
    href: "/residency/portugal",
    routeLinks: { residency: "/residency/portugal", corporate: "/corporate/portugal" },
    priority: true,
  },
  {
    id: "gr", code: "GR", label: "Greece", country: "Greece",
    lat: 39.37, lng: 22.45,
    tracks: ["residency"],
    programs: ["Golden Visa", "Investment Residency"],
    summary: "EU residency through property investment with Schengen Area access.",
    href: "/residency/greece",
    routeLinks: { residency: "/residency/greece" },
    priority: true,
  },
  {
    id: "sg", code: "SG", label: "Singapore", country: "Singapore",
    lat: 1.35, lng: 103.82,
    tracks: ["residency", "corporate"],
    programs: ["Global Investor Programme", "Employment Pass", "Corporate Setup"],
    summary: "Asia's premier hub for investors, entrepreneurs, and corporate mobility.",
    href: "/residency/singapore",
    routeLinks: { residency: "/residency/singapore" },
    priority: true,
  },
  {
    id: "au", code: "AU", label: "Australia", country: "Australia",
    lat: -25.57, lng: 134.39,
    tracks: ["residency", "skilled"],
    programs: ["Skilled Migration", "PR Pathways", "Business Innovation"],
    summary: "Points-tested and employer-sponsored skilled migration pathways.",
    href: "/skilled/australia",
    routeLinks: { skilled: "/skilled/australia" },
    priority: true,
  },
  {
    id: "gb", code: "GB", label: "UK", country: "United Kingdom",
    lat: 53.91, lng: -2.57,
    tracks: ["skilled", "corporate"],
    programs: ["Skilled Worker", "Expansion Worker", "Founder Routes"],
    summary: "Professional and corporate mobility routes into the United Kingdom.",
    href: "/skilled/united-kingdom",
    routeLinks: { skilled: "/skilled/united-kingdom", corporate: "/corporate/united-kingdom" },
    priority: true,
  },
  {
    id: "de", code: "DE", label: "Germany", country: "Germany",
    lat: 51.13, lng: 10.28,
    tracks: ["skilled"],
    programs: ["Skilled Worker Visa", "Job Seeker Visa", "EU Blue Card"],
    summary: "Europe's largest economy with structured skilled migration pathways.",
    href: "/skilled/germany",
    routeLinks: { skilled: "/skilled/germany" },
    priority: true,
  },
  {
    id: "us", code: "US", label: "USA", country: "United States",
    lat: 39.50, lng: -99.10,
    tracks: ["residency", "skilled", "corporate"],
    programs: ["EB-5 Investor", "EB-2 NIW", "L-1 Intracompany Transfer"],
    summary: "Investment, skills, and corporate mobility routes into the United States.",
    href: "/residency/usa",
    routeLinks: { residency: "/residency/usa", skilled: "/skilled/usa", corporate: "/corporate/usa" },
    priority: true,
  },
  {
    id: "gd", code: "GD", label: "Grenada", country: "Grenada",
    lat: 12.12, lng: -61.68,
    tracks: ["citizenship"],
    programs: ["Citizenship by Investment", "E-2 Treaty Access"],
    summary: "Caribbean citizenship with US E-2 treaty access and 140+ visa-free destinations.",
    href: "/citizenship/grenada",
    routeLinks: { citizenship: "/citizenship/grenada" },
    priority: true,
  },
  {
    id: "kn", code: "KN", label: "St. Kitts", country: "Saint Kitts and Nevis",
    lat: 17.30, lng: -62.73,
    tracks: ["citizenship"],
    programs: ["Citizenship by Investment", "Sustainable Island State"],
    summary: "One of the world's oldest CBI programmes with a strong passport.",
    href: "/citizenship/saintkitts",
    routeLinks: { citizenship: "/citizenship/saintkitts" },
    priority: true,
  },
  {
    id: "tr", code: "TR", label: "Turkey", country: "Turkey",
    lat: 38.98, lng: 35.39,
    tracks: ["citizenship"],
    programs: ["Citizenship by Investment", "Property Investment"],
    summary: "Turkish citizenship via real estate investment with EU candidacy benefits.",
    href: "/citizenship/turkey",
    routeLinks: { citizenship: "/citizenship/turkey" },
    priority: true,
  },
  {
    id: "dm", code: "DM", label: "Dominica", country: "Dominica",
    lat: 15.41, lng: -61.37,
    tracks: ["citizenship"],
    programs: ["Citizenship by Investment", "Economic Diversification Fund"],
    summary: "Nature Isle of the Caribbean offering cost-effective second citizenship.",
    href: "/citizenship/dominica",
    routeLinks: { citizenship: "/citizenship/dominica" },
    priority: true,
  },
  {
    id: "ag", code: "AG", label: "Antigua", country: "Antigua and Barbuda",
    lat: 17.27, lng: -61.80,
    tracks: ["citizenship"],
    programs: ["Citizenship by Investment", "National Development Fund"],
    summary: "Caribbean citizenship with 150+ visa-free destinations and flexible investment.",
    href: "/citizenship/antigua-barbuda",
    routeLinks: { citizenship: "/citizenship/antigua-barbuda" },
    priority: true,
  },
  // ── Secondary destinations ─────────────────────────────────────────────────
  {
    id: "mt", code: "MT", label: "Malta", country: "Malta",
    lat: 35.94, lng: 14.38,
    tracks: ["residency"],
    programs: ["MPRP Residency", "Investment Route"],
    summary: "EU residency and citizenship pathways via Malta's established investment route.",
    href: "/residency/malta",
    routeLinks: { residency: "/residency/malta" },
  },
  {
    id: "cy", code: "CY", label: "Cyprus", country: "Cyprus",
    lat: 34.94, lng: 32.88,
    tracks: ["residency", "corporate"],
    programs: ["Residency by Investment", "Company Formation"],
    summary: "EU residency and corporate base in the Eastern Mediterranean.",
    routeLinks: { residency: "/residency/cyprus", corporate: "/corporate/cyprus" },
  },
  {
    id: "my", code: "MY", label: "Malaysia", country: "Malaysia",
    lat: 3.46, lng: 114.58,
    tracks: ["residency"],
    programs: ["MM2H Programme"],
    summary: "Long-stay residency for retirees and families in Southeast Asia.",
    routeLinks: { residency: "/residency/malaysia" },
  },
  {
    id: "ch", code: "CH", label: "Switzerland", country: "Switzerland",
    lat: 46.79, lng: 7.98,
    tracks: ["residency"],
    programs: ["Lump-Sum Taxation", "Residence Permit"],
    summary: "High-net-worth residency in Europe's most stable economy.",
    href: "/residency/switzerland",
    routeLinks: { residency: "/residency/switzerland" },
  },
  {
    id: "mc", code: "MC", label: "Monaco", country: "Monaco",
    lat: 43.74, lng: 7.42,
    tracks: ["residency"],
    programs: ["Residency by Financial Means"],
    summary: "Tax-efficient principality residency for high-net-worth individuals.",
    href: "/residency/monaco",
    routeLinks: { residency: "/residency/monaco" },
  },
  {
    id: "hu", code: "HU", label: "Hungary", country: "Hungary",
    lat: 47.19, lng: 19.37,
    tracks: ["residency"],
    programs: ["Guest Investor Visa"],
    summary: "EU residency through investment in Hungary's Schengen-area state.",
    href: "/residency/hungary",
    routeLinks: { residency: "/residency/hungary" },
  },
  {
    id: "bg", code: "BG", label: "Bulgaria", country: "Bulgaria",
    lat: 42.75, lng: 25.12,
    tracks: ["residency"],
    programs: ["EU Residency", "Long-term Visa"],
    summary: "EU residency in one of Europe's most affordable investment destinations.",
    href: "/residency/bulgaria",
    routeLinks: { residency: "/residency/bulgaria" },
  },
  {
    id: "lv", code: "LV", label: "Latvia", country: "Latvia",
    lat: 56.84, lng: 24.75,
    tracks: ["residency"],
    programs: ["Temporary Residency", "Startup Visa"],
    summary: "Baltic EU residency route for investors and entrepreneurs.",
    href: "/residency/latvia",
    routeLinks: { residency: "/residency/latvia" },
  },
  {
    id: "hk", code: "HK", label: "Hong Kong", country: "Hong Kong",
    lat: 22.32, lng: 114.17,
    tracks: ["residency"],
    programs: ["HKGV", "Top Talent Pass"],
    summary: "Asia's financial gateway with residency and talent attraction pathways.",
    href: "/residency/hong-kong",
    routeLinks: { residency: "/residency/hong-kong" },
  },
  {
    id: "nz", code: "NZ", label: "New Zealand", country: "New Zealand",
    lat: -43.93, lng: 170.59,
    tracks: ["residency"],
    programs: ["Investor Visa", "Skilled Migrant Category"],
    summary: "Pacific residency for investors and skilled professionals.",
    href: "/residency/new-zealand",
    routeLinks: { residency: "/residency/new-zealand" },
  },
  {
    id: "pa", code: "PA", label: "Panama", country: "Panama",
    lat: 8.48, lng: -80.01,
    tracks: ["residency"],
    programs: ["Pensionado Visa", "Qualified Investor Visa"],
    summary: "Americas residency hub with tax-efficient structures for investors.",
    href: "/residency/panama",
    routeLinks: { residency: "/residency/panama" },
  },
  {
    id: "uy", code: "UY", label: "Uruguay", country: "Uruguay",
    lat: -32.78, lng: -56.02,
    tracks: ["residency"],
    programs: ["Permanent Residency", "Pensionado Programme"],
    summary: "South America's most stable residency pathway for retirees and investors.",
    href: "/residency/uruguay",
    routeLinks: { residency: "/residency/uruguay" },
  },
  {
    id: "mu", code: "MU", label: "Mauritius", country: "Mauritius",
    lat: -20.28, lng: 57.55,
    tracks: ["residency"],
    programs: ["Premium Visa", "IRS Residency"],
    summary: "Indian Ocean residency with favourable tax treatment and lifestyle appeal.",
    href: "/residency/mauritius",
    routeLinks: { residency: "/residency/mauritius" },
  },
  {
    id: "lc", code: "LC", label: "Saint Lucia", country: "Saint Lucia",
    lat: 13.91, lng: -60.98,
    tracks: ["citizenship"],
    programs: ["Citizenship by Investment", "NDF"],
    summary: "Caribbean citizenship with strong travel document and growing financial centre.",
    href: "/citizenship/saint-lucia",
    routeLinks: { citizenship: "/citizenship/saint-lucia" },
  },
  {
    id: "eg", code: "EG", label: "Egypt", country: "Egypt",
    lat: 26.50, lng: 29.83,
    tracks: ["citizenship"],
    programs: ["Citizenship by Investment", "Property Investment"],
    summary: "Citizenship through real estate investment in North Africa's largest economy.",
    href: "/citizenship/egypt",
    routeLinks: { citizenship: "/citizenship/egypt" },
  },
  {
    id: "vu", code: "VU", label: "Vanuatu", country: "Vanuatu",
    lat: -15.36, lng: 166.90,
    tracks: ["citizenship"],
    programs: ["DSP Citizenship", "Capital Investment Option"],
    summary: "Fast-track Pacific citizenship with no residency requirement.",
    href: "/citizenship/vanuatu",
    routeLinks: { citizenship: "/citizenship/vanuatu" },
  },
  {
    id: "nr", code: "NR", label: "Nauru", country: "Nauru",
    lat: -0.52, lng: 166.93,
    tracks: ["citizenship"],
    programs: ["Citizenship Programme"],
    summary: "Pacific Island citizenship programme with growing international access.",
    href: "/citizenship/nauru",
    routeLinks: { citizenship: "/citizenship/nauru" },
  },
  {
    id: "st", code: "ST", label: "São Tomé", country: "São Tomé and Príncipe",
    lat: 0.19, lng: 6.61,
    tracks: ["citizenship"],
    programs: ["Citizenship by Investment"],
    summary: "West African island citizenship offering growing international access.",
    href: "/citizenship/saotome",
    routeLinks: { citizenship: "/citizenship/saotome" },
  },
  {
    id: "es", code: "ES", label: "Spain", country: "Spain",
    lat: 40.33, lng: -3.63,
    tracks: ["skilled", "corporate"],
    programs: ["Skilled Worker Visa", "Digital Nomad Visa", "Startup Act"],
    summary: "EU residency routes for skilled professionals and entrepreneurs.",
    href: "/skilled/spain",
    routeLinks: { skilled: "/skilled/spain", corporate: "/corporate/spain" },
  },
  {
    id: "it", code: "IT", label: "Italy", country: "Italy",
    lat: 43.56, lng: 12.15,
    tracks: ["skilled"],
    programs: ["Skilled Worker Visa", "Startup Visa", "Flat Tax Residency"],
    summary: "European residency for skilled professionals and remote workers.",
    href: "/skilled/italy",
    routeLinks: { skilled: "/skilled/italy" },
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
export function getTrackDestinations(trackId: TrackId): GlobalDestination[] {
  return GLOBAL_ROUTE_DESTINATIONS.filter((d) => d.tracks.includes(trackId));
}

export function getPriorityDestinations(trackId: TrackId): GlobalDestination[] {
  return GLOBAL_ROUTE_DESTINATIONS.filter(
    (d) => d.tracks.includes(trackId) && !!d.priority,
  );
}

export function getTrackColor(trackId: TrackId): string {
  return GLOBAL_ROUTE_TRACKS.find((t) => t.id === trackId)?.color ?? "#ffffff";
}

export function getTrackMeta(trackId: TrackId): RouteTrack {
  return GLOBAL_ROUTE_TRACKS.find((t) => t.id === trackId)!;
}

export function getDestinationRouteHref(dest: GlobalDestination, trackId: TrackId): string {
  return dest.routeLinks?.[trackId] ?? dest.href ?? "/eligibility";
}

// Alias kept for import compatibility
export const getDestinationHref = getDestinationRouteHref;
