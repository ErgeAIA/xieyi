import type { Metadata } from "next";
import { Suspense } from "react";
import { ComponentsViewWithParams } from "@/components/components-view-params";
import { PageContainer, PageHeader } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "前端组件 · 写意",
  description:
    "67 个 shadcn/ui 组件，按 9 大类拆解，配使用场景与可交互的真实示例。",
};

export default function ComponentsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="法器·前端组件"
        en="Components"
        description="67 个 shadcn/ui 组件，按 9 大类拆解，每个都配使用场景与可交互示例。"
      />
      <Suspense fallback={null}>
        <ComponentsViewWithParams />
      </Suspense>
    </PageContainer>
  );
}
