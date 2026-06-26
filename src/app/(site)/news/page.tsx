// app/(site)/news/page.tsx
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

// SEO metadata for the news listing page
export const metadata: Metadata = {
  title: "News – Immigration News & Updates | XIPHIAS Immigration",
  description:
    "Get the latest news and updates on immigration policies, programs and industry trends from XIPHIAS Immigration.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News – Immigration News & Updates",
    description:
      "Get the latest news and updates on immigration policies, programs and industry trends from XIPHIAS Immigration.",
    url: `${SITE_URL}/news`,
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/xiphias-immigration.png",
        width: 1200,
        height: 630,
        alt: "News – Immigration News & Updates – XIPHIAS Immigration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "News – Immigration News & Updates",
    description:
      "Get the latest news and updates on immigration policies, programs and industry trends from XIPHIAS Immigration.",
    images: ["/xiphias-immigration.png"],
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
  const category = m.tags && m.tags.length ? titleCase(m.tags[0]) : "News";
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

export default async function NewsListPage() {
  const { items } = await getAllInsights({ kind: "news", page: 1, pageSize: 50 });
  const posts = items.map(toPost);

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "News – Immigration News & Updates",
    url: `${SITE_URL}/news`,
    description:
      "Policy shifts, programme launches and industry trends across residency and citizenship.",
  };
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "XIPHIAS Immigration News",
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
        eyebrow="Latest Updates"
        eyebrowAr="أخبار"
        title="The news shaping global mobility."
        intro="Policy shifts, programme launches and industry trends across residency and citizenship — tracked from the UAE and reported for the families and investors who plan ahead."
        posts={posts}
      />
    </>
  );
}
