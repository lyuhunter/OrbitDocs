import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

type BreadcrumbItemData = {
  title: string
  slug: string[]
  hasContent: boolean
}

export function Breadcrumb({
  items,
  projectId,
}: {
  items: BreadcrumbItemData[]
  projectId?: string
}) {
  if (items.length === 0) return null

  const keyFor = (item: BreadcrumbItemData) =>
    item.slug.length === 0 ? "root" : item.slug.join("/")

  return (
    <BreadcrumbRoot className="mb-6">
      <BreadcrumbList>
        {items.flatMap((item, i) => {
          const isLast = i === items.length - 1
          const href =
            projectId && item.slug.length > 0
              ? `/docs/${projectId}/${item.slug.join("/")}`
              : projectId
                ? `/docs/${projectId}`
                : `/docs/${item.slug.join("/")}`

          const linkOrPage = isLast || !item.hasContent ? (
            <BreadcrumbPage>{item.title}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink render={<Link href={href} />}>
              {item.title}
            </BreadcrumbLink>
          )

          return [
            i > 0 ? (
              <BreadcrumbSeparator key={`sep-${keyFor(item)}`} />
            ) : null,
            <BreadcrumbItem key={keyFor(item)}>
              {linkOrPage}
            </BreadcrumbItem>,
          ].filter(Boolean)
        })}
      </BreadcrumbList>
    </BreadcrumbRoot>
  )
}
