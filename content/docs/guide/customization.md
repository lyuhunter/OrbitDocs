---
title: 自定义配置
order: 3
description: 自定义主题、导航和布局
---

# 自定义配置

## 站点配置

编辑 `lib/config.ts` 来修改站点信息：

```ts title="lib/config.ts"
export const siteConfig = {
  name: "OrbitDocs",           // 站点名称
  description: "...",          // 站点描述（SEO）
  url: "https://orbitdocs.dev", // 站点 URL

  logo: {
    text: "OrbitDocs",         // 文字 Logo
    light: "/logo-light.svg",  // 亮色 Logo 图片（可选）
    dark: "/logo-dark.svg",    // 暗色 Logo 图片（可选）
  },

  projects: [
    { id: "docs", name: "项目文档", icon: "fa-book" },
  ],

  footer: {
    copyright: "© 2026 OrbitDocs",
    links: [{ label: "GitHub", href: "..." }],
    poweredBy: true,
  },

  links: {
    github: "https://github.com/lyuhunter/OrbitDocs",
  },
}
```

## 主题色

编辑 `app/globals.css` 中的 CSS 变量：

```css title="app/globals.css"
:root {
  --primary: oklch(0.546 0.245 262.88);
  --primary-foreground: oklch(0.985 0 0);
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... */
}

.dark {
  --primary: oklch(0.685 0.169 237.32);
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
}
```

所有颜色使用 OKLCH 色彩空间，确保在不同显示器上色彩一致。

## 导航排序

通过 `order` 字段控制导航项排序：

```json title="content/docs/api/_category_.json"
{
  "title": "API 参考",
  "order": 1,
  "icon": "fa-code",
  "collapsed": true
}
```

## 添加新项目

1. 在 `content/` 下创建项目目录
2. 添加 `_category_.json` 和文档文件
3. 在 `lib/config.ts` 的 `projects` 数组中注册

```ts
projects: [
  { id: "docs", name: "OrbitDocs", icon: "fa-book" },
  { id: "api", name: "API 参考", icon: "fa-code", description: "API 文档" },
]
```

项目切换器会自动出现在导航栏中。
