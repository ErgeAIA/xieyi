"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { isContentNav, clearContentNav } from "@/lib/content-nav";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

export interface TreeNode {
  id: string;
  label: string;
  /** 徽章：贴合菜单语义的 Lucide 图标 */
  icon?: LucideIcon;
  en?: string;
  /** 菜单仅显示雅称时，hover 浮层展示「原始名 + 英文」 */
  tooltip?: string;
  href?: string;
  /** 该节点所属路由（用于判断同路由精确跳转） */
  route?: string;
  /** 对应页面 data-spy-item 值（最末级叶子高亮跟随） */
  spyItem?: string;
  /** 对应页面 data-spy-group 值（分组级 / 扁平叶子高亮跟随） */
  spyGroup?: string;
  count?: number;
  children?: TreeNode[];
}

export function TreeMenu({
  nodes,
  activeItemId,
  activeGroupId,
}: {
  nodes: TreeNode[];
  activeItemId?: string | null;
  activeGroupId?: string | null;
}) {
  const pathname = usePathname();

  const { parentMap } = React.useMemo(() => {
    const byId = new Map<string, TreeNode>();
    const parent = new Map<string, string>();
    const walk = (list: TreeNode[], parentId?: string) => {
      for (const n of list) {
        byId.set(n.id, n);
        if (parentId) parent.set(n.id, parentId);
        if (n.children) walk(n.children, n.id);
      }
    };
    walk(nodes);
    return { nodeById: byId, parentMap: parent };
  }, [nodes]);

  const ancestors = React.useCallback(
    (id: string): string[] => {
      const res: string[] = [];
      let cur = parentMap.get(id);
      while (cur) {
        res.push(cur);
        cur = parentMap.get(cur);
      }
      return res;
    },
    [parentMap]
  );

  // 在「当前路由」范围内按条件找节点：spy id 只在归属页内命中，
  // 防止不同页面复用同一 key（如 /backend 与 /frameworks#backend）互相串高亮。
  const findByRoute = React.useCallback(
    (pred: (n: TreeNode) => boolean): TreeNode | null => {
      let found: TreeNode | null = null;
      const walk = (list: TreeNode[]) => {
        for (const n of list) {
          if (found) return;
          if (n.route === pathname && pred(n)) {
            found = n;
            return;
          }
          if (n.children) walk(n.children);
        }
      };
      walk(nodes);
      return found;
    },
    [nodes, pathname]
  );

  // 节点的页面锚点 id 取自 href 的 hash（node.id 不保证等于 DOM id）
  const anchorOf = (n: TreeNode): string | null => {
    const h = n.href?.split("#")[1];
    return h ? decodeURIComponent(h) : null;
  };

  // 锚点滚动：短距离平滑滑动，长距离（如玉简 216 词条的大页面）瞬时落点——
  // 原生平滑滚动滚上万像素要好几秒，观感等同「点了没反应」。
  const scrollToAnchor = (anchor: string | null) => {
    const el = anchor ? document.getElementById(anchor) : null;
    if (!el) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const far = el.getBoundingClientRect().top > 1600;
    el.scrollIntoView({
      behavior: far ? "auto" : "smooth",
      block: "start",
    });
  };

  const [openSet, setOpenSet] = React.useState<Set<string>>(new Set());
  const [instantSet, setInstantSet] = React.useState<Set<string>>(new Set());

  // 点击权威性高亮：点中哪个菜单，哪个立即高亮，直到用户主动滚动（滚轮/触摸/方向键）
  // 才交还给 scroll-spy。程序化平滑滚动不会触发这些事件，故点击后的高亮稳定保持。
  // 这样「基础概念」这类无独立区块的顶层节点也能在被点击时稳定高亮自身。
  const [manualActiveId, setManualActiveId] = React.useState<string | null>(
    null
  );

  // 深链 / 初始定位：进入页面（或跨路由切换）时展开当前路由顶层节点；
  // 若 URL 含 hash / ?cat=，则展开到对应叶子并精确定位。
  // 依赖 pathname：SidebarNav 在 layout 中持久挂载，路由切换不会重挂本组件，
  // 故需借 pathname 变化重新触发，才能处理「点击其他页菜单跳到本页锚点」。
  /* eslint-disable react-hooks/set-state-in-effect -- 深链/初始定位必须在 effect 内更新展开状态，属该规则的合法例外（与 components-view 同类模式） */
  React.useEffect(() => {
    // 内容链跳转（词典/藏经阁等的「参考/延伸」链接）不关联导航：
    // 右侧精确展示内容即可，侧栏只保留一级路由展开与高亮，不展开相关子菜单。
    const fromContent = isContentNav();
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat");
    const open = new Set<string>();
    const top = nodes.find((n) => n.href === pathname);
    if (top) open.add(top.id);
    let leaf: TreeNode | null = null;
    if (hash) {
      leaf =
        findByRoute((n) => n.spyItem === hash) ??
        findByRoute((n) => n.spyGroup === hash) ??
        findByRoute((n) => n.id === hash) ??
        null;
    } else if (cat) {
      leaf = findByRoute((n) => n.spyGroup === cat || n.id === cat);
    }
    if (leaf && !fromContent) {
      ancestors(leaf.id).forEach((a) => open.add(a));
      open.add(leaf.id);
    }
    setOpenSet(open);
    setInstantSet(new Set(open));
    if (fromContent) {
      // 只高亮一级路由，用户手动滚动后交还 scroll-spy
      setManualActiveId(top?.id ?? null);
    } else {
      setManualActiveId(null);
    }
    if (leaf) {
      const t = window.setTimeout(() => {
        scrollToAnchor(anchorOf(leaf));
        setInstantSet(new Set());
      }, 80);
      return () => window.clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, nodes]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const toggle = (id: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setInstantSet((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // 跳转：同路由自行精确定位（瞬时展开全部祖先 + 滚动），跨路由交给 Link，
  // 由目标页挂载时按 hash / ?cat= 定位。
  const jump = (e: React.MouseEvent<HTMLAnchorElement>, node: TreeNode) => {
    if (!node.href) return;
    clearContentNav(); // 侧栏点击优先于 2 秒内的内容链接标记
    const sameRoute = node.route === pathname;
    if (sameRoute) {
      e.preventDefault();
      const ids = [node.id, ...ancestors(node.id)];
      setOpenSet((prev) => new Set([...prev, ...ids]));
      setInstantSet(new Set(ids));
      // 点击权威性：立即高亮被点中的节点；用户主动滚动（滚轮/触摸/方向键）后才交还 spy。
      setManualActiveId(node.id);
      history.replaceState(null, "", node.href);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          scrollToAnchor(anchorOf(node));
          setInstantSet(new Set());
        })
      );
    }
  };

  // 高亮只给「最具体的命中节点」：叶子 > 分组 > 一级路由。
  // 祖先只保持展开，不额外加背景。
  const activeLeafId = React.useMemo(() => {
    if (!activeItemId) return null;
    const walk = (list: TreeNode[]): string | null => {
      for (const n of list) {
        if (n.route === pathname && n.spyItem === activeItemId) return n.id;
        if (n.children) {
          const found = walk(n.children);
          if (found) return found;
        }
      }
      return null;
    };
    return walk(nodes);
  }, [nodes, activeItemId, pathname]);

  const activeGroupNodeId = React.useMemo(() => {
    if (activeLeafId) return null;
    if (!activeGroupId) return null;
    const walk = (list: TreeNode[]): string | null => {
      for (const n of list) {
        if (n.route === pathname && n.spyGroup === activeGroupId) return n.id;
        if (n.children) {
          const found = walk(n.children);
          if (found) return found;
        }
      }
      return null;
    };
    return walk(nodes);
  }, [nodes, activeGroupId, activeLeafId, pathname]);

  const activeRouteId = React.useMemo(() => {
    if (activeLeafId || activeGroupNodeId) return null;
    const n = nodes.find((n) => n.route === pathname);
    return n?.id ?? null;
  }, [nodes, pathname, activeLeafId, activeGroupNodeId]);

  // 用户主动滚动（滚轮/触摸/方向键）后，交还 scroll-spy 决定高亮。
  // 程序化平滑滚动不触发这些事件，故点击后的高亮会稳定保持，直至用户真正手动滚动。
  React.useEffect(() => {
    const release = () => setManualActiveId(null);
    const onKey = (e: KeyboardEvent) => {
      if (
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Spacebar"].includes(
          e.key
        )
      ) {
        release();
      }
    };
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const isActive = (node: TreeNode): boolean =>
    node.id === manualActiveId ||
    (manualActiveId == null &&
      (node.id === activeLeafId ||
        node.id === activeGroupNodeId ||
        node.id === activeRouteId));

  const renderNode = (node: TreeNode, depth: number) => {
    const hasChildren = !!node.children && node.children.length > 0;
    const open = openSet.has(node.id);
    const instant = instantSet.has(node.id);
    // 仅当前命中节点（叶子/分组/一级路由）高亮，祖先只保持展开，不加背景。
    const active = isActive(node);

    if (!hasChildren) {
      const Icon = node.icon;
      const inner = (
        <>
          <span
            className={`pointer-events-none absolute left-0 top-1/2 h-3.5 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-200 ${
              active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`}
          />
          {Icon ? (
            <Icon
              className={`shrink-0 self-center opacity-70 ${
                depth === 0 ? "size-4" : "size-3.5"
              }`}
            />
          ) : null}
          {node.label}
          {!node.tooltip && node.en && (
            <span className="font-mono text-[11px] font-normal text-muted-foreground/55">
              {node.en}
            </span>
          )}
          {typeof node.count === "number" && (
            <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[11px] tabular-nums text-muted-foreground/70">
              {node.count}
            </span>
          )}
        </>
      );
      const className = `group relative flex items-baseline gap-1.5 rounded-md py-1 pr-2 transition-colors duration-200 ${
        depth === 0 ? "text-sm" : "text-xs"
      } ${
        active
          ? "bg-primary/10 font-medium text-primary"
          : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
      }`;
      const style = { paddingLeft: `${depth * 12 + 10}px` } as const;
      if (node.tooltip) {
        return (
          <Tooltip key={node.id}>
            <TooltipTrigger
              render={
                <Link
                  href={node.href ?? "#"}
                  onClick={(e) => jump(e, node)}
                  className={className}
                  style={style}
                />
              }
            >
              {inner}
            </TooltipTrigger>
            <TooltipContent>{node.tooltip}</TooltipContent>
          </Tooltip>
        );
      }
      return (
        <Link
          key={node.id}
          href={node.href ?? "#"}
          onClick={(e) => jump(e, node)}
          className={className}
          style={style}
        >
          {inner}
        </Link>
      );
    }

    return (
      <div key={node.id}>
        <div
          className={`group relative flex items-center rounded-md transition-colors duration-200 ${
            active
              ? "bg-primary/10 font-medium text-primary"
              : "text-foreground/80 hover:bg-accent/50 hover:text-foreground"
          }`}
          style={{ paddingLeft: `${depth * 12 + 2}px`, paddingRight: 8 }}
        >
          <span
            className={`pointer-events-none absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-200 ${
              active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`}
          />
          <button
            type="button"
            onClick={() => toggle(node.id)}
            aria-expanded={open}
            aria-label={open ? "收起" : "展开"}
            className="flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground/70 hover:text-foreground"
          >
            <svg
              className={`size-3 transition-transform duration-200 ${
                open ? "rotate-90" : ""
              }`}
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 2.5 7.5 6 4 9.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {node.tooltip ? (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Link
                    href={node.href ?? "#"}
                    onClick={(e) => jump(e, node)}
                    className="flex flex-1 items-center gap-1.5 py-1.5 text-sm"
                  />
                }
              >
                {node.icon ? (
                  <node.icon className="size-4 shrink-0 opacity-70" />
                ) : null}
                {node.label}
                {typeof node.count === "number" && (
                  <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[11px] tabular-nums text-muted-foreground/70">
                    {node.count}
                  </span>
                )}
              </TooltipTrigger>
              <TooltipContent>{node.tooltip}</TooltipContent>
            </Tooltip>
          ) : (
            <Link
              href={node.href ?? "#"}
              onClick={(e) => jump(e, node)}
              className="flex flex-1 items-baseline gap-1.5 py-1.5 text-sm"
            >
              {node.label}
              {node.en && (
                <span className="font-mono text-[11px] font-normal text-muted-foreground/55">
                  {node.en}
                </span>
              )}
              {typeof node.count === "number" && (
                <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[11px] tabular-nums text-muted-foreground/70">
                  {node.count}
                </span>
              )}
            </Link>
          )}
        </div>
        <div
          className={`overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)] ${
            instant ? "transition-none" : ""
          } ${
            open
              ? "max-h-[2000px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-0.5">
            {node.children!.map((child) => (
              <div key={child.id}>{renderNode(child, depth + 1)}</div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-0.5">
        {nodes.map((n) => renderNode(n, 0))}
      </div>
    </TooltipProvider>
  );
}
