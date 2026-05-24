"use client"

import { Copy, Check } from "lucide-react"
import { useState, useRef, useEffect } from "react"

const langLabels: Record<string, string> = {
  js: "JavaScript",
  javascript: "JavaScript",
  ts: "TypeScript",
  typescript: "TypeScript",
  tsx: "TSX",
  jsx: "JSX",
  bash: "Bash",
  sh: "Shell",
  shell: "Shell",
  zsh: "Zsh",
  python: "Python",
  py: "Python",
  rust: "Rust",
  rs: "Rust",
  go: "Go",
  java: "Java",
  kotlin: "Kotlin",
  swift: "Swift",
  c: "C",
  cpp: "C++",
  csharp: "C#",
  css: "CSS",
  scss: "SCSS",
  html: "HTML",
  xml: "XML",
  yaml: "YAML",
  yml: "YAML",
  json: "JSON",
  md: "Markdown",
  markdown: "Markdown",
  sql: "SQL",
  graphql: "GraphQL",
  dockerfile: "Dockerfile",
  diff: "Diff",
  toml: "TOML",
  env: "ENV",
  ignore: "Ignore",
}

export function Pre({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const dataProps = props as Record<string, unknown>
  const title = dataProps["data-title"] as string | undefined
  const lang = dataProps["data-language"] as string | undefined
  const label = title ?? (lang ? langLabels[lang] ?? lang : "")

  useEffect(() => {
    if (copied) {
      timeoutRef.current = setTimeout(() => setCopied(false), 1500)
      return () => clearTimeout(timeoutRef.current)
    }
  }, [copied])

  function handleCopy() {
    const text = preRef.current?.textContent ?? ""
    navigator.clipboard.writeText(text.replace(/\n$/, "")).catch(() => {})
    setCopied(true)
  }

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border bg-muted/50">
      <div className="flex items-center justify-between px-4 py-1.5 text-xs text-muted-foreground border-b bg-muted/30">
        <span>{label}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              已复制
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              复制
            </>
          )}
        </button>
      </div>
      <pre ref={preRef} {...props} className="p-4 overflow-x-auto">
        {children}
      </pre>
    </div>
  )
}
