---
title: Docker 部署
order: 4
description: 使用 Docker 部署 OrbitDocs
---

# Docker 部署

## 开发模式

使用 Docker 开发模式，支持热重载：

```bash
docker compose up dev
```

访问 http://localhost:3000

```yaml title="docker-compose.yml"
services:
  dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
```

## 生产模式

```bash
docker compose up app
```

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
```

## Dockerfile 说明

### 生产 Dockerfile

- 使用 `pnpm deploy` 过滤 `devDependencies`
- `output: "standalone"` 模式，产物仅包含必要文件
- 多阶段构建，最终镜像仅 150MB+

### 开发 Dockerfile

- 挂载源码目录实现热重载
- 保留 `node_modules` 为独立 volume
- Turbopack HMR 正常工作

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `NODE_ENV` | 运行环境 | `production` |
| `HOSTNAME` | 监听地址 | `0.0.0.0` |
| `PORT` | 端口 | `3000` |
