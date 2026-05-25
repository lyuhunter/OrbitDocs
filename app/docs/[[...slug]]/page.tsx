import fs from "fs"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getMDXContent } from "@/lib/mdx"
import { findPageBySlug, getAllPages, getBreadcrumb, getPrevNext } from "@/lib/navigation"
import { getSiteConfig } from "@/lib/config.server"
import { resolveProject } from "@/lib/project"
import { getContentDir } from "@/lib/project.server"
import { findContentFile } from "@/lib/content"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Icon } from "@/lib/icon"

interface Props {
  params: Promise<{ slug?: string[] }>
  searchParams?: Promise<Record<string, string>>
}

export function generateStaticParams() {
  if (process.env.EXPORT !== "true") return []

  const cfg = getSiteConfig()
  const params: { slug?: string[] }[] = [{ slug: [] }]

  for (const project of cfg.projects) {
    params.push({ slug: [project.id] })
    const pages = getAllPages(project.id)
    for (const page of pages) {
      if (page.slug.length === 0) continue
      params.push({ slug: [project.id, ...page.slug] })
    }
  }

  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug ?? []
  const cfg = getSiteConfig()
  const { projectId, pageSlug } = resolveProject(slug, cfg.projects, cfg.defaultProject)
  const page = findPageBySlug(pageSlug, projectId)
  const project = cfg.projects.find((p) => p.id === projectId)
  const canonical = slug.length > 0
    ? `${cfg.url}/docs/${slug.join("/")}`
    : `${cfg.url}/docs`
  return {
    title: page?.title ?? project?.name ?? "Not Found",
    description: page?.description ?? cfg.description,
    alternates: { canonical },
  }
}

function ProjectLanding() {
  const cfg = getSiteConfig()
  const projects = cfg.projects

  return (
    <div className="min-h-screen">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-2">
        {cfg.name}
      </h1>
      <p className="text-lg text-muted-foreground mb-12">
        {cfg.description}
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

export default async function DocsPage({ params, searchParams }: Props) {
  void searchParams
  const slug = (await params).slug ?? []
  const cfg = getSiteConfig()
  const { projectId, pageSlug } = resolveProject(slug, cfg.projects, cfg.defaultProject)

  const isLanding = slug.length === 0 && cfg.projects.length > 1

  if (isLanding) {
    return <ProjectLanding />
  }

  const result = await getMDXContent(pageSlug, projectId)

  if (!result) {
    notFound()
  }

  const { content } = result
  const { prev, next } = getPrevNext(pageSlug, projectId)
  const contentDir = getContentDir(projectId)
  const breadcrumbItems = getBreadcrumb(pageSlug, projectId).map((item) => {
    const hasContent = findContentFile(contentDir, item.slug) !== null
    return { ...item, hasContent }
  })
  const filePath = findContentFile(contentDir, pageSlug)
  const lastModified = filePath
    ? new Date(fs.statSync(filePath).mtime).toLocaleDateString("zh-CN")
    : null
  const githubEditUrl = filePath
    ? `${cfg.links.github}/blob/main/${filePath.replace(process.cwd() + "/", "")}`
    : null

  return (
    <article className="min-h-screen">
      <Breadcrumb items={breadcrumbItems} projectId={projectId} />
      <div className="prose-custom">{content}</div>
      {(lastModified || githubEditUrl) && (
        <div className="flex items-center justify-between mt-12 text-xs text-muted-foreground">
          {lastModified && <span>最后更新：{lastModified}</span>}
          {githubEditUrl && (
            <a href={githubEditUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              编辑此页
            </a>
          )}
        </div>
      )}
      <div className="flex items-center justify-between mt-16 pt-8 border-t">
        {prev ? (
          <Link
            href={`/docs/${projectId}/${prev.slug.join("/")}`}
            className="flex flex-col gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs">← 上一篇</span>
            <span className="font-medium">{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/docs/${projectId}/${next.slug.join("/")}`}
            className="flex flex-col gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
          >
            <span className="text-xs">下一篇 →</span>
            <span className="font-medium">{next.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  )
}
