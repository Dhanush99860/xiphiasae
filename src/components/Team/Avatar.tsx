// ==============================================
// components/primitives/Avatar.tsx
// ==============================================
import React from "react";
export function Avatar({ src, alt, size = "md" }: { src?: string; alt: string; size?: "sm" | "md" | "lg" }) {
  const cls = size === "lg" ? "h-20 w-20" : size === "sm" ? "h-8 w-8" : "h-12 w-12";
  return (
    <div className={`shrink-0 overflow-hidden rounded-2xl ${cls}`} style={{ border: "1px solid rgba(191,161,92,0.3)", background: "rgba(191,161,92,0.08)" }} aria-label={alt}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy"/>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs" style={{ color: "rgba(191,161,92,0.7)" }}>No Image</div>
      )}
    </div>
  );
}