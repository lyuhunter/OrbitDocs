"use client"

import { useParams } from "next/navigation"
import { resolveProject } from "@/lib/project"
import { Sidebar } from "@/components/layout/sidebar"
import type { NavNode } from "@/lib/navigation"
import type { ProjectConfig } from "@/lib/config"

export function DocsShell({
  navs,
  projects,
  defaultProject,
}: {
  navs: Record<string, NavNode[]>
  projects: ProjectConfig[]
  defaultProject: string
}) {
  const params = useParams()
  const slug = (params.slug as string[]) ?? []
  const { projectId } = resolveProject(slug, projects, defaultProject)
  const nav = navs[projectId] ?? []

  return (
    <aside className="hidden lg:block sticky top-14 self-start h-[calc(100vh-3.5rem)] border-r">
      <Sidebar nav={nav} projectId={projectId} />
    </aside>
  )
}
