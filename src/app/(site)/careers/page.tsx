// app/careers/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { Cormorant_Garamond } from "next/font/google";
import Hero from "@/components/careers/Hero";
import { getAllJobs } from "@/lib/jobs";
import JobList from "@/components/careers/JobList";
import JobFilters from "@/components/careers/JobFilters";
import HiringSteps from "@/components/careers/HiringSteps";
import QuickApplyForm from "@/components/careers/QuickApplyForm";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";
const SITE = "https://www.xiphiasimmigration.com";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Careers at XIPHIAS Immigration | Join Our Team",
  description: "Join our global-mobility team. Explore on-site careers in citizenship, residency, skilled migration and corporate immigration from our Bengaluru headquarters.",
  alternates: { canonical: `${SITE}/careers` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Careers at XIPHIAS Immigration",
    description: "On-site roles across immigration services — Bengaluru & branch offices.",
    url: `${SITE}/careers`,
    type: "website",
    siteName: "XIPHIAS Immigration",
  },
};

export default function Page() {
  const jobs = getAllJobs();
  const depts = Array.from(new Set(jobs.map((j) => j.dept).filter(Boolean))) as string[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "XIPHIAS Immigration",
            url: SITE,
            logo: `${SITE}/favicon.ico`,
            sameAs: ["https://www.linkedin.com/company/xiphias-immigration/"],
          }),
        }}
      />

      <main style={{ background: NAVY }}>
        <Header serifClass={serif.className} />

        {/* ── Hero (compact, wide) ── */}
        <Hero serifClass={serif.className} openCount={jobs.length} />

        {/* ── Open roles ── */}
        <section
          id="open-roles"
          data-tone="dark"
          aria-label="Open roles"
          className="relative overflow-hidden px-6 py-12 md:px-10 lg:px-16"
          style={{ background: NAVY }}
        >
          <Ambient tone="dark" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                  <span className="h-px w-8" style={{ background: GOLD }} />Open roles
                </p>
                <h2 className={`${serif.className} mt-3 text-[clamp(1.6rem,3.2vw,2.4rem)] font-medium text-white`}>
                  Find your <span className="italic" style={{ color: GOLD }}>place</span>
                </h2>
              </div>
              <p className="text-[12px] text-white/35">On-site · Bengaluru HQ & branch offices</p>
            </div>

            <div className="mt-6">
              <Suspense fallback={<div className="h-12 animate-pulse rounded-xl" style={{ border: "1px solid rgba(191,161,92,0.2)", background: "rgba(255,255,255,0.02)" }} />}>
                <JobFilters depts={depts} />
              </Suspense>
            </div>

            <Suspense fallback={<div className="mt-5 h-48 animate-pulse rounded-2xl" style={{ border: "1px solid rgba(191,161,92,0.2)", background: "rgba(255,255,255,0.02)" }} />}>
              <JobList jobs={jobs} serifClass={serif.className} />
            </Suspense>
          </div>
        </section>

        {/* ── Hiring process (light, compact) ── */}
        <section
          id="process"
          data-tone="light"
          aria-label="Hiring process"
          className="relative overflow-hidden px-6 py-12 md:px-10 lg:px-16"
          style={{ background: "#f3f7fd", color: INK }}
        >
          <Ambient tone="light" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <HiringSteps serifClass={serif.className} />
          </div>
        </section>

        {/* ── Quick Apply + benefits bullets ── */}
        <section
          id="apply"
          data-tone="dark"
          aria-label="Apply"
          className="relative overflow-hidden px-6 py-12 md:px-10 lg:px-16"
          style={{ background: `radial-gradient(120% 90% at 15% 0%, #13284f 0%, ${NAVY} 60%)` }}
        >
          <Ambient tone="dark" />
          <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">

            {/* left — copy + quick benefits */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                  <span className="h-px w-8" style={{ background: GOLD }} />Quick apply
                </p>
                <h2 className={`${serif.className} mt-4 text-[clamp(1.8rem,3.8vw,3rem)] font-medium leading-[1.04] text-white`}>
                  Don&apos;t see an exact match?{" "}
                  <span className="italic" style={{ color: GOLD }}>Tell us anyway.</span>
                </h2>
                <p className="mt-4 text-[14px] leading-relaxed text-white/55">
                  Share your resume and a few details — our talent team will reach out when a suitable role opens.
                </p>
              </div>

              {/* compact benefits */}
              <div className="rounded-xl border p-5" style={{ borderColor: "rgba(191,161,92,0.2)", background: "rgba(255,255,255,0.025)" }}>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>Why join us</p>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    "Office-first, close-knit teams",
                    "Certification reimbursements",
                    "Clear career growth paths",
                    "Medical cover & paid leave",
                    "Performance-linked bonuses",
                    "Hands-on immigration expertise",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[12.5px] text-white/60">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[11px] text-white/30">
                Questions?{" "}
                <a href="mailto:hr@xiphias.in" className="font-semibold underline underline-offset-2" style={{ color: `${GOLD}cc` }}>
                  hr@xiphias.in
                </a>
              </p>
            </div>

            {/* right — form */}
            <div
              className="rounded-2xl border p-7 sm:p-8"
              style={{ borderColor: `${GOLD}38`, background: "#f6f9fd", boxShadow: "0 32px 90px -44px rgba(0,0,0,0.65)" }}
            >
              <h3 className={`${serif.className} text-[1.5rem] font-medium text-[#0c1f3f]`}>Submit your application</h3>
              <p className="mt-1 text-[12px] text-[#0c1f3f]/45">We&apos;ll keep your details on file and reach out.</p>
              <div className="mt-5">
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
