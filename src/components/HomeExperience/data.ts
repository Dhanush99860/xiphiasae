import type { GlobeArc, GlobeMarker } from "@/components/globe";

// ─── India origin (centroid) ──────────────────────────────────────────────────
export const INDIA_ORIGIN: [number, number] = [20.5937, 78.9629];

// ─── Globe markers ────────────────────────────────────────────────────────────
export const HOME_MARKERS: GlobeMarker[] = [
  { code: "IN", lat: 20.5937, lng: 78.9629, label: "India", weight: 1, color: "#e1b923" },
  { code: "AE", lat: 25.2048, lng: 55.2708, label: "UAE", weight: 0.9, color: "#60a5fa" },
  { code: "CA", lat: 56.1304, lng: -106.3468, label: "Canada", weight: 0.85, color: "#60a5fa" },
  { code: "GB", lat: 55.3781, lng: -3.436, label: "United Kingdom", weight: 0.8, color: "#60a5fa" },
  { code: "PT", lat: 39.3999, lng: -8.2245, label: "Portugal", weight: 0.8, color: "#60a5fa" },
  { code: "GR", lat: 39.0742, lng: 21.8243, label: "Greece", weight: 0.75, color: "#60a5fa" },
  { code: "AU", lat: -25.2744, lng: 133.7751, label: "Australia", weight: 0.85, color: "#60a5fa" },
  { code: "US", lat: 37.0902, lng: -95.7129, label: "USA", weight: 0.8, color: "#60a5fa" },
  { code: "GD", lat: 12.1165, lng: -61.679, label: "Grenada", weight: 0.7, color: "#60a5fa" },
  { code: "KN", lat: 17.3578, lng: -62.783, label: "St. Kitts", weight: 0.7, color: "#60a5fa" },
  { code: "TR", lat: 38.9637, lng: 35.2433, label: "Turkey", weight: 0.75, color: "#60a5fa" },
  { code: "SG", lat: 1.3521, lng: 103.8198, label: "Singapore", weight: 0.75, color: "#60a5fa" },
  { code: "MT", lat: 35.9375, lng: 14.3754, label: "Malta", weight: 0.7, color: "#60a5fa" },
];

// ─── Route arcs (India → destinations) ───────────────────────────────────────
export const HOME_ARCS: GlobeArc[] = [
  { from: INDIA_ORIGIN, to: [25.2048, 55.2708], color: "#e1b923" },
  { from: INDIA_ORIGIN, to: [56.1304, -106.3468], color: "#93c5fd" },
  { from: INDIA_ORIGIN, to: [55.3781, -3.436], color: "#93c5fd" },
  { from: INDIA_ORIGIN, to: [39.3999, -8.2245], color: "#93c5fd" },
  { from: INDIA_ORIGIN, to: [39.0742, 21.8243], color: "#93c5fd" },
  { from: INDIA_ORIGIN, to: [-25.2744, 133.7751], color: "#93c5fd" },
  { from: INDIA_ORIGIN, to: [37.0902, -95.7129], color: "#93c5fd" },
  { from: INDIA_ORIGIN, to: [12.1165, -61.679], color: "#93c5fd" },
  { from: INDIA_ORIGIN, to: [38.9637, 35.2433], color: "#93c5fd" },
  { from: INDIA_ORIGIN, to: [1.3521, 103.8198], color: "#e1b923" },
];

// ─── Hero floating route cards ────────────────────────────────────────────────
export const HERO_ROUTE_CARDS = [
  {
    label: "UAE Golden Visa",
    type: "Residency",
    flag: "AE",
    href: "/residency/uae",
    timeframe: "2–3 months",
    color: "#3b82f6",
  },
  {
    label: "Canada PR",
    type: "Skilled",
    flag: "CA",
    href: "/skilled/canada",
    timeframe: "12–18 months",
    color: "#10b981",
  },
  {
    label: "Portugal Golden Visa",
    type: "Residency",
    flag: "PT",
    href: "/residency/portugal",
    timeframe: "6–8 months",
    color: "#3b82f6",
  },
  {
    label: "Grenada CBI",
    type: "Citizenship",
    flag: "GD",
    href: "/citizenship/grenada",
    timeframe: "4–6 months",
    color: "#e1b923",
  },
  {
    label: "Australia Skilled",
    type: "Skilled",
    flag: "AU",
    href: "/skilled/australia",
    timeframe: "12–24 months",
    color: "#10b981",
  },
] as const;

export type HeroRouteCard = (typeof HERO_ROUTE_CARDS)[number];

