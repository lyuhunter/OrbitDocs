import { getAllPages, type FlatPage } from "./navigation"

export type SearchDoc = {
  id: string
  title: string
  description: string
  slug: string[]
}

export function getSearchData(): SearchDoc[] {
  return getAllPages().map((page) => ({
    id: page.slug.join("/"),
    title: page.title,
    description: page.description ?? "",
    slug: page.slug,
  }))
}
