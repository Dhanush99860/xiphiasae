// Looks up real programme data from the header menu for a given destination + track.
import { headerMenu } from "@/components/Layout/Header/Navigation/menu.data";
import type { MenuNode } from "@/components/Layout/Header/menu.types";
import type { GlobalDestination, TrackId } from "./globalRouteNetwork";

const TRACK_MENU_LABEL: Record<TrackId, string> = {
  residency:   "Residency",
  citizenship: "Citizenship",
  skilled:     "Skilled",
  corporate:   "Corporate",
};

export interface RouteMenuProgram {
  label:        string;
  href:         string;
  description?: string;
}

export interface DestinationRouteMenu {
  countryLabel: string;
  countryHref:  string;
  programs:     RouteMenuProgram[];
}

function findTrackMenu(trackId: TrackId): MenuNode | undefined {
  return headerMenu.find((item) => item.label === TRACK_MENU_LABEL[trackId]);
}

function findCountryNode(trackId: TrackId, dest: GlobalDestination): MenuNode | undefined {
  const track = findTrackMenu(trackId);
  if (!track?.submenu) return undefined;
  return track.submenu.find(
    (item) =>
      item.meta?.code === dest.code ||
      item.label.toLowerCase() === dest.country.toLowerCase() ||
      item.label.toLowerCase() === dest.label.toLowerCase(),
  );
}

function programDescription(label: string, trackId: TrackId): string {
  const l = label.toLowerCase();
  if (l.includes("real estate")) return "Investment-linked property residency pathway.";
  if (l.includes("specialized talent") || l.includes("global talent visa"))
    return "Residency route for specialist professionals and talent profiles.";
  if (l.includes("golden visa"))    return "Long-term residency for qualified investors and eligible profiles.";
  if (l.includes("capital transfer") || l.includes("capital investment"))
    return "Investment-based residency route through capital transfer.";
  if (l.includes("business investment")) return "Business-led route for investors, founders, and entrepreneurs.";
  if (l.includes("fund investment"))  return "Investment residency via qualifying fund allocation.";
  if (l.includes("bank deposit"))     return "Secure deposit-based residency or citizenship pathway.";
  if (l.includes("government bonds")) return "Residency through sovereign bond investment.";
  if (l.includes("property"))         return "Property investment linked residency route.";
  if (l.includes("employer nomination")) return "Employer-sponsored skilled migration pathway.";
  if (l.includes("express entry"))    return "Canada's flagship fast-track skilled immigration system.";
  if (l.includes("global talent stream")) return "Fast-track for highly skilled professionals.";
  if (l.includes("provincial nominee") || l.includes("provincial")) return "Province-specific skilled migration pathway.";
  if (l.includes("digital nomad"))    return "Residency route for remote workers and digital professionals.";
  if (l.includes("startup") || l.includes("start up") || l.includes("start-up"))
    return "Entrepreneur and startup-led residency pathway.";
  if (l.includes("freezone"))         return "Dubai freezone company setup and employment visa.";
  if (l.includes("investor visa"))    return "Investor residency permit for business principals.";
  if (l.includes("mainland employment")) return "Dubai mainland employment and residency permit.";
  if (l.includes("entrepreneur"))     return "Entrepreneur-led business and residency pathway.";
  if (l.includes("intra company") || l.includes("l1 corporate")) return "Company mobility route for executives and key employees.";
  if (l.includes("expansion worker")) return "UK route for overseas business expansion.";
  if (l.includes("self sponsorship")) return "Self-sponsored UK immigration pathway.";
  if (l.includes("national development fund") || l.includes("national transformation fund") ||
      l.includes("economic diversification") || l.includes("ntf"))
    return "Donation-based citizenship programme fund option.";
  if (l.includes("donation"))         return "Citizenship via approved government donation.";
  if (l.includes("eb-5") || l.includes("eb5")) return "US investor immigration via job-creating investment.";
  if (l.includes("eb-1") || l.includes("eb1")) return "US immigration for extraordinary ability and outstanding professionals.";
  if (l.includes("eb-2") || l.includes("eb2") || l.includes("national interest waiver"))
    return "US permanent residence for those with national interest.";
  if (l.includes("eb-3") || l.includes("eb3")) return "Employment-based US green card pathway.";
  if (l.includes("h1") || l.includes("h-1b")) return "Specialty occupation temporary US work visa.";
  if (l.includes("job seeker"))       return "Visa to search for employment in-country.";
  if (l.includes("lump sum") || l.includes("flat tax")) return "High-net-worth tax-efficient residency option.";
  if (l.includes("retirement") || l.includes("pensionado")) return "Long-term residency pathway for retirees.";
  if (l.includes("d2 visa"))          return "Portuguese company formation and corporate residency route.";
  if (l.includes("company setup"))    return "Business formation and residency pathway.";
  if (l.includes("aif"))              return "Alternative Investment Fund residency route.";
  if (l.includes("mm2h"))             return "Malaysia My Second Home long-stay residency programme.";
  if (l.includes("hkgv") || l.includes("top talent")) return "Hong Kong talent attraction and residency pathway.";
  if (trackId === "citizenship")      return "Citizenship by investment programme option.";
  if (trackId === "residency")        return "Investment-based residency pathway.";
  if (trackId === "skilled")          return "Skilled migration pathway.";
  if (trackId === "corporate")        return "Corporate mobility and business route.";
  return "Immigration programme pathway.";
}

export function getDestinationMenuData(
  dest: GlobalDestination,
  trackId: TrackId,
): DestinationRouteMenu | null {
  const node = findCountryNode(trackId, dest);
  if (!node) return null;

  const programs: RouteMenuProgram[] = (node.submenu ?? []).map((item) => ({
    label:       item.label,
    href:        item.href,
    description: item.description ?? programDescription(item.label, trackId),
  }));

  return {
    countryLabel: node.label,
    countryHref:  node.href,
    programs,
  };
}
