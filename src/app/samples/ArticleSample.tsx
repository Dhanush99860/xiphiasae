"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

/* ─────────────────────────────────────────────────────────────────────────
   Article data (real content — Dubai Golden Visa via real estate)
   In production this is the compiled MDX; here it is hand-structured so the
   reading experience is faithful to a true XIPHIAS journal entry.
   ───────────────────────────────────────────────────────────────────────── */
const ARTICLE = {
  cat: "Golden Visa",
  title: "Secure Dubai's Golden Visa through real estate",
  summary:
    "Dubai property offers high ROI and a direct pathway to 10-year UAE residency. The thresholds, the freehold rule, DLD approvals and the costs nobody else spells out.",
  hero: "/images/blogs/dubai-golden-visa-real-estate.webp",
  author: "Varun Singh",
  role: "Principal Advisor, UAE",
  date: "21 Oct 2025",
  read: "6 min",
  facts: [
    { v: "AED 1M", l: "Minimum investment" },
    { v: "3–5 yrs", l: "Visa validity" },
    { v: "Freehold", l: "Property type" },
    { v: "DLD", l: "Approved developers" },
  ],
};

type Block =
  | { t: "p"; html: string }
  | { t: "h2"; id: string; text: string }
  | { t: "list"; items: string[] }
  | { t: "quote"; text: string; by?: string }
  | { t: "callout"; title: string; html: string };

const BODY: Block[] = [
  { t: "p", html: "The **Dubai real-estate** market remains one of the most resilient in the world. For two decades the emirate has compounded growth across petroleum, construction, logistics, tourism and property — and real estate alone contributed **13% of Dubai's economy** in 2021." },
  { t: "p", html: "A low cost of acquisition per square metre relative to other global cities, paired with the promise of strong **ROI**, continues to drive investor demand. Crucially, a residential purchase can also unlock **permanent residency** through the **Golden Visa** — turning a sound investment into a long-term mobility strategy." },
  { t: "h2", id: "leasehold", text: "What is a leasehold property?" },
  { t: "p", html: "A **leasehold** property physically belongs to the purchaser, but the land it sits on is owned by the freeholder, who leases it for **99 years (or less)**. The term can be extended on expiry. Leasehold options are plentiful across Dubai — but they do **not** qualify for the Golden Visa." },
  { t: "h2", id: "freehold", text: "What is a freehold property?" },
  { t: "p", html: "Introduced in **2002**, the freehold ownership law allows non-GCC foreigners to own both the property and the land beneath it outright. The buyer receives the **title deed** from the **Dubai Land Department (DLD)** and may occupy, lease, sell — or pass it to family by inheritance." },
  { t: "callout", title: "The rule that decides eligibility", html: "Only a **freehold** purchase from a **DLD-approved developer** counts toward the Golden Visa. A secondary-market purchase made **before construction completes** is **not** eligible." },
  { t: "h2", id: "which", text: "Leasehold or freehold — which one qualifies?" },
  { t: "p", html: "Both can deliver returns, but only a **freehold** investment of **AED 1 million or more** opens the door to the Golden Visa. Buy outside the visa guidelines and the application simply cannot proceed — which is why the structure of the purchase matters as much as the property itself." },
  { t: "h2", id: "validity", text: "How long is the visa valid?" },
  { t: "p", html: "Validity scales with investment. **AED 1 million** secures a **3-year** Golden Visa; **AED 5 million and above** secures **5 years**. Both are **renewable** on expiry, regardless of the amount invested." },
  { t: "quote", text: "Buy the right asset in the right structure, and the residency follows the investment — not the other way around.", by: "Varun Singh" },
  { t: "h2", id: "choose", text: "How to choose the right property" },
  { t: "p", html: "Townhouses, villas and apartments are all available — but selecting the right asset is critical both for full ownership and for the visa. A typical path looks like this:" },
  { t: "list", items: [
    "Shortlist prime, DLD-approved freehold developments matched to your budget and lifestyle.",
    "Reserve your chosen property with a **2% deposit** and arrange a trip to view it in person.",
    "Complete the purchase, then file the Golden Visa application with the supporting title deed.",
  ] },
  { t: "p", html: "A **XIPHIAS** advisor handles the search, the structuring and the visa filing end to end — so the investment and the residency move as one." },
];

