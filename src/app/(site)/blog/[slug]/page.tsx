import Herobanner from "@/app/components/shared/hero-banner";
import JsonLdScript from "@/app/components/seo/JsonLdScript";
import { getBlogsBySlug } from "@/lib/blogmarkdown";
import markdownToHtml from "@/lib/markdownToHtml";
import { articlePageMeta } from "@/lib/page-metadata";
import { buildBlogPostingJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo-jsonld";
import { absoluteUrl } from "@/lib/site";
import { stripHtmlLite, truncateMetaDescription } from "@/lib/seo-text";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ slug: string }>;
};

function fetchBlogSlug(slug: string, fields: string[]) {
    try {
        return getBlogsBySlug(slug, fields);
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const path = `/blog/${slug}`;
    const blog = fetchBlogSlug(slug, ["title", "detail", "date", "coverImage", "description"]);
    if (!blog) {
        return {
            title: "404",
            description: "Článok sa nenašiel.",
            alternates: { canonical: path },
            robots: { index: false, follow: false },
        };
    }

    const titleStr = typeof blog.title === "string" ? blog.title : "Blog";
    const fallbackBody =
        typeof blog.description === "string" && blog.description.trim().length > 0
            ? blog.description
            : typeof blog.detail === "string"
              ? blog.detail
              : "";
    const description = truncateMetaDescription(stripHtmlLite(fallbackBody));
    const cover =
        typeof blog.coverImage === "string" ? blog.coverImage : undefined;
    const dateRaw = typeof blog.date === "string" ? blog.date : undefined;
    const publishedTime =
        dateRaw && !Number.isNaN(Date.parse(dateRaw))
            ? new Date(dateRaw).toISOString()
            : undefined;

    return articlePageMeta({
        path,
        title: titleStr,
        description,
        cover,
        publishedTime,
    });
}

export default async function Post({ params }: Props) {
    const { slug } = await params;
    const blog = fetchBlogSlug(slug, [
        "title",
        "detail",
        "date",
        "coverImage",
        "scrolltoread",
        "description",
        "galleryImg",
        "content",
    ]);

    if (!blog) notFound();

    const titleStr = typeof blog.title === "string" ? blog.title : "Blog";
    const fallbackBody =
        typeof blog.description === "string" && blog.description.trim().length > 0
            ? blog.description
            : typeof blog.detail === "string"
              ? blog.detail
              : "";
    const description = truncateMetaDescription(stripHtmlLite(fallbackBody));
    const path = `/blog/${slug}`;
    const pageUrl = absoluteUrl(path);
    const cover =
        typeof blog.coverImage === "string" ? absoluteUrl(blog.coverImage) : undefined;
    const dateRaw = typeof blog.date === "string" ? blog.date : undefined;
    const publishedTime =
        dateRaw && !Number.isNaN(Date.parse(dateRaw))
            ? new Date(dateRaw).toISOString()
            : undefined;

    const content = await markdownToHtml(
        typeof blog.content === "string" ? blog.content : "",
    );

    const galleryAlt =
        typeof blog.galleryImg === "string" && blog.galleryImg
            ? `${titleStr} — ilustrácia článku`
            : titleStr;

    return (
        <>
            <JsonLdScript
                data={[
                    buildBlogPostingJsonLd({
                        title: titleStr,
                        description,
                        url: pageUrl,
                        image: cover,
                        datePublished: publishedTime,
                    }),
                    buildBreadcrumbJsonLd([
                        { name: "Domov", path: "/" },
                        { name: "Blog", path: "/blog" },
                        { name: titleStr, path },
                    ]),
                ]}
            />
            <section>
                <div>
                    <Herobanner
                        bannerimage={blog?.coverImage}
                        heading={blog?.title}
                        desc={blog?.detail}
                        headingClass="blog-heading" />
                </div>
                <div className="dark:bg-darkblack">
                    <div className="container">
                        <div className="flex flex-col gap-12 md:gap-24 py-20 xl:py-40">
                            <div className="flex flex-col xl:flex xl:flex-row items-start xl:items-center gap-8">
                                <div className="flex items-center gap-4 md:gap-8 w-full max-w-xl">
                                    <h2 className="text-4xl lg:text-5xl xl:text-56">Scroll to read</h2>
                                </div>
                                <p className="text-secondary/70 dark:text-white/70">{blog?.scrolltoread}</p>
                            </div>
                            {typeof blog.galleryImg === "string" && blog.galleryImg ? (
                                <div className="w-full h-700px">
                                    <Image
                                        src={blog.galleryImg}
                                        alt={galleryAlt}
                                        width={1600}
                                        height={750}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : null}
                            <div className="flex justify-end">
                                {content && (
                                    <div dangerouslySetInnerHTML={{ __html: content }} className="blog-content max-w-6xl"></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
