"use client";

import { motion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">{children}</div>;
}
function Rise({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}>
      {words.map((w, i) => (<span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}><motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span></span>))}
    </motion.span>
  );
}
function Fade({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay }}>{children}</motion.div>;
}
function spotlight(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget; const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
  el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
}

const ROUTES = [
  { k: "Donation", from: "from $200,000", tag: "Speed & simplicity", line: "A non-refundable contribution to a national fund — the fastest, cleanest route, with no asset to manage.", points: ["Lowest entry threshold", "Fewest moving parts", "Fastest to passport"] },
  { k: "Real estate", from: "from $300,000", tag: "Asset-backed value", line: "A government-approved property investment, resaleable after a holding period — your capital stays invested.", points: ["Tangible, resaleable asset", "Potential rental yield", "Capital retained, not spent"] },
];
const BENEFITS = [
  { v: "140+", t: "Visa-free", d: "UK, Schengen, Singapore & more." },
  { v: "Whole family", t: "Included", d: "Spouse, children & dependent parents." },
  { v: "No residency", t: "Required", d: "Never need to live there." },
  { v: "Tax-efficient", t: "Worldwide", d: "No tax on foreign income or estate." },
  { v: "Lifetime", t: "& inheritable", d: "Citizenship that passes to your heirs." },
  { v: "1–6 months", t: "Timeline", d: "From application to passport." },
];

export default function Section4CitRoutes({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <section className="relative isolate flex min-h-screen items-center px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Ambient tone="dark" />
        <Badge>Section 4 · Routes + why it works</Badge>
        <div className="mx-auto w-full max-w-6xl">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />How you invest<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">طرق الاستثمار</span></p>
          <h2 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04]`}><Rise text="Two routes." /><span className="italic" style={{ color: GOLD }}><Rise text="One second passport." delay={0.2} /></span></h2>

          {/* two clickable route cards */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {ROUTES.map((rt, i) => (
              <Fade key={rt.k} delay={i * 0.1}>
                <a href="#" onPointerMove={spotlight} className="group relative block h-full cursor-pointer overflow-hidden rounded-lg border p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.7)]" style={{ borderColor: "rgba(191,161,92,0.28)", background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0))", ["--mx" as string]: "50%", ["--my" as string]: "50%" }}>
                  <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(18rem 18rem at var(--mx) var(--my), rgba(191,161,92,0.16), transparent 60%)" }} />
                  <div className="relative flex items-start justify-between">
                    <div><p className="text-[12px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>{rt.tag}</p><h3 className={`${serifClass} mt-2 text-[clamp(1.8rem,3vw,2.4rem)] font-medium transition-colors group-hover:text-[#bfa15c]`}>{rt.k}</h3></div>
                    <span className={`${serifClass} text-[1.2rem] italic`} style={{ color: GOLD }}>{rt.from}</span>
                  </div>
                  <p className="relative mt-5 text-[15px] leading-relaxed text-white/70">{rt.line}</p>
                  <ul className="relative mt-6 flex flex-col gap-3">{rt.points.map((pt) => <li key={pt} className="flex items-center gap-3 text-[14px] text-white/80"><span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />{pt}</li>)}</ul>
                  <span className="relative mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors group-hover:text-[#bfa15c]" style={{ color: "#eef3fb" }}>Explore this route <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>
                </a>
              </Fade>
            ))}
          </div>

          {/* interactive benefit tiles */}
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {BENEFITS.map((bn, i) => (
              <Fade key={bn.t} delay={i * 0.05}>
                <div onPointerMove={spotlight} className="group relative h-full cursor-default overflow-hidden rounded-lg border p-5 transition-all duration-300 hover:-translate-y-1" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", ["--mx" as string]: "50%", ["--my" as string]: "50%" }}>
                  <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(10rem 10rem at var(--mx) var(--my), rgba(191,161,92,0.14), transparent 60%)" }} />
                  <div className={`${serifClass} relative text-[clamp(1.1rem,1.6vw,1.5rem)] font-medium leading-none`} style={{ color: GOLD }}>{bn.v}</div>
                  <div className="relative mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">{bn.t}</div>
                  <p className="relative mt-2 text-[12px] leading-relaxed text-white/55">{bn.d}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
