import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { siteConfig } from "@/lib/config.server"
import { getSearchData } from "@/lib/search-data"
import { getNavigation } from "@/lib/navigation"
import { ThemeScript } from "@/lib/theme"

const basePath = process.env.EXPORT === "true" && process.env.REPO_NAME
  ? `/${process.env.REPO_NAME}`
  : ""

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: `${basePath}/favicon.svg`,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "zh_CN",
    siteName: siteConfig.name,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const searchDocs = getSearchData()

  const navs: Record<string, ReturnType<typeof getNavigation>> = {}
  for (const project of siteConfig.projects) {
    navs[project.id] = getNavigation(project.id)
  }

  const projectNames = Object.fromEntries(
    siteConfig.projects.map((p) => [p.id, p.name]),
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
        <Navbar basePath={basePath} searchDocs={searchDocs} navs={navs} siteConfig={siteConfig} projectNames={projectNames} />
        {children}
      </body>
    </html>
  )
}
