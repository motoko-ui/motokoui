import Link from "next/link"

export function SiteBanner() {
  return (
    <div className="bg-foreground text-background relative z-50 flex h-10 w-full items-center justify-center px-4 text-center text-sm font-medium">
      <Link href="/components" className="hover:underline">
        Motoko UI Released — Explore the components
      </Link>
    </div>
  )
}
