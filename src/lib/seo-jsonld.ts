import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/seo-config";
import { DEFAULT_META_DESCRIPTION_SK } from "@/lib/seo-text";
import { absoluteUrl, getSiteName, getSiteUrl } from "@/lib/site";

export function buildOrganizationJsonLd() {
  const siteUrl = getSiteUrl();
  const name = getSiteName();
  const sameAsRaw = process.env.NEXT_PUBLIC_ORGANIZATION_SAME_AS?.trim();
  const sameAs = sameAsRaw
    ? sameAsRaw.split(/[\s,]+/).filter((u) => /^https?:\/\//i.test(u))
    : [];

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name,
    url: siteUrl,
    image: absoluteUrl("/images/projects/banner/projects-banner.png"),
    logo: absoluteUrl("/images/logo/final.svg"),
    description: DEFAULT_META_DESCRIPTION_SK,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    areaServed: { "@type": "Country", name: "Slovakia" },
    serviceType: [
      "Branding",
      "Web design",
      "UI/UX design",
      "Digital design",
      "Graphic design",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      availableLanguage: ["Slovak", "English"],
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function buildWebSiteJsonLd() {
  const siteUrl = getSiteUrl();
  const name = getSiteName();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name,
    url: siteUrl,
    description: DEFAULT_META_DESCRIPTION_SK,
    inLanguage: ["sk-SK", "en"],
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function buildBlogPostingJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
}) {
  const name = getSiteName();
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: opts.url,
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    author: { "@type": "Organization", name, url: getSiteUrl() },
    publisher: {
      "@type": "Organization",
      name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo/final.svg") },
    },
  };
}

export function buildCreativeWorkJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  const name = getSiteName();
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: opts.title,
    description: opts.description,
    url: opts.url,
    ...(opts.image ? { image: opts.image } : {}),
    creator: { "@type": "Organization", name, url: getSiteUrl() },
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
