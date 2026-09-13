import "server-only";

import { crmSql, getLiveCrmPool, isLiveCrmConfigured } from "@/lib/crm/live-sql";

function crmTimestamp(d = new Date()) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dd = String(d.getDate()).padStart(2, "0");
  const mmm = months[d.getMonth()];
  const yyyy = d.getFullYear();
  let hours = d.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const hh = String(hours).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${dd}-${mmm}-${yyyy} ${hh}:${mi} ${ampm}`;
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

/** Mirrors a website lead into the legacy Dubai CRM enquiry table. */
export async function saveLeadToCrm(lead: Record<string, any>): Promise<void> {
  if (!isLiveCrmConfigured()) {
    console.warn("[x-hub] Dubai CRM not configured - lead not mirrored:", lead?.id);
    return;
  }

  const name = text(lead?.name);
  const email = text(lead?.email);
  if (!name && !email) return;

  const enquiryText = [
    text(lead?.message) || "(no message provided)",
    text(lead?.country) ? `Country: ${text(lead.country)}` : "",
    text(lead?.track) ? `Track: ${text(lead.track)}` : "",
    text(lead?.page) ? `Page: ${text(lead.page)}` : "",
    `Source: ${text(lead?.source) || "website"}`,
    Array.isArray(lead?.tags) && lead.tags.length ? `Tags: ${lead.tags.join(", ")}` : "",
    `x-hub id: ${text(lead?.id)}`,
  ]
    .filter(Boolean)
    .join(" | ");

  const pool = await getLiveCrmPool("dubai");

  await pool
    .request()
    .input("NAME", crmSql.VarChar(50), name.slice(0, 50))
    .input("EMAIL", crmSql.VarChar(50), email.slice(0, 50))
    .input("PHONE", crmSql.VarChar(crmSql.MAX), text(lead?.phone))
    .input("ENQUIRY", crmSql.VarChar(crmSql.MAX), enquiryText)
    .input("ENT_DATE", crmSql.VarChar(50), crmTimestamp())
    .input("CODE", crmSql.VarChar(50), null)
    .execute("sp_Enquiry");

  console.log("[x-hub] Lead mirrored to Dubai CRM:", lead?.id);
}
