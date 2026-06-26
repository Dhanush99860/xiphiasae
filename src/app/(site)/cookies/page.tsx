// FILE: src/app/(site)/cookies/page.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import {
  LedgerShell,
  Section,
  GlassCard,
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

// ✅ Keep one canonical domain everywhere
const SITE_URL = "https://www.xiphiasimmigration.com";

// ───────────────── SEO METADATA ─────────────────
export const metadata: Metadata = {
  title: "Cookies Policy · XIPHIAS Immigration Private Limited",
  description:
    "How XIPHIAS Immigration Private Limited uses cookies and similar technologies, and how you can manage your preferences.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },

  openGraph: {
    title: "Cookies Policy · XIPHIAS Immigration Private Limited",
    description:
      "How we use cookies and similar technologies, and how to manage your preferences.",
    url: `${SITE_URL}/cookies`,
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
    title: "Cookies Policy · XIPHIAS Immigration Private Limited",
    description:
      "How we use cookies and similar technologies, and how to manage your preferences.",
    images: ["/xiphias-immigration.png"],
  },
};

// ───────────────── PAGE ─────────────────
export default function CookiesPage() {
  const effectiveDate = "09 Oct 2025";
  const company = {
    name: "XIPHIAS Immigration Private Limited",
    site: SITE_URL,
    privacyEmail: "immigration@xiphias.in",
  } as const;

  const nav: TocItem[] = [
    { id: "what", label: "What are cookies", num: "01" },
    { id: "how", label: "How we use them", num: "02" },
    { id: "types", label: "Cookie types", num: "03" },
    { id: "manage", label: "Manage preferences", num: "04" },
    { id: "gpc", label: "Global Privacy Control (GPC)", num: "05" },
    { id: "updates", label: "Updates", num: "06" },
    { id: "contact", label: "Contact", num: "07" },
  ];

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${company.site}/cookies#webpage`,
    name: "Cookies Policy",
    url: `${company.site}/cookies`,
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
      { "@type": "ListItem", position: 2, name: "Cookies Policy", item: `${company.site}/cookies` },
    ],
  };

  return (
    <>
      <LedgerShell
        serifClass={serif.className}
        crumb="Cookies Policy"
        eyebrow="Cookies"
        eyebrowAr="الكوكيز"
        title="Cookies Policy"
        effectiveDate={effectiveDate}
        nav={nav}
        heroExtra={
          <div className="grid gap-3 sm:grid-cols-2">
            <GlassCard>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>What cookies are and why we use them.</li>
                <li>Types: essential, analytics, advertising.</li>
                <li>How to manage your preferences at any time.</li>
                <li>How we honor Global Privacy Control (GPC).</li>
              </ul>
            </GlassCard>

            <GlassCard>
              <p className="text-sm">
                See also the <GoldLink href="/privacy-policy">Privacy Policy</GoldLink>.
              </p>
            </GlassCard>
          </div>
        }
      >
        <Section id="what" num="01" title="1. What are cookies?">
          <p>
            Cookies are small text files placed on your device by a website. They can be
            first-party (set by this site) or third-party (set by partners). We may also use
            similar technologies like local storage and SDKs in apps.
          </p>
        </Section>

        <Section id="how" num="02" title="2. How we use cookies">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong style={{ color: LEDGER.HEAD }}>Essential</strong> — to keep the site secure, load pages, and remember
              your session or preferences.
            </li>
            <li>
              <strong style={{ color: LEDGER.HEAD }}>Analytics</strong> — to understand performance, popular content, and
              improve features.
            </li>
            <li>
              <strong style={{ color: LEDGER.HEAD }}>Advertising</strong> — to measure campaigns, avoid showing the same ad
              repeatedly, and personalize where permitted.
            </li>
          </ul>
        </Section>

        <Section id="types" num="03" title="3. Cookie types & retention">
          <LedgerTable
            head={["Type", "Purpose", "Examples", "Retention", "First/Third party"]}
            rows={[
              [
                "Essential",
                "Security, session, load balancing",
                "session_id, csrf_token",
                "Session / up to 12 months",
                "First-party",
              ],
              [
                "Analytics",
                "Performance, usage insights",
                "page_view, feature_usage",
                "13–24 months (aggregated)",
                "First-party / Third-party",
              ],
              [
                "Advertising",
                "Attribution, frequency capping",
                "ad_attrib, freq_cap",
                "Up to 24 months",
                "Third-party",
              ],
            ]}
          />
          <p className="mt-3 text-sm">
            Vendors and exact cookie names may change over time. We update this table
            periodically.
          </p>
        </Section>

        <Section id="manage" num="04" title="4. Manage your preferences">
          <p>
            You can change your settings anytime by opening your cookie preferences. Most browsers
            also let you block or delete cookies in settings.
          </p>

          <GlassCard className="mt-4">
            {/* Link styled as a button; safe for server component */}
            <GhostLink href="#open-cookie-preferences">Open cookie preferences</GhostLink>

            <p className="text-xs mt-2" style={{ color: LEDGER.FAINT }}>
              This link opens the cookie preference modal via{" "}
              <code className="rounded px-1 py-0.5" style={{ background: "rgba(255,255,255,0.06)", color: LEDGER.TEXT }}>
                #open-cookie-preferences
              </code>
              .
            </p>
          </GlassCard>

          <p className="mt-3 text-sm">
            California residents can also use the{" "}
            <GoldLink href="/contact">contact page</GoldLink>{" "}
            to request assistance with opt-out preferences where applicable.
          </p>
        </Section>

        <Section id="gpc" num="05" title="5. Global Privacy Control (GPC)">
          <p>
            We make reasonable efforts to honor the Global Privacy Control signal where supported,
            treating it as a request to opt out of sale/sharing for the current browser.
          </p>
        </Section>

        <Section id="updates" num="06" title="6. Updates to this policy">
          <p>
            We may update this Cookies Policy from time to time. If changes are material, we will
            post a prominent notice on this page. The date at the top indicates the last update.
          </p>
        </Section>

        <Section id="contact" num="07" title="7. Contact">
          <p>
            Questions about this policy? Email{" "}
            <GoldLink href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</GoldLink>.
          </p>
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

      {/* Hash-trigger helper: if CMP is present, auto-open on #open-cookie-preferences */}
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `(function(){try{if(location.hash==="#open-cookie-preferences"){window.showCookiePreferences&&window.showCookiePreferences();}}catch(e){}})();`,
        }}
      />
    </>
  );
}
