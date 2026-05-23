"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import type { SearchDoc } from "@/lib/search-data"

export function SearchDialog({ docs, projectNames }: { docs: SearchDoc[]; projectNames: Record<string, string> }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        const active = document.activeElement
        if (active?.tagName !== "INPUT" && active?.tagName !== "TEXTAREA") {
          e.preventDefault()
          setOpen(true)
        }
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  function handleSelect(slug: string[], projectId?: string) {
    setOpen(false)
    const base = projectId ?? "docs"
    router.push(`/docs/${base}/${slug.join("/")}`)
  }

  const grouped = new Map<string, SearchDoc[]>()
  for (const doc of docs) {
    const pid = doc.projectId ?? "docs"
    if (!grouped.has(pid)) grouped.set(pid, [])
    grouped.get(pid)!.push(doc)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:inline-flex items-center gap-2 h-8 px-3 rounded-md border text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden md:inline">搜索文档...</span>
        <span className="ml-auto text-xs text-muted-foreground">⌘K</span>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="搜索文档..." />
        <CommandList>
          <CommandEmpty>未找到结果</CommandEmpty>
          {Array.from(grouped.entries()).map(([pid, pDocs]) => (
            <CommandGroup key={pid} heading={projectNames[pid] ?? pid}>
              {pDocs.map((doc) => (
                <CommandItem
                  key={doc.id}
                  value={`${doc.title} ${doc.description}`}
                  onSelect={() => handleSelect(doc.slug, doc.projectId)}
                  className="flex flex-col items-start gap-0.5"
                >
                  <span className="text-sm font-medium">{doc.title}</span>
                  {doc.description && (
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {doc.description}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
