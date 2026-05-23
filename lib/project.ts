import path from "path"
import process from "process"
import { siteConfig } from "./config"

export function getProject(id: string) {
  return siteConfig.projects.find((p) => p.id === id)
}

export function resolveProject(
  slug: string[],
): { projectId: string; pageSlug: string[] } {
  if (slug.length > 0 && siteConfig.projects.some((p) => p.id === slug[0])) {
    return { projectId: slug[0], pageSlug: slug.slice(1) }
  }
  return { projectId: siteConfig.defaultProject!, pageSlug: slug }
}

export function getContentDir(projectId: string): string {
  return path.join(process.cwd(), "content", projectId)
}
