import { NextResponse } from "next/server";
import { interestFormSchema } from "@/lib/interest-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { emailExists, saveLead } from "@/lib/leads-store";
import { sendLeadToGhl } from "@/lib/integrations/ghl";
import { sendLeadNotificationEmail } from "@/lib/integrations/lead-email";
import { createHash } from "crypto";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const max = Number(process.env.INTEREST_RATE_LIMIT_MAX ?? 5);
  const windowMs = Number(process.env.INTEREST_RATE_LIMIT_WINDOW_MS ?? 900_000);
  const ip = getClientIp(request);
  const rate = checkRateLimit(`interest:${ip}`, max, windowMs);

  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      {
        status: 429,
        headers: rate.retryAfterSeconds
          ? { "Retry-After": String(rate.retryAfterSeconds) }
          : undefined,
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = interestFormSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.errors[0]?.message ?? "Invalid form data.";
    return NextResponse.json({ error: first }, { status: 400 });
  }

  const data = parsed.data;

  if (data.company) {
    return NextResponse.json({ ok: true, message: "success" });
  }

  const email = data.email.trim().toLowerCase();
  if (await emailExists(email)) {
    return NextResponse.json(
      {
        error:
          "We already have your email on the list. We hope to see you Saturday at 7 AM!",
      },
      { status: 409 },
    );
  }

  const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 16);

  let record;
  try {
    record = await saveLead({
      firstName: data.firstName,
      lastName: data.lastName || undefined,
      email,
      phone: data.phone || undefined,
      message: data.message || undefined,
      smsConsent: Boolean(data.smsConsent),
      ipHash,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to save your information right now. Please try again." },
      { status: 503 },
    );
  }

  const [ghl, emailNotify] = await Promise.all([
    sendLeadToGhl(record),
    sendLeadNotificationEmail(record),
  ]);

  return NextResponse.json({
    ok: true,
    message: "You're on the list. We hope to see you Saturday at 7 AM!",
    ghlSynced: ghl.ok,
    emailNotified: emailNotify.ok,
  });
}
