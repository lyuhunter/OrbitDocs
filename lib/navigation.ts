import fs from "fs"
import path from "path"
import { cache } from "react"
import matter from "gray-matter"
import { getContentDir } from "./project.server"

export type NavPage = {
  type: "page"
  slug: string[]
  title: string
  order: number
  icon?: string
  description?: string
}

export type NavGroup = {
  type: "group"
  title: string
  order: number
  icon?: string
  collapsed: boolean
  children: NavNode[]
}

export type NavNode = NavPage | NavGroup

export type FlatPage = {
  slug: string[]
  title: string
  order: number
  icon?: string
  description?: string
}

function readCategoryJson(dir: string): Partial<NavGroup> | null {
  const file = path.join(dir, "_category_.json")
  if (!fs.existsSync(file)) return null
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"))
  } catch {
    return null
  }
}

function readFrontmatter(file: string) {
  const raw = fs.readFileSync(file, "utf-8")
  const { data } = matter(raw)
  return {
    title: data.title || path.basename(file, path.extname(file)),
    order: typeof data.order === "number" ? data.order : 999,
    icon: data.icon,
    description: data.description,
  }
}

function scanDir(dir: string, parentSlug: string[] = []): NavNode[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const nodes: NavNode[] = []

  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "_category_.json") continue

    const fullPath = path.join(dir, entry.name)
    const name = path.parse(entry.name).name
    const slug = name === "index" ? parentSlug : [...parentSlug, name]

    if (entry.isDirectory()) {
      const group = readCategoryJson(fullPath)
      if (!group) continue
      const children = scanDir(fullPath, slug)
      nodes.push({
        type: "group",
        title: group.title || entry.name,
        order: group.order ?? 999,
        icon: group.icon,
        collapsed: group.collapsed ?? true,
        children,
      })
    } else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
      const fm = readFrontmatter(fullPath)
      nodes.push({
        type: "page",
        slug,
        title: fm.title,
        order: fm.order,
        icon: fm.icon,
        description: fm.description,
      })
    }
  }

  nodes.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
  return nodes
}

export const getNavigation = cache((projectId?: string): NavNode[] => {
  const dir = projectId ? getContentDir(projectId) : getContentDir("docs")
  if (!fs.existsSync(dir)) return []
  return scanDir(dir)
})

export function getAllPages(projectId?: string): FlatPage[] {
  const pages: FlatPage[] = []

  function walk(nodes: NavNode[]) {
    for (const node of nodes) {
      if (node.type === "page") {
        pages.push({
          slug: node.slug,
          title: node.title,
          order: node.order,
          icon: node.icon,
          description: node.description,
        })
      } else {
        walk(node.children)
      }
    }
  }

  walk(getNavigation(projectId))
  return pages
}

export function findPageBySlug(
  slug: string[],
  projectId?: string,
): FlatPage | undefined {
  return getAllPages(projectId).find(
    (p) => p.slug.join("/") === slug.join("/"),
  )
}

export function getPrevNext(
  slug: string[],
  projectId?: string,
): {
  prev: FlatPage | null
  next: FlatPage | null
} {
  const pages = getAllPages(projectId)
  const index = pages.findIndex((p) => p.slug.join("/") === slug.join("/"))
  return {
    prev: index > 0 ? pages[index - 1] : null,
    next: index < pages.length - 1 ? pages[index + 1] : null,
  }
}

function findBreadcrumbPath(
  nodes: NavNode[],
  targetSlug: string[],
  treeDepth: number = 0,
): { title: string; slug: string[] }[] | null {
  for (const node of nodes) {
    if (node.type === "page") {
      if (node.slug.join("/") === targetSlug.join("/")) {
        return [{ title: node.title, slug: node.slug }]
      }
    } else {
      const result = findBreadcrumbPath(
        node.children,
        targetSlug,
        treeDepth + 1,
      )
      if (result) {
        const groupSlug = targetSlug.slice(0, treeDepth + 1)
        return [{ title: node.title, slug: groupSlug }, ...result]
      }
    }
  }
  return null
}

export function getBreadcrumb(
  slug: string[],
  projectId?: string,
): { title: string; slug: string[] }[] {
  if (slug.length === 0) {
    const page = findPageBySlug([], projectId)
    return page ? [{ title: page.title, slug: [] }] : []
  }

  const path = findBreadcrumbPath(getNavigation(projectId), slug)
  return path ?? []
}
