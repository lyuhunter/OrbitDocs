import type { ReactNode } from "react"

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </div>
  )
}
