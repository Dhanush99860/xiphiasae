import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";
import { CalendarDays, Camera, MapPin, Tag } from "lucide-react";
import { formatDateLong } from "@/lib/date-format";
import { getAllEvents, getEventBySlug } from "@/lib/events-data";
import ArticleDetail from "@/components/Content/ArticleDetail";

const SITE_URL = "https://www.xiphiasimmigration.com";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const revalidate = 86400;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found | XIPHIAS Immigration",
      robots: { index: false, follow: false },
    };
  }

  const firstParagraph = event.description
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .find(Boolean);

  const description = event.summary || firstParagraph || "Event details";
  const canonical = `${SITE_URL}/events/${event.slug}`;
  const ogImage = event.photos?.[0]?.src;
  const ogImageAbsolute = ogImage
    ? `${SITE_URL}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`
    : undefined;

  return {
    title: `${event.title} | Events | XIPHIAS Immigration`,
    description,
    keywords: [
      "XIPHIAS event details",
      event.title,
      event.location ?? "immigration event",
      "migration seminar",
      "investment migration",
    ],
    alternates: { canonical },
    openGraph: {
      title: `${event.title} | Events`,
      description,
      url: canonical,
      type: "article",
      siteName: "XIPHIAS Immigration",
      locale: "en_US",
      images: ogImageAbsolute
        ? [
            {
              url: ogImageAbsolute,
              width: event.photos?.[0]?.w ?? 1200,
              height: event.photos?.[0]?.h ?? 630,
              alt: event.photos?.[0]?.alt || event.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: ogImageAbsolute ? "summary_large_image" : "summary",
      title: `${event.title} | Events`,
      description,
      images: ogImageAbsolute ? [ogImageAbsolute] : undefined,
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const allEvents = getAllEvents();
  const currentIndex = allEvents.findIndex((entry) => entry.slug === event.slug);
  const newerEvent = currentIndex > 0 ? allEvents[currentIndex - 1] : undefined;
  const olderEvent =
    currentIndex >= 0 && currentIndex < allEvents.length - 1
      ? allEvents[currentIndex + 1]
      : undefined;

  const availablePhotos = (event.photos ?? []).filter((photo) =>
    isLocalPublicAssetAvailable(photo.src),
  );
  const heroPhoto = availablePhotos[0];

  const paragraphs = event.description
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description: event.summary || paragraphs[0] || event.description,
    image: availablePhotos.map((photo) => `${SITE_URL}${photo.src}`),
    location: event.location
      ? {
          "@type": "Place",
          name: event.location,
        }
      : undefined,
    organizer: {
      "@type": "Organization",
      name: "XIPHIAS Immigration",
      url: SITE_URL,
    },
    url: `${SITE_URL}/events/${event.slug}`,
  };

  return (
    <ArticleDetail
      serifClass={serif.className}
      eyebrow="Event"
      title={event.title}
      date={formatDateLong(event.date)}
      category={event.location ?? undefined}
      heroImage={heroPhoto?.src}
      backHref="/events"
      backLabel="Events"
    >
      {/* JSON-LD (preserved verbatim) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      {/* Event meta chips */}
      <div className="not-prose mb-8 flex flex-wrap items-center gap-2 text-sm">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bfa15c]/40 bg-[#bfa15c]/[0.06] px-3 py-1 text-[#0c1f3f]">
          <CalendarDays className="h-4 w-4 text-[#a87d1f]" />
          {formatDateLong(event.date)}
        </span>
        {event.location ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bfa15c]/40 bg-[#bfa15c]/[0.06] px-3 py-1 text-[#0c1f3f]">
            <MapPin className="h-4 w-4 text-[#a87d1f]" />
            {event.location}
          </span>
        ) : null}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bfa15c]/40 bg-[#bfa15c]/[0.06] px-3 py-1 text-[#0c1f3f]">
          <Camera className="h-4 w-4 text-[#a87d1f]" />
          {availablePhotos.length} {availablePhotos.length === 1 ? "photo" : "photos"}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bfa15c]/40 bg-[#bfa15c]/[0.06] px-3 py-1 text-[#0c1f3f]">
          <Tag className="h-4 w-4 text-[#a87d1f]" />
          {event.slug}
        </span>
      </div>

      {/* Executive summary */}
      {event.summary ? (
        <>
          <h2>Executive Summary</h2>
          <p>{event.summary}</p>
        </>
      ) : null}

      {/* Overview */}
      <h2>Event Overview</h2>
      {paragraphs.map((paragraph, index) => (
        <p key={`${event.slug}-paragraph-${index + 1}`}>{paragraph}</p>
      ))}

      {/* Gallery — real, full-bleed-within-column images */}
      {availablePhotos.length > 0 ? (
        <>
          <h2>Event Gallery</h2>
          <div className="not-prose mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {availablePhotos.map((photo, index) => (
              <figure
                key={`${event.slug}-${photo.src}-${index}`}
                className="overflow-hidden rounded-xl border border-[#0c1f3f]/10 bg-white shadow-[0_18px_44px_-28px_rgba(10,23,51,0.4)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt || `${event.title} photo ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                {photo.caption ? (
                  <figcaption className="px-3 py-2 text-xs text-[#142745]/60">
                    {photo.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </>
      ) : null}

      {/* Explore more */}
      {newerEvent || olderEvent ? (
        <>
          <h2>Explore More Events</h2>
          <div className="not-prose mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {newerEvent ? (
              <Link
                href={`/events/${newerEvent.slug}`}
                className="rounded-xl border border-[#bfa15c]/40 bg-white p-4 transition-all hover:border-[#bfa15c] hover:-translate-y-0.5 motion-reduce:transform-none"
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#142745]/45">
                  Newer event
                </p>
                <p className="mt-1 font-semibold text-[#0c1f3f]">{newerEvent.title}</p>
              </Link>
            ) : (
              <div />
            )}

            {olderEvent ? (
              <Link
                href={`/events/${olderEvent.slug}`}
                className="rounded-xl border border-[#bfa15c]/40 bg-white p-4 transition-all hover:border-[#bfa15c] hover:-translate-y-0.5 motion-reduce:transform-none"
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#142745]/45">
                  Older event
                </p>
                <p className="mt-1 font-semibold text-[#0c1f3f]">{olderEvent.title}</p>
              </Link>
            ) : null}
          </div>
        </>
      ) : null}
    </ArticleDetail>
  );
}

function isLocalPublicAssetAvailable(src: string): boolean {
  if (!src.startsWith("/")) return true;
  const normalized = src.split("?")[0].split("#")[0];
  const fullPath = path.join(process.cwd(), "public", normalized);
  return fs.existsSync(fullPath);
}
