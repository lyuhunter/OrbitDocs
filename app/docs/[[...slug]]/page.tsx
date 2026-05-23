import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getMDXContent } from "@/lib/mdx"
import { findPageBySlug, getPrevNext } from "@/lib/navigation"
import { siteConfig } from "@/lib/config"
import { resolveProject, getProject } from "@/lib/project"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Icon } from "@/lib/icon"

interface Props {
  params: Promise<{ slug?: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params
  const { projectId, pageSlug } = resolveProject(slug)
  const page = findPageBySlug(pageSlug, projectId)
  const project = getProject(projectId)
  return {
    title: page?.title ?? project?.name ?? "Not Found",
    description: page?.description ?? siteConfig.description,
  }
}

function ProjectLanding() {
  const projects = siteConfig.projects

  return (
    <div className="min-h-screen">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-2">
        {siteConfig.name}
      </h1>
      <p className="text-lg text-muted-foreground mb-12">
        {siteConfig.description}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/docs/${project.id}`}
            className="flex items-start gap-4 rounded-lg border p-5 hover:border-primary hover:bg-accent transition-colors"
          >
            {project.icon && (
              <Icon
                name={project.icon}
                className="h-6 w-6 text-muted-foreground shrink-0 mt-0.5"
              />
            )}
            <div>
              <h2 className="font-semibold text-base">{project.name}</h2>
              {project.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {project.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default async function DocsPage({ params }: Props) {
  const { slug = [] } = await params
  const { projectId, pageSlug } = resolveProject(slug)

  const isLanding = slug.length === 0 && siteConfig.projects.length > 1

  if (isLanding) {
    return <ProjectLanding />
  }

  const result = await getMDXContent(pageSlug, projectId)

  if (!result) {
    notFound()
  }

  const { content } = result
  const page = findPageBySlug(pageSlug, projectId)
  const { prev, next } = getPrevNext(pageSlug, projectId)

  return (
    <article className="min-h-screen">
      <Breadcrumb slug={pageSlug} projectId={projectId} />
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
            href={`/docs/${projectId}/${prev.slug.join("/")}`}
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
            href={`/docs/${projectId}/${next.slug.join("/")}`}
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
