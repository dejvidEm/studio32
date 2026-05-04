import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import MenuList from "./MenuList";
import Link from "next/link";
import ThemeToggler from "./ThemeToggle";
import { usePathname } from "next/navigation";
import Logo from "../logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/app/context/LanguageContext";

const Header = () => {
    const { locale, t } = useLanguage();
    const [menuData, setMenuData] = useState<any>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [sticky, setSticky] = useState(false);
    const pathname = usePathname();
    const menuRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        setSticky(window.scrollY >= 80);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsClosing(true);
                setTimeout(() => {
                    setMenuOpen(false);
                    setIsClosing(false);
                }, 300);
            }
        };

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/layout-data?lang=${locale}`)
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setMenuData(data?.MenuData)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }
        fetchData()

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen, locale]);

    return (
        <header
            className={`fixed top-0 z-50 w-full border-t-4 border-primary transition-[background-color,box-shadow,backdrop-filter] duration-[680ms] ease-soft motion-reduce:transition-none ${
                sticky
                    ? "bg-white/50 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.1)] backdrop-blur-sm backdrop-saturate-150 dark:bg-black/35 dark:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]"
                    : "bg-transparent"
            }`}
        >
            <div className="container">
                <nav className={`relative flex item-center justify-between ${sticky ? 'py-5' : 'py-7'}`}>
                    <div className='flex items-center'>
                        <Logo sticky={sticky} />
                    </div>
                    <div className="flex items-center gap-7">
                        <div className="flex items-center gap-3">
                            <LanguageSwitcher sticky={sticky} />
                            <ThemeToggler />
                        </div>

                        <div className="relative flex align-middle">
                            {menuOpen === false ?
                                <div className="flex align-middle">
                                    <button onClick={() => setMenuOpen(true)}>
                                        <Image src={sticky ? "/images/Icon/menu-button-sticky.svg" : "/images/Icon/menu-button.svg"} alt="icon" width={45} height={45} className="cursor-pointer" />
                                    </button>
                                </div>
                                :
                                <div
                                    ref={menuRef}
                                    className={`absolute -top-5 right-0 flex flex-col gap-5 min-w-80 sm:min-w-96 bg-white dark:bg-twilliteblack p-6 rounded-3xl shadow-lg transition-all duration-[480ms] ease-soft z-10 
                                    ${isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
                                >
                                    <div className="flex items-center justify-between pb-5 border-b border-secondary/15 dark:border-white/15">
                                        <p className="text-secondary dark:text-white">{t("menu")}</p>
                                        <div onClick={() => setMenuOpen(false)} className="p-2 cursor-pointer">
                                            <Image src="/images/Icon/close-icon.svg" alt="icon" width={16} height={16} className="dark:hidden" />
                                            <Image src="/images/Icon/close-icon-dark.svg" alt="icon" width={16} height={16} className="hidden dark:block" />
                                        </div>
                                    </div>
                                    <div>
                                        <ul className="flex flex-col gap-2 pb-4">
                                            {menuData?.map((menuItem:any, index:any) =>
                                                <MenuList key={index} item={menuItem} closeMenu={() => setMenuOpen(false)} />
                                            )}
                                        </ul>
                                    </div>
                                    <div>
                                        <Link href="tel:+421918722720" className="text-secondary/60 dark:text-white/60 hover:text-secondary dark:hover:text-white">+421 918 722 720</Link>
                                        <Link href="mailto:hello@studio32.sk"><h4>hello@studio32.sk</h4></Link>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
