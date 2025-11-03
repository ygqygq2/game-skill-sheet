# 游戏数据规范文档

本文档说明如何为游戏出招表系统添加新游戏的数据。遵循此规范，您可以无需修改代码（或只需修改少量配置）即可添加新游戏。

## 目录

- [数据结构规范](#数据结构规范)
- [目录结构](#目录结构)
- [JSON 数据格式](#json-数据格式)
- [图片资源规范](#图片资源规范)
- [添加新游戏步骤](#添加新游戏步骤)
- [示例](#示例)

---

## 数据结构规范

### 整体架构

```
game-skill-sheet/
├── src/
│   └── data/
│       └── {游戏名称}/          # 游戏数据目录
│           ├── {角色1}.json     # 角色数据文件
│           ├── {角色2}.json
│           └── ...
└── public/
    └── assets/
        └── {游戏名称}/          # 游戏图片目录
            ├── {角色1}/         # 角色图片目录
            │   ├── 图片1.jpg
            │   └── 图片2.gif
            ├── {角色2}/
            └── ...
```

---

## 目录结构

### 1. 数据文件目录

**位置：** `src/data/{游戏名称}/`

**命名规范：**

- 游戏目录名使用小写英文或拼音，如：`kof97`、`kof98`、`streetfighter`
- 每个角色一个 JSON 文件
- 文件名使用角色名称（中文或英文均可），如：`草薙京.json`、`ryu.json`

**示例：**

```
src/data/
├── kof97/
│   ├── 草薙京.json
│   ├── 八神庵.json
│   └── 麻宫雅典娜.json
└── kof98/
    ├── 草薙京.json
    └── ...
```

### 2. 图片资源目录

**位置：** `public/assets/{游戏名称}/`

**命名规范：**

- 游戏目录名必须与数据目录名一致
- 每个角色一个子目录
- 子目录名必须与 JSON 文件中的 `name` 字段完全一致
- 图片文件名与 JSON 中的 `images` 数组元素一致

**示例：**

```
public/assets/
└── kof97/
    ├── 草薙京/
    │   ├── 584_2025031260436916.jpg
    │   ├── 584_2025031260436834.gif
    │   └── ...
    ├── 八神庵/
    │   └── ...
    └── placeholder.png  # 默认占位图（可选）
```

---

## JSON 数据格式

### 文件结构

每个 JSON 文件是一个数组，包含单个角色对象：

```json
[
  {
    "name": "角色名称",
    "skills": [
      {
        "name": "技能名称",
        "type": "技能类型",
        "command": "操作指令",
        "description": "技能说明（可选）",
        "images": ["图片文件名1.jpg", "图片文件名2.gif"]
      }
    ]
  }
]
```

### 字段说明

#### 角色对象 (Character)

| 字段     | 类型    | 必填 | 说明                               |
| -------- | ------- | ---- | ---------------------------------- |
| `name`   | string  | ✅   | 角色名称，必须与图片目录名完全一致 |
| `skills` | Skill[] | ✅   | 技能列表数组                       |

#### 技能对象 (Skill)

| 字段          | 类型     | 必填 | 说明                                           |
| ------------- | -------- | ---- | ---------------------------------------------- |
| `name`        | string   | ✅   | 技能名称                                       |
| `type`        | string   | ✅   | 技能类型（如：投技、特殊技、必杀技、超必杀技） |
| `command`     | string   | ✅   | 操作指令（如：↓↘→+A）                         |
| `description` | string   | ❌   | 技能说明或备注                                 |
| `images`      | string[] | ❌   | 技能演示图片文件名数组                         |

### 技能类型参考

推荐使用以下标准类型（可根据游戏自定义）：

- `投技` - 投掷技
- `特殊技` - 特殊技能
- `必杀技` - 必杀技
- `超必杀技` - 超级必杀技
- `连续技` - 连续技
- `普通技` - 普通攻击
- `其他` - 其他类型

### 完整示例

```json
[
  {
    "name": "草薙京",
    "skills": [
      {
        "name": "釟铁",
        "type": "投技",
        "command": "近敌←或→+C"
      },
      {
        "name": "外式•轰斧 阳",
        "type": "特殊技",
        "command": "→+B",
        "description": "中段攻击，无法蹲防",
        "images": ["584_2025031260436916.jpg"]
      },
      {
        "name": "百式•鬼烧",
        "type": "必杀技",
        "command": "→↓↘+A或C",
        "description": "出招时有防反效果",
        "images": ["584_2025031260436997.gif"]
      },
      {
        "name": "里百八式•大蛇薙",
        "type": "超必杀技",
        "command": "↓↙←↙↓↘→+A或C(可蓄)",
        "images": ["584_2025031260435799.gif"]
      }
    ]
  }
]
```

---

## 图片资源规范

### 图片格式

- **支持格式：** JPG、PNG、GIF（推荐 GIF 用于动作演示）
- **建议尺寸：**
  - 宽度：300-800px
  - 高度：不限（保持比例）
- **文件大小：** 每张图片建议不超过 2MB

### 命名规范

- 使用英文或数字命名
- 避免使用特殊字符（除了 `_` 和 `-`）
- 推荐格式：`角色ID_时间戳随机数.扩展名`
- 示例：`584_2025031260436916.jpg`

### 占位图

在游戏目录根部可放置 `placeholder.png` 作为默认占位图：

```
public/assets/kof97/placeholder.png
```

当技能没有图片时，系统会自动使用此占位图。

---

## 添加新游戏步骤

### 步骤 1：创建数据目录

```bash
mkdir -p src/data/{游戏名称}
```

例如添加 KOF98：

```bash
mkdir -p src/data/kof98
```

### 步骤 2：创建角色数据文件

为每个角色创建一个 JSON 文件：

```bash
touch src/data/kof98/草薙京.json
touch src/data/kof98/八神庵.json
# ... 更多角色
```

### 步骤 3：填写角色数据

按照 [JSON 数据格式](#json-数据格式) 规范填写每个角色的技能数据。

### 步骤 4：准备图片资源

```bash
mkdir -p public/assets/kof98/草薙京
mkdir -p public/assets/kof98/八神庵
# ... 更多角色
```

将对应的技能演示图片放入各角色目录。

### 步骤 5：创建游戏页面（需要少量代码）

复制现有游戏页面并修改：

```bash
cp -r src/pages/kof97 src/pages/kof98
```

修改 `src/pages/kof98/index.tsx` 中的数据加载路径：

```typescript
// 将
const modules = import.meta.glob<{ default: Array<Character> }>('@/data/kof97/*.json', { eager: true });

// 改为
const modules = import.meta.glob<{ default: Array<Character> }>('@/data/kof98/*.json', { eager: true });
```

并更新页面标题：

```typescript
<Helmet>
  <title>KOF98 出招表 | 游戏出招表</title>
</Helmet>
```

### 步骤 6：添加路由配置

在 `src/routes/index.tsx` 中添加新路由：

```typescript
export const routes: RouteObject[] = [
  {
    element: (
      <MarketingLayout>
        <Outlet />
      </MarketingLayout>
    ),
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'kof97',
        lazy: async () => {
          const { Page } = await import('@/pages/kof97');
          return { Component: Page };
        },
      },
      // 添加新游戏路由
      {
        path: 'kof98',
        lazy: async () => {
          const { Page } = await import('@/pages/kof98');
          return { Component: Page };
        },
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
];
```

### 步骤 7：更新导航菜单（可选）

在 `src/paths.ts` 添加路径：

```typescript
export const paths = {
  home: '/',
  // games
  kof97: '/kof97',
  kof98: '/kof98', // 新增
} as const;
```

在导航组件中添加菜单项（如 `src/components/marketing/layout/pages-popover.tsx`）。

---

## 示例

### 完整示例：添加 Street Fighter

#### 1. 创建数据文件

`src/data/streetfighter/ryu.json`:

```json
[
  {
    "name": "Ryu",
    "skills": [
      {
        "name": "Hadoken",
        "type": "Special Move",
        "command": "↓↘→+P",
        "description": "Projectile attack",
        "images": ["ryu_hadoken.gif"]
      },
      {
        "name": "Shoryuken",
        "type": "Special Move",
        "command": "→↓↘+P",
        "description": "Anti-air uppercut",
        "images": ["ryu_shoryuken.gif"]
      },
      {
        "name": "Shinku Hadoken",
        "type": "Super Move",
        "command": "↓↘→↓↘→+P",
        "images": ["ryu_shinku_hadoken.gif"]
      }
    ]
  }
]
```

#### 2. 组织图片资源

```
public/assets/streetfighter/
├── Ryu/
│   ├── ryu_hadoken.gif
│   ├── ryu_shoryuken.gif
│   └── ryu_shinku_hadoken.gif
└── placeholder.png
```

#### 3. 创建页面（复制并修改）

```typescript
// src/pages/streetfighter/index.tsx
function useStreetFighterData() {
  const modules = React.useMemo(
    () => import.meta.glob<{ default: Array<Character> }>('@/data/streetfighter/*.json', { eager: true }),
    []
  );
  // ... 其余代码相同
}
```

---

## 注意事项

### ⚠️ 必须注意的点

1. **角色名称一致性**
   - JSON 文件中的 `name` 字段
   - 图片目录名
   - 三者必须完全一致（包括大小写、空格）

2. **图片路径**
   - JSON 中的 `images` 数组只写文件名，不要写路径
   - 系统会自动拼接为：`/assets/{游戏名称}/{角色名称}/{图片文件名}`

3. **JSON 格式**
   - 每个文件必须是数组格式，即使只有一个角色
   - 确保 JSON 格式正确（可以使用在线 JSON 验证工具）

4. **字符编码**
   - 所有文件使用 UTF-8 编码
   - 避免 BOM 头

### ✅ 最佳实践

1. **数据组织**
   - 按技能类型分组排序（投技 → 特殊技 → 必杀技 → 超必杀技）
   - 相同类型的技能按输入复杂度排序

2. **图片优化**
   - 使用图片压缩工具减小文件大小
   - GIF 动图控制在 10 帧左右
   - 建议使用现代格式（WebP）但注意兼容性

3. **描述信息**
   - 在 `description` 中添加关键信息（如：无法防御、浮空效果等）
   - 使用统一的术语和格式

4. **版本控制**
   - 每次更新数据后更新 CHANGELOG.md
   - 使用 Git 提交时写清楚修改内容

---

## 常见问题

### Q: 图片不显示怎么办？

A: 检查以下几点：

1. 图片文件是否存在于正确的目录
2. 文件名是否与 JSON 中完全一致
3. 角色目录名是否与 JSON 的 `name` 字段一致
4. 浏览器控制台是否有 404 错误

### Q: 可以不提供图片吗？

A: 可以，`images` 字段是可选的。如果不提供，可以：

- 完全省略 `images` 字段
- 提供空数组 `"images": []`
- 系统会显示占位图或不显示图片区域

### Q: 支持视频吗？

A: 当前版本不支持视频，建议使用 GIF 动图代替。

### Q: 如何批量生成 JSON 文件？

A: 可以编写脚本从其他数据源（Excel、数据库等）转换。参考脚本示例请查看 `scripts/` 目录。

---

## 相关资源

- [项目主页](https://github.com/ygqygq2/game-skill-sheet)
- [在线演示](https://game-skill-sheet.ygqygq2.com)
- [问题反馈](https://github.com/ygqygq2/game-skill-sheet/issues)

---

**文档版本：** 1.0.0  
**最后更新：** 2025-11-03  
**维护者：** ygqygq2
