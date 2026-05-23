"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Moon, Sun } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { siteConfig } from "@/lib/config"
import type { SearchDoc } from "@/lib/search-data"
import { Sidebar } from "./sidebar"
import { SearchDialog } from "./search-dialog"
import { resolveTheme, applyTheme, setStoredTheme } from "@/lib/theme"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const iconButtonClass =
  "inline-flex items-center justify-center rounded-md text-sm font-medium h-8 w-8 hover:bg-accent hover:text-accent-foreground transition-colors"

export function Navbar({ searchDocs }: { searchDocs?: SearchDoc[] }) {
  const [open, setOpen] = useState(false)
  const { logo } = siteConfig

  return (
    <header className="sticky top-0 z-50 h-14 bg-background/80 backdrop-blur-sm border-b">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="lg:hidden inline-flex items-center justify-center rounded-md text-sm font-medium h-8 w-8 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar onNavClick={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <Link href="/docs" className="flex items-center gap-2 font-semibold">
            {logo.light ? (
              <>
                <Image
                  src={logo.light}
                  alt={siteConfig.name}
                  width={24}
                  height={24}
                  className="block dark:hidden"
                />
                <Image
                  src={logo.dark ?? logo.light}
                  alt={siteConfig.name}
                  width={24}
                  height={24}
                  className="hidden dark:block"
                />
              </>
            ) : (
              <span className="text-lg font-semibold">{logo.text}</span>
            )}
          </Link>
        </div>
        <div className="flex items-center gap-1">
          {searchDocs && <SearchDialog docs={searchDocs} />}
          <ThemeToggle />
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={iconButtonClass}
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  )
}

function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(resolveTheme() === "dark")
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    applyTheme(next ? "dark" : "light")
    setStoredTheme(next ? "dark" : "light")
  }

  return (
    <button
      className={iconButtonClass}
      onClick={toggle}
      aria-label="主题切换"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
