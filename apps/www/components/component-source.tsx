import * as React from "react"

import { highlightCode } from "@/lib/highlight-code"
import { cn } from "@/lib/utils"

export async function ComponentSource({
  code,
  className,
}: {
  code: string
  className?: string
}) {
  const highlightedCode = await highlightCode(code, "tsx")

  return (
    <div
      className={cn(
        "h-full overflow-auto p-4 text-sm [&_pre]:m-0 [&_pre]:bg-transparent [&_pre]:p-0",
        className
      )}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  )
}
