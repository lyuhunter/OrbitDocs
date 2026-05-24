import fs from "fs"
import { MetadataRoute } from "next"
import { siteConfig } from "@/lib/config.server"
import { getAllPages } from "@/lib/navigation"
import { getContentDir } from "@/lib/project.server"
import { findContentFile } from "@/lib/content"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const project of siteConfig.projects) {
    const contentDir = getContentDir(project.id)
    const pages = getAllPages(project.id)
    for (const page of pages) {
      const slug = page.slug.join("/")
      const path = slug ? `/docs/${project.id}/${slug}` : `/docs/${project.id}`
      const filePath = findContentFile(contentDir, page.slug)
      const mtime = filePath ? fs.statSync(filePath).mtime : new Date()
      entries.push({
        url: `${siteConfig.url}${path}`,
        lastModified: mtime,
        changeFrequency: "weekly" as const,
        priority: slug ? 0.8 : 1.0,
      })
    }
  }

  return entries
}
