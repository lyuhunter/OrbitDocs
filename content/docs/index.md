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
| next-mdx-remote | 6 | 运行时 MDX 编译 |
| rehype-pretty-code | latest | 代码高亮 (shiki) |
| FlexSearch | latest | 客户端全文搜索 |
| FontAwesome | 6 | 导航/组件图标 |

## 核心特性

- **MDX 支持** — 在 Markdown 中嵌入 React 组件
- **全文搜索** — 基于 FlexSearch，⌘K 快捷键唤醒
- **响应式布局** — 桌面三栏到移动端单栏自适应
- **暗色模式** — 支持 light/dark 双模式，持久化存储偏好
- **多项目支持** — 同一站点承载多套文档
- **代码高亮** — rehype-pretty-code + Shiki，支持文件名和复制
- **TOC 导航** — 右侧文章目录，滚动高亮
- **Docker 部署** — 开发/生产 Docker 配置
- **语义化 CSS 变量** — OKLCH 色彩体系，完全可定制

## 快速开始

```bash
pnpm dev        # 启动开发服务器 → http://localhost:3000
pnpm build      # 生产构建
pnpm start      # 生产运行
pnpm lint       # ESLint 检查
pnpm typecheck  # TypeScript 类型检查
```

## 目录结构

```
content/          ← 文档源，按项目组织
  docs/           ← "docs" 项目
    index.md
    guide/
    api/
components/
  ui/             ← shadcn/ui 组件
  layout/         ← 布局组件
  mdx/            ← MDX 自定义组件
lib/              ← 核心逻辑
app/              ← Next.js App Router
```
