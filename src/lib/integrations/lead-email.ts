import type { LeadRecord } from "@/lib/leads-store";

export type LeadEmailResult =
  | { ok: true }
  | { ok: false; error: string };

const DEFAULT_NOTIFY_EMAIL = "thefords526@gmail.com";

function getNotifyEmail(): string {
  return (
    process.env.LEAD_NOTIFICATION_EMAIL?.trim() || DEFAULT_NOTIFY_EMAIL
  );
}

function formatLeadText(lead: LeadRecord): string {
  const lines = [
    "New Saturday workout interest form submission",
    "",
    `First name: ${lead.firstName}`,
    `Last name: ${lead.lastName ?? "—"}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone ?? "—"}`,
    `SMS updates opted in: ${lead.smsConsent ? "Yes" : "No"}`,
    "",
    "Message:",
    lead.message?.trim() ? lead.message.trim() : "—",
    "",
    `Submitted: ${lead.createdAt}`,
    `Lead ID: ${lead.id}`,
  ];
  return lines.join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatLeadHtml(lead: LeadRecord): string {
  const message = lead.message?.trim()
    ? escapeHtml(lead.message.trim()).replace(/\n/g, "<br />")
    : "—";

  return `
    <h2 style="font-family:sans-serif;color:#171B19;">New interest form</h2>
    <table style="font-family:sans-serif;font-size:15px;color:#171B19;line-height:1.5;">
      <tr><td><strong>First name</strong></td><td>${escapeHtml(lead.firstName)}</td></tr>
      <tr><td><strong>Last name</strong></td><td>${escapeHtml(lead.lastName ?? "—")}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(lead.email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(lead.phone ?? "—")}</td></tr>
      <tr><td><strong>SMS opt-in</strong></td><td>${lead.smsConsent ? "Yes" : "No"}</td></tr>
    </table>
    <p style="font-family:sans-serif;font-size:15px;"><strong>Message</strong><br />${message}</p>
    <p style="font-family:sans-serif;font-size:13px;color:#68745B;">Submitted ${escapeHtml(lead.createdAt)} · ID ${escapeHtml(lead.id)}</p>
  `.trim();
}

export async function sendLeadNotificationEmail(
  lead: LeadRecord,
): Promise<LeadEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Saturday Workout <notifications@resend.dev>";
  const to = getNotifyEmail();

  const subject = `New interest: ${lead.firstName}${lead.lastName ? ` ${lead.lastName}` : ""}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text: formatLeadText(lead),
        html: formatLeadHtml(lead),
        reply_to: lead.email,
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return {
        ok: false,
        error: `Resend returned ${res.status}${detail ? `: ${detail.slice(0, 200)}` : ""}`,
      };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Email request failed";
    return { ok: false, error: message };
  }
}

export function getLeadNotificationEmail(): string {
  return getNotifyEmail();
}
