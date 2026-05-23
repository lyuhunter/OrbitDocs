import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { getSearchData } from "@/lib/search-data"

export const metadata: Metadata = {
  title: "OrbitDocs",
  description: "类 MkDocs 静态文档站点生成器",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const searchDocs = getSearchData()

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Navbar searchDocs={searchDocs} />
        {children}
      </body>
    </html>
  )
}
