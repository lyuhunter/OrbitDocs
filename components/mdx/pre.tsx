"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"

export function Pre({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false)
  const codeEl = children as React.ReactElement<{ children?: string; filename?: string }>
  const code = codeEl?.props?.children

  function handleCopy() {
    navigator.clipboard.writeText(String(code ?? "").replace(/\n$/, ""))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border bg-muted/50">
      <div className="flex items-center justify-between px-4 py-1.5 text-xs text-muted-foreground border-b bg-muted/30">
        <span>
          {(codeEl?.props as Record<string, unknown>)?.filename as string}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground"
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
      <pre {...props} className="p-4 overflow-x-auto">
        {children}
      </pre>
    </div>
  )
}
