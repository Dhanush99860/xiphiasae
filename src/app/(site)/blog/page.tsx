// src/app/(site)/blog/page.tsx
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

// SEO metadata for the blog listing page
export const metadata: Metadata = {
  title: "Blog – Immigration Stories & Updates | XIPHIAS Immigration",
  description:
    "Read our latest blog posts on immigration stories, expert tips and program updates. Stay informed with XIPHIAS Immigration.",
  alternates: { canonical: "/blog" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Blog – Immigration Stories & Updates",
    description:
      "Read our latest blog posts on immigration stories, expert tips and program updates. Stay informed with XIPHIAS Immigration.",
    url: "/blog",
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/xiphias-immigration.png",
        width: 1200,
        height: 630,
        alt: "Blog – Immigration Stories & Updates – XIPHIAS Immigration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog – Immigration Stories & Updates",
    description:
      "Read our latest blog posts on immigration stories, expert tips and program updates. Stay informed with XIPHIAS Immigration.",
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
  const category = m.tags && m.tags.length ? titleCase(m.tags[0]) : "Blog";
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

export default async function BlogListPage() {
  const { items } = await getAllInsights({ kind: "blog", page: 1, pageSize: 50 });
  const posts = items.map(toPost);

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog – Immigration Stories & Updates",
    url: `${SITE_URL}/blog`,
    description:
      "Immigration stories, expert tips and programme updates from XIPHIAS Immigration.",
  };
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "XIPHIAS Immigration Blog",
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
        eyebrow="Insights & Stories"
        eyebrowAr="مدوّنة"
        title="Stories that move lives across borders."
        intro="Immigration stories, expert tips and programme updates — the people, the routes and the milestones behind a second home, from Dubai outward to the world."
        posts={posts}
      />
    </>
  );
}
