// src/app/(site)/accessibility/page.tsx
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

// ✅ Keep one canonical domain everywhere
const SITE_URL = "https://www.xiphiasimmigration.com";

// ───────────────── SEO METADATA ─────────────────
export const metadata: Metadata = {
  title: "Accessibility Statement · XIPHIAS Immigration Private Limited",
  description:
    "Our commitment to digital accessibility, conformance targets, measures we take, and how to report issues or request an accessible format.",
  alternates: { canonical: "/accessibility" },
  robots: { index: true, follow: true },

  // ✅ Include OG image here so this page doesn't lose the global image
  openGraph: {
    title: "Accessibility Statement · XIPHIAS Immigration Private Limited",
    description:
      "Commitment to accessible experiences, WCAG conformance, known limitations, and feedback channels.",
    url: `${SITE_URL}/accessibility`,
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

  // ✅ Keep consistent with your global Twitter setup
  twitter: {
    card: "summary_large_image",
    title: "Accessibility Statement · XIPHIAS Immigration Private Limited",
    description:
      "Commitment to accessible experiences, WCAG conformance, known limitations, and feedback channels.",
    images: ["/xiphias-immigration.png"],
  },
};

// ───────────────── PAGE ─────────────────
export default function AccessibilityPage() {
  const effectiveDate = "09 Oct 2025";
  const company = {
    name: "XIPHIAS Immigration Private Limited",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    site: SITE_URL, // ✅ canonical
    email: "immigration@xiphias.in",
    altEmail: "immigration@xiphias.in",
  } as const;

  const nav: TocItem[] = [
    { id: "commitment", label: "Commitment", num: "01" },
    { id: "standard", label: "Conformance standard", num: "02" },
    { id: "measures", label: "Measures we take", num: "03" },
    { id: "compat", label: "Assistive tech compatibility", num: "04" },
    { id: "limits", label: "Known limitations", num: "05" },
    { id: "altformats", label: "Alternative formats", num: "06" },
    { id: "feedback", label: "Feedback & contact", num: "07" },
    { id: "enforcement", label: "Enforcement", num: "08" },
    { id: "updates", label: "Updates", num: "09" },
  ];

  // ✅ Page JSON-LD (safe + consistent)
  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${company.site}/accessibility#webpage`,
    name: "Accessibility Statement",
    url: `${company.site}/accessibility`,
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
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${company.site}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Accessibility",
        item: `${company.site}/accessibility`,
      },
    ],
  };

  return (
    <>
      <LedgerShell
        serifClass={serif.className}
        crumb="Accessibility"
        eyebrow="Accessibility Statement"
        eyebrowAr="بيان إمكانية الوصول"
        title="Accessibility Statement"
        effectiveDate={effectiveDate}
        nav={nav}
        heroExtra={
          <div className="grid gap-3 sm:grid-cols-2">
            <GlassCard>
              <ul className="list-disc space-y-1 pl-5 text-sm" style={{ color: LEDGER.TEXT }}>
                <li>Our accessibility commitment and WCAG target.</li>
                <li>Measures in design, code, and QA to support inclusion.</li>
                <li>How to request accessible formats or report issues.</li>
              </ul>
            </GlassCard>
            <GlassCard>
              <p className="text-sm">
                Related: Privacy (<GoldLink href="/privacy-policy">/privacy-policy</GoldLink>) · Terms (
                <GoldLink href="/terms">/terms</GoldLink>)
              </p>
            </GlassCard>
          </div>
        }
      >
        <Section id="commitment" num="01" title="1. Our commitment">
          <p>
            {company.name} is committed to providing a website that is accessible to the widest
            possible audience, regardless of technology or ability. We strive to continuously
            improve the user experience for everyone and apply relevant accessibility standards.
          </p>
        </Section>

        <Section id="standard" num="02" title="2. Conformance standard">
          <p>
            Our aim is to conform to{" "}
            <strong style={{ color: LEDGER.HEAD }}>WCAG 2.1 Level AA</strong> (or higher where feasible).
            We review templates and components against these criteria during design and development.
          </p>
        </Section>

        <Section id="measures" num="03" title="3. Measures we take">
          <ul className="list-disc space-y-1 pl-5">
            <li>Semantic HTML structure and proper labeling of interactive controls.</li>
            <li>Keyboard operability and visible focus states.</li>
            <li>Color contrast that meets or exceeds WCAG AA.</li>
            <li>Text alternatives for non-text content where applicable.</li>
            <li>Testing with screen reader/navigation patterns on key flows.</li>
          </ul>
        </Section>

        <Section id="compat" num="04" title="4. Assistive technology compatibility">
          <p className="mb-2">
            We aim to work with modern browsers and assistive technologies. Experiences may vary by
            combination of OS, browser, and AT. If you encounter barriers, please tell us.
          </p>
          <GlassCard>
            <p className="text-sm">
              Helpful info to include in a report: page URL, steps to reproduce, expected vs.
              actual behavior, browser/version, OS, and assistive tech (e.g., NVDA, TalkBack,
              VoiceOver).
            </p>
          </GlassCard>
        </Section>

        <Section id="limits" num="05" title="5. Known limitations">
          <p>
            Despite our efforts, some content or third-party integrations may not fully meet WCAG
            criteria. We monitor user feedback and update components to address issues promptly.
          </p>
        </Section>

        <Section id="altformats" num="06" title="6. Requesting alternative formats">
          <p>
            If you need content in an alternative accessible format (e.g., large print, screen-reader
            friendly PDFs), contact us and we will make reasonable efforts to assist.
          </p>
        </Section>

        <Section id="feedback" num="07" title="7. Feedback & contact">
          <div className="grid gap-4 md:grid-cols-2">
            <GlassCard>
              <h3 className="mb-2 text-sm font-semibold" style={{ color: LEDGER.HEAD }}>Accessibility contact</h3>
              <p className="text-sm">
                Email: <GoldLink href={`mailto:${company.altEmail}`}>{company.altEmail}</GoldLink>
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="mb-2 text-sm font-semibold" style={{ color: LEDGER.HEAD }}>Alternate contact</h3>
              <p className="text-sm">
                Email: <GoldLink href={`mailto:${company.email}`}>{company.email}</GoldLink>
              </p>
            </GlassCard>
          </div>
        </Section>

        <Section id="enforcement" num="08" title="8. Enforcement">
          <p>
            We take accessibility seriously. If you believe you have been unable to access content
            or functionality due to a barrier on our site, please contact us using the details
            above. We will review and endeavor to remediate where reasonable.
          </p>
        </Section>

        <Section id="updates" num="09" title="9. Updates to this statement">
          <GlassCard>
            <h3 className="mb-2 text-sm font-semibold" style={{ color: LEDGER.HEAD }}>Version history</h3>
            <ul className="list-disc pl-5 text-sm">
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
