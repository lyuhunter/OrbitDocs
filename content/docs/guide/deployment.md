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
      # 运行时配置（容器内不含 config.toml，必须挂载）
      - ./config.toml:/app/config.toml
      # 开发热重载：覆盖镜像内的源码目录
      - ./content:/app/content           # 文档源
      - ./components:/app/components     # 布局/MDX 组件
      - ./lib:/app/lib                   # 核心逻辑
      - ./app:/app/app                   # 页面路由
      - ./public:/app/public             # 静态资源
      # 注意：node_modules 不挂载，使用镜像内的安装结果
    environment:
      - NODE_ENV=development
    command: pnpm dev
```

### 开发模式挂载说明

| 挂载路径 | 用途 |
|---------|------|
| `./config.toml` | **必须**。容器内不含配置文件，挂载后修改即刻生效 |
| `./content` | 文档源目录，修改 Markdown 文件后 HMR 自动刷新 |
| `./components` | 布局和 MDX 组件，修改后 HMR 即时生效 |
| `./lib` | 核心逻辑（导航/MDX/配置），运行时修改无需重启 |
| `./app` | 页面路由，修改后 HMR 自动刷新 |
| `./public` | 静态资源（图片/图标），开发时直接访问 |

`node_modules` 不挂载 — 使用镜像内安装结果，避免宿主环境与容器环境不一致。

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
      # 运行时配置（必须）。容器内不含 config.toml
      - ./config.toml:/app/config.toml
      # 文档源（推荐）。不挂载则使用构建时打包的内容
      - ./content:/app/content
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### 生产模式挂载说明

| 挂载路径 | 用途 |
|---------|------|
| `./config.toml` | **必须**。容器内不含配置文件，不挂载会导致服务启动失败 |
| `./content` | **推荐**。文档源目录。挂载后修改 Markdown 文件无需重建镜像；不挂载则使用构建时打包的内容 |

容器内预置了构建时的 `content/` 副本，不挂载也能正常运行（展示的是构建时的文档版本）。挂载后可实时更新文档内容。

## 运行时热更新

无需重建镜像即可更新：

| 场景 | 操作 |
|------|------|
| 修改 `config.toml` 配置 | `docker compose restart app` |
| 修改 `content/` 目录文档 | `docker compose restart app`（需挂载 `content` volume） |

`config.toml` 和 `content/` 均通过 Docker volume 挂载，修改后重启容器即可生效。

也适用于 CI/CD 场景：同一镜像通过挂载不同 `config.toml` 部署到不同环境。

## .dockerignore

项目包含 `.dockerignore`，排除不需要的文件以减小构建上下文和构建时间：

```
.git
.gitignore
node_modules
.next
Dockerfile
Dockerfile.dev
docker-compose.yml
*.md
.eslintrc*
.prettierrc*
tsconfig.json
```

## Dockerfile 说明

### 生产 Dockerfile

- 使用 `output: "standalone"` 模式，产物仅包含运行时必需文件
- 多阶段构建，最终镜像轻量
- 运行阶段 **不包含源码**，仅包含：
  - 编译后的服务端代码（`.next/standalone/`）
  - 静态资源（`.next/static/`）
  - `public/` 目录内容
  - `content/` 文档源（构建时打包，运行时可通过 volume 覆盖）
- `config.toml` 必须通过 volume 挂载，容器内不含配置文件

### 开发 Dockerfile

- 镜像内预装依赖后，源码目录通过 volume 覆盖实现热重载
- `config.toml` 和文档目录单独挂载，修改后无需重启
- Turbopack HMR 正常工作
- `node_modules` 保留在镜像内，不挂载宿主目录

## GitHub Pages 自动部署

项目包含 GitHub Actions 工作流，推送 `main` 分支后自动构建并部署到 GitHub Pages：

```yaml title=".github/workflows/deploy.yml"
on:
  push:
    branches: [main]
```

工作流程：

1. `actions/checkout@v6` 拉取代码
2. `pnpm/action-setup@v6` 安装 pnpm 11
3. `actions/setup-node@v6` 配置 Node 22 + pnpm 缓存
4. `pnpm install` 安装依赖
5. `EXPORT=true pnpm build` 以静态导出模式构建（输出到 `out/` 目录）
6. `actions/upload-pages-artifact` 上传构建产物
7. `actions/deploy-pages` 部署到 GitHub Pages
3. `EXPORT=true pnpm build` 以静态导出模式构建（输出到 `out/` 目录）
4. `actions/upload-pages-artifact` 上传构建产物
5. `actions/deploy-pages` 部署到 GitHub Pages

### 启用步骤

1. 在 GitHub 仓库 Settings → Pages 中，将 Source 设为 **GitHub Actions**
2. 推送 `main` 分支后，Actions 自动运行
3. 部署完成后在 Settings → Pages 可查看站点 URL

### 本地构建预览

```bash
EXPORT=true REPO_NAME=OrbitDocs pnpm build
npx serve out
```

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `NODE_ENV` | 运行环境 | `production` |
| `HOSTNAME` | 监听地址 | `0.0.0.0` |
| `PORT` | 端口 | `3000` |
