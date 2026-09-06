// 全站搜索索引：遍历数据源自动生成，新增内容只要进对应模块就会自动入库（无需手工登记）。
import { flattenNav } from "@/content/nav";
import { concepts } from "@/content/concepts";
import { components } from "@/content/components";
import { glossary } from "@/content/glossary";
import { frameworks } from "@/content/frameworks";
import { backendTopics } from "@/content/backend";
import { resources } from "@/content/resources";
import { promptLibrary } from "@/content/prompt-library";
import { pageExamples } from "@/components/examples/pages";
import type { SearchDoc, SearchSection } from "./types";

function joinParts(...parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

let cache: SearchDoc[] | null = null;

export function buildIndex(): SearchDoc[] {
  if (cache) return cache;
  const docs: SearchDoc[] = [];

  // 1) 菜单：一级 / 二级 / 三级叶子（含雅称与英文原名）
  for (const n of flattenNav()) {
    docs.push({
      id: `menu:${n.id}`,
      kind: "menu",
      section: n.section as SearchSection,
      sectionLabel: n.sectionLabel,
      title: n.label,
      subtitle: joinParts(n.tooltip, n.en),
      href: n.href,
      icon: n.icon,
    });
  }

  // 2) 基础概念
  for (const c of concepts) {
    docs.push({
      id: `content:concepts:${c.id}`,
      kind: "content",
      section: "concepts",
      sectionLabel: "筑基",
      title: c.nameZh,
      subtitle: c.nameEn,
      body: joinParts(c.definition, c.analogy, c.aiUsage?.strategy, c.aiUsage?.example),
      href: `/concepts#${c.id}`,
    });
  }

  // 3) 前端组件
  for (const c of components) {
    docs.push({
      id: `content:components:${c.nameEn}`,
      kind: "content",
      section: "components",
      sectionLabel: "法器",
      title: c.nameZh,
      subtitle: c.nameEn,
      body: joinParts(c.desc, c.usage, c.aiPrompt),
      href: `/components?cat=${c.cat}#${encodeURIComponent(c.nameEn)}`,
    });
  }

  // 4) 词典词条
  for (const t of glossary) {
    docs.push({
      id: `content:glossary:${t.id}`,
      kind: "content",
      section: "glossary",
      sectionLabel: "玉简",
      title: t.nameZh,
      subtitle: joinParts(t.nameEn, t.category),
      body: joinParts(t.meaning, t.effect, t.aiPrompt),
      href: `/glossary#${t.id}`,
    });
  }

  // 5) 框架
  for (const f of frameworks) {
    docs.push({
      id: `content:frameworks:${f.id}`,
      kind: "content",
      section: "frameworks",
      sectionLabel: "阵法",
      title: f.name,
      subtitle: f.nameEn,
      body: joinParts(f.tagline, f.scenario, f.withAI?.strategy, f.withAI?.example),
      href: `/frameworks#${f.id}`,
    });
  }

  // 6) 灵脉后端专题（含术语 / 坑 / 提示词）
  for (const t of backendTopics) {
    docs.push({
      id: `content:backend:${t.id}`,
      kind: "content",
      section: "backend",
      sectionLabel: "灵脉",
      title: t.name,
      subtitle: t.note,
      body: joinParts(
        t.explain,
        t.terms.map((x) => `${x.term} ${x.def}`).join(" "),
        t.pitfalls.map((x) => `${x.problem} ${x.fix}`).join(" "),
        t.prompts.map((x) => x.text).join(" "),
      ),
      href: `/backend#${t.id}`,
    });
  }

  // 7) 参考资源
  for (const r of resources) {
    docs.push({
      id: `content:resources:${r.name}`,
      kind: "content",
      section: "resources",
      sectionLabel: "藏经阁",
      title: r.name,
      subtitle: r.category,
      body: joinParts(r.note, r.ai),
      href: `/resources#${r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    });
  }

  // 8) 真言提示词
  for (const p of promptLibrary) {
    docs.push({
      id: `content:prompts:${p.id}`,
      kind: "content",
      section: "prompts",
      sectionLabel: "真言",
      title: p.titleZh,
      subtitle: joinParts(p.titleEn, p.category),
      body: joinParts(p.promptZh, p.prompt, p.whyEffective),
      href: `/prompts#${p.origin ?? "official"}`,
    });
  }

  // 9) 页面画廊（keywords 为人工标注检索词，按标题同级权重）
  for (const e of pageExamples) {
    docs.push({
      id: `content:examples:${e.id}`,
      kind: "content",
      section: "examples",
      sectionLabel: "图卷",
      title: e.title,
      subtitle: e.nameEn,
      keywords: e.keywords,
      body: joinParts(e.desc, e.usage, e.prompt),
      href: `/examples#${e.id}`,
    });
  }

  cache = docs;
  return docs;
}
