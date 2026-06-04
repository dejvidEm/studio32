import ProjectDetailClient from "@/app/components/projects/ProjectDetailClient";
import JsonLdScript from "@/app/components/seo/JsonLdScript";
import { getProjectsBySlug } from "@/lib/markdown";
import { articlePageMeta } from "@/lib/page-metadata";
import { buildBreadcrumbJsonLd, buildCreativeWorkJsonLd } from "@/lib/seo-jsonld";
import { absoluteUrl, getSiteName } from "@/lib/site";
import { stripHtmlLite, truncateMetaDescription } from "@/lib/seo-text";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

/** Crawlers get Slovak copy (primary locale); UI locale stays client-side. */
const SEO_LOCALE = "sk" as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const project = getProjectsBySlug(
    slug,
    ["title", "description", "coverImage"],
    SEO_LOCALE,
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
      description: "Projekt sa nenašiel.",
      alternates: { canonical: path },
      robots: { index: false, follow: false },
    };
  }

  const description =
    plainFromDesc.length > 0
      ? plainFromDesc
      : `${titleStr} — case study a realizácia štúdia ${siteName}.`;

  const cover =
    typeof project.coverImage === "string" ? project.coverImage : undefined;

  return articlePageMeta({
    path,
    title: titleStr,
    description,
    cover,
  });
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const project = getProjectsBySlug(
    slug,
    ["title", "description", "coverImage"],
    SEO_LOCALE,
  );

  const titleStr = typeof project?.title === "string" ? project.title : slug;
  const rawDesc =
    typeof project?.description === "string" ? project.description.trim() : "";
  const description =
    rawDesc.length > 0
      ? truncateMetaDescription(stripHtmlLite(rawDesc))
      : `${titleStr} — projekt štúdia ${getSiteName()}.`;
  const path = `/projects/${slug}`;
  const pageUrl = absoluteUrl(path);
  const cover =
    typeof project?.coverImage === "string"
      ? absoluteUrl(project.coverImage)
      : undefined;

  return (
    <>
      {project ? (
        <JsonLdScript
          data={[
            buildCreativeWorkJsonLd({
              title: titleStr,
              description,
              url: pageUrl,
              image: cover,
            }),
            buildBreadcrumbJsonLd([
              { name: "Domov", path: "/" },
              { name: "Projekty", path: "/projects" },
              { name: titleStr, path },
            ]),
          ]}
        />
      ) : null}
      <ProjectDetailClient slug={slug} />
    </>
  );
}
