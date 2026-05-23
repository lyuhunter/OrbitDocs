---
title: 架构概览
order: 0
description: OrbitDocs 的技术架构与设计理念
---

# 架构概览

## 设计原则

1. **Clarity-first** — 内容即主角，UI 仅作为引导
2. **Server-first** — 导航/MDX 编译均在服务端完成，客户端仅负责交互
3. **渐进增强** — 基础功能不依赖 JavaScript，交互层逐步增强

## 数据流

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  content/    │────→│  navigation  │────→│  NavNode[]   │
│  (MDX 文件)   │     │  (扫描文件系统) │     │  (导航树)     │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
┌──────────────┐     ┌──────────────┐            ▼
│  MDX 源文件   │────→│  compileMDX  │────→  React Element
│  (含 front-   │     │  (服务端编译)  │
│   matter)    │     └──────────────┘
└──────────────┘
```

### 路由解析

```
/docs/[[...slug]]/page.tsx
├── slug = []               → 项目选择页（多项目时）
├── slug = [projectId]       → 项目首页
├── slug = [projectId, ...]  → 项目内页面
└── slug = [other]           → 默认项目的页面（向后兼容）

路由使用 `generateStaticParams()` 构建时预渲染所有文档页面。两篇 demo 项目共生成 19 个静态页面，首次访问零等待。

## 三栏布局

```
┌──────────────────────────────────────┐
│  Navbar (sticky)                     │
├────────┬────────────────┬───────────┤
│        │                │           │
│ Sidebar│  Content       │   TOC     │
│ (sticky)│  (max-w-3xl)  │ (xl+)     │
│        │                │           │
├────────┴────────────────┴───────────┤
│  Footer                             │
└──────────────────────────────────────┘
```

- `< 768px`: 单栏，Sidebar 通过 Sheet 抽屉打开
- `768-1024px`: 双栏，Sidebar + Content
- `≥ 1024px`: 三栏，Sidebar + Content + TOC

## 技术架构

### 前端框架

基于 **Next.js 16** (App Router)，使用 Turbopack 作为开发构建工具，提供极速 HMR。

### 样式方案

**Tailwind CSS 4** + 语义化 CSS 变量 (OKLCH 色彩空间)。所有颜色通过 `--primary` / `--muted` / `--accent` 等变量控制，支持 light/dark 双模式。

### 组件体系

**shadcn/ui 4.8**，基于 `@base-ui/react`（取代 Radix）。组件通过 CLI 生成到 `components/ui/`，可直接修改。

### MDX 编译

使用 `next-mdx-remote` 的 RSC API (`compileMDX`)，配合 rehype-pretty-code（代码高亮）、rehype-slug（锚点）、remark-gfm（GFM 语法）。

### 搜索

使用 **cmdk**（⌘K 弹窗）实现客户端全文搜索。搜索索引在服务端预编译，通过 props 注入到 `SearchDialog` 组件。原生过滤，无需 debounce 或复杂状态管理。

### 静态生成

路由 `/docs/[[...slug]]` 使用 `generateStaticParams` 在构建时预渲染所有文档页面，首次访问无需等待。每个项目 + 每个页面均生成独立静态 HTML。

### TOML 配置

所有站点配置存储在 `config.toml` 中，通过 Docker volume 挂载到容器内。配置文件在模块加载时解析，运行时修改后重启容器即可生效，无需重新构建镜像。

## 部署

支持 Docker 部署（production + development 模式），也支持构建为独立应用直接运行。
