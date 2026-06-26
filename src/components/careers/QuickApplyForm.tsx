"use client";

import { useState } from "react";

export default function QuickApplyForm({ defaultRole }: { defaultRole?: string }) {
  const [submitting, setSubmitting] = useState(false);

  const [fileError, setFileError] = useState<string | null>(null);
  const [linkedinError, setLinkedinError] = useState<string | null>(null);

  const MAX_BYTES = 5 * 1024 * 1024; // 5MB

  function isValidLinkedInUrl(value: string) {
    const v = value.trim();
    if (!v) return false;

    // Ensure it parses as a URL (allow user to paste without protocol)
    let url: URL;
    try {
      url = new URL(v.startsWith("http") ? v : `https://${v}`);
    } catch {
      return false;
    }

    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    if (host !== "linkedin.com") return false;

    // Accept common profile paths
    const path = url.pathname.toLowerCase();
    const okPath =
      path.startsWith("/in/") ||
      path.startsWith("/company/") ||
      path.startsWith("/pub/") ||
      path.startsWith("/profile/");

    return okPath;
  }

  function handleLinkedInChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (!val.trim()) {
      setLinkedinError("LinkedIn profile link is required.");
      return;
    }
    if (!isValidLinkedInUrl(val)) {
      setLinkedinError("Please enter a valid LinkedIn link (e.g. https://linkedin.com/in/username).");
      return;
    }
    setLinkedinError(null);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) {
      setFileError("Please attach your resume (PDF, DOC, or DOCX).");
      return;
    }

    const okType =
      /pdf|msword|officedocument/.test(f.type) || /\.(pdf|docx?)$/i.test(f.name);

    if (!okType) {
      setFileError("Use PDF, DOC, or DOCX files only.");
      return;
    }
    if (f.size > MAX_BYTES) {
      setFileError("Max file size is 5MB.");
      return;
    }
    setFileError(null);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Validate LinkedIn on submit too (in case user never blurred the field)
    const form = e.currentTarget;
    const linkedinValue = (form.elements.namedItem("linkedin") as HTMLInputElement | null)?.value ?? "";

    const linkedOk = isValidLinkedInUrl(linkedinValue);
    if (!linkedOk) {
      setLinkedinError(
        !linkedinValue.trim()
          ? "LinkedIn profile link is required."
          : "Please enter a valid LinkedIn link (e.g. https://linkedin.com/in/username)."
      );
      e.preventDefault();
      return;
    }

    if (fileError) {
      e.preventDefault();
      return;
    }

    setSubmitting(true); // allow browser to submit the form normally
  }

  const disableSubmit = submitting || !!fileError || !!linkedinError;

  // navy/gold ContactPage treatment — light card, gold focus/submit
  const GOLD = "#bfa15c";
  const INK = "#0c1f3f";
  const inputCls =
    "mt-2 w-full rounded-md border bg-white px-4 py-3 text-[15px] text-[#0c1f3f] outline-none transition-colors focus:border-[#bfa15c]";
  const labelCls = "block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0c1f3f]/50";

  return (
    <form
      action="/api/apply"
      method="post"
      encType="multipart/form-data"
      onSubmit={onSubmit}
      className="grid gap-5 text-[#0c1f3f]"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            className={inputCls}
            style={{ borderColor: `${INK}22` }}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputCls}
            style={{ borderColor: `${INK}22` }}
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            required
            pattern="[0-9+()\-.\s]{7,}"
            title="Enter a valid phone number (digits, +, -, (), spaces allowed)."
            className={inputCls}
            style={{ borderColor: `${INK}22` }}
            placeholder="+91 9XXXXXXXXX"
          />
        </div>

        <div>
          <label htmlFor="role" className={labelCls}>
            Role (optional)
          </label>
          <input
            id="role"
            name="role"
            defaultValue={defaultRole}
            className={inputCls}
            style={{ borderColor: `${INK}22` }}
            placeholder="e.g., Corporate Immigration Specialist"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="linkedin" className={labelCls}>
            LinkedIn <span style={{ color: "#b91c1c" }}>*</span>
          </label>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            required
            onChange={handleLinkedInChange}
            onBlur={handleLinkedInChange}
            placeholder="https://linkedin.com/in/username"
            aria-describedby="linkedin-help linkedin-error"
            className={inputCls}
            style={{ borderColor: `${INK}22` }}
          />
          <p id="linkedin-help" className="mt-1 text-xs text-[#0c1f3f]/45">
            Please paste your LinkedIn profile link.
          </p>
          {linkedinError && (
            <p id="linkedin-error" role="alert" className="mt-1 text-xs font-semibold text-red-600">
              {linkedinError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="resume" className={labelCls}>
            Resume / CV
          </label>
          <input
            id="resume"
            name="resume"
            type="file"
            required
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            aria-describedby="resume-help resume-error"
            className="mt-2 block w-full text-sm text-[#0c1f3f]/70 file:me-3 file:rounded-md file:border-0 file:px-4 file:py-2 file:font-semibold file:text-[#0a1733] hover:file:opacity-90 file:[background:#bfa15c]"
          />
          <p id="resume-help" className="mt-1 text-xs text-[#0c1f3f]/45">
            Accepted: PDF, DOC, DOCX. Max 5MB.
          </p>
          {fileError && (
            <p id="resume-error" role="alert" className="mt-1 text-xs font-semibold text-red-600">
              {fileError}
            </p>
          )}
        </div>
      </div>

      {/* Message box */}
      <div>
        <label htmlFor="message" className={labelCls}>
          Message / Cover letter (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={1500}
          className={inputCls}
          style={{ borderColor: `${INK}22` }}
          placeholder="Tell us briefly about your experience, notice period, current location, and why you're applying…"
        />
        <p className="mt-1 text-xs text-[#0c1f3f]/45">Max 1500 characters.</p>
      </div>

      {/* spam honeypot */}
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={disableSubmit}
          className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          style={{ background: GOLD, color: "#0a1733" }}
        >
          {submitting ? "Submitting…" : "Submit application"}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
        <p className="text-xs text-[#0c1f3f]/55">Having trouble submitting? Please send your resume to hr@xiphias.in</p>
      </div>

      <p className="mt-1 text-[11px] text-[#0c1f3f]/45">
        By submitting, you agree that we may store and process your data for recruitment purposes
        in accordance with our privacy policy.
      </p>
    </form>
  );
}