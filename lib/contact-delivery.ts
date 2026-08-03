import { createHash } from "node:crypto";

import type { ContactFormData } from "@/lib/contact-form";

type ContactEmailConfig = {
  apiKey: string;
  to: string;
  from: string;
};

type EmailPayload = {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

type EmailSender = (
  payload: EmailPayload,
  options: { idempotencyKey: string },
) => Promise<{ error: unknown | null }>;

const needLabels = {
  es: {
    website: "Página web",
    "custom-system": "Sistema personalizado",
    automation: "Automatización",
    "improve-existing": "Mejorar un proyecto existente",
    unsure: "No estoy seguro",
  },
  en: {
    website: "Website",
    "custom-system": "Custom business system",
    automation: "Automation",
    "improve-existing": "Improve an existing project",
    unsure: "I am not sure yet",
  },
} as const;

export function getContactEmailConfig(
  environment: Record<string, string | undefined> = process.env,
): ContactEmailConfig | undefined {
  const apiKey = environment.RESEND_API_KEY?.trim();
  const to = environment.CONTACT_EMAIL?.trim();
  const from = environment.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) {
    return undefined;
  }

  return { apiKey, to, from };
}

export function escapeEmailHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function createContactIdempotencyKey(
  data: ContactFormData,
  now = Date.now(),
): string {
  const timeBucket = Math.floor(now / (10 * 60 * 1000));
  const fingerprint = [
    data.name.toLowerCase(),
    data.business.toLowerCase(),
    data.contact.toLowerCase(),
    data.need,
    data.message.toLowerCase(),
    timeBucket,
  ].join("|");

  return `contact-${createHash("sha256").update(fingerprint).digest("hex")}`;
}

export function buildContactEmail(
  data: ContactFormData,
  config: ContactEmailConfig,
): EmailPayload {
  const need = needLabels[data.locale][data.need];
  const subject = data.locale === "es"
    ? `Nuevo contacto de ${data.name} — ${need}`
    : `New inquiry from ${data.name} — ${need}`;
  const entries = [
    [data.locale === "es" ? "Nombre" : "Name", data.name],
    [data.locale === "es" ? "Negocio" : "Business", data.business],
    [data.locale === "es" ? "Contacto" : "Contact", data.contact],
    [data.locale === "es" ? "Necesidad" : "Need", need],
    [data.locale === "es" ? "Mensaje" : "Message", data.message],
    ["Locale", data.locale],
  ] as const;
  const text = entries.map(([label, value]) => `${label}:\n${value}`).join("\n\n");
  const html = entries
    .map(
      ([label, value]) =>
        `<p><strong>${escapeEmailHtml(label)}</strong><br>${escapeEmailHtml(value).replaceAll("\n", "<br>")}</p>`,
    )
    .join("");

  return {
    from: config.from,
    to: [config.to],
    subject,
    text,
    html,
    ...(zEmail(data.contact) ? { replyTo: data.contact } : {}),
  };
}

function zEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function deliverContactEmail(
  data: ContactFormData,
  config: ContactEmailConfig,
  send: EmailSender,
  now = Date.now(),
): Promise<boolean> {
  const { error } = await send(buildContactEmail(data, config), {
    idempotencyKey: createContactIdempotencyKey(data, now),
  });

  return !error;
}
