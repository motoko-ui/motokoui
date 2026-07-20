import { cn } from "@/lib/utils"
import { LOGO_MARKS } from "@/components/logo-marks"

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-7", className)}
      aria-hidden
    >
      <rect width="44" height="44" rx="6" className="fill-foreground" />
      {LOGO_MARKS.map((d) => (
        <path key={d} d={d} className="fill-background" />
      ))}
    </svg>
  )
}
