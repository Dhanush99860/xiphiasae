// FILE: src/app/(site)/terms/page.tsx
// Terms & Conditions — Obsidian Ledger (shared navy/gold legal template), SEO + JSON-LD.

import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import {
  LedgerShell,
  Section,
  GlassCard,
  LedgerTable,
  GoldLink,
  type TocItem,
} from "@/components/Legal/LedgerLegal";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// ✅ Keep one canonical domain everywhere (match robots/sitemap/canonicals)
const SITE_URL = "https://www.xiphiasimmigration.com";
const OG_IMAGE = "/xiphias-immigration.png";

// ───────────────── SEO METADATA ─────────────────
export const metadata: Metadata = {
  title: "Terms & Conditions · XIPHIAS Immigration Private Limited",
  description:
    "The terms that govern your use of our website and services, including consulting scope, fees and refunds, acceptable use, disclaimers, and dispute resolution.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },

  openGraph: {
    title: "Terms & Conditions · XIPHIAS Immigration Private Limited",
    description:
      "Read the terms that govern your use of our website and consulting services.",
    url: `${SITE_URL}/terms`,
    siteName: "XIPHIAS Immigration",
    type: "article",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "XIPHIAS Immigration",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions · XIPHIAS Immigration Private Limited",
    description:
      "Read the terms that govern your use of our website and consulting services.",
    images: [OG_IMAGE],
  },
};

