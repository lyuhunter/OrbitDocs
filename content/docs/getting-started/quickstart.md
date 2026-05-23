---
title: 快速入门
order: 2
description: 5 分钟创建你的第一篇文档
---

# 快速入门

## 创建第一篇文档

在 `content/docs/` 目录下创建一个新 Markdown 文件：

```bash
touch content/docs/my-first-doc.md
```

写入内容：

```markdown
---
title: 我的第一篇文章
description: 这是一篇示例文档
---

# 我的第一篇文章

欢迎来到 OrbitDocs！这是我用 Markdown 写的文章。

## 代码示例

```python
def hello():
    print("Hello, OrbitDocs!")
```
```

## 添加分类 (Category)

在目录中添加 `_category_.json` 文件来定义分组：

```json
{
  "title": "教程",
  "order": 1,
  "icon": "fa-book",
  "collapsed": false
}
```

## 使用 Frontmatter

每个 Markdown 文件可通过 frontmatter 控制标题、排序、图标和描述：

```yaml
---
title: 页面标题        # 显示在导航和标题中
order: 1               # 排序（越小越靠前）
icon: fa-code          # FontAwesome 图标名
description: 页面描述   # 用于搜索和 SEO
---
```

## 嵌入 MDX 组件

OrbitDocs 支持在 Markdown 中直接使用 React 组件：

```mdx
<Admonition type="tip" title="小贴士">
这是一个提示框，支持 Note / Tip / Warning / Danger 四种类型。
</Admonition>
```

```mdx
<Admonition type="warning">
部署前请务必阅读部署章节。
</Admonition>
```

## 构建和部署

### Docker 部署

```bash
pnpm build
pnpm start
```

或使用 Docker Compose：

```bash
docker compose up app
```

### GitHub Pages

推送 `main` 分支自动触发构建和部署：

```bash
git push origin main
```

本地预览静态导出：

```bash
EXPORT=true REPO_NAME=OrbitDocs pnpm build
npx serve out
```
