"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import { ChevronRight } from "lucide-react"; // ✅ modern icon

const formatSegment = (segment: string) => {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

export default function Breadcrumb() {
  const pathname = usePathname();

  const segments = useMemo(() => {
    if (!pathname) return [];
    return pathname.split("/").filter(Boolean);
  }, [pathname]);

  return (
    <nav className="w-full" aria-label="Breadcrumb">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center flex-wrap gap-2 text-sm md:text-base text-ink/55">
          {/* Home link */}
          <li>
            <Link
              href="/"
              className="font-medium text-ink/70 transition-colors hover:text-gold"
            >
              Home
            </Link>
          </li>

          {segments.map((segment, idx) => {
            const href = "/" + segments.slice(0, idx + 1).join("/");
            const isLast = idx === segments.length - 1;

            return (
              <li key={idx} className="flex items-center gap-2">
                {/* Chevron */}
                <ChevronRight className="w-4 h-4 text-gold/60" />

                {isLast ? (
                  <span className="rounded-md border border-gold/40 bg-white px-2 py-1 font-semibold text-gold">
                    {formatSegment(segment)}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="font-medium text-ink/70 transition-colors hover:text-gold"
                  >
                    {formatSegment(segment)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

/**
 * ✅ SEO helper to auto-generate meta tags
 */
export function useBreadcrumbSEO(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1] || "Articles";

  const title = `${formatSegment(last)} | XIPHIAS Immigration`;
  const description = `Explore ${formatSegment(
    last,
  )} insights and resources with XIPHIAS Immigration. Stay updated with guides, tips, and expert advice.`;

  return { title, description };
}
