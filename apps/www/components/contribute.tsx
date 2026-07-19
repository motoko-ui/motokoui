import Link from "next/link"
import { BugIcon, LightbulbIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { getGitHubIssueUrl } from "@/lib/github"

function getGithubOwnerRepo(githubUrl: string) {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (!match) {
    return { owner: "motoko-ui", repo: "motokoui" }
  }
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") }
}

export function Contribute({ pageUrl }: { pageUrl: string }) {
  const { owner, repo } = getGithubOwnerRepo(siteConfig.links.github)

  const contributeLinks = [
    {
      text: "Report an issue",
      icon: BugIcon,
      href: getGitHubIssueUrl({
        owner,
        repo,
        title: `[bug]: ${pageUrl}`,
        labels: ["bug"],
        template: "bug_report.yml",
      }),
    },
    {
      text: "Request a feature",
      icon: LightbulbIcon,
      href: getGitHubIssueUrl({
        owner,
        repo,
        title: `[feat]: ${pageUrl}`,
        labels: ["enhancement"],
        template: "feature_request.yml",
      }),
    },
  ]

  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        Contribute
      </p>
      <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
        {contributeLinks.map((link) => (
          <li key={link.text}>
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs no-underline transition-colors"
            >
              <link.icon className="size-3" />
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
