"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

type Heading = {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const pathname = usePathname()

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    const raf = requestAnimationFrame(() => {
      const elements = Array.from(
        document.querySelectorAll("h2, h3")
      ).map((el) => ({
        id: el.id || "",
        text: (el as HTMLElement).innerText,
        level: el.tagName === "H2" ? 2 : 3,
      }))
      setHeadings(elements)
      setActiveId("")

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id)
            }
          }
        },
        { rootMargin: "-80px 0px -80% 0px" }
      )

      for (const el of elements) {
        const target = document.getElementById(el.id)
        if (target) observer.observe(target)
      }
    })

    return () => {
      cancelAnimationFrame(raf)
      observer?.disconnect()
    }
  }, [pathname])

  if (headings.length === 0) return null

  return (
    <aside className="w-56 shrink-0 hidden xl:block">
      <div className="sticky top-20 pl-8 border-l">
        <div className="text-sm font-semibold text-muted-foreground mb-3">
          目录
        </div>
        <nav className="space-y-1">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              data-active={h.id === activeId}
              className="block text-sm text-muted-foreground border-l-2 border-transparent pl-3 hover:text-foreground transition-colors data-[active=true]:border-primary data-[active=true]:text-foreground data-[active=true]:font-medium"
              style={{ paddingLeft: h.level === 3 ? "24px" : "12px" }}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
