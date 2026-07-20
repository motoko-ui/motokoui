import { Suspense } from "react"
import Link from "next/link"
import { Github } from "lucide-react"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { formatStars, getGithubStars } from "@/lib/github"
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

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="container-wrapper px-6">
        <div className="flex h-14 items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo />
            <span>{siteConfig.name}</span>
          </Link>

          <nav className="ml-4 hidden items-center gap-1 md:flex">
            {docsConfig.mainNav.map((item) =>
              item.href ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 text-sm transition-colors"
                >
                  {item.title}
                </Link>
              ) : null
            )}
          </nav>

          <div className="ml-auto flex items-center gap-2">
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
            <Separator orientation="vertical" className="mx-1 h-4" />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
