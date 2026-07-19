import type * as React from "react"

import { cn } from "@/lib/utils"

export function Callout({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-muted/50 my-6 rounded-lg border px-4 py-3 text-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
