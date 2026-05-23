export type ProjectConfig = {
  id: string
  name: string
  icon?: string
  description?: string
}

export const siteConfig = {
  name: "OrbitDocs",
  description: "类 MkDocs 静态文档站点生成器",
  url: "https://orbitdocs.dev",
  author: "lyuhunter",

  defaultProject: "docs",

  projects: [
    {
      id: "docs",
      name: "OrbitDocs",
      icon: "fa-book",
      description: "项目文档中心 — 技术栈、配置指南与最佳实践",
    },
    {
      id: "api",
      name: "API Reference",
      icon: "fa-code",
      description: "REST API 接口文档 — 认证、端点与示例",
    },
  ] satisfies ProjectConfig[],

  logo: {
    text: "OrbitDocs",
    light: undefined as string | undefined,
    dark: undefined as string | undefined,
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} ${"lyuhunter"}`,
    links: [
      { label: "GitHub", href: "https://github.com/lyuhunter/OrbitDocs" },
    ],
    poweredBy: true,
  },

  links: {
    github: "https://github.com/lyuhunter/OrbitDocs",
  },
}

export type SiteConfig = typeof siteConfig
