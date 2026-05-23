import fs from "fs"
import path from "path"

export function findContentFile(baseDir: string, slug: string[]): string | null {
  const candidates = [
    path.join(baseDir, ...slug) + ".md",
    path.join(baseDir, ...slug) + ".mdx",
    path.join(baseDir, ...slug, "index.md"),
    path.join(baseDir, ...slug, "index.mdx"),
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate
  }

  return null
}
