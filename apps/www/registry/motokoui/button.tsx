import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2",
    "overflow-hidden border-0 font-medium outline-none select-none",
    "transition-[transform,box-shadow,background-color,color,opacity] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
    "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border-[1.5px] after:transition-[opacity,border-color,box-shadow] after:duration-200 after:ease-[cubic-bezier(0.2,0,0,1)]",
    "active:scale-[0.99]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "focus-visible:ring-2 focus-visible:ring-ring/50",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-linear-to-b from-[#2C2C2C] to-[#282828] fill-white text-white",
          "shadow-[inset_2px_0_8px_2px_rgba(248,248,248,0.2)]",
          "after:border-white/20 after:mask-[linear-gradient(to_top,transparent_0,black_100%)]",
          "hover:shadow-[inset_2px_0_8px_2px_rgba(248,248,248,0)] hover:after:opacity-40",
          "active:shadow-[inset_0_2px_6px_2px_rgba(0,0,0,0.35)] active:after:opacity-20",
          "dark:from-[#f7f7f7] dark:to-white dark:text-black dark:fill-black",
          "dark:shadow-[inset_2px_0_8px_2px_rgba(24,24,24,0.12)]",
          "dark:after:border-white/50 dark:after:shadow-[inset_2px_0_8px_2px_rgba(24,24,24,0.25)]",
          "dark:hover:after:opacity-0 dark:hover:shadow-[inset_2px_0_8px_2px_rgba(24,24,24,0)]",
          "dark:active:shadow-[inset_0_2px_6px_2px_rgba(0,0,0,0.12)]",
        ].join(" "),
        secondary: [
          "bg-linear-to-b from-[#F3F3F3] to-[#E8E8E7] fill-current text-foreground",
          "shadow-[inset_2px_0_8px_2px_rgba(255,255,255,0.75)]",
          "after:border-black/10 after:mask-[linear-gradient(to_top,transparent_0,black_100%)]",
          "hover:shadow-[inset_2px_0_8px_2px_rgba(255,255,255,0)] hover:after:opacity-40",
          "active:shadow-[inset_0_2px_6px_2px_rgba(0,0,0,0.1)] active:after:opacity-20",
          "dark:from-[#2A2A2A] dark:to-[#222222] dark:text-white",
          "dark:shadow-[inset_2px_0_8px_2px_rgba(255,255,255,0.08)]",
          "dark:after:border-white/15",
          "dark:hover:after:opacity-0 dark:hover:shadow-[inset_2px_0_8px_2px_rgba(255,255,255,0)]",
          "dark:active:shadow-[inset_0_2px_6px_2px_rgba(0,0,0,0.35)]",
        ].join(" "),
        outline: [
          "bg-transparent fill-current text-foreground",
          "shadow-[inset_2px_0_8px_2px_rgba(255,255,255,0)]",
          "after:border-black/15 after:opacity-100 after:mask-[linear-gradient(to_top,transparent_0,black_100%)]",
          "hover:bg-[#F4F4F4] hover:shadow-[inset_2px_0_8px_2px_rgba(255,255,255,0.7)] hover:after:opacity-45",
          "active:bg-[#ECECEC] active:shadow-[inset_0_2px_6px_2px_rgba(0,0,0,0.08)] active:after:opacity-25",
          "dark:text-white dark:after:border-white/20",
          "dark:hover:bg-[#2A2A2A] dark:hover:shadow-[inset_2px_0_8px_2px_rgba(255,255,255,0.06)] dark:hover:after:opacity-40",
          "dark:active:bg-[#222222] dark:active:shadow-[inset_0_2px_6px_2px_rgba(0,0,0,0.35)]",
        ].join(" "),
        ghost: [
          "bg-transparent fill-current text-foreground",
          "shadow-[inset_2px_0_8px_2px_rgba(255,255,255,0)]",
          "after:border-black/10 after:opacity-0 after:mask-[linear-gradient(to_top,transparent_0,black_100%)]",
          "hover:bg-[#F3F3F3] hover:shadow-[inset_2px_0_8px_2px_rgba(255,255,255,0.7)] hover:after:opacity-100",
          "active:bg-[#EBEBEB] active:shadow-[inset_0_2px_6px_2px_rgba(0,0,0,0.08)] active:after:opacity-40",
          "dark:text-white dark:after:border-white/12",
          "dark:hover:bg-[#2A2A2A] dark:hover:shadow-[inset_2px_0_8px_2px_rgba(255,255,255,0.06)] dark:hover:after:opacity-100",
          "dark:active:bg-[#222222] dark:active:shadow-[inset_0_2px_6px_2px_rgba(0,0,0,0.35)]",
        ].join(" "),
        destructive: [
          "bg-linear-to-b from-[#E5484D] to-[#D1393E] fill-white text-white",
          "shadow-[inset_2px_0_8px_2px_rgba(255,255,255,0.22)]",
          "after:border-white/25 after:mask-[linear-gradient(to_top,transparent_0,black_100%)]",
          "hover:shadow-[inset_2px_0_8px_2px_rgba(255,255,255,0)] hover:after:opacity-40",
          "active:shadow-[inset_0_2px_6px_2px_rgba(0,0,0,0.28)] active:after:opacity-20",
          "dark:from-[#FF6369] dark:to-[#E5484D]",
          "dark:shadow-[inset_2px_0_8px_2px_rgba(255,255,255,0.18)]",
          "dark:hover:after:opacity-30",
          "dark:active:shadow-[inset_0_2px_6px_2px_rgba(0,0,0,0.35)]",
        ].join(" "),
        link: [
          "h-auto rounded-none bg-transparent p-0 text-foreground underline-offset-4",
          "shadow-none after:hidden",
          "hover:underline hover:opacity-80",
          "active:opacity-60 active:scale-100",
        ].join(" "),
        default: [
          "bg-linear-to-b from-[#2C2C2C] to-[#282828] fill-white text-white",
          "shadow-[inset_2px_0_8px_2px_rgba(248,248,248,0.2)]",
          "after:border-white/20 after:mask-[linear-gradient(to_top,transparent_0,black_100%)]",
          "hover:shadow-[inset_2px_0_8px_2px_rgba(248,248,248,0)] hover:after:opacity-40",
          "active:shadow-[inset_0_2px_6px_2px_rgba(0,0,0,0.35)] active:after:opacity-20",
          "dark:from-[#f7f7f7] dark:to-white dark:text-black dark:fill-black",
          "dark:shadow-[inset_2px_0_8px_2px_rgba(24,24,24,0.12)]",
          "dark:after:border-white/50 dark:after:shadow-[inset_2px_0_8px_2px_rgba(24,24,24,0.25)]",
          "dark:hover:after:opacity-0 dark:hover:shadow-[inset_2px_0_8px_2px_rgba(24,24,24,0)]",
          "dark:active:shadow-[inset_0_2px_6px_2px_rgba(0,0,0,0.12)]",
        ].join(" "),
      },
      size: {
        default: "h-12 rounded-3xl px-7 text-sm",
        sm: "h-10 rounded-3xl px-5 text-sm",
        lg: "h-14 rounded-3xl px-8 text-base",
        icon: "size-10 justify-center rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  asChild?: boolean
  isDisabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
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
        data-slot="button"
        type={asChild ? undefined : type || "button"}
        disabled={isDisabled || props.disabled}
        onClick={onClick}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
