import CinematicHero from "@/components/Home/Hero/CinematicHero";
import JourneySelector from "./JourneySelector";
import GlobalRouteCommand from "./GlobalRouteCommand";
import PassportProcess from "./PassportProcess";
import TrustEmbassy from "./TrustEmbassy";
import XiaRouteDesk from "./XiaRouteDesk";
import HomeFinalCTA from "./HomeFinalCTA";

// All sections are lightweight client components (CSS/SVG/framer — no 3D), so
// they server-render in document order. Previously the hero + some sections were
// dynamic({ ssr:false }) for the old R3F globe; that made them appear only after
// hydration, so the server-rendered "Why XIPHIAS" / final CTA flashed at the top
// first. Static imports keep the order correct on first paint (no flash).
export default function HomeExperience() {
  return (
    <>
      <CinematicHero />
      <JourneySelector />
      <GlobalRouteCommand />
      <PassportProcess />
      <TrustEmbassy />
      <XiaRouteDesk />
      <HomeFinalCTA />
    </>
  );
}
