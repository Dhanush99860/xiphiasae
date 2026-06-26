import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import type { EventRecord } from "@/types/events";
import { getAllEvents } from "@/lib/events-data";
import ContentIndex, { type ContentIndexPost } from "@/components/Content/ContentIndex";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = "https://www.xiphiasimmigration.com";
const OG_IMAGE = "/xiphias-immigration.png";
const BASE_TITLE = "Events | XIPHIAS Immigration";
const BASE_DESCRIPTION =
  "Explore XIPHIAS events from 2011 to the present, including summits, workshops, forums, and client engagement milestones.";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: BASE_TITLE,
    description: BASE_DESCRIPTION,
    keywords: [
      "XIPHIAS events",
      "immigration events",
      "investment migration forums",
      "global mobility conferences",
      "XIPHIAS seminars",
      "migration advisory events",
    ],
    robots: { index: true, follow: true },
    alternates: { canonical: `${SITE_URL}/events` },
    openGraph: {
      title: BASE_TITLE,
      description: BASE_DESCRIPTION,
      url: `${SITE_URL}/events`,
      siteName: "XIPHIAS Immigration",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}${OG_IMAGE}`,
          width: 1200,
          height: 630,
          alt: "XIPHIAS events overview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: BASE_TITLE,
      description: BASE_DESCRIPTION,
      images: [`${SITE_URL}${OG_IMAGE}`],
    },
  };
}

// The shared logo placeholder is not a real cover — let ContentIndex paint its
// category-tinted fallback instead of showing the logo as a "photo".
const PLACEHOLDER = "/images/logo/xiphias-immigration.png";

// Derive a topic from the event location (city, country → use the country/region).
function categoryFor(event: EventRecord): string {
  if (!event.location) return "Events";
  const parts = event.location.split(",").map((p) => p.trim());
  return parts[parts.length - 1] || event.location;
}

function coverFor(event: EventRecord): string | undefined {
  const src = event.photos?.[0]?.src;
  if (!src || src === PLACEHOLDER) return undefined;
  return src;
}

export default function EventsPage() {
  const events = getAllEvents();
  const newestYear = events[0]?.date.slice(0, 4);
  const oldestYear = events[events.length - 1]?.date.slice(0, 4);

  // Map EventRecord → ContentIndex Post shape (event date + first real photo).
  const posts: ContentIndexPost[] = events.map((event) => ({
    title: event.title,
    slug: event.slug,
    href: `/events/${event.slug}`,
    date: event.date,
    category: categoryFor(event),
    excerpt: event.summary || event.description.slice(0, 180).trim(),
    image: coverFor(event),
  }));

  // CollectionPage + ItemList JSON-LD over the full events archive.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "XIPHIAS Events",
    url: `${SITE_URL}/events`,
    description: BASE_DESCRIPTION,
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: events.length,
      itemListElement: events.map((event, index) => {
        const thumb = event.photos?.[0]?.src;
        return {
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/events/${event.slug}`,
          item: {
            "@type": "Event",
            name: event.title,
            startDate: event.date,
            description: event.summary || event.description.slice(0, 180).trim(),
            image: thumb ? [`${SITE_URL}${thumb}`] : undefined,
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
          },
        };
      }),
    },
  };

  const span =
    oldestYear && newestYear ? `${oldestYear}–${newestYear}` : "Since 2011";

  return (
    <>
      <ContentIndex
        serifClass={serif.className}
        eyebrow="Events Archive"
        eyebrowAr="فعاليات"
        title="Where the migration story is told in person."
        intro={`Company events spanning ${span} — forums, migration seminars and strategic sessions, with curated photo highlights and detailed records of every gathering.`}
        posts={posts}
        allLabel="All Events"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
