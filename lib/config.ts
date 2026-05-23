export type ProjectConfig = {
  id: string
  name: string
  icon?: string
  description?: string
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  author: string
  defaultProject: string
  projects: ProjectConfig[]
  logo: {
    text: string
    light?: string
    dark?: string
  }
  footer: {
    copyright: string
    links: { label: string; href: string }[]
    poweredBy: boolean
  }
  links: {
    github?: string
  }
}
