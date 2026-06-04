export const CONTACT_SERVICE_VALUES = [
  "inquiry",
  "branding",
  "website",
  "content",
  "marketing",
] as const;

export type ContactServiceValue = (typeof CONTACT_SERVICE_VALUES)[number];

export function isContactServiceValue(value: string): value is ContactServiceValue {
  return (CONTACT_SERVICE_VALUES as readonly string[]).includes(value);
}

export function contactServiceLabel(value: ContactServiceValue, locale: "sk" | "en"): string {
  const labels: Record<ContactServiceValue, { sk: string; en: string }> = {
    inquiry: {
      sk: "Chcem sa len informovať",
      en: "I would like to get information only",
    },
    branding: { sk: "Branding", en: "Branding" },
    website: { sk: "Webstránky", en: "Website" },
    content: { sk: "Tvorba obsahu", en: "Content creation" },
    marketing: { sk: "Marketing", en: "Marketing" },
  };
  return labels[value][locale];
}
