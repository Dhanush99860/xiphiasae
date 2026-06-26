import "server-only";

import {
  getResidencyPrograms,
  type ProgramMeta as ResidencyProgramMeta,
} from "@/lib/residency-content";
import {
  getCitizenshipPrograms,
  type ProgramMeta as CitizenshipProgramMeta,
} from "@/lib/citizenship-content";
import {
  getSkilledPrograms,
  type ProgramMeta as SkilledProgramMeta,
} from "@/lib/skilled-content";
import {
  getCorporatePrograms,
  type ProgramMeta as CorporateProgramMeta,
} from "@/lib/corporate-content";

/**
 * Country-first view over the four programme catalogues. Powers the
 * `/countries` index and the `/countries/[country]` overview, aggregating every
 * programme we run in a given country across all four verticals (residency,
 * citizenship, skilled, corporate). Built on top of the real MDX-backed content
 * libs so it always reflects the live programme pages.
 */

// Client-safe types + constants live in ./countries-shared (imported here for
// local use, and re-exported so existing importers of this module keep working).
import { TRACK_LABEL, TRACK_PILL, TRACK_ORDER } from "./countries-shared";
import type {
  Vertical,
  ProgrammeItem,
  CountrySummary,
  CountryTrackGroup,
  CountryOverview,
} from "./countries-shared";
export { TRACK_LABEL, TRACK_PILL, TRACK_ORDER };
export type { Vertical, ProgrammeItem, CountrySummary, CountryTrackGroup, CountryOverview };

type AnyProgramMeta =
  | ResidencyProgramMeta
  | CitizenshipProgramMeta
  | SkilledProgramMeta
  | CorporateProgramMeta;

// ProgrammeItem / CountrySummary / CountryTrackGroup / CountryOverview now live
// in ./countries-shared (imported + re-exported above).

// Canonical display name, ISO-2 flag code and region, keyed by the content
// directory slug (content/{vertical}/{slug}). Keeps the title-cased fallback
// from looking wrong (e.g. "Uae" -> "UAE", "Usa" -> "USA").
const COUNTRY_META: Record<string, { name: string; code: string; region: string }> = {
  "antigua-barbuda": { name: "Antigua & Barbuda", code: "AG", region: "Caribbean" },
  australia: { name: "Australia", code: "AU", region: "Asia-Pacific" },
  bulgaria: { name: "Bulgaria", code: "BG", region: "Europe" },
  canada: { name: "Canada", code: "CA", region: "Americas" },
  curacao: { name: "Curaçao", code: "CW", region: "Caribbean" },
  cyprus: { name: "Cyprus", code: "CY", region: "Europe" },
  dominica: { name: "Dominica", code: "DM", region: "Caribbean" },
  egypt: { name: "Egypt", code: "EG", region: "Africa & Middle East" },
  germany: { name: "Germany", code: "DE", region: "Europe" },
  greece: { name: "Greece", code: "GR", region: "Europe" },
  grenada: { name: "Grenada", code: "GD", region: "Caribbean" },
  "hong-kong": { name: "Hong Kong", code: "HK", region: "Asia-Pacific" },
  hungary: { name: "Hungary", code: "HU", region: "Europe" },
  italy: { name: "Italy", code: "IT", region: "Europe" },
  latvia: { name: "Latvia", code: "LV", region: "Europe" },
  malaysia: { name: "Malaysia", code: "MY", region: "Asia-Pacific" },
  malta: { name: "Malta", code: "MT", region: "Europe" },
  mauritius: { name: "Mauritius", code: "MU", region: "Africa & Middle East" },
  monaco: { name: "Monaco", code: "MC", region: "Europe" },
  nauru: { name: "Nauru", code: "NR", region: "Asia-Pacific" },
  "new-zealand": { name: "New Zealand", code: "NZ", region: "Asia-Pacific" },
  panama: { name: "Panama", code: "PA", region: "Americas" },
  portugal: { name: "Portugal", code: "PT", region: "Europe" },
  saintkitts: { name: "Saint Kitts & Nevis", code: "KN", region: "Caribbean" },
  "saint-lucia": { name: "Saint Lucia", code: "LC", region: "Caribbean" },
  saotome: { name: "São Tomé & Príncipe", code: "ST", region: "Africa & Middle East" },
  singapore: { name: "Singapore", code: "SG", region: "Asia-Pacific" },
  spain: { name: "Spain", code: "ES", region: "Europe" },
  switzerland: { name: "Switzerland", code: "CH", region: "Europe" },
  turkey: { name: "Turkey", code: "TR", region: "Europe" },
  uae: { name: "United Arab Emirates", code: "AE", region: "Africa & Middle East" },
  "united-kingdom": { name: "United Kingdom", code: "GB", region: "Europe" },
  uruguay: { name: "Uruguay", code: "UY", region: "Americas" },
  usa: { name: "United States", code: "US", region: "Americas" },
  vanuatu: { name: "Vanuatu", code: "VU", region: "Asia-Pacific" },
};

