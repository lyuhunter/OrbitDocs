# OrbitDocs 设计规范

> 设计理念: **Clarity-first, minimal, developer-friendly**
>
> 内容即主角，UI 仅作为引导工具出现。借鉴 shadcn/ui 的组件化语义、Mintlify 的清爽三栏布局、Linear 的暗色质感。

## 1. 色彩系统

基于 shadcn/ui v4 OKLCH 语义化 CSS 变量体系，使用 `.dark` class 切换模式。

### 核心 Token

| CSS 变量 | Light | Dark | 用途 |
|----------|-------|------|------|
| `--background` | oklch(1 0 0) | oklch(0.145 0 0) | 页面背景 |
| `--foreground` | oklch(0.145 0 0) | oklch(0.985 0 0) | 默认文字 |
| `--card` | oklch(1 0 0) | oklch(0.145 0 0) | 卡片背景 |
| `--primary` | oklch(0.546 0.245 262.88) | oklch(0.546 0.245 262.88) | 主要强调色 (蓝色) |
| `--primary-foreground` | oklch(1 0 0) | oklch(1 0 0) | 强调色上的文字 |
| `--secondary` | oklch(0.97 0 0) | oklch(0.269 0 0) | 次要表面 |
| `--muted` | oklch(0.97 0 0) | oklch(0.145 0 0) | 弱化背景 |
| `--muted-foreground` | oklch(0.556 0 0) | oklch(0.708 0 0) | 弱化文字 |
| `--accent` | oklch(0.97 0.01 262.88) | oklch(0.269 0.01 262.88) | hover/选中态 |
| `--border` | oklch(0.922 0 0) | oklch(0.269 0 0) | 边框 |
| `--ring` | oklch(0.546 0.245 262.88) | oklch(0.546 0.245 262.88) | 聚焦环 |
| `--sidebar` | oklch(0.985 0 0) | oklch(0.145 0 0) | 侧边栏背景 |
| `--sidebar-accent` | oklch(0.97 0 0) | oklch(0.205 0 0) | 侧边栏 hover |
| `--sidebar-border` | oklch(0.922 0 0) | oklch(0.269 0 0) | 侧边栏边框 |

### 使用规则

- 所有颜色 **必须** 通过 `--*` CSS 变量引用，禁止硬编码色值
- Tailwind 中通过 `bg-background` / `text-foreground` / `text-muted-foreground` 等引用
- 自定义组件色值也必须在 `globals.css` 中定义变量，不写死

## 2. 排版

### 字体

```css
--font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

### 层级

| 元素 | class | 字重 | 字号 |
|------|-------|------|------|
| 页面标题 (h1) | `scroll-m-20 text-4xl font-bold tracking-tight` | 700 | 36px |
| 章节标题 (h2) | `scroll-m-20 text-2xl font-semibold tracking-tight` | 600 | 24px |
| 子章节 (h3) | `scroll-m-20 text-xl font-semibold tracking-tight` | 600 | 20px |
| 小标题 (h4) | `scroll-m-20 text-base font-medium` | 500 | 16px |
| 正文 | `text-base leading-7` | 400 | 16px |
| 行内代码 | `relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm` | 400 | 14px |
| 块级代码 | 使用 `<pre>` 组件包装 | 400 | 14px |

## 3. 布局

### 三栏结构

```
Navbar (h-14, sticky top-0, backdrop-blur + border-b)
  ├─ 左侧: Logo + SiteName
  └─ 右侧: SearchButton(⌘K) | ThemeToggle | GitHubLink

Desktop (>1024px):
┌──────────┬───────────────────────┬─────────────────┐
│ Sidebar  │    Main Content        │  Table of       │
│ w-64     │    max-w-3xl           │  Contents       │
│          │    mx-auto             │  w-56           │
│ overflow-│    px-8               │  sticky top-20  │
│ y-auto   │                       │  pl-8            │
│ h-[calc( │    Breadcrumb          │  border-l       │
│ 100vh-3.5│    ──────────────     │                 │
│ rem)]    │    MDX Content         │  h2/h3 anchors  │
│ border-r │                       │  text-sm         │
│          │    ──────────────     │                 │
│          │    Prev / Next nav     │                 │
├──────────┴───────────────────────┴─────────────────┤
│ Footer (minimal)                                    │
└─────────────────────────────────────────────────────┘

Tablet/Touch (768-1024px):
  Sidebar → Sheet (drawer), TOC 隐藏

Mobile (<768px):
  Sidebar → Sheet, TOC 隐藏, content full-width
