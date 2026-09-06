import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { PageContainer, PageHeader, GroupLabel } from "@/components/page-shell";
import { ContentLink } from "@/components/content-link";
import {
  resources,
  resourceCategories,
  resourceCategoryMetaEn,
  resourceCategoryDesc,
  resourceCategoryAlias,
  resourceId,
} from "@/content/resources";

export const metadata: Metadata = {
  title: "参考资源 · 写意",
  description:
    "只收官方来源：组件库、底层原语、图标、AI 工具、后端与服务，每条附「对 AI 说」的可抄话术。",
};

export default function ResourcesPage() {
  return (
    <PageContainer>
      <PageHeader
        title="藏经阁·参考资源"
        en="Resources"
        description="与 AI 沟通组件或前后端时，可对照这些资源给出更准确的需求。点击名称跳转。"
      />

      {resourceCategories.map((cat) => {
        const items = resources.filter((r) => r.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} id={cat} className="scroll-anchor space-y-3">
            <GroupLabel data-spy-group={cat}>
              {resourceCategoryAlias[cat]}·{cat}
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {resourceCategoryMetaEn[cat]}
              </span>
            </GroupLabel>
            <p className="text-sm text-muted-foreground">{resourceCategoryDesc[cat]}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((r, i) => (
                <Reveal key={r.name} delay={i * 60}>
                  <Card
                    id={resourceId(r)}
                    data-spy-group={cat}
                    data-spy-item={resourceId(r)}
                    className="hover-lift scroll-anchor"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-0.5 text-primary hover:underline"
                        >
                          {r.name}
                          <ArrowUpRight className="size-3.5 opacity-60" />
                        </a>
                        {r.stack && (
                          <Badge
                            variant="outline"
                            className="border-primary/40 px-1.5 py-0 text-[10px] font-normal text-primary"
                          >
                            本站同款
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1.5 text-sm text-muted-foreground">
                      <p>{r.note}</p>
                      {r.ai && (
                        <p className="text-xs">
                          <span className="font-medium text-foreground/70">
                            对 AI 说：
                          </span>
                          {r.ai}
                        </p>
                      )}
                      {r.related && r.related.length > 0 && (
                        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs">
                          <span className="font-medium text-foreground/70">
                            相关：
                          </span>
                          {r.related.map((rel) => (
                            <ContentLink
                              key={rel.href}
                              href={rel.href}
                              label={rel.label}
                              className="text-primary hover:underline"
                            />
                          ))}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}
    </PageContainer>
  );
}
