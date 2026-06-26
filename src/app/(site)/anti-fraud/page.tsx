// FILE: src/app/(site)/anti-fraud/page.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import {
  LedgerShell,
  Section,
  GlassCard,
  LedgerTable,
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

// ✅ Keep one canonical domain everywhere
const SITE_URL = "https://www.xiphiasimmigration.com";

// ───────────────── SEO METADATA ─────────────────
export const metadata: Metadata = {
  title: "Anti-fraud Notice · XIPHIAS Immigration Private Limited",
  description:
    "Protect yourself from scams. Learn how to verify genuine communication from XIPHIAS Immigration Private Limited and report suspected fraud.",
  alternates: { canonical: "/anti-fraud" },
  robots: { index: true, follow: true },

  // ✅ Add OG image here so this page doesn't lose the global OG image
  openGraph: {
    title: "Anti-fraud Notice · XIPHIAS Immigration Private Limited",
    description:
      "How to identify scams, what we never ask for, and how to verify official contact from XIPHIAS Immigration Private Limited.",
    url: `${SITE_URL}/anti-fraud`,
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
    title: "Anti-fraud Notice · XIPHIAS Immigration Private Limited",
    description:
      "How to identify scams, what we never ask for, and how to verify official contact from XIPHIAS Immigration Private Limited.",
    images: ["/xiphias-immigration.png"],
  },
};

