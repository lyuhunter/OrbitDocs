"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { usePathname } from "next/navigation"

type Heading = {
  id: string
  text: string
  level: number
}

function extractHeadings(): Heading[] {
  return Array.from(document.querySelectorAll("main h2, main h3")).map(
    (el) => ({
      id: el.id || "",
      text: (el as HTMLElement).innerText,
      level: el.tagName === "H2" ? 2 : 3,
    }),
  )
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const activeRef = useRef("")
  const pathname = usePathname()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const mutationRef = useRef<MutationObserver | null>(null)
  const moTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const updateFromHash = useCallback(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) {
      activeRef.current = id
      setActiveId(id)
    }
  }, [])

  useEffect(() => {
    let mounted = true

    const setupIntersectionObserver = (els: Heading[]) => {
      observerRef.current?.disconnect()
      if (els.length === 0) return

      observerRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (
              entry.isIntersecting &&
              entry.target.id !== activeRef.current
            ) {
              activeRef.current = entry.target.id
              setActiveId(entry.target.id)
              history.replaceState(null, "", `#${entry.target.id}`)
            }
          }
        },
        { rootMargin: "-80px 0px -80% 0px" },
      )

      for (const el of els) {
        const target = document.getElementById(el.id)
        if (target) observerRef.current.observe(target)
      }
    }

    const queryHeadings = () => {
      if (!mounted) return
      const els = extractHeadings()
      setHeadings((prev) => {
        if (
          prev.length === els.length &&
          prev.every((h, i) => h.id === els[i].id && h.text === els[i].text)
        ) {
          return prev
        }
        return els
      })
      setupIntersectionObserver(els)
    }

    const onMutate = () => {
      if (moTimer.current) clearTimeout(moTimer.current)
      moTimer.current = setTimeout(queryHeadings, 80)
    }

    const main = document.querySelector("main")
    if (main) {
      mutationRef.current = new MutationObserver(onMutate)
      mutationRef.current.observe(main, { childList: true, subtree: true })
    }

    queryHeadings()
    updateFromHash()
    window.addEventListener("hashchange", updateFromHash)

    return () => {
      mounted = false
      if (moTimer.current) clearTimeout(moTimer.current)
      mutationRef.current?.disconnect()
      observerRef.current?.disconnect()
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
              onClick={() => {
                activeRef.current = h.id
                setActiveId(h.id)
              }}
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
