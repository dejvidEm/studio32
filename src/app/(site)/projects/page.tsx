import ProjectList from "@/app/components/projects";
import Herobanner from "@/app/components/shared/hero-banner";
import type { Metadata } from "next";
import { staticPageMeta } from "@/lib/page-metadata";

export const metadata: Metadata = staticPageMeta({
  path: "/projects",
  title: "Projects",
  description:
    "Vybrané práce štúdia Studio32 — branding, dizajn produktov a weby od konceptu po spustenie.",
  ogImage: "/images/projects/banner/projects-banner.png",
});

export default function Page() {
    return (
        <main>
            <Herobanner
                bannerimage="/images/projects/banner/projects-banner.png"
                headingKey="heroBannerProjectsHeading"
                descKey="heroBannerProjectsDesc" />
            <ProjectList />    
        </main>
    );
};