export const REGION_ORDER = [
  "Africa & Middle East",
  "Europe",
  "Caribbean",
  "Asia-Pacific",
  "Americas",
];

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function metaFor(slug: string) {
  return (
    COUNTRY_META[slug] ?? {
      name: titleFromSlug(slug),
      code: "",
      region: "Other",
    }
  );
}

function investmentLabel(meta: AnyProgramMeta): string {
  if (meta.category === "skilled") {
    const salary =
      "minSalary" in meta && typeof meta.minSalary === "number"
        ? meta.minSalary
        : meta.minInvestment;
    const currency =
      "salaryCurrency" in meta && meta.salaryCurrency ? meta.salaryCurrency : meta.currency;
    if (typeof salary === "number" && salary > 0) {
      return `Salary from ${salary.toLocaleString()} ${currency ?? "USD"}`;
    }
    return "Points-based";
  }
  if (typeof meta.minInvestment === "number" && meta.minInvestment > 0) {
    return `From ${meta.minInvestment.toLocaleString()} ${meta.currency ?? "USD"}`;
  }
  return "On enquiry";
}

function toItem(meta: AnyProgramMeta, track: Vertical): ProgrammeItem {
  return {
    id: `${track}-${meta.countrySlug}-${meta.programSlug}`,
    track,
    title: meta.title,
    summary: meta.tagline?.trim() || `${TRACK_LABEL[track]} in ${meta.country}.`,
    href: `/${track}/${meta.countrySlug}/${meta.programSlug}`,
    investmentLabel: investmentLabel(meta),
    timelineLabel: meta.timelineLabel?.trim() || "Timeline on enquiry",
  };
}

/** Map of country slug -> every programme we run there, across all verticals. */
function programmesByCountry(): Map<string, ProgrammeItem[]> {
  const sources: { track: Vertical; programs: AnyProgramMeta[] }[] = [
    { track: "citizenship", programs: getCitizenshipPrograms() },
    { track: "residency", programs: getResidencyPrograms() },
    { track: "skilled", programs: getSkilledPrograms() },
    { track: "corporate", programs: getCorporatePrograms() },
  ];

  const byCountry = new Map<string, ProgrammeItem[]>();
  for (const { track, programs } of sources) {
    for (const meta of programs) {
      const slug = meta.countrySlug;
      if (!slug) continue;
      const list = byCountry.get(slug) ?? [];
      list.push(toItem(meta, track));
      byCountry.set(slug, list);
    }
  }
  return byCountry;
}

function buildGroups(items: ProgrammeItem[]): CountryTrackGroup[] {
  return TRACK_ORDER.map((track) => ({
    track,
    label: TRACK_LABEL[track],
    items: items
      .filter((i) => i.track === track)
      .sort((a, b) => a.title.localeCompare(b.title)),
  })).filter((g) => g.items.length > 0);
}

export function getAllCountries(): CountrySummary[] {
  const byCountry = programmesByCountry();
  const out: CountrySummary[] = [];
  for (const [slug, items] of byCountry) {
    const meta = metaFor(slug);
    const tracks = TRACK_ORDER.filter((t) => items.some((i) => i.track === t));
    out.push({
      slug,
      name: meta.name,
      code: meta.code,
      region: meta.region,
      tracks,
      programmeCount: items.length,
    });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

export function getCountriesByRegion(): { region: string; countries: CountrySummary[] }[] {
  const all = getAllCountries();
  const byRegion = new Map<string, CountrySummary[]>();
  for (const c of all) {
    const list = byRegion.get(c.region) ?? [];
    list.push(c);
    byRegion.set(c.region, list);
  }
  const ordered = [
    ...REGION_ORDER,
    ...[...byRegion.keys()].filter((r) => !REGION_ORDER.includes(r)),
  ];
  return ordered
    .filter((region) => byRegion.has(region))
    .map((region) => ({ region, countries: byRegion.get(region)! }));
}

export function getCountryOverview(slug: string): CountryOverview | null {
  const items = programmesByCountry().get(slug);
  if (!items || items.length === 0) return null;
  const meta = metaFor(slug);
  const tracks = TRACK_ORDER.filter((t) => items.some((i) => i.track === t));
  return {
    slug,
    name: meta.name,
    code: meta.code,
    region: meta.region,
    tracks,
    programmeCount: items.length,
    groups: buildGroups(items),
    programmes: items,
  };
}

export function getCountrySlugs(): string[] {
  return [...programmesByCountry().keys()].sort();
}
