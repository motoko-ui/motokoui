import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const rainbowButtonVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2",
    "animate-rainbow border-0 font-medium outline-none select-none",
    "bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box]",
    "[border:calc(0.125rem)_solid_transparent]",
    "transition-[transform,box-shadow,opacity] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
    "before:pointer-events-none before:absolute before:bottom-[-20%] before:left-1/2 before:z-[-1]",
    "before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow",
    "before:bg-[linear-gradient(90deg,var(--rainbow-1),var(--rainbow-5),var(--rainbow-3),var(--rainbow-4),var(--rainbow-2))]",
    "before:bg-[length:200%] before:[filter:blur(0.75rem)]",
    "fill-white text-white",
    "bg-[linear-gradient(#2C2C2C,#282828),linear-gradient(#2C2C2C_50%,rgba(44,44,44,0.6)_80%,rgba(44,44,44,0)),linear-gradient(90deg,var(--rainbow-1),var(--rainbow-5),var(--rainbow-3),var(--rainbow-4),var(--rainbow-2))]",
    "shadow-[inset_2px_0_8px_2px_rgba(248,248,248,0.2)]",
    "hover:shadow-[inset_2px_0_8px_2px_rgba(248,248,248,0)]",
    "active:scale-[0.99] active:shadow-[inset_0_2px_6px_2px_rgba(0,0,0,0.35)]",
    "dark:fill-black dark:text-black",
    "dark:bg-[linear-gradient(#f7f7f7,#ffffff),linear-gradient(#ffffff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--rainbow-1),var(--rainbow-5),var(--rainbow-3),var(--rainbow-4),var(--rainbow-2))]",
    "dark:shadow-[inset_2px_0_8px_2px_rgba(24,24,24,0.12)]",
    "dark:hover:shadow-[inset_2px_0_8px_2px_rgba(24,24,24,0)]",
    "dark:active:shadow-[inset_0_2px_6px_2px_rgba(0,0,0,0.12)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "focus-visible:ring-2 focus-visible:ring-ring/50",
  ].join(" "),
  {
    variants: {
      size: {
        default: "h-12 rounded-3xl px-7 text-sm",
        sm: "h-10 rounded-3xl px-5 text-sm",
        lg: "h-14 rounded-3xl px-8 text-base",
        icon: "size-10 justify-center rounded-full p-0",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export type RainbowButtonVariantProps = VariantProps<
  typeof rainbowButtonVariants
>

export interface RainbowButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    RainbowButtonVariantProps {
  asChild?: boolean
  isDisabled?: boolean
}

const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  (
    {
      className,
      size = "default",
      asChild = false,
      isDisabled,
      onClick,
      type,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        data-slot="rainbow-button"
        type={asChild ? undefined : type || "button"}
        disabled={isDisabled || props.disabled}
        onClick={onClick}
        className={cn(rainbowButtonVariants({ size }), className)}
        {...props}
      />
    )
  }
)
RainbowButton.displayName = "RainbowButton"

export { RainbowButton, rainbowButtonVariants }
