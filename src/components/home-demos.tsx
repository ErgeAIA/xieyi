"use client";

import * as React from "react";
import { Mail, LayoutDashboard, TrendingUp, Component, Sparkles, MessagesSquare, BookOpen, Settings, PanelLeft, Bell, Plus, Globe, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CopyBlock } from "@/components/copy-block";
import { cn } from "@/lib/utils";

/* 品牌图标：lucide 已弃用品牌 logo，此处内联 SVG（fill=currentColor 继承文字色，跟随主题）。 */
function BilibiliIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z" />
    </svg>
  );
}

function WechatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
    </svg>
  );
}

type SocialHref = {
  key: string;
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};
type SocialCopy = {
  key: string;
  label: string;
  value: string;
  Icon: React.ComponentType<{ className?: string }>;
};
type Social = SocialHref | SocialCopy;

const SOCIALS: Social[] = [
  { key: "bilibili", label: "B站", href: "https://space.bilibili.com/67221461", Icon: BilibiliIcon },
  { key: "wechat", label: "公众号", value: "ErgeAIA", Icon: WechatIcon },
  { key: "github", label: "GitHub", href: "https://github.com/ErgeAIA", Icon: GithubIcon },
  { key: "email", label: "邮箱", href: "mailto:ergeaia@agent.qq.com", Icon: Mail },
];

const PROJECTS = [
  { name: "ErgeMD", desc: "Markdown 阅读桌面应用", href: "https://github.com/ErgeAIA/ErgeMD" },
  { name: "ErgeHash", desc: "文件哈希校验工具", href: "https://github.com/ErgeAIA/ErgeHash" },
  { name: "AI Vault", desc: "超强本地AI中枢", href: "https://ergeaia.github.io/aivault-site" },
];

