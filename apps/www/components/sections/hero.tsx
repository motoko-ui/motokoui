import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export function Hero() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_120%_90%_at_top,oklch(0.92_0.04_250/_0.7),transparent_70%)] dark:bg-[radial-gradient(ellipse_120%_90%_at_top,oklch(0.3_0.06_250/_0.6),transparent_70%)]"
      />
      <Logo className="mb-6 size-14" />
      <h1 className="relative max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
        <span
          aria-hidden
          className="absolute inset-x-[-0.5em] inset-y-[-0.2em] origin-center -rotate-2 bg-black dark:bg-white"
        />
        <span className="relative z-10 text-white dark:text-black">
          Build better. Designed for Production.
        </span>
      </h1>
      <p className="text-muted-foreground mt-10 max-w-2xl text-lg text-pretty">
        Components, application blocks, templates, and starter kits for modern
        React applications.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/docs/components/button">Browse Components</Link>
        </Button>
      </div>
    </section>
  )
}
