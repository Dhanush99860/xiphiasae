"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

const SITE_URL = "https://www.xiphiasimmigration.com";
const effectiveDate = "09 Oct 2025";
const company = {
  name: "XIPHIAS Immigration Private Limited",
  city: "Bengaluru",
  state: "Karnataka",
  country: "India",
  privacyEmail: "immigration@xiphias.in",
  grievanceEmail: "immigration@xiphias.in",
  site: SITE_URL,
} as const;

const nav = [
  { id: "overview", label: "Who we are" },
  { id: "collection", label: "What we collect" },
  { id: "cookies", label: "Cookies & tracking" },
  { id: "rights", label: "Your rights" },
  { id: "transfers", label: "International transfers" },
  { id: "security", label: "Security" },
  { id: "children", label: "Children" },
  { id: "updates", label: "Updates" },
  { id: "contact", label: "Contact" },
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

/* ─────────── inline UI primitives (self-contained) ─────────── */
function Eyebrow({ children, ar, tone = "dark" }: { children: React.ReactNode; ar: string; tone?: "dark" | "light" }) {
  const c = tone === "light" ? GOLD_DEEP : GOLD;
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: c }}>
      <span className="h-px w-8" style={{ background: c }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border bg-white p-5 text-[#0c1f3f]/75 transition-colors hover:border-[#bfa15c] ${className}`} style={{ borderColor: `${GOLD}40` }}>
      {children}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium text-[#0c1f3f]/70" style={{ borderColor: `${GOLD}55`, background: "#faf8f2" }}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
      {children}
    </span>
  );
}

function Accordion({ summary, children, defaultOpen }: { summary: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="rounded-2xl border bg-white px-5 py-3.5 text-[#0c1f3f]/75 transition-colors hover:border-[#bfa15c]" style={{ borderColor: `${GOLD}40` }}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="flex w-full cursor-pointer items-center justify-between gap-2 text-left text-sm font-semibold text-[#0c1f3f]">
        <span>{summary}</span>
        <span aria-hidden className="transition-transform" style={{ color: GOLD, transform: open ? "rotate(180deg)" : "none" }}>▾</span>
      </button>
      {open && <div className="mt-3 text-sm">{children}</div>}
    </div>
  );
}

function DLRow({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 border-t py-3 first:border-t-0 md:grid-cols-5" style={{ borderColor: `${GOLD}33` }}>
      <dt className="text-sm font-semibold text-[#0c1f3f] md:col-span-2">{term}</dt>
      <dd className="text-sm text-[#0c1f3f]/70 md:col-span-3">{children}</dd>
    </div>
  );
}

function Section({ id, num, title, children }: { id: string; num: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-32">
      <div className="flex items-baseline gap-4">
        <span aria-hidden className="text-[1.6rem] font-medium tabular-nums" style={{ color: GOLD_DEEP }}>{String(num).padStart(2, "0")}</span>
        <h2 id={`${id}-title`} className="text-xl font-semibold tracking-tight text-[#0c1f3f] md:text-2xl">{title}</h2>
      </div>
      <div className="mt-4 max-w-none leading-relaxed text-[#0c1f3f]/75">{children}</div>
    </section>
  );
}

const mail = (e: string) => (
  <a href={`mailto:${e}`} className="underline decoration-[#a87d1f]/40 underline-offset-2 hover:decoration-[#a87d1f]" style={{ color: GOLD_DEEP }}>{e}</a>
);

/* ─────────── COMMAND INDEX — split / futuristic ─────────── */
export default function LegalIndex({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(nav[0].id);
  const chipsRef = useRef<HTMLDivElement>(null);

  // gold reading-progress spine (gated on reduced motion)
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // scroll-spy for active section
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // keep active chip in view (mobile)
  useEffect(() => {
    const el = chipsRef.current?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
  }, [active, reduce]);

  return (
    <div className="relative bg-[#fbfaf7]">
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-[#bfa15c] focus:px-3 focus:py-2 focus:text-[#0a1733]">
        Skip to content
      </a>

      <Header serifClass={serifClass} />

      {/* mobile sticky progress + chip rail */}
      <div data-tone="light" className="sticky top-0 z-30 border-b bg-[#fbfaf7]/95 backdrop-blur lg:hidden" style={{ borderColor: `${GOLD}33` }}>
        <motion.div className="h-0.5 origin-left" style={{ background: GOLD, scaleX: reduce ? scrollYProgress : fill }} />
        <div ref={chipsRef} className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {nav.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} data-chip={n.id} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors" style={{ borderColor: active === n.id ? GOLD : `${INK}22`, background: active === n.id ? GOLD : "transparent", color: active === n.id ? NAVY : `${INK}aa` }}>
              <span className="tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>{n.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-[300px_1fr]">
        {/* PERSISTENT LEFT RAIL (navy, sticky) */}
        <aside data-tone="dark" className="relative hidden text-[#eef3fb] lg:block" style={{ background: NAVY }}>
          <Ambient tone="dark" />
          <div className="sticky top-0 flex h-screen flex-col px-8 py-12">
            <Eyebrow ar="الخصوصية">Privacy</Eyebrow>
            <p className={`${serifClass} mt-4 text-[2rem] font-medium leading-tight`}>Privacy Policy</p>
            <p className="mt-2 text-[13px] text-white/50">Effective {effectiveDate}</p>

            {/* gold reading-progress spine + index */}
            <nav aria-label="On this page" className="relative mt-10 flex-1 overflow-y-auto pl-6">
              <div className="absolute left-0 top-1 bottom-1 w-px" style={{ background: "rgba(255,255,255,0.14)" }}>
                <motion.div className="absolute left-0 top-0 w-px origin-top" style={{ height: "100%", background: GOLD, scaleY: reduce ? scrollYProgress : fill }} />
              </div>
              <ul className="space-y-1">
                {nav.map((n, i) => {
                  const on = active === n.id;
                  return (
                    <li key={n.id}>
                      <a href={`#${n.id}`} aria-current={on ? "true" : undefined} className="group flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors" style={{ color: on ? GOLD : "rgba(238,243,251,0.6)" }}>
                        <span className="tabular-nums text-[11px]" style={{ color: on ? GOLD : "rgba(238,243,251,0.35)" }}>{String(i + 1).padStart(2, "0")}</span>
                        <span className="group-hover:text-[#bfa15c]">{n.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-8 border-t pt-6 text-[12px] text-white/45" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              {company.name}<br />{company.city}, {company.state}, {company.country}
            </div>
          </div>
        </aside>

        {/* RIGHT PANE (light, airy cards) */}
        <main id="content" data-tone="light" className="relative px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-3xl space-y-14">
            {/* intro */}
            <div className="lg:hidden">
              <Eyebrow ar="الخصوصية" tone="light">Privacy</Eyebrow>
            </div>
            <h1 className={`${serifClass} text-[clamp(2.2rem,5vw,3.4rem)] font-medium leading-[1.05] text-[#0c1f3f]`}>
              Your data, <span className="italic" style={{ color: GOLD_DEEP }}>handled with care.</span>
            </h1>
            <p className="-mt-8 text-[15px] text-[#0c1f3f]/60">
              How {company.name} collects, uses, shares, and protects your personal data — and how to exercise your rights.
            </p>

            <div className="-mt-6 grid gap-3 sm:grid-cols-2">
              <Card>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  <li>What personal data we collect and why.</li>
                  <li>How to control cookies and marketing preferences.</li>
                  <li>Your rights under GDPR / CPRA / DPDP.</li>
                  <li>How to contact us or lodge a complaint.</li>
                </ul>
              </Card>
              <Card>
                <div className="flex flex-wrap gap-2">
                  <Pill>GDPR / UK GDPR</Pill>
                  <Pill>CCPA / CPRA</Pill>
                  <Pill>India DPDP</Pill>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a href="/cookies" className="inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-sm text-[#0c1f3f]/80 transition hover:text-[#a87d1f]" style={{ borderColor: `${GOLD}55` }}>Manage Cookies</a>
                  <a href="/contact" className="inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-sm text-[#0c1f3f]/80 transition hover:text-[#a87d1f]" style={{ borderColor: `${GOLD}55` }}>Do Not Sell/Share</a>
                </div>
                <p className="mt-2 text-xs text-[#0c1f3f]/45">Use these links to change your preferences at any time.</p>
              </Card>
            </div>

            <Section id="overview" num={1} title="Who we are">
              <p>This Privacy Policy explains how we collect, use, disclose, and safeguard personal data when you use our website and services.</p>
              <dl className="mt-6">
                <DLRow term="Controller">{company.name}, {company.city}, {company.state}, {company.country}</DLRow>
                <DLRow term="Data Protection Officer">Not applicable. Contact our Privacy Team at {mail(company.privacyEmail)}.</DLRow>
                <DLRow term="India: Grievance Officer">{mail(company.grievanceEmail)} (we aim to respond within statutory timelines)</DLRow>
              </dl>
            </Section>

            <Section id="collection" num={2} title="What we collect & why we collect it">
              <p className="mb-4">We collect the following categories of data for the purposes described below.</p>
              <div className="overflow-x-auto rounded-2xl border bg-white" style={{ borderColor: `${GOLD}40` }}>
                <table className="w-full min-w-[720px] text-sm">
                  <thead className="text-left">
                    <tr className="text-[#0c1f3f]/45">
                      <th className="p-3 text-xs font-semibold uppercase tracking-wide">Data category</th>
                      <th className="p-3 text-xs font-semibold uppercase tracking-wide">Purpose</th>
                      <th className="p-3 text-xs font-semibold uppercase tracking-wide">Legal basis / CPRA</th>
                      <th className="p-3 text-xs font-semibold uppercase tracking-wide">Retention</th>
                      <th className="p-3 text-xs font-semibold uppercase tracking-wide">Recipients</th>
                    </tr>
                  </thead>
                  <tbody className="align-top text-[#0c1f3f]/70">
                    <tr className="border-t" style={{ borderColor: `${GOLD}33` }}>
                      <td className="p-3 font-medium text-[#0c1f3f]">Account & contact</td>
                      <td className="p-3">Create/manage your account; respond to enquiries.</td>
                      <td className="p-3">Contract; legitimate interests (service operations).</td>
                      <td className="p-3">For as long as you have an account + 24 months.</td>
                      <td className="p-3">Hosting, CRM, support vendors.</td>
                    </tr>
                    <tr className="border-t" style={{ borderColor: `${GOLD}33` }}>
                      <td className="p-3 font-medium text-[#0c1f3f]">Usage & device</td>
                      <td className="p-3">Analytics; improve performance and UX.</td>
                      <td className="p-3">Consent (cookies/SDKs) where required; legitimate interests.</td>
                      <td className="p-3">12–24 months aggregated.</td>
                      <td className="p-3">Analytics providers, A/B testing tools.</td>
                    </tr>
                    <tr className="border-t" style={{ borderColor: `${GOLD}33` }}>
                      <td className="p-3 font-medium text-[#0c1f3f]">Marketing preferences</td>
                      <td className="p-3">Send newsletters and offers; measure effectiveness.</td>
                      <td className="p-3">Consent (opt-in); right to withdraw at any time.</td>
                      <td className="p-3">Until you unsubscribe + 24 months logs.</td>
                      <td className="p-3">Email service providers; advertising partners.</td>
                    </tr>
                    <tr className="border-t" style={{ borderColor: `${GOLD}33` }}>
                      <td className="p-3 font-medium text-[#0c1f3f]">Support & chat transcripts</td>
                      <td className="p-3">Troubleshoot issues; quality assurance.</td>
                      <td className="p-3">Legitimate interests; contract.</td>
                      <td className="p-3">Up to 36 months unless required longer.</td>
                      <td className="p-3">Customer support platforms.</td>
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

            <Section id="cookies" num={3} title="Cookies & tracking">
              <p>We use essential cookies to make the site work and optional cookies/SDKs for analytics and advertising. You can change your preferences any time via <a href="/cookies" className="underline decoration-[#a87d1f]/40 underline-offset-2 hover:decoration-[#a87d1f]" style={{ color: GOLD_DEEP }}>Cookies Policy</a>.</p>
              <ul className="mt-3 list-disc pl-5">
                <li><strong>Essential:</strong> security, load balancing, session management.</li>
                <li><strong>Analytics:</strong> page views, feature usage, performance.</li>
                <li><strong>Advertising:</strong> measurement, frequency capping, personalization.</li>
              </ul>
            </Section>

            <Section id="rights" num={4} title="Your privacy rights">
              <div className="grid gap-4 md:grid-cols-3">
                <Card><h3 className="mb-2 text-sm font-semibold text-[#0c1f3f]">EU/UK (GDPR)</h3><p className="text-sm">Access, rectify, erase, restrict, object, and data portability; lodge a complaint with a supervisory authority.</p></Card>
                <Card><h3 className="mb-2 text-sm font-semibold text-[#0c1f3f]">California (CCPA/CPRA)</h3><p className="text-sm">Right to know/delete/correct, opt-out of sale/share, and limit use of sensitive personal information.</p></Card>
                <Card><h3 className="mb-2 text-sm font-semibold text-[#0c1f3f]">India (DPDP)</h3><p className="text-sm">Withdraw consent, access/correct/erase, grievance redressal; nominate an alternate contact for rights requests.</p></Card>
              </div>
              <p className="mt-4 text-sm">To exercise your rights, email {mail(company.privacyEmail)}. We may request additional information to verify your identity and will respond within applicable timelines.</p>
            </Section>

            <Section id="transfers" num={5} title="International data transfers">
              <p>Where we transfer personal data across borders, we implement safeguards such as Standard Contractual Clauses, adequacy decisions, or other lawful mechanisms. You can request a copy of relevant safeguards by contacting us.</p>
            </Section>

            <Section id="security" num={6} title="How we secure your data">
              <ul className="list-disc pl-5">
                <li>Encryption in transit; restricted access on a need-to-know basis.</li>
                <li>Vendor due diligence and contractual controls.</li>
                <li>Organizational measures: policies, training, and incident response.</li>
              </ul>
              <p className="mt-3 text-sm text-[#0c1f3f]/55">No method of transmission or storage is 100% secure. We will notify users and/or regulators where required by law in the event of a breach.</p>
            </Section>

            <Section id="children" num={7} title="Children’s privacy">
              <p>Our services are not directed to children. If you believe a child provided personal data, contact us so we can take appropriate action. Where parental consent is required, we will not process a child’s data without verifiable consent.</p>
            </Section>

            <Section id="updates" num={8} title="Changes to this policy">
              <p>We may update this policy from time to time. If we make material changes, we will notify you by email and/or a prominent notice on our site. The date at the top indicates when this policy was last updated.</p>
              <div className="mt-4">
                <Card>
                  <h3 className="mb-2 text-sm font-semibold text-[#0c1f3f]">Version history</h3>
                  <ul className="list-disc pl-5 text-sm"><li>v1.0 — 09 Oct 2025: Initial publication.</li></ul>
                </Card>
              </div>
            </Section>

            <Section id="contact" num={9} title="Contact us">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <h3 className="mb-2 text-sm font-semibold text-[#0c1f3f]">General privacy enquiries</h3>
                  <p className="text-sm">Email: {mail(company.privacyEmail)}<br />Address: {company.name}, {company.city}, {company.state}, {company.country}</p>
                </Card>
                <Card>
                  <h3 className="mb-2 text-sm font-semibold text-[#0c1f3f]">India grievance officer</h3>
                  <p className="text-sm">Email: {mail(company.grievanceEmail)}<br />We aim to acknowledge queries promptly and resolve them within statutory timelines.</p>
                </Card>
              </div>
            </Section>

            <p className="border-t pt-6 text-xs text-[#0c1f3f]/45" style={{ borderColor: `${GOLD}33` }}>
              This page is provided for informational purposes and does not constitute legal advice. Consult counsel to tailor it to your operations, vendors, and jurisdictions.
            </p>
          </div>
        </main>
      </div>

      <Footer serifClass={serifClass} />

      {/* JSON-LD (SEO) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }} />
    </div>
  );
}
