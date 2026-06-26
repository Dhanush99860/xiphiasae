// app/(site)/media/page.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { getAllInsights } from "@/lib/insights-content";
import ContentIndex, { type ContentIndexPost } from "@/components/Content/ContentIndex";
import type { InsightMeta } from "@/types/insights";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// SEO metadata for the media listing page
export const metadata: Metadata = {
  title: "Media – Videos & Interviews | XIPHIAS Immigration",
  description:
    "Watch our latest interviews, webinars and media appearances covering investment migration, residency and citizenship programs.",
  alternates: { canonical: "/media" },
  openGraph: {
    title: "Media – Videos & Interviews",
    description:
      "Watch our latest interviews, webinars and media appearances covering investment migration, residency and citizenship programs.",
    url: "https://www.xiphiasimmigration.com/media",
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/xiphias-immigration.png",
        width: 1200,
        height: 630,
        alt: "Media – Videos & Interviews – XIPHIAS Immigration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Media – Videos & Interviews",
    description:
      "Watch our latest interviews, webinars and media appearances covering investment migration, residency and citizenship programs.",
    images: ["/xiphias-immigration.png"],
  },
};

export const revalidate = 86400;

const SITE_URL = "https://www.xiphiasimmigration.com";

// Derive a sensible topic for a media item: prefer first country/program/tag, else generic.
function categoryFor(m: InsightMeta): string {
  const pick =
    m.country?.[0] ||
    m.program?.[0] ||
    m.tags?.[0] ||
    "Media";
  return pick;
}

export default async function MediaListPage() {
  // ContentIndex provides its own topic filtering, so load the full media set.
  const { items, total } = await getAllInsights({
    kind: "media",
    page: 1,
    pageSize: 50,
  });

  // Map InsightMeta → ContentIndex Post shape (use the media thumbnail/hero).
  const posts: ContentIndexPost[] = items.map((m) => ({
    title: m.title,
    slug: m.slug,
    href: m.url,
    date: m.updated || m.date || "",
    category: categoryFor(m),
    excerpt:
      m.summary ||
      `Watch ${m.title} — a XIPHIAS media feature on investment migration, residency and citizenship.`,
    image: m.hero || m.heroPoster,
    author: m.author,
  }));

  // CollectionPage + ItemList JSON-LD (real media data preserved).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "XIPHIAS Media – Videos & Interviews",
    url: `${SITE_URL}/media`,
    description:
      "Interviews, webinars and media appearances covering investment migration, residency and citizenship programmes.",
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: total,
      itemListElement: posts.map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}${p.href}`,
        item: {
          "@type": "VideoObject",
          name: p.title,
          description: p.excerpt,
          uploadDate: p.date || undefined,
          thumbnailUrl: p.image ? [`${SITE_URL}${p.image}`] : undefined,
          publisher: {
            "@type": "Organization",
            name: "XIPHIAS Immigration",
            url: SITE_URL,
          },
        },
      })),
    },
  };

  return (
    <>
      <ContentIndex
        serifClass={serif.className}
        eyebrow="Media Library"
        eyebrowAr="إعلام"
        title="Voices, interviews and milestones on film."
        intro="Interviews, webinars and media appearances covering investment migration, residency and citizenship programmes — the XIPHIAS story, on the record."
        posts={posts}
        allLabel="All Media"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
