# OrbitDocs

类 MkDocs 静态文档站点生成器，基于 Next.js 16 + shadcn/ui 构建。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.2.6 LTS | 框架 (App Router) |
| React | 19 | UI 运行时 |
| TypeScript | 5 | 类型安全 |
| Tailwind CSS | 4 | 原子化 CSS |
| shadcn/ui | 4.8 | 组件库 |
| next-mdx-remote | 6 | 运行时 MDX 编译 |
| rehype-pretty-code | latest | 代码高亮 |
| FlexSearch | latest | 全文搜索 |
| FontAwesome | 6 | 图标 |

## 快速开始

```bash
pnpm dev       # 开发 (http://localhost:3000)
pnpm build     # 生产构建
pnpm start     # 生产运行
pnpm lint      # ESLint
pnpm typecheck # TypeScript 类型检查
```

## Docker

```bash
docker compose up dev    # 开发模式 (热重载)
docker compose up app    # 生产模式
```

## 主要特性

- **MDX 支持** — Markdown 中嵌入 React 组件
- **全文搜索** — FlexSearch + ⌘K
- **三栏布局** — Sidebar + Content + TOC
- **暗色模式** — 持久化存储偏好
- **多项目支持** — 同一站点承载多套文档
- **代码高亮** — Shiki + 文件名栏 + 复制按钮
- **响应式** — 桌面到移动端自适应
- **Docker 部署** — 开发/生产两套配置

## 目录结构

```
├── app/               # Next.js App Router 页面
├── components/
│   ├── layout/        # 布局组件 (Navbar/Sidebar/TOC/...)
│   ├── mdx/           # MDX 自定义组件
│   └── ui/            # shadcn/ui 组件
├── content/
│   └── docs/          # 项目文档源 (支持多项目)
├── lib/               # 核心逻辑
│   ├── config.ts      # 站点配置
│   ├── navigation.ts  # 导航树生成
│   ├── mdx.ts         # MDX 编译
│   ├── project.ts     # 多项目管理
│   ├── search.ts      # 搜索
│   └── theme.tsx      # 主题持久化
├── Dockerfile
├── docker-compose.yml
└── next.config.ts
```

## 多项目配置

在 `lib/config.ts` 中注册项目：

```ts
projects: [
  { id: "docs", name: "项目文档", icon: "fa-book" },
  { id: "api", name: "API 参考", icon: "fa-code", description: "..." },
]
```

每个项目的文档位于 `content/{projectId}/`，URL 为 `/docs/{projectId}/{slug}`。

## 项目状态

- [x] 脚手架 (Next.js 16 + Tailwind 4 + shadcn/ui)
- [x] 动态文档路由
- [x] MDX 编译 + 代码高亮
- [x] 三栏布局 (Navbar + Sidebar + Content + TOC)
- [x] 导航树 (文件系统扫描 + _category_.json)
- [x] 全文搜索 (⌘K)
- [x] 暗色模式
- [x] 响应式布局
- [x] MDX 自定义组件
- [x] 面包屑导航
- [x] 前后篇导航
- [x] Docker 部署
- [x] 多项目管理
- [x] FontAwesome 图标
- [x] 主题持久化
- [x] BackToTop

## License

MIT
