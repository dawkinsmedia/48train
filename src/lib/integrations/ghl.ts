import type { LeadRecord } from "@/lib/leads-store";

export type GhlWebhookResult =
  | { ok: true; status: number }
  | { ok: false; status?: number; error: string };

/**
 * Configurable GoHighLevel (or compatible) inbound webhook.
 * Map fields in one place when your GHL workflow is ready.
 */
export async function sendLeadToGhl(lead: LeadRecord): Promise<GhlWebhookResult> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return { ok: false, error: "GHL webhook not configured" };
  }

  const bearer = process.env.GHL_WEBHOOK_BEARER_TOKEN?.trim();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (bearer) {
    headers.Authorization = `Bearer ${bearer}`;
  }

  const payload = {
    firstName: lead.firstName,
    lastName: lead.lastName ?? "",
    email: lead.email,
    phone: lead.phone ?? "",
    message: lead.message ?? "",
    smsConsent: lead.smsConsent,
    tags: ["saturday-workout-interest"],
    source: lead.source,
    submittedAt: lead.createdAt,
    customFields: {
      event: "Heritage Preserve Saturday Workout",
      leader: "Ethan Ford",
    },
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: `Webhook returned ${res.status}`,
      };
    }

    return { ok: true, status: res.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook request failed";
    return { ok: false, error: message };
  }
}

export function isGhlConfigured(): boolean {
  return Boolean(process.env.GHL_WEBHOOK_URL?.trim());
}
