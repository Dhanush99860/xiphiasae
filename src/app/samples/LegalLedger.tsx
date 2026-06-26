"use client";

// VARIANT ① "Obsidian Ledger" — DARK navy/gold legal reskin of the Privacy Policy.
// Self-contained: eyebrow / cards / accordions / TOC built inline. Reuses Header / Footer / Ambient chrome.

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const HERO_BG = "radial-gradient(120% 90% at 15% 0%, #13284f 0%, #0a1733 60%)";
const TEXT = "rgba(238,243,251,0.78)";
const HEAD = "#eef3fb";
const GLASS = "linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0))";
const GLASS_BORDER = "rgba(191,161,92,0.22)";

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

const NAV = [
  { id: "overview", label: "Who we are", num: "01" },
  { id: "collection", label: "What we collect", num: "02" },
  { id: "cookies", label: "Cookies & tracking", num: "03" },
  { id: "rights", label: "Your rights", num: "04" },
  { id: "transfers", label: "International transfers", num: "05" },
  { id: "security", label: "Security", num: "06" },
  { id: "children", label: "Children", num: "07" },
  { id: "updates", label: "Updates", num: "08" },
  { id: "contact", label: "Contact", num: "09" },
];

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

const linkCls = "underline underline-offset-2 hover:opacity-80 transition";
const goldLink = { color: GOLD };

/* ----------------------------- inline primitives ----------------------------- */

function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span aria-hidden className="h-px w-8" style={{ background: GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
        {ar}
      </span>
    </p>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg border p-5 transition-colors hover:border-[#bfa15c]/45 ${className}`}
      style={{ borderColor: GLASS_BORDER, background: GLASS, color: TEXT }}
    >
      {children}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium"
      style={{ borderColor: GLASS_BORDER, background: "rgba(255,255,255,0.04)", color: TEXT }}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
      {children}
    </span>
  );
}

function DLRow({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 border-t py-3 first:border-t-0 md:grid-cols-5" style={{ borderColor: GLASS_BORDER }}>
      <dt className="text-sm font-semibold md:col-span-2" style={{ color: HEAD }}>{term}</dt>
      <dd className="text-sm md:col-span-3" style={{ color: TEXT }}>{children}</dd>
    </div>
  );
}

function Accordion({ summary, children }: { summary: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border" style={{ borderColor: GLASS_BORDER, background: GLASS }}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold"
        style={{ color: HEAD }}
      >
        <span>{summary}</span>
        <span aria-hidden className="transition-transform duration-300" style={{ color: GOLD, transform: open ? "rotate(180deg)" : "none" }}>▾</span>
      </button>
      {open && <div className="px-4 pb-4 text-sm" style={{ color: TEXT }}>{children}</div>}
    </div>
  );
}

function Section({ id, num, title, children, reduce }: { id: string; num: string; title: string; children: React.ReactNode; reduce: boolean }) {
  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28"
      style={{ background: "transparent" }}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-baseline gap-4">
        <span aria-hidden className="font-serif text-[2rem] font-medium leading-none" style={{ color: GOLD, fontFamily: "var(--font-cormorant, serif)" }}>{num}</span>
        <h2 id={`${id}-title`} className="text-xl font-medium tracking-tight md:text-2xl" style={{ color: HEAD, fontFamily: "var(--font-cormorant, serif)" }}>
          {title}
        </h2>
      </div>
      <div className="mt-4 max-w-none leading-relaxed" style={{ color: TEXT }}>{children}</div>
    </motion.section>
  );
}

/* --------------------------------- page --------------------------------- */

