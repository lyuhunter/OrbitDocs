# OrbitDocs

类 MkDocs 静态文档站点生成器，基于 Next.js 16 + shadcn/ui 构建。

## 快速导航

| 资源 | 位置 |
|------|------|
| 架构决策 | `docs/ARCHITECTURE.md` |
| 设计规范 | `docs/DESIGN.md` |
| 内容源 | `content/` |
| 布局组件 | `components/layout/` |
| MDX 组件 | `components/mdx/` |
| shadcn/ui 组件 | `components/ui/` |
| 核心逻辑 | `lib/` |
| Docker | `Dockerfile` / `docker-compose.yml` |

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.2.6 LTS | 框架 (App Router) |
| React | 19 | UI 运行时 |
| Tailwind CSS | 4.3 | 原子化 CSS |
| shadcn/ui | 4.8 | 组件库 (语义化 CSS 变量, @base-ui/react) |
| FontAwesome | — | 图标策略待引入 |
| Lucide | latest | 图标 (shadcn 内置) |
| next-mdx-remote | 6 | 运行时 MDX 编译 (RSC API) |
| rehype-pretty-code | latest | 代码高亮 (shiki) |
| flexsearch | latest | 客户端全文搜索 |
| TypeScript | 5 | 类型安全 |

## 项目当前状态

项目已完成核心功能开发和基础布局搭建，可以直接 `pnpm dev` 启动。

```
已实现:
  ✓ 项目脚手架 (Next.js 16 + Tailwind 4 + shadcn/ui)
  ✓ 语义化 CSS 变量体系 (OKLCH, light/dark 双模式)
  ✓ 动态文档路由 /docs/[[...slug]]
  ✓ MDX 编译器 (rehype-pretty-code 代码高亮 + rehype-slug 锚点)
  ✓ 三栏布局 (Navbar + Sidebar + Content)
  ✓ 导航树 (content/ 文件系统扫描, _category_.json 分组, order 排序)
  ✓ 全文搜索 (flexsearch, ⌘K 快捷键)
  ✓ 暗色模式切换
  ✓ 响应式布局 (移动端 Sheet 抽屉)
  ✓ MDX 自定义组件 (代码块复制/文件名/智能链接/Admonition)
  ✓ 面包屑导航
  ✓ 右侧 TOC (IntersectionObserver 滚动高亮)
  ✓ 前后篇导航
  ✓ Docker 生产/开发配置

待实现:
  ☐ FontAwesome 图标集成 (导航/Admonition)
  ☐ 静态导出模式测试
  ☐ PWA / 离线支持
  ☐ 自定义 404 页面
  ☐ 首页重定向美化
  ☐ Sitemap 生成
  ☐ 多语言 (i18n)
```

## 开发命令

```bash
pnpm dev       # 开发 (Turbopack HMR)
pnpm build     # 构建 (standalone 模式，适用于 Docker)
pnpm start     # 生产环境启动
pnpm lint      # ESLint
pnpm typecheck # TypeScript 类型检查
```

## Docker 命令

```bash
docker compose up dev    # 开发模式 (热重载)
docker compose up app    # 生产模式
```

## 项目约定

### 目录结构

```
content/          ← Markdown/MDX 文档源，按目录组织
  _category_.json ← 可选，定义分组的标题/排序/图标
  index.md        ← /docs 首页
  guide/
    _category_.json
    getting-started.md
    customization.md

components/
  ui/             ← shadcn/ui 组件 (button, sheet, command...)
  layout/         ← 布局组件
    navbar.tsx    ← 顶栏 (Logo / 搜索 / 主题 / GitHub)
    sidebar.tsx   ← 侧边栏导航树 (递归 + 可折叠)
    search-dialog.tsx ← ⌘K 全文搜索弹窗
    breadcrumb.tsx ← 面包屑
    toc.tsx       ← 文章目录 (IntersectionObserver)
  mdx/            ← MDX 自定义组件
    pre.tsx       ← 代码块 (文件名 + 复制按钮)
    a.tsx         ← 智能链接 (内部/外部)
    admonition.tsx ← 提示框 (Note/Tip/Warning/Danger)
    mdx-components.ts ← 组件映射注册

lib/
  mdx.ts          ← MDX 编译 (compileMDX RSC API)
  navigation.ts   ← 文件系统扫描 + 导航树 + 面包屑 + 前后页
  search.ts       ← flexsearch 客户端搜索
  search-data.ts  ← 服务端搜索数据构建
  config.ts       ← 站点全局配置
  utils.ts        ← cn() 工具函数

app/
  docs/[[...slug]]/page.tsx ← 动态文档路由
  docs/layout.tsx            ← 三栏布局 (Sidebar + Content)
  docs/sidebar.tsx           ← 客户端 Sidebar 包装
  layout.tsx                 ← 根布局 (Navbar)
  page.tsx                   ← 首页 (重定向到 /docs)
  globals.css                ← Tailwind 4 + 语义化变量
```

### 书写规范

1. **所有代码无注释** — 通过命名自解释
2. **使用 TypeScript**，禁止 `any`
3. **组件使用函数式 + shadcn 风格**（`cva` 定义变体，`cn` 合并类名）
4. **CSS 使用 Tailwind 4**，颜色使用 `--*` 语义化 CSS 变量，禁止硬编码色值
5. **图标策略**：shadcn/ui 控件用 Lucide，文档导航/Admonition 用 FontAwesome（待引入）
6. **shadcn/ui 组件**用 CLI 生成到 `components/ui/`，可直接修改
7. **布局组件**放在 `components/layout/`
8. **MDX 自定义组件**放在 `components/mdx/`，每个文件一个组件

### 路由约定

| 路由 | 内容 |
|------|------|
| `/` | 首页，重定向到 /docs |
| `/docs` | `content/index.md` |
| `/docs/[...slug]` | `content/{slug}.md` / `content/{slug}/index.md` |

### 导航树生成规则

- 每个目录生成一个分组 (可折叠)
- `_category_.json` 控制分组的 `title` / `order` / `icon` / `collapsed`
- 每个 `.md` 文件的 frontmatter 控制 `title` / `order` / `icon`
- 按 `order` 升序排列，无 `order` 的按字母序排后

### 设计准则

详见 `docs/DESIGN.md`，核心原则：

1. **Clarity-first** — 内容即主角，UI 仅作为引导
2. **语义化颜色** — 全部通过 shadcn 的 `--primary` / `--muted` / `--accent` 等变量
3. **双模式** — light/dark 通过 `.dark` class 切换
4. **响应式** — mobile < 768px < tablet < 1024px < desktop

### 关键组件 API

```
导航 (lib/navigation.ts):
  getNavigation()       → NavNode[]        递归扫描 content/
  getAllPages()         → FlatPage[]        扁平页列表
  findPageBySlug()      → FlatPage | undefined
  getPrevNext(slug)     → { prev, next }
  getBreadcrumb(slug)   → { title, slug }[]

MDX (lib/mdx.ts):
  getMDXContent(slug)   → { content, frontmatter } | null
                        使用 compileMDX() + 自定义组件

搜索 (lib/search.ts):
  searchInDocs(query, docs) → SearchResult[]
                        使用 flexsearch Document 索引
```
