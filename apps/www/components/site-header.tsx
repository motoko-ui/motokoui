import { Suspense } from "react"
import Link from "next/link"
import { Github } from "lucide-react"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { formatStars, getGithubStars } from "@/lib/github"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CommandMenu } from "@/components/command-menu"
import { XIcon } from "@/components/icons"
import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"

function GitHubLink({ stars }: { stars?: number | null }) {
  return (
    <Button variant="ghost" size="sm" className="h-8 gap-1.5 px-2" asChild>
      <Link
        href={siteConfig.links.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={
          stars != null ? `GitHub repository, ${stars} stars` : "GitHub"
        }
      >
        <Github className="size-4" />
        {stars != null ? (
          <span className="text-muted-foreground text-xs tabular-nums">
            {formatStars(stars)}
          </span>
        ) : null}
      </Link>
    </Button>
  )
}

async function GitHubStars() {
  const stars = await getGithubStars()
  return <GitHubLink stars={stars} />
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header
      className={cn(
        "z-50 flex justify-center px-4 pt-5",
        overlay
          ? "pointer-events-none absolute inset-x-0 top-0"
          : "bg-background/80 supports-backdrop-filter:bg-background/70 sticky top-0 backdrop-blur-lg"
      )}
    >
      <div className="border-border/60 bg-background/80 supports-backdrop-filter:bg-background/70 pointer-events-auto flex h-14 w-full max-w-4xl min-w-0 items-center gap-3 rounded-2xl border px-3 shadow-sm backdrop-blur-lg sm:min-w-160 sm:gap-4 sm:px-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-semibold"
        >
          <Logo />
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {docsConfig.mainNav.map((item) =>
            item.href ? (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground rounded-lg px-2.5 py-1.5 text-sm transition-colors"
              >
                {item.title}
              </Link>
            ) : null
          )}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <CommandMenu />
          <Suspense fallback={<GitHubLink />}>
            <GitHubStars />
          </Suspense>
          <Button variant="ghost" size="icon" className="size-8" asChild>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <XIcon className="size-3.5" />
            </Link>
          </Button>
          <Separator orientation="vertical" className="mx-0.5 h-4" />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
