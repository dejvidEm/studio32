
import AboutusDetail from "@/app/components/about/aboutus-detail";
import AboutusFullimg from "@/app/components/about/aboutus-fullimg";
import AboutusStats from "@/app/components/about/aboutus-stats";
import Team from "@/app/components/home/team";
import Herobanner from "@/app/components/shared/hero-banner";
import type { Metadata } from "next";
import { staticPageMeta } from "@/lib/page-metadata";

export const metadata: Metadata = staticPageMeta({
  path: "/about",
  title: "About us",
  description:
    "Spoznajte Studio32 — ako pracujeme, čo ponúkame pri brandingu a webdizajne a prečo s nami spolupracovať.",
  ogImage: "/images/about-us/banner/aboutus-banner.png",
});

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="/images/about-us/banner/aboutus-banner.png"
                headingKey="heroBannerAboutHeading"
                descKey="heroBannerAboutDesc" />
            <AboutusDetail />
            <AboutusStats/>
            <AboutusFullimg/>
            <Team teamdataNumber="01"/>
        </main>
    );
};
