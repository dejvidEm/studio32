"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

type Project = {
  title: string;
  slug: string;
  ScopeOfWork: string[];
  industry?: string;
  coverImage: string;
};

const ProjectList = () => {
  const { locale } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch(`/api/projects?lang=${locale}`)
      .then((res) => res.json())
      .then((data: Project[]) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]));
  }, [locale]);

  return (
    <section className="dark:bg-darkblack py-20 md:py-40">
      <div className="flex flex-col gap-24">
        <div className="container">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
            {projects.map((project, index) => {
              return (
                <Link key={index} href={`/projects/${project.slug}`} className="group flex flex-col gap-5">
                  <div className="relative">
                    <img src={project.coverImage} alt={project.title} className="block h-auto w-full max-w-full" />
                    <span
                      className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 backdrop-blur-0 transition-all duration-[520ms] ease-soft md:group-hover:bg-black/70 md:group-hover:opacity-100 md:group-hover:backdrop-blur-sm"
                      aria-hidden
                    >
                      <span className="scale-[0.97] opacity-0 transition-all delay-100 duration-[520ms] ease-soft md:group-hover:scale-100 md:group-hover:opacity-100">
                        <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.333374" width="64" height="64" rx="32" fill="#C1FF72" />
                          <path
                            d="M25.6667 25.3333H39M39 25.3333V38.6666M39 25.3333L25.6667 38.6666"
                            stroke="#1F2A2E"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-light">{project.title}</h3>
                    <div className="flex flex-wrap gap-3">
                      {project.ScopeOfWork.map((value, idx) => (
                        <span
                          key={idx}
                          className="w-fit rounded-full border border-secondary/12 px-4 py-1 text-base hover:bg-primary dark:border-white/12 dark:hover:text-secondary"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
