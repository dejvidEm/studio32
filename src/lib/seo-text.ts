/** Primary meta copy — Slovak (default locale for studio32.sk). */
export const DEFAULT_META_DESCRIPTION_SK =
  "Studio32 je kreatívne štúdio pre digitálny dizajn, branding a moderné weby. Navrhujeme identity, UI/UX a výkonné stránky, ktoré posúvajú značky vpred na Slovensku aj v zahraničí.";

export const DEFAULT_META_TITLE_SK =
  "digitálny dizajn, branding a weby";

export const SITE_KEYWORDS = [
  "Studio32",
  "digitálny dizajn",
  "branding",
  "webdesign",
  "tvorba webstránok",
  "UI design",
  "UX dizajn",
  "grafický dizajn",
  "identita značky",
  "kreatívne štúdio",
  "Slovensko",
  "web development",
] as const;

/** Default social preview — PNG works reliably; avoid SVG for OG crawlers. */
export const DEFAULT_OG_IMAGE = "/images/projects/banner/projects-banner.png";

export function stripHtmlLite(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function truncateMetaDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}
