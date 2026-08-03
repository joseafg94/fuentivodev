import { z } from "zod";

export const CONTACT_NEEDS = [
  "website",
  "custom-system",
  "automation",
  "improve-existing",
  "unsure",
] as const;

export const CONTACT_LOCALES = ["es", "en"] as const;
export const CONTACT_MESSAGE_MAX_LENGTH = 2000;
export const CONTACT_MINIMUM_COMPLETION_MS = 1500;
export const CONTACT_MAX_PAYLOAD_LENGTH = 10_000;

const emailSchema = z.email();

export function isValidContact(value: string): boolean {
  if (emailSchema.safeParse(value).success) {
    return true;
  }

  const compactNumber = value.replace(/[\s().-]/g, "");

  return /^\+?\d{7,15}$/.test(compactNumber);
}

export const contactFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "name.invalid")
      .max(80, "name.invalid")
      .refine((value) => !/[\r\n]/.test(value), "name.invalid")
      .refine((value) => /\p{L}/u.test(value), "name.invalid"),
    business: z
      .string()
      .trim()
      .min(2, "business.invalid")
      .max(120, "business.invalid")
      .refine((value) => !/[\r\n]/.test(value), "business.invalid"),
    contact: z
      .string()
      .trim()
      .min(7, "contact.invalid")
      .max(160, "contact.invalid")
      .refine(isValidContact, "contact.invalid"),
    need: z.enum(CONTACT_NEEDS),
    message: z
      .string()
      .trim()
      .min(20, "message.tooShort")
      .max(CONTACT_MESSAGE_MAX_LENGTH, "message.tooLong"),
    locale: z.enum(CONTACT_LOCALES),
    website: z.string().max(200),
    startedAt: z.number().int().positive(),
  })
  .strict();

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ContactSubmissionStatus = "success" | "failure" | "invalid" | "spam";
export type ContactSubmissionResult = { status: ContactSubmissionStatus };

export function validateContactSubmission(
  input: unknown,
  now = Date.now(),
):
  | { success: true; data: ContactFormData }
  | { success: false; status: "invalid" | "spam" } {
  let serializedLength: number;

  try {
    serializedLength = JSON.stringify(input).length;
  } catch {
    return { success: false, status: "invalid" };
  }

  if (serializedLength > CONTACT_MAX_PAYLOAD_LENGTH) {
    return { success: false, status: "invalid" };
  }

  const parsed = contactFormSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, status: "invalid" };
  }

  const elapsed = now - parsed.data.startedAt;

  if (parsed.data.website.trim() || elapsed < CONTACT_MINIMUM_COMPLETION_MS) {
    return { success: false, status: "spam" };
  }

  return { success: true, data: parsed.data };
}
