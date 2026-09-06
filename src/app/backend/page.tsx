import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { PageContainer, PageHeader, FieldLabel, GroupLabel } from "@/components/page-shell";
import { CopyBlock } from "@/components/copy-block";
import { ContentLink } from "@/components/content-link";
import {
  backendTopics,
  backendGroups,
  backendTopicMetaEn,
  backendTopicAlias,
  type BackendTopic,
} from "@/content/backend";

export const metadata: Metadata = {
  title: "后端相关 · 写意",
  description:
    "代码结构、API、数据库、缓存、文件存储、认证鉴权、安全、环境变量、定时任务、部署——用准确术语与 AI 对齐后端概念。",
};

/** 后端全景：一张图看懂请求流向与各专题的位置 */
function BackendPanorama() {
  return (
    <div className="rounded-xl border border-border/60 bg-card/30 p-4">
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        后端全景 · 一个请求的去向
      </p>
      <svg
        viewBox="0 0 760 252"
        className="h-auto w-full text-muted-foreground"
        role="img"
        aria-label="后端全景图：浏览器请求经关防结界到达信道 API，再读写仓廪数据库、镜花缓存、玉匣文件存储；驿传负责定时与回调，一切跑在布阵部署之上"
      >
        <defs>
          <marker
            id="bl-arrow"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L8 4 L0 8 z" className="fill-current" />
          </marker>
        </defs>

        {/* 部署平台（最底层） */}
        <rect
          x="16"
          y="214"
          width="728"
          height="30"
          rx="8"
          className="fill-primary/5 stroke-primary/40"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <text x="380" y="233" textAnchor="middle" fontSize="12" className="fill-current">
          布阵·部署运行 —— 一切都跑在上面
        </text>

        {/* 浏览器 */}
        <rect x="20" y="96" width="106" height="52" rx="8" className="fill-background stroke-current" strokeWidth="1.2" />
        <text x="73" y="118" textAnchor="middle" fontSize="13" className="fill-current">浏览器</text>
        <text x="73" y="136" textAnchor="middle" fontSize="10" className="fill-current opacity-60">用户的请求</text>

        {/* 关防·结界（安全门） */}
        <rect x="196" y="86" width="100" height="72" rx="8" strokeDasharray="5 3" className="fill-background stroke-current" strokeWidth="1.2" />
        <text x="246" y="114" textAnchor="middle" fontSize="12" className="fill-current">关防·结界</text>
        <text x="246" y="132" textAnchor="middle" fontSize="10" className="fill-current opacity-60">鉴权与安全</text>

        {/* 信道·API */}
        <rect x="366" y="86" width="118" height="72" rx="8" className="fill-background stroke-primary/70" strokeWidth="1.4" />
        <text x="425" y="112" textAnchor="middle" fontSize="13" className="fill-current">信道·API</text>
        <text x="425" y="130" textAnchor="middle" fontSize="10" className="fill-current opacity-60">接口与业务逻辑</text>
        <text x="425" y="172" textAnchor="middle" fontSize="10" className="fill-current opacity-60">封印·环境变量供电</text>

        {/* 数据与存储三格 */}
        <rect x="600" y="30" width="144" height="46" rx="8" className="fill-background stroke-current" strokeWidth="1.2" />
        <text x="672" y="58" textAnchor="middle" fontSize="12" className="fill-current">仓廪·数据库</text>
        <rect x="600" y="98" width="144" height="46" rx="8" className="fill-background stroke-current" strokeWidth="1.2" />
        <text x="672" y="126" textAnchor="middle" fontSize="12" className="fill-current">镜花·缓存</text>
        <rect x="600" y="166" width="144" height="46" rx="8" className="fill-background stroke-current" strokeWidth="1.2" />
        <text x="672" y="194" textAnchor="middle" fontSize="12" className="fill-current">玉匣·文件存储</text>

        {/* 主链路箭头 */}
        <line x1="126" y1="122" x2="190" y2="122" className="stroke-current" strokeWidth="1.3" markerEnd="url(#bl-arrow)" />
        <line x1="296" y1="122" x2="360" y2="122" className="stroke-current" strokeWidth="1.3" markerEnd="url(#bl-arrow)" />
        {/* API → 三格 */}
        <line x1="484" y1="102" x2="594" y2="53" className="stroke-primary/60" strokeWidth="1.2" markerEnd="url(#bl-arrow)" />
        <line x1="484" y1="122" x2="594" y2="121" className="stroke-primary/60" strokeWidth="1.2" markerEnd="url(#bl-arrow)" />
        <line x1="484" y1="142" x2="594" y2="189" className="stroke-primary/60" strokeWidth="1.2" markerEnd="url(#bl-arrow)" />

        {/* 驿传（定时与回调） */}
        <rect x="352" y="8" width="150" height="42" rx="8" strokeDasharray="5 3" className="fill-background stroke-current" strokeWidth="1.2" />
        <text x="427" y="26" textAnchor="middle" fontSize="12" className="fill-current">驿传·定时与回调</text>
        <text x="427" y="42" textAnchor="middle" fontSize="10" className="fill-current opacity-60">Cron / Webhook 触发</text>
        <line x1="427" y1="50" x2="425" y2="80" strokeDasharray="4 3" className="stroke-current" strokeWidth="1.2" markerEnd="url(#bl-arrow)" />
      </svg>
    </div>
  );
}

