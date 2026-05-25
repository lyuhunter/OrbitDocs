import fs from "fs"
import path from "path"
import process from "process"
import toml from "toml"
import type { SiteConfig } from "./config"
import { getContentProjects } from "./project.server"

const siteDefaults = {
  name: "OrbitDocs",
  description: "类 MkDocs 静态文档站点生成器",
  url: "https://orbitdocs.dev",
  author: "lyuhunter",
}

const logoDefaults = { text: "OrbitDocs" }

const footerDefaults = {
  copyright: "© {year} lyuhunter",
  poweredBy: true,
  links: [{ label: "GitHub", href: "https://github.com/lyuhunter/OrbitDocs" }],
}

const linksDefaults = { github: "https://github.com/lyuhunter/OrbitDocs" }

type RawLink = { label?: string; href?: string }

function parseAndMerge(raw: string): Pick<SiteConfig, "name" | "description" | "url" | "author" | "defaultProject" | "logo" | "footer" | "links"> {
  const parsed = toml.parse(raw) as Record<string, unknown>
  const site = (parsed.site as Record<string, unknown>) ?? {}
  const logo = (parsed.logo as Record<string, unknown>) ?? {}
  const footer = (parsed.footer as Record<string, unknown>) ?? {}
  const rawLinks = (footer.link as RawLink[] | undefined) ?? []
  const links = (parsed.links as Record<string, unknown>) ?? {}

  const copyright = (footer.copyright as string) ?? footerDefaults.copyright
  const resolvedCopyright = copyright.replace(
    "{year}",
    String(new Date().getFullYear()),
  )

  return {
    name: (site.name as string) ?? siteDefaults.name,
    description: (site.description as string) ?? siteDefaults.description,
    url: (site.url as string) ?? siteDefaults.url,
    author: (site.author as string) ?? siteDefaults.author,
    defaultProject: (site.defaultProject as string) ?? "",
    logo: {
      text: (logo.text as string) ?? logoDefaults.text,
      light: logo.light as string | undefined,
      dark: logo.dark as string | undefined,
    },
    footer: {
      copyright: resolvedCopyright,
      links: rawLinks.map((l) => ({
        label: l.label ?? "",
        href: l.href ?? "",
      })),
      poweredBy: (footer.poweredBy as boolean) ?? footerDefaults.poweredBy,
    },
    links: {
      github: (links.github as string) ?? linksDefaults.github,
    },
  }
}

export const siteConfig: SiteConfig = (() => {
  const configPath = path.join(process.cwd(), "config.toml")

  let defaultProject = ""
  let partial: ReturnType<typeof parseAndMerge> | null = null
  try {
    const raw = fs.readFileSync(configPath, "utf-8")
    partial = parseAndMerge(raw)
    defaultProject = partial.defaultProject
  } catch {
    // no config.toml — use defaults
  }

  let projects = getContentProjects()
  if (projects.length === 0) {
    projects = [{ id: "docs", name: "Docs" }]
  }
  if (!defaultProject) {
    defaultProject = projects[0].id
  }

  return {
    name: partial?.name ?? siteDefaults.name,
    description: partial?.description ?? siteDefaults.description,
    url: partial?.url ?? siteDefaults.url,
    author: partial?.author ?? siteDefaults.author,
    defaultProject,
    projects,
    logo: partial?.logo ?? logoDefaults,
    footer: partial?.footer ?? footerDefaults,
    links: partial?.links ?? linksDefaults,
  }
})()
