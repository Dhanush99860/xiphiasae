"use client";

import React from "react";
import Link from "next/link";

import ArticleDetail from "@/components/Content/ArticleDetail";
import { editorTextToMdx, parseMarkdownTable } from "@/lib/content-admin/content-format";

type PreviewKind = "blog" | "articles" | "news";

type PreviewDraft = {
  kind?: PreviewKind;
  title?: string;
  slug?: string;
  summary?: string;
  body?: string;
  contentText?: string;
  author?: string;
  date?: string;
  updated?: string;
  hero?: string;
  heroAlt?: string;
  tags?: string[] | string;
  countries?: string[] | string;
  programs?: string[] | string;
};

/** Mirrors the ArticleDetail props each public detail route passes. */
const KIND_CHROME: Record<PreviewKind, { eyebrow: string; eyebrowAr: string; backHref: string; backLabel: string }> = {
  blog: { eyebrow: "The XIPHIAS Journal", eyebrowAr: "مدونة", backHref: "/blog", backLabel: "Blog" },
  articles: { eyebrow: "Immigration Insights", eyebrowAr: "مقالات", backHref: "/articles", backLabel: "Articles" },
  news: { eyebrow: "Newsroom", eyebrowAr: "أخبار", backHref: "/news", backLabel: "News" },
};

function arrayValue(value: PreviewDraft["tags"]) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function formatDateUTC(input?: string) {
  if (!input) return "";
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function renderInline(value: string) {
  const parts: React.ReactNode[] = [];
  const inlinePattern =
    /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*\n]+)\*\*|__([^_\n]+)__|<u>([^<\n]+)<\/u>|\*([^*\n]+)\*|_([^_\n]+)_/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlinePattern.exec(value))) {
    if (match.index > lastIndex) parts.push(value.slice(lastIndex, match.index));
    if (match[1] && match[2]) {
      const href = match[2];
      const internal = href.startsWith("/") || href.startsWith("#");
      parts.push(
        <a
          key={`link-${match.index}`}
          href={href}
          target={internal ? undefined : "_blank"}
          rel={internal ? undefined : "noopener noreferrer"}
        >
          {match[1]}
        </a>,
      );
    } else if (match[3] || match[4]) {
      parts.push(<strong key={`strong-${match.index}`}>{match[3] || match[4]}</strong>);
    } else if (match[5]) {
      parts.push(<u key={`underline-${match.index}`}>{match[5]}</u>);
    } else {
      parts.push(<em key={`em-${match.index}`}>{match[6] || match[7]}</em>);
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < value.length) parts.push(value.slice(lastIndex));
  return parts.length ? parts : value;
}

