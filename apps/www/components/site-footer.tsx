import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="border-border/60 mt-auto border-t">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-center px-4 sm:px-6">
        <p className="text-muted-foreground text-center text-sm">
          Built by{" "}
          <a
            href={siteConfig.creatorUrl}
            className="text-foreground hover:text-foreground/80 font-medium transition-colors"
          >
            {siteConfig.creator}
          </a>
          . Source on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-foreground/80 font-medium transition-colors"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
