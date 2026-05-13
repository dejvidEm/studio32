import Contact from "@/app/components/home/contact";
import Herobanner from "@/app/components/shared/hero-banner";
import type { Metadata } from "next";
import { staticPageMeta } from "@/lib/page-metadata";

export const metadata: Metadata = staticPageMeta({
  path: "/contact",
  title: "Contact",
  description:
    "Ozvite sa štúdiu Studio32 — konzultácia projektu, ponuka alebo prvý kontakt pre branding a digitál.",
  ogImage: "/images/contact/banner/contact-banner.png",
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
