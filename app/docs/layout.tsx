import type { ReactNode } from "react"
import { getNavigation } from "@/lib/navigation"
import { DocsSidebar } from "./sidebar"

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  const nav = getNavigation()

  return (
    <div className="flex">
      <aside className="hidden lg:block">
        <DocsSidebar nav={nav} />
      </aside>
      <main className="flex-1 min-w-0 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
