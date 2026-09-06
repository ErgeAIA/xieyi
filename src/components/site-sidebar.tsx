"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useScrollSpy } from "@/components/scroll-spy";
import { useNavSpy } from "@/components/nav-spy";
import { navNodes } from "@/content/nav";
import { TreeMenu } from "@/components/sidebar-tree";

export function SidebarNav() {
  const pathname = usePathname();
  const isComponents = pathname === "/components";
  const { activeCat, activeComponent } = useScrollSpy();
  const { activeGroup, activeItem } = useNavSpy();

  // 菜单树来自单一真源 content/nav.ts（侧栏与全站搜索共用）
  const nodes = React.useMemo(() => navNodes(), []);

  const activeItemId = isComponents ? activeComponent : activeItem;
  const activeGroupId = isComponents ? activeCat : activeGroup;

  return (
    <>
      <nav className="flex flex-col gap-0.5 text-sm">
        <TreeMenu
          nodes={nodes}
          activeItemId={activeItemId}
          activeGroupId={activeGroupId}
        />
      </nav>
      <SidebarExtras />
    </>
  );
}

/** 未来扩展点：用户将在左侧导航下方加 CAT 链接（阶段 C 之后实现）。
 *  当前空渲染；届时在此返回独立区块，保持与 TreeMenu 的视觉间距一致。 */
function SidebarExtras() {
  return null;
}
