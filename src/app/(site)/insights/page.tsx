// src/app/(site)/insights/page.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { getAllInsights } from "@/lib/insights-content";
import { JsonLd } from "@/lib/seo";
import ContentIndex, { type ContentIndexPost } from "@/components/Content/ContentIndex";
import type { InsightMeta } from "@/types/insights";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = "https://www.xiphiasimmigration.com";
const OG_IMAGE = "/xiphias-immigration.png";

// Map internal kind → readable display label for the filter chips
const KIND_LABEL: Record<string, string> = {
  blog: "Blog",
  articles: "Articles",
  news: "News",
  media: "Media",
};

export const metadata: Metadata = {
  title: "Immigration Insights — Guides & Programme Updates | XIPHIAS",
  description:
    "Expert guides on citizenship by investment, golden visas, skilled migration & corporate mobility — written by XIPHIAS advisors.",
  alternates: { canonical: "/insights" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Immigration Insights — Guides & Programme Updates | XIPHIAS",
    description: "Citizenship, golden visa & skilled migration guides, programme updates and news — written by XIPHIAS immigration advisors.",
    url: `${SITE_URL}/insights`,
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "XIPHIAS Insights" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights — The XIPHIAS Journal",
    description: "Programme intelligence & mobility guidance.",
    images: [OG_IMAGE],
  },
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function toPost(m: InsightMeta): ContentIndexPost {
  return {
    title: m.title,
    slug: m.slug,
    href: m.url,
    date: m.updated || m.date || "",
    category: KIND_LABEL[m.kind] ?? m.kind,
    excerpt: m.summary ?? "",
    image: m.hero || undefined,
    author: m.author,
  };
}

export default async function InsightsHubPage() {
  // No `kind` filter — fetches all: blog + articles + news + media together
  const { items, total } = await getAllInsights({ page: 1, pageSize: 50 });
  const posts = items.map(toPost);

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Insights — The XIPHIAS Journal",
    url: `${SITE_URL}/insights`,
    description:
      "Programme intelligence, mobility data and practical guidance on residency, citizenship, golden visas and skilled migration.",
  };
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "XIPHIAS Insights",
    itemListElement: posts.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_URL}${p.href}`,
      name: p.title,
    })),
  };

  return (
    <>
      <JsonLd data={collectionLd} />
      <JsonLd data={itemListLd} />
      <ContentIndex
        serifClass={serif.className}
        eyebrow="Insights & Intelligence"
        eyebrowAr="رؤى"
        title="The XIPHIAS journal."
        intro="Programme intelligence, mobility data and practical guidance on residency, citizenship, golden visas and skilled migration — written by the advisors who do the work."
        posts={posts}
        allLabel="All"
      />
    </>
  );
}
