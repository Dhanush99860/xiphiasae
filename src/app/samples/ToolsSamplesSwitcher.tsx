"use client";

import { useState } from "react";
import ToolsMix from "./ToolsMix";
import ToolsGallery from "./ToolsGallery";
import ToolsEditorial from "./ToolsEditorial";
import ToolsSplit from "./ToolsSplit";

/**
 * Owner preview: flip between the navy/gold Programme Explorer (Tools) layouts.
 * Pick one → it becomes /programme-explorer; /compare-programs adopts the matching look.
 * ★ Mix = the requested ①+③ hybrid (gallery cards + live spotlight), shown first.
 */
const VARIANTS = [
  { key: "mix", label: "★ Mix (1+3)", Comp: ToolsMix },
  { key: "gallery", label: "① Gallery Explorer", Comp: ToolsGallery },
  { key: "editorial", label: "② Editorial List", Comp: ToolsEditorial },
  { key: "split", label: "③ Filter + Preview", Comp: ToolsSplit },
] as const;

export default function ToolsSamplesSwitcher({ serifClass }: { serifClass: string }) {
  const [active, setActive] = useState(0);
  const Active = VARIANTS[active].Comp;

  const choose = (i: number) => {
    setActive(i);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  return (
    <div className="relative">
      <Active serifClass={serifClass} />

      <div
        className="fixed bottom-5 left-1/2 z-[99999] flex -translate-x-1/2 items-center gap-1 rounded-full border p-1 shadow-2xl backdrop-blur"
        style={{ background: "rgba(10,23,51,0.92)", borderColor: "rgba(191,161,92,0.45)" }}
        role="group"
        aria-label="Tools sample variant"
      >
        <span className="hidden px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 sm:inline">
          Tools sample
        </span>
        {VARIANTS.map((v, i) => (
          <button
            key={v.key}
            type="button"
            onClick={() => choose(i)}
            aria-pressed={active === i}
            className="rounded-full px-3.5 py-2 text-[12px] font-semibold transition-colors"
            style={
              active === i
                ? { background: "#bfa15c", color: "#0a1733" }
                : { background: "transparent", color: "rgba(238,243,251,0.8)" }
            }
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}
