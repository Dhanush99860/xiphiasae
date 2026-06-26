// src/app/(site)/news/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import nextDynamic from "next/dynamic";
import { Cormorant_Garamond } from "next/font/google";
const InsightJsonLd = nextDynamic(() => import("@/components/SEO/InsightJsonLd"));
import { getInsightBySlug } from "@/lib/insights-content";
import ArticleDetail from "@/components/Content/ArticleDetail";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

function formatDate(input?: string) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(d);
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// In Next 15, params is a Promise
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = await getInsightBySlug("news", slug);
  if (!record) return { title: "Not Found" };

  const description = record.summary || `News: ${record.title}`;
  return {
    title: record.title,
    description,
    alternates: { canonical: record.url },
    openGraph: {
      title: record.title,
      description,
      type: "article",
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
  const { slug } = await params;
  const record = await getInsightBySlug("news", slug);
  if (!record) return notFound();

  const heroImage = record.hero || record.heroPoster || undefined;

  return (
    <>
      <InsightJsonLd record={record} />
      <ArticleDetail
        serifClass={serif.className}
        eyebrow="Newsroom"
        eyebrowAr="أخبار"
        title={record.title}
        date={formatDate(record.updated || record.date)}
        author={record.author}
        category={record.country?.[0] || record.program?.[0] || record.tags?.[0]}
        heroImage={heroImage}
        backHref="/news"
        backLabel="News"
      >
        {record.content}
      </ArticleDetail>
    </>
  );
}
