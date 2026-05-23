---
title: OrbitDocs 文档
description: OrbitDocs 是一个基于 Next.js 16 + shadcn/ui 构建的类 MkDocs 静态文档站点生成器
order: 0
icon: fa-house
---

# OrbitDocs 文档

欢迎使用 OrbitDocs！一个现代化、高性能的静态文档站点生成器。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.2.6 LTS | 框架 (App Router) |
| React | 19 | UI 运行时 |
| TypeScript | 5 | 类型安全 |
| Tailwind CSS | 4 | 原子化 CSS |
| shadcn/ui | 4.8 | 组件库 (基于 @base-ui/react) |
| Lucide | latest | 图标 |
| next-mdx-remote | 6 | 运行时 MDX 编译 (RSC API) |
| rehype-pretty-code | latest | 代码高亮 (shiki) |
| cmdk | latest | 客户端搜索 (⌘K 弹窗) |
| FontAwesome | 7 | 导航/组件图标 |

## 核心特性

- **MDX 支持** — 在 Markdown 中嵌入 React 组件
- **全文搜索** — 基于 cmdk，⌘K 快捷键唤醒
- **响应式布局** — 桌面三栏到移动端单栏自适应
- **暗色模式** — 支持 light/dark 双模式，持久化存储偏好
- **多项目支持** — 同一站点承载多套文档
- **代码高亮** — rehype-pretty-code + Shiki，支持文件名和复制
- **TOC 导航** — 右侧文章目录，滚动高亮
- **Docker 部署** — 开发/生产 Docker 配置
- **语义化 CSS 变量** — OKLCH 色彩体系，完全可定制

## 快速开始

```bash
pnpm dev        # 开发 (Turbopack HMR)
pnpm build      # 生产构建 (standalone 模式，适用于 Docker)
pnpm start      # 生产环境启动
pnpm lint       # ESLint 检查
pnpm typecheck  # TypeScript 类型检查
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

components/
  ui/             ← shadcn/ui 组件 (button, sheet, command...)
  layout/         ← 布局组件 (navbar, sidebar, toc, breadcrumb...)
  mdx/            ← MDX 自定义组件 (pre, a, admonition)

lib/              ← 核心逻辑
  mdx.ts          ← MDX 编译
  navigation.ts   ← 导航树扫描
  search-data.ts  ← 搜索数据构建
  config.ts       ← 配置类型 (pure)
  config.server.ts ← config.toml 解析
  project.ts      ← 项目逻辑 (pure)
  project.server.ts ← 内容目录 (server-only)
  content.ts      ← 文件查找
  icon.tsx        ← FontAwesome 图标
  theme.tsx       ← 主题持久化

app/              ← Next.js App Router
  docs/[[...slug]]/ → 动态文档路由
  layout.tsx      ← 根布局
  page.tsx        ← 首页
  globals.css     ← 样式

config.toml       ← 运行时站点配置 (Docker volume)
Dockerfile
docker-compose.yml
```
