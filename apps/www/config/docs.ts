import { NavItem, NavItemWithChildren } from "@/types"

interface DocsConfig {
  mainNav: NavItem[]
  sidebarNav: NavItemWithChildren[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Components",
      href: "/docs/components",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
      ],
    },
    {
      title: "Buttons",
      items: [
        {
          title: "Button",
          href: "/docs/components/button",
          items: [],
        },
        {
          title: "Rainbow Button",
          href: "/docs/components/rainbow-button",
          items: [],
        },
      ],
    },
    {
      title: "Inputs & Forms",
      items: [
        {
          title: "Input",
          href: "/docs/components/input",
          items: [],
        },
        {
          title: "Select",
          href: "/docs/components/select",
          items: [],
        },
      ],
    },
    {
      title: "Navigation",
      items: [
        {
          title: "Tabs",
          href: "/docs/components/tabs",
          items: [],
        },
        {
          title: "Notch",
          href: "/docs/components/notch",
          items: [],
        },
      ],
    },
    {
      title: "Modal & Popovers",
      items: [
        {
          title: "Modal",
          href: "/docs/components/modal",
          items: [],
        },
      ],
    },
  ],
}

export function flattenSidebarItems(
  items: NavItemWithChildren[]
): { title: string; href: string }[] {
  const result: { title: string; href: string }[] = []

  for (const item of items) {
    if (item.href) {
      result.push({ title: item.title, href: item.href })
    }
    if (item.items?.length) {
      result.push(...flattenSidebarItems(item.items))
    }
  }

  return result
}

export function getNeighboursFromConfig(url: string) {
  const flat = flattenSidebarItems(docsConfig.sidebarNav)
  const index = flat.findIndex((item) => item.href === url)

  return {
    previous: index > 0 ? flat[index - 1] : undefined,
    next: index >= 0 && index < flat.length - 1 ? flat[index + 1] : undefined,
  }
}
