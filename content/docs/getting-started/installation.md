---
title: 安装指南
order: 1
description: 如何安装和配置 OrbitDocs
---

# 安装指南

## 前提条件

- Node.js 20+
- pnpm（推荐）或 npm / yarn

## 使用模板创建项目

```bash
git clone https://github.com/lyuhunter/OrbitDocs.git
cd OrbitDocs
pnpm install
```

## 目录结构

```
├── app/                # Next.js App Router 页面
│   ├── docs/
│   │   ├── [[...slug]]/   # 动态文档路由
│   │   ├── layout.tsx     # 三栏布局
│   │   └── sidebar.tsx
│   ├── globals.css      # 全局样式 + CSS 变量
│   └── layout.tsx       # 根布局
├── components/
│   ├── layout/          # 布局组件
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   ├── toc.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── search-dialog.tsx
│   │   ├── footer.tsx
│   │   └── back-to-top.tsx
│   ├── mdx/             # MDX 组件
│   │   ├── pre.tsx
│   │   ├── a.tsx
│   │   ├── admonition.tsx
│   │   └── mdx-components.ts
│   └── ui/              # shadcn/ui 组件
├── content/             # 文档源
│   └── docs/            # "docs" 项目
├── lib/                 # 核心逻辑
│   ├── config.ts
│   ├── navigation.ts
│   ├── mdx.ts
│   ├── search.ts
│   ├── search-data.ts
│   ├── project.ts
│   ├── icon.tsx
│   ├── theme.tsx
│   └── utils.ts
├── Dockerfile
├── docker-compose.yml
└── next.config.ts
```

## 启动开发服务器

```bash
pnpm dev
```

打开 http://localhost:3000 ，即可看到文档站点。

## 生产构建

```bash
pnpm build
pnpm start
```

构建产物在 `.next/` 目录，适用于 Docker 部署。
