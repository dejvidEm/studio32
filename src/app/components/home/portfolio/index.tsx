"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import Projectswiper from "./projectswiper";

function Portfolio() {
    const { t } = useLanguage();
    return (
        <section className="bg-lightgray dark:bg-darkblack py-20 md:py-40">
            <div className="flex flex-col gap-24">
                <div className="container">
                    <div className="flex flex-col gap-24">
                        <div className="flex flex-col items-start gap-8 xl:flex xl:flex-row">
                            <div className="flex w-full max-w-xl items-center gap-4 py-3 md:gap-8">
                                <span className="shrink-0 text-base font-semibold tabular-nums text-secondary/50 dark:text-white/70">
                                    [02]
                                </span>
                                <div className="h-px w-16 shrink-0 bg-black/12 dark:bg-white/12" />
                                <p className="section-bedge rounded-full py-1.5 px-4">{t("portfolioSectionBadge")}</p>
                            </div>
                            <div className="flex w-full min-w-0 flex-1 flex-col gap-11">
                                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-8">
                                    <div className="flex min-w-0 max-w-3xl flex-col gap-5">
                                        <h2>{t("portfolioHeading")}</h2>
                                        <p className="max-w-2xl text-secondary/70 dark:text-white/70">{t("portfolioDescription")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-0 md:px-3.5">
                    <Projectswiper />
                </div>
            </div>
        </section>
    );
}

export default Portfolio;
