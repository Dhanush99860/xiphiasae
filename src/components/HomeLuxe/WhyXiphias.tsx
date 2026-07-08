"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const GOLD = "#bfa15c";
const INK  = "#0c1f3f";

function Fade({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay }}>
      {children}
    </motion.div>
  );
}

const NUMS = [
  { v: "17",      u: "years" },
  { v: "10,000+", u: "families" },
  { v: "35",      u: "countries" },
  { v: "98%",     u: "approvals" },
];

const CREDS = [
  {
    logo:  "/images/personal/credentials/imc-fellow-logo.svg",
    label: "Fellow · Investment Migration Council",
    href:  "https://investmentmigration.org/",
  },
  {
    logo:  "/images/personal/credentials/imi-professionals-logo.png",
    label: "IMI Professional",
    href:  "https://www.imi-online.net/",
  },
];

const TEXT_CREDS = [
  "Licensed in the UAE",
  "ICCRC-trained (Canada)",
  "Source-of-funds & KYC",
];

const AWARDS = [
  { img: "/images/awards/xiphias-award-2019.png",         label: "Excellence 2019" },
  { img: "/images/awards/XIPHIAS-Awards-2021.jpg",        label: "Award 2021" },
  { img: "/images/awards/XIPHIAS-awards-toi-2022.jpg",    label: "Times of India 2022" },
  { img: "/images/awards/xiphias-awards-uk-2019.png",     label: "UK Recognition 2019" },
];

export default function WhyXiphias({
  serifClass,
  portraitSrc = "/images/avtar/varun-singh-md-xiphias.jpg",
}: {
  serifClass: string;
  portraitSrc?: string;
}) {
  return (
    <section data-tone="light" className="relative isolate px-6 py-16 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#eef3fb" }}>
      <div className="mx-auto max-w-6xl">

        {/* ── eyebrow ── */}
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
          <span className="h-px w-8" style={{ background: GOLD }} />
          Why XIPHIAS
          <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">لماذا نحن</span>
        </p>

        {/* ── two-column grid ── */}
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">

          {/* left — portrait (compact) */}
          <Fade>
            <figure className="w-full max-w-[260px] overflow-hidden rounded-lg border bg-white sm:max-w-[290px]" style={{ borderColor: `${INK}14` }}>
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={portraitSrc}
                  alt="Varun Singh, Managing Director of XIPHIAS Immigration"
                  fill
                  sizes="290px"
                  className="object-cover object-top"
                />
                <span aria-hidden className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}40` }} />
              </div>
              <figcaption className="px-5 py-4">
                <p className="text-[13px] font-semibold">Varun Singh</p>
                <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: GOLD }}>Managing Director, XIPHIAS</p>
              </figcaption>
            </figure>
          </Fade>

          {/* right — heading + stats + credentials + awards */}
          <div className="flex flex-col gap-7">

            {/* heading */}
            <Fade>
              <h2 className={`${serifClass} text-[clamp(1.9rem,3.8vw,3rem)] font-medium leading-[1.04]`}>
                Seventeen years. Ten thousand families.{" "}
                <span className="italic" style={{ color: GOLD }}>One standard.</span>
              </h2>
            </Fade>

            {/* stats strip */}
            <Fade delay={0.08}>
              <div className="flex flex-wrap gap-px overflow-hidden rounded-lg" style={{ background: `${INK}14` }}>
                {NUMS.map((s) => (
                  <div key={s.u} className="flex flex-1 flex-col items-center justify-center bg-[#eef3fb] px-5 py-5 text-center">
                    <span className={`${serifClass} text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-none`} style={{ color: GOLD }}>{s.v}</span>
                    <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0c1f3f]/50">{s.u}</span>
                  </div>
                ))}
              </div>
            </Fade>

            {/* credentials */}
            <Fade delay={0.14}>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/40">Credentials &amp; memberships</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {CREDS.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
                    >
                      <span className="relative h-9 w-9 shrink-0">
                        <Image src={c.logo} alt="" fill sizes="36px" className="object-contain" />
                      </span>
                      <span className="max-w-[10rem] text-[12px] font-medium leading-snug text-[#0c1f3f]/70 underline-offset-2 group-hover:underline">{c.label}</span>
                    </a>
                  ))}
                  {TEXT_CREDS.map((t) => (
                    <span key={t} className="rounded-full border px-3 py-1 text-[11px] font-medium text-[#0c1f3f]/60" style={{ borderColor: `${INK}20` }}>{t}</span>
                  ))}
                </div>
              </div>
            </Fade>

            {/* awards strip */}
            <Fade delay={0.2}>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/40">Recognition</p>
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {AWARDS.map((a, i) => (
                    <motion.div
                      key={a.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      className="group relative flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-300"
                      style={{
                        background: "linear-gradient(145deg, rgba(191,161,92,0.06) 0%, rgba(191,161,92,0.02) 100%)",
                        border: `1px solid rgba(191,161,92,0.18)`,
                        boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(191,161,92,0.45)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px -8px rgba(191,161,92,0.25), 0 1px 0 rgba(255,255,255,0.6) inset";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(191,161,92,0.18)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 0 rgba(255,255,255,0.6) inset";
                      }}
                    >
                      {/* subtle gold glow behind image */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(191,161,92,0.08) 0%, transparent 70%)" }}
                      />
                      <div className="relative h-16 w-full">
                        <Image
                          src={a.img}
                          alt={a.label}
                          fill
                          sizes="10rem"
                          className="object-contain drop-shadow-sm transition-all duration-300 group-hover:drop-shadow-md"
                        />
                      </div>
                      <p className="text-center text-[9px] font-semibold uppercase tracking-[0.14em] leading-tight transition-colors duration-300"
                        style={{ color: `rgba(191,161,92,0.55)` }}>
                        {a.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Fade>

          </div>
        </div>
      </div>
    </section>
  );
}
