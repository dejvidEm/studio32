
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const Contact = (props: { contactdataNumber: string }) => {
    const { contactdataNumber } = props;
    const { locale, t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);
    const [loader, setLoader] = useState(false);
    const [contactData, setContactData] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/page-data?lang=${locale}`)
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setContactData(data?.contactData)
            } catch (error) {
                console.error('Error fetching contact:', error)
            }
        }
        fetchData()
    }, [locale])
    const reset = () => {
        setFormData({ name: "", email: "", message: "" });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoader(true);

        fetch("https://formsubmit.co/ajax/niravjoshi87@gmail.com", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                message: formData.message,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setSubmitted(data.success);
                setLoader(false);
                reset();
            })
            .catch((error) => {
                console.log(error.message);
                setLoader(false);
            });
    };
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    return (
        <section className="py-16 md:py-28 xl:py-32 dark:bg-darkblack">
            <div className="container">
                <div className="grid grid-cols-1 gap-x-0 gap-y-5 md:gap-y-7 xl:grid-cols-[minmax(0,max-content)_minmax(0,1fr)] xl:gap-x-10 2xl:gap-x-12">
                    <div className="flex w-full items-center gap-4 py-2 md:gap-6 xl:col-start-1 xl:row-start-1 xl:w-max xl:max-w-[min(100%,22rem)]">
                        <span className="shrink-0 text-base font-semibold tabular-nums text-secondary/50 dark:text-white/70">
                            [{contactdataNumber ? String(contactdataNumber) : "10"}]
                        </span>
                        <div className="h-px w-16 shrink-0 bg-black/12 dark:bg-white/12" />
                        <p className="section-bedge rounded-full px-4 py-1.5">{t("contactUs")}</p>
                    </div>
                    <h2 className="max-w-3xl text-pretty xl:col-start-2 xl:row-start-1 xl:max-w-none">
                        {t("getInTouch")}
                    </h2>
                    <div className="flex min-h-0 w-full flex-col gap-10 md:gap-12 xl:col-start-1 xl:row-start-2 xl:w-max xl:max-w-[min(100%,22rem)] xl:self-stretch">
                        <div className="flex flex-col gap-4 md:gap-6">
                            <p className="text-secondary/70 dark:text-white/70 xl:max-w-none">{t("contactSubtext")}</p>
                            <div>
                                <ul className="flex flex-col gap-2.5">
                                    {contactData?.keypoint?.map((value: any, index: any) => {
                                        return (
                                            <li key={index} className="flex items-center gap-1.5 sm:gap-4">
                                                <div className="flex-shrink-0 rounded-full bg-primary p-1 w-fit sm:p-1.5">
                                                    <Image
                                                        src={"/images/Icon/right-check.svg"}
                                                        alt=""
                                                        width={20}
                                                        height={20}
                                                    />
                                                </div>
                                                <span className="flex-1">{value}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="flex w-full flex-col items-start gap-2 pt-6 md:gap-2.5 md:pt-8">
                            <div className="flex items-start gap-2.5 sm:gap-3">
                                {contactData?.managerProfile?.image && (
                                    <Image
                                        src={contactData.managerProfile.image}
                                        alt={
                                            contactData.managerProfile?.name
                                                ? `Profil: ${contactData.managerProfile.name}`
                                                : "Profilová fotografia"
                                        }
                                        width={224}
                                        height={224}
                                        sizes="(max-width: 639px) 92px, (max-width: 767px) 100px, 112px"
                                        className="size-[5.75rem] shrink-0 -translate-y-5 rounded-full object-cover sm:size-24 sm:-translate-y-[1.375rem] md:size-[6.75rem] md:-translate-y-6"
                                    />
                                )}
                                <div className="min-w-0 flex-1 text-left">
                                    <p className="text-base font-medium tracking-tight text-secondary dark:text-white sm:text-[1.0625rem]">
                                        {contactData?.managerProfile?.name}
                                    </p>
                                    {contactData?.managerProfile?.position ? (
                                        <span className="mt-1.5 block text-sm leading-snug text-secondary/70 dark:text-white/65 sm:text-[0.9375rem]">
                                            {contactData.managerProfile.position}
                                        </span>
                                    ) : null}
                                    {contactData?.managerProfile?.phone ? (
                                        <a
                                            href={`tel:${contactData.managerProfile.phone.replace(/\s/g, "")}`}
                                            className="mt-2 block w-fit text-sm font-medium tracking-tight text-primary transition-colors duration-[380ms] ease-soft hover:text-primary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-darkblack motion-reduce:transition-none sm:text-[0.9375rem]"
                                        >
                                            {contactData.managerProfile.phone}
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="min-w-0 w-full xl:col-start-2 xl:row-start-2">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
                                <div>
                                    <input
                                        required
                                        className="w-full border-b border-secondary dark:border-white/20 focus:border-black dark:focus:border-white focus:outline-none py-3.5"
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={t("placeholderName")}
                                    />
                                </div>
                                <div>
                                    <input
                                        required
                                        className="w-full border-b border-secondary dark:border-white/20 focus:border-black dark:focus:border-white focus:outline-none py-3.5"
                                        id="email"
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={t("placeholderEmail")}
                                    />
                                </div>
                                <div>
                                    <textarea
                                        className="w-full border-b border-secondary dark:border-white/20 focus:border-black dark:focus:border-white focus:outline-none py-3.5"
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={t("placeholderMessage")}
                                        rows={4} />
                                </div>
                                {submitted && (
                                    <div className="flex gap-1.5">
                                        <div className="bg-primary w-fit p-1 sm:p-1.5 rounded-full flex-shrink-0">
                                            <Image src={"/images/Icon/right-check.svg"} alt="right-icon" width={20} height={20} />
                                        </div>
                                        <p className="text-secondary">{t("successMessage")}</p>
                                    </div>
                                )}
                                <div>
                                    {!loader ? (
                                        <button
                                            type="submit"
                                            className="group flex w-full cursor-pointer items-center justify-center gap-4 rounded-full bg-primary transition-all duration-[520ms] ease-soft hover:bg-secondary dark:border dark:border-primary dark:hover:border dark:hover:border-white/30"
                                        >
                                            <span className="transform pl-8 text-lg font-bold text-secondary transition-transform duration-[520ms] ease-soft group-hover:translate-x-10 group-hover:text-white">
                                                {t("submitMessage")}
                                            </span>
                                            <svg
                                                className="py-1 transition-all duration-[520ms] ease-soft group-hover:-translate-x-36 group-hover:rotate-45"
                                                width="58"
                                                height="58"
                                                viewBox="0 0 58 58"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden
                                            >
                                                <g filter="url(#filter0_d_contact_submit)">
                                                    <rect x="3" y="2" width="52" height="52" rx="26" fill="white" />
                                                    <path
                                                        d="M24 23H34M34 23V33M34 23L24 33"
                                                        stroke="#1F2A2E"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <filter
                                                        id="filter0_d_contact_submit"
                                                        x="0"
                                                        y="0"
                                                        width="58"
                                                        height="58"
                                                        filterUnits="userSpaceOnUse"
                                                        colorInterpolationFilters="sRGB"
                                                    >
                                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                        <feColorMatrix
                                                            in="SourceAlpha"
                                                            type="matrix"
                                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                            result="hardAlpha"
                                                        />
                                                        <feOffset dy="1" />
                                                        <feGaussianBlur stdDeviation="1.5" />
                                                        <feComposite in2="hardAlpha" operator="out" />
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_contact_submit" />
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_contact_submit" result="shape" />
                                                    </filter>
                                                </defs>
                                            </svg>
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            disabled
                                            className="flex w-full cursor-wait items-center justify-center gap-3 rounded-full bg-primary/25 py-4 dark:bg-white/10"
                                        >
                                            <div
                                                className="inline-block size-6 animate-spin rounded-full border-2 border-current border-t-transparent text-secondary dark:text-white"
                                                role="status"
                                                aria-label="loading"
                                            >
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            <span className="text-lg font-bold text-secondary dark:text-white">{t("submitting")}</span>
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
