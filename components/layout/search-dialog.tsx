"use client"

import { useState, useEffect, useCallback, useRef } from "react"
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
import { searchInDocs, type SearchResult } from "@/lib/search"
import type { SearchDoc } from "@/lib/search-data"

export function SearchDialog({ docs }: { docs: SearchDoc[] }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const router = useRouter()
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

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

  const handleSearch = useCallback((value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (value.trim()) {
        setResults(searchInDocs(value.trim(), docs))
      } else {
        setResults([])
      }
    }, 150)
  }, [docs])

  function handleSelect(slug: string[]) {
    setOpen(false)
    setQuery("")
    setResults([])
    router.push(`/docs/${slug.join("/")}`)
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
        <CommandInput
          placeholder="搜索文档..."
          value={query}
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>未找到结果</CommandEmpty>
          {results.length > 0 && (
            <CommandGroup heading="文档">
              {results.map((result) => (
                <CommandItem
                  key={result.slug.join("/")}
                  onSelect={() => handleSelect(result.slug)}
                  className="flex flex-col items-start gap-0.5"
                >
                  <span className="text-sm font-medium">{result.title}</span>
                  {result.description && (
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {result.description}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
