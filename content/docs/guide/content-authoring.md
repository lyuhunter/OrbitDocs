---
title: 内容编写指南
order: 2
description: 学习如何使用 Markdown 和 MDX 编写文档
---

# 内容编写指南

## Markdown 语法

OrbitDocs 支持标准 GFM (GitHub Flavored Markdown) 语法：

### 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
```

### 代码块

指定语言后自动高亮：

````markdown
```typescript
function greet(name: string): string {
  return `Hello, ${name}!`
}
```
````

### 表格

```markdown
| 名称 | 版本 | 说明 |
|------|------|------|
| Next.js | 16 | 框架 |
| React | 19 | UI 运行时 |
```

### 提示框 (Admonition)

```mdx
<Admonition type="note">
这是一个 Note 提示。
</Admonition>

<Admonition type="tip" title="小技巧">
带自定义标题的提示。
</Admonition>

<Admonition type="warning">
这是一个警告。
</Admonition>

<Admonition type="danger">
危险！注意操作风险。
</Admonition>
```

### 代码块文件名

在代码 fence 后添加 `title` 来显示文件名：

````markdown
```typescript title="lib/config.ts"
export const config = { ... }
```
````

### 智能链接

内部链接自动识别，外部链接在新标签页打开：

```markdown
[安装指南](/docs/docs/getting-started/installation)
[GitHub](https://github.com/lyuhunter/OrbitDocs)
```

## Frontmatter 字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | 是 | 页面标题 |
| `description` | string | 否 | 页面描述（搜索/SEO） |
| `order` | number | 否 | 排序（默认 999） |
| `icon` | string | 否 | FontAwesome 图标名 |

## 多项目内容组织

```
content/
├── docs/             ← 项目 "docs"
│   ├── index.md
│   ├── getting-started/
│   └── guide/
├── sdk/              ← 项目 "sdk"（示例）
│   ├── index.md
│   └── api/
└── api/              ← 项目 "api"（示例）
    └── reference/
```

每个项目自动注册，无需手动配置。可通过 `_project_.json` 自定义显示名和图标：

```json title="content/sdk/_project_.json"
{
  "name": "SDK 文档",
  "order": 3,
  "icon": "fa-code"
}
```
