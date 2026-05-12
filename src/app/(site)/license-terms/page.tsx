import Herobanner from "@/app/components/shared/hero-banner";
import LicenseTerms from "@/app/components/license-terms";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "License terms | Studio32",
};

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
