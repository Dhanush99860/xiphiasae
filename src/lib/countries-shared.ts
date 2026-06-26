// Client-safe shared types + constants for the Countries pages. No "server-only",
// no fs — so CLIENT components (e.g. CountryExplorer) can import these without
// pulling in the server-only data loader (which would 500). The server loader
// `countries-content.ts` re-exports everything here for back-compat.

export type Vertical = "citizenship" | "residency" | "skilled" | "corporate";

export const TRACK_LABEL: Record<Vertical, string> = {
  residency: "Residency by Investment",
  citizenship: "Citizenship by Investment",
  skilled: "Skilled Migration",
  corporate: "Corporate & Business",
};

export const TRACK_PILL: Record<Vertical, string> = {
  citizenship: "Citizenship",
  residency: "Residency",
  skilled: "Skilled",
  corporate: "Corporate",
};

export const TRACK_ORDER: Vertical[] = ["citizenship", "residency", "skilled", "corporate"];

export type ProgrammeItem = {
  id: string;
  track: Vertical;
  title: string;
  summary: string;
  href: string;
  investmentLabel: string;
  timelineLabel: string;
};

export type CountrySummary = {
  slug: string;
  name: string;
  code: string; // ISO-2 for the flag
  region: string;
  tracks: Vertical[];
  programmeCount: number;
};

export type CountryTrackGroup = {
  track: Vertical;
  label: string;
  items: ProgrammeItem[];
};

export type CountryOverview = CountrySummary & {
  groups: CountryTrackGroup[];
  programmes: ProgrammeItem[];
};
