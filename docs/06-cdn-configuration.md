# CDN 配置说明

## 概述

项目已配置支持 CDN 加速，用于加载 KOF97 游戏资源文件。

## 配置方法

### 1. 环境变量配置

在 `.env` 文件中配置 CDN 基础 URL：

```env
VITE_CDN_BASE_URL = https://images.linuxba.com/projects/game-skill-sheet
```

### 2. CDN 资源结构

CDN 上的资源结构应该与本地 `public/assets/kof97/` 目录保持一致：

```
CDN_BASE_URL/
└── kof97/
    ├── 94草薙京/
    │   └── *.jpg
    ├── 草薙京/
    │   └── *.jpg
    ├── 八神庵/
    │   └── *.jpg
    └── ...
```

### 3. 工作原理

- 项目使用 `getAssetUrl()` 函数自动处理资源路径
- 对于 `assets/kof97/` 路径下的资源，自动使用 CDN 地址
- 其他资源继续使用本地路径

### 4. 示例

```typescript
// 原始路径
'/public/assets/kof97/草薙京/image.jpg'

// 转换后（使用 CDN）
'https://images.linuxba.com/projects/game-skill-sheet/kof97/草薙京/image.jpg'

// 非 kof97 资源保持不变
'/public/assets/other/image.png' → '/public/assets/other/image.png'
```

## 开发和生产环境

### 开发环境

如果需要在开发环境使用本地资源，可以注释掉或删除 `.env` 中的 `VITE_CDN_BASE_URL` 配置：

```env
# VITE_CDN_BASE_URL =
```

### 生产环境

在生产环境的 `.env` 或部署配置中设置完整的 CDN URL。

## 测试

启动开发服务器后，可以通过浏览器开发者工具的 Network 面板查看资源是否从 CDN 加载：

```bash
pnpm dev
```

访问 KOF97 页面，检查图片请求的 URL 是否指向 CDN。

## 注意事项

1. **URL 编码**：CDN 上的中文文件名需要正确的 URL 编码
2. **CORS 配置**：确保 CDN 服务器允许跨域访问
3. **缓存策略**：建议在 CDN 上配置合适的缓存策略以提高性能
