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
  title: "Citizenship Eligibility Check (Free) | Interactive Assessment",
  description:
    "See if you qualify for citizenship by investment, by descent, or through residency-to-naturalization. Instant results + downloadable PDF.",
  keywords: [
    "citizenship eligibility check",
    "citizenship by investment",
    "citizenship by descent",
    "residency to naturalization",
    "dual citizenship guidance",
  ],
  alternates: { canonical: "/citizenship/eligibility-check" },
  openGraph: {
    title: "Citizenship Eligibility Check (Free) | Interactive Assessment",
    description:
      "Explore citizenship by investment, by descent, or via residency-to-naturalization. Instant results + downloadable summary.",
    url: "https://www.xiphiasimmigration.com/citizenship/eligibility-check",
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/xiphias-immigration.png",
        width: 1200,
        height: 630,
        alt: "Citizenship Eligibility Check – XIPHIAS Immigration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Citizenship Eligibility Check (Free) | Interactive Assessment",
    description:
      "Explore citizenship by investment, by descent, or via residency-to-naturalization. Instant results + downloadable summary.",
    images: ["/xiphias-immigration.png"],
  },
  robots: { index: true, follow: true },
};

const content: EligibilityCheckContent = {
  eyebrow: "Citizenship · Eligibility Check",
  eyebrowAr: "فحص الأهلية",
  title: "Do you qualify for a",
  titleAccent: "second citizenship?",
  subtitle:
    "Explore citizenship by investment, by descent, or via residency-to-naturalization. Answer a few questions and get an instant, shareable result.",
  features: [
    "By investment",
    "By descent (ancestry)",
    "Residency → naturalization",
    "Dual-citizenship guidance",
  ],
  steps: [
    { k: "01", t: "Answer 6–8 quick questions", d: "Route preference, budget/ties, residency history, and timelines." },
    { k: "02", t: "Get instant eligibility", d: "See which routes look promising and what may block eligibility." },
    { k: "03", t: "Download a personalized PDF", d: "Programs, timelines, and document tips in a shareable brief." },
    { k: "04", t: "Next steps guidance", d: "Optional expert review, cost ranges, and a readiness checklist." },
  ],
  highlights: [
    { title: "Fast screening", desc: "Quickly rule in/out common routes before committing to deep-dive advisory." },
    { title: "Document-aware", desc: "Flags typical proof needed for ancestry, residency, and investment routes." },
    { title: "Shareable output", desc: "Download a neat PDF for internal discussion or to brief an advisor." },
  ],
  faqs: [
    {
      q: "What citizenship routes are covered?",
      a: "We include common donation/real-estate citizenship-by-investment programs, ancestry routes where documentation is feasible, and residency-to-naturalization paths in popular jurisdictions.",
    },
    {
      q: "Is dual citizenship allowed?",
      a: "It depends on your current nationality and the target program. The tool will flag potential conflicts and the PDF includes a summary to discuss with counsel.",
    },
    {
      q: "Do I need to upload documents?",
      a: "No—this is a quick pre-check. You can gather documents later if you choose to proceed.",
    },
    {
      q: "How accurate are the results?",
      a: "They’re a fast feasibility screen based on your inputs and program rules. Final outcomes depend on evidence, background checks, and government decisions.",
    },
  ],
  startHref: "/eligibility?track=citizenship",
  startLabel: "Start Citizenship Check",
  crumbLabel: "Citizenship",
  crumbHref: "/citizenship",
  imageSlug: "grenada",
  imageRegion: "Caribbean",
  ctaTitle: "Unsure which route fits best?",
  ctaCopy: "Turn a quick screen into a precise, advisor-reviewed citizenship plan.",
};

export default function CitizenshipEligibilityLanding() {
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
              { "@type": "ListItem", position: 2, name: "Citizenship", item: "/citizenship" },
              {
                "@type": "ListItem",
                position: 3,
                name: "Eligibility Check",
                item: "/citizenship/eligibility-check",
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
