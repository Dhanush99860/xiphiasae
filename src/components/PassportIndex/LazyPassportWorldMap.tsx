"use client";

import dynamic from "next/dynamic";
import type { PassportRecord } from "@/data/passport-index";

type Props = {
  records: PassportRecord[];
  highlightedCodes?: string[];
};

function PassportWorldMapSkeleton() {
  return (
    <div className="grid min-h-[620px] overflow-hidden rounded-2xl border border-white/12 bg-[#0a1733] text-white shadow-2xl shadow-black/40 lg:grid-cols-[340px_1fr]">
      <div className="border-b border-white/10 bg-[#0c1f3f] p-4 lg:border-b-0 lg:border-r lg:border-white/10">
        <div className="h-11 rounded-md bg-[#bfa15c]/40" />
        <div className="mt-5 space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-10 rounded-md bg-white/10" />
          ))}
        </div>
      </div>
      <div className="relative min-h-[620px] bg-[#050810]">
        <div className="absolute inset-8 rounded-lg border border-white/12 bg-[#bfa15c]/[0.05]" />
        <div className="absolute left-1/2 top-1/2 h-28 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bfa15c]/15 motion-safe:animate-pulse" />
        <div className="absolute bottom-5 right-5 h-64 w-96 max-w-[calc(100%-2.5rem)] rounded-lg bg-white/10" />
      </div>
    </div>
  );
}

const PassportWorldMap = dynamic(() => import("@/components/PassportIndex/PassportWorldMap"), {
  ssr: false,
  loading: () => <PassportWorldMapSkeleton />,
});

export default function LazyPassportWorldMap(props: Props) {
  return <PassportWorldMap {...props} />;
}
