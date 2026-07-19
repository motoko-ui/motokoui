import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { source } from "@/lib/source"

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = source.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },
    ...docs,
  ]
}
