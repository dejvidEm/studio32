"use client";

import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { heroCarouselSlides } from "@/data/heroCarouselSlides";
import NavMark from "@/app/components/layout/logo/NavMark";

function HeroSection() {
    const { t, locale } = useLanguage();
    const slideCount = heroCarouselSlides.length;
    const [index, setIndex] = useState(0);

    const goPrev = useCallback(() => {
        setIndex((i) => (i - 1 + slideCount) % slideCount);
    }, [slideCount]);

    const goNext = useCallback(() => {
        setIndex((i) => (i + 1) % slideCount);
    }, [slideCount]);

    const trackWidthPercent = slideCount * 100;
    const translateXPercent = (100 / slideCount) * index;

    const caption = heroCarouselSlides[index][locale === "sk" ? "sk" : "en"];

    /** In-app browsers + touch: scroll-linked parallax often stutters on direction reversals */
    const [parallaxSpeed, setParallaxSpeed] = useState(-12);
    useEffect(() => {
        const mqMobile = window.matchMedia("(max-width: 767px)");
        const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
        const apply = () => setParallaxSpeed(mqMobile.matches || mqReduce.matches ? 0 : -12);
        apply();
        mqMobile.addEventListener("change", apply);
        mqReduce.addEventListener("change", apply);
        return () => {
            mqMobile.removeEventListener("change", apply);
            mqReduce.removeEventListener("change", apply);
        };
    }, []);

    return (
        <ParallaxProvider>
            <div className="relative overflow-hidden">
                <Parallax speed={parallaxSpeed}>
                    <section className="relative flex min-h-screen min-h-[100dvh] h-full items-end overflow-x-clip text-white bg-black">
                    {/* Background Video */}
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        loop
                        autoPlay
                        muted
                        playsInline
                    >
                        <source src="/video/new.mp4" type="video/mp4" />
                    </video>

                    {/* Overlay to improve text readability */}
                    <div className="absolute inset-0 bg-black/50"></div>

                    {/* Content */}
                    <div className="relative z-10 container text-left">
                        {/* Glass panel: carousel image left, caption + chevrons right — temporarily hidden (remove !hidden to show again) */}
                        <div
                            className="!hidden pointer-events-none absolute bottom-6 right-4 z-30 h-[14rem] w-[min(100%,24rem)] items-stretch gap-3 rounded-3xl border border-white/20 bg-white/10 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl backdrop-saturate-150 sm:bottom-8 sm:right-8 sm:h-[16.5rem] sm:w-[min(100%,31rem)] sm:gap-4 sm:p-4 md:flex lg:bottom-10 lg:right-10 lg:h-[18rem] lg:w-[min(100%,36rem)]"
                        >
                            <div className="relative aspect-square h-full min-h-0 w-auto shrink-0 overflow-hidden rounded-2xl bg-white">
                                <div
                                    className="flex h-full ease-soft transition-transform duration-[720ms] motion-reduce:transition-none"
                                    style={{
                                        width: `${trackWidthPercent}%`,
                                        transform: `translateX(-${translateXPercent}%)`,
                                    }}
                                >
                                    {heroCarouselSlides.map((slide, i) => (
                                        <div
                                            key={slide.image}
                                            className="relative h-full shrink-0"
                                            style={{ flex: `0 0 calc(100% / ${slideCount})` }}
                                        >
                                            <Image
                                                src={slide.image}
                                                alt=""
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 40vw, 200px"
                                                priority={i === 0}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-between gap-3 pointer-events-auto">
                                <div
                                    key={`${index}-${locale}`}
                                    className="text-right text-sm leading-snug text-white/90 transition-opacity duration-[520ms] ease-soft motion-reduce:transition-none sm:text-base"
                                >
                                    <p className="m-0 font-semibold text-white">{caption.title}</p>
                                    <p className="mt-1.5 m-0 text-white/85">{caption.body}</p>
                                </div>
                                <div className="flex flex-row flex-wrap items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            goPrev();
                                        }}
                                        aria-label={t("heroCarouselPrev")}
                                        className="inline-flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-white/10 text-white backdrop-blur-sm transition-colors duration-[480ms] ease-soft hover:bg-white/20 sm:size-16"
                                    >
                                        <Icon icon="lucide:chevron-left" width={28} height={28} aria-hidden />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            goNext();
                                        }}
                                        aria-label={t("heroCarouselNext")}
                                        className="inline-flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-secondary transition-colors duration-[480ms] ease-soft hover:bg-white sm:size-16"
                                    >
                                        <Icon icon="lucide:chevron-right" width={28} height={28} aria-hidden />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 origin-bottom-left motion-safe:scale-100 md:motion-safe:scale-[1.11] lg:motion-safe:scale-[1.14] Xxl:motion-safe:scale-[1.16] motion-reduce:scale-100 flex flex-col gap-5 pb-10 md:gap-9 md:pb-14 Xxl:gap-10 Xxl:pb-24">
                            <div className="flex items-start gap-2.5 md:gap-8">
                                <div className="size-10 shrink-0 md:size-[3.25rem]">
                                    <Image
                                        src={"/images/Icon/primary-leaf.svg"}
                                        alt="icon"
                                        width={52}
                                        height={52}
                                        className="size-full animate-spin-slow"
                                    />
                                </div>
                                <p className="max-w-lg text-base leading-snug text-white/70 md:max-w-xl md:text-xl md:leading-relaxed">
                                    {t("heroSubtext").includes("high-performing") ? (
                                        <>We create <span className="text-primary">high-performing</span> digital designs that elevate brands and enhance conversions.</>
                                    ) : t("heroSubtext").includes("výkonné") ? (
                                        <>Navrhujeme <span className="text-primary">výkonné</span> digitálne riešenia, ktoré posilňujú značky a zvyšujú konverzie.</>
                                    ) : (
                                        t("heroSubtext")
                                    )}
                                </p>
                            </div>
                            <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:gap-6">
                                <h1 className="inline-flex flex-wrap items-end font-bold leading-none text-white text-5xl sm:text-6xl md:text-9xl 2xl:text-[290px]">
                                    <span className="sr-only">Studio32</span>
                                    <span aria-hidden className="inline-flex items-end gap-x-[0.06em]">
                                        <span>Studio.</span>
                                        <NavMark className="-translate-y-[0.12cm] md:-translate-y-[0.4cm] h-[0.77em] w-auto shrink-0 text-white sm:h-[0.8em] md:h-[0.83em] 2xl:h-[0.85em]" />
                                    </span>
                                </h1>
                                <div className="-translate-y-2 shrink-0 lg:-translate-y-3">
                                    <div className="rounded-full bg-primary p-1.5 pl-7 md:p-2 md:pl-10">
                                        <Image src={"/images/Icon/arrow-icon.svg"} alt="icon" height={58} width={58} className="size-11 md:size-[58px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </Parallax>
            </div>
        </ParallaxProvider>
    );
}

export default HeroSection;
