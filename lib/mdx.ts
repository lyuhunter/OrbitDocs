import fs from "fs"
import path from "path"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import { useMDXComponents } from "@/components/mdx/mdx-components"

export type MDXFrontmatter = {
  title: string
  description?: string
  order?: number
  icon?: string
}

const contentDir = path.join(process.cwd(), "content")

const prettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: true,
}

export async function getMDXContent(
  slug: string[]
): Promise<{ content: React.ReactElement; frontmatter: MDXFrontmatter } | null> {
  const filePath = findContentFile(slug)
  if (!filePath) return null

  const source = fs.readFileSync(filePath, "utf-8")

  const { content, frontmatter } = await compileMDX<MDXFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
    components: useMDXComponents() as MDXRemoteProps["components"],
  })

  return { content, frontmatter }
}

function findContentFile(slug: string[]): string | null {
  const candidates = [
    path.join(contentDir, ...slug) + ".md",
    path.join(contentDir, ...slug) + ".mdx",
    path.join(contentDir, ...slug, "index.md"),
    path.join(contentDir, ...slug, "index.mdx"),
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate
  }

  return null
}
