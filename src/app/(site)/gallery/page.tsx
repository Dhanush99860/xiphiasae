// src/app/(site)/gallery/page.tsx
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond } from "next/font/google";
import GalleryView from "@/components/Gallery/GalleryView";
import { getGallery } from "@/lib/gallery";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

export const revalidate = 600; // cache at the edge for 10 mins

type HeadersLike = { get(name: string): string | null };

function getOriginFromHeaders(h: HeadersLike): string {
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const proto = h.get("x-forwarded-proto") || "https";
  return `${proto}://${host}`;
}

function getSiteOrigin(h: HeadersLike): string {
  // Prefer env for stable, correct canonical URLs in production
  const envSite =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (envSite) {
    // normalize
    const site = envSite.startsWith("http") ? envSite : `https://${envSite}`;
    return site.replace(/\/$/, "");
  }

  // fallback (dev / local / unknown host)
  return getOriginFromHeaders(h).replace(/\/$/, "");
}

// ---- Dynamic metadata (OG/Twitter), built from images ----
export async function generateMetadata(): Promise<Metadata> {
  const items = await getGallery();

  const h = await headers();
  const origin = getSiteOrigin(h);

  const ogImages = items.slice(0, 6).map((it) => {
    const url = it.src.startsWith("http") ? it.src : `${origin}${it.src}`;
    return { url, width: it.w || 1200, height: it.h || 630, alt: it.alt || "Gallery image" };
  });

  const title = "Gallery | XIPHIAS Immigration";
  const description =
    "Event highlights, team moments, office culture and CSR activities. Fast, mobile-first gallery.";

  return {
    title,
    description,
    alternates: { canonical: `${origin}/gallery` }, // ✅ absolute
    openGraph: {
      type: "website",
      url: `${origin}/gallery`,
      title,
      description: "Event highlights, team moments, office culture and CSR activities.",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "Event highlights, team moments, office culture and CSR activities.",
      images: ogImages.length ? [ogImages[0].url] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export default async function GalleryPage() {
  const items = await getGallery();

  const h = await headers();
  const origin = getSiteOrigin(h);

  // JSON-LD (CollectionPage + ImageGallery + Breadcrumbs)
  const imagesForLD = items.slice(0, 12).map((it) => ({
    "@type": "ImageObject",
    contentUrl: it.src.startsWith("http") ? it.src : `${origin}${it.src}`,
    caption: it.caption || it.alt || "Gallery image",
    representativeOfPage: false,
    width: it.w,
    height: it.h,
  }));

  const collectionLD = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Gallery",
    url: `${origin}/gallery`,
    description: "Photos from events, team, office and CSR at XIPHIAS Immigration.",
    hasPart: {
      "@type": "ImageGallery",
      name: "Gallery Images",
      image: imagesForLD,
    },
  };

  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: origin },
      { "@type": "ListItem", position: 2, name: "Gallery", item: `${origin}/gallery` },
    ],
  };

  return (
    <>
      <GalleryView items={items} serifClass={serif.className} />

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD needs raw string
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLD) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD needs raw string
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />
    </>
  );
}