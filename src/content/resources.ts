// 参考资源：与 AI 沟通组件 / 前后端时，可对照这些资源给出更准确的需求。
// 原则：只收官方站点/文档，不做导航站；每条尽量带「对 AI 说」的可抄话术。

export type ResourceCategory =
  | "组件库"
  | "底层原语"
  | "图标库"
  | "AI 工具"
  | "动画组件"
  | "后端与服务"
  | "学习资料"
  | "社区";

export interface ResourceItem {
  name: string;
  url: string;
  category: ResourceCategory;
  note: string;
  /** 本站在用的技术栈，卡片打「本站同款」标 */
  stack?: boolean;
  /** 对 AI 说：直接可抄的一句话需求示例 */
  ai?: string;
  /** 何时选它：一句话选型理由（竞品对比落在卡片上） */
  when?: string;
  /** 相关阅读：站内概念/词条/板块链接（交叉引用） */
  related?: { href: string; label: string }[];
  /**
   * 显式锚点 id。不填则由 name 生成 slug——但 name 一改锚点就断
   * （侧栏深链跟着断），所以名字含符号/易改名的条目必须显式给出。
   */
  id?: string;
}

// 生成稳定的锚点 id（侧栏三级跳转用），与页面卡片 id 保持一致。
// 显式 id 优先，其次回落 name slug。
export function resourceId(r: ResourceItem): string {
  return r.id ?? r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

// 全部外链最近人工核对时间（只收官方站，仍需定期复核防失效/改版）
export const resourcesCheckedAt = "2026-09";

export const resourceCategories: ResourceCategory[] = [
  "组件库",
  "底层原语",
  "图标库",
  "动画组件",
  "AI 工具",
  "后端与服务",
  "学习资料",
  "社区",
];

export const resourceCategoryMeta: Record<ResourceCategory, string> = {
  组件库: "开箱即用的组件集合",
  底层原语: "无样式原语与样式地基",
  图标库: "统一风格的界面图标集",
  "AI 工具": "用 AI 生成与写码的官方工具",
  动画组件: "带动效的进阶组件与动画库",
  "后端与服务": "灵脉专题对应的官方工具",
  学习资料: "官方文档与区块参考",
  社区: "官方仓库与社区",
};

export const resourceCategoryMetaEn: Record<ResourceCategory, string> = {
  组件库: "Component Libraries",
  底层原语: "Primitives",
  图标库: "Icon Libraries",
  "AI 工具": "AI Tools",
  动画组件: "Animation",
  "后端与服务": "Backend & Services",
  学习资料: "Learning",
  社区: "Community",
};

// 类目引导 + 选型指引（什么场景选什么）
export const resourceCategoryDesc: Record<ResourceCategory, string> = {
  组件库:
    "别人做好的组件直接拿来用，省去从零造轮子。选型：本站练习与个人项目用 shadcn/ui；做企业中后台，参考 Ant Design / Arco 的术语与交互规范；要覆盖面最全选 MUI；Vue 项目对照 Element Plus。",
  底层原语:
    "无样式原语与样式地基，想深度定制外观时从这里打地基。选型：本站用 Base UI + Tailwind；Radix 是 shadcn 早期依赖，其无障碍文档仍常被引用；复杂交互的无障碍处理参考 React Aria。",
  图标库:
    "统一风格的界面图标集，画「搜索、设置、删除」这类小图标时直接查。选型：跟本站用 Lucide；要粗细变化选 Phosphor；要量大且圆润选 HugeIcons；怕中途换库就用 Iconify 聚合。",
  动画组件:
    "带动效的进阶组件与动画库。建议基础页面成型后再来升级：整体动效基础设施用 Framer Motion；现成特效区块看 Magic UI / Aceternity。",
  "AI 工具":
    "官方出品的 AI 生成工具，负责加速出活。对话式写码用 Claude Code / Codex CLI / Cursor；编辑器内补全用 GitHub Copilot；生成 UI 原型用 v0。无论用哪家，先把项目约定写成 AGENTS.md / CLAUDE.md，让工具进场先读规则。",
  "后端与服务":
    "灵脉十个专题对应的官方工具，按需取用：ORM 选 Prisma / Drizzle，登录用 Auth.js，参数校验用 Zod，发邮件用 Resend，缓存用 Upstash Redis，文件存储用 Vercel Blob；部署 Next.js 选 Vercel 零配置，静态/边缘场景选 Cloudflare Pages；数据库托管选 Neon（serverless Postgres）或 Turso（边缘 SQLite）。",
  学习资料:
    "官方文档与区块参考。概念不确定先来这里看权威说法：Web 标准以 MDN 为准，类型问题查 TypeScript Handbook；shadcn Blocks 是官方区块级布局，可直接当页面参考。",
  社区:
    "官方仓库与社区入口。卡住时去 issue 区搜，对设计稿时找官方套件；英文报错搜 Stack Overflow，中文实战看掘金，工具选型讨论看 V2EX。",
};

// 二级分类国风雅称（仅展示层；原始名用分类 key、英文 resourceCategoryMetaEn 不变）
export const resourceCategoryAlias: Record<ResourceCategory, string> = {
  组件库: "百宝",
  底层原语: "法度",
  图标库: "符箓",
  "AI 工具": "灵兵",
  动画组件: "流影",
  "后端与服务": "丹方",
  学习资料: "典册",
  社区: "道场",
};

export const resources: ResourceItem[] = [
  // 组件库
  {
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    category: "组件库",
    note: "复制即用、可深度定制的 React 组件集合，本站组件体系的基础。",
    stack: true,
    ai: "用 shadcn 的 Dialog 组件做一个删除确认弹窗。",
  },
  {
    name: "Ant Design",
    url: "https://ant.design",
    category: "组件库",
    note: "企业级组件库，术语与组件命名对照的权威参考。",
    ai: "用 Ant Design 的 Table 渲染这份数据，要带排序和列筛选。",
  },
  {
    name: "Material UI (MUI)",
    id: "material-ui-mui",
    url: "https://mui.com",
    category: "组件库",
    note: "成熟的 Material Design 实现，组件覆盖度极高。",
    ai: "用 MUI 实现一个带步进器的分步表单页面。",
  },
  {
    name: "Arco Design",
    url: "https://arco.design",
    category: "组件库",
    note: "字节出品的企业级组件库，设计语言偏简洁。",
    ai: "用 Arco Design 的布局组件搭一个后台管理框架。",
  },
  {
    name: "Element Plus",
    url: "https://element-plus.org",
    category: "组件库",
    note: "Vue 生态组件库，跨框架对照时很有用。",
    ai: "用 Element Plus 写一个 Vue 的系统设置表单页。",
  },

  // 底层原语
  {
    name: "Base UI",
    url: "https://base-ui.com",
    category: "底层原语",
    note: "MUI 团队的下一代无样式原语，本项目采用。",
    stack: true,
    ai: "用 Base UI 的 Select 原语实现自定义下拉，样式用 Tailwind 控制。",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    category: "底层原语",
    note: "原子化 CSS 框架，shadcn 的样式基础。",
    stack: true,
    ai: "用 Tailwind 把这个组件改成响应式：移动端单列、桌面端三列。",
  },
  {
    name: "Radix UI",
    url: "https://www.radix-ui.com",
    category: "底层原语",
    note: "shadcn 早期依赖的无样式、可访问性原语。",
    ai: "用 Radix 的 Tabs 原语封装一个自定义选项卡。",
  },
  {
    name: "React Aria",
    url: "https://react-spectrum.adobe.com/react-aria",
    category: "底层原语",
    note: "Adobe 的无障碍交互原语，复杂组件参考。",
    ai: "用 React Aria 的 useFocusRing 处理这个自定义按钮的键盘焦点样式。",
  },

  // 图标库
  {
    name: "Lucide Icons",
    url: "https://lucide.dev",
    category: "图标库",
    note: "本站使用的开源图标库（lucide-react），线形风格统一简洁。",
    stack: true,
    ai: "用 lucide-react 在这个按钮里加一个设置图标。",
  },
  {
    name: "Phosphor Icons",
    url: "https://phosphoricons.com",
    category: "图标库",
    note: "六种粗细一脉相承（thin 到 fill），@phosphor-icons/react 开箱即用。",
    ai: "用 @phosphor-icons/react 替换项目里的图标，统一 thin 风格。",
  },
  {
    name: "HugeIcons",
    url: "https://hugeicons.com",
    category: "图标库",
    note: "四千余套描边图标，风格圆润，免费档即可覆盖常用品类。",
    ai: "从 HugeIcons 挑一组社交图标用在页脚。",
  },
  {
    name: "Iconify",
    url: "https://iconify.design",
    category: "图标库",
    note: "聚合 200+ 图标集的统一 API，中途换库不用改代码。",
    ai: "用 Iconify 在 Vue 项目里引入 logos 集合的 GitHub 图标。",
  },

  // 动画组件
  {
    name: "Framer Motion",
    url: "https://www.framer.com/motion/",
    category: "动画组件",
    note: "React 动画库，本站后续动效的基础设施。",
    ai: "用 Framer Motion 给这个卡片加入场动画：淡入并上移 12px。",
  },
  {
    name: "Magic UI",
    url: "https://magicui.design",
    category: "动画组件",
    note: "在 shadcn 基础上加入动效的组件集合。",
    ai: "用 Magic UI 的 Animated Grid Pattern 给页面背景加纹理。",
  },
  {
    name: "Aceternity UI",
    url: "https://ui.aceternity.com",
    category: "动画组件",
    note: "特效向组件库，适合做有视觉冲击的区块。",
    ai: "用 Aceternity 的 Spotlight 组件做 Hero 区的聚光效果。",
  },

  // AI 工具
  {
    name: "Claude Code",
    url: "https://claude.com/product/claude-code",
    category: "AI 工具",
    note: "终端里的对话式写码智能体，配合 CLAUDE.md 约定工程规范。",
    ai: "（在 Claude Code 里）按 CLAUDE.md 的约定，为这个页面补上单元测试。",
  },
  {
    name: "Cursor",
    url: "https://cursor.com",
    category: "AI 工具",
    note: "AI 优先的代码编辑器，擅长按项目既有风格续写代码。",
    ai: "（在 Cursor 里）参照 components/ 目录的既有风格，新增同类的设置页。",
  },
  {
    name: "v0 by Vercel",
    url: "https://v0.dev",
    category: "AI 工具",
    note: "用自然语言生成 shadcn 组件与页面，适合快速出原型。",
    ai: "（在 v0 里）用 shadcn 生成一个带筛选和分页的用户表格页面。",
  },
  {
    name: "AGENTS.md 规范",
    id: "agents-md",
    url: "https://agents.md",
    category: "AI 工具",
    note: "开源的 Agent 说明文件规范：一份 AGENTS.md 向所有主流编码工具声明项目结构、代码风格与禁忌。本站「约定先行」理念的官方落点，与 CLAUDE.md 内容互通、格式兼容。",
    ai: "参照 agents.md 规范，为这个项目写一份 AGENTS.md：包含目录结构、命名约定和「不要做」清单。",
  },
  {
    name: "Codex CLI",
    url: "https://developers.openai.com/codex/cli",
    category: "AI 工具",
    note: "OpenAI 的终端编码智能体，与 Claude Code 同属「在仓库里干活」的路数，可对照两家对 AGENTS.md 的读取约定。",
    ai: "（在 Codex CLI 里）按 AGENTS.md 的约定重构这个模块，保持对外行为不变，跑完测试再汇报。",
  },
  {
    name: "GitHub Copilot",
    url: "https://github.com/features/copilot",
    category: "AI 工具",
    note: "GitHub 官方 AI 助手，编辑器内逐行补全与对话，适合保留手写习惯、让 AI 打辅助的工作流。",
    ai: "（在 Copilot Chat 里）逐段解释这个正则的含义，并指出可能的回溯性能风险。",
  },

  // 后端与服务
  {
    name: "Prisma",
    url: "https://www.prisma.io/docs",
    category: "后端与服务",
    note: "类型安全的 ORM，schema 即文档，迁移工作流成熟。",
    ai: "用 Prisma 定义 User 和 Post 模型（一对多），并生成迁移。",
  },
  {
    name: "Drizzle ORM",
    url: "https://orm.drizzle.team",
    category: "后端与服务",
    note: "轻量 SQL-like 的 ORM，写法贴近原生 SQL。",
    ai: "用 Drizzle 写 User/Post 一对多关系，并展示等价的原生 SQL。",
  },
  {
    name: "Auth.js",
    url: "https://authjs.dev",
    category: "后端与服务",
    note: "Next.js 生态的登录方案（原 NextAuth），多登录方式插件化。",
    ai: "用 Auth.js 给 Next.js 项目加 GitHub 第三方登录。",
  },
  {
    name: "Zod",
    url: "https://zod.dev",
    category: "后端与服务",
    note: "Schema 校验库，前后端共用同一份入参规则。",
    ai: "用 zod 定义这个注册表单的校验规则，前后端共用。",
  },
  {
    name: "Resend",
    url: "https://resend.com",
    category: "后端与服务",
    note: "开发者友好的邮件发送服务，支持 React 写邮件模板。",
    ai: "用 Resend 发一封注册欢迎邮件，模板用 React 组件写。",
  },
  {
    name: "Upstash Redis",
    url: "https://upstash.com",
    category: "后端与服务",
    note: "Serverless 友好的 Redis，按请求计费，适合缓存与限流。",
    ai: "用 Upstash Redis 给这个接口加 60 秒缓存。",
  },
  {
    name: "Vercel Blob",
    url: "https://vercel.com/docs/vercel-blob",
    category: "后端与服务",
    note: "Vercel 的对象存储，上传文件并返回公开访问链接。",
    ai: "用 Vercel Blob 实现图片上传并返回公开访问链接。",
  },
  // —— 部署平台（对应灵脉·军机·布阵部署）——
  {
    name: "Vercel",
    url: "https://vercel.com",
    category: "后端与服务",
    note: "Next.js 的官方东家，Git 推上去即自动部署，预览环境、Serverless/边缘函数全套自带，Next 项目几乎零配置。",
    ai: "把这个 Next.js 项目部署到 Vercel：告诉我需要配哪些环境变量、哪些文件要改动。",
  },
  {
    name: "Cloudflare Pages",
    id: "cloudflare-pages",
    url: "https://pages.cloudflare.com",
    category: "后端与服务",
    note: "跑在全球边缘节点的部署平台，免费额度慷慨，静态站与全栈（Next/OpenNext）都能放，适合追求访问速度与低成本的场景。",
    ai: "把这个 Next.js 项目改为部署到 Cloudflare Pages（用 OpenNext 适配），列出兼容性风险。",
  },
  {
    name: "Netlify",
    url: "https://www.netlify.com",
    category: "后端与服务",
    note: "老牌部署平台，除常规部署外自带表单接收、定时函数等附加能力，非 Next 项目也可以先看这里。",
    ai: "把这个静态站点部署到 Netlify，并配置每夜构建的定时函数。",
  },
  // —— 数据库托管（ORM 之下还得有个真的库）——
  {
    name: "Neon",
    url: "https://neon.tech",
    category: "后端与服务",
    note: "Serverless Postgres 托管：按用量计费、秒级扩缩，数据库分支可以像代码分支一样开，Prisma/Drizzle 官方均推荐。",
    ai: "把项目接到 Neon 的 Postgres：给出连接串配置和 Prisma datasource 写法。",
  },
  {
    name: "Supabase",
    url: "https://supabase.com",
    category: "后端与服务",
    note: "开源的 Firebase 替代：Postgres 托管打底，鉴权、文件存储、实时订阅一并提供，想一个平台解决多件事时选它。",
    ai: "用 Supabase 给项目加数据表和邮箱登录，前端用它的客户端 SDK 直连。",
  },
  {
    name: "Turso",
    url: "https://turso.tech",
    category: "后端与服务",
    note: "基于 SQLite 的边缘数据库，读副本铺到全球节点，延迟极低；Drizzle 对 SQLite 语法友好，两者常一起出现。",
    ai: "用 Drizzle + Turso 搭一个文章表的最小示例，含建表与查询。",
  },

  // 学习资料
  {
    name: "Next.js 文档",
    url: "https://nextjs.org/docs",
    category: "学习资料",
    note: "本站框架的官方文档，App Router、渲染与部署讲得最透；配套 Learn 免费课程（nextjs.org/learn）。",
    stack: true,
    ai: "按 App Router 官方文档，把这个页面改成服务端数据获取。",
  },
  {
    name: "React 官方",
    url: "https://react.dev",
    category: "学习资料",
    note: "React 概念、Hooks 与最佳实践的权威来源。",
    ai: "按官方文档确认 useEffect 依赖数组的行为，再解释这段代码。",
  },
  {
    name: "shadcn/ui 文档",
    url: "https://ui.shadcn.com/docs",
    category: "学习资料",
    note: "组件用法、主题与安装说明的官方来源。",
    stack: true,
    ai: "按官方文档的 CLI 方式把 Tabs 组件装进项目。",
  },
  {
    name: "Tailwind 文档",
    url: "https://tailwindcss.com/docs",
    category: "学习资料",
    note: "原子类与配置的官方参考。",
    stack: true,
    ai: "查一下 Tailwind 自定义 boxShadow 的配置写法，给卡片加一层柔和投影。",
  },
  {
    name: "shadcn/ui Blocks",
    url: "https://ui.shadcn.com/blocks",
    category: "学习资料",
    note: "官方区块级布局，可直接拼装成完整页面。",
    stack: true,
    ai: "参考官方 Blocks 里的 dashboard 布局，改造成我的项目首页。",
  },
  {
    name: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    category: "学习资料",
    note: "Web 标准（HTML/CSS/JS/DOM）的权威参考，也是 MDN 这个名字的出处。AI 给出的 API 行为先来这里核实，别信口相传。",
    ai: "查一下 MDN 上 Array.prototype.sort 的文档，确认这个排序写法是否稳定，再决定要不要改。",
  },
  {
    name: "TypeScript Handbook",
    id: "typescript-handbook",
    url: "https://www.typescriptlang.org/docs/handbook/",
    category: "学习资料",
    note: "TypeScript 官方手册，类型系统概念（泛型、联合类型、收窄）的标准说法。本站全部代码用 TS 写成，类型报错先对照这里的术语。",
    ai: "按官方 Handbook 里 narrowing 一节的说法，解释这个函数为什么报类型错误，并给两种改法。",
  },
  {
    name: "Can I Use",
    url: "https://caniuse.com",
    category: "学习资料",
    note: "浏览器兼容性查询的权威站，决定一个新 CSS/JS 特性「现在能不能用」之前先查这里。",
    ai: "查一下 CSS 容器查询在各浏览器的支持情况，判断这个项目现在能不能放心用。",
  },
  {
    name: "web.dev",
    url: "https://web.dev",
    category: "学习资料",
    note: "Google 的 Web 最佳实践站，Core Web Vitals（性能三指标）的官方出处，做性能优化时的对照标准。",
    ai: "按 web.dev 的 Core Web Vitals 建议，分析这个页面 LCP 偏慢的原因并给出优化清单。",
  },

  // 社区
  {
    name: "shadcn-ui GitHub",
    url: "https://github.com/shadcn-ui/ui",
    category: "社区",
    note: "源码与社区讨论，遇到问题可查 issue。",
    stack: true,
    ai: "去 issue 区搜 Dialog 在 SSR 下的已知问题，总结 workaround。",
  },
  {
    name: "Figma Community",
    url: "https://www.figma.com/community",
    category: "社区",
    note: "Figma 官方社区，可找到 shadcn 设计套件，便于设计稿对齐。",
    ai: "按这份 Figma 设计稿还原页面，组件尽量用 shadcn。",
  },
  {
    name: "Stack Overflow",
    id: "stack-overflow",
    url: "https://stackoverflow.com",
    category: "社区",
    note: "全球最大的程序员问答社区，英文提问与检索；冷门报错在这里的命中率通常最高。",
    ai: "把这段报错翻译成英文关键词，拟一个 Stack Overflow 搜索式，并列出最可能的三种原因。",
  },
  {
    name: "掘金",
    id: "juejin",
    url: "https://juejin.cn",
    category: "社区",
    note: "中文前端技术社区，实战文章与踩坑记录密度高，适合补中文语境的实践经验。",
    ai: "在掘金搜这个库的实践文章，总结前人普遍踩过的坑，对照检查我的实现。",
  },
  {
    name: "V2EX",
    id: "v2ex",
    url: "https://v2ex.com",
    category: "社区",
    note: "中文开发者社区，按节点划分讨论区，工具选型、工作流类话题的讨论氛围好。",
    ai: "汇总 V2EX 上关于这个工具的讨论帖，归纳大家反映的优点与槽点。",
  },
];

// ===== 交叉引用：藏经阁 → 站内相关（集中维护；label 用「分区雅称·名」） =====
const resourceLinks: Record<string, { href: string; label: string }[]> = {
  "shadcn/ui": [
    { href: "/concepts#component", label: "筑基·组件" },
    { href: "/components", label: "法器·全部组件" },
  ],
  "Base UI": [{ href: "/concepts#component", label: "筑基·组件" }],
  "Tailwind CSS": [
    { href: "/concepts#html-css-js", label: "筑基·HTML/CSS/JS" },
    { href: "/concepts#responsive", label: "筑基·响应式" },
  ],
  "Radix UI": [{ href: "/concepts#component", label: "筑基·组件" }],
  "React Aria": [{ href: "/concepts#component", label: "筑基·组件" }],
  "Framer Motion": [
    { href: "/glossary#visual-transition", label: "玉简·过渡" },
    { href: "/glossary#ui-microinteraction", label: "玉简·微交互" },
  ],
  "Claude Code": [{ href: "/prompts", label: "真言·提示词指南" }],
  Cursor: [{ href: "/prompts", label: "真言·提示词指南" }],
  "v0 by Vercel": [{ href: "/components", label: "法器·前端组件" }],
  Prisma: [
    { href: "/concepts#database", label: "筑基·数据库" },
    { href: "/backend#database", label: "灵脉·仓廪数据库" },
  ],
  "Drizzle ORM": [{ href: "/concepts#database", label: "筑基·数据库" }],
  "Auth.js": [
    { href: "/glossary#auth-login", label: "玉简·登录" },
    { href: "/backend#auth", label: "灵脉·关防鉴权" },
  ],
  Zod: [
    { href: "/glossary#interaction-validation", label: "玉简·表单校验" },
    { href: "/backend#security", label: "灵脉·结界安全" },
  ],
  "Upstash Redis": [
    { href: "/glossary#ops-cache", label: "玉简·缓存" },
    { href: "/backend#cache", label: "灵脉·镜花缓存" },
  ],
  "Vercel Blob": [{ href: "/backend#storage", label: "灵脉·玉匣文件存储" }],
  Vercel: [
    { href: "/concepts#deploy", label: "筑基·部署" },
    { href: "/backend#deploy", label: "灵脉·布阵部署" },
  ],
  "Cloudflare Pages": [
    { href: "/concepts#deploy", label: "筑基·部署" },
    { href: "/backend#deploy", label: "灵脉·布阵部署" },
  ],
  Netlify: [
    { href: "/concepts#deploy", label: "筑基·部署" },
    { href: "/backend#deploy", label: "灵脉·布阵部署" },
  ],
  Neon: [
    { href: "/concepts#database", label: "筑基·数据库" },
    { href: "/backend#database", label: "灵脉·仓廪数据库" },
  ],
  Supabase: [
    { href: "/concepts#database", label: "筑基·数据库" },
    { href: "/backend#database", label: "灵脉·仓廪数据库" },
    { href: "/backend#auth", label: "灵脉·关防鉴权" },
  ],
  Turso: [
    { href: "/concepts#database", label: "筑基·数据库" },
    { href: "/backend#database", label: "灵脉·仓廪数据库" },
  ],
  "AGENTS.md 规范": [{ href: "/prompts", label: "真言·提示词指南" }],
  "Codex CLI": [{ href: "/prompts", label: "真言·提示词指南" }],
  "MDN Web Docs": [{ href: "/concepts#html-css-js", label: "筑基·HTML/CSS/JS" }],
  "Next.js 文档": [
    { href: "/concepts#routing", label: "筑基·路由" },
    { href: "/concepts#deploy", label: "筑基·部署" },
  ],
  "React 官方": [{ href: "/concepts#component", label: "筑基·组件" }],
  "shadcn/ui 文档": [{ href: "/components", label: "法器·前端组件" }],
  "shadcn/ui Blocks": [{ href: "/examples", label: "图卷·页面画廊" }],
};
// ===== 「何时选它」一句话选型理由（集中维护；竞品对比落在卡片上，不再埋进类目描述） =====
const resourceWhen: Record<string, string> = {
  // 组件库
  "shadcn/ui": "组件代码复制进项目、归你所有，要深度定制或跟本站学习就选它",
  "Ant Design": "企业中后台首选，表格与表单的交互规范最成熟",
  "Material UI (MUI)": "要组件覆盖面最全、Material 视觉可接受时选它",
  "Arco Design": "偏好字节系简洁设计语言、中文文档友好时选它",
  "Element Plus": "Vue 项目选它，也可跨框架对照组件术语",
  // 底层原语
  "Base UI": "最新一代无样式原语，新项目直接从这里起",
  "Tailwind CSS": "AI 生成原子类最顺，改样式不用在文件间跳",
  "Radix UI": "老项目仍在用；其无障碍文档仍常被引用",
  "React Aria": "复杂交互的无障碍处理拿不准时查它",
  // 图标库
  "Lucide Icons": "线形风格统一、开箱即用，跟本站就选它",
  "Phosphor Icons": "要同一套图标的多档粗细变化时选它",
  HugeIcons: "要量大且风格圆润，免费档即可覆盖常用品类",
  Iconify: "怕中途换图标库，用聚合层兜底",
  // 动画组件
  "Framer Motion": "动画基础设施，入场/手势/布局动画一肩挑",
  "Magic UI": "shadcn 体系内要现成动效区块时选它",
  "Aceternity UI": "要视觉冲击力强的特效区块时选它",
  // AI 工具
  "Claude Code": "终端里的主力智能体，适合大重构与多文件改动",
  Cursor: "喜欢在编辑器里对话、按既有风格续写时选它",
  "v0 by Vercel": "几分钟出 shadcn 页面原型再回来微调",
  "AGENTS.md 规范": "任何 AI 工具进场之前，先立好项目规矩",
  "Codex CLI": "OpenAI 系工作流，或想对照两家终端智能体差异",
  "GitHub Copilot": "保留手写习惯，让 AI 逐行打辅助",
  // 后端与服务
  Prisma: "重数据建模与迁移工作流，schema 即文档",
  "Drizzle ORM": "熟悉 SQL、想要更轻的运行时选它",
  "Auth.js": "Next.js 生态接第三方登录的标准答案",
  Zod: "前后端共用同一份入参校验规则",
  Resend: "用 React 组件写邮件模板，开发者体验好",
  "Upstash Redis": "serverless 项目加缓存/限流，按请求计费",
  "Vercel Blob": "Vercel 项目里最省事的文件存储",
  Vercel: "Next.js 项目部署的默认答案，几乎零配置",
  "Cloudflare Pages": "要边缘网络速度与慷慨的免费额度",
  Netlify: "非 Next 项目，或要表单/定时函数等附加能力",
  Neon: "serverless Postgres，还能像代码一样开分支",
  Supabase: "想一个平台同时拿到数据库+鉴权+存储",
  Turso: "边缘 SQLite，读多写少场景延迟极低",
  // 学习资料
  "Next.js 文档": "App Router 的一切以此为准",
  "React 官方": "Hooks 与渲染行为的最终解释权在这",
  "shadcn/ui 文档": "组件安装与主题定制照着做",
  "Tailwind 文档": "原子类与配置查这里",
  "shadcn/ui Blocks": "页面级布局直接抄官方成品",
  "MDN Web Docs": "Web 标准 API 行为的原产地",
  "TypeScript Handbook": "类型概念的标准说法",
  "Can I Use": "新特性上线前先查浏览器兼容性",
  "web.dev": "性能优化对照 Core Web Vitals",
  // 社区
  "shadcn-ui GitHub": "搜 issue、提 bug 的第一现场",
  "Figma Community": "对设计稿时找官方 shadcn 套件",
  "Stack Overflow": "英文报错关键词搜索命中率高",
  掘金: "中文实战文章与踩坑记录最密",
  V2EX: "中文工具选型与工作流讨论氛围好",
};

for (const r of resources) {
  const links = resourceLinks[r.name];
  if (links) r.related = links;
  const when = resourceWhen[r.name];
  if (when) r.when = when;
}
