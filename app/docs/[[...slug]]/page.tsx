import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getMDXContent } from "@/lib/mdx"
import { findPageBySlug, getPrevNext, getBreadcrumb } from "@/lib/navigation"
import { siteConfig } from "@/lib/config"

interface Props {
  params: Promise<{ slug?: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params
  const page = findPageBySlug(slug)
  return {
    title: page?.title ?? "Not Found",
    description: page?.description ?? siteConfig.description,
  }
}

export default async function DocsPage({
  params,
}: Props) {
  const { slug = [] } = await params
  const result = await getMDXContent(slug)

  if (!result) {
    notFound()
  }

  const { content } = result
  const page = findPageBySlug(slug)
  const { prev, next } = getPrevNext(slug)
  const breadcrumb = getBreadcrumb(slug)

  return (
    <article className="min-h-screen">
      {page && (
        <>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-8">
            {page.title}
          </h1>
          {page.description && (
            <p className="text-lg text-muted-foreground mb-8">
              {page.description}
            </p>
          )}
        </>
      )}
      <div className="prose-custom">{content}</div>
      <div className="flex items-center justify-between mt-16 pt-8 border-t">
        {prev ? (
          <a
            href={`/docs/${prev.slug.join("/")}`}
            className="flex flex-col gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs">← 上一篇</span>
            <span className="font-medium">{prev.title}</span>
          </a>
        ) : (
          <div />
        )}
        {next ? (
          <a
            href={`/docs/${next.slug.join("/")}`}
            className="flex flex-col gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
          >
            <span className="text-xs">下一篇 →</span>
            <span className="font-medium">{next.title}</span>
          </a>
        ) : (
          <div />
        )}
      </div>
    </article>
  )
}
