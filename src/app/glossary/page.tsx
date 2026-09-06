"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import {
  PageContainer,
  PageHeader,
  GroupLabel,
  FieldLabel,
} from "@/components/page-shell";
import { CopyBlock } from "@/components/copy-block";
import { ContentLink } from "@/components/content-link";
import {
  glossary,
  glossaryCategoryOrder,
  glossaryCategoryMeta,
  glossaryCategoryAlias,
} from "@/content/glossary";

export default function GlossaryPage() {
  return (
    <PageContainer>
      <PageHeader
        title="玉简·词典"
        en="Glossary"
        description="不知道想要的效果叫什么？先搜再抄提示词。每个词都告诉你它是什么、加上能看到什么，以及怎么把这句话直接交给 AI。"
      />

      {glossaryCategoryOrder.map((cat) => {
        const items = glossary.filter((t) => t.category === cat);
        const meta = glossaryCategoryMeta[cat];
        return (
          <section
            key={cat}
            id={cat}
            data-spy-group={cat}
            className="scroll-anchor mb-10 space-y-3"
          >
            <GroupLabel data-spy-group={cat}>
              {glossaryCategoryAlias[cat]}·{meta.zh}
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {meta.en}
              </span>
              <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-xs tabular-nums text-muted-foreground/80">
                {items.length}
              </span>
            </GroupLabel>
            <p className="text-sm text-muted-foreground">{meta.desc}</p>
            <div className="space-y-3">
              {items.map((t, i) => (
                <Reveal key={t.id} delay={Math.min(i * 30, 240)}>
                  <Card
                    id={t.id}
                    data-spy-group={cat}
                    className="hover-lift scroll-anchor"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="flex flex-wrap items-center gap-2 text-base">
                        <span>{t.nameZh}</span>
                        {t.nameEn ? (
                          <span className="text-xs font-normal text-muted-foreground">
                            {t.nameEn}
                          </span>
                        ) : null}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <p>
                        <FieldLabel>意思</FieldLabel>
                        <span className="text-muted-foreground">
                          {t.meaning}
                        </span>
                      </p>
                      <p>
                        <FieldLabel>效果</FieldLabel>
                        <span className="text-muted-foreground">
                          {t.effect}
                        </span>
                      </p>
                      {t.related && t.related.length > 0 && (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
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
                      <div className="rounded-md bg-muted/50 p-3">
                        <FieldLabel>如何向 AI 描述</FieldLabel>
                        <CopyBlock
                          value={t.aiPrompt}
                          label="向 AI 描述（可复制）"
                          className="mt-1"
                        />
                      </div>
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
