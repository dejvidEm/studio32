import Contact from "@/app/components/home/contact";
import Herobanner from "@/app/components/shared/hero-banner";
import type { Metadata } from "next";
import { STATIC_PAGES } from "@/lib/seo-config";
import { staticPageMeta } from "@/lib/page-metadata";

const page = STATIC_PAGES.contact;

export const metadata: Metadata = staticPageMeta({
  path: page.path,
  title: page.title,
  description: page.description,
  ogImage: page.ogImage,
});

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="/images/contact/banner/contact-banner.png"
                headingKey="heroBannerContactHeading"
                descKey="heroBannerContactDesc" />
            <Contact contactdataNumber="01"/>
        </main>
    );
};
