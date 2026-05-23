---
title: Users
order: 1
icon: fa-users
description: 用户管理相关接口
---

# Users

## 获取用户列表

```http
GET /users
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `page` | integer | 页码，默认 1 |
| `per_page` | integer | 每页条数，默认 20，最大 100 |
| `search` | string | 按姓名或邮箱搜索 |

**响应示例：**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com",
      "created_at": "2026-01-15T08:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "per_page": 20
}
```

## 获取单个用户

```http
GET /users/:id
```

**响应示例：**

```json
{
  "data": {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "created_at": "2026-01-15T08:00:00Z"
  }
}
```

## 创建用户

```http
POST /users
```

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | 是 | 用户姓名 |
| `email` | string | 是 | 邮箱地址 |

**请求示例：**

```json
{
  "name": "Bob",
  "email": "bob@example.com"
}
```

**响应：** `201 Created`
