import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, GraduationCap, Home, Landmark, ShieldCheck } from "lucide-react";
import {
  PassportIndexShell,
  PassportSourceNote,
  RouteCard,
  serifClass,
} from "@/components/PassportIndex/PassportIndexShared";

const SITE_URL = "https://www.xiphiasimmigration.com";

export const metadata: Metadata = {
  title: "Improve Passport Mobility - XIPHIAS Passport Power",
  description:
    "Explore the main ways XIPHIAS helps clients improve global mobility through residence, citizenship, skilled, and corporate routes.",
  alternates: { canonical: "/passport-index/improve" },
  openGraph: {
    title: "Improve Passport Mobility - XIPHIAS Passport Power",
    description: "Turn passport ranking into a practical mobility route map.",
    url: `${SITE_URL}/passport-index/improve`,
    siteName: "XIPHIAS Immigration",
    type: "website",
    images: ["/xiphias-immigration.png"],
  },
};

export const revalidate = 86400;

export default function ImprovePassportMobilityPage() {
  return (
    <PassportIndexShell
      active="improve"
      eyebrow="Improve mobility"
      title="Move from passport ranking to an actionable route."
      description="The best route is rarely just the highest rank. XIPHIAS compares the client's goal, funds, family, documents, and risk profile before recommending the next move."
    >
      <section className="mx-auto max-w-screen-2xl px-4 py-10 md:px-6">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#bfa15c]">Route families</p>
          <h2 className={`${serifClass} mt-2 text-2xl font-medium text-white`}>Choose the path before choosing the country.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <RouteCard
            icon={Home}
            title="Residence by investment"
            description="For families seeking second residence, Schengen access, lifestyle, or long-term citizenship planning."
            href="/residency"
            cta="View residency"
          />
          <RouteCard
            icon={Landmark}
            title="Citizenship by investment"
            description="For clients focused on travel freedom, timeline, and family inclusion through eligible CBI programs."
            href="/citizenship"
            cta="View citizenship"
          />
          <RouteCard
            icon={GraduationCap}
            title="Skilled migration"
            description="For applicants using education, professional background, job routes, or points-based systems."
            href="/skilled"
            cta="View skilled routes"
          />
          <RouteCard
            icon={BriefcaseBusiness}
            title="Corporate mobility"
            description="For founders, investors, executives, and companies expanding through transfer or setup routes."
            href="/corporate"
            cta="View corporate routes"
          />
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 pb-10 md:px-6">
        <div className="grid gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-xl shadow-black/30 backdrop-blur-sm lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex gap-3">
            <ShieldCheck className="mt-1 size-5 shrink-0 text-[#bfa15c]" />
            <div>
              <h2 className={`${serifClass} text-lg font-medium text-white`}>What makes this different from a normal index</h2>
              <p className="mt-1.5 text-[13px] leading-[1.65] text-white/60">
                A public ranking tells you access. XIPHIAS adds eligibility, due diligence, document readiness, timeline, and implementation tracking.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Source of funds", "Family inclusion", "Physical presence"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-1.5">
                    <CheckCircle2 className="size-3.5 text-[#bfa15c]" />
                    <span className="text-[12px] font-semibold text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Link
            href="/x-hub/x-passport"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#bfa15c] px-5 py-2.5 text-[13px] font-semibold text-[#0c1f3f] transition hover:bg-[#d8bd78]"
          >
            Open X-Passport engine <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>

      <PassportSourceNote />
    </PassportIndexShell>
  );
}
