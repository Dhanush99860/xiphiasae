// FILE: src/app/(site)/refunds/page.tsx
// Refund Policy — Obsidian Ledger (navy/gold) shared legal template, SEO + JSON-LD.

import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import {
  LedgerShell,
  Section,
  GlassCard,
  GoldLink,
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
const OG_IMAGE = "/xiphias-immigration.png";

// ───────────────── SEO METADATA ─────────────────
export const metadata: Metadata = {
  title: "Refund Policy · XIPHIAS Immigration Private Limited",
  description:
    "Refunds, cancellations, and chargeback rules for services provided by XIPHIAS Immigration Private Limited.",
  alternates: { canonical: "/refunds" },
  robots: { index: true, follow: true },

  openGraph: {
    title: "Refund Policy · XIPHIAS Immigration Private Limited",
    description:
      "Refunds, cancellations, and chargeback rules for services provided by XIPHIAS Immigration Private Limited.",
    url: `${SITE_URL}/refunds`,
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
    title: "Refund Policy · XIPHIAS Immigration Private Limited",
    description:
      "Refunds, cancellations, and chargeback rules for services provided by XIPHIAS Immigration Private Limited.",
    images: [OG_IMAGE],
  },
};

// ───────────────── PAGE ─────────────────
export default function RefundsPage() {
  const effectiveDate = "09 Oct 2025";
  const company = {
    name: "XIPHIAS Immigration Private Limited",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    site: SITE_URL,
    contact: "immigration@xiphias.in",
  } as const;

  const nav: TocItem[] = [
    { id: "scope", label: "Scope", num: "01" },
    { id: "eligibility", label: "Eligibility", num: "02" },
    { id: "nonrefundable", label: "Non-refundable items", num: "03" },
    { id: "howto", label: "How to request a refund", num: "04" },
    { id: "timelines", label: "Processing timelines", num: "05" },
    { id: "cancellations", label: "Cancellations", num: "06" },
    { id: "chargebacks", label: "Chargebacks", num: "07" },
    { id: "law", label: "Governing law", num: "08" },
    { id: "contact", label: "Contact", num: "09" },
    { id: "changes", label: "Changes to this policy", num: "10" },
  ];

  // ✅ JSON-LD with absolute URLs + stable @id
  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${company.site}/refunds#webpage`,
    name: "Refund Policy",
    url: `${company.site}/refunds`,
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
      { "@type": "ListItem", position: 2, name: "Refund Policy", item: `${company.site}/refunds` },
    ],
  };

  const heroExtra = (
    <div className="grid gap-3 sm:grid-cols-2">
      <GlassCard>
        <ul className="list-disc space-y-1 pl-5 text-sm marker:text-[#bfa15c]">
          <li>When refunds apply and how to request one.</li>
          <li>Items that are non-refundable (e.g., government or third-party fees).</li>
          <li>Processing timelines and cancellations.</li>
          <li>Chargeback rules and contact details.</li>
        </ul>
      </GlassCard>

      <GlassCard>
        <p className="text-sm">
          Related pages: <GoldLink href="/terms">Terms of Use</GoldLink> ·{" "}
          <GoldLink href="/privacy-policy">Privacy Policy</GoldLink>
        </p>
      </GlassCard>
    </div>
  );

  return (
    <>
      <LedgerShell
        serifClass={serif.className}
        crumb="Refund Policy"
        eyebrow="Refund Policy"
        eyebrowAr="سياسة الاسترداد"
        title="Refund Policy"
        effectiveDate={effectiveDate}
        heroExtra={heroExtra}
        nav={nav}
      >
        <Section id="scope" num="01" title="Scope">
          <p>
            This Refund Policy applies to fees paid for services purchased from {company.name} via
            our website or through our authorized representatives.
          </p>
        </Section>

        <Section id="eligibility" num="02" title="Eligibility">
          <ul className="list-disc space-y-1 pl-5 marker:text-[#bfa15c]">
            <li>
              Refunds are generally considered when a paid service has{" "}
              <strong style={{ color: LEDGER.HEAD }}>not yet been rendered</strong>.
            </li>
            <li>
              If a service has begun (e.g., consultation completed, document review commenced),
              any refund may be partial and reflect work already performed.
            </li>
            <li>
              Outcomes with government authorities (e.g., visa approvals) are{" "}
              <strong style={{ color: LEDGER.HEAD }}>not guaranteed</strong> and are not a basis for refunds.
            </li>
          </ul>
        </Section>

        <Section id="nonrefundable" num="03" title="Non-refundable items">
          <ul className="list-disc space-y-1 pl-5 marker:text-[#bfa15c]">
            <li>Government filing, embassy, and visa fees.</li>
            <li>Third-party charges (e.g., courier, translation, notary, assessments).</li>
            <li>Bank/payment gateway charges and currency conversion differences.</li>
          </ul>
        </Section>

        <Section id="howto" num="04" title="How to request a refund">
          <GlassCard>
            <p className="text-sm">
              Email <GoldLink href={`mailto:${company.contact}`}>{company.contact}</GoldLink> with the
              subject <strong style={{ color: LEDGER.HEAD }}>“Refund Request”</strong>, and include: full name, contact
              number, payment reference/transaction ID, service purchased, and a short reason for
              the request.
            </p>
          </GlassCard>
        </Section>

        <Section id="timelines" num="05" title="Processing timelines">
          <ul className="list-disc space-y-1 pl-5 marker:text-[#bfa15c]">
            <li>We typically acknowledge requests promptly after verification.</li>
            <li>
              Approved refunds are usually processed to the original payment method within{" "}
              <strong style={{ color: LEDGER.HEAD }}>7–14 business days</strong> (bank timelines may vary).
            </li>
          </ul>
        </Section>

        <Section id="cancellations" num="06" title="Cancellations">
          <p>
            For cancellations before service commencement, a full or partial refund may be
            available depending on the scope and preparatory work already performed. Once
            substantive work has started, cancellations may incur deductions.
          </p>
        </Section>

        <Section id="chargebacks" num="07" title="Chargebacks">
          <p>
            If you dispute a payment with your bank or card issuer, please notify us so we can
            investigate. Unauthorized or fraudulent transactions will be addressed per issuer
            rules; otherwise, chargebacks may delay resolution.
          </p>
        </Section>

        <Section id="law" num="08" title="Governing law">
          <p>
            This Refund Policy is governed by the laws of India. Courts in Bengaluru, Karnataka
            shall have exclusive jurisdiction over any disputes arising from or relating to this
            policy.
          </p>
        </Section>

        <Section id="contact" num="09" title="Contact">
          <p>
            Questions about this policy? Email{" "}
            <GoldLink href={`mailto:${company.contact}`}>{company.contact}</GoldLink> or write to{" "}
            {company.name}, {company.city}, {company.state}, {company.country}.
          </p>
        </Section>

        <Section id="changes" num="10" title="Changes to this policy">
          <GlassCard>
            <h3 className="mb-2 text-sm font-semibold" style={{ color: LEDGER.HEAD }}>Version history</h3>
            <ul className="list-disc pl-5 text-sm marker:text-[#bfa15c]">
              <li>v1.0 — 09 Oct 2025: Initial publication.</li>
            </ul>
          </GlassCard>
        </Section>
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
