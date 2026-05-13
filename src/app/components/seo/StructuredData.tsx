import { absoluteUrl, getSiteName, getSiteUrl } from "@/lib/site";
import { DEFAULT_META_DESCRIPTION_SK } from "@/lib/seo-text";

/** JSON-LD for Organization + WebSite (homepage + global brand signals). */
export default function StructuredData() {
  const siteUrl = getSiteUrl();
  const name = getSiteName();

  const sameAsRaw = process.env.NEXT_PUBLIC_ORGANIZATION_SAME_AS?.trim();
  const sameAs = sameAsRaw
    ? sameAsRaw.split(/[\s,]+/).filter((u) => /^https?:\/\//i.test(u))
    : [];

  const payload = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name,
      url: siteUrl,
      logo: absoluteUrl("/images/logo/final.svg"),
      ...(sameAs.length > 0 ? { sameAs } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name,
      description: DEFAULT_META_DESCRIPTION_SK,
      url: siteUrl,
      inLanguage: ["sk", "en"],
      publisher: { "@type": "Organization", name, url: siteUrl },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload),
      }}
    />
  );
}
