"use client"

import { Sidebar } from "@/components/layout/sidebar"
import type { NavNode } from "@/lib/navigation"

export function DocsSidebar({
  nav,
  projectId,
}: {
  nav: NavNode[]
  projectId?: string
}) {
  return <Sidebar nav={nav} projectId={projectId} />
}
