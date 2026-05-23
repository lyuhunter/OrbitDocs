"use client"

import { useParams } from "next/navigation"
import { resolveProject } from "@/lib/project"
import { DocsSidebar } from "./sidebar"
import type { NavNode } from "@/lib/navigation"

export function DocsShell({ navs }: { navs: Record<string, NavNode[]> }) {
  const params = useParams()
  const slug = (params.slug as string[]) ?? []
  const { projectId } = resolveProject(slug)
  const nav = navs[projectId] ?? []

  return (
    <aside className="hidden lg:block sticky top-14 self-start h-[calc(100vh-3.5rem)] border-r">
      <DocsSidebar nav={nav} projectId={projectId} />
    </aside>
  )
}
