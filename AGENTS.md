# AGENTS.md · 写意 Xieyi

> 本文件是 Agent 协作契约（命令、边界、约定），非人类手册，仅含 AI 执行所需内容。人类可读背景/如何运行见 `README.md`；项目进度/决策/bug 经验见 `docs/.AI/{project-progress,decision-log,debug-log}.md`。任何规则变更须同步更新并留痕（见「自维护协议」与 `docs/.AI/decision-log.md`）。

## Permissions

IMPORTANT: 以下操作必须先说明目标 / 原因 / 影响 / 低风险替代方案，并等待用户明确确认，方可执行：

- 删除文件、目录或 git 历史。
- 修改 `.env`、密钥、token、账号凭据、CI 配置。
- 数据库 schema 变更、数据迁移、清空或批量改写数据。
- 高风险 git 操作：`git push --force`、`git rebase`、`git reset --hard`。
- 安装全局依赖、修改系统配置、执行管理员权限操作。
- 发布、部署、上传文章 / 视频 / 包等对外生效操作。
- 向外部 API 发起真实付费请求（优先 dry-run / mock / 沙箱）。
- 引入新框架、新运行时、重大第三方依赖，或切换包管理器。

**Git 推送授权（用户 2026-09-13 起长期有效）**：本项目普通 `git push`（非 force，当前分支 → `origin`）无需逐次确认——本地提交的同时即推送到远端；上表所列高风险 git 操作仍须逐次确认。

YOU MUST NOT 在 AGENTS.md 或任何提交文档中写入密钥、凭据、连接串。

YOU MUST 保全既有决策：对既有约定的「改 / 删」必须在 `docs/.AI/decision-log.md` 留痕（旧值 → 处置 → 新值 / 原因），禁止静默丢失。

模糊需求：先给最合理方案并说明可调整点，再执行；不纯以反问导致任务停滞。

## 工具链与精确版本

- Node.js: v24.13.0
- 包管理器: pnpm 11.25.0（`package.json` `packageManager` 字段锁定；默认且唯一，不用 npm / yarn）
- Next.js: 16.3.4（App Router + `src/` 目录）
- React: 19.2.8 / react-dom: 19.2.8
- TypeScript: ^5
- Tailwind CSS: v4（`tailwindcss` ^4 + `@tailwindcss/postcss` ^4）
- shadcn/ui: CLI `shadcn` ^4.19.1，style `base-nova`，底层为 **Base UI**（非 Radix）
- ESLint: ^9（`eslint-config-next` 16.3.4）；lint 无 `--fix`

来源：`package.json`、`components.json`、`pnpm-lock.yaml`。

## 命令表

| 场景         | 命令（原文）     | 来源                                                   |
| ------------ | ---------------- | ------------------------------------------------------ |
| 安装依赖     | `pnpm install`   | package.json `scripts`                                 |
| 开发服务器   | `pnpm run dev`   | package.json `scripts`（监听 http://localhost:3000）   |
| 生产构建     | `pnpm run build` | package.json `scripts`                                 |
| 启动生产产物 | `pnpm run start` | package.json `scripts`                                 |
| Lint         | `pnpm run lint`  | package.json `scripts`（eslint，无 `--fix`）            |

## 反直觉约定

- **shadcn 底层是 Base UI，不是 Radix**：`Sheet` / `Dialog` 等用 `render={<Button .../>}` 写法，而非 Radix 的 `asChild`。给 `Button` 包一层优先用 `buttonVariants({...})` 或 `@base-ui` 的 `render` 属性。
- **组件分类字段是 `cat`，不是 `category`**；数据展示类的 `cat` 值是 `"display"`（不是 `"data-display"`）。新增 / 改组件必须匹配 `ComponentCategory` 联合类型：`layout` / `form` / `navigation` / `display` / `feedback` / `overlay` / `charts` / `chat` / `extra`。
- **`useSearchParams` 必须包在 `<Suspense>` 里**：侧栏 `site-sidebar.tsx` 已在 `layout.tsx` 用 Suspense 包裹；新增依赖 query 的客户端组件也须遵守，否则构建报 "useSearchParams should be wrapped in a suspense"。
- **示例现状（阶段 A 临时）**：`ComponentItem.example` 仍是原始 HTML 字符串，经 `dangerouslySetInnerHTML` 渲染。阶段 B 将重写为真实可交互 shadcn 组件；新增示例不要依赖现有 HTML class。
- **路径别名**：`@/*` → `./src/*`（见 `tsconfig.json`）。组件库统一从 `@/components/ui/*` 引入，**不要手写重复组件**。
- **样式令牌**：Tailwind v4 + shadcn 设计令牌（CSS 变量）。深色经 `html.dark` 切换；颜色一律用 `bg-background` / `text-muted-foreground` 等令牌类，**禁止硬编码 hex**。
- **客户端边界**：交互 / 状态 / 浏览器 API 必须 `"use client"`；布局与纯展示页尽量保留为服务端组件。
- **数据来源**：列表类页面从 `src/content/*` 读取数据，**不要在组件里硬编码数据**。
- **pnpm 供应链策略（环境坑）**：pnpm 11.25 默认 `minimumReleaseAge`（约 2 天）会拒绝安装 / 校验发布不足该时长的包；`pnpm run` / `pnpm exec` 执行前跑 `runDepsStatusCheck`，内部再调 `pnpm install` 且不继承外层 flag / 环境变量，故 `pnpm run dev` / `pnpm run build` 可能被卡。绕过：直接用 `node ./node_modules/next/dist/bin/next dev|build` 不经 pnpm；一次性安装用 `pnpm install --config.minimumReleaseAge=0`。

## 质量与文档指针

- 项目进度 / 阶段状态 / 下一步计划：见 `docs/.AI/project-progress.md`；人类可读背景与愿景见 `README.md`。
- 组件与概念数据契约：`src/content/types.ts`、`src/content/components.ts`、`src/content/concepts.ts`。
- 站点壳与渲染主战场：`src/components/components-view.tsx`、`src/components/site-sidebar.tsx`、`src/components/command-search.tsx`。
- 可用 shadcn 组件：`src/components/ui/*`（16 个）。
- 质量现状：当前无测试套件、无 CI；`README.md` 已替换为项目专属内容（替换原 create-next-app 默认模板）。

## 自维护协议

1. 视 AGENTS.md 为代码：任何改动规则的变更，须在同一 PR / 任务中同步更新，否则视为规则漂移。
2. 就近更新：规则写入错误发生处最近的作用域；monorepo 加到对应子包，不堆根文件。
3. 提交前自检：命令更名、重构、规范变更后核对准确性，有过期示例立即更新。
4. 周期维护：随发布或至少按固定周期审查，清除失效引用、已关闭事项、废弃约定。
5. 变更留痕：AGENTS.md 修改纳入正常 PR / Review，与项目代码同等纪律。
