import { getDisplayAuthorName, type LegacyReply } from "@/lib/reviews/legacyReviews";
import ReviewMeta from "./ReviewMeta";

const GOLD = "#bfa15c";

type Props = {
  replies: readonly LegacyReply[];
  tone?: "dark" | "light";
  serifClass?: string;
};

export default function ReplyList({ replies, tone = "dark", serifClass = "" }: Props) {
  if (!replies.length) return null;

  const dark = tone === "dark";

  return (
    <details
      className="mt-5 rounded-2xl p-4"
      style={{
        border: "1px solid rgba(191,161,92,0.22)",
        background: dark ? "rgba(255,255,255,0.015)" : "rgba(168,125,31,0.04)",
      }}
    >
      <summary
        className="cursor-pointer list-none text-sm font-semibold marker:hidden"
        style={{ color: dark ? GOLD : "#a87d1f" }}
      >
        {replies.length} {replies.length === 1 ? "reply" : "replies"}
      </summary>
      <div className="mt-4 space-y-3">
        {replies.map((reply) => {
          const indent = Math.min(Math.max(reply.depth - 1, 0), 4) * 12;

          return (
            <article
              key={reply.postId}
              className="rounded-2xl p-4"
              style={{
                marginInlineStart: `${indent}px`,
                border: "1px solid rgba(191,161,92,0.2)",
                background: dark ? "rgba(255,255,255,0.03)" : "#ffffff",
              }}
            >
              <h4 className={`${serifClass} text-base font-medium ${dark ? "text-white" : "text-ink"}`}>
                {getDisplayAuthorName(reply)}
              </h4>
              <ReviewMeta createdAt={reply.createdAt} likes={reply.likes} compact tone={tone} />
              {reply.message ? (
                <p
                  className={`mt-3 whitespace-pre-line break-words text-sm leading-6 ${
                    dark ? "text-white/70" : "text-ink/70"
                  }`}
                >
                  {reply.message}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </details>
  );
}
