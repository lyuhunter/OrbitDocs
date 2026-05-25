import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { getSiteConfig } from "@/lib/config.server"
import { getSearchData } from "@/lib/search-data"
import { getNavigation } from "@/lib/navigation"
import { ThemeScript } from "@/lib/theme"

const basePath = process.env.EXPORT === "true" && process.env.REPO_NAME
  ? `/${process.env.REPO_NAME}`
  : ""

export function generateMetadata(): Metadata {
  const cfg = getSiteConfig()
  return {
    title: {
      default: cfg.name,
      template: `%s | ${cfg.name}`,
    },
    description: cfg.description,
    icons: {
      icon: [
        { url: `${basePath}/favicon.svg`, media: "(prefers-color-scheme: light)" },
        { url: `${basePath}/favicon-dark.svg`, media: "(prefers-color-scheme: dark)" },
      ],
    },
    openGraph: {
      title: cfg.name,
      description: cfg.description,
      type: "website",
      locale: "zh_CN",
      siteName: cfg.name,
      url: cfg.url,
    },
    twitter: {
      card: "summary_large_image",
      title: cfg.name,
      description: cfg.description,
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cfg = getSiteConfig()
  const searchDocs = getSearchData()

  const navs: Record<string, ReturnType<typeof getNavigation>> = {}
  for (const project of cfg.projects) {
    navs[project.id] = getNavigation(project.id)
  }

  const projectNames = Object.fromEntries(
    cfg.projects.map((p) => [p.id, p.name]),
  )

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-background font-sans antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg">
          跳转到主要内容
        </a>
        <Navbar basePath={basePath} searchDocs={searchDocs} navs={navs} siteConfig={cfg} projectNames={projectNames} />
        {children}
      </body>
    </html>
  )
}
