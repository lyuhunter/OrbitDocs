import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { getBreadcrumb } from "@/lib/navigation"

export async function Breadcrumb({ slug }: { slug: string[] }) {
  const items = getBreadcrumb(slug)

  if (items.length === 0) return null

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3" />}
            {isLast ? (
              <span className="text-foreground font-medium">{item.title}</span>
            ) : (
              <Link
                href={`/docs/${item.slug.join("/")}`}
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
