import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container-wrapper px-6">
        <div className="text-muted-foreground flex h-16 items-center justify-center text-center text-sm">
          Built by{" "}
          <a
            href={siteConfig.creatorUrl}
            className="text-foreground mx-1 font-medium underline underline-offset-4"
          >
            {siteConfig.creator}
          </a>
          . Source on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-foreground mx-1 font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </div>
      </div>
    </footer>
  )
}
