import { siteConfig } from "@/config/site";

export function getWhatsAppUrl(message: string) {
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodedMessage}`;
}

export function getEmailUrl() {
  return `mailto:${siteConfig.contact.email}`;
}
