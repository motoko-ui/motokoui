"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/* =============================================================================
 * Tooltip — Motoko floating hint
 *
 *   <Tooltip>
 *     <TooltipTrigger asChild><Button>Hover</Button></TooltipTrigger>
 *     <TooltipContent>Short hint</TooltipContent>
 *   </Tooltip>
 * ============================================================================= */

export type TooltipProviderProps = React.ComponentProps<
  typeof TooltipPrimitive.Provider
>

function TooltipProvider({
  delayDuration = 200,
  skipDelayDuration = 100,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...props}
    />
  )
}

export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>

function Tooltip({ ...props }: TooltipProps) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

export type TooltipTriggerProps = React.ComponentProps<
  typeof TooltipPrimitive.Trigger
>

function TooltipTrigger({ ...props }: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

export type TooltipContentProps = React.ComponentProps<
  typeof TooltipPrimitive.Content
>

function TooltipContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin)",
          "rounded-xl bg-[#141414] px-3 py-1.5 text-sm font-medium text-white/95",
          "shadow-[0_8px_24px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,255,255,0.06)]",
          "animate-in fade-in-0 zoom-in-95 duration-150",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-100",
          "data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1",
          "data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
          "text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow
          className="fill-[#141414] drop-shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          width={10}
          height={5}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
