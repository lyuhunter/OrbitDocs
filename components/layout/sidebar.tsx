"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import type { NavNode } from "@/lib/navigation"

export function Sidebar({
  nav,
  onNavClick,
}: {
  nav?: NavNode[]
  onNavClick?: () => void
}) {
  const pathname = usePathname()

  if (!nav) return null

  return (
    <nav className="w-64 h-[calc(100vh-3.5rem)] overflow-y-auto border-r py-4 px-2">
      <div className="space-y-1">
        {nav.map((node, i) => (
          <NavTreeNode
            key={i}
            node={node}
            pathname={pathname}
            onNavClick={onNavClick}
          />
        ))}
      </div>
    </nav>
  )
}

function NavTreeNode({
  node,
  pathname,
  onNavClick,
  depth = 0,
}: {
  node: NavNode
  pathname: string
  onNavClick?: () => void
  depth?: number
}) {
  if (node.type === "page") {
    const href = `/docs/${node.slug.join("/")}`
    const active = pathname === href

    return (
      <Link
        href={href}
        onClick={onNavClick}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors",
          active
            ? "bg-accent text-accent-foreground font-medium"
            : "text-foreground hover:bg-accent hover:text-accent-foreground"
        )}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        {node.icon && (
          <span className="text-muted-foreground text-xs">{node.icon}</span>
        )}
        <span className="truncate">{node.title}</span>
      </Link>
    )
  }

  return (
    <Collapsible defaultOpen={!node.collapsed}>
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center gap-2 px-3 py-1.5 text-sm font-semibold text-muted-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
        )}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        <ChevronRight className="h-3 w-3 shrink-0 transition-transform [[data-state=open]>&]:rotate-90" />
        {node.icon && <span className="text-xs">{node.icon}</span>}
        <span>{node.title}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-0.5 space-y-0.5">
          {node.children.map((child, i) => (
            <NavTreeNode
              key={i}
              node={child}
              pathname={pathname}
              onNavClick={onNavClick}
              depth={depth + 1}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
