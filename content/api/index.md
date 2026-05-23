---
title: 概述
order: 1
description: API 概览与基础信息
---

# API Reference

欢迎使用 OrbitDocs API。RESTful 接口基于 JSON 格式，可通过 HTTPS 访问。

## Base URL

```
https://api.orbitdocs.dev/v1
```

## 版本

当前 API 版本：`v1`。版本号通过 URL 路径指定，未来版本更新将提供向后兼容周期。

## 快速示例

```bash
curl https://api.orbitdocs.dev/v1/users \
  -H "Authorization: Bearer YOUR_API_KEY"
```

```json title="响应"
{
  "data": [
    { "id": 1, "name": "Alice", "email": "alice@example.com" }
  ],
  "total": 1
}
```

## 通用约定

| 约定 | 说明 |
|------|------|
| 认证 | Bearer Token |
| 请求体 | `application/json` |
| 响应格式 | 顶层包含 `data` / `error` 字段 |
| 分页 | `?page=1&per_page=20` |
| 时间戳 | ISO 8601 (UTC) |
