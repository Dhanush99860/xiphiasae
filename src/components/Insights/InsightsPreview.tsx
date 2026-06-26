import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getAllInsights } from "@/lib/insights-content";
import { Section, Container, Eyebrow, Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, DrawLine } from "@/components/motion";

type Item = {
  url: string;
  title?: string;
  heading?: string;
  excerpt?: string;
  summary?: string;

  // image fields across the codebase
  hero?: string;
  heroPoster?: string;
  image?: string;
  imageUrl?: string;
  cover?: string;

  kind?: string;
  category?: string;
  updated?: string;
  date?: string;
  publishedAt?: string;
  readingTime?: string | number;
  team?: string;
};

const pick = <T,>(...vals: (T | undefined)[]) =>
  vals.find((v) => v !== undefined && v !== null && v !== "") as T | undefined;

const toTime = (d?: string) => {
  if (!d) return NaN;
  const t = Date.parse(d);
  return Number.isNaN(t) ? NaN : t;
};

/**
 * Hydration-safe, UTC, no-Intl date formatter so server and client always
 * agree. Renders like "20 Jan 2026".
 */
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

const formatDate = (input?: string) => {
  if (!input) return "";
  const t = Date.parse(input);
  if (!Number.isFinite(t)) return input;
  const d = new Date(t);
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mon = MONTHS[d.getUTCMonth()];
  const yyyy = d.getUTCFullYear();
  return `${dd} ${mon} ${yyyy}`;
};