export default function LegalLedger({ serifClass }: { serifClass: string }) {
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(NAV[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const thRow = "p-3 text-left font-semibold uppercase tracking-wide text-[11px]";
  const td = "p-3";

  return (
    <div className="relative">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:px-3 focus:py-2"
        style={{ background: GOLD, color: NAVY }}
      >
        Skip to content
      </a>

      <Header serifClass={serifClass} />

      <main data-tone="dark" className="relative isolate" style={{ background: HERO_BG, color: TEXT }}>
        <Ambient tone="dark" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: GOLD, opacity: 0.55 }} />

        {/* Hero */}
        <header className="px-6 pb-10 pt-32 sm:px-12 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}>
              <a href="/" className="hover:opacity-80">Home</a> <span style={{ color: GOLD }}>/</span> Privacy Policy
            </p>
            <div className="mt-7"><Eyebrow ar="الخصوصية">Privacy</Eyebrow></div>
            <h1 className={`${serifClass} mt-5 text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.0]`} style={{ color: HEAD }}>
              Privacy Policy
            </h1>
            <p className="mt-5 text-sm" style={{ color: "rgba(238,243,251,0.55)" }}>Effective: {effectiveDate}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <GlassCard>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  <li>What personal data we collect and why.</li>
                  <li>How to control cookies and marketing preferences.</li>
                  <li>Your rights under GDPR / CPRA / DPDP.</li>
                  <li>How to contact us or lodge a complaint.</li>
                </ul>
              </GlassCard>
              <GlassCard>
                <div className="flex flex-wrap gap-2">
                  <Pill>GDPR / UK GDPR</Pill>
                  <Pill>CCPA / CPRA</Pill>
                  <Pill>India DPDP</Pill>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a href="/cookies" className="inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-sm transition hover:opacity-80" style={{ borderColor: GLASS_BORDER, color: TEXT }}>Manage Cookies</a>
                  <a href="/contact" className="inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-sm transition hover:opacity-80" style={{ borderColor: GLASS_BORDER, color: TEXT }}>Do Not Sell/Share</a>
                </div>
                <p className="mt-2 text-xs" style={{ color: "rgba(238,243,251,0.45)" }}>Use these links to change your preferences at any time.</p>
              </GlassCard>
            </div>
          </div>
        </header>

        {/* Body + sticky right-rail TOC */}
        <div id="content" className="px-6 pb-20 sm:px-12 lg:px-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-12 lg:col-span-9">
              {/* Mobile / inline TOC */}
              <nav aria-label="On this page" className="lg:hidden rounded-lg border p-4" style={{ borderColor: GLASS_BORDER, background: GLASS }}>
                <p className="mb-2 text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.45)" }}>On this page</p>
                <div className="flex flex-wrap gap-2">
                  {NAV.map((n) => (
                    <a key={n.id} href={`#${n.id}`} className="inline-flex items-center rounded-md border px-2 py-1 text-xs transition hover:opacity-80" style={{ borderColor: GLASS_BORDER, color: TEXT }}>
                      {n.label}
                    </a>
                  ))}
                </div>
              </nav>

              <Section id="overview" num="01" title="Who we are" reduce={reduce}>
                <p>This Privacy Policy explains how we collect, use, disclose, and safeguard personal data when you use our website and services.</p>
                <dl className="mt-6">
                  <DLRow term="Controller">{company.name}, {company.city}, {company.state}, {company.country}</DLRow>
                  <DLRow term="Data Protection Officer">
                    Not applicable. Contact our Privacy Team at{" "}
                    <a className={linkCls} style={goldLink} href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</a>.
                  </DLRow>
                  <DLRow term="India: Grievance Officer">
                    <a className={linkCls} style={goldLink} href={`mailto:${company.grievanceEmail}`}>{company.grievanceEmail}</a>{" "}
                    (we aim to respond within statutory timelines)
                  </DLRow>
                </dl>
              </Section>

              <Section id="collection" num="02" title="What we collect & why we collect it" reduce={reduce}>
                <p className="mb-4">We collect the following categories of data for the purposes described below.</p>
                <div className="overflow-x-auto rounded-lg border" style={{ borderColor: GLASS_BORDER, background: GLASS }}>
                  <table className="w-full min-w-[720px] text-sm">
                    <thead>
                      <tr style={{ color: GOLD, borderBottom: `1px solid ${GOLD}` }}>
                        <th className={thRow}>Data category</th>
                        <th className={thRow}>Purpose</th>
                        <th className={thRow}>Legal basis / CPRA</th>
                        <th className={thRow}>Retention</th>
                        <th className={thRow}>Recipients</th>
                      </tr>
                    </thead>
                    <tbody className="align-top" style={{ color: TEXT }}>
                      <tr className="border-t" style={{ borderColor: GLASS_BORDER }}>
                        <td className={`${td} font-medium`} style={{ color: HEAD }}>Account &amp; contact</td>
                        <td className={td}>Create/manage your account; respond to enquiries.</td>
                        <td className={td}>Contract; legitimate interests (service operations).</td>
                        <td className={td}>For as long as you have an account + 24 months.</td>
                        <td className={td}>Hosting, CRM, support vendors.</td>
                      </tr>
                      <tr className="border-t" style={{ borderColor: GLASS_BORDER }}>
                        <td className={`${td} font-medium`} style={{ color: HEAD }}>Usage &amp; device</td>
                        <td className={td}>Analytics; improve performance and UX.</td>
                        <td className={td}>Consent (cookies/SDKs) where required; legitimate interests.</td>
                        <td className={td}>12–24 months aggregated.</td>
                        <td className={td}>Analytics providers, A/B testing tools.</td>
                      </tr>
                      <tr className="border-t" style={{ borderColor: GLASS_BORDER }}>
                        <td className={`${td} font-medium`} style={{ color: HEAD }}>Marketing preferences</td>
                        <td className={td}>Send newsletters and offers; measure effectiveness.</td>
                        <td className={td}>Consent (opt-in); right to withdraw at any time.</td>
                        <td className={td}>Until you unsubscribe + 24 months logs.</td>
                        <td className={td}>Email service providers; advertising partners.</td>
                      </tr>
                      <tr className="border-t" style={{ borderColor: GLASS_BORDER }}>
                        <td className={`${td} font-medium`} style={{ color: HEAD }}>Support &amp; chat transcripts</td>
                        <td className={td}>Troubleshoot issues; quality assurance.</td>
                        <td className={td}>Legitimate interests; contract.</td>
                        <td className={td}>Up to 36 months unless required longer.</td>
                        <td className={td}>Customer support platforms.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 grid gap-3">
                  <Accordion summary="Sensitive personal information (SPI) handling">
                    <p>We do not intentionally collect SPI (e.g., government IDs) unless you provide it for compliance. Where collected, we restrict use, apply additional safeguards, and honor applicable rights to limit use of SPI.</p>
                  </Accordion>
                  <Accordion summary="International disclosures">
                    <p>If we transfer data outside your jurisdiction, we use appropriate safeguards such as Standard Contractual Clauses or equivalent mechanisms.</p>
                  </Accordion>
                </div>
              </Section>

              <Section id="cookies" num="03" title="Cookies & tracking" reduce={reduce}>
                <p>
                  We use essential cookies to make the site work and optional cookies/SDKs for analytics and advertising. You can change your preferences any time via{" "}
                  <a href="/cookies" className={linkCls} style={goldLink}>Cookies Policy</a>.
                </p>
                <ul className="mt-3 list-disc pl-5">
                  <li><strong style={{ color: HEAD }}>Essential:</strong> security, load balancing, session management.</li>
                  <li><strong style={{ color: HEAD }}>Analytics:</strong> page views, feature usage, performance.</li>
                  <li><strong style={{ color: HEAD }}>Advertising:</strong> measurement, frequency capping, personalization.</li>
                </ul>
              </Section>

              <Section id="rights" num="04" title="Your privacy rights" reduce={reduce}>
                <div className="grid gap-4 md:grid-cols-3">
                  <GlassCard>
                    <h3 className="mb-2 text-sm font-semibold" style={{ color: HEAD }}>EU/UK (GDPR)</h3>
                    <p className="text-sm">Access, rectify, erase, restrict, object, and data portability; lodge a complaint with a supervisory authority.</p>
                  </GlassCard>
                  <GlassCard>
                    <h3 className="mb-2 text-sm font-semibold" style={{ color: HEAD }}>California (CCPA/CPRA)</h3>
                    <p className="text-sm">Right to know/delete/correct, opt-out of sale/share, and limit use of sensitive personal information.</p>
                  </GlassCard>
                  <GlassCard>
                    <h3 className="mb-2 text-sm font-semibold" style={{ color: HEAD }}>India (DPDP)</h3>
                    <p className="text-sm">Withdraw consent, access/correct/erase, grievance redressal; nominate an alternate contact for rights requests.</p>
                  </GlassCard>
                </div>
                <p className="mt-4 text-sm">
                  To exercise your rights, email{" "}
                  <a href={`mailto:${company.privacyEmail}`} className={linkCls} style={goldLink}>{company.privacyEmail}</a>. We may request additional information to verify your identity and will respond within applicable timelines.
                </p>
              </Section>

              <Section id="transfers" num="05" title="International data transfers" reduce={reduce}>
                <p>Where we transfer personal data across borders, we implement safeguards such as Standard Contractual Clauses, adequacy decisions, or other lawful mechanisms. You can request a copy of relevant safeguards by contacting us.</p>
              </Section>

              <Section id="security" num="06" title="How we secure your data" reduce={reduce}>
                <ul className="list-disc pl-5">
                  <li>Encryption in transit; restricted access on a need-to-know basis.</li>
                  <li>Vendor due diligence and contractual controls.</li>
                  <li>Organizational measures: policies, training, and incident response.</li>
                </ul>
                <p className="mt-3 text-sm" style={{ color: "rgba(238,243,251,0.55)" }}>No method of transmission or storage is 100% secure. We will notify users and/or regulators where required by law in the event of a breach.</p>
              </Section>

              <Section id="children" num="07" title="Children’s privacy" reduce={reduce}>
                <p>Our services are not directed to children. If you believe a child provided personal data, contact us so we can take appropriate action. Where parental consent is required, we will not process a child’s data without verifiable consent.</p>
              </Section>

              <Section id="updates" num="08" title="Changes to this policy" reduce={reduce}>
                <p>We may update this policy from time to time. If we make material changes, we will notify you by email and/or a prominent notice on our site. The date at the top indicates when this policy was last updated.</p>
                <div className="mt-4">
                  <GlassCard>
                    <h3 className="mb-2 text-sm font-semibold" style={{ color: HEAD }}>Version history</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>v1.0 — 09 Oct 2025: Initial publication.</li>
                    </ul>
                  </GlassCard>
                </div>
              </Section>

              <Section id="contact" num="09" title="Contact us" reduce={reduce}>
                <div className="grid gap-4 md:grid-cols-2">
                  <GlassCard>
                    <h3 className="mb-2 text-sm font-semibold" style={{ color: HEAD }}>General privacy enquiries</h3>
                    <p className="text-sm">
                      Email:{" "}
                      <a href={`mailto:${company.privacyEmail}`} className={linkCls} style={goldLink}>{company.privacyEmail}</a>
                      <br />
                      Address: {company.name}, {company.city}, {company.state}, {company.country}
                    </p>
                  </GlassCard>
                  <GlassCard>
                    <h3 className="mb-2 text-sm font-semibold" style={{ color: HEAD }}>India grievance officer</h3>
                    <p className="text-sm">
                      Email:{" "}
                      <a href={`mailto:${company.grievanceEmail}`} className={linkCls} style={goldLink}>{company.grievanceEmail}</a>
                      <br />
                      We aim to acknowledge queries promptly and resolve them within statutory timelines.
                    </p>
                  </GlassCard>
                </div>
              </Section>

              <div className="pt-4 text-xs" style={{ color: "rgba(238,243,251,0.45)" }}>
                <p>This page is provided for informational purposes and does not constitute legal advice. Consult counsel to tailor it to your operations, vendors, and jurisdictions.</p>
              </div>
            </div>

            {/* Sticky right-rail TOC (desktop) */}
            <aside className="hidden lg:col-span-3 lg:block">
              <nav aria-label="On this page" className="sticky top-28">
                <p className="mb-3 text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.45)" }}>On this page</p>
                <ul className="space-y-1">
                  {NAV.map((n) => {
                    const isActive = active === n.id;
                    return (
                      <li key={n.id}>
                        <a
                          href={`#${n.id}`}
                          aria-current={isActive ? "true" : undefined}
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition"
                          style={{ color: isActive ? HEAD : "rgba(238,243,251,0.6)" }}
                        >
                          <span
                            aria-hidden
                            className="h-1.5 w-1.5 shrink-0 rounded-full transition"
                            style={{ background: isActive ? GOLD : "transparent", boxShadow: isActive ? `0 0 0 1px ${GOLD}` : `inset 0 0 0 1px ${GLASS_BORDER}` }}
                          />
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
      </main>

      <Footer serifClass={serifClass} />

      {/* JSON-LD (SEO) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }} />
    </div>
  );
}
