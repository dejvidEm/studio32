import { companyLegalPlainText } from "@/lib/company-legal";

export type AckSocialLink = { label: string; href: string };

export type AckFooter = {
  copyright: string;
  rightsReserved: string;
  companyLegal: string;
  links: AckSocialLink[];
};

export function footerForAck(locale: "sk" | "en"): AckFooter {
  const companyLegal = companyLegalPlainText(locale);

  if (locale === "en") {
    return {
      copyright: "© Studio32 copyright 2026",
      rightsReserved: "All rights reserved.",
      companyLegal,
      links: [
        { label: "Facebook", href: "https://www.facebook.com/" },
        { label: "Instagram", href: "https://www.instagram.com/" },
        { label: "X (Twitter)", href: "https://x.com/" },
      ],
    };
  }

  return {
    copyright: "© Studio32 autorské práva 2026",
    rightsReserved: "Všetky práva vyhradené.",
    companyLegal,
    links: [
      { label: "Facebook", href: "https://www.facebook.com/" },
      { label: "Instagram", href: "https://www.instagram.com/" },
      { label: "X (Twitter)", href: "https://x.com/" },
    ],
  };
}
