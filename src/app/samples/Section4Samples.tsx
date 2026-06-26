"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";

const GOLD = "#bfa15c";
const INK = "#14110c";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-black/15 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 backdrop-blur">
      {children}
    </div>
  );
}

function Header() {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />
      How it works
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">كيف نعمل</span>
    </p>
  );
}

const STEPS = [
  { no: "01", title: "Private consultation", line: "A confidential conversation about your goals, timeline and budget.", detail: "By invitation, under NDA — with a senior advisor, not a call-centre." },
  { no: "02", title: "Strategy & route", line: "We map the most secure, cost-effective pathway across 25+ jurisdictions.", detail: "Side by side: investment, timeline, family inclusion and passport power." },
  { no: "03", title: "Handled end to end", line: "Filing, liaison and follow-through — managed by your named advisor.", detail: "One desk, in writing, from application to approval." },
  { no: "04", title: "Arrival", line: "Your residency or citizenship secured — and we remain on call.", detail: "Banking, schooling and relocation support once you land." },
];

/* ── P1 · vertical timeline, gold line draws on scroll ────────────────── */
function Timeline({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  return (
    <section className="relative px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f6f1e8" }}>
      <Badge>P1 · Timeline · gold line draws on scroll</Badge>
      <div className="mx-auto max-w-4xl">
        <Header />
        <h2 className={`${serifClass} mt-6 text-[clamp(2rem,4.4vw,3.4rem)] font-medium`}>The process.</h2>
        <div ref={ref} className="relative mt-14 ps-10">
          <div className="absolute left-1 top-2 h-[calc(100%-2rem)] w-px" style={{ background: `${INK}1a` }}>
            <motion.div className="h-full w-full origin-top" style={{ background: GOLD, scaleY: scrollYProgress }} />
          </div>
          <div className="flex flex-col gap-14">
            {STEPS.map((s) => (
              <motion.div
                key={s.no}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <span className="absolute -left-[2.35rem] top-1.5 h-2.5 w-2.5 rounded-full ring-4" style={{ background: GOLD, boxShadow: `0 0 0 4px #f6f1e8` }} />
                <div className="flex items-baseline gap-4">
                  <span className="text-[12px] font-semibold tracking-[0.2em]" style={{ color: GOLD }}>{s.no}</span>
                  <h3 className={`${serifClass} text-[1.7rem] font-medium`}>{s.title}</h3>
                </div>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#14110c]/65">{s.line}</p>
                <p className="mt-0 max-h-0 overflow-hidden text-[14px] italic leading-relaxed text-[#14110c]/55 opacity-0 transition-all duration-500 group-hover:mt-2 group-hover:max-h-20 group-hover:opacity-100">
                  {s.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── P2 · sticky intro left, steps scroll on the right ───────────────── */
function StickySplit({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f6f1e8" }}>
      <Badge>P2 · Sticky intro + scrolling steps</Badge>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <Header />
          <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium leading-[1.05]`}>
            Quietly handled,
            <br />
            <span className="italic" style={{ color: GOLD }}>end to end.</span>
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[#14110c]/65">
            One named advisor runs your case from the first conversation to the day you arrive.
          </p>
        </div>
        <div className="flex flex-col">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.no}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group border-t py-8 transition-colors"
              style={{ borderColor: `${INK}1a` }}
            >
              <div className="flex items-baseline gap-5">
                <span className={`${serifClass} text-[2.2rem] font-medium`} style={{ color: i === 0 ? GOLD : `${INK}30` }}>{s.no}</span>
                <div>
                  <h3 className={`${serifClass} text-[1.7rem] font-medium transition-colors group-hover:text-[color:var(--g)]`} style={{ ["--g" as string]: GOLD }}>{s.title}</h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[#14110c]/65">{s.line}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── P3 · horizontal pinned scrollytelling (desktop) ─────────────────── */
function PinnedHorizontal({ serifClass }: { serifClass: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mm = gsap.matchMedia();
    mm.add("(min-width:1024px)", () => {
      const track = trackRef.current!;
      const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
      const st = ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top",
        end: () => `+=${getDist()}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => gsap.set(track, { x: -getDist() * self.progress }),
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, []);
  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#efe7d8" }}>
      <Badge>P3 · Horizontal pinned (scroll → sideways)</Badge>
      <div className="mx-auto max-w-6xl">
        <Header />
        <h2 className={`${serifClass} mt-6 text-[clamp(2rem,4.4vw,3.4rem)] font-medium`}>The process.</h2>
      </div>
      <div ref={trackRef} className="mt-16 flex w-max gap-8">
        {STEPS.map((s) => (
          <div key={s.no} className="group flex h-[44vh] w-[78vw] shrink-0 flex-col justify-between rounded-sm border p-8 sm:w-[46vw] lg:w-[32rem]" style={{ borderColor: `${INK}1a`, background: "#f6f1e8" }}>
            <span className={`${serifClass} text-[4rem] font-medium leading-none`} style={{ color: `${GOLD}` }}>{s.no}</span>
            <div>
              <h3 className={`${serifClass} text-[2rem] font-medium`}>{s.title}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#14110c]/65">{s.line}</p>
              <p className="mt-3 text-[14px] italic text-[#14110c]/50">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Section4Samples({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <Timeline serifClass={serifClass} />
      <StickySplit serifClass={serifClass} />
      <PinnedHorizontal serifClass={serifClass} />
    </main>
  );
}
