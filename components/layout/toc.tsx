"use client"

import { useEffect, useState, useCallback } from "react"
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

  const updateFromHash = useCallback(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) setActiveId(id)
  }, [])

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let mounted = true

    const raf = requestAnimationFrame(() => {
      if (!mounted) return

      const elements = Array.from(
        document.querySelectorAll("main h2, main h3")
      ).map((el) => ({
        id: el.id || "",
        text: (el as HTMLElement).innerText,
        level: el.tagName === "H2" ? 2 : 3,
      }))
      setHeadings(elements)
      updateFromHash()

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id)
              history.replaceState(null, "", `#${entry.target.id}`)
            }
          }
        },
        { rootMargin: "-80px 0px -80% 0px" }
      )

      for (const el of elements) {
        const target = document.getElementById(el.id)
        if (target) observer.observe(target)
      }

      window.addEventListener("hashchange", updateFromHash)
    })

    return () => {
      mounted = false
      cancelAnimationFrame(raf)
      observer?.disconnect()
      window.removeEventListener("hashchange", updateFromHash)
    }
  }, [pathname, updateFromHash])

  if (headings.length === 0) return null

  return (
    <aside className="w-56 shrink-0 hidden xl:block">
      <div className="sticky top-20 pl-8 border-l">
        <div className="text-sm font-semibold text-muted-foreground mb-3">
          目录
        </div>
        <nav className="space-y-1">
          {headings.map((h, i) => (
            <a
              key={h.id || `h-${i}`}
              href={`#${h.id}`}
              onClick={() => setActiveId(h.id)}
              data-active={h.id === activeId}
              className="block text-sm text-muted-foreground pl-3 hover:text-foreground transition-colors data-[active=true]:text-foreground data-[active=true]:font-medium data-[active=true]:border-l-2 data-[active=true]:border-primary"
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
