"use client";

import { useSearchParams } from "next/navigation";
import { ComponentsView } from "@/components/components-view";
import { componentCategories, type ComponentCategory } from "@/content/components";

// 静态导出无法使用服务端 searchParams（会使整页变动态、导出失败），
// 故在客户端读取 ?cat= 做初始分类定位，并交由上层 <Suspense> 包裹。
export function ComponentsViewWithParams() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");
  const initial = componentCategories.includes(cat as ComponentCategory)
    ? (cat as ComponentCategory)
    : null;
  return <ComponentsView initialCat={initial} />;
}
