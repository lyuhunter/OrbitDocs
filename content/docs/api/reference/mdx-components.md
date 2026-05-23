---
title: MDX 组件 API
order: 2
description: 内置 MDX 组件的 API 参考
---

# MDX 组件 API

## Admonition

提示框组件，支持四种类型。

```mdx
<Admonition type="note" title="可选标题">
内容
</Admonition>
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `"note" \| "tip" \| "warning" \| "danger"` | `"note"` | 提示类型 |
| `title` | `string` | - | 自定义标题（不传则使用默认标签） |

## 代码块

标准 Markdown 代码 fence 自动增强：

````markdown
```typescript title="lib/mdx.ts"
// title 属性显示文件名
export async function getMDXContent(slug, projectId) { ... }
```
````

- 代码高亮使用 Shiki（github-light / github-dark）
- 右上角显示复制按钮
- `title` 属性显示文件名栏

## 智能链接

内部链接自动使用 Next.js Link 组件，外部链接自动添加 `target="_blank"` 和 `rel="noreferrer"`。

```markdown
[内部链接](/docs/docs/getting-started/installation)
[外部链接](https://github.com/lyuhunter/OrbitDocs)
```
