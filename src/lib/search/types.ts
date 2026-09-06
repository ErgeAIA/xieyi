import type { LucideIcon } from "lucide-react";

export type SearchKind = "menu" | "content";

export type SearchSection =
  | "home"
  | "concepts"
  | "prompts"
  | "examples"
  | "glossary"
  | "frameworks"
  | "components"
  | "backend"
  | "resources";

export interface SearchDoc {
  /** 唯一 id（菜单沿用 nav 的分区前缀 id） */
  id: string;
  /** menu 恒定排在 content 之前 */
  kind: SearchKind;
  section: SearchSection;
  /** 板块雅称，用于徽章 */
  sectionLabel: string;
  /** 主标题（雅称 / 条目名） */
  title: string;
  /** 英文原名 / 分类雅称 / 路径提示 */
  subtitle?: string;
  /** 人工标注检索词（如示例 keywords），按标题同级权重 */
  keywords?: string;
  /** 正文拼接（低权重） */
  body?: string;
  href: string;
  icon?: LucideIcon;
}

export type Range = [number, number];

export interface SearchHit {
  doc: SearchDoc;
  score: number;
  titleRanges: Range[];
  snippet?: { text: string; ranges: Range[] };
}

export interface SearchResult {
  menu: SearchHit[];
  content: SearchHit[];
  menuTotal: number;
  contentTotal: number;
}

export const MENU_LIMIT = 8;
export const CONTENT_LIMIT = 30;

/** 排序与权重集中在此，便于微调 */
export const WEIGHT = {
  title: 100,
  keywords: 100,
  subtitle: 40,
  body: 20,
  /** 匹配类型系数 */
  exact: 1,
  prefix: 0.75,
  contains: 0.5,
  /** 菜单恒定领先内容的 tier 偏移 */
  menuTier: 10000,
};
