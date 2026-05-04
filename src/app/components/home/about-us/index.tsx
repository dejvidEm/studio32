"use client";
import Image from "next/image";
import StarRating from "../../shared/star-rating";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

function Aboutus() {
    const { locale, t } = useLanguage();
    const [avatarList, setAvatarList] = useState<any>(null);
    useEffect(() => {
          const fetchData = async () => {
            try {
              const res = await fetch(`/api/page-data?lang=${locale}`)
              if (!res.ok) throw new Error('Failed to fetch')
              const data = await res.json()
              setAvatarList(data?.avatarList)
            } catch (error) {
              console.error('Error fetching about-us:', error)
            }
          }
          fetchData()
        }, [locale])

    return (
        <section className="py-20 md:py-40 dark:bg-darkblack">
            <div className="container">
                <div className="flex flex-col 2xl:flex-row gap-10 2xl:gap-28">
                    <div className="flex flex-col gap-5 2xl:gap-7 w-full 2xl:max-w-2xl 2xl:w-full">
                        <div className="flex items-center gap-4 md:gap-8">
                            <span className="shrink-0 text-base font-semibold tabular-nums text-secondary/50 dark:text-white/70">
                                [04]
                            </span>
                            <div className="h-px w-16 shrink-0 bg-secondary/12 dark:bg-white/12" />
                            <p className="rounded-full bg-secondary py-1.5 px-4 text-base font-medium text-white dark:bg-white/10">
                                {t("aboutUs")}
                            </p>
                        </div>
                        <div className="flex flex-col gap-5 2xl:gap-7">
                            <h2 className="2xl:max-w-3xl text-secondary dark:text-white">{t("whyChooseUs")}</h2>
                            <p className="2xl:max-w-sm text-secondary/70 dark:text-white/70">{t("aboutUsDescription")}</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-5 2xl:gap-7">
                        <div className="relative bg-primary p-4 2xl:p-7 flex flex-col justify-between gap-8 md:gap-0">
                            <div className="relative z-10 flex flex-col gap-2 lg:gap-4">
                                <div>
                                    <StarRating count={4} color='#1F2A2E' />
                                </div>
                                <p className="dark:text-secondary">{t("aboutHomeCard1Quote")}</p>
                            </div>
                            <div className="relative z-10">
                                <div className="relative border-b border-secondary/12 pb-5">
                                    <h2 className="dark:text-secondary">{t("aboutHomeCard1StatPercent")}</h2>
                                    <p className="text-base text-secondary/70">{t("aboutHomeCard1StatLabel")}</p>
                                </div>
                                <div className="flex items-center gap-2 lg:gap-5 pt-5">
                                    <Image src={"/images/home/aboutusIndex/avatar.svg"} alt="Image" width={64} height={64} />
                                    <div>
                                        <p className="font-medium dark:text-secondary">{t("aboutHomeCard1Author")}</p>
                                        <p className="text-base text-secondary/70">{t("aboutHomeCard1Company")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0">
                                <Image src={"/images/home/aboutusIndex/bg-ellipse.svg"} alt="image" width={200} height={200} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 2xl:gap-7">
                            <div className="relative w-full min-h-[180px] overflow-hidden">
                                <div className="pointer-events-none absolute -bottom-28 -left-20 z-0 w-[min(120%,420px)] opacity-[0.65] dark:opacity-50">
                                    <Image
                                        src="/images/home/statsfact/sectionbg.png"
                                        alt=""
                                        width={590}
                                        height={590}
                                        className="dark:hidden h-auto w-full max-w-none"
                                        aria-hidden
                                    />
                                    <Image
                                        src="/images/home/statsfact/sectionbgdark.png"
                                        alt=""
                                        width={590}
                                        height={590}
                                        className="hidden dark:block h-auto w-full max-w-none"
                                        aria-hidden
                                    />
                                </div>
                                <div className="relative z-[1] h-full w-full">
                                    <Image
                                        src="/images/home/services/services_2.png"
                                        alt=""
                                        width={340}
                                        height={215}
                                        style={{ width: "100%", height: "100%" }}
                                        className="relative object-cover"
                                    />
                                </div>
                            </div>
                            <div className="bg-secondary dark:bg-lightgray/10 p-5 2xl:p-7 flex flex-col justify-between gap-8">
                                <div>
                                    <h2 className="text-white">
                                        {t("aboutHomeCard2ProjectsNumber")}+
                                    </h2>
                                    <p className="text-base text-white/70">{t("aboutHomeCard2ProjectsLabel")}</p>
                                </div>
                                <div>
                                    <ul className='avatar flex flex-row items-center'>
                                        {avatarList?.map((items:any, index:any) => (
                                            <li key={index} className='-mr-2 z-1 avatar-hover:ml-2'>
                                                <Image src={items.image} alt='Image' width={44} height={44} quality={100} className='rounded-full border-2 border-secondary' />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-hidden p-5 2xl:p-7 border border-secondary/12 dark:border-white/30 flex flex-col justify-between gap-8 md:gap-0">
                            <div className="relative z-10">
                                <h2 className="text-secondary dark:text-white">238+</h2>
                                <p className="text-secondary/70 dark:text-white/70">{t("aboutHomeCard3BrandsTitle")}</p>
                            </div>
                            <div className="flex flex-col gap-4 relative z-10">
                                <Image src={"/images/logo/logo-black.svg"} alt="Logo Image" height={44} width={160} className="dark:hidden"/>
                                <Image src={"/images/logo/WhiteLogo.svg"} alt="Logo Image" height={44} width={160} className="hidden dark:block"/>
                                <p className="text-secondary/70 dark:text-white/70">{t("aboutHomeCard3Body")}</p>
                            </div>
                            <div className="absolute -top-72 right-0 border border-secondary/12 dark:border-white/30 rounded-full w-[489px] h-[489px]" />
                            <div className="absolute -bottom-36 -right-14 border border-secondary/12 dark:border-white/30 rounded-full w-[489px] h-[489px]" />
                        </div>
                    </div>
                </div>
            </div>
        </section >


    );
}

export default Aboutus;
