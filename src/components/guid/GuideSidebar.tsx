import Link from "next/link";

export type SitemapGroup = {
  title: string;
  items: { label: string; href: string; children?: { label: string; href: string }[] }[];
};

export type ExtraLinkGroup = {
  title: string;
  links: { label: string; href: string; badge?: string }[];
};

export default function GuideSidebar({
  eligibilityHref,
  residencyEligibilityHref,
  corporateEligibilityHref,
  sitemap,
  extraGroups = [],
  contactHref = "/contact",
}: {
  eligibilityHref: string;
  residencyEligibilityHref: string;
  corporateEligibilityHref: string;
  sitemap: SitemapGroup[];
  extraGroups?: ExtraLinkGroup[];
  contactHref?: string;
}) {
  return (
    <aside
      className="lg:sticky lg:top-20 space-y-4"
      aria-label="Guide sidebar with quick actions and site map"
    >

      {/* Extra links (editorial shortcuts / redirects) */}
      {extraGroups?.length ? (
        <section
          aria-labelledby="shortcuts-title"
          className="rounded-xl border border-gold/45 bg-white p-3"
        >
          <h2 id="shortcuts-title" className="text-sm font-semibold text-ink">
            Shortcuts
          </h2>

          <div className="mt-2 space-y-3">
            {extraGroups.map((g) => (
              <div key={g.title}>
                <div className="text-xs uppercase tracking-[0.18em] text-ink/40">
                  {g.title}
                </div>
                <ul className="mt-1 space-y-1.5">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="group inline-flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm text-ink/70 transition-colors hover:bg-pearl hover:text-gold_deep"
                        aria-label={l.label}
                      >
                        <span className="inline-flex items-center gap-2">
                          <IconArrow />
                          {l.label}
                        </span>
                        {l.badge ? (
                          <span className="ml-2 rounded-md border border-gold/45 bg-gold/10 px-1.5 py-0.5 text-[10px] font-medium text-gold">
                            {l.badge}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Sitemap — accordion with large, clickable rows; child programs as chips */}
      <nav
        className="rounded-xl border border-gold/45 bg-white p-3"
        aria-labelledby="sitemap-title"
        role="navigation"
      >
        <h2 id="sitemap-title" className="text-sm font-semibold text-ink">
          Site map
        </h2>

        <div className="mt-2 space-y-2 lg:max-h-[60vh] lg:overflow-auto lg:pr-1">
          {sitemap.map((group) => (
            <details
              key={group.title}
              className="group rounded-lg"
              open
            >
              <summary className="flex cursor-pointer select-none items-center justify-between rounded-lg px-2 py-2 text-sm font-medium text-ink transition-colors hover:bg-pearl">
                <span className="inline-flex items-center gap-2 text-gold/80">
                  <IconFolder />
                  <span className="text-ink">{group.title}</span>
                </span>
                <IconChevron className="text-ink/40 transition group-open:rotate-180" />
              </summary>

              <ul className="px-1 pb-2">
                {group.items.map((country) => {
                  const hasChildren = (country.children?.length ?? 0) > 0;
                  return (
                    <li key={country.href} className="py-1">
                      <div className="rounded-md transition-colors hover:bg-pearl">
                        <div className="flex items-center justify-between">
                          <Link
                            href={country.href}
                            className="flex-1 px-2 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-gold"
                            aria-label={`Open ${country.label}`}
                          >
                            <span className="inline-flex items-center gap-2">
                              <span className="text-gold/70">
                                <IconFlag />
                              </span>
                              {country.label}
                            </span>
                          </Link>

                          {hasChildren ? (
                            <details className="mr-1 inline-block">
                              <summary className="list-none rounded-md px-2 py-1 text-xs text-ink/55 underline-offset-2 hover:text-gold hover:underline cursor-pointer">
                                Programs
                              </summary>
                              <div className="px-2 pb-2 pt-1">
                                <div className="flex flex-wrap gap-1.5">
                                  {country.children!.map((p) => (
                                    <Link
                                      key={p.href}
                                      href={p.href}
                                      className="rounded-full border border-gold/45 bg-pearl px-2.5 py-1 text-[12px] text-ink/70 transition-colors hover:border-gold/65 hover:text-gold_deep"
                                      aria-label={`Open ${p.label}`}
                                    >
                                      {p.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </details>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </details>
          ))}
        </div>
      </nav>
    </aside>
  );
}

/* ---------------- icons (inline SVG, no extra deps) ---------------- */
function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M5 12.75h10.19l-2.72 2.72a.75.75 0 1 0 1.06 1.06l4.25-4.25a.75.75 0 0 0 0-1.06L13.53 7a.75.75 0 1 0-1.06 1.06l2.72 2.69H5a.75.75 0 0 0 0 1.5z" />
    </svg>
  );
}
function IconChevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} fill="currentColor" aria-hidden="true">
      <path d="M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6z" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 3 4 6v6c0 5 3.8 9 8 9s8-4 8-9V6l-8-3z" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M4 4h16v10H6l-2 2V4z" />
    </svg>
  );
}
function IconHome() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 3 2 12h3v8h6v-5h2v5h6v-8h3z" />
    </svg>
  );
}
function IconBriefcase() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M9 3h6a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v3H2V8a2 2 0 0 1 2-2h3V5a2 2 0 0 1 2-2zm1 3h4V5h-4v1zM2 12h22v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z" />
    </svg>
  );
}
function IconFolder() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M10 4l2 2h8a2 2 0 0 1 2 2v2H2V6a2 2 0 0 1 2-2h6zM2 10h22v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8z" />
    </svg>
  );
}
function IconFlag() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M4 4h1l.5 1H20l-3 5 3 5H8l-1 2H4z" />
    </svg>
  );
}

/* ---------------- small CTA helper ---------------- */
function CTA({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-3 py-2 text-center text-sm font-medium text-[#0a1733] ring-1 ring-gold/40 hover:bg-gold/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}