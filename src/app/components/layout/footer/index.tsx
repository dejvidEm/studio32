import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import NavMark from "../logo/NavMark";

function FooterLink({
    href,
    className,
    children,
}: {
    href: string;
    className?: string;
    children: ReactNode;
}) {
    if (href.startsWith("mailto:") || href.startsWith("http")) {
        const isExternalHttp = href.startsWith("http");
        return (
            <a
                href={href}
                className={className}
                {...(isExternalHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
                {children}
            </a>
        );
    }
    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
}

const Footer = () => {
    const { locale } = useLanguage();
    const [footerData, setFooterData] = useState<any>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/layout-data?lang=${locale}`);
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setFooterData(data?.footerData);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchData();
    }, [locale]);

    const linkLiClass =
        "text-lg font-light text-white hover:text-primary transition-colors duration-[480ms] ease-soft motion-reduce:transition-none";

    return (
        <footer>
            <div className="bg-secondary pt-10 pb-6 md:pt-20 md:pb-8 xl:pt-40 xl:pb-10">
                <div className="container">
                    <div className="flex flex-col gap-12 md:gap-16 xl:gap-20">
                        <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-10 xl:gap-14">
                            <div className="flex w-full max-w-xl shrink-0 flex-col gap-5 md:gap-6">
                                <Link
                                    href="/"
                                    className="inline-flex w-fit text-white transition-colors duration-[480ms] ease-soft hover:text-primary motion-reduce:transition-none"
                                >
                                    <span className="sr-only">Studio32</span>
                                    <NavMark className="h-12 w-auto shrink-0 sm:h-14 md:h-16 lg:h-[4.25rem] xl:h-20" />
                                </Link>
                                {footerData?.tagline && (
                                    <h2 className="whitespace-nowrap font-light text-white">{footerData?.tagline}</h2>
                                )}
                                <div className="flex flex-col gap-2 md:gap-2.5">
                                    {footerData &&
                                        footerData?.info?.map((value: any, index: any) => {
                                            return (
                                                <div key={index}>
                                                    <FooterLink
                                                        href={value.href}
                                                        className="flex items-center gap-4"
                                                    >
                                                        <Image
                                                            src={value.icon}
                                                            alt=""
                                                            width={36}
                                                            height={36}
                                                            className="h-8 w-8 shrink-0 md:h-9 md:w-9"
                                                        />
                                                        <span className="text-lg font-light leading-snug text-white transition-colors duration-[480ms] ease-soft hover:text-primary md:text-xl lg:text-2xl motion-reduce:transition-none">
                                                            {value.link}
                                                        </span>
                                                    </FooterLink>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>

                            <div className="grid min-w-0 flex-1 grid-cols-2 gap-3 sm:gap-4 lg:max-w-3xl lg:grid-cols-2 xl:max-w-none xl:grid-cols-4">
                                {footerData?.serviceCards?.map((card: { name: string; href: string }, index: number) => (
                                    <FooterLink
                                        key={index}
                                        href={card.href}
                                        className="group relative flex min-h-[5.5rem] flex-col justify-end rounded-3xl border border-white/[0.14] bg-white/[0.04] p-4 pb-5 pl-4 pr-10 pt-9 transition-[border-color,background-color,box-shadow] duration-[480ms] ease-soft hover:border-primary/45 hover:bg-white/[0.07] hover:shadow-[0_12px_40px_-20px_rgba(0,0,0,0.35)] motion-reduce:transition-none md:min-h-[6.25rem] md:p-5 md:pb-6 md:pl-5 md:pr-12 md:pt-10 dark:hover:shadow-[0_12px_40px_-20px_rgba(0,0,0,0.6)]"
                                    >
                                        <span aria-hidden className="pointer-events-none absolute right-3 top-3 md:right-4 md:top-4">
                                            <ArrowRight
                                                className="footer-service-card-arrow h-5 w-5 stroke-[1.75]"
                                                stroke="currentColor"
                                            />
                                        </span>
                                        <span className="text-left text-base font-light leading-snug text-white transition-colors duration-[480ms] ease-soft group-hover:text-primary md:text-lg lg:text-xl motion-reduce:transition-none">
                                            {card.name}
                                        </span>
                                    </FooterLink>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10 sm:gap-x-10 md:pt-14 lg:grid-cols-4 lg:gap-8">
                            {footerData?.columns?.map((column: { heading: string; links: { name: string; href: string }[] }, ci: number) => (
                                <div key={ci} className="flex flex-col">
                                    <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                                        {column.heading}
                                    </h3>
                                    <ul className="flex flex-col gap-1.5">
                                        {column.links?.map((value: any, index: any) => (
                                            <li key={index}>
                                                <FooterLink href={value.href} className={linkLiClass}>
                                                    {value.name}
                                                </FooterLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            <div className="flex flex-col">
                                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                                    {footerData?.socialColumnHeading}
                                </h3>
                                <ul className="flex flex-col gap-1.5">
                                    {footerData?.socialLinks?.map((value: any, index: any) => (
                                        <li key={index}>
                                            <FooterLink href={value.href} className={linkLiClass}>
                                                {value.name}
                                            </FooterLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {footerData?.copyright && (
                            <p className="w-full text-center text-base font-light text-white/70">
                                {footerData.copyright}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
