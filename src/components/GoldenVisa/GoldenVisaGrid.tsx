"use client";

import { Stagger, StaggerItem } from "@/components/motion";
import type { CountryMeta } from "@/lib/residency-content";
import GoldenVisaCard from "./GoldenVisaCard";

type Props = {
  countries: CountryMeta[];
};

/**
 * Staggered grid of Golden Visa destination cards. Client component only so the
 * Stagger reveal can animate on scroll; each card itself is a server-rendered
 * child passed through.
 */
export default function GoldenVisaGrid({ countries }: Props) {
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" amount={0.1}>
      {countries.map((country, i) => (
        <StaggerItem key={country.countrySlug} className="h-full">
          <GoldenVisaCard country={country} priority={i < 3} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