```

### 间距

- 内容与侧边栏间距: `gap-8`
- 段落间距: `mb-6` (正文), `mt-8` (标题间距)
- 列表缩进: `pl-6`
- 代码块上下间距: `my-6`
- 容器 padding: `px-4 sm:px-6 lg:px-8`

### 断点

| 断点 | 宽度 | 行为 |
|------|------|------|
| mobile | < 768px | 单栏，侧边栏抽屉 |
| tablet | 768-1024px | 两栏 (sidebar + content) |
| desktop | 1024-1280px | 三栏全展开 |
| wide | > 1280px | 内容 max-w-3xl 居中，两侧留白 |

## 4. 圆角与阴影

| 元素 | 圆角 | Light 阴影 | Dark 阴影 |
|------|------|-----------|-----------|
| 卡片/容器 | `rounded-lg` (8px) | `shadow-sm` | `shadow-sm ring-1 ring-white/10` |
| 代码块 | `rounded-md` (6px) | `shadow-sm` | `shadow-md ring-1 ring-white/5` |
| 按钮 | `rounded-md` (6px) | — | — |
| 搜索弹窗 | `rounded-xl` (12px) | `shadow-2xl` | `shadow-2xl ring-1 ring-white/10` |
| 输入框 | `rounded-md` (6px) | `ring-1 ring-border` | 同 light |
| 头像 | `rounded-full` | — | — |

## 5. 组件规范

### Navbar

- 高度: `h-14`, position: `sticky top-0`
- 背景: `bg-background/80 backdrop-blur-sm border-b`
- Logo: `flex items-center gap-2`
- 搜索按钮: `⌘K` 快捷键提示，点击弹出 CommandDialog
- 主题切换: shadcn `DropdownMenu`，选项: Light / Dark / System

### Sidebar

- 宽度: `w-64` (desktop)
- 滚动: `overflow-y-auto`, `h-[calc(100vh-3.5rem)]`
- 分组标题: `text-sm font-semibold text-muted-foreground px-3 py-2`
- 可分组合并/展开: 使用 `Collapsible` 组件，展开时显示子项
- 页面项: `flex items-center gap-2 px-3 py-1.5 text-sm rounded-md`
- 当前页: `bg-accent text-accent-foreground font-medium`
- hover: `hover:bg-accent hover:text-accent-foreground transition-colors`
- 图标: FontAwesome (来自 frontmatter icon 或 _category_.json)
- 缩进: 每层嵌套 `pl-4`

### Table of Contents (TOC)

- 宽度: `w-56`, sticky 定位
- 标题: `text-sm font-semibold text-muted-foreground mb-3`
- 条目: `text-sm text-muted-foreground border-l-2 border-transparent pl-3`
- 当前: `border-l-2 border-primary text-foreground font-medium`
- hover: `text-foreground`
- 只包含 h2 (一级缩进) 和 h3 (二级缩进, pl-6)

### Search (Command Dialog)

- 使用 shadcn `Command` 组件
- 快捷键: `⌘K` 或 `/` (全局)
- 搜索源: flexsearch index (build 时生成)
- 结果显示: icon + 标题 + 路径 + 快捷键
- 上下箭头导航, Enter 打开

### Code Block

- 顶部栏: 左文件名 | 右复制按钮
- 语言标签: 右上角 `rounded-sm bg-muted px-1.5 py-0.5 text-xs`
- 行高亮: 通过 `rehype-pretty-code` 的 `highlightedLines` meta
- 复制按钮: 点击复制，显示勾号 1.5s 后恢复
- shiki 主题:
  - Light: `github-light`
  - Dark: `github-dark`

### Admonition

| 类型 | 图标 (FontAwesome) | 左边框色 | 背景色 |
|------|-------------------|---------|--------|
| Note | `fa-circle-info` | `border-l-primary` | `bg-muted/50` |
| Tip | `fa-lightbulb` | `border-l-emerald-500` | `bg-emerald-50/50 dark:bg-emerald-950/20` |
| Warning | `fa-triangle-exclamation` | `border-l-amber-500` | `bg-amber-50/50 dark:bg-amber-950/20` |
| Danger | `fa-circle-exclamation` | `border-l-red-500` | `bg-red-50/50 dark:bg-red-950/20` |

结构: 左 4px border + padding + 图标 + 加粗标题 + 正文

### Breadcrumb

- 格式: Docs / Getting Started / Installation
- 使用 shadcn `Breadcrumb` 组件
- 分隔符: `/` (使用 Lucide `ChevronRight`)
- 最后一项: `text-foreground font-medium`，前面: `text-muted-foreground`

### Prev / Next 导航

- 页面底部, flex 布局
- Prev: 左对齐, 显示 ← 前一篇标题
- Next: 右对齐, 显示后一篇标题 →
- 如果无前/后项则隐藏

## 6. 动效

| 场景 | 实现 | 时长 | 缓动 |
|------|------|------|------|
| 页面切换 | CSS `animate-in fade-in` | 150ms | ease-out |
| 导航 hover | `transition-colors` | 150ms | ease |
| 侧边栏展开 | `Collapsible` + grid-rows | 200ms | ease |
| 主题切换 | `transition-colors` on body | 200ms | ease |
| 搜索弹窗 | `animate-in zoom-in-95 fade-in` | 150ms | ease-out |
| TOC 高亮 | `transition-colors` | 100ms | ease |
| 代码复制反馈 | 勾号 icon fade in/out | 1.5s total | ease |

## 7. 图标策略

- **Lucide**: shadcn/ui 控件 (search, menu, chevron, sun, moon, x, check)
- **FontAwesome Solid**: 侧边栏导航图标、admonition 图标
- **FontAwesome Brands**: GitHub, Twitter 等品牌图标
- 图标尺寸统一: `h-4 w-4` (导航), `h-5 w-5` (admonition)

## 8. Tailwind CSS 4 配置

```css
/* app/globals.css */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --radius: 0.5rem;
}
```

## 9. 响应式设计原则

- **Mobile-first**: 基础样式为 mobile，通过 `sm:` / `md:` / `lg:` 逐级增强
- **内容优先**: 所有断点下内容区始终保持可读宽度 (max-w-3xl)
- **渐进式 UI**: 小屏收起侧边栏和 TOC，用 Sheet/Command 替换
- **触摸友好**: 所有可点击元素最小 44x44px 热区
