"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/app/context/LanguageContext";
import NavigationLink from "../../shared/navigation-link";

function Services() {
    const { locale } = useLanguage();
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [servicesData, setServicesData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/page-data?lang=${locale}`)
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setServicesData(data?.servicesData)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }
        fetchData()
    }, [locale]);

    return (
        <section id="services" className="bg-white py-20 md:py-40">
            <div className="flex flex-col gap-24">
                <div className="container">
                    <div className="flex flex-col gap-24">
                        <div className="flex flex-col xl:flex xl:flex-row items-start gap-8">
                            <div className="flex w-full max-w-xl items-center gap-4 py-3 md:gap-8">
                                <span className="shrink-0 text-base font-semibold tabular-nums text-secondary/50 dark:text-secondary/55">
                                    [{servicesData?.number ?? "03"}]
                                </span>
                                <div className="h-px w-16 shrink-0 bg-black/12 dark:bg-black/12" />
                                <p className="rounded-full bg-secondary py-1.5 px-4 text-base font-medium text-white dark:bg-white/10">
                                    {servicesData?.name}
                                </p>
                            </div>
                            <div className="flex flex-col gap-11">
                                <div className="flex flex-col gap-5">
                                    <h2 className="max-w-3xl text-secondary dark:text-secondary">{servicesData?.heading}</h2>
                                    <p className="max-w-2xl text-secondary/70 dark:text-secondary/70">{servicesData?.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex flex-col gap-10 md:flex-row 2xl:gap-56">
                            {/* Same width as former image column — keeps service rows aligned right */}
                            <div className="hidden w-full shrink-0 md:block md:max-w-sm" aria-hidden />
                            <div className="flex min-w-0 w-full flex-col gap-16">
                            <div>
                                {servicesData?.data.map((value: any, index: any) => (
                                    <div
                                        key={index}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        className="group relative flex cursor-default flex-col items-start justify-between gap-1 border-t border-secondary/12 py-6 dark:border-secondary/12 md:cursor-pointer xl:flex-row xl:items-start xl:gap-10 xl:py-10">
                                        <div className="flex shrink-0 flex-col items-start gap-0.5 2xl:w-full 2xl:max-w-sm">
                                            <span className="tabular-nums text-xs font-medium tracking-tight text-secondary/45 dark:text-secondary/45 md:text-sm">
                                                [{index + 1}]
                                            </span>
                                            <h3 className="m-0 min-w-0 text-[clamp(1.625rem,2.5vw,2.375rem)] font-light leading-[1.06] tracking-tight text-secondary transition-colors duration-[520ms] ease-soft group-hover:text-primary dark:text-secondary">
                                                {value.heading}
                                            </h3>
                                        </div>
                                        <div
                                            className={cn(
                                                "grid w-full min-w-0 xl:flex-1",
                                                "transition-[grid-template-rows] duration-[620ms] ease-soft motion-reduce:transition-none max-md:!transition-none",
                                                activeIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                                                "max-md:!grid-rows-[1fr]"
                                            )}
                                        >
                                            <div className="min-h-0 overflow-hidden max-md:overflow-visible">
                                                <p
                                                    className={cn(
                                                        "text-base leading-snug text-secondary/70 transition-[opacity,transform] duration-[580ms] ease-soft motion-reduce:transition-none dark:text-secondary/70 xl:max-w-xl max-md:!transition-none",
                                                        activeIndex === index
                                                            ? "translate-y-0 opacity-100"
                                                            : "pointer-events-none -translate-y-1 opacity-0 max-md:!pointer-events-auto max-md:!translate-y-0 max-md:!opacity-100"
                                                    )}
                                                >
                                                    {value.descp}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <NavigationLink navigationTitle="Naše práce" navigationLink="/projects" transform={true} />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