const TOC = BODY.filter((b): b is Extract<Block, { t: "h2" }> => b.t === "h2");

const FAQS = [
  { q: "What is the minimum real-estate investment for the Dubai Golden Visa?", a: "AED 1 million in a freehold property from DLD-approved developers. A secondary-market purchase made before construction completes is not eligible." },
  { q: "Can leasehold properties qualify?", a: "No. To obtain the Golden Visa, the investment must be in a freehold property." },
  { q: "How long is the Dubai Golden Visa valid?", a: "Generally 3 years for AED 1 million and 5 years for AED 5 million and above — renewable on expiry." },
  { q: "Which locations are most popular with investors?", a: "Areas frequently considered include Downtown / Burj Khalifa, Dubai Marina, Palm Jumeirah, Palm Jebel Ali and Dubailand." },
];

const RELATED = [
  { slug: "dubai-golden-visa-best-property-investments", cat: "Golden Visa", title: "The best Dubai property investments for the Golden Visa", read: "5 min" },
  { slug: "dubai-residency-hidden-perks", cat: "Residency", title: "Dubai residency: the perks nobody talks about", read: "4 min" },
  { slug: "dubai-expat-destination-2025", cat: "Insight", title: "Why Dubai is the expat destination of 2025", read: "6 min" },
];
const img = (s: string) => `/images/blogs/${s}.webp`;

