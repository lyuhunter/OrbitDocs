---
title: OrbitDocs 文档
description: OrbitDocs 是一个基于 Next.js 16 + shadcn/ui 构建的类 MkDocs 静态文档站点生成器
order: 0
icon: fa-house
---

# OrbitDocs 文档

欢迎使用 OrbitDocs！这是一个现代化文档站点生成器。

## 特性

- **Next.js 16** — Turbopack 驱动，极速 HMR
- **shadcn/ui** — 语义化 CSS 变量，light/dark 双模式
- **MDX 支持** — 在 Markdown 中嵌入 React 组件
- **全文搜索** — flexsearch 客户端搜索
- **响应式布局** — 桌面三栏到移动端单栏自适应
- **静态导出** — 可部署到任何静态托管服务

## 快速开始

安装 Deps 并启动：

```bash
pnpm install
pnpm dev
```

## 目录结构

```
content/
├── index.md
├── getting-started/
│   ├── _category_.json
│   └── installation.md
├── guide/
│   ├── _category_.json
│   └── customization.md
└── api/
    ├── _category_.json
    └── reference/
        ├── _category_.json
        └── hooks.md
```
