"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { navSections } from "@/content/nav";
import type { SearchDoc, SearchResult } from "@/lib/search/types";
import { CONTENT_LIMIT, MENU_LIMIT } from "@/lib/search/types";
import { SearchResultRow } from "@/components/search-result-item";

type Engine = {
  docs: SearchDoc[];
  search: (
    query: string,
    docs: SearchDoc[],
    menuLimit?: number,
    contentLimit?: number
  ) => SearchResult;
};

export function CommandSearch() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [debounced, setDebounced] = React.useState("");
  const [engine, setEngine] = React.useState<Engine | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // 输入防抖
  React.useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query.trim()), 120);
    return () => window.clearTimeout(t);
  }, [query]);

  // 首次打开时动态加载索引与匹配逻辑（代码分割，不进首屏包）
  React.useEffect(() => {
    if (!open || engine) return;
    let cancelled = false;
    Promise.all([import("@/lib/search"), import("@/lib/search/match")])
      .then(([idx, m]) => {
        if (cancelled) return;
        setEngine({ docs: idx.buildIndex(), search: m.search });
      })
      .catch((err) => console.error("搜索索引加载失败", err));
    return () => {
      cancelled = true;
    };
  }, [open, engine]);

  const result = React.useMemo(() => {
    if (!engine || !debounced) return null;
    return engine.search(debounced, engine.docs, MENU_LIMIT, CONTENT_LIMIT);
  }, [engine, debounced]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const sections = navSections;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-8 w-full cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
      >
        <SearchIcon className="size-4" />
        <span>搜索菜单、概念、组件、词条、提示词…</span>
        <kbd className="ml-auto rounded border bg-muted px-1.5 text-[10px] font-medium">
          ⌘K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        commandProps={{ shouldFilter: false }}
      >
        <CommandInput
          placeholder="搜索菜单、概念、组件、词条、提示词…"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {!debounced ? (
            <CommandGroup heading="板块直达">
              {sections.map((s) => (
                <CommandItem key={s.id} value={`section-${s.id}`} onSelect={() => go(s.href)}>
                  <s.icon className="size-4 shrink-0 opacity-70" />
                  <span>{s.label}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{s.en}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : !result ? (
            <CommandEmpty>正在准备索引…</CommandEmpty>
          ) : result.menu.length + result.content.length === 0 ? (
            <CommandGroup heading="换个词试试">
              {sections.map((s) => (
                <CommandItem key={s.id} value={`empty-${s.id}`} onSelect={() => go(s.href)}>
                  <s.icon className="size-4 shrink-0 opacity-70" />
                  <span>{s.label}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{s.en}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : (
            <>
              {result.menu.length > 0 && (
                <CommandGroup heading={`菜单 · ${result.menuTotal} 条`}>
                  {result.menu.map((hit) => (
                    <CommandItem
                      key={hit.doc.id}
                      value={hit.doc.id}
                      onSelect={() => go(hit.doc.href)}
                    >
                      <SearchResultRow hit={hit} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {result.content.length > 0 && (
                <CommandGroup heading={`内容 · ${result.contentTotal} 条`}>
                  {result.content.map((hit) => (
                    <CommandItem
                      key={hit.doc.id}
                      value={hit.doc.id}
                      onSelect={() => go(hit.doc.href)}
                    >
                      <SearchResultRow hit={hit} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {result.menuTotal + result.contentTotal >
                MENU_LIMIT + CONTENT_LIMIT && (
                <div className="px-3 py-2 text-[11px] text-muted-foreground">
                  共 {result.menuTotal + result.contentTotal} 条，已显示前{" "}
                  {result.menu.length + result.content.length} 条，细化关键词可缩小范围。
                </div>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