/* bold markdown → <strong> */
function rich(s: string) {
  return s.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-[#0a1733]">{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function Rise({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}>
          <motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function ArticleSample({ serifClass }: { serifClass: string }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [active, setActive] = useState(TOC[0]?.id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    TOC.forEach((h) => { const el = document.getElementById(h.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative bg-white">
      {/* reading progress */}
      <motion.div className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left" style={{ scaleX: progress, background: GOLD }} />
      <Header serifClass={serifClass} />

      {/* ── HERO ── */}
      <section data-tone="dark" className="relative isolate overflow-hidden px-6 pb-14 pt-32 text-[#eef3fb] sm:px-12 lg:px-20 lg:pb-20 lg:pt-40" style={{ background: NAVY }}>
        <div className="absolute inset-0 -z-10">
          <Image src={ARTICLE.hero} alt="" fill priority sizes="100vw" className="object-cover opacity-30 [filter:grayscale(0.3)]" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(10,23,51,0.55) 0%, rgba(10,23,51,0.82) 60%, ${NAVY} 100%)` }} />
        </div>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-3xl">
          <nav className="flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-white/45">
            <a href="/insights" className="transition-colors hover:text-[#bfa15c]">Insights</a><span>/</span>
            <span style={{ color: GOLD }}>{ARTICLE.cat}</span>
          </nav>
          <h1 className={`${serifClass} mt-6 text-[clamp(2.4rem,5.2vw,4.4rem)] font-medium leading-[1.02]`}><Rise text={ARTICLE.title} /></h1>
          <p className="mt-6 max-w-2xl text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-white/70">{ARTICLE.summary}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-white/55">
            <span className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full text-[13px] font-semibold text-[#0a1733]" style={{ background: GOLD }}>{ARTICLE.author.split(" ").map((n) => n[0]).join("")}</span>
              <span><span className="block font-medium text-white/85">{ARTICLE.author}</span><span className="block text-[11px] uppercase tracking-[0.12em] text-white/40">{ARTICLE.role}</span></span>
            </span>
            <span className="h-8 w-px bg-white/15" />
            <span>{ARTICLE.date}</span>
            <span className="h-8 w-px bg-white/15" />
            <span>{ARTICLE.read} read</span>
          </div>
        </div>
      </section>

      {/* ── KEY FACTS STRIP ── */}
      <section data-tone="light" className="relative z-10 -mt-8 px-6 sm:px-12 lg:px-20">
        <div className="mx-auto grid max-w-4xl grid-cols-2 overflow-hidden rounded-xl border border-[#0c1f3f]/10 bg-white shadow-[0_24px_60px_-30px_rgba(10,23,51,0.4)] sm:grid-cols-4">
          {ARTICLE.facts.map((f, i) => (
            <motion.div key={f.l} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }} className="border-[#0c1f3f]/8 px-5 py-6 text-center [&:not(:nth-child(2n))]:border-r sm:[&:not(:last-child)]:border-r sm:[&:not(:nth-child(2n))]:border-r [&:nth-child(-n+2)]:border-b sm:[&:nth-child(-n+2)]:border-b-0">
              <p className={`${serifClass} text-[clamp(1.6rem,2.4vw,2.2rem)] font-semibold leading-none`} style={{ color: INK }}>{f.v}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0c1f3f]/45">{f.l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BODY + TOC ── */}
      <section data-tone="light" className="relative px-6 py-20 sm:px-12 lg:px-20" style={{ background: "#fbfcfe" }}>
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
          {/* TOC */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>On this page</p>
              <ul className="mt-4 flex flex-col gap-1 border-l border-[#0c1f3f]/10">
                {TOC.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="-ml-px block border-l-2 py-1.5 pl-4 text-[13px] leading-snug transition-colors duration-200" style={{ borderColor: active === h.id ? GOLD : "transparent", color: active === h.id ? INK : "rgba(12,31,63,0.5)" }}>{h.text}</a>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-xl border border-[#0c1f3f]/10 bg-white p-5">
                <p className={`${serifClass} text-[1.25rem] font-medium`} style={{ color: INK }}>Talk to an advisor</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#0c1f3f]/60">A 20-minute call to map your route to UAE residency.</p>
                <a href="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#0a1733] transition-transform hover:-translate-y-0.5" style={{ background: GOLD }}>Book a call →</a>
              </div>
            </div>
          </aside>

          {/* ARTICLE */}
          <article ref={bodyRef} className="lg:col-span-9 xl:col-span-8">
            <div className="max-w-[68ch]">
              {BODY.map((b, i) => {
                if (b.t === "h2")
                  return <h2 key={i} id={b.id} className={`${serifClass} scroll-mt-28 pt-10 text-[clamp(1.7rem,2.6vw,2.3rem)] font-medium leading-tight first:pt-0`} style={{ color: INK }}>{b.text}</h2>;
                if (b.t === "p")
                  return <p key={i} className="mt-5 text-[clamp(1.02rem,1.2vw,1.18rem)] leading-[1.85] text-[#142745]/85">{rich(b.html)}</p>;
                if (b.t === "list")
                  return (
                    <ul key={i} className="mt-6 flex flex-col gap-3.5">
                      {b.items.map((it, j) => (
                        <li key={j} className="flex gap-3 text-[clamp(1.02rem,1.2vw,1.15rem)] leading-[1.7] text-[#142745]/85">
                          <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-[#0a1733]" style={{ background: `${GOLD}33`, color: INK }}>{j + 1}</span>
                          <span>{rich(it)}</span>
                        </li>
                      ))}
                    </ul>
                  );
                if (b.t === "quote")
                  return (
                    <motion.figure key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }} className="my-12 border-l-2 pl-7" style={{ borderColor: GOLD }}>
                      <blockquote className={`${serifClass} text-[clamp(1.5rem,2.6vw,2rem)] font-medium italic leading-snug`} style={{ color: INK }}>“{b.text}”</blockquote>
                      {b.by ? <figcaption className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0c1f3f]/45">— {b.by}</figcaption> : null}
                    </motion.figure>
                  );
                // callout
                return (
                  <motion.aside key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }} className="my-10 overflow-hidden rounded-xl border p-7" style={{ borderColor: `${GOLD}55`, background: "linear-gradient(135deg, #fffdf7, #faf6ec)" }}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{b.title}</p>
                    <p className="mt-3 text-[clamp(1.05rem,1.3vw,1.2rem)] leading-relaxed text-[#142745]">{rich(b.html)}</p>
                  </motion.aside>
                );
              })}

              {/* share + tags */}
              <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-[#0c1f3f]/10 pt-7">
                <div className="flex flex-wrap gap-2">
                  {["Dubai", "Golden Visa", "Real Estate", "UAE"].map((t) => (
                    <span key={t} className="rounded-full border border-[#0c1f3f]/12 px-3 py-1 text-[12px] text-[#0c1f3f]/60">#{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-[#0c1f3f]/45">Share</span>
                  {["in", "X", "f", "↗"].map((s) => (
                    <button key={s} className="grid h-9 w-9 place-items-center rounded-full border border-[#0c1f3f]/15 text-[12px] font-semibold text-[#0c1f3f]/60 transition-colors hover:border-[#bfa15c] hover:text-[#bfa15c]">{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section data-tone="light" className="px-6 py-20 sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <div className="mx-auto max-w-3xl">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Frequently asked</p>
          <h2 className={`${serifClass} mt-4 text-[clamp(2rem,4vw,3rem)] font-medium`} style={{ color: INK }}>Questions investors ask us</h2>
          <div className="mt-9 flex flex-col gap-3">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="overflow-hidden rounded-xl border border-[#0c1f3f]/10 bg-white">
                  <button onClick={() => setOpenFaq(open ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className={`${serifClass} text-[1.2rem] font-medium`} style={{ color: INK }}>{f.q}</span>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[16px] transition-transform duration-300" style={{ borderColor: `${GOLD}66`, color: GOLD, transform: open ? "rotate(45deg)" : "none" }}>+</span>
                  </button>
                  <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <p className="px-6 pb-5 text-[15px] leading-relaxed text-[#142745]/75">{f.a}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      <section data-tone="light" className="px-6 py-20 sm:px-12 lg:px-20" style={{ background: "#fbfcfe" }}>
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <h2 className={`${serifClass} text-[clamp(1.8rem,3.4vw,2.6rem)] font-medium`} style={{ color: INK }}>Keep reading</h2>
            <a href="/insights" className="text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-[#0a1733]" style={{ color: GOLD }}>All insights →</a>
          </div>
          <div className="mt-9 grid gap-8 md:grid-cols-3">
            {RELATED.map((a, i) => (
              <motion.a key={a.slug} href={`/blog/${a.slug}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }} className="group block">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
                  <Image src={img(a.slug)} alt={a.title} fill sizes="(min-width:768px) 22rem, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0a1733]" style={{ background: GOLD }}>{a.cat}</span>
                </div>
                <h3 className={`${serifClass} mt-4 text-[1.35rem] font-medium leading-snug transition-colors group-hover:text-[#bfa15c]`} style={{ color: INK }}>{a.title}</h3>
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#0c1f3f]/45">{a.read} read</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section data-tone="dark" className="relative isolate overflow-hidden px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-2xl">
          <h2 className={`${serifClass} text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium leading-tight`}>Ready to invest toward your <span className="italic" style={{ color: GOLD }}>Golden Visa?</span></h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/70">We source the property, structure the purchase and file the visa — one team, end to end.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a href="/contact" className="rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0a1733] transition-transform hover:-translate-y-0.5" style={{ background: GOLD }}>Book a consultation</a>
            <a href="/golden-visa" className="rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/85 transition-colors hover:border-[#bfa15c] hover:text-[#bfa15c]">Explore Golden Visa</a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
