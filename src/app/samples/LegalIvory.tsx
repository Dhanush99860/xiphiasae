"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";
const IVORY = "#fbfaf7";
const BAND = "#f7f4ef";

const SITE_URL = "https://www.xiphiasimmigration.com";

const company = {
  name: "XIPHIAS Immigration Private Limited",
  city: "Bengaluru",
  state: "Karnataka",
  country: "India",
  privacyEmail: "immigration@xiphias.in",
  grievanceEmail: "immigration@xiphias.in",
  site: SITE_URL,
} as const;

const effectiveDate = "09 Oct 2025";

const nav = [
  { id: "overview", label: "Summary" },
  { id: "collection", label: "What we collect" },
  { id: "cookies", label: "Cookies & tracking" },
  { id: "rights", label: "Your rights" },
  { id: "transfers", label: "International transfers" },
  { id: "security", label: "Security" },
  { id: "children", label: "Children" },
  { id: "updates", label: "Updates" },
  { id: "contact", label: "Contact" },
];

// ---- inline, self-contained primitives -------------------------------------

function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD_DEEP }}>
      <span className="h-px w-8" style={{ background: GOLD_DEEP }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal" style={{ color: GOLD_DEEP }}>
        {ar}
      </span>
    </p>
  );
}

function Rule() {
  return <hr className="my-12 border-0 h-px" style={{ background: `${GOLD}55` }} />;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: GOLD_DEEP }}>
      {children}
    </p>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: `${GOLD}66`, background: "#fff", color: `${INK}b3` }}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
      {children}
    </span>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white p-5 transition-colors" style={{ borderColor: `${GOLD}55`, color: `${INK}b3` }}>
      {children}
    </div>
  );
}

function DLRow({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 py-3 border-t first:border-t-0" style={{ borderColor: `${GOLD}40` }}>
      <dt className="md:col-span-2 text-sm font-semibold" style={{ color: INK }}>{term}</dt>
      <dd className="md:col-span-3 text-sm" style={{ color: `${INK}b3` }}>{children}</dd>
    </div>
  );
}

function Accordion({ summary, children }: { summary: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border bg-white px-5 py-4" style={{ borderColor: `${GOLD}55`, color: `${INK}b3` }}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full cursor-pointer flex items-center justify-between gap-2 text-left text-sm font-semibold"
        style={{ color: INK }}
      >
        <span>{summary}</span>
        <span aria-hidden className="transition-transform" style={{ color: GOLD_DEEP, transform: open ? "rotate(180deg)" : "none" }}>
          ▾
        </span>
      </button>
      {open && <div className="mt-3 text-sm">{children}</div>}
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      data-tone="light"
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28"
      style={{ background: "transparent" }}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 id={`${id}-title`} className="font-serif text-2xl md:text-[2rem] font-medium tracking-tight mb-4" style={{ color: NAVY }}>
        {title}
      </h2>
      <div className="max-w-none leading-relaxed" style={{ color: `${INK}b3` }}>
        {children}
      </div>
    </motion.section>
  );
}

