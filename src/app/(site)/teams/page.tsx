// ==============================================
// app/teams/page.tsx – Spotlight Feature (navy/gold)
// ==============================================
"use client";
import React from "react";
import Head from "next/head";
import { Cormorant_Garamond } from "next/font/google";
import { ORG, LEADERSHIP, ADVISORS, TEAM, EVENTS } from "@/components/Team/team";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import { Hero } from "@/components/Team/Hero";
import { Leadership } from "@/components/Team/Leadership";
import { Advisors } from "@/components/Team/Advisors";
import { TeamDirectory } from "@/components/Team/TeamDirectory";
import { Values } from "@/components/Team/Values";
import { Events } from "@/components/Team/Events";
import { CTA } from "@/components/Team/CTA";
import { JsonLd } from "@/components/Team/JsonLd";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const NAVY = "#0a1733";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: ORG.name,
  legalName: ORG.legalName,
  url: ORG.url,
  logo: ORG.logo,
  slogan: ORG.slogan,
  contactPoint: [{ "@type": "ContactPoint", email: ORG.contactEmail, contactType: "customer support" }],
  sameAs: ORG.sameAs,
  employee: LEADERSHIP.map((p) => ({ "@type": "Person", name: p.name, jobTitle: p.role, image: p.headshot, email: p.email })),
} as const;

export default function TeamPage() {
  const serifClass = serif.className;
  const md = LEADERSHIP[0];

  return (
    <>
      <Head>
        <title>Leadership & Team – {ORG.name}</title>
        <meta name="description" content="Meet the leadership and team powering customer-obsessed execution. Lightweight UX, transparent delivery, and measurable outcomes." />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={`Leadership & Team – ${ORG.name}`} />
        <meta property="og:description" content="Meet the people behind the work." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${ORG.url}/teams`} />
        <meta property="og:image" content={`${ORG.url}${ORG.logo}`} />
      </Head>
      <JsonLd data={orgJsonLd} />

      <main style={{ background: NAVY, color: "#fff" }}>
        <Header serifClass={serifClass} />

        <Hero
          title="Meet the People Behind the Work"
          subtitle="Transparent leadership. Senior hands-on execution. A culture that ships."
          primaryHref="/contact"
          primaryText="Talk to Leadership"
          secondaryHref="/about"
          secondaryText="About the Company"
          badge="Leadership & Team"
          featured={md}
          serifClass={serifClass}
        />

        <Leadership people={LEADERSHIP} serifClass={serifClass} />
        <Advisors people={ADVISORS} serifClass={serifClass} />
        {TEAM.length ? <TeamDirectory people={TEAM} serifClass={serifClass} /> : null}
        <Values serifClass={serifClass} />
        {EVENTS.length ? <Events items={EVENTS} serifClass={serifClass} /> : null}
        <CTA serifClass={serifClass} />

        <Footer serifClass={serifClass} />
      </main>
    </>
  );
}
