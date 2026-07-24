"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

/* =============================================================================
 * Accordion — Motoko disclosure panels
 *
 * Soft height settle + content fade, same motion language as Tabs/Modal.
 *
 *   <Accordion type="single" collapsible defaultValue="item-1">
 *     <AccordionItem value="item-1">
 *       <AccordionTrigger>What is Motoko UI?</AccordionTrigger>
 *       <AccordionContent>…</AccordionContent>
 *     </AccordionItem>
 *   </Accordion>
 * ============================================================================= */

type AccordionContextValue = {
  isOpen: (itemValue: string) => boolean
  disableAnimation: boolean
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const ctx = React.useContext(AccordionContext)
  if (!ctx) {
    throw new Error("Accordion components must be used within <Accordion>")
  }
  return ctx
}

type AccordionItemContextValue = {
  value: string
  open: boolean
}

const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null)

function useAccordionItem() {
  const ctx = React.useContext(AccordionItemContext)
  if (!ctx) {
    throw new Error(
      "AccordionTrigger/Content must be used within <AccordionItem>"
    )
  }
  return ctx
}

const CONTENT_EASE = [0.22, 1, 0.36, 1] as const

function isValueOpen(
  openValue: string | string[] | undefined,
  itemValue: string
) {
  if (openValue === undefined || openValue === "") return false
  return Array.isArray(openValue)
    ? openValue.includes(itemValue)
    : openValue === itemValue
}

export type AccordionProps = React.ComponentProps<
  typeof AccordionPrimitive.Root
> & {
  /** Disable height and content motion. */
  disableAnimation?: boolean
}

function Accordion({
  className,
  disableAnimation = false,
  children,
  value: valueProp,
  defaultValue,
  onValueChange,
  type,
  ...props
}: AccordionProps) {
  const isControlled = valueProp !== undefined
  const [uncontrolled, setUncontrolled] = React.useState<string | string[]>(
    () => defaultValue ?? (type === "multiple" ? [] : "")
  )

  const openValue = isControlled ? valueProp : uncontrolled

  const handleValueChange = React.useCallback(
    (next: string | string[]) => {
      if (!isControlled) setUncontrolled(next)
      onValueChange?.(next as never)
    },
    [isControlled, onValueChange]
  )

  const ctx = React.useMemo(
    () => ({
      isOpen: (itemValue: string) => isValueOpen(openValue, itemValue),
      disableAnimation,
    }),
    [openValue, disableAnimation]
  )

  return (
    <AccordionContext.Provider value={ctx}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        type={type}
        className={cn(
          "w-full divide-y divide-black/5 dark:divide-white/10",
          className
        )}
        value={openValue as never}
        onValueChange={handleValueChange as never}
        {...props}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionContext.Provider>
  )
}

export type AccordionItemProps = React.ComponentProps<
  typeof AccordionPrimitive.Item
>

function AccordionItem({ className, value, ...props }: AccordionItemProps) {
  const { isOpen } = useAccordion()
  const open = isOpen(value)

  const itemCtx = React.useMemo(() => ({ value, open }), [value, open])

  return (
    <AccordionItemContext.Provider value={itemCtx}>
      <AccordionPrimitive.Item
        data-slot="accordion-item"
        value={value}
        className={cn("group/accordion-item", className)}
        {...props}
      />
    </AccordionItemContext.Provider>
  )
}

export type AccordionTriggerProps = React.ComponentProps<
  typeof AccordionPrimitive.Trigger
>

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header data-slot="accordion-header" className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 cursor-pointer items-center justify-between gap-4 py-4 text-left text-sm font-medium text-balance outline-none",
          "text-foreground transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
          "focus-visible:ring-ring/50 focus-visible:ring-offset-background rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          data-slot="accordion-chevron"
          aria-hidden
          className={cn(
            "text-muted-foreground size-4 shrink-0",
            "transition-[transform,color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
            "group-hover/accordion-trigger:text-foreground",
            "group-data-[state=open]/accordion-trigger:rotate-180"
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export type AccordionContentProps = React.ComponentProps<
  typeof AccordionPrimitive.Content
>

function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  const { open } = useAccordionItem()
  const { disableAnimation } = useAccordion()

  if (disableAnimation) {
    return (
      <AccordionPrimitive.Content
        data-slot="accordion-content"
        className={cn("overflow-hidden", className)}
        {...props}
      >
        <div className="text-muted-foreground pb-4 text-sm leading-relaxed text-pretty">
          {children}
        </div>
      </AccordionPrimitive.Content>
    )
  }

  return (
    <AccordionPrimitive.Content forceMount asChild {...props}>
      <motion.div
        data-slot="accordion-content"
        initial={false}
        animate={
          open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{
          height: { duration: 0.28, ease: CONTENT_EASE },
          opacity: { duration: 0.2, ease: CONTENT_EASE },
        }}
        className="overflow-hidden"
        style={{ pointerEvents: open ? "auto" : "none" }}
        {...(!open ? { inert: true } : {})}
      >
        <motion.div
          initial={false}
          animate={
            open
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: -6, filter: "blur(2px)" }
          }
          transition={{ duration: 0.2, ease: CONTENT_EASE }}
          className={cn(
            "text-muted-foreground pb-4 text-sm leading-relaxed text-pretty",
            className
          )}
        >
          {children}
        </motion.div>
      </motion.div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