// ---- TOC with scrollspy ----------------------------------------------------

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive((vis[0].target as HTMLElement).id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

// ---- page ------------------------------------------------------------------

export default function LegalIvory({ serifClass }: { serifClass: string }) {
  const active = useActiveSection(nav.map((n) => n.id));

  const linkCls = "underline underline-offset-2";
  const linkStyle = { color: GOLD_DEEP, textDecorationColor: `${GOLD}80` } as const;

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${company.site}/privacy-policy#webpage`,
    name: "Privacy Policy",
    url: `${company.site}/privacy-policy`,
    dateModified: "2025-10-09",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${company.site}/#website`,
      name: "XIPHIAS Immigration",
      url: company.site,
    },
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${company.site}/` },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${company.site}/privacy-policy` },
    ],
  };

  return (
    <div className="relative" style={{ background: IVORY }}>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:px-3 focus:py-2 focus:text-white"
        style={{ background: NAVY }}
      >
        Skip to content
      </a>

      <Header serifClass={serifClass} />

      {/* Hero — slim navy band behind the header hero area */}
      <header data-tone="dark" className="relative isolate px-6 pb-16 pt-32 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: `radial-gradient(120% 90% at 15% 0%, #13284f 0%, ${NAVY} 60%)` }}>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}>
            <a href="/" className="hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> Privacy Policy
          </p>
          <p className="mt-7">
            <span className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
              <span className="h-px w-8" style={{ background: GOLD }} />
              Privacy
              <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">الخصوصية</span>
            </span>
          </p>
          <h1 className={`${serifClass} mt-5 text-[clamp(2.6rem,5.5vw,4.4rem)] font-medium leading-[1.0]`}>
            Privacy <span className="italic" style={{ color: GOLD }}>Policy.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
            How {company.name} collects, uses, shares, and protects your personal data — and how to exercise your privacy rights.
          </p>
          <p className="mt-4 text-sm text-white/55">Effective: {effectiveDate}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-3xl">
            <div className="rounded-2xl border p-5" style={{ borderColor: `${GOLD}40`, background: "rgba(255,255,255,0.04)" }}>
              <ul className="text-sm list-disc pl-5 space-y-1 text-white/75">
                <li>What personal data we collect and why.</li>
                <li>How to control cookies and marketing preferences.</li>
                <li>Your rights under GDPR / CPRA / DPDP.</li>
                <li>How to contact us or lodge a complaint.</li>
              </ul>
            </div>
            <div className="rounded-2xl border p-5" style={{ borderColor: `${GOLD}40`, background: "rgba(255,255,255,0.04)" }}>
              <div className="flex flex-wrap gap-2">
                {["GDPR / UK GDPR", "CCPA / CPRA", "India DPDP"].map((p) => (
                  <span key={p} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-white/80" style={{ borderColor: `${GOLD}66` }}>
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                    {p}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href="/cookies" className="inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-sm text-white/80 transition" style={{ borderColor: `${GOLD}55` }}>
                  Manage Cookies
                </a>
                <a href="/contact" className="inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-sm text-white/80 transition" style={{ borderColor: `${GOLD}55` }}>
                  Do Not Sell/Share
                </a>
              </div>
              <p className="mt-2 text-xs text-white/45">Use these links to change your preferences at any time.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile inline TOC */}
      <nav aria-label="On this page" data-tone="light" className="lg:hidden px-6 pt-8 sm:px-12" style={{ background: IVORY }}>
        <div className="mx-auto max-w-6xl rounded-2xl border bg-white p-4" style={{ borderColor: `${GOLD}55` }}>
          <Label>On this page</Label>
          <div className="flex flex-wrap gap-2">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="inline-flex items-center rounded-md border px-2 py-1 text-xs" style={{ borderColor: `${GOLD}55`, color: `${INK}99` }}>
                {n.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Body */}
      <div id="content" data-tone="light" className="relative isolate px-6 py-14 sm:px-12 lg:px-20" style={{ background: IVORY }}>
        <Ambient tone="light" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[1fr_15rem] gap-12">
          <article className="max-w-3xl">
            <Section id="overview" title="Who we are">
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard personal data when you use our website and services.
              </p>
              <dl className="mt-6">
                <DLRow term="Controller">
                  {company.name}, {company.city}, {company.state}, {company.country}
                </DLRow>
                <DLRow term="Data Protection Officer">
                  Not applicable. Contact our Privacy Team at{" "}
                  <a className={linkCls} style={linkStyle} href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</a>.
                </DLRow>
                <DLRow term="India: Grievance Officer">
                  <a className={linkCls} style={linkStyle} href={`mailto:${company.grievanceEmail}`}>{company.grievanceEmail}</a>{" "}
                  (we aim to respond within statutory timelines)
                </DLRow>
              </dl>
            </Section>

            <Rule />

            <Section id="collection" title="What we collect & why we collect it">
              <p className="mb-4">We collect the following categories of data for the purposes described below.</p>
              <div className="overflow-x-auto rounded-2xl border bg-white" style={{ borderColor: `${GOLD}55` }}>
                <table className="min-w-[720px] w-full text-sm">
                  <thead className="text-left">
                    <tr style={{ color: `${INK}80` }}>
                      <th className="p-3 font-semibold uppercase tracking-wide text-xs">Data category</th>
                      <th className="p-3 font-semibold uppercase tracking-wide text-xs">Purpose</th>
                      <th className="p-3 font-semibold uppercase tracking-wide text-xs">Legal basis / CPRA</th>
                      <th className="p-3 font-semibold uppercase tracking-wide text-xs">Retention</th>
                      <th className="p-3 font-semibold uppercase tracking-wide text-xs">Recipients</th>
                    </tr>
                  </thead>
                  <tbody className="align-top" style={{ color: `${INK}b3` }}>
                    {[
                      ["Account & contact", "Create/manage your account; respond to enquiries.", "Contract; legitimate interests (service operations).", "For as long as you have an account + 24 months.", "Hosting, CRM, support vendors."],
                      ["Usage & device", "Analytics; improve performance and UX.", "Consent (cookies/SDKs) where required; legitimate interests.", "12–24 months aggregated.", "Analytics providers, A/B testing tools."],
                      ["Marketing preferences", "Send newsletters and offers; measure effectiveness.", "Consent (opt-in); right to withdraw at any time.", "Until you unsubscribe + 24 months logs.", "Email service providers; advertising partners."],
                      ["Support & chat transcripts", "Troubleshoot issues; quality assurance.", "Legitimate interests; contract.", "Up to 36 months unless required longer.", "Customer support platforms."],
                    ].map((row, i) => (
                      <tr key={row[0]} className="border-t" style={{ borderColor: `${GOLD}33`, background: i % 2 === 1 ? BAND : "transparent" }}>
                        <td className="p-3 font-medium" style={{ color: INK }}>{row[0]}</td>
                        <td className="p-3">{row[1]}</td>
                        <td className="p-3">{row[2]}</td>
                        <td className="p-3">{row[3]}</td>
                        <td className="p-3">{row[4]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 grid gap-3">
                <Accordion summary="Sensitive personal information (SPI) handling">
                  <p>
                    We do not intentionally collect SPI (e.g., government IDs) unless you provide it for compliance. Where collected, we restrict use, apply additional safeguards, and honor applicable rights to limit use of SPI.
                  </p>
                </Accordion>
                <Accordion summary="International disclosures">
                  <p>
                    If we transfer data outside your jurisdiction, we use appropriate safeguards such as Standard Contractual Clauses or equivalent mechanisms.
                  </p>
                </Accordion>
              </div>
            </Section>

            <Rule />

            <Section id="cookies" title="Cookies & tracking">
              <p>
                We use essential cookies to make the site work and optional cookies/SDKs for analytics and advertising. You can change your preferences any time via{" "}
                <a href="/cookies" className={linkCls} style={linkStyle}>Cookies Policy</a>.
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li><strong style={{ color: INK }}>Essential:</strong> security, load balancing, session management.</li>
                <li><strong style={{ color: INK }}>Analytics:</strong> page views, feature usage, performance.</li>
                <li><strong style={{ color: INK }}>Advertising:</strong> measurement, frequency capping, personalization.</li>
              </ul>
            </Section>

            <Rule />

            <Section id="rights" title="Your privacy rights">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: INK }}>EU/UK (GDPR)</h3>
                  <p className="text-sm">Access, rectify, erase, restrict, object, and data portability; lodge a complaint with a supervisory authority.</p>
                </Card>
                <Card>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: INK }}>California (CCPA/CPRA)</h3>
                  <p className="text-sm">Right to know/delete/correct, opt-out of sale/share, and limit use of sensitive personal information.</p>
                </Card>
                <Card>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: INK }}>India (DPDP)</h3>
                  <p className="text-sm">Withdraw consent, access/correct/erase, grievance redressal; nominate an alternate contact for rights requests.</p>
                </Card>
              </div>
              <p className="text-sm mt-4">
                To exercise your rights, email{" "}
                <a href={`mailto:${company.privacyEmail}`} className={linkCls} style={linkStyle}>{company.privacyEmail}</a>. We may request additional information to verify your identity and will respond within applicable timelines.
              </p>
            </Section>

            <Rule />

            <Section id="transfers" title="International data transfers">
              <p>
                Where we transfer personal data across borders, we implement safeguards such as Standard Contractual Clauses, adequacy decisions, or other lawful mechanisms. You can request a copy of relevant safeguards by contacting us.
              </p>
            </Section>

            <Rule />

            <Section id="security" title="How we secure your data">
              <ul className="list-disc pl-5 space-y-1">
                <li>Encryption in transit; restricted access on a need-to-know basis.</li>
                <li>Vendor due diligence and contractual controls.</li>
                <li>Organizational measures: policies, training, and incident response.</li>
              </ul>
              <p className="mt-3 text-sm" style={{ color: `${INK}80` }}>
                No method of transmission or storage is 100% secure. We will notify users and/or regulators where required by law in the event of a breach.
              </p>
            </Section>

            <Rule />

            <Section id="children" title="Children&rsquo;s privacy">
              <p>
                Our services are not directed to children. If you believe a child provided personal data, contact us so we can take appropriate action. Where parental consent is required, we will not process a child&rsquo;s data without verifiable consent.
              </p>
            </Section>

            <Rule />

            <Section id="updates" title="Changes to this policy">
              <p>
                We may update this policy from time to time. If we make material changes, we will notify you by email and/or a prominent notice on our site. The date at the top indicates when this policy was last updated.
              </p>
              <div className="mt-4">
                <Card>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: INK }}>Version history</h3>
                  <ul className="text-sm list-disc pl-5">
                    <li>v1.0 — 09 Oct 2025: Initial publication.</li>
                  </ul>
                </Card>
              </div>
            </Section>

            <Rule />

            <Section id="contact" title="Contact us">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: INK }}>General privacy enquiries</h3>
                  <p className="text-sm">
                    Email: <a href={`mailto:${company.privacyEmail}`} className={linkCls} style={linkStyle}>{company.privacyEmail}</a>
                    <br />
                    Address: {company.name}, {company.city}, {company.state}, {company.country}
                  </p>
                </Card>
                <Card>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: INK }}>India grievance officer</h3>
                  <p className="text-sm">
                    Email: <a href={`mailto:${company.grievanceEmail}`} className={linkCls} style={linkStyle}>{company.grievanceEmail}</a>
                    <br />
                    We aim to acknowledge queries promptly and resolve them within statutory timelines.
                  </p>
                </Card>
              </div>
            </Section>

            <div className="pt-10 text-xs" style={{ color: `${INK}80` }}>
              <p>
                This page is provided for informational purposes and does not constitute legal advice. Consult counsel to tailor it to your operations, vendors, and jurisdictions.
              </p>
            </div>
          </article>

          {/* Sticky right-rail TOC (desktop) */}
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28">
              <Label>On this page</Label>
              <ul className="space-y-1 border-l" style={{ borderColor: `${GOLD}40` }}>
                {nav.map((n) => {
                  const isActive = active === n.id;
                  return (
                    <li key={n.id}>
                      <a
                        href={`#${n.id}`}
                        aria-current={isActive ? "true" : undefined}
                        className="block py-1.5 pl-4 -ml-px border-l text-sm transition-colors"
                        style={{
                          borderColor: isActive ? GOLD_DEEP : "transparent",
                          color: isActive ? GOLD_DEEP : `${INK}80`,
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {n.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      </div>

      <Footer serifClass={serifClass} />

      {/* JSON-LD (SEO) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />
    </div>
  );
}