// ─── Four journey pathways ────────────────────────────────────────────────────
export const JOURNEY_PATHS = [
  {
    id: "residency",
    title: "Residency",
    subtitle: "Investment-backed residency",
    description:
      "Golden Visa programs granting long-term residency and access to world-class education, healthcare, and global mobility.",
    href: "/residency",
    countries: ["UAE", "Portugal", "Greece", "Malta", "Spain"],
    accentColor: "#3b82f6",
    bgColor: "rgba(59,130,246,0.08)",
  },
  {
    id: "citizenship",
    title: "Citizenship",
    subtitle: "Second passport pathways",
    description:
      "Citizenship by investment programs offering visa-free access to 140+ countries for you and your family.",
    href: "/citizenship",
    countries: ["Grenada", "St. Kitts", "Turkey", "Dominica", "Vanuatu"],
    accentColor: "#e1b923",
    bgColor: "rgba(225,185,35,0.08)",
  },
  {
    id: "skilled",
    title: "Skilled Migration",
    subtitle: "Merit-based immigration",
    description:
      "Points-based and employer-sponsored pathways leading to permanent residency in top-tier destinations.",
    href: "/skilled",
    countries: ["Canada", "Australia", "UK", "Germany", "New Zealand"],
    accentColor: "#10b981",
    bgColor: "rgba(16,185,129,0.08)",
  },
  {
    id: "corporate",
    title: "Corporate Mobility",
    subtitle: "Global workforce solutions",
    description:
      "Intra-company transfers, work authorisations, and relocation programmes for multinational teams.",
    href: "/corporate",
    countries: ["USA", "UK", "Singapore", "Canada", "UAE"],
    accentColor: "#a78bfa",
    bgColor: "rgba(167,139,250,0.08)",
  },
] as const;

export type JourneyPath = (typeof JOURNEY_PATHS)[number];
export type JourneyId = JourneyPath["id"];

// ─── Six-step process ─────────────────────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Profile Review",
    description: "Comprehensive assessment of your eligibility, assets, and global goals.",
  },
  {
    number: "02",
    title: "Route Strategy",
    description: "Custom shortlist of programs matched to your profile, timeline, and budget.",
  },
  {
    number: "03",
    title: "Document Readiness",
    description: "Full audit and preparation of legal, financial, and identity documents.",
  },
  {
    number: "04",
    title: "Compliance & Filing",
    description: "Government-compliant submission managed by licensed advisors.",
  },
  {
    number: "05",
    title: "Government Decision",
    description: "Managed communication with authorities through to formal approval.",
  },
  {
    number: "06",
    title: "Landing & Relocation",
    description: "Airport reception, settlement support, and local onboarding.",
  },
] as const;

// ─── Trust indicators ─────────────────────────────────────────────────────────
export const TRUST_POINTS = [
  {
    stat: "17+",
    statLabel: "Years",
    title: "Licensed Advisory",
    description: "Regulated advisors operating across every jurisdiction we serve.",
  },
  {
    stat: "4,500+",
    statLabel: "Families",
    title: "Family Relocation",
    description: "End-to-end support from school selection to property and banking.",
  },
  {
    stat: "98%",
    statLabel: "Approval",
    title: "Success Rate",
    description: "Government-approved cases across all primary programs.",
  },
  {
    stat: "50+",
    statLabel: "Countries",
    title: "Global Coverage",
    description: "Residency, citizenship, and skilled programs across six continents.",
  },
  {
    stat: "250+",
    statLabel: "Corporates",
    title: "Corporate Mobility",
    description: "Workforce mobility reports and bulk work authorisation programmes.",
  },
  {
    stat: "3",
    statLabel: "Offices",
    title: "Global Advisory Desks",
    description: "Physical advisory desks in India, UAE, and the United Kingdom.",
  },
] as const;

// ─── XIA Intelligence flow ────────────────────────────────────────────────────
export const XIA_FLOW = [
  {
    step: "01",
    label: "You Set Your Goal",
    description:
      "Residence, citizenship, career move, or corporate relocation — you define the destination.",
  },
  {
    step: "02",
    label: "XIA Builds Your Shortlist",
    description:
      "Our intelligence engine analyses 50+ programs against your profile in seconds.",
  },
  {
    step: "03",
    label: "Advisor Verification",
    description:
      "A licensed advisor reviews and refines the shortlist with current government intelligence.",
  },
  {
    step: "04",
    label: "Consultation Scheduled",
    description:
      "A private advisory call is booked — on your terms, at your pace.",
  },
] as const;
