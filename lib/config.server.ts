import fs from "fs"
import path from "path"
import process from "process"
import toml from "toml"
import type { SiteConfig } from "./config"

const defaults: SiteConfig = {
  name: "OrbitDocs",
  description: "类 MkDocs 静态文档站点生成器",
  url: "https://orbitdocs.dev",
  author: "lyuhunter",
  defaultProject: "docs",
  projects: [
    { id: "docs", name: "OrbitDocs", icon: "fa-book", description: "项目文档中心" },
  ],
  logo: { text: "OrbitDocs" },
  footer: {
    copyright: "© {year} lyuhunter",
    links: [{ label: "GitHub", href: "https://github.com/lyuhunter/OrbitDocs" }],
    poweredBy: true,
  },
  links: { github: "https://github.com/lyuhunter/OrbitDocs" },
}

type RawLink = { label?: string; href?: string }
type RawProject = { id?: string; name?: string; icon?: string; description?: string }

function parseAndMerge(raw: string): SiteConfig {
  const parsed = toml.parse(raw) as Record<string, unknown>

  const site = (parsed.site as Record<string, unknown>) ?? {}
  const logo = (parsed.logo as Record<string, unknown>) ?? {}
  const footer = (parsed.footer as Record<string, unknown>) ?? {}
  const rawLinks = (footer.link as RawLink[] | undefined) ?? []
  const links = (parsed.links as Record<string, unknown>) ?? {}
  const rawProjects = (parsed.project as RawProject[] | undefined) ?? []

  const copyright = (footer.copyright as string) ?? defaults.footer.copyright
  const resolvedCopyright = copyright.replace(
    "{year}",
    String(new Date().getFullYear()),
  )

  return {
    name: (site.name as string) ?? defaults.name,
    description: (site.description as string) ?? defaults.description,
    url: (site.url as string) ?? defaults.url,
    author: (site.author as string) ?? defaults.author,
    defaultProject: (site.defaultProject as string) ?? defaults.defaultProject,
    projects: rawProjects.length > 0
      ? rawProjects.map((p) => ({
          id: p.id ?? "",
          name: p.name ?? "",
          icon: p.icon,
          description: p.description,
        }))
      : defaults.projects,
    logo: {
      text: (logo.text as string) ?? defaults.logo.text,
      light: logo.light as string | undefined,
      dark: logo.dark as string | undefined,
    },
    footer: {
      copyright: resolvedCopyright,
      links: rawLinks.map((l) => ({
        label: l.label ?? "",
        href: l.href ?? "",
      })),
      poweredBy: (footer.poweredBy as boolean) ?? defaults.footer.poweredBy,
    },
    links: {
      github: (links.github as string) ?? defaults.links.github,
    },
  }
}

export const siteConfig: SiteConfig = (() => {
  const configPath = path.join(process.cwd(), "config.toml")
  try {
    const raw = fs.readFileSync(configPath, "utf-8")
    return parseAndMerge(raw)
  } catch {
    return defaults
  }
})()
