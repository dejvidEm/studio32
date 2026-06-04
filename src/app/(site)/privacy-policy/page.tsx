import PrivacyPolicy from "@/app/components/privacy-policy";
import Herobanner from "@/app/components/shared/hero-banner";
import type { Metadata } from "next";
import { STATIC_PAGES } from "@/lib/seo-config";
import { staticPageMeta } from "@/lib/page-metadata";

const page = STATIC_PAGES.privacy;

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
                bannerimage="/images/privacy-policy/privacy-policy.png"
                headingKey="heroBannerPrivacyHeading"
                descKey="heroBannerPrivacyDesc" /> 
            <PrivacyPolicy/>
        </main>
    );
};
