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

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16 LTS | 框架 (App Router) |
| React | 19 | UI 运行时 |
| Tailwind CSS | 4 | 原子化 CSS |
| shadcn/ui | latest | 组件库 (语义化 CSS 变量) |
| FontAwesome | 6 | 图标 (导航 / admonitions) |
| Lucide | latest | 图标 (UI 控件，shadcn 内置) |
| next-mdx-remote | latest | 运行时 MDX 编译 |
| rehype-pretty-code | latest | 代码高亮 (shiki) |
| flexsearch | latest | 客户端全文搜索 |
| TypeScript | 5 | 类型安全 |

## 开发命令

```bash
# 开发 (Turbopack HMR)
pnpm dev

# 构建
pnpm build

# 静态导出
pnpm export

# lint
pnpm lint

# 类型检查
pnpm typecheck
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
  ui/             ← shadcn/ui 生成的组件 (button, input, sheet...)
  layout/         ← 布局组件 (sidebar, navbar, toc, breadcrumb)
  mdx/            ← MDX 自定义组件 (pre, a, img, admonition...)

lib/
  mdx.ts          ← 读取 content/ + serialize MDX
  navigation.ts   ← 从 content/ 生成导航树
  search.ts       ← 构建 flexsearch 索引
  config.ts       ← 站点全局配置
  utils.ts        ← cn() 工具函数

app/
  docs/[[...slug]]/page.tsx ← 动态文档路由
  layout.tsx                ← 根布局
  page.tsx                  ← 首页
  globals.css               ← Tailwind CSS 4 + 语义化变量
```

### 书写规范

1. **所有代码无注释** — 通过命名自解释
2. **使用 TypeScript**，禁止 `any`
3. **组件使用函数式 + shadcn 风格**（`cva` 定义变体，`cn` 合并类名）
4. **CSS 使用 Tailwind 4**，颜色使用 `--*` 语义化 CSS 变量，禁止硬编码色值
5. **图标策略**：shadcn/ui 控件用 Lucide，文档导航/Admonition 用 FontAwesome
6. **MDX 自定义组件**放在 `components/mdx/`，每个文件一个组件
7. **布局组件**放在 `components/layout/`
8. **shadcn/ui 组件**用 CLI 生成到 `components/ui/`，可直接修改

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
