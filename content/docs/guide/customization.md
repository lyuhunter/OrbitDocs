---
title: 自定义配置
order: 3
description: 自定义主题、导航和布局
---

# 自定义配置

## TOML 运行时配置

所有站点配置存储在 `config.toml` 中，通过 Docker volume 挂载到容器内。无需重新构建镜像，重启容器即可生效。

```toml title="config.toml"
[site]
name = "OrbitDocs"                          # 站点名称
description = "..."                         # 站点描述（SEO）
url = "https://orbitdocs.dev"               # 站点 URL
author = "lyuhunter"                        # 作者名
defaultProject = "docs"                     # 默认项目

[logo]
text = "OrbitDocs"                          # 文字 Logo
light = "/logo-light.svg"                   # 亮色 Logo 图片（可选）
dark = "/logo-dark.svg"                     # 暗色 Logo 图片（可选）

[footer]
copyright = "© {year} lyuhunter"            # {year} 自动替换为当前年份
poweredBy = true                            # 是否显示 "Powered by"

[[footer.link]]
label = "GitHub"
href = "https://github.com/lyuhunter/OrbitDocs"

[links]
github = "https://github.com/lyuhunter/OrbitDocs"
```

`{year}` 占位符在加载时自动替换为 `new Date().getFullYear()`，无需每年手动更新版权信息。

Logo 图片未配置时（移除 `light`/`dark` 字段），导航栏自动显示 **Lucide FileText 图标**作为兜底，无需额外配置。

配置文件缺失时（如 CI/CD 环境），系统自动使用内建默认值，保证构建不中断。

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

在 `content/` 下创建一级目录即可自动注册为新项目：

```bash
content/
├── docs/        ← 项目 "docs"
├── api/         ← 项目 "api"
└── sdk/         ← 项目 "sdk"
```

在项目根目录创建 `_project_.json` 配置显示名、排序和图标：

```json title="content/sdk/_project_.json"
{
  "name": "SDK 文档",
  "order": 3,
  "icon": "fa-code",
  "description": "软件开发工具包文档"
}
```

项目切换器会自动出现在导航栏中。每个项目有自己的独立导航树和搜索索引，URL 路径为 `/docs/{projectId}/...`。
