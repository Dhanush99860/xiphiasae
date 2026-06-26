// src/components/careers/FAQ.tsx
const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const INK = "#0c1f3f";

export default function FAQ({ serifClass }: { serifClass: string }) {
  const faqs = [
    {
      q: "Do you offer remote roles?",
      a: "We are currently hiring for work-from-office positions from our Bengaluru headquarters and branch offices in India.",
    },
    {
      q: "What documents should I prepare?",
      a: "A current resume, LinkedIn profile, and any portfolio or case samples relevant to the role.",
    },
    {
      q: "Do you support career growth?",
      a: "We offer certification reimbursements, mentorship, and role-specific learning and development support.",
    },
    {
      q: "What’s the typical timeline?",
      a: "We aim to complete the process within 2–4 weeks depending on the role and availability.",
    },
    {
      q: "What if I don’t see a matching role?",
      a: "You can still share your resume via Quick Apply and we’ll contact you when a suitable role opens.",
    },
  ];

  const faqJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });

  return (
    <div>
      {/* SEO: FAQPage structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      <div className="flex items-center gap-3">
        <span className="h-px w-8" style={{ background: GOLD_DEEP }} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD_DEEP }}>
          Questions
        </span>
      </div>
      <h2 className={`${serifClass} mt-4 text-[clamp(1.7rem,3.6vw,2.6rem)] font-medium`} style={{ color: INK }}>
        Frequently asked <span className="italic" style={{ color: GOLD_DEEP }}>questions</span>
      </h2>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl p-5 transition"
            style={{ border: "1px solid rgba(168,125,31,0.2)", background: "#ffffff" }}
          >
            <summary
              className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold outline-none"
              style={{ color: INK }}
            >
              {f.q}
              <span
                aria-hidden
                className="inline-flex h-6 w-6 items-center justify-center rounded-full"
                style={{ border: "1px solid rgba(168,125,31,0.3)", color: GOLD_DEEP }}
              >
                <svg className="h-3.5 w-3.5 group-open:hidden" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 4v12M4 10h12" />
                </svg>
                <svg className="hidden h-3.5 w-3.5 group-open:block" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 10h12" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 text-sm" style={{ color: "rgba(12,31,63,0.6)" }}>{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs" style={{ color: "rgba(12,31,63,0.5)" }}>
          Still have questions?{" "}
          <a href="mailto:hr@xiphias.in" className="font-semibold underline decoration-2 underline-offset-2" style={{ color: GOLD_DEEP }}>
            hr@xiphias.in
          </a>
        </p>
        <a
          href="#apply"
          className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
          style={{ background: GOLD, color: "#0a1733" }}
        >
          Quick Apply
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}