/** Fix common bad URLs (spaces, //cdn, missing scheme, Drive/Dropbox). */
function sanitizeImageUrl(raw?: string) {
  if (!raw) return undefined;
  let u = raw.trim();

  const g = u.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (g?.[1]) return `https://drive.google.com/uc?export=view&id=${g[1]}`;

  if (/dropbox\.com\/s\//i.test(u) && !/dl=1/.test(u)) {
    u += (u.includes("?") ? "&" : "?") + "dl=1";
  }

  if (/^(data:|blob:|https?:)/i.test(u)) return u.split(" ").join("%20");
  if (/^\/\//.test(u)) return "https:" + u;
  if (/^\//.test(u)) return u.split(" ").join("%20");
  if (/^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(u)) return "https://" + u;

  return u.split(" ").join("%20");
}

/**
 * Gold-framed image. Keeps every src/alt/sizes working across remote hosts
 * (Drive, Dropbox, bare domains) without next.config domain wiring. A faint
 * gold-tinted ground sits behind so a missing image degrades gracefully — no
 * client JS, no layout shift (the wrapper owns the aspect ratio).
 */
function Frame({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const safe = sanitizeImageUrl(src);
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-dune bg-[radial-gradient(120%_120%_at_20%_0%,rgba(212,175,55,0.14),transparent_55%)]"
      />
      {safe ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={safe}
          alt={alt}
          className={className}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          sizes={sizes}
        />
      ) : null}
    </>
  );
}

const ARROW =
  "size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5";

export default async function InsightsPreview({
  limit = 8,
  title = "News and Articles",
  viewAllHref = "/insights",
}: {
  limit?: number;
  title?: string;
  viewAllHref?: string;
}) {
  const { items } = await getAllInsights({ pageSize: limit });
  if (!items?.length) return null;

  // de-dupe by url
  const seen = new Set<string>();
  const cleaned: Item[] = [];
  for (const it of items) {
    if (!it?.url || seen.has(it.url)) continue;
    seen.add(it.url);
    cleaned.push(it as Item);
  }

  // newest first by updated -> date -> publishedAt
  cleaned.sort((a, b) => {
    const tb = toTime(b.updated ?? b.date ?? b.publishedAt);
    const ta = toTime(a.updated ?? a.date ?? a.publishedAt);
    if (Number.isNaN(tb) && Number.isNaN(ta)) return 0;
    if (Number.isNaN(tb)) return 1;
    if (Number.isNaN(ta)) return -1;
    return tb - ta;
  });

  const sorted = cleaned.slice(0, limit);
  const first = sorted[0];

  const hero = {
    url: first.url,
    title: (pick(first.title, first.heading) ?? "Untitled").toString(),
    excerpt: (pick(first.excerpt, first.summary) ?? "").toString(),
    kind: (pick(first.kind, first.category) ?? "Insight").toString(),
    when: formatDate(pick(first.updated, first.date, first.publishedAt)),
    img: pick(first.hero, first.heroPoster, first.image, first.imageUrl, first.cover),
    team: first.team,
    time: first.readingTime,
  };

  const rest = sorted.slice(1, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sorted.slice(0, 6).map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: it.url,
      name: (pick(it.title, it.heading) ?? "Insight").toString().slice(0, 180),
    })),
  };

  return (
    <Section
      as="section"
      tone="sand"
      spacing="md"
      contained={false}
      aria-labelledby="insights-preview-title"
    >
      <Container size="xl" className="relative">
        {/* ── Section opener ─────────────────────────────────────────── */}
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow arabic="رؤى" tone="gold">
                Insights
              </Eyebrow>
              <h2
                id="insights-preview-title"
                className="mt-6 font-sora text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.06] tracking-tight text-ink"
              >
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/55">
                Advisory perspectives on residency, mobility and life across the
                Emirates and beyond.
              </p>
            </div>

            <Button href={viewAllHref} variant="secondary" size="sm" className="group shrink-0">
              View all
              <ArrowRight aria-hidden className={ARROW} />
            </Button>
          </div>

          {/* Guiding gold line under the header */}
          <div className="relative mt-8 h-px">
            <DrawLine
              d="M0 0.5 H100"
              viewBox="0 0 100 1"
              className="absolute inset-0 h-px w-full opacity-70"
              strokeWidth={0.5}
              duration={1.4}
            />
          </div>
        </Reveal>

        {/* ── Hero + list ────────────────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* HERO card */}
          <Reveal className="lg:col-span-2" delay={0.05}>
            <article className="h-full">
              <Link
                href={hero.url}
                className="group relative block h-full overflow-hidden rounded-3xl border border-gold/45 bg-white transition-colors duration-500 hover:border-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                {/* Gold-framed media */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Frame
                    src={hero.img}
                    alt={hero.title}
                    priority
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
                  />
                  <div className="absolute start-5 top-5 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-gold/40 bg-gold/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
                      {hero.kind}
                    </span>
                    {hero.when && (
                      <span className="rounded-full bg-sand/60 px-3 py-1 text-[11px] font-medium text-ink/70 backdrop-blur-sm">
                        {hero.when}
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative p-6 sm:p-8">
                  <h3 className="font-sora text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">
                    {hero.title}
                  </h3>
                  {hero.excerpt && (
                    <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-ink/60">
                      {hero.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-ink/45">
                    {hero.team && <span>{hero.team}</span>}
                    {hero.time && (
                      <span>
                        {hero.team ? "· " : ""}
                        {typeof hero.time === "number"
                          ? `${hero.time} min read`
                          : hero.time}
                      </span>
                    )}
                  </div>

                  <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-gold">
                    Read the full story
                    <ArrowRight aria-hidden className={ARROW} />
                  </span>
                </div>
              </Link>
            </article>
          </Reveal>

          {/* LIST of recent insights */}
          <Stagger className="flex flex-col gap-4 lg:col-span-1" amount={0.15}>
            {rest.map((it) => {
              const itTitle = (pick(it.title, it.heading) ?? "Untitled").toString();
              const when = formatDate(pick(it.updated, it.date, it.publishedAt));
              const kind = (pick(it.kind, it.category) ?? "Insight").toString();
              const time = it.readingTime;
              const thumb = pick(
                it.hero,
                it.heroPoster,
                it.image,
                it.imageUrl,
                it.cover
              );

              return (
                <StaggerItem key={it.url}>
                  <Link
                    href={it.url}
                    className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-gold/45 bg-white p-3 transition-colors duration-500 hover:border-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                  >
                    {/* Gold-framed thumb */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-gold/15 transition-[box-shadow] duration-500 group-hover:ring-gold/45">
                      <Frame
                        src={thumb}
                        alt={itTitle}
                        sizes="80px"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.05]"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-ink/45">
                        <span className="rounded-full border border-gold/45 bg-gold/[0.06] px-2 py-0.5 font-semibold uppercase tracking-[0.14em] text-gold">
                          {kind}
                        </span>
                        {when && <span>{when}</span>}
                        {time && (
                          <span>
                            ·{" "}
                            {typeof time === "number"
                              ? `${time} min read`
                              : time}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1.5 line-clamp-2 font-sora text-[15px] font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-ink">
                        {itTitle}
                      </h3>
                      <span className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-semibold text-gold/80 transition-colors duration-300 group-hover:text-gold">
                        Read
                        <ArrowRight aria-hidden className={ARROW} />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Container>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Section>
  );
}
