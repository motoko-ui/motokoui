"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { NavItemWithChildren } from "@/types"
import { ChevronRight } from "lucide-react"
import { LayoutGroup, motion } from "motion/react"

import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface DocsSidebarNavItemsProps {
  items: NavItemWithChildren[]
  pathname: string
  level?: number
}

function DocsSidebarNavItems({
  items,
  pathname,
  level = 0,
}: DocsSidebarNavItemsProps) {
  return (
    <SidebarMenu className={cn("gap-1", level > 0 && "ml-3 border-l pl-3")}>
      {items.map((item) => {
        const isActive = item.href ? pathname === item.href : false
        const hasChildren = item.items && item.items.length > 0

        return (
          <div key={item.href || item.title}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild={!!item.href}
                isActive={isActive}
                className={cn(
                  "relative h-8 w-full overflow-visible rounded-md border-transparent px-2.5 text-[0.8125rem] font-medium transition-colors",
                  "hover:bg-muted/60",
                  "data-[active=true]:text-foreground data-[active=true]:bg-transparent data-[active=true]:shadow-none"
                )}
              >
                {item.href ? (
                  <Link href={item.href} className="relative z-10">
                    {isActive ? (
                      <motion.span
                        layoutId="docs-sidebar-active"
                        className="bg-accent absolute inset-0 rounded-md"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    ) : null}
                    <span className="relative z-10 flex items-center gap-2">
                      {item.title}
                      {item.label ? (
                        <span className="rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                          {item.label}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                ) : (
                  <span className="flex items-center gap-2">{item.title}</span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
            {hasChildren ? (
              <DocsSidebarNavItems
                items={item.items!}
                pathname={pathname}
                level={level + 1}
              />
            ) : null}
          </div>
        )
      })}
    </SidebarMenu>
  )
}

function DocsSidebarSection({
  title,
  items,
  pathname,
}: {
  title: string
  items: NavItemWithChildren[]
  pathname: string
}) {
  const [open, setOpen] = React.useState(true)

  return (
    <SidebarGroup className="gap-0 p-0 py-0.5">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="text-muted-foreground/80 hover:text-foreground flex h-6 w-full cursor-pointer items-center gap-1 rounded-md px-2 text-[0.65rem] font-semibold tracking-wider uppercase transition-colors"
      >
        <ChevronRight
          className={cn(
            "size-3 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
            open && "rotate-90"
          )}
        />
        <span className="truncate">{title}</span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <SidebarGroupContent>
            <DocsSidebarNavItems items={items} pathname={pathname} />
          </SidebarGroupContent>
        </div>
      </div>
    </SidebarGroup>
  )
}

export function DocsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--header-height)-2rem)] bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar overflow-x-hidden px-2 pb-12">
        <div className="h-(--top-spacing) shrink-0" />
        <LayoutGroup id="docs-sidebar">
          {docsConfig.sidebarNav.map((section) => (
            <DocsSidebarSection
              key={section.title}
              title={section.title}
              items={section.items ?? []}
              pathname={pathname}
            />
          ))}
        </LayoutGroup>
      </SidebarContent>
    </Sidebar>
  )
}