export default function BackendPage() {
  const topicById = new Map(backendTopics.map((t) => [t.id, t]));

  const renderTopic = (t: BackendTopic) => (
    <Card key={t.id} className="hover-lift">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">
          {backendTopicAlias[t.id]}·{t.name}
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            {backendTopicMetaEn[t.id]}
          </span>
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            {t.note}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <p>{t.explain}</p>

        {/* 关键术语：带一句话释义 */}
        <div>
          <FieldLabel>关键术语：</FieldLabel>
          <dl className="mt-1.5 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {t.terms.map((it) => (
              <div key={it.term} className="min-w-0">
                <dt className="inline font-mono text-xs text-foreground/90">
                  {it.term}
                </dt>
                <dd className="inline text-xs text-muted-foreground">
                  {" "}
                  — {it.def}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 新手常见的坑 */}
        <div className="rounded-md bg-muted/50 p-3">
          <FieldLabel>新手常见的坑：</FieldLabel>
          <ol className="mt-1.5 list-decimal space-y-2 pl-4">
            {t.pitfalls.map((p) => (
              <li key={p.problem} className="min-w-0">
                <p className="text-sm leading-relaxed">{p.problem}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  对 AI 说：{p.fix}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* 可以这样问 AI：入门 / 进阶 / 排错 */}
        <div>
          <FieldLabel>可以这样问 AI：</FieldLabel>
          <div className="mt-1.5 space-y-2">
            {t.prompts.map((p) => (
              <CopyBlock
                key={p.label}
                value={p.text}
                label={p.label}
                className="mt-0"
              />
            ))}
          </div>
        </div>

        {/* 延伸阅读：站内交叉引用 */}
        {t.related && t.related.length > 0 && (
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
            <span className="text-xs text-muted-foreground">延伸阅读：</span>
            {t.related.map((r) => (
              <ContentLink
                key={r.href}
                href={r.href}
                label={r.label}
                className="text-primary hover:underline"
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <PageContainer>
      <PageHeader
        title="灵脉·后端相关"
        en="Backend"
        description="对前后端不熟时，用准确术语和 AI 对齐后端概念，让它生成对的代码。十个专题：从代码结构到部署运行，每个都给你术语、坑与能直接抄的提示词。"
      />

      <Reveal>
        <BackendPanorama />
      </Reveal>

      <div className="space-y-12">
        {backendGroups.map((group) => (
          <section key={group.id} className="space-y-4">
            <div>
              <GroupLabel>
                {group.alias}·{group.name}
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  {group.en}
                </span>
              </GroupLabel>
              <p className="mt-1 text-sm text-muted-foreground">
                {group.explain}
              </p>
            </div>
            {group.topics.map((id) => {
              const t = topicById.get(id);
              if (!t) return null;
              return (
                <section key={id} id={id} data-spy-group={id} className="scroll-anchor">
                  <Reveal>{renderTopic(t)}</Reveal>
                </section>
              );
            })}
          </section>
        ))}
      </div>
    </PageContainer>
  );
}