// ───────────────── PAGE ─────────────────
export default function AntiFraudPage() {
  const effectiveDate = "09 Oct 2025";

  const company = {
    name: "XIPHIAS Immigration Private Limited",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    site: SITE_URL,
    contact: "immigration@xiphias.in",
    report: "immigration@xiphias.in",
    domain: "xiphiasimmigration.com",
  } as const;

  const nav: TocItem[] = [
    { id: "overview", label: "Overview", num: "01" },
    { id: "scams", label: "Common scam patterns", num: "02" },
    { id: "verify", label: "How to verify us", num: "03" },
    { id: "never", label: "What we never do", num: "04" },
    { id: "report", label: "Report suspected fraud", num: "05" },
    { id: "evidence", label: "Collecting evidence", num: "06" },
    { id: "legal", label: "Legal disclaimer", num: "07" },
    { id: "contact", label: "Contact", num: "08" },
    { id: "updates", label: "Updates", num: "09" },
  ];

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${company.site}/anti-fraud#webpage`,
    name: "Anti-fraud Notice",
    url: `${company.site}/anti-fraud`,
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
        name: "Anti-fraud Notice",
        item: `${company.site}/anti-fraud`,
      },
    ],
  };

  const heroExtra = (
    <div className="grid gap-3 sm:grid-cols-2">
      <GlassCard>
        <ul className="list-disc space-y-1 pl-5 text-sm marker:text-[#bfa15c]">
          <li>Identify common scam patterns targeting immigration aspirants.</li>
          <li>Verify genuine communication from {company.name}.</li>
          <li>Report suspicious activity to our team.</li>
        </ul>
      </GlassCard>

      <GlassCard>
        <p className="text-sm">
          Related policies:{" "}
          <GoldLink href="/privacy-policy">Privacy Policy</GoldLink> ·{" "}
          <GoldLink href="/terms">Terms of Use</GoldLink> ·{" "}
          <GoldLink href="/contact">Disclaimer</GoldLink>
        </p>
      </GlassCard>
    </div>
  );

  return (
    <>
      <LedgerShell
        serifClass={serif.className}
        crumb="Anti-fraud Notice"
        eyebrow="Anti-fraud Notice"
        eyebrowAr="إشعار مكافحة الاحتيال"
        title="Anti-fraud Notice"
        effectiveDate={effectiveDate}
        heroExtra={heroExtra}
        nav={nav}
      >
        <Section id="overview" num="01" title="Overview">
          <p>
            Fraudsters may impersonate {company.name} or claim affiliation to solicit money,
            personal information, or documents. This page explains how to protect yourself and how
            to confirm that a message is genuinely from us.
          </p>
        </Section>

        <Section id="scams" num="02" title="Common scam patterns">
          <LedgerTable
            head={["Pattern", "Red flags", "What to do"]}
            rows={[
              [
                "Unsolicited job offers / visa guarantees",
                "“Guaranteed visa/job”, pressure to pay immediately, unrealistic salary",
                "Do not pay. Verify sender domain and contact us.",
              ],
              [
                "Payments to personal accounts or wallets",
                "UPI/crypto/personal bank details shared on chat apps",
                "We accept payments only via official company accounts and invoices.",
              ],
              [
                "WhatsApp/Telegram impersonation",
                "Display names without our domain email, blurry IDs, no company signature",
                <>
                  Ask for a confirmation email from{" "}
                  <strong style={{ color: LEDGER.HEAD }}>@{company.domain}</strong>.
                </>,
              ],
              [
                "Document forgery offers",
                "“We can expedite / influence decisions”",
                "Report immediately. We never engage in such practices.",
              ],
            ]}
          />
        </Section>

        <Section id="verify" num="03" title="How to verify you’re dealing with us">
          <ul className="list-disc space-y-2 pl-5 marker:text-[#bfa15c]">
            <li>
              <strong style={{ color: LEDGER.HEAD }}>Email domain:</strong> Official emails come from{" "}
              <strong style={{ color: LEDGER.HEAD }}>@{company.domain}</strong>. If in doubt, forward to{" "}
              <GoldLink href={`mailto:${company.report}`}>{company.report}</GoldLink> for verification.
            </li>
            <li>
              <strong style={{ color: LEDGER.HEAD }}>Invoices &amp; receipts:</strong> Issued on {company.name} letterhead only;
              payments are accepted to company bank accounts—never personal accounts or wallets.
            </li>
            <li>
              <strong style={{ color: LEDGER.HEAD }}>Website:</strong> Confirm links resolve to{" "}
              <GoldLink href={company.site}>{company.site.replace("https://", "")}</GoldLink>.
            </li>
            <li>
              <strong style={{ color: LEDGER.HEAD }}>Call-back:</strong> If contacted on chat apps, request a confirmation email and
              a scheduled call via official channels.
            </li>
          </ul>
        </Section>

        <Section id="never" num="04" title="What we will never do">
          <ul className="list-disc space-y-1 pl-5 marker:text-[#bfa15c]">
            <li>Guarantee a visa, job placement, or government outcome.</li>
            <li>Ask you to pay to a private/personal account or via anonymous wallets.</li>
            <li>Request your full card PIN, one-time passwords, or banking passwords.</li>
            <li>Offer to alter or forge documents.</li>
          </ul>
        </Section>

        <Section id="report" num="05" title="Report suspected fraud">
          <GlassCard>
            <p className="text-sm">
              Email{" "}
              <GoldLink href={`mailto:${company.report}`}>{company.report}</GoldLink> with the subject{" "}
              <strong style={{ color: LEDGER.HEAD }}>“Suspected Fraud”</strong>. Include the sender
              address/phone, screenshots, payment instructions received, and any links or
              attachments you were sent.
            </p>
          </GlassCard>
          <p className="mt-3 text-sm">
            If you have already paid, also contact your bank/payment provider immediately to try to
            stop or dispute the transaction.
          </p>
        </Section>

        <Section id="evidence" num="06" title="Collecting useful evidence">
          <ul className="list-disc space-y-1 pl-5 marker:text-[#bfa15c]">
            <li>Full email headers or chat exports (showing addresses, timestamps, and IDs).</li>
            <li>Screenshots of conversations and payment requests.</li>
            <li>Account details to which payment was requested (bank name, UPI ID, wallet).</li>
            <li>Any files or links sent by the suspected fraudster.</li>
          </ul>
        </Section>

        <Section id="legal" num="07" title="Legal disclaimer">
          <p>
            {company.name} is not responsible for losses arising from dealings with unaffiliated
            third parties or impersonators. We will cooperate with authorities where appropriate and
            may provide information to aid investigations.
          </p>
        </Section>

        <Section id="contact" num="08" title="Contact">
          <div className="grid gap-4 md:grid-cols-2">
            <GlassCard>
              <h3 className="mb-2 text-sm font-semibold" style={{ color: LEDGER.HEAD }}>Report fraud</h3>
              <p className="text-sm">
                Email: <GoldLink href={`mailto:${company.report}`}>{company.report}</GoldLink>
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="mb-2 text-sm font-semibold" style={{ color: LEDGER.HEAD }}>Privacy enquiries</h3>
              <p className="text-sm">
                Email: <GoldLink href={`mailto:${company.contact}`}>{company.contact}</GoldLink>
              </p>
            </GlassCard>
          </div>
        </Section>

        <Section id="updates" num="09" title="Updates to this notice">
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
