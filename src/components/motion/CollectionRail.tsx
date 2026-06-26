import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * CollectionRail — a horizontal scroll-snap rail (Rolex-style "collection").
 * Native swipe on mobile, scroll/trackpad on desktop — no heavy JS, no extra
 * vertical scroll. Give each child `snap-start shrink-0 w-[...]`.
 */
export default function CollectionRail({ children, className }: Props) {
  return (
    <div
      className={`flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-6 pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
