"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn("border-b border-secondary/12 dark:border-white/12", className)}
        {...props}
    />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                "flex flex-1 cursor-pointer items-center gap-3 py-5 text-left text-sm font-medium transition-colors duration-[380ms] ease-soft sm:gap-4 lg:gap-5 lg:py-7",
                "[&[data-state=open]_.accordion-trigger-icon]:rotate-45",
                className
            )}
            {...props}
        >
            <div className="accordion-trigger-icon flex shrink-0 items-center justify-center transition-transform duration-[380ms] ease-soft">
                <Plus
                    className="h-7 w-7 shrink-0 text-secondary sm:h-8 sm:w-8 md:h-9 md:w-9 dark:text-white"
                    strokeWidth={1}
                    aria-hidden
                />
            </div>
            <div className="min-w-0 flex-1 text-left">{children}</div>
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

/** Expand/collapse timing aligned with homepage Services rows (grid-rows + fade/slide). */
const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={cn(
            "group grid overflow-hidden text-sm transition-[grid-template-rows] duration-[620ms] ease-soft motion-reduce:!transition-none",
            "data-[state=closed]:grid-rows-[0fr]",
            "data-[state=open]:grid-rows-[1fr]",
        )}
        {...props}
    >
        <div className="min-h-0 overflow-hidden">
            <div
                className={cn(
                    "pb-4 pt-0 transition-[opacity,transform] duration-[580ms] ease-soft motion-reduce:!transition-none",
                    "pointer-events-none -translate-y-1 opacity-0 text-secondary/70 dark:text-white/70",
                    "group-data-[state=open]:pointer-events-auto group-data-[state=open]:translate-y-0 group-data-[state=open]:opacity-100",
                    className,
                )}
            >
                {children}
            </div>
        </div>
    </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
