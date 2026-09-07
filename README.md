# 写意 Xieyi

> 以意运码，码落而器成。胸中之构，言而为品。

**写意（Xieyi）** 是一个面向 **Vibe Coding** 的参考站点：把"专注产品设计、把实现交给 AI"的理念，落地为可浏览的 **组件库 + 概念库**。

对标 [shadcn/ui](https://ui.shadcn.com)，但示例是 **真实可交互的 shadcn 组件**（而非截图或静态 HTML 片段）——你看到的就是能直接用的代码。

## 特性

- **真实可交互示例**：每个组件 / 概念都附带可直接操作、可直接复制的成品组件，而非文档片段。
- **组件库 + 概念库双轨**：既提供可复用 UI 组件，也沉淀 Vibe Coding 的方法论与概念。
- **现代技术栈**：Next.js 16（App Router）、React 19、Tailwind CSS v4、shadcn/ui（Base UI 底层）。
- **⌘K 命令面板**：内置命令面板，快速检索组件与概念。
- **暗色模式**：基于 CSS 变量的设计令牌体系，支持深浅色切换。

## 技术栈

| 维度 | 选型 |
| --- | --- |
| 框架 | Next.js 16.3.4（App Router + `src/` 目录） |
| UI | React 19.2.8 / react-dom 19.2.8 |
| 语言 | TypeScript ^5 |
| 样式 | Tailwind CSS v4（`tailwindcss` + `@tailwindcss/postcss`） |
| 组件库 | shadcn/ui `^4.19.1`，底层 **Base UI**（非 Radix），风格 `base-nova` |
| 包管理 | pnpm 11.25.0（`package.json` `packageManager` 锁定） |
| 运行时 | Node.js 24（已在 v24.13.0 开发验证，**无 `engines` 硬约束**） |

> 版本以 `package.json` 为准；`packageManager` 字段锁定 pnpm 11.25.0，**推荐使用 pnpm**，不要用 npm / yarn。

## 快速开始

```bash
pnpm install          # 安装依赖（见下方供应链提示）
pnpm run dev          # 开发服务器 → http://localhost:3000
pnpm run build        # 生产构建
pnpm run start        # 启动生产产物
pnpm run lint         # ESLint（当前无 --fix）
```

> ⚠️ **pnpm 供应链提示**：pnpm 11.25 默认启用"最小发布年龄"校验，可能拦截刚发布几天的包（如本项目的 `next@16.3.4`、`lucide-react@1.39.0`），导致 `pnpm install` / `pnpm run dev` 报 supply-chain 策略错误。
> 绕过：`pnpm install --config.minimumReleaseAge=0`（一次性）；或等约 2 天后自动解除。细节见 `docs/.AI/debug-log.md`（BUG-001）。

## 项目结构

```
src/
├── app/                  # App Router 路由
│   ├── page.tsx          # 首页
│   ├── components/       # 组件库浏览
│   ├── concepts/         # 概念库浏览
│   ├── examples/         # 页面级示例
│   ├── resources/        # 资源
│   └── backend/          # 后端相关
├── components/           # 站点级组件
│   ├── site-sidebar.tsx  # 三级导航侧栏
│   ├── site-header.tsx   # 顶栏
│   ├── command-search.tsx# ⌘K 命令面板
│   ├── components-view.tsx# 列表视图
│   ├── theme-provider.tsx# 主题
│   └── ui/               # 16 个 shadcn 组件（Base UI 底层）
├── content/              # 纯数据模块（不在组件内硬编码数据）
│   ├── types.ts          # 数据契约（ComponentItem / Concept 等）
│   ├── components.ts      # 组件数据（67 条）
│   └── concepts.ts       # 概念数据（21 条）
└── lib/
    └── utils.ts          # shadcn `cn` 等工具
```

## 文档导航

| 文档 | 读者 | 内容 |
| --- | --- | --- |
| `README.md` | 人类 / 外部开发者 | 项目说明、技术栈、如何运行 |
| `AGENTS.md` | AI 协作 Agent | 命令、边界、反直觉约定（system prompt，人类无需细读） |
| `docs/.AI/project-progress.md` | Agent | 进度 / 阶段状态 / 下一步 |
| `docs/.AI/decision-log.md` | Agent | 决策记录（DEC-XXX） |
| `docs/.AI/debug-log.md` | Agent | bug 修复经验（BUG-XXX） |

## 项目状态

- **阶段 A（已完成）**：脚手架（Next 16 + React 19 + Tailwind v4 + shadcn/Base UI）、16 个 UI 组件、67 组件 / 21 概念数据、布局 / 侧栏 / ⌘K 搜索。
- **阶段 B（待启动）**：将 HTML 片段示例升级为真实可交互 shadcn 组件；补全 `/examples` 9 个页面级示例。

详见 `docs/.AI/project-progress.md`。

## 贡献

欢迎通过 Issue / PR 参与。协作约定（命令、边界、反直觉约定）见 `AGENTS.md`；Agent 协作时的进度与决策记录见 `docs/.AI/`。

## 许可证

本项目基于 [MIT 许可证](./LICENSE) 开源。
