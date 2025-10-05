export type Section = { id: string; text: string };
export type PageContent = { order: string[]; sections: Record<string, string> };

const KEY = "site-content";
const KEY_BLOCKS = "site-blocks";

export type Block = {
  id: string;
  type: string;
  props: Record<string, unknown>;
};

export type PageBlocks = {
  blocks: Block[];
};

function safeLocalStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readAll(): Record<string, PageContent> {
  const ls = safeLocalStorage();
  if (!ls) return {};
  const raw = ls.getItem(KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function writeAll(data: Record<string, PageContent>) {
  const ls = safeLocalStorage();
  if (!ls) return;
  ls.setItem(KEY, JSON.stringify(data));
}

export function getPageContent(pageKey: string, defaults: Section[]): Section[] {
  const data = readAll();
  const entry = data[pageKey];
  if (!entry) return defaults;
  const { order, sections } = entry;
  const ordered = order
    .map((id) => ({ id, text: sections[id] ?? "" }))
    .filter((s) => s.text !== undefined);
  const missing = defaults.filter((d) => !order.includes(d.id));
  return [...ordered, ...missing];
}

export function setPageContent(pageKey: string, sections: Section[]) {
  const data = readAll();
  data[pageKey] = {
    order: sections.map((s) => s.id),
    sections: Object.fromEntries(sections.map((s) => [s.id, s.text])),
  };
  writeAll(data);
}

// Blocks API
function readAllBlocks(): Record<string, PageBlocks> {
  const ls = safeLocalStorage();
  if (!ls) return {};
  const raw = ls.getItem(KEY_BLOCKS);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeAllBlocks(data: Record<string, PageBlocks>) {
  const ls = safeLocalStorage();
  if (!ls) return;
  ls.setItem(KEY_BLOCKS, JSON.stringify(data));
}

export function getPageBlocks(pageKey: string, defaults: Block[]): Block[] {
  const data = readAllBlocks();
  const entry = data[pageKey];
  if (!entry) return defaults;
  return entry.blocks ?? defaults;
}

export function setPageBlocks(pageKey: string, blocks: Block[]) {
  const data = readAllBlocks();
  data[pageKey] = { blocks };
  writeAllBlocks(data);
}
