import { CalendarDays, ThumbsUp } from "lucide-react";
import { formatReviewDate } from "@/lib/reviews/legacyReviews";

const GOLD = "#bfa15c";

type Props = {
  createdAt: string;
  likes: number;
  compact?: boolean;
  tone?: "dark" | "light";
};

export default function ReviewMeta({ createdAt, likes, compact = false, tone = "dark" }: Props) {
  const iconSize = compact ? "h-3.5 w-3.5" : "h-4 w-4";
  const dark = tone === "dark";
  const baseText = dark ? "text-white/50" : "text-ink/45";
  const sizeText = compact ? "text-[11px]" : "text-xs";
  const pillStyle = dark
    ? { border: "1px solid rgba(191,161,92,0.3)", background: "rgba(255,255,255,0.03)" }
    : { border: "1px solid rgba(168,125,31,0.3)", background: "rgba(168,125,31,0.05)" };
  const pillText = dark ? "text-white/75" : "text-ink/70";

  return (
    <div className={`mt-2 flex flex-wrap items-center gap-2.5 ${sizeText} ${baseText}`}>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className={iconSize} style={{ color: GOLD }} />
        {formatReviewDate(createdAt)}
      </span>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium ${pillText}`}
        style={pillStyle}
      >
        <ThumbsUp className={iconSize} style={{ color: GOLD }} />
        {likes} likes
      </span>
    </div>
  );
}
