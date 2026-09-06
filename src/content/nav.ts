// 菜单树单一真源：侧栏（site-sidebar.tsx）与全站搜索共用，
// 保证导航与搜索永不漂移。节点字段语义见 sidebar-tree.tsx 的 TreeNode。
import type { TreeNode } from "@/components/sidebar-tree";
import {
  componentCategories,
  componentCategoryMeta,
  componentCategoryMetaEn,
  componentCategoryAlias,
  componentsByCategory,
} from "@/content/components";
import {
  concepts,
  conceptGroups,
  conceptGroupMeta,
  conceptGroupMetaEn,
  conceptGroupAlias,
} from "@/content/concepts";
import { promptLibrary, promptOriginGroups } from "@/content/prompt-library";
import {
  resources,
  resourceCategories,
  resourceCategoryMetaEn,
  resourceCategoryAlias,
  resourceId,
} from "@/content/resources";
import {
  backendTopics,
  backendTopicMetaEn,
  backendTopicAlias,
} from "@/content/backend";
import {
  pageExamples,
  exampleCatMeta,
  exampleCatMetaEn,
  exampleCatAlias,
  exampleCatOrder,
  exampleCatMap,
  shellOverviewOrder,
} from "@/components/examples/pages";
import {
  frameworks,
  frameworkGroups,
  frameworkGroupMeta,
  frameworkGroupMetaEn,
  frameworkGroupAlias,
} from "@/content/frameworks";
import {
  glossary,
  glossaryCategoryOrder,
  glossaryCategoryMeta,
  glossaryCategoryAlias,
} from "@/content/glossary";
import {
  Activity,
  ArrowLeftRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  BookOpen,
  Bot,
  Boxes,
  Brain,
  BrainCircuit,
  Braces,
  Brush,
  CalendarClock,
  ChartPie,
  Clapperboard,
  Compass,
  Component,
  Database,
  Feather,
  FileText,
  FlaskConical,
  Flame,
  Gauge,
  Globe,
  GraduationCap,
  Grid3x3,
  Hammer,
  HardDrive,
  Images,
  KeyRound,
  Landmark,
  LayoutDashboard,
  LayoutTemplate,
  Library,
  LockKeyhole,
  MessageSquare,
  MessagesSquare,
  Monitor,
  Network,
  Package,
  Palette,
  PanelsTopLeft,
  PenTool,
  Pointer,
  RefreshCw,
  Rocket,
  ScrollText,
  Server,
  Shapes,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  SquareStack,
  Sticker,
  Swords,
  Table,
  TextCursorInput,
  Timer,
  Type,
  Users,
  Waves,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** 菜单徽章：一级/二级各挂一个贴合语义的 Lucide 图标 */
export const topLevelIcons: Record<string, LucideIcon> = {
  home: Landmark,
  concepts: BookOpen,
  prompts: Sparkles,
  examples: Images,
  glossary: ScrollText,
  frameworks: Boxes,
  components: Component,
  backend: Activity,
  resources: Library,
};

const conceptGroupIcons: Record<string, LucideIcon> = {
  ai: Brain,
  dev: Hammer,
  web: Globe,
};

const promptOriginIcons: Record<string, LucideIcon> = {
  official: BadgeCheck,
  web: Feather,
  own: Flame,
};

const exampleCatIcons: Record<string, LucideIcon> = {
  shell: LayoutDashboard,
  feedback: BellRing,
  lists: Table,
  metrics: BarChart3,
  activity: Waves,
};

const glossaryCategoryIcons: Record<string, LucideIcon> = {
  layout: LayoutTemplate,
  visual: Palette,
  responsive: Smartphone,
  interaction: Pointer,
  "ui-style": Brush,
  typography: Type,
  "dev-process": Workflow,
  ops: Wrench,
  "page-section": PanelsTopLeft,
  content: FileText,
  "auth-state": KeyRound,
  "ai-prompt": Bot,
  performance: Gauge,
  security: ShieldCheck,
};

const frameworkGroupIcons: Record<string, LucideIcon> = {
  frontend: PenTool,
  fullstack: RefreshCw,
  backend: Server,
  edge: Zap,
  ai: BrainCircuit,
};

const componentCategoryIcons: Record<string, LucideIcon> = {
  layout: Grid3x3,
  form: TextCursorInput,
  navigation: Compass,
  display: Monitor,
  feedback: MessageSquare,
  overlay: SquareStack,
  charts: ChartPie,
  chat: MessagesSquare,
  extra: Shapes,
};

const backendTopicIcons: Record<string, LucideIcon> = {
  structure: Network,
  api: ArrowLeftRight,
  database: Database,
  cache: Timer,
  storage: HardDrive,
  auth: LockKeyhole,
  security: Shield,
  env: SlidersHorizontal,
  jobs: CalendarClock,
  deploy: Rocket,
};

const resourceCategoryIcons: Record<string, LucideIcon> = {
  组件库: Package,
  底层原语: Braces,
  图标库: Sticker,
  动画组件: Clapperboard,
  "AI 工具": Swords,
  "后端与服务": FlaskConical,
  学习资料: GraduationCap,
  社区: Users,
};

/** 顶点板块（一级）元信息：供搜索的板块徽章与快捷入口复用 */
export const navSections: {
  id: string;
  label: string;
  en: string;
  href: string;
  icon: LucideIcon;
}[] = [
  { id: "home", label: "山门", en: "Home", href: "/", icon: topLevelIcons.home },
  { id: "concepts", label: "筑基", en: "Concepts", href: "/concepts", icon: topLevelIcons.concepts },
  { id: "prompts", label: "真言", en: "Prompt Guide", href: "/prompts", icon: topLevelIcons.prompts },
  { id: "examples", label: "图卷", en: "Page Gallery", href: "/examples", icon: topLevelIcons.examples },
  { id: "glossary", label: "玉简", en: "Glossary", href: "/glossary", icon: topLevelIcons.glossary },
  { id: "frameworks", label: "阵法", en: "Frameworks", href: "/frameworks", icon: topLevelIcons.frameworks },
  { id: "components", label: "法器", en: "Components", href: "/components", icon: topLevelIcons.components },
  { id: "backend", label: "灵脉", en: "Backend", href: "/backend", icon: topLevelIcons.backend },
  { id: "resources", label: "藏经阁", en: "Resources", href: "/resources", icon: topLevelIcons.resources },
];

/**
 * 构建菜单树（一级标题即可展开/收起，后端相关/参考资源/示例一并纳入）。
 * id 一律加分区前缀，避免跨板块撞车（见 scripts/audit-sidebar-ids.mjs）。
 */
export function navNodes(): TreeNode[] {
  return [
    { id: "home", label: "山门", icon: topLevelIcons.home, tooltip: "首页 Home", href: "/", route: "/" },
    {
      id: "concepts",
      label: "筑基",
      icon: topLevelIcons.concepts,
      tooltip: "基础概念 Concepts",
      href: "/concepts",
      route: "/concepts",
      count: concepts.length,
      children: conceptGroups.map((g) => ({
        id: `concepts-${g}`,
        icon: conceptGroupIcons[g],
        label: conceptGroupAlias[g],
        tooltip: `${conceptGroupMeta[g]} ${conceptGroupMetaEn[g]}`,
        route: "/concepts",
        href: `/concepts#${g}`,
        spyGroup: g,
        count: concepts.filter((c) => c.group === g).length,
        children: concepts
          .filter((c) => c.group === g)
          .map((c) => ({
            id: `concepts-${c.id}`,
            label: c.nameZh,
            en: c.nameEn,
            route: "/concepts",
            href: `/concepts#${c.id}`,
            spyItem: c.id,
          })),
      })),
    },
    {
      id: "prompts",
      label: "真言",
      icon: topLevelIcons.prompts,
      tooltip: "提示词指南 Prompt Guide",
      href: "/prompts",
      route: "/prompts",
      count: promptLibrary.length,
      children: promptOriginGroups.map((g) => ({
        id: `prompts-${g.id}`,
        icon: promptOriginIcons[g.id],
        label: g.alias,
        tooltip: `${g.name} ${g.en}`,
        route: "/prompts",
        href: `/prompts#${g.id}`,
        spyGroup: g.id,
        count:
          promptLibrary.filter((p) => (p.origin ?? "official") === g.id)
            .length || undefined,
      })),
    },
    {
      id: "examples",
      label: "图卷",
      icon: topLevelIcons.examples,
      tooltip: "页面画廊 Page Gallery",
      href: "/examples",
      route: "/examples",
      count: pageExamples.length,
      children: exampleCatOrder.map((cat) => {
        const items = pageExamples.filter(
          (e) => exampleCatMap[e.id] === cat,
        );
        // 应用骨架分组把布局总览排在最前
        if (cat === "shell") {
          items.sort((a, b) => {
            const ia = shellOverviewOrder.indexOf(a.id as typeof shellOverviewOrder[number]);
            const ib = shellOverviewOrder.indexOf(b.id as typeof shellOverviewOrder[number]);
            if (ia !== -1 && ib !== -1) return ia - ib;
            if (ia !== -1) return -1;
            if (ib !== -1) return 1;
            return 0;
          });
        }
        return {
          id: `examples-${cat}`,
          icon: exampleCatIcons[cat],
          label: exampleCatAlias[cat],
          tooltip: `${exampleCatMeta[cat]} ${exampleCatMetaEn[cat]}`,
          route: "/examples",
          href: `/examples#${cat}`,
          spyGroup: cat,
          count: items.length,
          children: items.map((e) => ({
            id: `examples-${e.id}`,
            label: e.title,
            en: e.nameEn,
            route: "/examples",
            href: `/examples#${e.id}`,
            spyItem: e.id,
          })),
        };
      }),
    },
    {
      id: "glossary",
      label: "玉简",
      icon: topLevelIcons.glossary,
      tooltip: "词典 Glossary",
      href: "/glossary",
      route: "/glossary",
      count: glossary.length,
      children: glossaryCategoryOrder.map((g) => ({
        id: `glossary-${g}`,
        icon: glossaryCategoryIcons[g],
        label: glossaryCategoryAlias[g],
        tooltip: `${glossaryCategoryMeta[g].zh} ${glossaryCategoryMeta[g].en}`,
        route: "/glossary",
        href: `/glossary#${g}`,
        spyGroup: g,
        count: glossary.filter((t) => t.category === g).length,
      })),
    },
    {
      id: "frameworks",
      label: "阵法",
      icon: topLevelIcons.frameworks,
      tooltip: "框架 Frameworks",
      href: "/frameworks",
      route: "/frameworks",
      count: frameworks.length,
      children: frameworkGroups.map((g) => ({
        // id 加前缀避免与一级「灵脉」(id: backend) 撞车——
        // 侧栏 nodeById/openSet 均按 id 索引，重复 id 会导致高亮/展开串节点。
        // 锚点定位走 href 的 hash，不依赖 node.id。
        id: `frameworks-${g}`,
        icon: frameworkGroupIcons[g],
        label: frameworkGroupAlias[g],
        tooltip: `${frameworkGroupMeta[g]} ${frameworkGroupMetaEn[g]}`,
        route: "/frameworks",
        href: `/frameworks#${g}`,
        spyGroup: g,
        count: frameworks.filter((f) => f.group === g).length,
        children: frameworks
          .filter((f) => f.group === g)
          .map((f) => ({
            id: f.id,
            label: f.name,
            en: f.nameEn,
            route: "/frameworks",
            href: `/frameworks#${f.id}`,
            spyItem: f.id,
          })),
      })),
    },
    {
      id: "components",
      label: "法器",
      icon: topLevelIcons.components,
      tooltip: "前端组件 Components",
      href: "/components",
      route: "/components",
      count: componentCategories.reduce(
        (s, c) => s + componentsByCategory(c).length,
        0
      ),
      children: componentCategories.map((cat) => ({
        id: `components-${cat}`,
        icon: componentCategoryIcons[cat],
        label: componentCategoryAlias[cat],
        tooltip: `${componentCategoryMeta[cat]} ${componentCategoryMetaEn[cat]}`,
        route: "/components",
        href: `/components?cat=${cat}`,
        spyGroup: cat,
        count: componentsByCategory(cat).length,
        children: componentsByCategory(cat).map((c) => ({
          id: `components-${cat}-${c.nameEn}`,
          label: c.nameZh,
          en: c.nameEn,
          route: "/components",
          href: `/components?cat=${cat}#${c.nameEn}`,
          spyItem: c.nameEn,
        })),
      })),
    },
    {
      id: "backend",
      label: "灵脉",
      icon: topLevelIcons.backend,
      tooltip: "后端相关 Backend",
      href: "/backend",
      route: "/backend",
      count: backendTopics.length,
      children: backendTopics.map((t) => ({
        id: `backend-${t.id}`,
        icon: backendTopicIcons[t.id],
        label: backendTopicAlias[t.id],
        tooltip: `${t.name} ${backendTopicMetaEn[t.id]}`,
        route: "/backend",
        href: `/backend#${t.id}`,
        spyGroup: t.id,
      })),
    },
    {
      id: "resources",
      label: "藏经阁",
      icon: topLevelIcons.resources,
      tooltip: "参考资源 Resources",
      href: "/resources",
      route: "/resources",
      count: resources.length,
      children: resourceCategories.map((cat) => ({
        id: `resources-${cat}`,
        icon: resourceCategoryIcons[cat],
        label: resourceCategoryAlias[cat],
        tooltip: `${cat} ${resourceCategoryMetaEn[cat]}`,
        route: "/resources",
        href: `/resources#${cat}`,
        spyGroup: cat,
        count: resources.filter((r) => r.category === cat).length,
        children: resources
          .filter((r) => r.category === cat)
          .map((r) => {
            const rid = resourceId(r);
            return {
              id: `resources-${rid}`,
              label: r.name,
              route: "/resources",
              href: `/resources#${rid}`,
              spyItem: rid,
            };
          }),
      })),
    },
  ];
}

/** 把菜单树摊平为一层（供搜索索引）：带上所属板块与面包屑路径。 */
export function flattenNav(): {
  id: string;
  label: string;
  en?: string;
  href: string;
  icon?: LucideIcon;
  tooltip?: string;
  section: string;
  sectionLabel: string;
  path: string[];
}[] {
  const out: {
    id: string;
    label: string;
    en?: string;
    href: string;
    icon?: LucideIcon;
    tooltip?: string;
    section: string;
    sectionLabel: string;
    path: string[];
  }[] = [];
  const walk = (
    nodes: TreeNode[],
    section: string,
    sectionLabel: string,
    path: string[]
  ) => {
    for (const n of nodes) {
      out.push({
        id: n.id,
        label: n.label,
        en: n.en,
        href: n.href ?? "/",
        icon: n.icon,
        tooltip: n.tooltip,
        section,
        sectionLabel,
        path: [...path, n.label],
      });
      if (n.children) walk(n.children, section, sectionLabel, [...path, n.label]);
    }
  };
  for (const node of navNodes()) {
    const meta = navSections.find((s) => s.id === node.id);
    out.push({
      id: node.id,
      label: node.label,
      href: node.href ?? "/",
      icon: node.icon,
      tooltip: node.tooltip,
      section: node.id,
      sectionLabel: meta?.label ?? node.label,
      path: [node.label],
    });
    if (node.children) walk(node.children, node.id, meta?.label ?? node.label, [node.label]);
  }
  return out;
}
