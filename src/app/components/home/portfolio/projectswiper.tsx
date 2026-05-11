"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/app/context/LanguageContext";

type Project = {
    title: string;
    slug: string;
    ScopeOfWork: string[];
    industry?: string;
    coverImage: string;
};

function ProjectCard({
    value,
    className,
    /** Inside CSS-transform marquee; avoid backdrop-blur + transition-all — they recomposite the animated row and stutter crossing cards */
    marqueeStrip,
}: {
    value: Project;
    className?: string;
    marqueeStrip?: boolean;
}) {
    return (
        <article
            className={cn(
                "portfolio-project-card relative group flex w-[min(85vw,530px)] shrink-0 flex-col gap-3 lg:gap-5",
                marqueeStrip && "isolate",
                className
            )}
        >
            <div className="relative w-full">
                {/* Native intrinsic dimensions — tops align via items-start on the strip */}
                <img
                    src={value.coverImage}
                    alt={value.title}
                    className="block h-auto w-full max-w-full"
                    loading="lazy"
                    decoding="async"
                />
                <Link
                    href={`/projects/${value.slug}`}
                    className={cn(
                        "absolute inset-0 flex items-center justify-center bg-black/0 opacity-0",
                        "ease-soft duration-[520ms]",
                        marqueeStrip
                            ? "transition-opacity transition-colors group-hover:bg-black/70 group-hover:opacity-100"
                            : "backdrop-blur-0 transition-[opacity,background-color] group-hover:bg-black/70 group-hover:opacity-100 group-hover:backdrop-blur-sm"
                    )}
                >
                    <span className="scale-[0.97] opacity-0 transition-[opacity,transform] duration-[520ms] ease-soft delay-100 group-hover:scale-100 group-hover:opacity-100">
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
                </Link>
            </div>
            <div className="flex flex-col gap-2 lg:gap-4">
                <h3 className="font-light">{value.title}</h3>
                <div className="flex flex-wrap gap-3">
                    {value.ScopeOfWork.map((tag, idx) => (
                        <p
                            key={idx}
                            className="text-base dark:text-white dark:hover:text-secondary hover:bg-primary border border-secondary/12 dark:border-white/12 w-fit rounded-full py-1 px-3"
                        >
                            {tag}
                        </p>
                    ))}
                </div>
            </div>
        </article>
    );
}

/**
 * dupIndex avoids duplicate React keys when the same projects row is rendered twice for the marquee seam.
 */
function ProjectsStrip({
    projects,
    dupIndex,
    marqueeStrip,
}: {
    projects: Project[];
    dupIndex: number;
    marqueeStrip?: boolean;
}) {
    return (
        <div className="flex shrink-0 items-start gap-5 pr-5 md:gap-8 md:pr-8">
            {projects.map((value) => (
                <ProjectCard
                    key={`${dupIndex}-${value.slug}`}
                    value={value}
                    marqueeStrip={marqueeStrip}
                />
            ))}
        </div>
    );
}

/** Seconds per full loop; higher = slower continuous drift */
const MARQUEE_DURATION_SEC = 50;

export default function Projectswiper() {
    const { locale } = useLanguage();
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch(`/api/projects?lang=${locale}`)
            .then((res) => res.json())
            .then((data) => setProjects(Array.isArray(data) ? data : []))
            .catch(() => setProjects([]));
    }, [locale]);

    if (projects.length === 0) {
        return null;
    }

    const durationStyle = {
        "--portfolio-marquee-duration": `${MARQUEE_DURATION_SEC}s`,
    } as CSSProperties;

    return (
        <>
            {/* Mobile / small tablet: swipe scroll, one card + peek of next; no auto-marquee */}
            <div
                className={cn(
                    "md:hidden overflow-x-auto overflow-y-visible overscroll-x-contain",
                    "snap-x snap-mandatory scroll-pl-7 sm:scroll-pl-8",
                    /* pan-x-only blocks vertical page scroll starting on this strip; manipulation = pan-x+pan-y + native scroll */
                    "touch-manipulation [-webkit-overflow-scrolling:touch]",
                    "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                )}
            >
                <div className="flex w-max items-start gap-5 pb-1 pl-7 pr-5 sm:pl-8 sm:pr-7">
                    {projects.map((value) => (
                        <ProjectCard key={value.slug} value={value} className="snap-start snap-always" />
                    ))}
                </div>
            </div>

            {/* md+: infinite marquee; pause while pointer hovers (.portfolio-marquee-wrapper:hover) */}
            <div className="portfolio-marquee-wrapper hidden select-none overflow-hidden md:block">
                <div className="portfolio-marquee-track flex w-max items-start" style={durationStyle}>
                    <ProjectsStrip projects={projects} dupIndex={0} marqueeStrip />
                    <ProjectsStrip projects={projects} dupIndex={1} marqueeStrip />
                </div>
            </div>
        </>
    );
}
