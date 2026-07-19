import Link from "next/link"

import { source } from "@/lib/source"

export function ComponentsList() {
  const pages = source
    .getPages()
    .filter(
      (page) =>
        page.url.startsWith("/docs/components/") &&
        page.url !== "/docs/components"
    )
    .sort((a, b) => a.data.title.localeCompare(b.data.title))

  if (!pages.length) {
    return null
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 lg:gap-y-6">
      {pages.map((page) => (
        <Link
          key={page.url}
          href={page.url}
          className="text-base font-medium underline-offset-4 hover:underline"
        >
          {page.data.title}
        </Link>
      ))}
    </div>
  )
}
