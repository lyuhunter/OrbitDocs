---
title: OrbitDocs 文档
description: OrbitDocs 是一个基于 Next.js 16 的现代化文档站点框架，文件系统驱动，多项目支持
order: 0
icon: fa-house
---

# OrbitDocs 文档

欢迎使用 OrbitDocs！一个现代化、高性能的静态文档站点生成器。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.2.6 LTS | 框架 (App Router, Turbopack) |
| React | 19.2.4 | UI 运行时 |
| TypeScript | 5 | 类型安全 |
| Tailwind CSS | 4 | 原子化 CSS |
| shadcn/ui | 4.8 | 组件库 (@base-ui/react) |
| Lucide | latest | shadcn 内置图标 |
| FontAwesome | 7 | 导航/组件图标 (fa-xxx 命名) |
| next-mdx-remote | 6 | 运行时 MDX 编译 (RSC API) |
| rehype-pretty-code | 0.14.3 | 代码高亮 (Shiki, light/dark 双主题) |
| rehype-slug | 6 | 标题锚点 |
| remark-gfm | 4 | GFM 语法扩展 |
| shiki | 4.1.0 | 代码高亮引擎 |
| cmdk | 1.1.1 | 客户端搜索 (⌘K 弹窗) |
| unist-util-visit | 5 | 图片 basePath 预处理 |

## 核心特性

- **MDX 支持** — 在 Markdown 中嵌入 React 组件
- **全文搜索** — 基于 cmdk，⌘K 快捷键唤醒
- **响应式布局** — 桌面三栏到移动端单栏自适应
- **暗色模式** — light/dark 双模式，localStorage 持久化，零闪烁
- **多项目支持** — 同一站点承载多套文档，独立导航树和搜索索引
- **代码高亮** — rehype-pretty-code + Shiki，支持文件名标签、语言标签和复制按钮
- **图片支持** — 本地图片置于 `public/img/`，Markdown 语法引用，自动处理 basePath
- **TOC 导航** — 右侧文章目录，IntersectionObserver 滚动高亮
- **Docker 部署** — 开发/生产 Docker 配置，config.toml 运行时挂载
- **GitHub Pages 自动部署** — 推送 main 自动构建发布
- **SSG 预渲染** — generateStaticParams 构建时生成所有页面
- **语义化 CSS 变量** — OKLCH 色彩体系，完全可定制

## 快速开始

```bash
pnpm dev       # 开发 (Turbopack HMR)
pnpm build     # 构建 (standalone 模式，适用于 Docker)
pnpm start     # 生产环境启动
pnpm lint      # ESLint
pnpm typecheck # TypeScript 类型检查
EXPORT=true REPO_NAME=OrbitDocs pnpm build  # 静态导出 (GitHub Pages)
```

## 目录结构

```
content/          ← 文档源，按项目组织
  docs/           ← "docs" 项目
    _category_.json
    index.md
    getting-started/
    guide/
    api/
  api/            ← "api" 项目（多项目示例）

public/
  logo-light.svg  ← 亮色 Logo（可选，未配置时自动显示图标）
  logo-dark.svg   ← 暗色 Logo（可选）
  favicon.svg     ← 网站图标
  img/            ← 文档图片资源

components/
  ui/             ← shadcn/ui 组件 (button, sheet, command...)
  layout/         ← 布局组件 (navbar, sidebar, toc, breadcrumb...)
  mdx/            ← MDX 自定义组件 (pre, a, img, admonition)

lib/              ← 核心逻辑
  mdx.ts          ← MDX 编译 (含 rehypeBasePathImages 插件)
  navigation.ts   ← 导航树扫描
  search-data.ts  ← 搜索数据构建
  config.ts       ← 配置类型 (pure)
  config.server.ts ← config.toml 解析
  project.ts      ← 项目逻辑 (pure)
  project.server.ts ← 内容目录 (server-only)
  content.ts      ← 文件查找
  icon.tsx        ← FontAwesome 图标
  theme.tsx       ← 主题持久化 (零闪烁内联 script)

app/              ← Next.js App Router
  docs/[[...slug]]/ → 动态文档路由 (SSG)
  layout.tsx      ← 根布局 (Navbar)
  page.tsx        ← 首页 (重定向到 /docs)
  not-found.tsx   ← 自定义 404
  sitemap.ts      ← 站点地图
  globals.css     ← 样式

.github/workflows/
  deploy.yml      ← GitHub Pages 自动部署

config.toml       ← 运行时站点配置 (Docker volume)
.dockerignore
Dockerfile
docker-compose.yml
```
