import ProjectDetailClient from "@/app/components/projects/ProjectDetailClient";
import { getProjectsBySlug, type ProjectLocale } from "@/lib/markdown";
import { truncateMetaDescription, stripHtmlLite } from "@/lib/seo-text";
import { absoluteUrl, getSiteName } from "@/lib/site";
import { cookies } from "next/headers";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

function localeFromCookieStore(cookieLocale: string | undefined): ProjectLocale {
  return cookieLocale === "en" ? "en" : "sk";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = localeFromCookieStore(
    cookieStore.get("studio32-locale")?.value ?? cookieStore.get("unique-locale")?.value,
  );

  const project = getProjectsBySlug(
    slug,
    ["title", "description", "coverImage"],
    locale,
  );
  const siteName = getSiteName();

  const rawDesc =
    typeof project?.description === "string" ? project.description.trim() : "";
  const plainFromDesc =
    rawDesc.length > 0 ? truncateMetaDescription(stripHtmlLite(rawDesc)) : "";
  const path = `/projects/${slug}`;
  const titleStr = typeof project?.title === "string" ? project.title : "";

  if (!titleStr || !project) {
    return {
      title: "404",
      description: "This project could not be found.",
      alternates: { canonical: path },
      robots: { index: false, follow: false },
    };
  }

  const description =
    plainFromDesc.length > 0
      ? plainFromDesc
      : `${titleStr} — case study štúdia ${siteName}.`;

  const cover =
    typeof project.coverImage === "string"
      ? absoluteUrl(project.coverImage)
      : undefined;

  return {
    title: titleStr,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      siteName,
      title: `${titleStr} | ${siteName}`,
      description,
      ...(cover ? { images: [{ url: cover, alt: titleStr }] } : {}),
    },
    twitter: {
      card: cover ? "summary_large_image" : "summary",
      title: `${titleStr} | ${siteName}`,
      description,
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

export default async function Post({ params }: Props) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}
