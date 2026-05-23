---
title: 自定义配置
order: 1
description: 自定义主题、导航和布局
---

# 自定义配置

## 修改主题色

编辑 `app/globals.css` 中的 CSS 变量：

```css
:root {
  --primary: oklch(0.546 0.245 262.88);
}
```

## 修改导航

每个目录下的 `_category_.json` 控制分组行为：

```json
{
  "title": "使用指南",
  "order": 2,
  "icon": "fa-book",
  "collapsed": false
}
```

## 添加新的文档分组

1. 在 `content/` 下创建新目录
2. 添加 `_category_.json` 配置文件
3. 放入 `.md` 文件
