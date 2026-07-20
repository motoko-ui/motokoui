"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/copy-button"

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
  return (
    <div
      className={cn(
        "not-prose relative mt-4 mb-12 flex flex-col gap-3",
        className
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="gap-3">
        <div className="flex items-center justify-between gap-3">
          {!hideCode ? (
            <TabsList aria-label="Component preview">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-0.5">
            {!hideCode && code ? <CopyButton value={code} /> : null}
          </div>
        </div>

        <div className="bg-surface relative overflow-hidden rounded-xl border shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          {hideCode ? (
            <div
              data-align={align}
              className={cn(
                "preview flex min-h-[350px] w-full justify-center p-6 md:p-10",
                "data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
              )}
            >
              {component}
            </div>
          ) : (
            <>
              <TabsContent value="preview">
                <div
                  data-align={align}
                  className={cn(
                    "preview flex min-h-[350px] w-full justify-center p-6 md:p-10",
                    "data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
                  )}
                >
                  {component}
                </div>
              </TabsContent>
              <TabsContent
                value="code"
                className="bg-muted/30 min-h-[350px] **:[figure]:!m-0 **:[pre]:m-0 **:[pre]:max-h-[420px] **:[pre]:overflow-auto **:[pre]:bg-transparent **:[pre]:p-0"
              >
                {source}
              </TabsContent>
            </>
          )}
        </div>
      </Tabs>
    </div>
  )
}
