"use client";

import { useEffect } from "react";
import { Cormorant_Garamond } from "next/font/google";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
      style={{ background: NAVY, color: "#eef3fb" }}
    >
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.34em]"
        style={{ color: GOLD }}
      >
        Something went wrong
      </p>
      <h1
        className={`${serif.className} mt-5 text-[clamp(3rem,8vw,6rem)] font-medium leading-none`}
        style={{ color: "#eef3fb" }}
      >
        Unexpected error.
      </h1>
      <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/55">
        We encountered an issue loading this page. Try refreshing — if the problem
        persists, contact our team.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]"
          style={{ background: GOLD, color: NAVY }}
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]"
        >
          Return home
        </a>
      </div>
      {error.digest ? (
        <p className="mt-10 text-[11px] text-white/20">
          Error ref: {error.digest}
        </p>
      ) : null}
    </div>
  );
}
