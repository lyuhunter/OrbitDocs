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
│   │   └── shell.tsx      # 客户端导航容器
│   ├── layout.tsx       # 根布局 (Navbar)
│   ├── page.tsx         # 首页 (重定向到 /docs)
│   ├── not-found.tsx    # 自定义 404
│   ├── sitemap.ts       # 站点地图
│   └── globals.css      # 全局样式 + CSS 变量
├── components/
│   ├── layout/          # 布局组件
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   ├── toc.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── search-dialog.tsx
│   │   ├── back-to-top.tsx
│   │   └── footer.tsx
│   ├── mdx/             # MDX 组件
│   │   ├── pre.tsx
│   │   ├── a.tsx
│   │   ├── img.tsx
│   │   ├── admonition.tsx
│   │   └── mdx-components.ts
│   └── ui/              # shadcn/ui 组件
├── content/             # 文档源
│   ├── docs/            # "docs" 项目
│   └── api/             # "api" 项目（多项目示例）
├── lib/                 # 核心逻辑
│   ├── config.ts        # 配置类型 (pure, 无 fs)
│   ├── config.server.ts # config.toml 解析 (server-only)
│   ├── navigation.ts    # 导航树扫描 + 面包屑 + 前后页
│   ├── mdx.ts           # MDX 编译 (compileMDX RSC API)
│   ├── search-data.ts   # 搜索数据构建
│   ├── project.ts       # 项目路由解析 (pure)
│   ├── project.server.ts # 内容目录路径 (server-only)
│   ├── content.ts       # findContentFile 文件查找
│   ├── icon.tsx         # FontAwesome 图标组件
│   ├── theme.tsx        # 主题持久化 (零闪烁)
│   └── utils.ts         # cn() 工具函数
├── config.toml          # 运行时站点配置 (Docker volume 挂载)
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
└── next.config.ts
```

## 启动开发服务器

```bash
pnpm dev
```

打开 http://localhost:3000 ，即可看到文档站点。

## 配置

站点配置通过 `config.toml` 管理，运行时生效，无需重新构建：

```toml title="config.toml"
[site]
name = "OrbitDocs"
description = "基于 Next.js 16 的现代化文档站点框架"
defaultProject = "docs"

[logo]
text = "OrbitDocs"
light = "/logo-light.svg"
dark = "/logo-dark.svg"
```

项目的 name、order、icon 等元数据通过 `content/{projectId}/_project_.json` 配置，详见[多项目](/docs/docs/guide/customization#添加新项目)。

## 生产构建

### Docker 部署

```bash
pnpm build
pnpm start
```

构建产物在 `.next/standalone` 目录（`output: "standalone"` 模式），适用于 Docker 部署。

### GitHub Pages 静态导出

```bash
EXPORT=true REPO_NAME=OrbitDocs pnpm build
```

构建产物在 `out/` 目录，自动适配 GitHub Pages 的 `basePath`。推送 `main` 分支后 GitHub Actions 自动执行此流程并部署。
