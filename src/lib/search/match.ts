// 纯函数匹配层：无 React 依赖，便于单测与将来替换（如换 FlexSearch 只换本文件）。
import {
  WEIGHT,
  type Range,
  type SearchDoc,
  type SearchHit,
  type SearchResult,
} from "./types";

const norm = (s: string) => s.toLowerCase();

/** 查询拆 token：按空白拆；中文多字词在无结果时会退化为按 2 字切分的 AND 重试 */
function tokenize(query: string): string[][] {
  const q = query.trim();
  if (!q) return [];
  const base = q.split(/\s+/).filter(Boolean).map(norm);
  const variants: string[][] = [base];
  const single = base.length === 1 ? base[0] : "";
  // 无空格且纯中文且长度 >= 4：追加一个 2 字切分的降级方案
  if (single && !/[a-z0-9]/i.test(single) && single.length >= 4) {
    const grams: string[] = [];
    for (let i = 0; i + 2 <= single.length; i += 2) grams.push(single.slice(i, i + 2));
    if (grams.length > 1) variants.push(grams);
  }
  return variants;
}

function factorOf(text: string, token: string): number {
  if (!text) return 0;
  if (text === token) return WEIGHT.exact;
  if (text.startsWith(token)) return WEIGHT.prefix;
  if (text.includes(token)) return WEIGHT.contains;
  return 0;
}

function rangesOf(text: string, tokens: string[]): Range[] {
  const lower = norm(text);
  if (lower.length !== text.length) return []; // 长度不一致时退化为不高亮
  const out: Range[] = [];
  for (const t of tokens) {
    let from = 0;
    for (;;) {
      const i = lower.indexOf(t, from);
      if (i === -1) break;
      out.push([i, i + t.length]);
      from = i + t.length;
    }
  }
  return mergeRanges(out);
}

function mergeRanges(list: Range[]): Range[] {
  if (list.length === 0) return [];
  const sorted = [...list].sort((a, b) => a[0] - b[0]);
  const out: Range[] = [sorted[0]];
  for (const [s, e] of sorted.slice(1)) {
    const last = out[out.length - 1];
    if (s <= last[1]) last[1] = Math.max(last[1], e);
    else out.push([s, e]);
  }
  return out;
}

function buildSnippet(body: string, tokens: string[]): { text: string; ranges: Range[] } | undefined {
  const lower = norm(body);
  let hit = -1;
  let token = "";
  for (const t of tokens) {
    const i = lower.indexOf(t);
    if (i !== -1 && (hit === -1 || i < hit)) {
      hit = i;
      token = t;
    }
  }
  if (hit === -1) return undefined;
  const start = Math.max(0, hit - 18);
  const end = Math.min(body.length, hit + token.length + 18);
  const text = (start > 0 ? "…" : "") + body.slice(start, end) + (end < body.length ? "…" : "");
  return { text, ranges: rangesOf(text, tokens) };
}

function scoreDoc(doc: SearchDoc, tokens: string[]): SearchHit | null {
  const single = tokens.length === 1 && tokens[0].length === 1;
  const fields: { text: string; weight: number; name: "title" | "keywords" | "subtitle" | "body" }[] = [
    { text: doc.title, weight: WEIGHT.title, name: "title" },
    ...(doc.keywords ? [{ text: doc.keywords, weight: WEIGHT.keywords, name: "keywords" as const }] : []),
    ...(doc.subtitle ? [{ text: doc.subtitle, weight: WEIGHT.subtitle, name: "subtitle" as const }] : []),
    // 单字查询不扫正文，避免噪音
    ...(single ? [] : doc.body ? [{ text: doc.body, weight: WEIGHT.body, name: "body" as const }] : []),
  ];
  const lowered = fields.map((f) => ({ ...f, text: norm(f.text ?? "") }));

  let score = 0;
  let hitBody = false;
  for (const token of tokens) {
    let tokenScore = 0;
    for (const f of lowered) {
      const factor = factorOf(f.text, token);
      if (factor === 0) continue;
      tokenScore = Math.max(tokenScore, f.weight * factor);
      if (f.name === "body") hitBody = true;
    }
    if (tokenScore === 0) return null; // AND：任一 token 未命中即淘汰
    score += tokenScore;
  }

  // 短标题优先
  score *= 1 - (Math.min(doc.title.length, 40) / 40) * 0.2;
  if (doc.kind === "menu") score += WEIGHT.menuTier;

  return {
    doc,
    score,
    titleRanges: rangesOf(doc.title, tokens),
    snippet: hitBody && doc.body ? buildSnippet(doc.body, tokens) : undefined,
  };
}

export function search(query: string, docs: SearchDoc[], menuLimit = 8, contentLimit = 30): SearchResult {
  const variants = tokenize(query);
  const empty: SearchResult = { menu: [], content: [], menuTotal: 0, contentTotal: 0 };
  if (variants.length === 0) return empty;

  let hits: SearchHit[] = [];
  for (const tokens of variants) {
    const list: SearchHit[] = [];
    for (const doc of docs) {
      const hit = scoreDoc(doc, tokens);
      if (hit) list.push(hit);
    }
    if (list.length > 0) {
      hits = list;
      break;
    }
  }

  hits.sort((a, b) => b.score - a.score || a.doc.title.length - b.doc.title.length);
  const menu = hits.filter((h) => h.doc.kind === "menu");
  const content = hits.filter((h) => h.doc.kind === "content");
  return {
    menu: menu.slice(0, menuLimit),
    content: content.slice(0, contentLimit),
    menuTotal: menu.length,
    contentTotal: content.length,
  };
}
