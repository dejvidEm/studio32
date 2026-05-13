import Herobanner from "@/app/components/shared/hero-banner";
import TermsAndCondition from "@/app/components/terms-and-condition";
import type { Metadata } from "next";
import { staticPageMeta } from "@/lib/page-metadata";

export const metadata: Metadata = staticPageMeta({
  path: "/terms-and-conditions",
  title: "Terms & conditions",
  description:
    "Obchodné podmienky používania služieb studio32.sk a štúdia Studio32.",
  ogImage: "/images/privacy-policy/privacy-policy.png",
});

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="/images/privacy-policy/privacy-policy.png"
                headingKey="heroBannerTermsHeading"
                descKey="heroBannerTermsDesc" />
            <TermsAndCondition />
        </main>
    );
};
