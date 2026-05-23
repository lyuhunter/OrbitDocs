# OrbitDocs

类 MkDocs 静态文档站点生成器，基于 Next.js 16 + shadcn/ui 构建。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.2.6 LTS | 框架 (App Router) |
| React | 19 | UI 运行时 |
| TypeScript | 5 | 类型安全 |
| Tailwind CSS | 4 | 原子化 CSS |
| shadcn/ui | 4.8 | 组件库 (语义化 CSS 变量, @base-ui/react) |
| FontAwesome | 7 | 图标 (导航/Admonition) |
| Lucide | latest | 图标 (shadcn 内置) |
| next-mdx-remote | 6 | 运行时 MDX 编译 (RSC API) |
| rehype-pretty-code | latest | 代码高亮 (shiki) |
| cmdk | latest | 客户端搜索 (⌘K 弹窗) |

## 快速开始

```bash
pnpm dev       # 开发 (Turbopack HMR)
pnpm build     # 生产构建 (standalone 模式)
pnpm start     # 生产运行
pnpm lint      # ESLint
pnpm typecheck # TypeScript 类型检查
```

## Docker

```bash
docker compose up dev    # 开发模式 (热重载)
docker compose up app    # 生产模式 (config.toml 挂载)
```

## 主要特性

- **MDX 支持** — Markdown 中嵌入 React 组件
- **全文搜索** — cmdk ⌘K 弹窗，多项目分组
- **三栏布局** — Sidebar + Content + TOC
- **暗色模式** — 零闪烁持久化存储
- **多项目支持** — 同一站点承载多套文档
- **代码高亮** — Shiki + 文件名栏 + 复制按钮
- **TOML 配置** — 运行时生效，Docker volume 挂载
- **SSG 预渲染** — `generateStaticParams` 构建时生成所有页面
- **响应式** — 桌面到移动端自适应
- **Docker 部署** — 开发/生产两套配置

## 目录结构

```
├── app/               # Next.js App Router 页面
│   ├── docs/[[...slug]]/ 动态文档路由 (SSG)
│   ├── layout.tsx        根布局
│   ├── not-found.tsx     自定义 404
│   ├── sitemap.ts        站点地图
│   └── globals.css       语义化 CSS 变量
├── components/
│   ├── layout/        # 布局组件 (Navbar/Sidebar/TOC/Breadcrumb/...)
│   ├── mdx/           # MDX 自定义组件 (pre/a/admonition)
│   └── ui/            # shadcn/ui 组件
├── content/
│   ├── docs/          # "docs" 项目文档源
│   └── api/           # "api" 项目文档源（多项目示例）
├── lib/               # 核心逻辑
│   ├── config.ts      # 配置类型 (pure, 无 fs)
│   ├── config.server.ts # config.toml 解析 (server-only)
│   ├── navigation.ts  # 导航树生成 + 面包屑 + 前后页
│   ├── mdx.ts         # MDX 编译
│   ├── project.ts     # 项目路由解析 (pure)
│   ├── project.server.ts # 内容目录 (server-only)
│   ├── content.ts     # 文件查找
│   ├── search-data.ts # 搜索数据构建
│   ├── icon.tsx       # FontAwesome 图标组件
│   ├── theme.tsx      # 主题持久化 (零闪烁)
│   └── utils.ts       # cn() 工具函数
├── config.toml        # 运行时站点配置
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
└── next.config.ts
```

## TOML 运行时配置

所有站点配置在 `config.toml` 中管理，通过 Docker volume 挂载，修改后重启容器即可生效：

```toml
[site]
name = "OrbitDocs"
description = "类 MkDocs 静态文档站点生成器"
defaultProject = "docs"

[logo]
text = "OrbitDocs"
light = "/logo-light.svg"
dark = "/logo-dark.svg"

[[project]]
id = "docs"
name = "OrbitDocs"
icon = "fa-book"
```

## 多项目

每个项目的文档位于 `content/{projectId}/`，URL 为 `/docs/{projectId}/{slug}`。
在 `config.toml` 中添加 `[[project]]` 条目即可注册新项目。

## 项目状态

- [x] 脚手架 (Next.js 16 + Tailwind 4 + shadcn/ui)
- [x] 动态文档路由 + SSG 预渲染
- [x] MDX 编译 + 代码高亮
- [x] 三栏布局 (Navbar + Sidebar + Content + TOC)
- [x] 导航树 (文件系统扫描 + _category_.json)
- [x] 全文搜索 (cmdk, ⌘K, 多项目分组)
- [x] 暗色模式 (零闪烁持久化)
- [x] 响应式布局
- [x] MDX 自定义组件 (代码块/智能链接/Admonition)
- [x] 面包屑导航 (shadcn/ui)
- [x] 前后篇导航
- [x] 右侧 TOC (IntersectionObserver 三路同步)
- [x] Docker 部署 (开发/生产)
- [x] 多项目管理
- [x] TOML 运行时配置
- [x] FontAwesome 图标
- [x] 站点 Logo (light/dark SVG + 文字)
- [x] 主题持久化
- [x] 自定义 404 页面
- [x] Sitemap 生成
- [x] 服务端/客户端模块分离

## License

MIT
