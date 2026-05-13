/** Canonical hostname for sitemap, Open Graph, canonical links, structured data */
export function getSiteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  return "https://studio32.sk";
}

export function getSiteName(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_NAME?.trim() ||
    process.env.SITE_NAME?.trim() ||
    "Studio32"
  );
}

/** Build absolute URL from a site-relative path (/foo) or unchanged if already absolute */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${getSiteUrl()}${path}`;
}
