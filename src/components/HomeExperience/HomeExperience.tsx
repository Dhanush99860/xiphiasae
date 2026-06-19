"use client";

import dynamic from "next/dynamic";
import TrustEmbassy from "./TrustEmbassy";
import HomeFinalCTA from "./HomeFinalCTA";

// Client-heavy sections loaded lazily (3D / GSAP / framer-motion)
const EmbassyHero = dynamic(() => import("./EmbassyHero"), { ssr: false });
const JourneySelector = dynamic(() => import("./JourneySelector"), { ssr: false });
const GlobalRouteCommand = dynamic(() => import("./GlobalRouteCommand"), { ssr: false });
const PassportProcess = dynamic(() => import("./PassportProcess"), { ssr: false });
const XiaRouteDesk = dynamic(() => import("./XiaRouteDesk"), { ssr: false });

export default function HomeExperience() {
  return (
    <>
      <EmbassyHero />
      <JourneySelector />
      <GlobalRouteCommand />
      <PassportProcess />
      <TrustEmbassy />
      <XiaRouteDesk />
      <HomeFinalCTA />
    </>
  );
}
