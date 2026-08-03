import { describe, expect, it, vi } from "vitest";

import {
  CONTACT_MESSAGE_MAX_LENGTH,
  contactFormSchema,
  validateContactSubmission,
} from "@/lib/contact-form";
import type { ContactFormData } from "@/lib/contact-form";
import {
  buildContactEmail,
  createContactIdempotencyKey,
  deliverContactEmail,
  getContactEmailConfig,
} from "@/lib/contact-delivery";

const now = 1_800_000_000_000;
const validSubmission: ContactFormData = {
  name: "José Fuentes",
  business: "Fuentivo",
  contact: "jose@example.com",
  need: "custom-system",
  message: "Necesitamos organizar un proceso que hoy se gestiona manualmente.",
  locale: "es",
  website: "",
  startedAt: now - 2_000,
};
const emailConfig = {
  apiKey: "re_test",
  to: "fuentivo@gmail.com",
  from: "Fuentivo <contacto@example.com>",
};

describe("contact form validation", () => {
  it("accepts valid Spanish and English submissions", () => {
    expect(validateContactSubmission(validSubmission, now).success).toBe(true);
    expect(
      validateContactSubmission(
        {
          ...validSubmission,
          locale: "en",
          contact: "+1 (305) 555-0198",
          message: "We need a website that explains our services more clearly.",
        },
        now,
      ).success,
    ).toBe(true);
  });

  it("rejects empty required fields", () => {
    expect(
      contactFormSchema.safeParse({
        ...validSubmission,
        name: "",
        business: "",
        contact: "",
        message: "",
      }).success,
    ).toBe(false);
  });

  it("rejects invalid email and phone formats", () => {
    expect(contactFormSchema.safeParse({ ...validSubmission, contact: "name@" }).success).toBe(false);
    expect(contactFormSchema.safeParse({ ...validSubmission, contact: "12345" }).success).toBe(false);
  });

  it("rejects line breaks in fields used by the email subject", () => {
    expect(
      contactFormSchema.safeParse({
        ...validSubmission,
        name: "José\nBcc: attacker@example.com",
      }).success,
    ).toBe(false);
  });

  it("rejects messages over the maximum length", () => {
    expect(
      contactFormSchema.safeParse({
        ...validSubmission,
        message: "a".repeat(CONTACT_MESSAGE_MAX_LENGTH + 1),
      }).success,
    ).toBe(false);
  });

  it("rejects honeypot and submissions completed too quickly as spam", () => {
    expect(
      validateContactSubmission({ ...validSubmission, website: "spam.example" }, now),
    ).toEqual({ success: false, status: "spam" });
    expect(
      validateContactSubmission({ ...validSubmission, startedAt: now - 500 }, now),
    ).toEqual({ success: false, status: "spam" });
  });
});

describe("contact email delivery", () => {
  it("detects missing server-only email configuration", () => {
    expect(getContactEmailConfig({})).toBeUndefined();
    expect(
      getContactEmailConfig({
        RESEND_API_KEY: "re_test",
        CONTACT_EMAIL: "fuentivo@gmail.com",
      }),
    ).toBeUndefined();
  });

  it("escapes submitted HTML before building the email", () => {
    const email = buildContactEmail(
      { ...validSubmission, name: "<José>", message: "Mensaje <script>alert('x')</script> seguro." },
      emailConfig,
    );

    expect(email.html).toContain("&lt;José&gt;");
    expect(email.html).toContain("&lt;script&gt;");
    expect(email.html).not.toContain("<script>");
  });

  it("returns failure when Resend reports an error", async () => {
    const sender = vi.fn().mockResolvedValue({ error: { message: "Unavailable" } });

    await expect(
      deliverContactEmail(validSubmission, emailConfig, sender, now),
    ).resolves.toBe(false);
  });

  it("uses a stable idempotency key for duplicate submissions", () => {
    expect(createContactIdempotencyKey(validSubmission, now)).toBe(
      createContactIdempotencyKey(validSubmission, now + 1_000),
    );
  });
});
