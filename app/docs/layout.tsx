import type { ReactNode } from "react"
import { getNavigation } from "@/lib/navigation"
import { getSiteConfig } from "@/lib/config.server"
import type { NavNode } from "@/lib/navigation"
import { DocsShell } from "./shell"
import { Footer } from "@/components/layout/footer"
import { BackToTop } from "@/components/layout/back-to-top"
import { TableOfContents } from "@/components/layout/toc"

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  const cfg = getSiteConfig()
  const navs: Record<string, NavNode[]> = {}
  for (const project of cfg.projects) {
    navs[project.id] = getNavigation(project.id)
  }

  return (
    <div className="flex min-h-screen">
      <DocsShell navs={navs} projects={cfg.projects} defaultProject={cfg.defaultProject} />
      <div className="flex-1 min-w-0 flex flex-col">
        <main id="main-content" className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>
        <Footer />
      </div>
      <TableOfContents />
      <BackToTop />
    </div>
  )
}
