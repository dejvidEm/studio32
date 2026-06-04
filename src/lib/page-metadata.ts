import type { Metadata } from "next";
import { SITE_KEYWORDS } from "@/lib/seo-text";
import { absoluteUrl, getSiteName, getSiteUrl } from "@/lib/site";

function resolveImage(ogImage?: string) {
  if (ogImage == null) return undefined;
  return ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage);
}

/** Shared metadata for marketing pages (canonical, OG, Twitter, keywords). */
export function staticPageMeta(opts: {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  keywords?: string[];
}): Metadata {
  const { path, title, description, ogImage, keywords } = opts;
  const url = absoluteUrl(path);
  const siteName = getSiteName();
  const image = resolveImage(ogImage);

  return {
    title,
    description,
    keywords: keywords ?? [...SITE_KEYWORDS],
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      locale: "sk_SK",
      alternateLocale: ["en_US"],
      type: "website",
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: `${title} — ${siteName}` }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: `${title} | ${siteName}`,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function homePageMeta(opts: {
  title: string;
  description: string;
  ogImage: string;
}): Metadata {
  const siteName = getSiteName();
  const siteUrl = getSiteUrl();
  const image = resolveImage(opts.ogImage);

  return {
    title: { absolute: `${siteName} — ${opts.title}` },
    description: opts.description,
    keywords: [...SITE_KEYWORDS],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "sk_SK",
      alternateLocale: ["en_US"],
      url: siteUrl,
      siteName,
      title: `${siteName} — ${opts.title}`,
      description: opts.description,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: siteName }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} — ${opts.title}`,
      description: opts.description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function articlePageMeta(opts: {
  path: string;
  title: string;
  description: string;
  cover?: string;
  publishedTime?: string;
  type?: "article";
}): Metadata {
  const siteName = getSiteName();
  const url = absoluteUrl(opts.path);
  const image = opts.cover ? resolveImage(opts.cover) : undefined;

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: "article",
      url,
      siteName,
      locale: "sk_SK",
      title: `${opts.title} | ${siteName}`,
      description: opts.description,
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
      ...(image ? { images: [{ url: image, alt: opts.title }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: `${opts.title} | ${siteName}`,
      description: opts.description,
      ...(image ? { images: [image] } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function notFoundPageMeta(): Metadata {
  const siteName = getSiteName();
  const description = `Požadovaná stránka na webe ${siteName} neexistuje. Vráťte sa na úvod alebo prejdite na projekty a kontakt.`;

  return {
    title: "Stránka nenájdená",
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title: `Stránka nenájdená | ${siteName}`,
      description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Stránka nenájdená | ${siteName}`,
      description,
    },
  };
}
