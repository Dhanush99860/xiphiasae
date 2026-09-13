// src/app/(site)/articles/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import nextDynamic from "next/dynamic";
import { cormorant } from "@/lib/local-fonts";
import { getInsightBySlug } from "@/lib/insights-content";
import ArticleDetail from "@/components/Content/ArticleDetail";

const InsightJsonLd = nextDynamic(() => import("@/components/SEO/InsightJsonLd"));

const serif = cormorant;

const SITE_URL = "https://www.xiphiasimmigration.com";

function formatDate(input?: string) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(d);
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

const absUrl = (u: string) => (u.startsWith("http://") || u.startsWith("https://") ? u : `${SITE_URL}${u.startsWith("/") ? u : `/${u}`}`);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const record = await getInsightBySlug("articles", slug);

  if (!record) {
    return {
      title: "Not Found",
      robots: { index: false, follow: false },
    };
  }

  const metaTitle = record.seoTitle || record.title;
  const description = record.seoDescription || record.summary || `Article: ${record.title}`;

  const defaultCanonical = record.url ? absUrl(record.url) : `${SITE_URL}/articles/${slug}`;
  const canonical = record.canonical
    ? record.canonical.startsWith("http")
      ? record.canonical
      : absUrl(record.canonical)
    : defaultCanonical;
  const hero = record.hero ? absUrl(record.hero) : undefined;

  return {
    title: metaTitle,
    description,
    alternates: { canonical },
    robots: record.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: record.title,
      description,
      type: "article",
      url: canonical,
      siteName: "XIPHIAS Immigration",
      locale: "en_US",
      images: hero
        ? [
            {
              url: hero,
              width: 1200,
              height: 630,
              alt: `${record.title} – XIPHIAS Immigration`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: hero ? "summary_large_image" : "summary",
      title: record.title,
      description,
      images: hero ? [hero] : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const record = await getInsightBySlug("articles", slug);

  if (!record) notFound();

  const heroImage = record.hero || record.heroPoster || "/images/articles/nexus-of-global-mobility.webp";

  return (
    <>
      <InsightJsonLd record={record} />
      <ArticleDetail
        serifClass={serif.className}
        eyebrow="Immigration Insights"
        eyebrowAr="مقالات"
        title={record.title}
        date={formatDate(record.updated || record.date)}
        author={record.author}
        category={record.country?.[0] || record.program?.[0] || record.tags?.[0]}
        heroImage={heroImage}
        backHref="/articles"
        backLabel="Articles"
      >
        {record.content}
      </ArticleDetail>
    </>
  );
}
