import { MetadataRoute } from "next"
import { siteConfig } from "@/lib/config.server"
import { getAllPages } from "@/lib/navigation"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const project of siteConfig.projects) {
    const pages = getAllPages(project.id)
    for (const page of pages) {
      const slug = page.slug.join("/")
      const path = slug ? `/docs/${project.id}/${slug}` : `/docs/${project.id}`
      entries.push({
        url: `${siteConfig.url}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: slug ? 0.8 : 1.0,
      })
    }
  }

  return entries
}
