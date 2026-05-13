import type { Metadata } from "next";
import { absoluteUrl, getSiteName } from "@/lib/site";

/** Shared metadata helpers for Marketing pages (canonical, OG, Twitter). */
export function staticPageMeta(opts: {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
}): Metadata {
  const { path, title, description, ogImage } = opts;
  const url = absoluteUrl(path);
  const siteName = getSiteName();
  const image =
    ogImage == null ? undefined : ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
      ...(image ? { images: [{ url: image, alt: title }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
    },
  };
}
