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
  title: "Residency Eligibility Check (Free) | Interactive Assessment",
  description:
    "Check your residency eligibility in minutes. Answer a few questions and get instant results plus a personalized PDF report.",
  keywords: [
    "residency eligibility check",
    "residency by investment",
    "residency by family",
    "fast-track residency",
    "global mobility eligibility",
  ],
  alternates: { canonical: "/residency/eligibility-check" },
  openGraph: {
    title: "Residency Eligibility Check (Free) | Interactive Assessment",
    description:
      "Check your residency eligibility in minutes. Answer a few questions and get instant results plus a personalized PDF report.",
    url: "https://www.xiphiasimmigration.com/residency/eligibility-check",
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/xiphias-immigration.png",
        width: 1200,
        height: 630,
        alt: "Residency Eligibility Check – XIPHIAS Immigration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Residency Eligibility Check (Free) | Interactive Assessment",
    description:
      "Check your residency eligibility in minutes. Answer a few questions and get instant results plus a personalized PDF report.",
    images: ["/xiphias-immigration.png"],
  },
  robots: { index: true, follow: true },
};

const content: EligibilityCheckContent = {
  eyebrow: "Residency · Eligibility Check",
  eyebrowAr: "فحص الأهلية",
  title: "Where could you",
  titleAccent: "live and reside?",
  subtitle:
    "Check your eligibility for investment, family, work, and fast-track residency routes in minutes. Quick, interactive, and confidential.",
  features: [
    "Investment-based routes",
    "Family inclusion",
    "Fast-track jurisdictions",
    "Instant eligibility signal",
  ],
  steps: [
    { k: "01", t: "Answer a few quick questions", d: "Tell us your goals, family members, budget, and target countries." },
    { k: "02", t: "Get instant guidance", d: "See high-level feasibility across key residency routes." },
    { k: "03", t: "Download your PDF", d: "A personalized summary to review or share." },
    { k: "04", t: "Follow clear next steps", d: "Timeline, documents, and path to proceed with confidence." },
  ],
  highlights: [
    { title: "Clear options", desc: "See likely routes by country with high-level requirements." },
    { title: "Fast signal", desc: "Rule-in/-out paths before deep advisory or document collection." },
    { title: "Shareable output", desc: "Download a neat PDF summary for personal records or counsel." },
  ],
  faqs: [
    {
      q: "Which countries can I check?",
      a: "Popular residency destinations with investment, employment, and family options. Coverage expands regularly and you’ll see what’s in-scope before you start.",
    },
    {
      q: "Do I need to sign up?",
      a: "No. You can optionally add your email to receive the PDF report.",
    },
    {
      q: "Is this legal advice?",
      a: "It’s an initial feasibility screen. For complex cases, an expert review is available.",
    },
    {
      q: "Can dependents be included?",
      a: "Yes. Indicate spouse/children in the checker to reflect eligibility accurately.",
    },
  ],
  startHref: "/eligibility?track=residency",
  startLabel: "Start Residency Check",
  crumbLabel: "Residency",
  crumbHref: "/residency",
  imageSlug: "portugal",
  imageRegion: "Europe",
  ctaTitle: "Complex situation or urgent timeline?",
  ctaCopy: "Speak with an advisor for bespoke guidance and document planning.",
};

export default function ResidencyEligibilityPage() {
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
              { "@type": "ListItem", position: 2, name: "Residency", item: "/residency" },
              { "@type": "ListItem", position: 3, name: "Eligibility Check", item: "/residency/eligibility-check" },
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
