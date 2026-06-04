import Link from "next/link";
import NavMark from "./NavMark";

const Logo = (props: { sticky: boolean }) => {
    const { sticky } = props;
    const tone = sticky ? "text-secondary dark:text-white" : "text-white";

    return (
        <Link href="/" className={`inline-flex items-center ${tone} transition-colors duration-[680ms] ease-soft motion-reduce:transition-none`}>
            <span className="sr-only">Studio32</span>
            <NavMark data-navbar-logo className="hidden h-10 w-auto shrink-0 xsm:block md:h-12 lg:h-14 xl:h-16" />
            <NavMark data-navbar-logo className="block h-9 w-auto shrink-0 xsm:hidden sm:h-10" />
        </Link>
    );
};

export default Logo;
