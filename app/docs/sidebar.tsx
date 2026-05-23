"use client"

import { Sidebar } from "@/components/layout/sidebar"
import type { NavNode } from "@/lib/navigation"

export function DocsSidebar({ nav }: { nav: NavNode[] }) {
  return <Sidebar nav={nav} />
}
