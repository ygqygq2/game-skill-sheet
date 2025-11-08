# 游戏出招表 (Game Skill Sheet)

游戏出招表是一个基于现代前端技术栈的游戏技能查询系统，旨在为玩家提供便捷的游戏角色技能出招查询服务。目前已支持 KOF97，未来将支持更多经典街机游戏。

## ✨ 特性

- 🎮 支持多款经典街机游戏出招表查询
- 🎨 主题色切换和暗黑模式
- 📱 响应式设计，完美适配移动端
- 🔍 角色筛选和搜索功能
- 🖼️ 技能动图演示
- ♿ 无限滚动加载优化性能

## 🎯 已支持游戏

- ✅ **拳皇 97 (KOF97)** - 36 个角色，完整出招表

## 🛠️ 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **UI 库**: Chakra UI v3
- **路由**: React Router DOM v7
- **图标**: Iconify
- **样式**: Emotion + CSS-in-JS

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run dev
```

### 构建生产版本

```bash
pnpm run build
```

### 预览生产构建

```bash
pnpm run start
```

## 📖 添加新游戏

想要添加新的游戏数据？非常简单！查看详细文档：

👉 **[游戏数据规范文档](./docs/05-game-data-specification.md)**

### 快速步骤

1. 在 `src/data/{游戏名}/` 创建角色 JSON 文件
2. 在 `public/assets/{游戏名}/` 准备角色技能图片
3. 复制并修改页面模板
4. 添加路由配置
5. 完成！✨

详细步骤、JSON 格式规范、示例代码请查看上面的文档链接。

## 📁 项目结构

```
game-skill-sheet/
├── src/
│   ├── data/              # 游戏数据（JSON）
│   │   └── kof97/         # KOF97 角色数据
│   ├── pages/             # 页面组件
│   │   ├── kof97/         # KOF97 页面
│   │   └── marketing/     # 营销页面
│   ├── components/        # 公共组件
│   ├── styles/            # 样式和主题
│   └── routes/            # 路由配置
├── public/
│   └── assets/            # 静态资源
│       └── kof97/         # KOF97 角色图片
└── docs/                  # 项目文档
```

## 📚 文档

- **[游戏数据规范](./docs/05-game-data-specification.md)** - 如何添加新游戏数据（必读）
- **[主题系统架构](./docs/01-theme-architecture.md)** - 主题系统设计
- **[颜色系统设计](./docs/02-color-system-design.md)** - 颜色切换机制
- **[实现指南](./docs/03-implementation-guide.md)** - 功能实现指南
- **[最佳实践](./docs/04-best-practices.md)** - 开发最佳实践

## 🔧 开发工具

### AI 开发配置

本项目已配置 GitHub Copilot 以更好地理解 Chakra UI v3。配置文件：

- `.vscode/settings.json` - VS Code 设置
- `.vscode/copilot-docs.json` - Copilot 文档链接

引用的 Chakra UI AI 文档：

- https://chakra-ui.com/llms.txt
- https://chakra-ui.com/llms-components.txt
- https://chakra-ui.com/llms-styling.txt
- https://chakra-ui.com/llms-theming.txt
- https://chakra-ui.com/llms-v3-migration.txt

## 🚢 部署

项目构建后生成静态文件，支持多种部署方式：

- **Vercel** - 推荐，零配置部署
- **Netlify** - 简单快捷
- **GitHub Pages** - 免费托管
- **Nginx** - 自建服务器

```bash
pnpm run build
# dist/ 目录即为构建产物
```

## 🤝 贡献

欢迎贡献！您可以：

1. 🐛 提交 Bug 报告
2. 💡 提出新功能建议
3. 📝 完善文档
4. 🎮 添加新游戏数据
5. 🔧 提交代码改进

请查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本更新。

## 📄 License

MIT License

## 👨‍💻 作者

**ygqygq2**

- GitHub: [@ygqygq2](https://github.com/ygqygq2)
- Blog: [https://blog.ygqygq2.com](https://blog.ygqygq2.com)
