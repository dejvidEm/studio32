
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import NavMark from "@/app/components/layout/logo/NavMark";

const Team = (props: {teamdataNumber: string}) => {
    const { teamdataNumber } = props;
    const { locale, t } = useLanguage();
    const [teamData, setTeamData] = useState<any>(null);

    useEffect(() => {
          const fetchData = async () => {
            try {
              const res = await fetch(`/api/page-data?lang=${locale}`)
              if (!res.ok) throw new Error('Failed to fetch')
              const data = await res.json()        
              setTeamData(data?.teamData)
            } catch (error) {
              console.error('Error fetching services:', error)
            }
          }
          fetchData()
        }, [locale])

    return (
        <section className="dark:bg-darkblack py-20 md:py-40">
            <div className="flex flex-col gap-24">
                <div className="container">
                    <div className="flex flex-col gap-14 xl:gap-24">
                        <div className="flex flex-col xl:flex xl:flex-row items-start gap-8">
                            <div className="flex w-full max-w-xl items-center gap-4 py-3 md:gap-8">
                                <span className="shrink-0 text-base font-semibold tabular-nums text-secondary/50 dark:text-white/70">
                                    [{teamdataNumber || teamData?.number || "06"}]
                                </span>
                                <div className="h-px w-16 shrink-0 bg-black/12 dark:bg-white/12" />
                                <p className="section-bedge rounded-full py-1.5 px-4">{t("theTeam")}</p>
                            </div>
                            <div className="flex flex-col gap-11">
                                <div className="flex flex-col gap-5 ">
                                    <h2 className="max-w-3xl">{t("meetOurTeam")}</h2>
                                    <p className="max-w-2xl text-secondary/70 dark:text-white/70">{t("teamDescription")}</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`grid gap-7 ${
                                (teamData?.data?.length ?? 0) === 1
                                    ? "mx-auto grid-cols-1 w-full max-w-[16.75rem] sm:max-w-[17.75rem] md:max-w-[18.75rem]"
                                    : (teamData?.data?.length ?? 0) === 2
                                      ? "sm:grid-cols-2 xl:mx-auto xl:grid-cols-2 xl:max-w-2xl"
                                      : "sm:grid-cols-2 xl:grid-cols-4"
                            }`}
                        >
                            {teamData?.data?.map((data:any, index:any) => {
                                return (
                                    <div key={index} className="group flex flex-col gap-5">
                                        <div className="relative isolate flex justify-center pb-6 pt-4">
                                            <div
                                                aria-hidden
                                                className="pointer-events-none absolute left-1/2 top-[54%] z-0 w-[78%] max-w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/35 shadow-[0_22px_44px_-14px_rgba(31,42,46,0.32)] [aspect-ratio:5/6] motion-reduce:shadow-none dark:bg-primary/28 dark:shadow-[0_28px_52px_-12px_rgba(0,0,0,0.52)] sm:max-w-[16.5rem]"
                                            />
                                            <div
                                                aria-hidden
                                                className="pointer-events-none absolute left-1/2 top-[52%] z-[1] w-[135%] max-w-none -translate-x-1/2 -translate-y-1/2 text-secondary/[0.07] dark:text-white/[0.06]"
                                            >
                                                <NavMark className="mx-auto block h-auto w-full" />
                                            </div>
                                            <Image
                                                src={data?.image}
                                                alt={data?.name ? String(data.name) : ""}
                                                width={480}
                                                height={600}
                                                sizes="(max-width:768px) 268px,(max-width:1280px) 300px"
                                                className="relative z-10 h-auto w-full object-contain"
                                            />
                                            {(data?.socialLinks?.length ?? 0) > 0 ? (
                                                <div className="absolute bottom-0 left-0 z-20 hidden h-full w-full items-end justify-end bg-secondary/40 p-8 group-hover:flex">
                                                    <div className="flex gap-3">
                                                        {data?.socialLinks?.map((socialdata:any, idx:number) => {
                                                            return (
                                                                <a
                                                                    key={idx}
                                                                    href={socialdata.link}
                                                                    className="block w-fit rounded-full bg-white p-3 hover:bg-primary"
                                                                >
                                                                    <Image src={socialdata.icon} alt="" width={20} height={20} />
                                                                </a>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <h4>{data?.name}</h4>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {(Array.isArray(data?.roleTags) && data.roleTags.length > 0
                                                    ? data.roleTags
                                                    : typeof data?.position === "string" && data.position.trim()
                                                      ? data.position.split(",").map((s: string) => s.trim())
                                                      : []
                                                ).map((tag: string, ti: number) => (
                                                    <span
                                                        key={ti}
                                                        className="inline-block border border-black/14 bg-secondary/[0.04] px-2.5 py-1 text-xs font-medium leading-snug text-secondary/85 dark:border-white/16 dark:bg-white/[0.04] dark:text-white/80 sm:px-3 sm:text-[0.8125rem]"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Team;
