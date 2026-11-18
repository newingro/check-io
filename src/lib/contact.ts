import { siteConfig } from "@/config/site";

/** Link WhatsApp con messaggio precompilato, codificato correttamente. */
export function whatsappHref(message: string = siteConfig.contact.whatsapp.defaultMessage) {
  return `https://wa.me/${siteConfig.contact.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const phoneHref = `tel:${siteConfig.contact.phone.e164}`;
