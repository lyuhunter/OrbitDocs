"use client"

import Link from "next/link"

export default function DocsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-6xl font-bold text-destructive">500</h1>
      <p className="text-lg text-muted-foreground">
        页面加载出错
      </p>
      <p className="text-sm text-muted-foreground max-w-md">
        {error.message || "未知错误"}
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          重试
        </button>
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}