// ───────────────── PAGE ─────────────────
export default function TermsPage() {
  const effectiveDate = "05 Nov 2025";
  const company = {
    name: "XIPHIAS Immigration Private Limited",
    site: SITE_URL,
    legalEmail: "immigration@xiphias.in",
    registeredOffice:
      "Aurbis Prime, 11, Kaveri Regent Coronet, 80 Feet Road, 3rd Block, Koramangala, Bangalore - 560034",
    jurisdiction: "Bengaluru, Karnataka, India",
  } as const;

  const nav: TocItem[] = [
    { id: "acceptance", label: "Acceptance of Terms", num: "01" },
    { id: "definitions", label: "Definitions", num: "02" },
    { id: "eligibility", label: "Eligibility & Accounts", num: "03" },
    { id: "scope", label: "Scope of Services", num: "04" },
    { id: "noguarantee", label: "No Guarantee / Not Legal Advice", num: "05" },
    { id: "client-duties", label: "Client Responsibilities", num: "06" },
    { id: "fees", label: "Fees, Payments & Taxes", num: "07" },
    { id: "refunds", label: "Cancellations & Refunds", num: "08" },
    { id: "thirdparty", label: "Govt & Third-Party Fees", num: "09" },
    { id: "ip", label: "Intellectual Property", num: "10" },
    { id: "acceptable-use", label: "Acceptable Use", num: "11" },
    { id: "user-content", label: "User Content & Reviews", num: "12" },
    { id: "privacy", label: "Privacy", num: "13" },
    { id: "disclaimers", label: "Disclaimers", num: "14" },
    { id: "liability", label: "Limitation of Liability", num: "15" },
    { id: "indemnity", label: "Indemnity", num: "16" },
    { id: "force-majeure", label: "Force Majeure", num: "17" },
    { id: "termination", label: "Termination", num: "18" },
    { id: "law", label: "Governing Law & Disputes", num: "19" },
    { id: "changes", label: "Changes to these Terms", num: "20" },
    { id: "contact", label: "Contact", num: "21" },
  ];

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${company.site}/terms#webpage`,
    name: "Terms & Conditions",
    url: `${company.site}/terms`,
    dateModified: "2025-11-05",
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
        name: "Terms & Conditions",
        item: `${company.site}/terms`,
      },
    ],
  };

  // Optional: a tiny FAQ for rich results
  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you guarantee visa approval or timelines?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. Immigration decisions are made solely by the relevant government authorities. We provide consulting services to prepare and submit applications, but outcomes and timelines are outside our control.",
        },
      },
      {
        "@type": "Question",
        name: "Are service fees refundable?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Our professional fees compensate time and expertise and are generally non-refundable once work begins. Government and third-party fees are controlled by those entities. See the Cancellations & Refunds section for details.",
        },
      },
    ],
  };

  const heroExtra = (
    <div className="grid gap-3 sm:grid-cols-2">
      <GlassCard>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Consulting scope &amp; client responsibilities</li>
          <li>No guarantee of outcomes or timelines</li>
          <li>Fees, taxes, refunds &amp; third-party charges</li>
          <li>Acceptable use, IP, and dispute resolution</li>
        </ul>
      </GlassCard>

      <GlassCard>
        <p className="text-sm">
          See also our <GoldLink href="/privacy-policy">Privacy Policy</GoldLink>,{" "}
          <GoldLink href="/cookies">Cookies Policy</GoldLink> and{" "}
          <GoldLink href="/refunds">Refund Policy</GoldLink>.
        </p>
      </GlassCard>
    </div>
  );

  return (
    <>
      <LedgerShell
        serifClass={serif.className}
        crumb="Terms & Conditions"
        eyebrow="Legal"
        eyebrowAr="الشروط"
        title="Terms & Conditions"
        effectiveDate={effectiveDate}
        heroExtra={heroExtra}
        nav={nav}
      >
        <Section id="acceptance" num="01" title="1. Acceptance of these Terms">
          <p>
            These Terms &amp; Conditions (“<strong>Terms</strong>”) govern your access to and use
            of the website located at{" "}
            <GoldLink href={company.site}>{company.site}</GoldLink>{" "}
            and any related pages, tools, and services (collectively, the “<strong>Site</strong>”),
            provided by {company.name} (“<strong>we</strong>”, “<strong>us</strong>”, “<strong>our</strong>”).
            By accessing or using the Site, booking a consultation, or engaging our services,
            you agree to be bound by these Terms.
          </p>
        </Section>

        <Section id="definitions" num="02" title="2. Definitions">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>“Services”</strong> means our immigration and related consulting, document
              preparation, application support, appointment scheduling and other advisory offerings.
            </li>
            <li>
              <strong>“Engagement Letter”</strong> means the written scope, deliverables, fees,
              and terms agreed with you for specific Services. If there is a conflict, the Engagement
              Letter prevails for that scope.
            </li>
          </ul>
        </Section>

        <Section id="eligibility" num="03" title="3. Eligibility & Accounts">
          <p>
            You must have the legal capacity to contract under the laws that apply to you. To use
            certain features (e.g., client portal), you may need to create an account and keep
            credentials confidential. You are responsible for all activity under your account.
          </p>
        </Section>

        <Section id="scope" num="04" title="4. Scope of Services">
          <p>
            We provide professional consulting related to immigration pathways, investment or study
            options, and application preparation. We do not issue visas, permits, or approvals; all
            decisions are made by the relevant government authorities.
          </p>
        </Section>

        <Section id="noguarantee" num="05" title="5. No Guarantee; Not Legal Advice">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>No outcome guarantee.</strong> We do not guarantee any approval, result, or
              timeline. Decisions rest solely with government authorities.
            </li>
            <li>
              <strong>Not a law firm.</strong> Unless expressly stated in writing, we are not a law
              firm and do not provide legal representation. Our guidance is general information and
              strategy; it is not legal advice.
            </li>
          </ul>
        </Section>

        <Section id="client-duties" num="06" title="6. Client Responsibilities">
          <ul className="list-disc space-y-1 pl-5">
            <li>Provide complete, accurate, and up-to-date information and documents.</li>
            <li>Disclose material facts and promptly notify changes in circumstances.</li>
            <li>Review drafts carefully before submission.</li>
            <li>Comply with applicable laws (including anti-bribery and sanctions rules).</li>
          </ul>
        </Section>

        <Section id="fees" num="07" title="7. Fees, Payments & Taxes">
          <LedgerTable
            head={["Item", "Description", "When Due"]}
            rows={[
              [
                "Professional Fees",
                "Our consulting charges for the scope in your Engagement Letter; does not include government, translation, courier, or third-party vendor charges.",
                "As per invoice/Engagement Letter",
              ],
              [
                "Government/Vendor Fees",
                "Fees charged by authorities or vendors; amounts and policies are set by those third parties.",
                "Before filing/booking, as applicable",
              ],
              [
                "Taxes",
                "Fees are exclusive of taxes (e.g., GST) unless stated; you are responsible for applicable taxes.",
                "As applicable",
              ],
            ]}
          />
          <p className="mt-3 text-sm">
            Invoices are payable in the currency stated. Late payments may incur reasonable
            administrative charges and/or suspension of work until cured.
          </p>
        </Section>

        <Section id="refunds" num="08" title="8. Cancellations & Refunds">
          <p>
            Our professional fees generally become non-refundable once work has commenced. Where
            permitted in your Engagement Letter or under our{" "}
            <GoldLink href="/refunds">Refund Policy</GoldLink>
            , we may provide a partial refund for unperformed portions within our control.
            Government and third-party fees follow their own policies.
          </p>
        </Section>

        <Section id="thirdparty" num="09" title="9. Government & Third-Party Services">
          <p>
            Third-party terms and privacy policies apply. We are not responsible for their acts,
            omissions, or service levels.
          </p>
        </Section>

        <Section id="ip" num="10" title="10. Intellectual Property">
          <p>
            The Site, its content, design, logos, and software are owned by or licensed to us and
            protected by IP laws. You receive a limited license to use the Site for personal or
            internal business purposes.
          </p>
        </Section>

        <Section id="acceptable-use" num="11" title="11. Acceptable Use">
          <ul className="list-disc space-y-1 pl-5">
            <li>No unlawful, fraudulent, misleading, or harmful activity.</li>
            <li>No scraping or automated collection without consent.</li>
            <li>No malware or interference with security/access controls.</li>
            <li>No impersonation or misrepresentation.</li>
          </ul>
        </Section>

        <Section id="user-content" num="12" title="12. User Content & Reviews">
          <p>
            If you submit reviews or materials, you grant us a non-exclusive license to use and
            display such content in connection with the Site and our Services, subject to law.
          </p>
        </Section>

        <Section id="privacy" num="13" title="13. Privacy">
          <p>
            Our <GoldLink href="/privacy-policy">Privacy Policy</GoldLink> and{" "}
            <GoldLink href="/cookies">Cookies Policy</GoldLink>{" "}
            explain how we process data and cookies.
          </p>
        </Section>

        <Section id="disclaimers" num="14" title="14. Disclaimers">
          <ul className="list-disc space-y-1 pl-5">
            <li>The Site is provided “as is” and “as available”.</li>
            <li>Information may be general and subject to change without notice.</li>
          </ul>
        </Section>

        <Section id="liability" num="15" title="15. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, we will not be liable for indirect,
            incidental, consequential, special, punitive, or exemplary damages. Our aggregate
            liability will not exceed the amount you paid to us for the specific Service giving rise
            to the claim in the 6 months preceding the event.
          </p>
        </Section>

        <Section id="indemnity" num="16" title="16. Indemnity">
          <p>
            You agree to indemnify and hold harmless {company.name} from claims arising from your
            breach of these Terms, misuse of the Site/Services, or violation of law/third-party
            rights.
          </p>
        </Section>

        <Section id="force-majeure" num="17" title="17. Force Majeure">
          <p>
            We are not responsible for delays or failures caused by events beyond our reasonable
            control, including governmental actions and system/network outages.
          </p>
        </Section>

        <Section id="termination" num="18" title="18. Termination">
          <p>
            We may suspend/terminate access if you breach these Terms, fail to pay, or where required
            by law. Sections intended to survive will survive termination.
          </p>
        </Section>

        <Section id="law" num="19" title="19. Governing Law & Disputes">
          <p>
            These Terms are governed by the laws of India. Courts in {company.jurisdiction} have
            exclusive jurisdiction, subject to any mandatory dispute mechanism in your Engagement
            Letter.
          </p>
        </Section>

        <Section id="changes" num="20" title="20. Changes to these Terms">
          <p>
            We may update these Terms from time to time. The date at the top indicates the last
            update. Continued use after changes means you accept the updated Terms.
          </p>
        </Section>

        <Section id="contact" num="21" title="21. Contact">
          <p className="mb-3">
            Questions about these Terms? Email{" "}
            <GoldLink href={`mailto:${company.legalEmail}`}>{company.legalEmail}</GoldLink>{" "}
            or write to our registered office:
          </p>
          <GlassCard>
            <p className="text-sm">
              <strong>{company.name}</strong>
              <br />
              {company.registeredOffice}
            </p>
          </GlassCard>
        </Section>
      </LedgerShell>

      {/* JSON-LD (SEO) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
    </>
  );
}
