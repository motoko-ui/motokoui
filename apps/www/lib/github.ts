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
