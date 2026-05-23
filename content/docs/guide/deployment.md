---
title: Docker 部署
order: 4
description: 使用 Docker 部署 OrbitDocs
---

# Docker 部署

## 开发模式

```bash
docker compose up dev
```

访问 http://localhost:3000。支持热重载，源码修改即时生效。

```yaml title="docker-compose.yml"
services:
  dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./config.toml:/app/config.toml   # 运行时配置
      - ./content:/app/content           # 文档源热重载
      - ./components:/app/components
      - ./lib:/app/lib
      - ./app:/app/app
      - ./public:/app/public
    environment:
      - NODE_ENV=development
    command: pnpm dev
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
    volumes:
      - ./config.toml:/app/config.toml   # 运行时配置，修改后重启容器即可
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## 配置热更新

`config.toml` 通过 Docker volume 挂载到容器内，修改后重启容器即可生效：

```bash
# 修改 config.toml 后
docker compose restart app
```

无需重新构建 Docker 镜像。也适用于 CI/CD 场景：同一镜像通过挂载不同 `config.toml` 部署到不同环境。

## .dockerignore

项目包含 `.dockerignore`，排除以下不需要的文件以减小构建上下文：

```
.git
.gitignore
node_modules
.next
Dockerfile
Dockerfile.dev
docker-compose.yml
*.md
```

## Dockerfile 说明

### 生产 Dockerfile

- 使用 `output: "standalone"` 模式，产物仅包含必要文件
- 多阶段构建，最终镜像轻量
- 运行阶段不包含源码，仅包含编译产物和 `config.toml`

### 开发 Dockerfile

- 挂载源码目录实现热重载
- 配置文件和文档目录单独挂载，无需重启
- Turbopack HMR 正常工作

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `NODE_ENV` | 运行环境 | `production` |
| `HOSTNAME` | 监听地址 | `0.0.0.0` |
| `PORT` | 端口 | `3000` |
