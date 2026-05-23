import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { siteConfig } from "@/lib/config.server"
import { getSearchData } from "@/lib/search-data"
import { getNavigation } from "@/lib/navigation"
import { ThemeScript } from "@/lib/theme"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
        <Navbar searchDocs={searchDocs} navs={navs} siteConfig={siteConfig} projectNames={projectNames} />
        {children}
      </body>
    </html>
  )
}
