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
  title: "Skilled Migration Eligibility Check (Free) | Points Estimate",
  description:
    "Estimate your eligibility for skilled migration pathways. Age, education, experience, and language — instant result + PDF.",
  alternates: { canonical: "/skilled/eligibility-check" },
  openGraph: {
    title: "Skilled Migration Eligibility Check (Free) | Points Estimate",
    description:
      "Rapid points-style pre-check for Canada, Australia and more. Instant estimate + downloadable summary.",
    url: "/skilled/eligibility-check",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skilled Migration Eligibility Check (Free) | Points Estimate",
    description:
      "Rapid points-style pre-check for Canada, Australia and more. Instant estimate + downloadable summary.",
  },
  robots: { index: true, follow: true },
};

const content: EligibilityCheckContent = {
  eyebrow: "Skilled · Points Pre-Check",
  eyebrowAr: "فحص النقاط",
  title: "How many points",
  titleAccent: "could you score?",
  subtitle:
    "Rapid, points-style pre-check for Canada, Australia and more. Get a clear indication of your chances and next steps with a downloadable PDF.",
  features: [
    "Age factor",
    "Education & equivalency",
    "Skilled work experience",
    "Language test scores",
  ],
  steps: [
    { k: "01", t: "Answer 6–8 quick questions", d: "Age, education, work history, language exam and spouse (if applicable)." },
    { k: "02", t: "Get instant points estimate", d: "See if you’re likely to meet common thresholds for popular programs." },
    { k: "03", t: "Download a personalized PDF", d: "Shareable summary with factors and improvement tips." },
    { k: "04", t: "Next steps guidance", d: "Routes to improve points, timelines and optional expert review." },
  ],
  highlights: [
    { title: "Covers popular points systems", desc: "Designed around common factors used by leading programs." },
    { title: "Actionable next steps", desc: "See where points come from and how to improve weak areas." },
    { title: "Shareable summary", desc: "Download a neat PDF to review or discuss with an advisor." },
  ],
  faqs: [
    {
      q: "Which countries are covered?",
      a: "We focus on popular points-based routes (e.g., Canada, Australia). Coverage expands continuously; the checker will indicate availability before you start.",
    },
    {
      q: "Is this the final score?",
      a: "It’s an indicative estimate based on your inputs. Official scoring depends on government assessment and evidence you submit.",
    },
    {
      q: "Do I need to upload documents?",
      a: "No. This is a quick pre-check. You can add details later if you book a consult.",
    },
    {
      q: "Can I improve my points?",
      a: "Often yes—language re-tests, education equivalency, additional experience, or provincial/state pathways may help. Your PDF includes suggestions.",
    },
  ],
  startHref: "/eligibility?track=skilled",
  startLabel: "Start Skilled Check",
  crumbLabel: "Skilled",
  crumbHref: "/skilled",
  imageSlug: "canada",
  imageRegion: "Americas",
  ctaTitle: "Close to the cutoff or not sure?",
  ctaCopy: "Get a quick review and a plan to boost your points.",
};

export default function SkilledEligibilityLanding() {
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
              { "@type": "ListItem", position: 2, name: "Skilled", item: "/skilled" },
              {
                "@type": "ListItem",
                position: 3,
                name: "Eligibility Check",
                item: "/skilled/eligibility-check",
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
