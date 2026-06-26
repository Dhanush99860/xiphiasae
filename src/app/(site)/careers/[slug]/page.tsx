// src/app/(site)/careers/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { getJobBySlug, jobsStaticParams, jobJsonLd, getAllJobs } from "@/lib/jobs";
import { formatDateUS, formatDateUSShort } from "@/lib/format";
import JobDetailSections from "@/components/careers/JobDetailSections";
import QuickApplyForm from "@/components/careers/QuickApplyForm";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

export const dynamicParams = false; // only generate for files that exist
export async function generateStaticParams() {
  return jobsStaticParams();
}

const SITE = "https://www.xiphiasimmigration.com";

type Params = { slug: string };
type PageProps = { params: Params | Promise<Params> };

// ----- Helpers -----
function fmtDate(iso?: string) {
  if (!iso) return "";
  return formatDateUS(iso);
}

function fmtSalary(job: any) {
  const cur = job?.salaryCurrency || "INR";
  const min = job?.salaryMin;
  const max = job?.salaryMax;
  if (!min && !max) return null;
  const nf = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });
  if (min && max) return `${cur} ${nf.format(min)}–${nf.format(max)}/yr`;
  if (min) return `From ${cur} ${nf.format(min)}/yr`;
  return `Up to ${cur} ${nf.format(max)}/yr`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const job = getJobBySlug(slug);
  const title = job ? `${job.title} | Careers at XIPHIAS Immigration` : "Job | XIPHIAS Immigration";
  const url = `${SITE}/careers/${slug}`;
  const description = job ? `${job.title} — ${job.location}. Apply now.` : "Open role at XIPHIAS Immigration.";
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: job?.hero ? [{ url: job.hero, alt: job.heroAlt || job.title }] : undefined,
    },
  };
}

/* small pill used in the hero meta row */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white/70"
      style={{ border: `1px solid ${GOLD}3a`, background: "rgba(255,255,255,0.03)" }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} aria-hidden />
      {children}
    </span>
  );
}

