// src/components/ui/Prose.tsx
import * as React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

/**
 * Prose typography tuned for MDX content pages.
 *
 * Light theme: clean, neutral, blue links (unchanged).
 * Dark theme = "Midnight Embassy" reading surface — pearl body text, a single
 * gold accent on links/headings/quotes, and an inky code surface. All dark
 * styling is additive (`dark:`) so existing light prose usage is untouched.
 */
export function Prose({ className = "", ...props }: Props) {
  return (
    <div
      className={[
        // Base scope
        "prose max-w-none dark:prose-invert",
        "prose:leading-7",

        // Root color — pearl body on the midnight ground
        "prose:text-black dark:prose:text-ink/85",

        // Keep common descendants inheriting root tone
        "[&_*:where(p,span,em,strong,li)]:text-inherit",
        "[&_*:where(blockquote,code,pre,th,td,figcaption)]:text-inherit",
        "[&_h1_*]:text-inherit [&_h2_*]:text-inherit [&_h3_*]:text-inherit [&_h4_*]:text-inherit",

        // Body size and rhythm
        "prose-p:text-[16px] prose-li:text-[16px] prose-a:text-[16px] prose-strong:text-[16px] prose-em:text-[16px] prose-blockquote:text-[16px]",
        "prose-p:my-3",
        "prose-ul:my-3 prose-ol:my-3",
        "prose-ul:pl-5 prose-ol:pl-5",
        "prose-li:my-1",
        "prose-li:marker:text-black/80 dark:prose-li:marker:text-gold/70",

        // Headings — pearl with gold accents on dark
        "prose-headings:text-black dark:prose-headings:text-ink",
        // A small gold rule under h2 headings on dark (the guiding-line motif)
        "dark:prose-h2:border-b dark:prose-h2:border-gold/40 dark:prose-h2:pb-2",
        "prose-headings:font-bold prose-headings:tracking-tight prose-headings:leading-tight prose-headings:scroll-mt-28",
        "prose-h1:text-[26px] sm:prose-h1:text-[28px]",
        "prose-h2:text-[22px] sm:prose-h2:text-[24px]",
        "prose-h3:text-[18px] sm:prose-h3:text-[19px]",
        "prose-h4:text-[16px]",
        "prose-h1:mt-7 prose-h1:mb-3",
        "prose-h2:mt-8 prose-h2:mb-3",
        "prose-h3:mt-6 prose-h3:mb-2",
        "prose-h4:mt-5 prose-h4:mb-2",

        // Body links — blue on light, gold on the midnight ground
        "prose-a:text-blue-700 dark:prose-a:text-gold",
        "prose-a:font-semibold",
        "prose-a:underline",
        "prose-a:decoration-2",
        "prose-a:decoration-blue-500/70 dark:prose-a:decoration-gold/50",
        "prose-a:underline-offset-2",
        "hover:prose-a:text-blue-800 dark:hover:prose-a:text-gold_bright",
        "hover:prose-a:decoration-blue-600 dark:hover:prose-a:decoration-gold",
        "visited:prose-a:text-blue-800 dark:visited:prose-a:text-gold/90",

        // Heading links (from rehype autolink) should not inherit body link styling
        "prose-headings:[&_a]:text-inherit",
        "prose-headings:[&_a]:no-underline",
        "hover:prose-headings:[&_a]:no-underline",
        "focus:prose-headings:[&_a]:no-underline",
        "prose-headings:[&_a]:decoration-transparent",

        // Emphasis
        "prose-strong:font-semibold prose-strong:text-inherit",
        "prose-em:not-italic",

        // Code
        "prose-code:text-[13px] prose-code:px-1.5 prose-code:py-0.5",
        "prose-code:rounded-md",
        "prose-code:bg-black/[0.06] dark:prose-code:bg-white",
        "prose-code:text-inherit",
        // Gold tint + hairline ring on INLINE code only (not code inside <pre>)
        "dark:[&_:not(pre)>code]:text-gold/90",
        "dark:[&_:not(pre)>code]:ring-1 dark:[&_:not(pre)>code]:ring-gold/15",
        "prose-pre:overflow-x-auto prose-pre:text-[13px] prose-pre:p-4",
        "prose-pre:rounded-lg",
        "prose-pre:bg-black/[0.04] dark:prose-pre:bg-white",
        "prose-pre:ring-1 prose-pre:ring-black/10 dark:prose-pre:ring-gold/15",
        "dark:prose-pre:text-ink/85",
        "[&_.hljs]:!bg-transparent [&_.hljs]:!p-0",

        // Tables
        "prose-table:text-[14px] prose-table:leading-6",
        "prose-thead:bg-black/[0.03] dark:prose-thead:bg-white/[0.06]",
        "prose-thead:border-b prose-thead:border-black/10 dark:prose-thead:border-white/15",
        "prose-th:font-semibold prose-td:align-top",
        "prose-th:px-3 prose-td:px-3",
        "prose-th:py-2 prose-td:py-2",

        // Quotes, rules, media
        "prose-blockquote:border-l-2 prose-blockquote:pl-4 prose-blockquote:not-italic",
        // Gold-accented quote bar + muted pearl quote text on dark
        "prose-blockquote:border-black/20 dark:prose-blockquote:border-gold/60",
        "dark:prose-blockquote:text-ink/70",
        "prose-hr:my-8 prose-hr:border-black/10 dark:prose-hr:border-gold/45",
        "prose-img:rounded-xl prose-img:shadow-sm prose-img:my-4",
        // Gold-framed media on dark
        "dark:prose-img:ring-1 dark:prose-img:ring-gold/15",
        // Tables read on dark
        "dark:prose-thead:bg-white/[0.04] dark:prose-thead:border-gold/45",
        "dark:[&_tbody_tr]:border-gold/45",
        // Strong emphasis lifts to pearl on dark
        "dark:prose-strong:text-ink",

        // Quality of life
        "selection:bg-black/10 dark:selection:bg-gold/25 dark:selection:text-ink",
        "break-words hyphens-auto",

        className,
      ].join(" ")}
      {...props}
    />
  );
}
