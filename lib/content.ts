import fs from "fs"
import path from "path"

export function findContentFile(baseDir: string, slug: string[]): string | null {
  const decoded = slug.map((s) => {
    try { return decodeURIComponent(s) } catch { return s }
  })
  const candidates = [
    path.join(baseDir, ...decoded) + ".md",
    path.join(baseDir, ...decoded) + ".mdx",
    path.join(baseDir, ...decoded, "index.md"),
    path.join(baseDir, ...decoded, "index.mdx"),
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate
  }

  return null
}
