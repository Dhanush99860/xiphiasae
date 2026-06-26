// FILE: src/app/(site)/privacy-policy/page.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import {
  LedgerShell,
  Section,
  GlassCard,
  Pill,
  DLRow,
  Accordion,
  LedgerTable,
  GoldLink,
  GhostLink,
  LEDGER,
  type TocItem,
} from "@/components/Legal/LedgerLegal";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// ✅ Keep one canonical domain everywhere (matches your layout.tsx metadataBase)
const SITE_URL = "https://www.xiphiasimmigration.com";

// ---------------- SEO METADATA ----------------
export const metadata: Metadata = {
  title: "Privacy Policy · XIPHIAS Immigration Private Limited",
  description:
    "How XIPHIAS Immigration Private Limited collects, uses, shares, and protects your personal data — and how to exercise your privacy rights.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },

  openGraph: {
    title: "Privacy Policy · XIPHIAS Immigration Private Limited",
    description:
      "How we collect, use, share, and protect your personal data — and how to exercise your privacy rights.",
    url: `${SITE_URL}/privacy-policy`,
    siteName: "XIPHIAS Immigration",
    type: "website",
    images: [
      {
        url: "/xiphias-immigration.png",
        width: 1200,
        height: 630,
        alt: "XIPHIAS Immigration",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy · XIPHIAS Immigration Private Limited",
    description:
      "How we collect, use, share, and protect your personal data — and how to exercise your privacy rights.",
    images: ["/xiphias-immigration.png"],
  },
};

// --------------- PAGE ---------------
export default function PrivacyPolicyPage() {
  const effectiveDate = "09 Oct 2025"; // keep updated as you version
  const company = {
    name: "XIPHIAS Immigration Private Limited",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    privacyEmail: "immigration@xiphias.in",
    grievanceEmail: "immigration@xiphias.in",
    site: SITE_URL,
  } as const;

  const nav: TocItem[] = [
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

  // JSON-LD blocks (SEO)
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Privacy Policy",
        item: `${company.site}/privacy-policy`,
      },
    ],
  };

  const heroExtra = (
    <div className="grid gap-4 sm:grid-cols-2">
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
          <GhostLink href="/cookies">Manage Cookies</GhostLink>
          <GhostLink href="/contact">Do Not Sell/Share</GhostLink>
        </div>
        <p className="mt-2 text-xs" style={{ color: LEDGER.FAINT }}>
          Use these links to change your preferences at any time.
        </p>
      </GlassCard>
    </div>
  );

  return (
    <>
      <LedgerShell
        serifClass={serif.className}
        crumb="Privacy Policy"
        eyebrow="Privacy"
        eyebrowAr="الخصوصية"
        title="Privacy Policy"
        effectiveDate={effectiveDate}
        heroExtra={heroExtra}
        nav={nav}
      >
        <Section id="overview" num="01" title="Who we are">
          <p>
            This Privacy Policy explains how we collect, use, disclose, and safeguard personal data
            when you use our website and services.
          </p>

          <dl className="mt-6">
            <DLRow term="Controller">
              {company.name}, {company.city}, {company.state}, {company.country}
            </DLRow>
            <DLRow term="Data Protection Officer">
              Not applicable. Contact our Privacy Team at{" "}
              <GoldLink href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</GoldLink>.
            </DLRow>
            <DLRow term="India: Grievance Officer">
              <GoldLink href={`mailto:${company.grievanceEmail}`}>{company.grievanceEmail}</GoldLink>{" "}
              (we aim to respond within statutory timelines)
            </DLRow>
          </dl>
        </Section>

        <Section id="collection" num="02" title="What we collect & why we collect it">
          <p className="mb-4">
            We collect the following categories of data for the purposes described below.
          </p>

          <LedgerTable
            head={["Data category", "Purpose", "Legal basis / CPRA", "Retention", "Recipients"]}
            rows={[
              [
                "Account & contact",
                "Create/manage your account; respond to enquiries.",
                "Contract; legitimate interests (service operations).",
                "For as long as you have an account + 24 months.",
                "Hosting, CRM, support vendors.",
              ],
              [
                "Usage & device",
                "Analytics; improve performance and UX.",
                "Consent (cookies/SDKs) where required; legitimate interests.",
                "12–24 months aggregated.",
                "Analytics providers, A/B testing tools.",
              ],
              [
                "Marketing preferences",
                "Send newsletters and offers; measure effectiveness.",
                "Consent (opt-in); right to withdraw at any time.",
                "Until you unsubscribe + 24 months logs.",
                "Email service providers; advertising partners.",
              ],
              [
                "Support & chat transcripts",
                "Troubleshoot issues; quality assurance.",
                "Legitimate interests; contract.",
                "Up to 36 months unless required longer.",
                "Customer support platforms.",
              ],
            ]}
          />

          <div className="mt-6 grid gap-3">
            <Accordion summary="Sensitive personal information (SPI) handling">
              <p>
                We do not intentionally collect SPI (e.g., government IDs) unless you provide it
                for compliance. Where collected, we restrict use, apply additional safeguards,
                and honor applicable rights to limit use of SPI.
              </p>
            </Accordion>

            <Accordion summary="International disclosures">
              <p>
                If we transfer data outside your jurisdiction, we use appropriate safeguards such
                as Standard Contractual Clauses or equivalent mechanisms.
              </p>
            </Accordion>
          </div>
        </Section>

        <Section id="cookies" num="03" title="Cookies & tracking">
          <p>
            We use essential cookies to make the site work and optional cookies/SDKs for analytics
            and advertising. You can change your preferences any time via{" "}
            <GoldLink href="/cookies">Cookies Policy</GoldLink>.
          </p>
          <ul className="list-disc pl-5 mt-3">
            <li>
              <strong style={{ color: LEDGER.HEAD }}>Essential:</strong> security, load balancing, session management.
            </li>
            <li>
              <strong style={{ color: LEDGER.HEAD }}>Analytics:</strong> page views, feature usage, performance.
            </li>
            <li>
              <strong style={{ color: LEDGER.HEAD }}>Advertising:</strong> measurement, frequency capping, personalization.
            </li>
          </ul>
        </Section>

        <Section id="rights" num="04" title="Your privacy rights">
          <div className="grid md:grid-cols-3 gap-4">
            <GlassCard>
              <h3 className="text-sm font-semibold mb-2" style={{ color: LEDGER.HEAD }}>EU/UK (GDPR)</h3>
              <p className="text-sm">
                Access, rectify, erase, restrict, object, and data portability; lodge a complaint
                with a supervisory authority.
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="text-sm font-semibold mb-2" style={{ color: LEDGER.HEAD }}>California (CCPA/CPRA)</h3>
              <p className="text-sm">
                Right to know/delete/correct, opt-out of sale/share, and limit use of sensitive
                personal information.
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="text-sm font-semibold mb-2" style={{ color: LEDGER.HEAD }}>India (DPDP)</h3>
              <p className="text-sm">
                Withdraw consent, access/correct/erase, grievance redressal; nominate an alternate
                contact for rights requests.
              </p>
            </GlassCard>
          </div>
          <p className="text-sm mt-4">
            To exercise your rights, email{" "}
            <GoldLink href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</GoldLink>
            . We may request additional information to verify your identity and will respond
            within applicable timelines.
          </p>
        </Section>

        <Section id="transfers" num="05" title="International data transfers">
          <p>
            Where we transfer personal data across borders, we implement safeguards such as
            Standard Contractual Clauses, adequacy decisions, or other lawful mechanisms. You can
            request a copy of relevant safeguards by contacting us.
          </p>
        </Section>

        <Section id="security" num="06" title="How we secure your data">
          <ul className="list-disc pl-5">
            <li>Encryption in transit; restricted access on a need-to-know basis.</li>
            <li>Vendor due diligence and contractual controls.</li>
            <li>Organizational measures: policies, training, and incident response.</li>
          </ul>
          <p className="mt-3 text-sm" style={{ color: LEDGER.MUTE }}>
            No method of transmission or storage is 100% secure. We will notify users and/or
            regulators where required by law in the event of a breach.
          </p>
        </Section>

        <Section id="children" num="07" title="Children’s privacy">
          <p>
            Our services are not directed to children. If you believe a child provided personal
            data, contact us so we can take appropriate action. Where parental consent is
            required, we will not process a child’s data without verifiable consent.
          </p>
        </Section>

        <Section id="updates" num="08" title="Changes to this policy">
          <p>
            We may update this policy from time to time. If we make material changes, we will
            notify you by email and/or a prominent notice on our site. The date at the top
            indicates when this policy was last updated.
          </p>
          <div className="mt-4">
            <GlassCard>
              <h3 className="text-sm font-semibold mb-2" style={{ color: LEDGER.HEAD }}>Version history</h3>
              <ul className="text-sm list-disc pl-5">
                <li>v1.0 — 09 Oct 2025: Initial publication.</li>
              </ul>
            </GlassCard>
          </div>
        </Section>

        <Section id="contact" num="09" title="Contact us">
          <div className="grid md:grid-cols-2 gap-4">
            <GlassCard>
              <h3 className="text-sm font-semibold mb-2" style={{ color: LEDGER.HEAD }}>General privacy enquiries</h3>
              <p className="text-sm">
                Email:{" "}
                <GoldLink href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</GoldLink>
                <br />
                Address: {company.name}, {company.city}, {company.state}, {company.country}
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="text-sm font-semibold mb-2" style={{ color: LEDGER.HEAD }}>India grievance officer</h3>
              <p className="text-sm">
                Email:{" "}
                <GoldLink href={`mailto:${company.grievanceEmail}`}>{company.grievanceEmail}</GoldLink>
                <br />
                We aim to acknowledge queries promptly and resolve them within statutory timelines.
              </p>
            </GlassCard>
          </div>
        </Section>

        <div className="pt-4 text-xs" style={{ color: LEDGER.FAINT }}>
          <p>
            This page is provided for informational purposes and does not constitute legal advice.
            Consult counsel to tailor it to your operations, vendors, and jurisdictions.
          </p>
        </div>
      </LedgerShell>

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
    </>
  );
}
