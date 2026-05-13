/** Default meta description — Slovak (primary locale for the brand). */
export const DEFAULT_META_DESCRIPTION_SK =
  "Studio32 tvorí digitálny dizajn, branding a weby, ktoré posúvajú značky vpred — od identity po výkon v prehliadači.";
export function stripHtmlLite(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
export function truncateMetaDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}