/** Hero 右侧作者名片：头像 + 身份 + 社交 + 精选项目。 */
export function HomeAuthorCard() {
  const [copied, setCopied] = React.useState(false);
  const [egg, setEgg] = React.useState(false);

  const copyWechat = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText("ErgeAIA");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 复制失败静默处理 */
    }
  }, []);

  return (
    <div className="relative rounded-xl border border-white/15 bg-card/45 p-4 shadow-sm backdrop-blur-md md:p-5 dark:border-white/10 dark:bg-card/30">
      <button
        type="button"
        onClick={() => setEgg((v) => !v)}
        aria-label="一个小彩蛋"
        title="发现一个小彩蛋"
        className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full text-xs text-muted-foreground/50 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        ✦
      </button>
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        在下 · AUTHOR
      </p>

      <div className="mt-3 flex items-center gap-3">
        <img
          src="https://github.com/ErgeAIA.png"
          alt="宝藏二哥AIA 头像"
          className="size-14 rounded-full border border-border/60"
        />
        <div className="min-w-0">
          <div className="truncate text-base font-semibold leading-tight">宝藏二哥AIA</div>
          <div className="truncate text-sm text-muted-foreground">ErgeAIA</div>
          <div className="truncate text-xs text-muted-foreground">朝闻道，夕折腾矣</div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge variant="secondary">独立开发者</Badge>
        <Badge variant="secondary">全栈工程师</Badge>
        <Badge variant="secondary">Vibe Coding</Badge>
        <Badge variant="secondary">散修</Badge>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        道不藏私，功法无偿
      </p>

      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          egg ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <p className="overflow-hidden text-xs italic leading-relaxed text-muted-foreground/90">
          “出门在外，身份都是自己给的”
        </p>
      </div>

      <Separator className="my-4" />

      <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        道果 · WORKS
      </div>
      <ul className="mt-2 space-y-0.5">
        {PROJECTS.map((p) => (
          <li key={p.name}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-muted/50"
            >
              <span className="font-mono text-sm">{p.name}</span>
              <span className="truncate text-xs text-muted-foreground">{p.desc}</span>
            </a>
          </li>
        ))}
        <li>
          <a
            href="https://github.com/ErgeAIA"
            target="_blank"
            rel="noreferrer"
            className="block rounded-md px-2 py-1.5 text-sm text-primary transition-colors hover:bg-muted/50"
          >
            更多项目 →
          </a>
        </li>
      </ul>

      <Separator className="my-4" />

      <div className="flex flex-wrap items-center justify-center gap-3">
        {SOCIALS.map((s) => {
          const brandColors: Record<string, string> = {
            bilibili: "bg-[#FB7299]",
            wechat: "bg-[#07C160]",
            github: "bg-[#6B7280]",
            email: "bg-[#EA4335]",
          };
          const brandBg = brandColors[s.key] ?? "bg-primary";
          const triggerClass =
            "group relative flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-card text-foreground shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

          const content = (
            <>
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-0 w-full rounded-full transition-all duration-300 ease-out group-hover:h-full",
                  brandBg,
                )}
                aria-hidden="true"
              />
              <s.Icon className="relative size-5 transition-colors duration-300 group-hover:text-white" />
              <span
                className={cn(
                  "pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] text-white transition-transform duration-200 group-hover:scale-100",
                  brandBg,
                )}
              >
                {s.key === "wechat" ? (copied ? "已复制" : s.label) : s.label}
              </span>
            </>
          );

          return "href" in s ? (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className={triggerClass}
            >
              {content}
            </a>
          ) : (
            <button
              key={s.key}
              type="button"
              onClick={copyWechat}
              title="点击复制公众号 ErgeAIA"
              aria-label={s.label}
              className={triggerClass}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const STATUS: { key: "进行中" | "草稿" | "已归档"; badge: "default" | "secondary" | "outline" }[] = [
  { key: "进行中", badge: "default" },
  { key: "草稿", badge: "secondary" },
  { key: "已归档", badge: "outline" },
];

const NAV: {
  title: string;
  items: { label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[];
}[] = [
  {
    title: "工作台",
    items: [
      { label: "概览", icon: LayoutDashboard },
      { label: "数据分析", icon: TrendingUp },
    ],
  },
  {
    title: "内容",
    items: [
      { label: "组件", icon: Component, badge: 28 },
      { label: "示例", icon: Sparkles },
      { label: "提示词指南", icon: MessagesSquare, badge: 52 },
      { label: "资源", icon: BookOpen },
    ],
  },
  { title: "系统", items: [{ label: "设置", icon: Settings }] },
];

const STATS = [
  { label: "组件总数", value: "28" },
  { label: "本周新增", value: "4" },
  { label: "待审核", value: "2" },
];

const ROWS = [
  { name: "Button 按钮", status: "已发布" },
  { name: "Dialog 对话框", status: "已发布" },
  { name: "Accordion 手风琴", status: "审核中" },
  { name: "Calendar 日历", status: "草稿" },
];

const STATUS_VARIANT = (s: string) =>
  s === "已发布" ? "default" : s === "审核中" ? "secondary" : "outline";

type ElsState = {
  search: boolean;
  notify: boolean;
  stats: boolean;
  sidebarBadge: boolean;
  userbar: boolean;
  breadcrumb: boolean;
};

const ELEMENT_TOGGLES: { key: keyof ElsState; label: string }[] = [
  { key: "search", label: "顶栏搜索框" },
  { key: "notify", label: "通知红点" },
  { key: "stats", label: "指标卡区" },
  { key: "sidebarBadge", label: "侧栏徽标" },
  { key: "userbar", label: "底部用户条" },
  { key: "breadcrumb", label: "面包屑" },
];

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            buttonVariants({
              size: "sm",
              variant: value === o.value ? "default" : "outline",
            }),
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** 首页组件速览：项目卡片生成器（连通迷你 Demo）。
 *  控制区（项目名 / 描述 / 公开 / 状态 / 主题色 / 圆角 / 密度 / 导航样式 / 显示元素）实时联动右侧应用壳预览，提示词在预览区下方。 */
export function HomeBento() {
  const [name, setName] = React.useState("写意组件库");
  const [desc, setDesc] = React.useState("用意图写代码，码落而器成");
  const [isPublic, setIsPublic] = React.useState(true);
  const [status, setStatus] = React.useState<"进行中" | "草稿" | "已归档">("进行中");
  const [accentIdx, setAccentIdx] = React.useState(0);
  const [radius, setRadius] = React.useState<"sharp" | "round" | "pill">("round");
  const [density, setDensity] = React.useState<"comfortable" | "compact">("comfortable");
  const [navStyle, setNavStyle] = React.useState<"icon" | "icon-text" | "text">("icon-text");
  const [current, setCurrent] = React.useState("概览");
  const [collapsed, setCollapsed] = React.useState(false);
  const [els, setEls] = React.useState<ElsState>({
    search: true,
    notify: true,
    stats: true,
    sidebarBadge: true,
    userbar: true,
    breadcrumb: true,
  });
  const [toastMsg, setToastMsg] = React.useState<string | null>(null);
  const triggerToast = React.useCallback((msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg(null), 2600);
  }, []);

  const accent = `var(--chart-${accentIdx + 1})`;
  const statusBadge = STATUS.find((s) => s.key === status)!.badge;

  const rCard = radius === "sharp" ? "rounded-none" : radius === "pill" ? "rounded-2xl" : "rounded-lg";
  const rBtn = radius === "sharp" ? "rounded-none" : radius === "pill" ? "rounded-full" : "rounded-md";
  const tight = density === "compact";
  const mainPad = tight ? "p-2" : "p-3";
  const gapMain = tight ? "gap-2" : "gap-3";
  const navY = tight ? "py-1" : "py-1.5";
  const rowY = tight ? "py-1" : "py-1.5";
  const statP = tight ? "p-1.5" : "p-2";
  const barH = tight ? "h-9" : "h-10";
  const listHeadY = tight ? "py-1" : "py-1.5";
  const showIcon = navStyle !== "text";
  const showLabel = navStyle !== "icon";

  const prompt = `用 shadcn 组件做一个「${name || "项目名"}」的应用骨架：侧边栏在左的分组导航（${
    navStyle === "icon" ? "仅图标" : navStyle === "text" ? "仅文字" : "图标+文字"
  }、含当前项高亮）、顶栏${
    els.breadcrumb ? "面包屑+" : ""
  }${els.search ? "搜索+" : ""}${els.notify ? "通知" : ""}、内容区含标题(「${
    desc || ""
  }」)+主操作按钮、${els.stats ? "3 张指标卡、" : ""}组件列表（带状态徽章）；${
    isPublic ? "公开" : "私有"
  }访问，项目状态「${status}」，主色跟随主题色（第 ${
    accentIdx + 1
  } 套），圆角${radius === "sharp" ? "直角" : radius === "pill" ? "胶囊" : "圆润"}、密度${
    tight ? "紧凑" : "宽松"
  }；通知铃铛点击弹出 toast「你好，天才程序员！」。所有交互元素可点击。`;

  return (
    <div className="rounded-xl border bg-card/40 p-5 md:p-6">
      <div className="grid gap-6 md:grid-cols-[1fr_1.618fr]">
        {/* 控制区：你的"描述" —— 每个控件实时驱动右侧预览 */}
        <div className="space-y-4">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            控制区 · CONTROLS
          </p>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium" htmlFor="builder-name">
                项目名
              </label>
              <Input
                id="builder-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="项目名"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium" htmlFor="builder-desc">
                项目描述
              </label>
              <Input
                id="builder-desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="一句话描述"
              />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-medium">显示元素</span>
              <div className="grid grid-cols-3 gap-1.5">
                {ELEMENT_TOGGLES.map((t) => (
                  <label
                    key={t.key}
                    className="flex items-center justify-between gap-2 rounded-md border px-2 py-1.5 text-xs"
                  >
                    <span className="truncate">{t.label}</span>
                    <Switch
                      checked={els[t.key]}
                      onCheckedChange={(v) => setEls((e) => ({ ...e, [t.key]: !!v }))}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-medium">主题色</span>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAccentIdx(i)}
                    aria-label={`主题色 ${i + 1}`}
                    className={cn(
                      "size-7 rounded-full ring-offset-2 ring-offset-background transition",
                      accentIdx === i && "ring-2 ring-primary",
                    )}
                    style={{ backgroundColor: `var(--chart-${i + 1})` }}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <span className="text-xs font-medium">圆角</span>
                <Segmented
                  value={radius}
                  onChange={setRadius}
                  options={[
                    { value: "sharp", label: "直角" },
                    { value: "round", label: "圆润" },
                    { value: "pill", label: "胶囊" },
                  ]}
                />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-medium">密度</span>
                <Segmented
                  value={density}
                  onChange={setDensity}
                  options={[
                    { value: "comfortable", label: "宽松" },
                    { value: "compact", label: "紧凑" },
                  ]}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-medium">导航样式</span>
              <Segmented
                value={navStyle}
                onChange={setNavStyle}
                options={[
                  { value: "icon", label: "仅图标" },
                  { value: "icon-text", label: "图标+文字" },
                  { value: "text", label: "仅文字" },
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <span className="text-xs font-medium">状态</span>
                <div className="flex flex-wrap gap-2">
                  {STATUS.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setStatus(s.key)}
                      className={cn(
                        buttonVariants({
                          size: "sm",
                          variant: status === s.key ? "default" : "outline",
                        }),
                      )}
                    >
                      {s.key}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium">公开</span>
                <span className="flex min-h-[36px] flex-1 items-center justify-between gap-2 rounded-md border px-3 py-2 text-xs">
                  <span className="text-muted-foreground">任何人可访问</span>
                  <Switch checked={isPublic} onCheckedChange={(v) => setIsPublic(!!v)} />
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* 实时预览：一个完整的应用壳，跟随上方所有控件实时变化 */}
        <div className="space-y-3">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            实时预览 · PREVIEW
          </p>
          <div className="relative overflow-hidden rounded-xl border bg-card/60">
            <div className="h-1.5 w-full" style={{ backgroundColor: accent }} />
            <div className="flex h-[384px] text-xs">
              {/* 侧边栏 */}
              <aside
                className={cn(
                  "hidden shrink-0 flex-col border-r bg-muted/30 transition-[width] duration-200 sm:flex",
                  collapsed ? "w-12" : "w-40",
                )}
              >
                <div
                  className={cn(
                    "flex h-10 items-center border-b px-3",
                    collapsed ? "justify-center px-0" : "justify-between",
                  )}
                >
                  {collapsed ? (
                    <span className="flex size-6 items-center justify-center rounded bg-primary/10 text-[10px] font-semibold text-primary">
                      写
                    </span>
                  ) : (
                    <span className="truncate font-semibold">{name || "项目名"}</span>
                  )}
                </div>
                {!collapsed && els.sidebarBadge && (
                  <div className="flex items-center gap-1.5 border-b px-3 py-2">
                    <Badge variant={statusBadge} className="text-[10px]">
                      {status}
                    </Badge>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      {isPublic ? <Globe className="size-3" /> : <Lock className="size-3" />}
                      {isPublic ? "公开" : "私有"}
                    </span>
                  </div>
                )}
                <nav className="flex-1 space-y-3 overflow-y-auto px-2 py-2">
                  {NAV.map((g) => (
                    <div key={g.title}>
                      {!collapsed && (
                        <div className="px-2 pb-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                          {g.title}
                        </div>
                      )}
                      <div className="space-y-0.5">
                        {g.items.map((it) => {
                          const active = current === it.label;
                          return (
                            <button
                              key={it.label}
                              type="button"
                              onClick={() => setCurrent(it.label)}
                              title={it.label}
                              className={cn(
                                "flex w-full items-center text-left text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                                rBtn,
                                navY,
                                collapsed
                                  ? "justify-center"
                                  : showLabel
                                    ? "gap-2 px-2"
                                    : "justify-center",
                                active && "font-medium",
                              )}
                              style={
                                active
                                  ? {
                                      backgroundColor: `color-mix(in srgb, ${accent} 16%, transparent)`,
                                      color: accent,
                                    }
                                  : undefined
                              }
                            >
                              {showIcon && <it.icon className="size-3.5 shrink-0" />}
                              {!collapsed && showLabel && (
                                <>
                                  <span className="flex-1 truncate">{it.label}</span>
                                  {it.badge && (
                                    <Badge variant="secondary" className="px-1 py-0 text-[9px]">
                                      {it.badge}
                                    </Badge>
                                  )}
                                </>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </nav>
                {els.userbar && (
                  <div
                    className={cn(
                      "flex items-center border-t p-2",
                      collapsed ? "justify-center" : "gap-2",
                    )}
                  >
                    <img
                      src="https://github.com/ErgeAIA.png"
                      alt=""
                      className="size-6 shrink-0 rounded-full"
                    />
                    {!collapsed && (
                      <div className="min-w-0 leading-tight">
                        <div className="truncate font-medium">二哥</div>
                        <div className="truncate text-[10px] text-muted-foreground">管理员</div>
                      </div>
                    )}
                  </div>
                )}
              </aside>

              {/* 主区 */}
              <div className="flex min-w-0 flex-1 flex-col">
                <header className={cn("flex items-center gap-2 border-b px-3", barH)}>
                  <button
                    type="button"
                    onClick={() => setCollapsed((c) => !c)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={collapsed ? "展开侧边栏" : "收起侧边栏"}
                  >
                    <PanelLeft className="size-3.5" />
                  </button>
                  {els.breadcrumb && (
                    <div className="flex items-center gap-1 text-[10px]">
                      <span className="text-muted-foreground">首页</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="font-medium">{current}</span>
                    </div>
                  )}
                  <div className="ml-auto flex items-center gap-1.5">
                    {els.search && (
                      <Input placeholder="搜索…" className="h-6 w-20 text-[10px]" />
                    )}
                    {els.notify && (
                      <button
                        type="button"
                        onClick={() => triggerToast("你好，天才程序员！")}
                        className="relative text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="通知"
                      >
                        <Bell className="size-3.5" />
                        <span
                          className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                      </button>
                    )}
                  </div>
                </header>

                <div className={cn("flex-1 space-y-3 overflow-y-auto", mainPad, gapMain)}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-semibold">{name || "项目名"}</h4>
                      <p className="truncate text-[10px] text-muted-foreground">
                        {desc || "一句话描述这个项目的价值与适用场景。"}
                      </p>
                    </div>
                    <button
                      type="button"
                      className={cn(
                        "flex shrink-0 items-center px-2 py-1 text-[11px] font-medium text-white transition-opacity hover:opacity-90",
                        rBtn,
                      )}
                      style={{ backgroundColor: accent }}
                    >
                      <Plus className="mr-1 size-3" />新建
                    </button>
                  </div>

                  {els.stats && (
                    <div className="grid grid-cols-3 gap-2">
                      {STATS.map((s) => (
                        <div key={s.label} className={cn("border bg-card/60", rCard, statP)}>
                          <div className="text-[9px] text-muted-foreground">{s.label}</div>
                          <div className="text-base font-semibold" style={{ color: accent }}>
                            {s.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className={cn("border bg-card/60", rCard)}>
                    <div className={cn("border-b px-2 text-[11px] font-medium", listHeadY)}>
                      最近组件
                    </div>
                    <ul className="divide-y">
                      {ROWS.map((r) => (
                        <li
                          key={r.name}
                          className={cn(
                            "flex items-center gap-2 px-2 text-[10px]",
                            rowY,
                          )}
                        >
                          <span className="min-w-0 flex-1 truncate font-medium">{r.name}</span>
                          <Badge variant={STATUS_VARIANT(r.status)} className="text-[9px]">
                            {r.status}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {toastMsg && (
              <div
                className={cn(
                  "absolute bottom-3 right-3 z-10 flex max-w-[80%] items-center gap-2 border bg-card px-3 py-2 shadow-lg",
                  rCard,
                )}
              >
                <span className="size-2 rounded-full" style={{ backgroundColor: accent }} />
                <span className="text-[11px] font-medium">{toastMsg}</span>
              </div>
            )}
          </div>
          <CopyBlock value={prompt} label="提示词" />
        </div>
      </div>
    </div>
  );
}
