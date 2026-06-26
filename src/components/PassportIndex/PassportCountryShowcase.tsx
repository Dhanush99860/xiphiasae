import Link from "next/link";
import { ArrowRight, BadgeCheck, Globe2, Plane } from "lucide-react";
import type { PassportRecord } from "@/data/passport-index";
import { worldMapCountries, worldMapViewBox } from "@/data/world-map-paths";
import Flag from "@/components/Countries/Flag";
import { serifClass } from "@/components/PassportIndex/PassportIndexShared";

function pathBounds(path: string) {
  const values = path.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  const xs: number[] = [];
  const ys: number[] = [];

  for (let index = 0; index < values.length; index += 2) {
    xs.push(values[index]);
    ys.push(values[index + 1]);
  }

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const width = Math.max(10, maxX - minX);
  const height = Math.max(10, maxY - minY);
  const padding = Math.max(width, height) * 0.22;

  return `${minX - padding} ${minY - padding} ${width + padding * 2} ${height + padding * 2}`;
}

export default function PassportCountryShowcase({ record }: { record: PassportRecord }) {
  const country = worldMapCountries.find((item) => item.code === record.code);
  const viewBox = country ? pathBounds(country.path) : worldMapViewBox;

  return (
    <section className="mx-auto max-w-screen-2xl px-4 pb-10 md:px-6">
      <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] text-white shadow-2xl shadow-black/50 backdrop-blur-sm">
        <style>{`
          @keyframes xiphiasCountryTrace {
            from { stroke-dashoffset: 1200; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes xiphiasPassportFloat {
            0%, 100% { transform: translateY(0) rotate(-2deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
          }
          .country-showcase-outline {
            stroke-dasharray: 1200;
            animation: xiphiasCountryTrace 1.8s ease-out both;
          }
          .country-passport-float {
            animation: xiphiasPassportFloat 5s ease-in-out infinite;
          }
        `}</style>

        <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#bfa15c]/40 bg-[#bfa15c]/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#bfa15c]">
              <Globe2 className="size-4" />
              Country mobility profile
            </div>
            <div className="mt-5 flex items-center gap-4">
              <Flag code={record.code} size={56} />
              <h2 className={`${serifClass} text-4xl font-medium leading-tight text-white md:text-6xl`}>
                {record.country}
              </h2>
            </div>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/70">{record.xiphiasLens}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/12 bg-white/[0.04] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#bfa15c]">Rank</p>
                <p className="mt-2 text-3xl font-semibold text-white">{record.rank}</p>
              </div>
              <div className="rounded-xl border border-white/12 bg-white/[0.04] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#bfa15c]">Access</p>
                <p className="mt-2 text-3xl font-semibold text-[#bfa15c]">{record.score}</p>
              </div>
              <div className="rounded-xl border border-white/12 bg-white/[0.04] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#bfa15c]">Band</p>
                <p className="mt-2 text-xl font-semibold text-white">{record.band}</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {record.pathways.slice(0, 2).map((pathway) => (
                <Link
                  key={pathway.href}
                  href={pathway.href}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#bfa15c] px-4 py-3 text-sm font-semibold text-[#0c1f3f] transition hover:bg-[#d8bd78]"
                >
                  {pathway.label}
                  <ArrowRight className="size-4" />
                </Link>
              ))}
              <Link
                href="/passport-index/compare"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:border-[#bfa15c]/55 hover:bg-white/[0.06]"
              >
                Compare passport
              </Link>
            </div>
          </div>

          <div className="relative min-h-[430px] overflow-hidden rounded-xl border border-white/12 bg-[#0c1f3f] p-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(191,161,92,0.2),transparent_48%)]" />
            <svg
              viewBox={viewBox}
              aria-label={`${record.country} country outline`}
              role="img"
              className="relative z-10 h-[330px] w-full overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              {country ? (
                <>
                  <path d={country.path} fill="rgba(191,161,92,0.22)" stroke="#bfa15c" strokeWidth="5" vectorEffect="non-scaling-stroke" />
                  <path className="country-showcase-outline" d={country.path} fill="none" stroke="#fbfaf7" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </>
              ) : null}
            </svg>

            <div className="country-passport-float absolute bottom-7 right-7 z-20 w-52 rounded-lg border border-[#bfa15c]/50 bg-[#0a1733] p-4 shadow-2xl shadow-black/50">
              <div className="rounded-md border border-[#bfa15c]/35 p-4">
                <div className="flex items-center justify-between">
                  <Flag code={record.code} size={36} />
                  <span className="rounded-full bg-[#bfa15c] px-3 py-1 text-xs font-semibold text-[#0c1f3f]">{record.code}</span>
                </div>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#bfa15c]">XIPHIAS</p>
                <p className={`${serifClass} mt-1 text-lg font-medium text-white`}>Mobility Pass</p>
              </div>
            </div>

            <div className="absolute left-5 top-5 z-20 grid gap-2">
              {[BadgeCheck, Plane].map((Icon, index) => (
                <span key={index} className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[#bfa15c] backdrop-blur">
                  <Icon className="size-5" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
