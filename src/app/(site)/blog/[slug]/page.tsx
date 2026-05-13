import Herobanner from "@/app/components/shared/hero-banner";
import { getBlogsBySlug } from "@/lib/blogmarkdown";
import markdownToHtml from "@/lib/markdownToHtml";
import Image from "next/image";
import { absoluteUrl, getSiteName } from "@/lib/site";
import { stripHtmlLite, truncateMetaDescription } from "@/lib/seo-text";
import type { Metadata } from "next";
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
    const siteName = getSiteName();

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
        typeof blog.coverImage === "string"
            ? absoluteUrl(blog.coverImage)
            : undefined;
    const dateRaw = typeof blog.date === "string" ? blog.date : undefined;
    const publishedTime =
        dateRaw && !Number.isNaN(Date.parse(dateRaw))
            ? new Date(dateRaw).toISOString()
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
            ...(publishedTime ? { publishedTime } : {}),
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

    const content = await markdownToHtml(
        typeof blog.content === "string" ? blog.content : "",
    );


    return (
        <>
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
                            <div className="w-full h-700px">
                                <Image src={blog?.galleryImg} alt="Image" width={1600} height={750} className="w-full h-full object-cover" />
                            </div>
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
