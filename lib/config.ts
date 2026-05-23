export const siteConfig = {
  name: "OrbitDocs",
  description: "类 MkDocs 静态文档站点生成器",
  url: "https://orbitdocs.dev",
  author: "lyuhunter",

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
