"use client";

import * as React from "react";
import type { Range, SearchHit } from "@/lib/search/types";

/** 命中高亮：用设计令牌，禁硬编码颜色 */
export function Highlight({ text, ranges }: { text: string; ranges: Range[] }) {
  if (!ranges.length) return <>{text}</>;
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  ranges.forEach(([s, e], i) => {
    if (s > cursor) nodes.push(text.slice(cursor, s));
    nodes.push(
      <mark
        key={i}
        className="rounded-[2px] bg-primary/15 px-0.5 text-primary"
      >
        {text.slice(s, e)}
      </mark>
    );
    cursor = e;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}

export function SearchResultRow({ hit }: { hit: SearchHit }) {
  const { doc } = hit;
  const Icon = doc.icon;

  return (
    <div className="flex min-w-0 flex-col gap-0.5 py-0.5">
      <div className="flex min-w-0 items-center gap-2">
        {doc.kind === "menu" ? (
          Icon ? (
            <Icon className="size-4 shrink-0 opacity-70" />
          ) : (
            <span className="size-4 shrink-0" />
          )
        ) : (
          <span className="shrink-0 rounded border border-primary/40 px-1 py-px text-[10px] leading-none text-primary">
            {doc.sectionLabel}
          </span>
        )}
        <span className="truncate text-sm font-medium">
          <Highlight text={doc.title} ranges={hit.titleRanges} />
        </span>
        {doc.subtitle ? (
          <span className="truncate text-xs text-muted-foreground">
            {doc.subtitle}
          </span>
        ) : null}
        {doc.kind === "menu" ? (
          <span className="ml-auto shrink-0 text-[10px] text-muted-foreground/70">
            {doc.sectionLabel}
          </span>
        ) : null}
      </div>
      {hit.snippet ? (
        <p className="truncate pl-6 text-xs text-muted-foreground">
          <Highlight text={hit.snippet.text} ranges={hit.snippet.ranges} />
        </p>
      ) : null}
    </div>
  );
}
