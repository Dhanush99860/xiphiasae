// components/about/FAQ.tsx
import React from "react";
import ContactForm from "@/components/ContactForm";
import { Eyebrow } from "@/components/ui";

type QA = { q: string; a: string };

type Props = {
  /** Place the ContactForm on the left or right on large screens */
  contactSide?: "left" | "right";
  title?: string;
  subtitle?: string;
  faqs?: QA[];
};

const defaultFaqs: QA[] = [
  {
    q: "Do you guarantee visa approvals?",
    a: "No. We never guarantee outcomes. We provide regulation-aligned advice, meticulous documentation and transparent eligibility so risks are minimized.",
  },
  {
    q: "Is my information confidential?",
    a: "Yes. We operate with strict confidentiality, access controls and encrypted storage to protect HNI data and corporate information.",
  },
  {
    q: "Do you offer paid expert consultations?",
    a: "Yes. You can book a priority, fee-based session with a senior expert for in-depth strategy and program selection.",
  },
  {
    q: "Can you handle corporate programs?",
    a: "Yes. We provide enterprise immigration playbooks, compliance support and multi-jurisdiction deployments.",
  },
];

export default function FAQ({
  contactSide = "right",
  title = "Answers for Common Questions",
  subtitle,
  faqs = defaultFaqs,
}: Props) {
  const titleId = "faq-title";
  const contactFirst = contactSide === "left";

  return (
    <section
      id="faq"
      aria-labelledby={titleId}
      className="py-6 md:py-6"
    >
      {/* container aligned with hero + overflow safety */}
      <div className="container mx-auto lg:max-w-screen-2xl px-4 sm:px-6 lg:px-8 overflow-x-clip">
        {/* dark ink wrapper (Midnight Embassy) */}
        <div
          className={[
            "relative overflow-hidden rounded-3xl p-6 md:p-8 lg:p-10",
            "bg-white border border-gold/45",
            "text-ink",
          ].join(" ")}
        >
          {/* soft background accents (clipped) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="hidden sm:block absolute -top-24 -end-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
            <div className="hidden sm:block absolute -bottom-28 -start-10 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />
            <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent_80%)]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.06)_1px,transparent_1px)] bg-[size:22px_22px]" />
            </div>
          </div>

          {/* header */}
          <header className="relative mb-6 md:mb-8 text-center">
            <Eyebrow arabic="أسئلة" className="justify-center">
              FAQ
            </Eyebrow>
            <h2
              id={titleId}
              className="mt-3 font-sora text-2xl font-semibold tracking-tight text-ink md:text-3xl lg:text-[32px] break-words"
            >
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-2 max-w-2xl mx-auto text-sm text-ink/55">
                {subtitle}
              </p>
            ) : null}
          </header>

          {/* two-column layout (FAQ + Contact) */}
          <div className="relative grid gap-8 lg:grid-cols-12">
            {/* Contact column */}
            <aside
              className={[
                "lg:col-span-5",
                contactFirst ? "order-1" : "order-2",
                "lg:order-none",
              ].join(" ")}
              aria-label="Contact our team"
            >
              <ContactForm />
            </aside>

            {/* FAQ column */}
            <div
              className={[
                "lg:col-span-7 min-w-0",
                contactFirst ? "order-2" : "order-1",
                "lg:order-none",
              ].join(" ")}
            >
              <ul className="space-y-3">
                {faqs.map((f) => (
                  <li key={f.q} className="min-w-0">
                    <details className="group rounded-2xl border border-gold/45 bg-sand/50 p-4 open:pb-5 transition-colors open:border-gold/45">
                      <summary className="cursor-pointer list-none text-sm font-semibold leading-6 text-ink">
                        <span className="break-words">{f.q}</span>
                        <span
                          className="ms-2 text-gold group-open:hidden"
                          aria-hidden="true"
                        >
                          +
                        </span>
                        <span
                          className="ms-2 hidden text-gold group-open:inline"
                          aria-hidden="true"
                        >
                          −
                        </span>
                      </summary>
                      <p className="mt-2 text-sm text-ink/55 break-words">
                        {f.a}
                      </p>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* small footer note */}
          <p className="relative mt-4 text-center text-[11px] text-ink/45">
            Have a specific scenario? Share high-level details—no sensitive documents
            over email.
          </p>
        </div>
      </div>
    </section>
  );
}