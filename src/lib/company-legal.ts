export const COMPANY_LEGAL = {
  name: "INVEST M, s.r.o.",
  ico: "36685984",
  dic: "2022258535",
  icDph: "SK2022258535",
  vatNoteSk: "podľa §4, registrácia od 23.10.2006",
  vatNoteEn: "registered under §4 since 23 Oct 2006",
  street: "Cukrovarská 3042",
  cityLine: "075 01 Trebišov",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Cukrovarsk%C3%A1+3042%2C+075+01+Trebi%C5%A1ov%2C+Slovakia",
} as const;

export type CompanyLegalLocale = "sk" | "en";

export function companyLegalLines(locale: CompanyLegalLocale) {
  const vatNote = locale === "en" ? COMPANY_LEGAL.vatNoteEn : COMPANY_LEGAL.vatNoteSk;
  const registeredOffice = locale === "en" ? "Registered office" : "Sídlo";

  return {
    registeredOffice,
    lines: [
      `${COMPANY_LEGAL.name} · IČO ${COMPANY_LEGAL.ico}`,
      `DIČ ${COMPANY_LEGAL.dic}`,
      `IČ DPH ${COMPANY_LEGAL.icDph}, ${vatNote}`,
      registeredOffice,
      COMPANY_LEGAL.name,
      `${COMPANY_LEGAL.street}, ${COMPANY_LEGAL.cityLine}`,
    ],
  };
}

export function companyLegalPlainText(locale: CompanyLegalLocale) {
  return companyLegalLines(locale).lines.join("\n");
}

/** Single-line footer copy (copyright separator added in UI). */
export function companyLegalInline(locale: CompanyLegalLocale) {
  const vatNote = locale === "en" ? COMPANY_LEGAL.vatNoteEn : COMPANY_LEGAL.vatNoteSk;
  return `${COMPANY_LEGAL.name}, IČO ${COMPANY_LEGAL.ico}, DIČ ${COMPANY_LEGAL.dic}, IČ DPH ${COMPANY_LEGAL.icDph}, ${vatNote}, ${COMPANY_LEGAL.street}, ${COMPANY_LEGAL.cityLine}`;
}