function renderBlock(block: string, index: number) {
  const table = parseMarkdownTable(block);

  if (/^###\s+/.test(block)) {
    const text = block.replace(/^###\s+/, "");
    return (
      <h3 key={index} id={slugify(text) || undefined}>
        {text}
      </h3>
    );
  }

  if (/^##\s+/.test(block)) {
    const text = block.replace(/^##\s+/, "");
    return (
      <h2 key={index} id={slugify(text) || undefined}>
        {text}
      </h2>
    );
  }

  if (table) {
    return (
      <div key={index} className="my-6 w-full overflow-x-auto rounded-lg border border-[#0c1f3f]/10">
        <table className="m-0 min-w-full border-collapse text-left">
          <thead>
            <tr>
              {table.headers.map((header, cellIndex) => (
                <th key={`${header}-${cellIndex}`}>{renderInline(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{renderInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (/^[-*]\s+/m.test(block)) {
    return (
      <ul key={index}>
        {block
          .split("\n")
          .filter((line) => /^[-*]\s+/.test(line.trim()))
          .map((line) => (
            <li key={line}>{renderInline(line.replace(/^\s*[-*]\s+/, ""))}</li>
          ))}
      </ul>
    );
  }

  if (/^\d+\.\s+/m.test(block)) {
    return (
      <ol key={index}>
        {block
          .split("\n")
          .filter((line) => /^\d+\.\s+/.test(line.trim()))
          .map((line) => (
            <li key={line}>{renderInline(line.replace(/^\s*\d+\.\s+/, ""))}</li>
          ))}
      </ol>
    );
  }

  if (block.startsWith(">")) {
    return <blockquote key={index}>{renderInline(block.replace(/^>\s*/, ""))}</blockquote>;
  }

  if (block.includes("<ButtonLink")) {
    const button = /<ButtonLink\s+href=["']([^"']+)["']>([\s\S]*?)<\/ButtonLink>/.exec(block);
    const href = button?.[1] || "/contact";
    const label = button?.[2]?.trim() || "Button link";
    return (
      <p key={index}>
        <Link
          href={href}
          className="inline-flex rounded-full bg-[#0a1733] px-5 py-3 text-sm font-semibold text-white no-underline"
        >
          {label}
        </Link>
      </p>
    );
  }

  if (block.includes("<Callout")) {
    const title = /\btitle=["']([^"']+)["']/.exec(block)?.[1];
    const body = block
      .replace(/^<Callout[^>]*>\s*/i, "")
      .replace(/\s*<\/Callout>$/i, "")
      .trim();
    return (
      <blockquote key={index}>
        {title ? <strong>{title}: </strong> : null}
        {renderInline(body)}
      </blockquote>
    );
  }

  return <p key={index}>{renderInline(block)}</p>;
}

export default function ContentAdminPreviewClient({ serifClass }: { serifClass: string }) {
  const [draft, setDraft] = React.useState<PreviewDraft | null>(null);
  const [missing, setMissing] = React.useState(false);

  React.useEffect(() => {
    const key = new URLSearchParams(window.location.search).get("draft");
    if (!key) {
      setMissing(true);
      return;
    }
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      setMissing(true);
      return;
    }
    try {
      setDraft(JSON.parse(raw));
    } catch {
      setMissing(true);
    }
  }, []);

  if (missing) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Draft preview unavailable</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">Open preview from the CMS editor again.</h1>
          <p className="mt-3 text-slate-700">
            This preview uses temporary browser storage, so it needs to be opened from the editor tab.
          </p>
          <Link href="/content-admin" className="mt-5 inline-flex font-black text-blue-700 underline underline-offset-4">
            Back to content admin
          </Link>
        </div>
      </main>
    );
  }

  if (!draft) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-sm font-bold text-slate-600">Loading draft preview...</main>
    );
  }

  const kind: PreviewKind = draft.kind && KIND_CHROME[draft.kind] ? draft.kind : "blog";
  const chrome = KIND_CHROME[kind];
  const title = draft.title || "Untitled draft";
  const body = editorTextToMdx(draft.body || draft.contentText || "");
  const blocks = body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  const category = arrayValue(draft.countries)[0] || arrayValue(draft.programs)[0] || arrayValue(draft.tags)[0];

  return (
    <>
      <div className="sticky top-0 z-[95] border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-sm font-black text-amber-900">
        Draft preview only - this page is not published.{" "}
        <Link href="/content-admin" className="underline underline-offset-4">
          Back to editor
        </Link>
      </div>

      <ArticleDetail
        serifClass={serifClass}
        eyebrow={chrome.eyebrow}
        eyebrowAr={chrome.eyebrowAr}
        title={title}
        date={formatDateUTC(draft.updated || draft.date)}
        author={draft.author}
        category={category}
        heroImage={draft.hero || undefined}
        backHref={chrome.backHref}
        backLabel={chrome.backLabel}
      >
        {draft.summary ? <p className="lead">{draft.summary}</p> : null}
        {blocks.length ? blocks.map(renderBlock) : <p>Start writing to preview the article body.</p>}
      </ArticleDetail>
    </>
  );
}
