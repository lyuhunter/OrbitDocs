---
title: Navigation API
order: 1
description: 导航系统的核心 API 参考
---

# Navigation API

导航系统是 OrbitDocs 的核心模块，负责扫描文件系统、构建导航树、提供查询接口。

所有导航函数接收可选的 `projectId` 参数以支持多项目。不传参时扫描默认项目目录。

## 类型定义

### NavNode

```typescript title="lib/navigation.ts"
type NavPage = {
  type: "page"
  slug: string[]
  title: string
  order: number
  icon?: string
  description?: string
}

type NavGroup = {
  type: "group"
  title: string
  order: number
  icon?: string
  collapsed: boolean
  children: NavNode[]
}

type NavNode = NavPage | NavGroup
```

### FlatPage

```typescript
type FlatPage = {
  slug: string[]
  title: string
  order: number
  icon?: string
  description?: string
}
```

## 函数 API

### getNavigation(projectId?)

扫描项目目录，返回完整的导航树。

```typescript
function getNavigation(projectId?: string): NavNode[]
```

### getAllPages(projectId?)

将导航树展平为页面列表。

```typescript
function getAllPages(projectId?: string): FlatPage[]
```

### findPageBySlug(slug, projectId?)

根据 slug 查找页面。

```typescript
function findPageBySlug(slug: string[], projectId?: string): FlatPage | undefined
```

### getPrevNext(slug, projectId?)

获取上一篇/下一篇导航。

```typescript
function getPrevNext(slug: string[], projectId?: string): {
  prev: FlatPage | null
  next: FlatPage | null
}
```

### getBreadcrumb(slug, projectId?)

生成面包屑导航路径。

```typescript
function getBreadcrumb(slug: string[], projectId?: string): { title: string; slug: string[] }[]
```

### findContentFile(baseDir, slug)

在文件系统中查找 MDX 文件（`lib/content.ts`）。

```typescript
function findContentFile(baseDir: string, slug: string[]): string | null
```

按以下顺序尝试查找：
1. `{baseDir}/{slug}.md`
2. `{baseDir}/{slug}.mdx`
3. `{baseDir}/{slug}/index.md`
4. `{baseDir}/{slug}/index.mdx`

### generateStaticParams

在 `app/docs/[[...slug]]/page.tsx` 中导出，构建时预渲染所有页面：

```typescript
export function generateStaticParams() {
  // 遍历所有项目的所有页面
  // 为每篇文档生成对应的静态 HTML
  // 包含项目首页和项目选择页
  return params  // { slug?: string[] }[]
}
```

构建后路由从 `ƒ (Dynamic)` 变为 `● (SSG)`，首次访问无需等待。

## 导航树生成规则

1. 每个目录生成一个分组（可折叠）
2. `_category_.json` 控制分组的 `title` / `order` / `icon` / `collapsed`
3. 每个 `.md` 文件的 frontmatter 控制 `title` / `order` / `icon`
4. 按 `order` 升序排列，无 `order` 的按字母序排后
