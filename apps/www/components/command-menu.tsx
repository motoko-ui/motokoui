"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import type { NavItemWithChildren } from "@/types"
import { FileText, Search } from "lucide-react"

import { docsConfig } from "@/config/docs"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

type SearchItem = {
  title: string
  href: string
  group: string
}

function collectSearchItems(
  items: NavItemWithChildren[],
  group: string,
  result: SearchItem[] = []
): SearchItem[] {
  for (const item of items) {
    if (item.href) {
      result.push({ title: item.title, href: item.href, group })
    }
    if (item.items?.length) {
      collectSearchItems(item.items, item.title || group, result)
    }
  }
  return result
}

function buildGroupedItems() {
  const groups = new Map<string, SearchItem[]>()

  for (const section of docsConfig.sidebarNav) {
    const items: SearchItem[] = []

    if (section.href) {
      items.push({
        title: section.title,
        href: section.href,
        group: section.title,
      })
    }

    collectSearchItems(section.items ?? [], section.title, items)

    if (items.length) {
      groups.set(section.title, items)
    }
  }

  return groups
}

function useModKeyLabel() {
  const [modKey, setModKey] = React.useState<"⌘" | "Ctrl" | null>(null)

  React.useEffect(() => {
    const isApple = /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent)
    setModKey(isApple ? "⌘" : "Ctrl")
  }, [])

  return modKey
}

export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const groupedItems = React.useMemo(() => buildGroupedItems(), [])
  const modKey = useModKeyLabel()

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "k" || !(event.metaKey || event.ctrlKey)) {
        return
      }

      const target = event.target as HTMLElement
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return
      }

      event.preventDefault()
      setOpen((prev) => !prev)
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-muted-foreground relative h-8 w-8 justify-center px-0 font-normal sm:w-40 sm:justify-start sm:px-2.5 md:w-56"
        onClick={() => setOpen(true)}
        type="button"
        aria-label="Search documentation"
      >
        <Search className="size-3.5" />
        <span className="hidden truncate sm:inline-flex">Search...</span>
        {modKey ? (
          <kbd className="bg-muted pointer-events-none absolute top-1.5 right-3 hidden h-5 items-center gap-0.5 rounded border px-1.5 font-mono text-[10px] font-medium select-none md:flex">
            <span className="text-xs">{modKey}</span>K
          </kbd>
        ) : null}
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} title="Search docs">
        <CommandInput placeholder="Search documentation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {[...groupedItems.entries()].map(([group, items]) => (
            <CommandGroup key={group} heading={group}>
              {items.map((item) => (
                <CommandItem
                  key={item.href}
                  value={`${item.title} ${item.href} ${group}`}
                  onSelect={() => {
                    runCommand(() => router.push(item.href))
                  }}
                >
                  <FileText />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
