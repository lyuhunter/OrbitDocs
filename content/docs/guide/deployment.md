---
title: Docker 部署
order: 4
description: 使用 Docker 部署 OrbitDocs
---

# Docker 部署

## 生产模式

从 Docker Hub 拉取预构建镜像：

```bash
docker pull hunterlyu/orbitdocs:latest
```

镜像地址：`docker.io/hunterlyu/orbitdocs:latest`

启动容器：

```bash
docker compose up -d
```

```yaml
services:
  app:
    image: orbitdocs:latest
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./config.toml:/app/config.toml
      - ./content:/app/content
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### 挂载说明

| 挂载路径 | 用途 |
|---------|------|
| `./config.toml` | **必须**。容器内不含配置文件，不挂载会导致服务启动失败 |
| `./content` | **推荐**。文档源目录。挂载后修改 Markdown 文件无需重启容器 |

容器内预置了构建时的 `content/` 副本，不挂载也能正常运行（展示的是构建时的文档版本）。

## 运行时热更新

| 场景 | 操作 |
|------|------|
| 修改 `content/` 目录文档 | **无需重启**，刷新浏览器即可（`revalidate = 0` 每次请求重新编译） |
| 修改 `config.toml` 配置 | `docker compose restart app` |

`config.toml` 和 `content/` 均通过 Docker volume 挂载。文档修改即时生效，配置修改需重启容器。

也适用于 CI/CD 场景：同一镜像通过挂载不同 `config.toml` 部署到不同环境。

## .dockerignore

项目包含 `.dockerignore`，排除不需要的文件以减小构建上下文和构建时间：

```
.git
.gitignore
node_modules
.next
content
Dockerfile
docker-compose.yml
*.md
.eslintrc*
.prettierrc*
tsconfig.json
```

注意：`content/` 在 `.dockerignore` 中，构建时仅预置少量 SSG 页面所需的文档。实际文档通过 volume 挂载提供。

## Dockerfile 说明

- 使用 `output: "standalone"` 模式，产物仅包含运行时必需文件
- 多阶段构建，最终镜像轻量
- 运行阶段 **不包含源码**，仅包含：
  - 编译后的服务端代码（`.next/standalone/`）
  - 静态资源（`.next/static/`）
  - `public/` 目录内容
  - `content/` 文档源（构建时仅含 SSG 必需的少量文件，运行时通过 volume 覆盖）
- `config.toml` 必须通过 volume 挂载，容器内不含配置文件
- `HEALTHCHECK` 定期检测 `/docs` 响应

### 构建加速

Dockerfile 利用 pnpm store 缓存层，二次构建时无需重新下载依赖：

```dockerfile
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    corepack enable && pnpm install --frozen-lockfile
```

### 多平台构建

使用项目提供的 `docker-build.sh` 脚本：

```bash
# 构建当前平台
./docker-build.sh

# 构建并推送到 Docker Hub（多平台：linux/amd64 + linux/arm64）
./docker-build.sh --push

# 指定平台
./docker-build.sh --platform linux/amd64 --tag hunterlyu/orbitdocs:latest
```

脚本会自动读取 `package.json` 版本号作为镜像标签（如 `orbitdocs:0.1.0`），同时打 `latest` 标签。

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
