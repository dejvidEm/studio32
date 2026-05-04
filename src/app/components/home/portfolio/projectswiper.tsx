"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
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

function ProjectCard({ value, className }: { value: Project; className?: string }) {
    return (
        <article
            className={cn(
                "relative group flex w-[min(85vw,530px)] shrink-0 flex-col gap-3 lg:gap-5",
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
                    className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/0 backdrop-blur-0 transition-all duration-[520ms] ease-soft group-hover:opacity-100 group-hover:bg-black/70 group-hover:backdrop-blur-sm"
                >
                    <span className="scale-[0.97] opacity-0 transition-all duration-[520ms] ease-soft delay-100 group-hover:scale-100 group-hover:opacity-100">
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
function ProjectsStrip({ projects, dupIndex }: { projects: Project[]; dupIndex: number }) {
    return (
        <div className="flex shrink-0 items-start gap-5 pr-5 md:gap-8 md:pr-8">
            {projects.map((value) => (
                <ProjectCard key={`${dupIndex}-${value.slug}`} value={value} />
            ))}
        </div>
    );
}

/** Seconds per full loop; higher = slower continuous drift */
const MARQUEE_DURATION_SEC = 50;

export default function Projectswiper() {
    const { locale } = useLanguage();
    const [projects, setProjects] = useState<Project[]>([]);
    const trackRef = useRef<HTMLDivElement>(null);
    const rampFrameRef = useRef<number | null>(null);

    const cancelRamp = useCallback(() => {
        if (rampFrameRef.current != null) {
            cancelAnimationFrame(rampFrameRef.current);
            rampFrameRef.current = null;
        }
    }, []);

    /** Smooth ease-out (similar feel to ease-soft tail-off) */
    const rampPlaybackRate = useCallback(
        (targetRate: number, durationMs: number) => {
            const track = trackRef.current;
            if (!track) return;
            const anim =
                track
                    .getAnimations()
                    .find((a) => (a as CSSAnimation).animationName === "portfolio-marquee") ??
                track.getAnimations()[0];
            if (!anim) return;

            cancelRamp();
            const from = anim.playbackRate;
            const t0 = performance.now();
            const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

            const step = (now: number) => {
                const u = Math.min(1, (now - t0) / durationMs);
                anim.playbackRate = from + (targetRate - from) * easeOut(u);
                if (u < 1) {
                    rampFrameRef.current = requestAnimationFrame(step);
                } else {
                    rampFrameRef.current = null;
                    anim.playbackRate = targetRate;
                }
            };
            rampFrameRef.current = requestAnimationFrame(step);
        },
        [cancelRamp]
    );

    useEffect(() => () => cancelRamp(), [cancelRamp]);

    const onMarqueeEnter = useCallback(() => {
        if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        rampPlaybackRate(0, 560);
    }, [rampPlaybackRate]);

    const onMarqueeLeave = useCallback(() => {
        if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        rampPlaybackRate(1, 720);
    }, [rampPlaybackRate]);

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
                    "touch-pan-x [-webkit-overflow-scrolling:touch]",
                    "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                )}
            >
                <div className="flex w-max items-start gap-5 pb-1 pl-7 pr-5 sm:pl-8 sm:pr-7">
                    {projects.map((value) => (
                        <ProjectCard key={value.slug} value={value} className="snap-start snap-always" />
                    ))}
                </div>
            </div>

            {/* md+: infinite marquee + hover slow */}
            <div
                className="portfolio-marquee-wrapper hidden select-none overflow-hidden md:block"
                onMouseEnter={onMarqueeEnter}
                onMouseLeave={onMarqueeLeave}
            >
                <div ref={trackRef} className="portfolio-marquee-track flex w-max items-start" style={durationStyle}>
                    <ProjectsStrip projects={projects} dupIndex={0} />
                    <ProjectsStrip projects={projects} dupIndex={1} />
                </div>
            </div>
        </>
    );
}
