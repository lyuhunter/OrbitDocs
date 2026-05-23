# OrbitDocs 架构文档

## 架构概览

```
┌─────────────────────────────────────────────────────────┐
│                     Next.js 16 App Router                │
├──────────────┬──────────────────────────────────────────┤
│   Build Time │              Runtime                      │
├──────────────┼──────────────────────────────────────────┤
│  scan content/│  ├─ [[...slug]]/page.tsx → MDX hydrate  │
│  build nav    │  ├─ flexsearch index → search dialog     │
│  serialize MDX│  ├─ ThemeProvider (dark/light)           │
│  gen sitemap  │  └─ ServiceWorker (离线缓存)              │
└──────────────┴──────────────────────────────────────────┘
```

## 核心数据流

```
content/*.md
    │
    ▼ (build/request time)
lib/mdx.ts ──────── serialize with next-mdx-remote
    │                     │
    │                     ▼
lib/navigation.ts    docs/[[...slug]]/page.tsx
    │                     │
    ▼                     ▼
导航树 JSON ──────►   MDXContent hydrate
(injected via        + 自定义组件
layout context)         (pre, a, img,
                        admonition...)
    │
lib/search.ts
    │
    ▼
flexsearch index
(injected as JSON)
```

## 路由设计

| 路由 | 文件 | 说明 |
|------|------|------|
| `/` | `app/page.tsx` | 首页，重定向到 /docs |
| `/docs` | `app/docs/[[...slug]]/page.tsx` | slug=undefined → `content/index.md` |
| `/docs/[...slug]` | 同上 | slug=`['guide', 'getting-started']` → `content/guide/getting-started.md` |
| `/api/search` | `app/api/search/route.ts` | 返回搜索索引 JSON |

## 内容解析流程 (`lib/mdx.ts`)

```
content/{slug}.md
    │
    ▼ gray-matter 提取 frontmatter
    │ { title, order, icon, description, ... }
    │
    ▼ @mdx-js/mdx compile  (服务端)
    │ 插件链: remark-gfm → remark-frontmatter → rehype-slug → rehype-pretty-code
    │
    ▼ next-mdx-remote serialize
    │
    ▼ page.tsx hydrate → hydrate({ components: { pre, a, img, ... } })
```

## 导航树生成 (`lib/navigation.ts`)

```
filesystem scan (content/)
    │
    ▼ 递归遍历目录
    │  ├─ 目录 → group (读取 _category_.json)
    │  ├─ .md/.mdx → page (读取 frontmatter)
    │  └─ order 排序
    │
    ▼ NavNode[]
    │ type NavNode =
    │   | { type: 'page', slug: string[], title: string, order: number, icon?: string }
    │   | { type: 'group', title: string, icon?: string,
    │       collapsed: boolean, children: NavNode[] }
    │
    ▼ layout.tsx 读取 → 注入 Sidebar 组件
```

## Docker 部署

```yaml
# docker-compose.yml (开发)
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./content:/app/content    # 热重载文档
      - ./components:/app/components
      - ./lib:/app/lib
    command: pnpm dev

# Dockerfile (生产)
# 多阶段构建:
#   stage 1: pnpm build → .next
#   stage 2: nginx + out/ (静态导出) 或 next start (SSR)
```

## 依赖清单

```json
{
  "dependencies": {
    "next": "^16.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-mdx-remote": "^5.0.0",
    "@mdx-js/mdx": "^3.0.0",
    "gray-matter": "^4.0.0",
    "rehype-pretty-code": "^0.14.0",
    "rehype-slug": "^6.0.0",
    "remark-gfm": "^4.0.0",
    "remark-frontmatter": "^5.0.0",
    "shiki": "^1.0.0",
    "flexsearch": "^0.7.0",
    "@fortawesome/react-fontawesome": "^6.0.0",
    "@fortawesome/free-solid-svg-icons": "^6.0.0",
    "class-variance-authority": "^0.7.0",
    "tailwind-merge": "^2.0.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "tailwindcss": "^4.0.0",
    "next-mdx-remote-client": "..."
  }
}
```
