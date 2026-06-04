"use client";

import Link from "next/link";
import {
    useId,
    useLayoutEffect,
    useRef,
    useState,
    type ComponentPropsWithoutRef,
    type CSSProperties,
    type RefObject,
} from "react";
import { cn } from "@/lib/utils";

const LABEL_GAP_PX = 16;

function CircleIcon({
    filterId,
    icon,
    animate,
}: {
    filterId: string;
    icon: "arrow" | "check";
    animate: boolean;
}) {
    return (
        <svg
            className={cn(
                "shrink-0 py-1 transition-all duration-[520ms] ease-soft",
                animate &&
                    "group-hover:[transform:translateX(calc(-1*var(--icon-shift,0px)))_rotate(45deg)]",
            )}
            width="58"
            height="58"
            viewBox="0 0 58 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
        >
            <g filter={`url(#${filterId})`}>
                <rect x="3" y="2" width="52" height="52" rx="26" fill="white" />
                {icon === "arrow" ? (
                    <path
                        d="M24 23H34M34 23V33M34 23L24 33"
                        stroke="#1F2A2E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                ) : (
                    <path
                        d="M20 29L26 35L38 23"
                        stroke="#1F2A2E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                )}
            </g>
            <defs>
                <filter
                    id={filterId}
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
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                    />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
            </defs>
        </svg>
    );
}

function useIconShift(label: string, transform: boolean, icon: "arrow" | "check") {
    const labelRef = useRef<HTMLSpanElement>(null);
    const [iconShiftPx, setIconShiftPx] = useState(0);
    const hasLabel = label.trim().length > 0;
    const animate = transform && hasLabel && icon === "arrow";

    useLayoutEffect(() => {
        if (!animate) {
            setIconShiftPx(0);
            return;
        }

        const measure = () => {
            const labelWidth = labelRef.current?.offsetWidth ?? 0;
            setIconShiftPx(labelWidth + LABEL_GAP_PX);
        };

        measure();

        const el = labelRef.current;
        const ro = el ? new ResizeObserver(measure) : null;
        if (el && ro) ro.observe(el);
        window.addEventListener("resize", measure);

        return () => {
            ro?.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [label, animate]);

    return { labelRef, iconShiftPx, hasLabel, animate };
}

function pillClassName(fullWidth: boolean | undefined, success: boolean, className?: string) {
    return cn(
        "group flex items-center gap-4 overflow-hidden rounded-full",
        "transition-all duration-[520ms] ease-soft",
        success
            ? "bg-secondary"
            : "bg-primary hover:bg-secondary dark:border dark:border-primary dark:hover:border dark:hover:border-white/30",
        fullWidth ? "w-full justify-center" : "w-fit max-w-full",
        className,
    );
}

function PillCtaContent({
    label,
    fullWidth,
    success = false,
    filterId,
    labelRef,
    animate,
    hasLabel,
    icon = "arrow",
}: {
    label: string;
    fullWidth?: boolean;
    success?: boolean;
    filterId: string;
    labelRef: RefObject<HTMLSpanElement | null>;
    animate: boolean;
    hasLabel: boolean;
    icon?: "arrow" | "check";
}) {
    return (
        <>
            {hasLabel ? (
                <span className={cn("min-w-0", fullWidth && "flex flex-1 justify-center")}>
                    <span
                        ref={labelRef}
                        className={cn(
                            "inline-block whitespace-nowrap text-lg font-bold",
                            success ? "pl-0 text-white" : "pl-8 text-secondary group-hover:translate-x-10 group-hover:text-white",
                            !success && "transform transition-transform duration-[520ms] ease-soft",
                        )}
                    >
                        {label}
                    </span>
                </span>
            ) : null}
            <CircleIcon filterId={filterId} icon={icon} animate={animate} />
        </>
    );
}

export function PillCtaLink({
    href,
    label,
    transform = true,
    fullWidth,
    className,
}: {
    href: string;
    label: string;
    transform?: boolean;
    fullWidth?: boolean;
    className?: string;
}) {
    const filterId = useId().replace(/:/g, "");
    const { labelRef, iconShiftPx, hasLabel, animate } = useIconShift(label, transform, "arrow");

    const style = animate
        ? ({ "--icon-shift": `${iconShiftPx}px` } as CSSProperties)
        : undefined;

    return (
        <Link href={href} style={style} className={pillClassName(fullWidth, false, className)}>
            <PillCtaContent
                label={label}
                fullWidth={fullWidth}
                filterId={filterId}
                labelRef={labelRef}
                animate={animate}
                hasLabel={hasLabel}
            />
        </Link>
    );
}

export function PillCtaButton({
    label,
    transform = true,
    fullWidth,
    icon = "arrow",
    success = false,
    className,
    type = "button",
    ...buttonProps
}: {
    label: string;
    transform?: boolean;
    fullWidth?: boolean;
    icon?: "arrow" | "check";
    success?: boolean;
    className?: string;
} & ComponentPropsWithoutRef<"button">) {
    const filterId = useId().replace(/:/g, "");
    const { labelRef, iconShiftPx, hasLabel, animate } = useIconShift(
        label,
        transform && !success,
        icon,
    );

    const style = animate
        ? ({ "--icon-shift": `${iconShiftPx}px` } as CSSProperties)
        : undefined;

    return (
        <button
            type={type}
            {...buttonProps}
            style={{ ...style, ...buttonProps.style }}
            className={pillClassName(fullWidth, success, cn("cursor-pointer border-0 p-0", className))}
        >
            <PillCtaContent
                label={label}
                fullWidth={fullWidth}
                success={success}
                filterId={filterId}
                labelRef={labelRef}
                animate={animate}
                hasLabel={hasLabel}
                icon={icon}
            />
        </button>
    );
}
