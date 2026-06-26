// src/app/(site)/media/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";
// Dynamically import media detail components to reduce initial bundle size.
import nextDynamic from "next/dynamic";
const InsightJsonLd = nextDynamic(() => import("@/components/SEO/InsightJsonLd"));
import ArticleDetail from "@/components/Content/ArticleDetail";
import { getInsightBySlug } from "@/lib/insights-content";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

function formatDate(input?: string) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export const revalidate = 86400;

// Next 15: params is a Promise
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; // ✅ await
  const record = await getInsightBySlug("media", slug);
  if (!record) return { title: "Not Found" };

  const description = record.summary || `Media: ${record.title}`;
  return {
    title: record.title,
    description,
    alternates: { canonical: record.url },
    openGraph: {
      title: record.title,
      description,
      type: "video.other",
      url: record.url,
      siteName: "XIPHIAS Immigration",
      locale: "en_US",
      images: record.hero
        ? [
            {
              url: record.hero,
              width: 1200,
              height: 630,
              alt: `${record.title} – XIPHIAS Immigration`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: record.hero ? "summary_large_image" : "summary",
      title: record.title,
      description,
      images: record.hero ? [record.hero] : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params; // ✅ await
  const record = await getInsightBySlug("media", slug);
  if (!record) return notFound(); // ✅ proper 404

  const displayDate = formatDate(record.updated || record.date);

  return (
    <ArticleDetail
      serifClass={serif.className}
      eyebrow="Media"
      title={record.title}
      date={displayDate || "Media"}
      author={record.author || undefined}
      category={record.country?.[0] || record.program?.[0] || undefined}
      heroImage={record.heroPoster || record.hero || undefined}
      backHref="/media"
      backLabel="Media"
    >
      {/* JSON-LD (preserved) */}
      <InsightJsonLd record={record} />

      {record.summary ? (
        <p className="lead">
          <strong>{record.summary}</strong>
        </p>
      ) : null}

      {/* Compiled MDX body (real content, preserved) */}
      {record.content}
    </ArticleDetail>
  );
}