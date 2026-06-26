import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import EligibilityCheckPanel, {
  type EligibilityCheckContent,
} from "@/components/Eligibility/EligibilityCheckPanel";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Corporate Immigration Eligibility Check (Free)",
  description:
    "Assess corporate immigration options for entity setup, sponsorship, and global mobility. Instant results + downloadable summary.",
  keywords: [
    "corporate immigration eligibility",
    "entity setup",
    "employer sponsorship",
    "global mobility",
    "business immigration check",
  ],
  alternates: { canonical: "/corporate/eligibility-check" },
  openGraph: {
    title: "Corporate Immigration Eligibility Check (Free)",
    description:
      "Assess corporate immigration options for entity setup, sponsorship, and global mobility. Instant results + downloadable summary.",
    url: "https://www.xiphiasimmigration.com/corporate/eligibility-check",
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/xiphias-immigration.png",
        width: 1200,
        height: 630,
        alt: "Corporate Immigration Eligibility Check – XIPHIAS Immigration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Immigration Eligibility Check (Free)",
    description:
      "Assess corporate immigration options for entity setup, sponsorship, and global mobility. Instant results + downloadable summary.",
    images: ["/xiphias-immigration.png"],
  },
  robots: { index: true, follow: true },
};

const content: EligibilityCheckContent = {
  eyebrow: "Corporate · Eligibility Check",
  eyebrowAr: "فحص الأهلية",
  title: "Can your business",
  titleAccent: "move and expand?",
  subtitle:
    "For founders, HR, and mobility teams. Check feasibility for entity setup, staff relocation, and employer-sponsored visas across key jurisdictions.",
  features: [
    "Entity setup readiness",
    "Employer sponsorship",
    "Global mobility planning",
    "Instant feasibility signal",
  ],
  steps: [
    { k: "01", t: "Answer 5–7 quick questions", d: "Tell us your target countries, headcount, hiring model, and timelines." },
    { k: "02", t: "Get instant eligibility", d: "See high-level feasibility for incorporation, sponsorship, and relocation." },
    { k: "03", t: "Download a clean summary", d: "Export a shareable PDF for internal review and decision-making." },
    { k: "04", t: "Next steps guidance", d: "Receive tailored routes, basic costs, and compliance notes (no obligation)." },
  ],
  highlights: [
    { title: "Built for teams", desc: "Capture the key details your finance, HR, and legal stakeholders care about." },
    { title: "Clarity, fast", desc: "Instant screen to rule-in/-out common routes before deep-dive advisory." },
    { title: "Shareable output", desc: "Download a neat summary to circulate internally or attach to a ticket." },
  ],
  faqs: [
    {
      q: "Which jurisdictions are covered?",
      a: "We focus on major business hubs and common expansion destinations. Coverage grows continuously and the checker will indicate if a country is in-scope before you begin.",
    },
    {
      q: "Do I need to create an account?",
      a: "No sign-up is required to run the check. You can optionally share an email to receive the PDF.",
    },
    {
      q: "Is this legal advice?",
      a: "The tool is an initial feasibility screen and not a substitute for legal advice. For complex cases we offer an expert review.",
    },
    {
      q: "Can I run multiple scenarios?",
      a: "Yes. You can re-run the check with different countries, headcount, or timelines to compare outcomes.",
    },
  ],
  startHref: "/eligibility?track=corporate",
  startLabel: "Start Corporate Check",
  crumbLabel: "Corporate",
  crumbHref: "/corporate",
  imageSlug: "singapore",
  imageRegion: "Asia-Pacific",
  ctaTitle: "Complex scenario or multi-country rollout?",
  ctaCopy: "Validate edge cases, timelines, and costs for board approval with our team.",
};

export default function CorporateEligibilityPage() {
  return (
    <>
      <EligibilityCheckPanel serifClass={serif.className} content={content} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Corporate", item: "/corporate" },
              {
                "@type": "ListItem",
                position: 3,
                name: "Eligibility Check",
                item: "/corporate/eligibility-check",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: content.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
