import { getDisplayAuthorName, type LegacyReply, type LegacyTopLevelReview } from "@/lib/reviews/legacyReviews";
import { Star } from "lucide-react";
import ReplyList from "./ReplyList";
import ReviewMeta from "./ReviewMeta";

const GOLD = "#bfa15c";

type Props = {
  review: LegacyTopLevelReview;
  replies: readonly LegacyReply[];
  serifClass?: string;
};

export default function ReviewCard({ review, replies, serifClass = "" }: Props) {
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bfa15c] motion-reduce:transform-none"
      style={{ border: "1px solid rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.02)" }}
    >
      {/* gold hairline at the base */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(191,161,92,0.4), transparent)" }}
      />

      <header>
        <div className="flex items-start justify-between gap-4">
          <h3 className={`${serifClass} text-xl font-medium leading-tight text-white`}>
            {getDisplayAuthorName(review)}
          </h3>
          <div aria-hidden className="flex shrink-0 items-center gap-0.5 pt-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-3.5 w-3.5" style={{ fill: GOLD, color: GOLD }} />
            ))}
          </div>
        </div>
        <ReviewMeta createdAt={review.createdAt} likes={review.likes} tone="dark" />
      </header>

      {review.message ? (
        <div className="mt-4 whitespace-pre-line break-words text-sm leading-7 text-white/70">
          {review.message}
        </div>
      ) : null}

      <ReplyList replies={replies} tone="dark" serifClass={serifClass} />
    </article>
  );
}
