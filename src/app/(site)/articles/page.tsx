// src/app/(site)/articles/page.tsx
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

// SEO metadata for the articles listing page
export const metadata: Metadata = {
  title: "Articles – Immigration Insights & Updates | XIPHIAS Immigration",
  description:
    "Stay informed with the latest articles on investment migration, residency and citizenship programs. Browse our expert insights and updates.",
  alternates: { canonical: "/articles" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Articles – Immigration Insights & Updates",
    description:
      "Stay informed with the latest articles on investment migration, residency and citizenship programs. Browse our expert insights and updates.",
    url: `${SITE_URL}/articles`,
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}${OG_IMAGE}`,
        width: 1200,
        height: 630,
        alt: "Articles – Immigration Insights & Updates – XIPHIAS Immigration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles – Immigration Insights & Updates",
    description:
      "Stay informed with the latest articles on investment migration, residency and citizenship programs. Browse our expert insights and updates.",
    images: [`${SITE_URL}${OG_IMAGE}`],
  },
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

/** Title-case a tag for use as a topic chip label. */
function titleCase(s: string) {
  return s
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Map an InsightMeta → ContentIndexPost (real cover image preserved). */
function toPost(m: InsightMeta): ContentIndexPost {
  const category = m.tags && m.tags.length ? titleCase(m.tags[0]) : "Articles";
  return {
    title: m.title,
    slug: m.slug,
    href: m.url,
    date: m.updated || m.date || "",
    category,
    excerpt: m.summary ?? "",
    image: m.hero || undefined,
    author: m.author,
  };
}

export default async function ArticlesListPage() {
  // Load all articles (high cap covers the full set on one filterable index).
  const { items } = await getAllInsights({ kind: "articles", page: 1, pageSize: 50 });
  const posts = items.map(toPost);

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Articles – Immigration Insights & Updates",
    url: `${SITE_URL}/articles`,
    description:
      "Expert analysis on residency, citizenship and investment-migration programmes.",
  };
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "XIPHIAS Immigration Articles",
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
        eyebrow="Immigration Insights"
        eyebrowAr="مقالات"
        title="Deep insight on investment migration."
        intro="Expert analysis on residency, citizenship and investment-migration programmes — long-form perspective to help you choose the right country and the right route with confidence."
        posts={posts}
      />
    </>
  );
}
