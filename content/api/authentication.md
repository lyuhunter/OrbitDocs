---
title: 认证
order: 2
icon: fa-key
description: 如何获取并使用 API Key
---

# 认证

所有 API 请求都需要通过 Bearer Token 进行认证。

## 获取 API Key

在 OrbitDocs 控制台 Settings → API Keys 页面创建密钥：

```bash
# 创建后请立即保存，密钥仅显示一次
API Key: orb_sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 使用方式

在请求头中携带 Token：

```bash
curl https://api.orbitdocs.dev/v1/users \
  -H "Authorization: Bearer orb_sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

## 错误响应

认证失败时返回 `401 Unauthorized`：

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "无效或已过期的 API Key"
  }
}
```

## 安全建议

- 密钥仅显示一次，创建后立即保存到环境变量
- 定期轮换密钥（推荐每 90 天）
- 不要将密钥硬编码到代码或提交到版本控制
