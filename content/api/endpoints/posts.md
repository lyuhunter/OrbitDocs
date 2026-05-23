---
title: Posts
order: 2
icon: fa-file-lines
description: 文章管理相关接口
---

# Posts

## 获取文章列表

```http
GET /posts
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `page` | integer | 页码，默认 1 |
| `per_page` | integer | 每页条数，默认 20 |
| `author_id` | integer | 按作者筛选 |
| `status` | enum | `draft` / `published` |

**响应示例：**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Hello World",
      "author_id": 1,
      "status": "published",
      "created_at": "2026-03-10T12:00:00Z"
    }
  ],
  "total": 1
}
```

## 创建文章

```http
POST /posts
```

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | 是 | 文章标题 |
| `body` | string | 是 | Markdown 正文 |
| `status` | enum | 否 | 默认 `draft` |

**请求示例：**

```bash
curl -X POST https://api.orbitdocs.dev/v1/posts \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "body": "# Hello\nThis is my first post.",
    "status": "published"
  }'
```

**响应：** `201 Created`
