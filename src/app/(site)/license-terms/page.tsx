import Herobanner from "@/app/components/shared/hero-banner";
import LicenseTerms from "@/app/components/license-terms";
import type { Metadata } from "next";
import { staticPageMeta } from "@/lib/page-metadata";

export const metadata: Metadata = staticPageMeta({
  path: "/license-terms",
  title: "License terms",
  description:
    "Všeobecné licenčné podmienky k dodaným dielam, šablónam a materiálom štúdia Studio32.",
  ogImage: "/images/privacy-policy/privacy-policy.png",
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
