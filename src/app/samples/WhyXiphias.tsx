"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const GOLD = "#bfa15c";
const INK = "#0c1f3f";

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-black/15 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 backdrop-blur">{children}</div>;
}
function Fade({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay }}>{children}</motion.div>;
}

const NUMS = [
  { v: "17", u: "years advising" },
  { v: "10,000+", u: "families relocated" },
  { v: "35", u: "jurisdictions" },
  { v: "98%", u: "approval rate" },
];
const CREDS = [
  { logo: "/images/personal/credentials/imc-fellow-logo.svg", label: "Fellow · Investment Migration Council" },
  { logo: "/images/personal/credentials/imi-professionals-logo.png", label: "IMI Professional" },
];
const TEXT_CREDS = ["Licensed in the UAE", "ICCRC-trained counsel (Canada)", "Source-of-funds & KYC rigour"];
const AWARDS = [
  { img: "/images/awards/xiphias-award-2019.png", label: "Excellence 2019" },
  { img: "/images/awards/XIPHIAS-Awards-2021.jpg", label: "Industry Award 2021" },
  { img: "/images/awards/XIPHIAS-awards-toi-2022.jpg", label: "Times of India 2022" },
  { img: "/images/awards/xiphias-awards-uk-2019.png", label: "UK Recognition 2019" },
];

export default function WhyXiphias({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <section className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Badge>Info section · Why XIPHIAS (credentials & awards)</Badge>
        <div className="mx-auto max-w-6xl">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Why XIPHIAS<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">لماذا نحن</span></p>
          <h2 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.2rem,4.4vw,3.4rem)] font-medium leading-[1.04]`}>Seventeen years. Ten thousand families. <span className="italic" style={{ color: GOLD }}>One standard.</span></h2>

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            {/* founder card */}
            <Fade>
              <figure className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: `${INK}14` }}>
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image src="/images/avtar/varun-singh-md-xiphias.jpg" alt="Varun Singh, Managing Director of XIPHIAS Immigration" fill sizes="(min-width:1024px) 28rem, 100vw" className="object-cover object-top" />
                  <span aria-hidden className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}40` }} />
                </div>
                <figcaption className="p-6">
                  <p className={`${serifClass} text-[1.05rem] italic leading-relaxed text-[#0c1f3f]/80`}>“We don&apos;t sell programmes. We build a family&apos;s plan B — and I stand behind every case, personally.”</p>
                  <p className="mt-4 text-[15px] font-semibold">Varun Singh</p>
                  <p className="text-[12px] uppercase tracking-[0.16em]" style={{ color: GOLD }}>Managing Director, XIPHIAS</p>
                </figcaption>
              </figure>
            </Fade>

            {/* numbers + credentials + awards */}
            <div className="flex flex-col gap-10">
              <Fade>
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg sm:grid-cols-4" style={{ background: `${INK}12` }}>
                  {NUMS.map((s) => (
                    <div key={s.u} className="bg-[#f3f7fd] px-5 py-6">
                      <div className={`${serifClass} text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-none`} style={{ color: GOLD }}>{s.v}</div>
                      <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0c1f3f]/55">{s.u}</div>
                    </div>
                  ))}
                </div>
              </Fade>

              <Fade delay={0.1}>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">Credentials & memberships</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
                    {CREDS.map((c) => (
                      <div key={c.label} className="flex items-center gap-3">
                        <span className="relative h-11 w-11 shrink-0"><Image src={c.logo} alt="" fill sizes="44px" className="object-contain" /></span>
                        <span className="max-w-[12rem] text-[13px] font-medium leading-snug text-[#0c1f3f]/75">{c.label}</span>
                      </div>
                    ))}
                    {TEXT_CREDS.map((t) => (
                      <span key={t} className="rounded-full border px-3.5 py-1.5 text-[12px] font-medium text-[#0c1f3f]/70" style={{ borderColor: `${INK}22` }}>{t}</span>
                    ))}
                  </div>
                </div>
              </Fade>

              <Fade delay={0.2}>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">Recognition</p>
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {AWARDS.map((a) => (
                      <div key={a.label} className="group rounded-lg border bg-white p-4 transition-shadow hover:shadow-[0_18px_40px_-26px_rgba(8,18,42,0.5)]" style={{ borderColor: `${INK}14` }}>
                        <div className="relative h-20 w-full"><Image src={a.img} alt={a.label} fill sizes="12rem" className="object-contain" /></div>
                        <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.1em] text-[#0c1f3f]/55">{a.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
