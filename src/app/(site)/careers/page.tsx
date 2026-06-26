// app/careers/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { Cormorant_Garamond } from "next/font/google";
import Hero from "@/components/careers/Hero";
import { getAllJobs } from "@/lib/jobs";
import JobList from "@/components/careers/JobList";
import JobFilters from "@/components/careers/JobFilters";
import HiringSteps from "@/components/careers/HiringSteps";
import Perks from "@/components/careers/Perks";
import FAQ from "@/components/careers/FAQ";
import QuickApplyForm from "@/components/careers/QuickApplyForm";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

export const dynamic = "force-static"; // build-time; FS-driven

const SITE = "https://www.xiphiasimmigration.com";

export const metadata: Metadata = {
  title: "Careers at XIPHIAS Immigration | Jobs & Open Roles",
  description:
    "Join our India-based team. Explore careers in citizenship, residency, skilled migration, and corporate immigration from our offices.",
  alternates: { canonical: `${SITE}/careers` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Careers at XIPHIAS Immigration",
    description: "On-site roles across immigration services.",
    url: `${SITE}/careers`,
    type: "website",
    siteName: "XIPHIAS Immigration",
  },
};

function orgJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "XIPHIAS Immigration",
    url: SITE,
    logo: `${SITE}/favicon.ico`,
    sameAs: [
      "https://www.linkedin.com/company/xiphias-immigration/",
      // add other socials if you want
    ],
  });
}

export default function Page() {
  const jobs = getAllJobs();
  const depts = Array.from(
    new Set(jobs.map((j) => j.dept).filter(Boolean))
  ) as string[];

  const featured = jobs[0];

  return (
    <>
      {/* Organization structured data (OK on listing page) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: orgJsonLd() }}
      />

      <main style={{ background: NAVY, color: "#fff" }}>
        <Header serifClass={serif.className} />

        {/* ───────── HERO + FEATURED SPOTLIGHT (dark) ───────── */}
        <section
          data-tone="dark"
          className="relative overflow-hidden px-6 pb-24 pt-36 md:px-10 lg:px-16"
          style={{ background: `radial-gradient(120% 90% at 50% 0%, #13284f 0%, ${NAVY} 60%)`, color: "#fff" }}
        >
          <Ambient tone="dark" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <Hero serifClass={serif.className} featured={featured} openCount={jobs.length} />
          </div>
        </section>

        {/* ───────── FILTERS + LISTING (dark) ───────── */}
        <section
          id="open-roles"
          data-tone="dark"
          aria-label="Filters and Open roles"
          className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
          style={{ background: NAVY, color: "#fff" }}
        >
          <Ambient tone="dark" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8" style={{ background: GOLD }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                Open roles
              </span>
            </div>
            <h2 className={`${serif.className} mt-4 max-w-2xl text-[clamp(1.7rem,3.6vw,2.6rem)] font-medium`}>
              Find your <span className="italic" style={{ color: GOLD }}>place</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/55">
              On-site opportunities across consulting, sales, processing, design,
              and marketing from our Bengaluru and branch offices.
            </p>

            <div className="mt-8">
              {/*
                `JobFilters` uses `useSearchParams()`.
                Wrap it in Suspense so static prerendering doesn't error.
              */}
              <Suspense
                fallback={
                  <div className="h-14 animate-pulse rounded-2xl" style={{ border: "1px solid rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.02)" }} />
                }
              >
                <JobFilters depts={depts} />
              </Suspense>
            </div>

            <div className="mt-6">
              {/*
                `JobList` uses `useSearchParams()`.
                Wrap it in Suspense so static prerendering doesn't error.
              */}
              <Suspense
                fallback={
                  <div className="h-56 animate-pulse rounded-2xl" style={{ border: "1px solid rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.02)" }} />
                }
              >
                <JobList jobs={jobs} serifClass={serif.className} />
              </Suspense>
            </div>
          </div>
        </section>

        {/* ───────── HIRING PROCESS (light) ───────── */}
        <section
          id="process"
          data-tone="light"
          aria-label="Hiring process"
          className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
          style={{ background: "#fbfaf7", color: "#0c1f3f" }}
        >
          <Ambient tone="light" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <HiringSteps serifClass={serif.className} />
          </div>
        </section>

        {/* ───────── BENEFITS (dark) ───────── */}
        <section
          id="perks"
          data-tone="dark"
          aria-label="Benefits & Perks"
          className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
          style={{ background: NAVY, color: "#fff" }}
        >
          <Ambient tone="dark" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <Perks serifClass={serif.className} />
          </div>
        </section>

        {/* ───────── FAQ (light) ───────── */}
        <section
          id="faq"
          data-tone="light"
          aria-label="Frequently asked questions"
          className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
          style={{ background: "#f7f4ef", color: "#0c1f3f" }}
        >
          <Ambient tone="light" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <FAQ serifClass={serif.className} />
          </div>
        </section>

        {/* ───────── QUICK APPLY (dark hero band, light form card) ───────── */}
        <section
          id="apply"
          data-tone="dark"
          aria-label="Quick apply"
          className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
          style={{ background: `radial-gradient(120% 90% at 15% 0%, #13284f 0%, ${NAVY} 60%)`, color: "#fff" }}
        >
          <Ambient tone="dark" />
          <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8" style={{ background: GOLD }} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                  Quick apply
                </span>
              </div>
              <h2 className={`${serif.className} mt-5 text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.04]`}>
                Don&apos;t see an exact match? <span className="italic" style={{ color: GOLD }}>Tell us anyway.</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
                Share your resume and a few details — our talent team will reach out when a suitable
                role opens.
              </p>
            </div>
            <div
              className="rounded-2xl border p-7 sm:p-9"
              style={{ borderColor: `${GOLD}40`, background: "#f6f9fd", boxShadow: "0 40px 110px -50px rgba(0,0,0,0.7)" }}
            >
              <h3 className={`${serif.className} text-[1.7rem] font-medium text-[#0c1f3f]`}>Submit your application</h3>
              <p className="mt-1 text-sm text-[#0c1f3f]/55">We&apos;ll keep your details on file and reach out.</p>
              <div className="mt-6">
                <QuickApplyForm />
              </div>
            </div>
          </div>
        </section>

        <Footer serifClass={serif.className} />
      </main>
    </>
  );
}
