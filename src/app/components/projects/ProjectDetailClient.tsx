"use client";

import Herobanner from "@/app/components/shared/hero-banner";
import { useLanguage } from "@/app/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ProjectPayload = {
  title: string;
  slug: string;
  ScopeOfWork: string[];
  industry: string;
  raised: string;
  website: string;
  description: string;
  coverImage: string;
  gallery: string[];
  contentHtml: string;
};

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const { locale, t } = useLanguage();
  const [project, setProject] = useState<ProjectPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/projects/by-slug?slug=${encodeURIComponent(slug)}&lang=${locale}`)
      .then(async (res) => {
        if (!res.ok) return null;
        return res.json() as Promise<ProjectPayload>;
      })
      .then((data) => {
        if (!cancelled) {
          setProject(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProject(null);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [slug, locale]);

  if (loading) {
    return (
      <section className="flex min-h-[50vh] items-center justify-center dark:bg-darkblack">
        <p className="text-secondary/70 dark:text-white/70">{t("projectLoading")}</p>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="flex min-h-[50vh] flex-col items-center justify-center gap-4 dark:bg-darkblack">
        <p className="text-lg text-secondary dark:text-white">{t("pageNotFound")}</p>
        <Link href="/projects" className="text-primary underline">
          {t("projects")}
        </Link>
      </section>
    );
  }

  const gallery = Array.isArray(project.gallery) ? project.gallery : [];

  return (
    <>
      <section>
        <div>
          <Herobanner
            bannerimage={project.coverImage}
            heading={project.title}
            desc={project.description}
            headingClass="large-heading font-light"
          />
        </div>
        <div className="dark:bg-darkblack">
          <div className="container">
            <div className="flex flex-col gap-12 py-20 md:gap-24 xl:py-40">
              <div className="flex flex-col gap-10">
                <div>
                  <Link
                    href="/projects"
                    className="group flex w-fit items-center gap-3 rounded-full bg-primary transition-all duration-[620ms] ease-soft hover:bg-secondary dark:border dark:border-primary dark:hover:border dark:hover:border-white/30"
                  >
                    <Image
                      src={"/images/Icon/back-btn.svg"}
                      alt=""
                      width={42}
                      height={42}
                      className="transform transition-transform duration-[620ms] ease-soft group-hover:translate-x-16.5"
                    />
                    <span className="pr-4 text-lg font-bold text-secondary transition-transform duration-[620ms] ease-soft group-hover:-translate-x-10 group-hover:text-white">
                      {t("back")}
                    </span>
                  </Link>
                </div>
                <div className="flex flex-col gap-5 md:flex-row lg:gap-10">
                  <div className="flex flex-col gap-2 border-b border-secondary/12 pb-5 dark:border-white/12 md:border-b-0 md:border-r md:pr-5 lg:pr-10">
                    <span className="text-base text-secondary/70 dark:text-white/70">{t("projectScopeOfWork")}</span>
                    <p className="font-medium">{project.ScopeOfWork.join(", ")}</p>
                  </div>
                  <div className="flex flex-col gap-2 border-b border-secondary/12 pb-5 dark:border-white/12 md:border-b-0 md:border-r md:pr-5 lg:pr-10">
                    <span className="text-base text-secondary/70 dark:text-white/70">{t("projectIndustry")}</span>
                    <p className="font-medium">{project.industry}</p>
                  </div>
                  <div className="flex flex-col gap-2 border-b border-secondary/12 pb-5 dark:border-white/12 md:border-b-0 md:border-r md:pr-5 lg:pr-10">
                    <span className="text-base text-secondary/70 dark:text-white/70">{t("projectRaised")}</span>
                    <p className="font-medium">{project.raised}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-base text-secondary/70 dark:text-white/70">{t("projectWebsite")}</span>
                    <p className="font-medium">{project.website}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col items-start gap-8 xl:flex xl:flex-row">
                  <div className="flex w-full max-w-xl items-center gap-4 md:gap-8">
                    <h2 className="text-4xl lg:text-5xl xl:text-56">{t("projectDescription")}</h2>
                  </div>
                  <div className="flex flex-col gap-11">
                    <div className="project-descp flex flex-col gap-5">
                      <div dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-8">
                {gallery.map((image, index) =>
                  index === 0 ? (
                    <div key={index} className="col-span-2">
                      <Image src={image} alt="" width={1600} height={750} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div key={index} className="col-span-2 md:col-span-1">
                      <Image src={image} alt="" width={805} height={750} className="h-full w-full object-cover" />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
