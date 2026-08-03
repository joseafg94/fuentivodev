"use server";

import { Resend } from "resend";

import {
  type ContactSubmissionResult,
  validateContactSubmission,
} from "@/lib/contact-form";
import {
  deliverContactEmail,
  getContactEmailConfig,
} from "@/lib/contact-delivery";

export async function submitContactForm(
  input: unknown,
): Promise<ContactSubmissionResult> {
  const validation = validateContactSubmission(input);

  if (!validation.success) {
    return { status: validation.status };
  }

  const config = getContactEmailConfig();

  if (!config) {
    return { status: "failure" };
  }

  try {
    const resend = new Resend(config.apiKey);
    const delivered = await deliverContactEmail(
      validation.data,
      config,
      (payload, options) => resend.emails.send(payload, options),
    );

    return { status: delivered ? "success" : "failure" };
  } catch {
    return { status: "failure" };
  }
}
