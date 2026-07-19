"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export function CopyButton({
  value,
  className,
  onClick,
  ...props
}: HTMLMotionProps<"button"> & {
  value: string
}) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (!hasCopied) return
    const timeout = setTimeout(() => setHasCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [hasCopied])

  return (
    <motion.button
      type="button"
      data-slot="copy-button"
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      title={hasCopied ? "Copied" : "Copy to Clipboard"}
      {...props}
      className={cn(
        "text-muted-foreground hover:text-foreground hover:bg-muted relative inline-flex size-8 items-center justify-center rounded-full",
        className
      )}
      onClick={async (event) => {
        await navigator.clipboard.writeText(value)
        setHasCopied(true)
        onClick?.(event)
      }}
    >
      <span className="sr-only">
        {hasCopied ? "Copied" : "Copy to Clipboard"}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        {hasCopied ? (
          <motion.span
            key="check"
            initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="absolute inset-0 flex items-center justify-center text-emerald-600 dark:text-emerald-400"
          >
            <CheckIcon className="size-3.5" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <ClipboardIcon className="size-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
