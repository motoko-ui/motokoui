import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { mdxComponents } from "@/mdx-components"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { getNeighboursFromConfig } from "@/config/docs"
import { source } from "@/lib/source"
import { absoluteUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Contribute } from "@/components/contribute"
import { DocsTableOfContents } from "@/components/docs-toc"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return source.generateParams()
}

interface DocPageProps {
  params: Promise<{
    slug?: string[]
  }>
}

async function getDocFromParams({ params }: DocPageProps) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()
  const doc = page.data
  if (!doc.title || !doc.description) {
    notFound()
  }

  return { doc, page }
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { doc, page } = await getDocFromParams({ params })

  return {
    title: `${doc.title} | Motoko UI`,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(page.url),
    },
  }
}

function humanizeSegment(segment: string): string {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function buildDocsBreadcrumbs(pageUrl: string, title: string) {
  const segments = pageUrl
    .replace(/^\/docs\/?/, "")
    .split("/")
    .filter(Boolean)

  const items: { name: string; url?: string }[] = [
    { name: "Docs", url: "/docs" },
  ]

  if (segments.length === 0) {
    items.push({ name: title })
    return items
  }

  let acc = "/docs"
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    acc += `/${segment}`
    const isLast = i === segments.length - 1
    items.push({
      name: isLast ? title : humanizeSegment(segment),
      url: isLast ? undefined : acc,
    })
  }

  return items
}

export default async function DocPage({ params }: DocPageProps) {
  const { doc, page } = await getDocFromParams({ params })
  const MDX = doc.body
  const neighbours = getNeighboursFromConfig(page.url)
  const breadcrumbs = buildDocsBreadcrumbs(page.url, doc.title)
  const lastBreadcrumb = breadcrumbs.at(-1)

  return (
    <div
      data-slot="docs"
      className="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-4xl min-w-0 flex-1 flex-col gap-8 px-0 py-2 lg:py-0">
          <div className="flex flex-col gap-2">
            <nav aria-label="Breadcrumb" className="text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-1 text-sm">
                {breadcrumbs.map((item, index) => {
                  const label = item.name
                  const isLast = item === lastBreadcrumb

                  return (
                    <li
                      key={`${index}-${item.url ?? label}`}
                      className="flex items-center gap-1"
                    >
                      {isLast ? (
                        <span
                          aria-current="page"
                          className="text-foreground font-medium"
                        >
                          {label}
                        </span>
                      ) : item.url ? (
                        <Link
                          href={item.url}
                          className="hover:text-foreground transition-colors"
                        >
                          {label}
                        </Link>
                      ) : (
                        <span>{label}</span>
                      )}
                      {!isLast ? <span aria-hidden="true">/</span> : null}
                    </li>
                  )
                })}
              </ol>
            </nav>

            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight sm:text-4xl">
              {doc.title}
            </h1>
            {doc.description ? (
              <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                {doc.description}
              </p>
            ) : null}
          </div>

          <article className="prose w-full flex-1">
            <MDX components={mdxComponents} />
          </article>

          <div className="flex items-center justify-between gap-4 border-t pt-6">
            {neighbours.previous ? (
              <Button asChild variant="outline" size="sm">
                <Link href={neighbours.previous.href}>
                  <ArrowLeft className="size-4" />
                  {neighbours.previous.title}
                </Link>
              </Button>
            ) : (
              <span />
            )}
            {neighbours.next ? (
              <Button asChild variant="outline" size="sm">
                <Link href={neighbours.next.href}>
                  {neighbours.next.title}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--header-height)-2rem)] w-56 shrink-0 flex-col gap-4 overflow-hidden overscroll-none xl:flex">
        <div className="no-scrollbar flex flex-col gap-4 overflow-y-auto py-2 pl-6">
          {doc.toc?.length ? <DocsTableOfContents toc={doc.toc} /> : null}
          <Contribute pageUrl={page.url} />
        </div>
      </div>
    </div>
  )
}
