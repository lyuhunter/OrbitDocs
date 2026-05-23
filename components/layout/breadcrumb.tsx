import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { getBreadcrumb } from "@/lib/navigation"

export async function Breadcrumb({
  slug,
  projectId,
}: {
  slug: string[]
  projectId?: string
}) {
  const items = getBreadcrumb(slug, projectId)

  if (items.length === 0) return null

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        const href =
          projectId && item.slug.length > 0
            ? `/docs/${projectId}/${item.slug.join("/")}`
            : projectId
              ? `/docs/${projectId}`
              : `/docs/${item.slug.join("/")}`
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3" />}
            {isLast ? (
              <span className="text-foreground font-medium">{item.title}</span>
            ) : (
              <Link
                href={href}
                className="hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