export default async function Page({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const job = getJobBySlug(slug);
  if (!job) {
    return (
      <main style={{ background: NAVY, color: "#fff" }}>
        <Header serifClass={serif.className} />
        <section data-tone="dark" className="relative px-6 pb-24 pt-40 md:px-10" style={{ background: NAVY, color: "#fff" }}>
          <div className="mx-auto max-w-4xl">
            <p className={`${serif.className} text-2xl`}>Role not found.</p>
            <a href="/careers" className="mt-4 inline-block text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: GOLD }}>
              ← Back to all roles
            </a>
          </div>
        </section>
        <Footer serifClass={serif.className} />
      </main>
    );
  }

  const tele = Boolean(job.remote || /remote/i.test(job.location || ""));
  const salary = fmtSalary(job);

  // simple "more roles" (same dept first, then others) – server-rendered, no client JS
  const all = getAllJobs().filter((j) => j.slug !== slug);
  const sameDept = all.filter((j) => j.dept && job.dept && j.dept === job.dept);
  const more = (sameDept.length ? sameDept : all).slice(0, 3);

  return (
    <>
      {/* JobPosting structured data – correct place is the detail page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jobJsonLd(job, SITE) }} />

      <main style={{ background: NAVY, color: "#fff" }}>
        <Header serifClass={serif.className} />

        {/* ───────── HERO HEADER (dark) ───────── */}
        <section
          data-tone="dark"
          className="relative overflow-hidden px-6 pb-16 pt-36 md:px-10 lg:px-16"
          style={{ background: `radial-gradient(120% 90% at 50% 0%, #13284f 0%, ${NAVY} 60%)`, color: "#fff" }}
        >
          <Ambient tone="dark" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
              <a href="/" className="hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span>{" "}
              <a href="/careers" className="hover:text-[#bfa15c]">Careers</a> <span style={{ color: GOLD }}>/</span> {job.title}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {job.dept ? <Pill>{job.dept}</Pill> : null}
              {tele ? <Pill>Remote</Pill> : null}
              {job.employmentType ? <Pill>{job.employmentType}</Pill> : null}
              {job.postedAt ? <Pill>Posted {fmtDate(job.postedAt)}</Pill> : null}
            </div>

            <h1 className={`${serif.className} mt-6 max-w-4xl text-[clamp(2.4rem,5.5vw,4.4rem)] font-medium leading-[1.0]`}>
              {job.title}
            </h1>

            <p className="mt-5 max-w-3xl text-sm uppercase tracking-[0.14em] text-white/55">
              {job.location} {job.employmentType ? "· " + job.employmentType : ""}{" "}
              {salary ? "· " + salary : ""}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
                style={{ background: GOLD, color: NAVY }}
              >
                Apply now
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="/careers"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/85 transition-colors hover:text-white"
                style={{ border: `1px solid ${GOLD}55` }}
              >
                Back to all roles
              </a>
            </div>
          </div>
        </section>

        {/* ───────── MAIN CONTENT + STICKY APPLY (dark) ───────── */}
        <section
          data-tone="dark"
          className="relative overflow-hidden px-6 py-20 md:px-10 lg:px-16"
          style={{ background: NAVY, color: "#fff" }}
        >
          <Ambient tone="dark" />
          <div className="relative z-10 mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            {/* Left: details */}
            <div className="lg:col-span-2">
              <JobDetailSections job={job} serifClass={serif.className} />
            </div>

            {/* Right: sticky apply & key facts */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div
                className="rounded-2xl p-6"
                style={{ border: "1px solid rgba(191,161,92,0.28)", background: "rgba(255,255,255,0.03)" }}
              >
                <h2 className={`${serif.className} text-[1.3rem] font-medium text-white`}>Quick facts</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  {job.dept && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-white/45">Department</dt>
                      <dd className="font-medium text-white/80">{job.dept}</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-3">
                    <dt className="text-white/45">Location</dt>
                    <dd className="font-medium text-white/80">{job.location}</dd>
                  </div>
                  {job.employmentType && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-white/45">Type</dt>
                      <dd className="font-medium text-white/80">{job.employmentType}</dd>
                    </div>
                  )}
                  {salary && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-white/45">Comp (est.)</dt>
                      <dd className="font-medium" style={{ color: GOLD }}>{salary}</dd>
                    </div>
                  )}
                  {(job.experienceMin || job.experienceMax) && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-white/45">Experience</dt>
                      <dd className="font-medium text-white/80">
                        {job.experienceMin ?? ""}{job.experienceMax ? `–${job.experienceMax}` : ""} yrs
                      </dd>
                    </div>
                  )}
                  {job.postedAt && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-white/45">Posted</dt>
                      <dd className="font-medium text-white/80">{fmtDate(job.postedAt)}</dd>
                    </div>
                  )}
                  {job.validThrough && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-white/45">Valid through</dt>
                      <dd className="font-medium text-white/80">{fmtDate(job.validThrough)}</dd>
                    </div>
                  )}
                </dl>

                {job.tags?.length ? (
                  <>
                    <h3 className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Tags</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.tags.map((t: string) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-white/70"
                          style={{ border: `1px solid ${GOLD}3a`, background: "rgba(255,255,255,0.03)" }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} aria-hidden />
                          {t}
                        </span>
                      ))}
                    </div>
                  </>
                ) : null}

                <a
                  href="#apply"
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
                  style={{ background: GOLD, color: NAVY }}
                >
                  Apply for this role
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* ───────── MORE ROLES (light) ───────── */}
        {more.length > 0 && (
          <section
            data-tone="light"
            className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
            style={{ background: "#fbfaf7", color: "#0c1f3f" }}
          >
            <Ambient tone="light" />
            <div className="relative z-10 mx-auto max-w-6xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-8" style={{ background: GOLD_DEEP }} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD_DEEP }}>
                  Keep exploring
                </span>
              </div>
              <h2 className={`${serif.className} mt-4 text-[clamp(1.7rem,3.6vw,2.6rem)] font-medium`} style={{ color: "#0c1f3f" }}>
                More roles {job.dept ? `in ${job.dept}` : ""}
              </h2>

              <ul role="list" className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {more.map((j) => (
                  <li key={j.slug} className="h-full">
                    <article
                      className="group flex h-full flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
                      style={{ border: "1px solid rgba(168,125,31,0.2)", background: "#ffffff" }}
                    >
                      <header>
                        <p className="text-xs uppercase tracking-[0.14em]" style={{ color: "rgba(12,31,63,0.45)" }}>
                          {j.dept || "—"} ·{" "}
                          {j.postedAt ? formatDateUSShort(j.postedAt) : "New"}
                        </p>
                        <h3 className={`${serif.className} mt-2 text-[1.3rem] font-medium`} style={{ color: "#0c1f3f" }}>
                          {j.title}
                        </h3>
                        <p className="mt-1 text-sm" style={{ color: "rgba(12,31,63,0.55)" }}>
                          {j.location} {j.employmentType ? `· ${j.employmentType}` : ""}
                        </p>
                      </header>
                      <footer className="mt-6">
                        <Link
                          href={`/careers/${j.slug}`}
                          prefetch={false}
                          className="group/btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
                          style={{ background: GOLD, color: NAVY }}
                          aria-label={`View details for ${j.title}`}
                        >
                          View &amp; Apply
                          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                        </Link>
                      </footer>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ───────── APPLY FORM (dark band, light card) ───────── */}
        <section
          id="apply"
          data-tone="dark"
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
                Apply for <span className="italic" style={{ color: GOLD }}>{job.title}</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
                Share your resume and we&apos;ll get back to you.
              </p>
            </div>
            <div
              className="rounded-2xl border p-7 sm:p-9"
              style={{ borderColor: `${GOLD}40`, background: "#f6f9fd", boxShadow: "0 40px 110px -50px rgba(0,0,0,0.7)" }}
            >
              <h3 className={`${serif.className} text-[1.7rem] font-medium text-[#0c1f3f]`}>Submit your application</h3>
              <p className="mt-1 text-sm text-[#0c1f3f]/55">We&apos;ll review and reach out shortly.</p>
              <div className="mt-6">
                <QuickApplyForm defaultRole={job.title} />
              </div>
            </div>
          </div>
        </section>

        <Footer serifClass={serif.className} />
      </main>
    </>
  );
}
