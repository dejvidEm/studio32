import Herobanner from "@/app/components/shared/hero-banner";
import LicenseTerms from "@/app/components/license-terms";
import type { Metadata } from "next";
import { STATIC_PAGES } from "@/lib/seo-config";
import { staticPageMeta } from "@/lib/page-metadata";

const page = STATIC_PAGES.license;

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
                headingKey="heroBannerLicenseHeading"
                descKey="heroBannerLicenseDesc"
            />
            <LicenseTerms />
        </main>
    );
}
