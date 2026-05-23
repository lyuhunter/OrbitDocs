import FlexSearch from "flexsearch"
import type { SearchDoc } from "./search-data"

let index: ReturnType<typeof createIndex> | null = null

function createIndex(docs: SearchDoc[]) {
  const idx = new FlexSearch.Document<SearchDoc, false>({
    tokenize: "forward",
    cache: true,
    document: {
      id: "id",
      index: ["title", "description"],
      store: ["title", "description", "slug"],
    },
  })

  for (const doc of docs) {
    idx.add(doc)
  }

  return idx
}

export type SearchResult = {
  slug: string[]
  title: string
  description?: string
}

export function searchInDocs(query: string, docs: SearchDoc[]): SearchResult[] {
  if (!index) {
    index = createIndex(docs)
  }

  const results = index.search(query, { limit: 10 })

  const found = new Set<string>()
  const items: SearchResult[] = []

  for (const fieldResult of results) {
    for (const rawId of fieldResult.result) {
      const id = String(rawId)
      if (found.has(id)) continue
      found.add(id)

      const doc = docs.find((d) => d.id === id)
      if (doc) {
        items.push({
          slug: doc.slug,
          title: doc.title,
          description: doc.description,
        })
      }
    }
  }

  return items
}
