"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Fast, adaptive media backdrop.
 * - Always renders a poster <Image> (server-rendered) → this is the LCP element.
 * - On DESKTOP only (>=768px, no reduced-motion), mounts the <video> over it and
 *   fades it in once it can play. Below-fold videos mount only when near the viewport.
 * - On MOBILE the <video> is never created → the heavy .mp4 is never downloaded.
 */
export default function MediaBackdrop({
  poster,
  video,
  filter,
  priority = false,
  sizes = "100vw",
  alt = "",
}: {
  poster: string;
  video: string;
  filter?: string;
  priority?: boolean;
  sizes?: string;
  alt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!desktop || reduce) return; // mobile / reduced motion → poster only
    if (priority) { setShowVideo(true); return; }
    const el = ref.current;
    if (!el) { setShowVideo(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setShowVideo(true); io.disconnect(); } },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [priority]);

  return (
    <div ref={ref} className="absolute inset-0 h-full w-full overflow-hidden">
      <Image src={poster} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ filter }} />
      {showVideo ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ filter, opacity: ready ? 1 : 0 }}
        />
      ) : null}
    </div>
  );
}
