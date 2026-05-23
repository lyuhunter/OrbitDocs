import fs from "fs"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import { useMDXComponents } from "@/components/mdx/mdx-components"
import { getContentDir } from "./project.server"
import { findContentFile } from "./content"

export type MDXFrontmatter = {
  title: string
  description?: string
  order?: number
  icon?: string
}

const prettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: true,
}

export async function getMDXContent(
  slug: string[],
  projectId?: string,
): Promise<{
  content: React.ReactElement
  frontmatter: MDXFrontmatter
} | null> {
  const baseDir = projectId
    ? getContentDir(projectId)
    : getContentDir("docs")
  const filePath = findContentFile(baseDir, slug)
  if (!filePath) return null

  const source = fs.readFileSync(filePath, "utf-8")

  const { content, frontmatter } = await compileMDX<MDXFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
      },
    },
    components: useMDXComponents() as MDXRemoteProps["components"],
  })

  return { content, frontmatter }
}
