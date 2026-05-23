import type { ReactNode } from "react"
import { getNavigation } from "@/lib/navigation"
import { DocsSidebar } from "./sidebar"
import { Footer } from "@/components/layout/footer"
import { BackToTop } from "@/components/layout/back-to-top"

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  const nav = getNavigation()

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:block sticky top-14 self-start h-[calc(100vh-3.5rem)] border-r">
        <DocsSidebar nav={nav} />
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>
        <Footer />
      </div>
      <BackToTop />
    </div>
  )
}
