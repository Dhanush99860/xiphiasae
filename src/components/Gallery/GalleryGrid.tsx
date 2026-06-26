// src/components/Gallery/GalleryGrid.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { GalleryItem } from "@/lib/gallery";
import { formatDateUS } from "@/lib/format";

const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });

function shimmer() {
  return (
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='20'>
         <defs><linearGradient id='g'>
          <stop stop-color='#0a0e1a' offset='20%'/><stop stop-color='#141a2b' offset='50%'/><stop stop-color='#0a0e1a' offset='80%'/></linearGradient></defs>
         <rect width='100%' height='100%' fill='#050810'/>
         <rect width='100%' height='100%' fill='url(#g)'>
           <animate attributeName='x' from='-100%' to='100%' dur='1.2s' repeatCount='indefinite'/>
         </rect>
       </svg>`
    )
  );
}

type Filter = "all" | string;

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(24);
  const [lightbox, setLightbox] = useState<{ list: GalleryItem[]; index: number } | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>(["all"]);
    items.forEach((i) => set.add(String(i.category)));
    return Array.from(set);
  }, [items]);

  const allForFilter = useMemo(
    () => (filter === "all" ? items : items.filter((i) => String(i.category) === filter)),
    [items, filter]
  );

  const rendered = useMemo(() => allForFilter.slice(0, visible), [allForFilter, visible]);
  const totalForFilter = allForFilter.length;

  useEffect(() => setVisible(24), [filter]);

  return (
    <>
      {/* Filter pills (mobile sticky) */}
      <div className="sticky top-0 z-10 -mx-4 mb-4 bg-pearl/80 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-pearl/70 md:-mx-6 md:px-6">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={[
                "whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium border transition",
                filter === c
                  ? "border-gold bg-gold text-[#0a1733]"
                  : "border-gold/45 bg-white/70 text-ink/70 hover:border-gold/65 hover:text-gold_deep",
              ].join(" ")}
              aria-pressed={filter === c}
            >
              {c === "all" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
          <span className="ml-auto shrink-0 self-center text-[11px] text-ink/40">
            {totalForFilter} photos
          </span>
        </div>
      </div>

      {/* Masonry via CSS columns (no heavy libs) */}
      <ul role="list" className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 [column-gap:0.75rem]">
        {rendered.map((it, i) => (
          <li key={it.id} className="mb-3 break-inside-avoid">
            <figure className="group overflow-hidden rounded-xl border border-gold/45 bg-white transition-all duration-300 hover:border-gold/65 hover:-translate-y-0.5">
              <button
                type="button"
                onClick={() => setLightbox({ list: allForFilter, index: allForFilter.findIndex((x) => x.id === it.id) })}
                className="relative block w-full"
                aria-label={`Open ${it.alt || "photo"} in lightbox`}
              >
                <div className="relative w-full" style={{ aspectRatio: `${it.w}/${it.h}` }}>
                  <Image
                    src={it.src}
                    alt={it.alt || "Gallery image"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 20vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    placeholder="blur"
                    blurDataURL={it.blurDataURL || shimmer()}
                    loading={i < 2 ? "eager" : "lazy"}
                    priority={i < 1}
                  />
                  {/* legibility veil + gold hairline at base */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                </div>
              </button>

              {(it.caption || it.date || it.category) && (
                <figcaption className="flex items-center justify-between gap-2 px-3 py-2">
                  <div className="min-w-0">
                    {it.caption && (
                      <p className="truncate text-[12px] font-medium text-ink">
                        {it.caption}
                      </p>
                    )}

                    {/* ✅ Deterministic date format: US style, UTC */}
                    {it.date && (
                      <time className="block text-[11px] text-ink/40">
                        {formatDateUS(it.date)}
                      </time>
                    )}
                  </div>

                  <span className="inline-flex items-center rounded-full border border-gold/45 bg-pearl px-2 py-[3px] text-[10px] text-ink/70">
                    <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                    <span className="font-medium text-ink/70">
                      {String(it.category).charAt(0).toUpperCase() + String(it.category).slice(1)}
                    </span>
                  </span>
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      {/* Load more */}
      {totalForFilter > rendered.length && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + 24)}
            className="rounded-full border border-gold/45 bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-gold/65 hover:text-gold_deep"
          >
            Load more
          </button>
        </div>
      )}

      {/* Lightbox (lazy-loaded via dynamic import) */}
      {lightbox && (
        <Lightbox
          items={lightbox.list}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
