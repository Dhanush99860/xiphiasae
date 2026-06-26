"use client";

import { useState } from "react";
// Content index variants
import ContentMix from "./ContentMix";
import ContentEditorialGrid from "./ContentEditorialGrid";
import ContentFeatured from "./ContentFeatured";
import ContentIndexList from "./ContentIndexList";
// New menu concepts (progressive disclosure, small images)
import MenuColumnDrill from "./MenuColumnDrill";
import MenuInlineAccordion from "./MenuInlineAccordion";
import MenuCenterFlyout from "./MenuCenterFlyout";

type Variant = { key: string; label: string; Comp: React.ComponentType<{ serifClass: string }> };

const MODES: { key: "content" | "menu"; label: string; variants: Variant[] }[] = [
  {
    key: "content",
    label: "Content",
    variants: [
      { key: "mix", label: "★ Mix (1+3)", Comp: ContentMix },
      { key: "grid", label: "① Editorial Grid", Comp: ContentEditorialGrid },
      { key: "featured", label: "② Featured + Grid", Comp: ContentFeatured },
      { key: "list", label: "③ Index List", Comp: ContentIndexList },
    ],
  },
  {
    key: "menu",
    label: "Menu",
    variants: [
      { key: "drill", label: "① Column Drill", Comp: MenuColumnDrill },
      { key: "accordion", label: "② Inline Accordion", Comp: MenuInlineAccordion },
      { key: "flyout", label: "③ Center Flyout", Comp: MenuCenterFlyout },
    ],
  },
];

const PILL_WRAP =
  "fixed left-1/2 z-[100000] flex -translate-x-1/2 items-center gap-1 rounded-full border p-1 shadow-2xl backdrop-blur";
const PILL_STYLE = { background: "rgba(10,23,51,0.92)", borderColor: "rgba(191,161,92,0.45)" } as const;

export default function AllSamplesSwitcher({ serifClass }: { serifClass: string }) {
  const [modeIdx, setModeIdx] = useState(0);
  const [idx, setIdx] = useState(0);
  const mode = MODES[modeIdx];
  const Active = mode.variants[Math.min(idx, mode.variants.length - 1)].Comp;

  const scrollTop = () => { if (typeof window !== "undefined") window.scrollTo({ top: 0 }); };
  const chooseVariant = (i: number) => { setIdx(i); scrollTop(); };
  const chooseMode = (i: number) => { setModeIdx(i); setIdx(0); scrollTop(); };

  return (
    <div className="relative">
      <Active serifClass={serifClass} />

      {/* Top — Content / Menu mode toggle */}
      <div className={`${PILL_WRAP} top-4`} style={PILL_STYLE} role="group" aria-label="Sample category">
        <span className="hidden px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 sm:inline">
          Reviewing
        </span>
        {MODES.map((m, i) => (
          <button
            key={m.key}
            type="button"
            onClick={() => chooseMode(i)}
            aria-pressed={modeIdx === i}
            className="rounded-full px-4 py-2 text-[12px] font-semibold transition-colors"
            style={modeIdx === i ? { background: "#bfa15c", color: "#0a1733" } : { background: "transparent", color: "rgba(238,243,251,0.85)" }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Bottom — variant pills for the active mode */}
      <div className={`${PILL_WRAP} bottom-5`} style={PILL_STYLE} role="group" aria-label={`${mode.label} variant`}>
        <span className="hidden px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 sm:inline">
          {mode.label}
        </span>
        {mode.variants.map((v, i) => (
          <button
            key={v.key}
            type="button"
            onClick={() => chooseVariant(i)}
            aria-pressed={idx === i}
            className="rounded-full px-3.5 py-2 text-[12px] font-semibold transition-colors"
            style={idx === i ? { background: "#bfa15c", color: "#0a1733" } : { background: "transparent", color: "rgba(238,243,251,0.8)" }}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}
