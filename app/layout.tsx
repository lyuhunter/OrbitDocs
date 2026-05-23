import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { siteConfig } from "@/lib/config"
import { getSearchData } from "@/lib/search-data"
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

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-background font-sans antialiased">
        <Navbar searchDocs={searchDocs} />
        {children}
      </body>
    </html>
  )
}
