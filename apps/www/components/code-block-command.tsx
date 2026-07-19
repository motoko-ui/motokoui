"use client"

import * as React from "react"
import { AnimatePresence, LayoutGroup, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useConfig, type PackageManager } from "@/hooks/use-config"
import { CopyButton } from "@/components/copy-button"

const PACKAGE_MANAGERS = [
  "pnpm",
  "npm",
  "yarn",
  "bun",
] as const satisfies readonly PackageManager[]

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: {
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
}) {
  const [config, setConfig] = useConfig()
  const layoutId = React.useId()

  const packageManager = config.packageManager || "pnpm"
  const tabs = React.useMemo(
    () =>
      ({
        pnpm: __pnpm__,
        npm: __npm__,
        yarn: __yarn__,
        bun: __bun__,
      }) satisfies Record<PackageManager, string | undefined>,
    [__npm__, __pnpm__, __yarn__, __bun__]
  )

  const command = tabs[packageManager]

  return (
    <div data-slot="tabs" className="relative">
      <div className="flex items-center justify-between gap-3 px-3 py-2.5">
        <LayoutGroup id={layoutId}>
          <div
            role="tablist"
            aria-label="Package manager"
            className="relative inline-flex h-9 items-center rounded-xl p-1"
          >
            {PACKAGE_MANAGERS.map((pm) => {
              const isActive = packageManager === pm

              return (
                <button
                  key={pm}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() =>
                    setConfig({
                      ...config,
                      packageManager: pm,
                    })
                  }
                  className={cn(
                    "relative z-10 rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors",
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
                  <span className="relative z-10">{pm}</span>
                </button>
              )
            })}
          </div>
        </LayoutGroup>

        {command ? <CopyButton value={command} /> : null}
      </div>

      <div className="border-border/60 no-scrollbar overflow-x-auto border-t px-4 py-3.5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.pre
            key={packageManager}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="m-0"
          >
            <code
              className="relative font-mono text-sm leading-none"
              data-language="bash"
            >
              {command}
            </code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  )
}
