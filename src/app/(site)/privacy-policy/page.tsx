import PrivacyPolicy from "@/app/components/privacy-policy";
import Herobanner from "@/app/components/shared/hero-banner";
import type { Metadata } from "next";
import { staticPageMeta } from "@/lib/page-metadata";

export const metadata: Metadata = staticPageMeta({
  path: "/privacy-policy",
  title: "Privacy policy",
  description:
    "Zásady ochrany osobných údajov a používania webu Studio32 v súlade s GDPR.",
  ogImage: "/images/privacy-policy/privacy-policy.png",
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
