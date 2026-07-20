import { cache } from "react"

import { siteConfig } from "@/config/site"

interface GitHubIssueUrlParams {
  owner: string
  repo: string
  title?: string
  body?: string
  labels?: string[]
  template?: string
  projects?: string[]
  assignees?: string[]
  milestone?: string
}

export function getGithubOwnerRepo(
  githubUrl: string = siteConfig.links.github
) {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (!match) {
    return { owner: "motoko-ui", repo: "motokoui" }
  }
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") }
}

/**
 * Generates a GitHub issue URL with the provided parameters.
 * https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue#creating-an-issue-from-a-url-query
 */
export function getGitHubIssueUrl(params: GitHubIssueUrlParams): string {
  const { owner, repo, ...issueParams } = params
  const baseUrl = `https://github.com/${owner}/${repo}/issues/new`
  const urlParams = new URLSearchParams()

  Object.entries(issueParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => urlParams.append(key, item))
    } else if (value !== undefined) {
      urlParams.append(key, value.toString())
    }
  })

  return `${baseUrl}?${urlParams.toString()}`
}

export function formatStars(count: number) {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count)
}

/**
 * Fetches stargazer count for the Motoko UI repo.
 * Deduped per request via React cache; HTTP cached for 1 hour.
 * Optional GITHUB_TOKEN raises API rate limits.
 */
export const getGithubStars = cache(async (): Promise<number | null> => {
  const { owner, repo } = getGithubOwnerRepo()
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return null
    }

    const data = (await res.json()) as { stargazers_count?: number }
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null
  } catch {
    return null
  }
})
