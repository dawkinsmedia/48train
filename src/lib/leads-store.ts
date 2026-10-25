import { mkdir, readFile, appendFile, access } from "fs/promises";
import path from "path";

export type LeadRecord = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  message?: string;
  smsConsent: boolean;
  createdAt: string;
  source: "interest-form";
  ipHash?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.jsonl");

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

async function ensureDataDir(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
}

export async function emailExists(email: string): Promise<boolean> {
  const normalized = normalizeEmail(email);
  try {
    await access(LEADS_FILE);
  } catch {
    return false;
  }

  const content = await readFile(LEADS_FILE, "utf8");
  for (const line of content.split("\n")) {
    if (!line.trim()) continue;
    try {
      const record = JSON.parse(line) as LeadRecord;
      if (normalizeEmail(record.email) === normalized) return true;
    } catch {
      // skip malformed lines
    }
  }
  return false;
}

export async function saveLead(
  lead: Omit<LeadRecord, "id" | "createdAt" | "source">,
): Promise<LeadRecord> {
  await ensureDataDir();
  const record: LeadRecord = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    source: "interest-form",
  };
  await appendFile(LEADS_FILE, `${JSON.stringify(record)}\n`, "utf8");
  return record;
}
