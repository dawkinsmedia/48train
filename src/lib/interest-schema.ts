import { z } from "zod";

export const interestFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(80, "First name is too long"),
  lastName: z.string().trim().max(80).optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(254),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  smsConsent: z.boolean().optional().default(false),
  /** Honeypot — must stay empty */
  company: z.string().max(0).optional().or(z.literal("")),
});

export type InterestFormInput = z.infer<typeof interestFormSchema>;
