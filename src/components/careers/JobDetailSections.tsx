// src/components/careers/JobDetailSections.tsx
import type { Job } from "@/lib/jobs";

const GOLD = "#bfa15c";

export default function JobDetailSections({ job, serifClass }: { job: Job; serifClass: string }) {
  return (
    <div className="text-white">
      {/* Hero image (optional) */}

      {/* Summary */}
      {job.summary && (
        <Section title="Role summary" serifClass={serifClass}>
          <p className="text-sm leading-7 text-white/65">{job.summary}</p>
        </Section>
      )}

      {/* About the role (raw body string kept lightweight) */}
      {job.body && (
        <Section title="About the role" serifClass={serifClass}>
          <p className="text-sm leading-7 text-white/65">{job.body}</p>
        </Section>
      )}

      {/* Responsibilities / Requirements */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {job.responsibilities?.length ? (
          <Card title="Responsibilities" serifClass={serifClass}>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/65 marker:text-[#bfa15c]">
              {job.responsibilities.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </Card>
        ) : null}

        {job.requirements?.length ? (
          <Card title="Requirements" serifClass={serifClass}>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/65 marker:text-[#bfa15c]">
              {job.requirements.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </Card>
        ) : null}
      </div>

      {/* Nice to have / Benefits */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {job.niceToHave?.length ? (
          <Card title="Nice to have" serifClass={serifClass}>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/65 marker:text-[#bfa15c]">
              {job.niceToHave.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </Card>
        ) : null}

        {job.benefits?.length ? (
          <Card title="Benefits" serifClass={serifClass}>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/65 marker:text-[#bfa15c]">
              {job.benefits.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </Card>
        ) : null}
      </div>

      {/* Process + Profile */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {job.processSteps?.length ? (
          <Card title="Hiring process" serifClass={serifClass}>
            <ol className="mt-2 list-decimal pl-5 text-sm text-white/65 marker:text-[#bfa15c]">
              {job.processSteps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </Card>
        ) : null}

        {(job.experienceMin ||
          job.experienceMax ||
          job.tags?.length ||
          job.programs?.length ||
          job.countries?.length) ? (
          <Card title="Profile & focus" serifClass={serifClass}>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/65 marker:text-[#bfa15c]">
              {job.experienceMin || job.experienceMax ? (
                <li>
                  Experience: {job.experienceMin ?? ""}
                  {job.experienceMax ? `–${job.experienceMax}` : ""} years
                </li>
              ) : null}
              {job.tags?.length ? <li>Tags: {job.tags.join(", ")}</li> : null}
              {job.programs?.length ? (
                <li>Programs: {job.programs.join(", ")}</li>
              ) : null}
              {job.countries?.length ? (
                <li>Countries: {job.countries.join(", ")}</li>
              ) : null}
            </ul>
          </Card>
        ) : null}
      </div>

      {/* Contact */}
      {job.contactEmail && (
        <p className="mt-6 text-sm text-white/65">
          Questions? Email{" "}
          <a
            href={`mailto:${job.contactEmail}`}
            className="font-semibold underline decoration-2 underline-offset-2"
            style={{ color: GOLD }}
          >
            {job.contactEmail}
          </a>
        </p>
      )}
    </div>
  );
}

/* ---------- tiny internal UI primitives (keep it simple & consistent) ---------- */

function Section({
  title,
  serifClass,
  children,
}: {
  title: string;
  serifClass: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h2 className={`${serifClass} text-[1.4rem] font-medium text-white`}>{title}</h2>
      <div className="mt-3">{children}</div>
      <hr className="mt-5" style={{ borderColor: "rgba(191,161,92,0.2)" }} />
    </section>
  );
}

function Card({
  title,
  serifClass,
  children,
}: {
  title: string;
  serifClass: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="h-full rounded-2xl p-6"
      style={{ border: "1px solid rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.02)" }}
    >
      <h2 className={`${serifClass} text-[1.3rem] font-medium text-white`}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
