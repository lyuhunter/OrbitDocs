import { cache } from "react"
import { getAllPages } from "./navigation"
import { siteConfig } from "./config.server"

export type SearchDoc = {
  id: string
  title: string
  description: string
  slug: string[]
  projectId?: string
}

export const getSearchData = cache((): SearchDoc[] => {
  const docs: SearchDoc[] = []

  for (const project of siteConfig.projects) {
    const pages = getAllPages(project.id)
    for (const page of pages) {
      docs.push({
        id: `${project.id}/${page.slug.join("/")}`,
        title: page.title,
        description: page.description ?? "",
        slug: page.slug,
        projectId: project.id,
      })
    }
  }

  return docs
})
