import Link from "next/link"
import { Github } from "lucide-react"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"

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
            <Button variant="ghost" size="icon" className="size-8" asChild>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github className="size-4" />
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
