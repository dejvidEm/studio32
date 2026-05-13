import BlogList from "@/app/components/blog/blog-list";
import Herobanner from "@/app/components/shared/hero-banner";
import type { Metadata } from "next";
import { staticPageMeta } from "@/lib/page-metadata";

export const metadata: Metadata = staticPageMeta({
  path: "/blog",
  title: "Blog",
  description:
    "Články a postrehy z digitálneho dizajnu, brandingu a webov zo štúdia Studio32.",
  ogImage: "/images/blog/banner/blog_banner.png",
});

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="/images/blog/banner/blog_banner.png"
                headingKey="heroBannerBlogHeading"
                descKey="heroBannerBlogDesc" />    
                <BlogList/>
        </main>
    );
};
