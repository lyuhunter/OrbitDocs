import fs from "fs"
import path from "path"
import process from "process"
import type { ProjectConfig } from "./config"

export function getContentDir(projectId: string): string {
  return path.join(process.cwd(), "content", projectId)
}

function hasContent(dir: string): boolean {
  if (!fs.existsSync(dir)) return false
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isFile() && /\.mdx?$/.test(entry.name)) return true
    if (entry.isDirectory() && hasContent(path.join(dir, entry.name))) return true
  }
  return false
}

function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export function getContentProjects(): ProjectConfig[] {
  const contentDir = path.join(process.cwd(), "content")
  if (!fs.existsSync(contentDir)) return []

  const ids: string[] = []
  for (const entry of fs.readdirSync(contentDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    if (entry.name.startsWith(".")) continue
    if (!hasContent(path.join(contentDir, entry.name))) continue
    ids.push(entry.name)
  }

  ids.sort()

  const projects: ProjectConfig[] = []
  for (const id of ids) {
    const metaPath = path.join(contentDir, id, "_project_.json")
    let meta: { name?: string; order?: number; icon?: string; description?: string } | null = null
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"))
    } catch {
      // no _project_.json
    }
    projects.push({
      id,
      name: meta?.name ?? capitalize(id),
      order: meta?.order,
      icon: meta?.icon,
      description: meta?.description,
    })
  }

  projects.sort((a, b) => {
    const oa = a.order ?? Infinity
    const ob = b.order ?? Infinity
    if (oa !== ob) return oa - ob
    return a.name.localeCompare(b.name)
  })

  return projects
}
