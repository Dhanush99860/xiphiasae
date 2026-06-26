import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond } from "next/font/google";
import nextDynamic from "next/dynamic";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Navy/gold "Tool Panel" shell; it wraps the existing interactive <Flow/> wizard
// (logic, scoring, lead-gate, API submit and results preserved verbatim).
const EligibilityToolShell = nextDynamic(
  () => import("@/components/Eligibility/EligibilityToolShell")
);

/* ── SEO ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:
    "Immigration Assessment Preview | Residency, Citizenship, Corporate & Skilled",
  description:
    "Start with a guided XIPHIAS assessment, receive a branded preview by email, and register for a detailed personal report.",
  keywords: [
    "eligibility check",
    "residency eligibility",
    "citizenship eligibility",
    "corporate visa eligibility",
    "skilled migration eligibility",
  ],
  alternates: { canonical: "/eligibility" },
  openGraph: {
    title: "Immigration Assessment Preview | XIPHIAS Immigration",
    description:
      "Start with a guided XIPHIAS assessment, receive a branded preview by email, and register for a detailed personal report.",
    url: "https://www.xiphiasimmigration.com/eligibility",
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/xiphias-immigration.png",
        width: 1200,
        height: 630,
        alt: "Immigration Assessment Preview - XIPHIAS Immigration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Immigration Assessment Preview | XIPHIAS Immigration",
    description:
      "Answer a few guided questions and receive a branded assessment preview.",
    images: ["/xiphias-immigration.png"],
  },
};

/** Ensure this page is rendered dynamically (avoids SSG + searchParams bailouts) */
export const dynamic = "force-dynamic";
export const revalidate = 0;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this assessment free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. It’s a free preliminary assessment to guide your next steps.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate are the results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They’re indicative and based on your answers. Final outcomes depend on official review.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to share my email to get the preview?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Enter your name and email to receive the assessment trailer and view the preview. The full detailed report is unlocked after registration.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take?",
      acceptedAnswer: { "@type": "Answer", text: "Typically 2–4 minutes." },
    },
    {
      "@type": "Question",
      name: "Is my data secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We keep your information confidential and never sell it to third parties.",
      },
    },
  ],
};

/* ── Page ────────────────────────────────────────────────────────────── */
export default function EligibilityPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <EligibilityToolShell serifClass={serif.className} />
    </>
  );
}
