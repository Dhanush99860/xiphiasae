// ✅ src/app/(site)/[vertical]/[country]/[program]/page.tsx
// Program page: renders MDX content

import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getAllContentCached } from "@/lib/content";
import { getRelated } from "@/lib/content/related";
import type { Vertical, ProgramDoc } from "@/lib/content/types";
import type { Metadata } from "next";
import { JsonLd, breadcrumbLd } from "@/lib/seo"; // ✅ use helper
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";

import { ProgramShell, type ProgramShellData } from "@/components/Vertical/CatchAllHubs";
import { countryImage } from "@/components/Countries/country-image";

import fs from "node:fs/promises";
import path from "node:path";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

export const runtime = "nodejs"; // ensure Node.js runtime on Vercel

const VERTICALS3: Vertical[] = ["residency", "citizenship", "skilled", "corporate"];

/** Build params ONLY from folder names; ignore front-matter completely. */
export async function generateStaticParams() {
  const root = path.join(process.cwd(), "content");
  const out: Array<{ vertical: string; country: string; program: string }> = [];

  for (const vertical of VERTICALS3) {
    const vDir = path.join(root, vertical);

    // Skip missing vertical directories cleanly
    let countryDirs: string[] = [];
    try {
      const entries = await fs.readdir(vDir, { withFileTypes: true });
      countryDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
    } catch {
      continue;
    }

    for (const country of countryDirs) {
      const cDir = path.join(vDir, country);
      let files: string[] = [];
      try {
        files = (await fs.readdir(cDir)).filter((f) => f.endsWith(".mdx"));
      } catch {
        continue;
      }

      for (const file of files) {
        const base = path.basename(file, ".mdx");
        if (!base || base.startsWith("_")) continue; // ignore partials like _country.mdx
        out.push({ vertical, country, program: base });
      }
    }
  }

  return out;
}

export const dynamicParams = true;

/**
 * Generate SEO metadata for MDX program pages.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: Vertical; country: string; program: string }>;
}): Promise<Metadata> {
  const { vertical, country, program } = await params;

  if (!VERTICALS3.includes(vertical)) {
    return { title: "Program not found" };
  }

  const doc = getAllContentCached().find(
    (d): d is ProgramDoc =>
      d.kind === "program" &&
      d.vertical === vertical &&
      d.country === country &&
      d.program === program
  );

  if (!doc) {
    return { title: "Program not found" };
  }

  const title = doc.title;
  const description = doc.summary || `Discover the ${doc.title} program in ${doc.country}.`;
  const keywords = doc.tags?.join(", ");
  const canonicalUrl = `https://www.xiphiasimmigration.com${doc.url}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "XIPHIAS Immigration",
      locale: "en_US",
      images: [
        {
          url: doc.heroImage ?? "/xiphias-immigration.png",
          width: 1200,
          height: 630,
          alt: `${title} – XIPHIAS Immigration`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [doc.heroImage ?? "/xiphias-immigration.png"],
    },
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ vertical: Vertical; country: string; program: string }>;
}) {
  const { vertical, country, program } = await params;

  if (!VERTICALS3.includes(vertical) || !country || !program) return notFound();

  const doc = getAllContentCached().find(
    (d): d is ProgramDoc =>
      d.kind === "program" &&
      d.vertical === vertical &&
      d.country === country &&
      d.program === program
  );

  if (!doc) return notFound();

  const { content } = await compileMDX({
    source: doc.body,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
      },
    },
  });

  const related = getRelated(doc, 6);

  // ✅ Breadcrumb JSON-LD using helper (absolute URLs + valid @id format)
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Home", url: "/" },
    { name: doc.vertical.charAt(0).toUpperCase() + doc.vertical.slice(1), url: `/${doc.vertical}` },
    { name: doc.country.charAt(0).toUpperCase() + doc.country.slice(1), url: `/${doc.vertical}/${doc.country}` },
    { name: doc.title, url: doc.url },
  ]);

  const capVertical = doc.vertical.charAt(0).toUpperCase() + doc.vertical.slice(1);

  const shellData: ProgramShellData = {
    verticalSlug: doc.vertical,
    vertical: capVertical,
    country: doc.country,
    countryLabel: doc.country.replace(/-/g, " "),
    title: doc.title,
    summary: doc.summary,
    brochure: doc.brochure,
    heroImage: doc.heroImage ?? countryImage(doc.country),
  };

  const relatedRail = (
    <ul className="divide-y" style={{ borderColor: "rgba(12,31,63,0.1)" }}>
      {related.map((it) => (
        <li key={it.url} className="border-t first:border-t-0" style={{ borderColor: "rgba(12,31,63,0.1)" }}>
          <Link
            className="group flex items-center justify-between gap-3 py-3 text-sm text-[#0c1f3f]/70 transition-colors duration-200 hover:text-[#bfa15c]"
            href={it.url}
          >
            <span>{it.title}</span>
            <span aria-hidden className="text-[#0c1f3f]/30 transition-colors group-hover:text-[#bfa15c]">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <ProgramShell d={shellData} serifClass={serif.className} related={relatedRail}>
        {/* Long-form body uses the already-themed Prose styling */}
        <div className="prose max-w-none">{content}</div>

        {doc.brochure && (
          <a
            className="mt-8 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300"
            style={{ borderColor: "rgba(191,161,92,0.5)", color: "#a87d1f" }}
            href={doc.brochure}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download brochure ↓
          </a>
        )}

        {doc.faq?.length ? (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-[#0c1f3f]">FAQ</h2>
            <ul className="mt-5 space-y-3">
              {doc.faq.map((f, i) => (
                <li key={i}>
                  <details className="group rounded-lg border bg-white/60" style={{ borderColor: "rgba(12,31,63,0.14)" }}>
                    <summary className="cursor-pointer list-none px-5 py-4 font-medium text-[#0c1f3f] marker:content-none [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center justify-between gap-4">
                        {f.q}
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-open:rotate-45"
                          style={{ color: "#bfa15c" }}
                        >
                          +
                        </span>
                      </span>
                    </summary>
                    <div className="border-t px-5 py-4 text-sm leading-relaxed text-[#0c1f3f]/65" style={{ borderColor: "rgba(12,31,63,0.1)" }}>
                      {f.a}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </ProgramShell>
    </>
  );
}
