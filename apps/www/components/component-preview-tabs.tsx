"use client"

import * as React from "react"
import { AnimatePresence, LayoutGroup, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

const TABS = [
  { id: "preview", label: "Preview" },
  { id: "code", label: "Code" },
] as const

type TabId = (typeof TABS)[number]["id"]

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  code,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  code?: string
  component: React.ReactNode
  source: React.ReactNode
}) {
  const [tab, setTab] = React.useState<TabId>("preview")
  const layoutId = React.useId()

  return (
    <div
      className={cn(
        "not-prose relative mt-4 mb-12 flex flex-col gap-3",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        {!hideCode ? (
          <LayoutGroup id={layoutId}>
            <div
              role="tablist"
              aria-label="Component preview"
              className="relative inline-flex h-9 items-center rounded-xl p-1"
            >
              {TABS.map((item) => {
                const isActive = tab === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setTab(item.id)}
                    className={cn(
                      "relative z-10 cursor-pointer rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId={`${layoutId}-pill`}
                        className="bg-background absolute inset-0 rounded-xl shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    ) : null}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-0.5">
          {!hideCode && code ? <CopyButton value={code} /> : null}
        </div>
      </div>

      <div className="bg-surface relative overflow-hidden rounded-xl border shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <AnimatePresence mode="wait" initial={false}>
          {tab === "preview" ? (
            <motion.div
              key="preview"
              role="tabpanel"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                data-align={align}
                className={cn(
                  "preview flex min-h-[350px] w-full justify-center p-6 md:p-10",
                  "data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
                )}
              >
                {component}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="code"
              role="tabpanel"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-muted/30 min-h-[350px] **:[figure]:!m-0 **:[pre]:m-0 **:[pre]:max-h-[420px] **:[pre]:overflow-auto **:[pre]:bg-transparent **:[pre]:p-0"
            >
              {source}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
