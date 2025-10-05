import { useMemo, useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { Block, getPageBlocks, setPageBlocks } from "@/lib/contentStore";
import { getDefaults } from "@/lib/defaultBlocks";
import { toast } from "sonner";
import { Plus, Type, LayoutGrid, Star, ShoppingCart, HelpCircle, Quote, Megaphone, MoveUpRight } from "lucide-react";

const PAGES = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "services", label: "Services" },
  { key: "gallery", label: "Gallery" },
  { key: "blog", label: "Blog" },
  { key: "contact", label: "Contact" },
];

const BLOCK_META: Record<string, { label: string; description: string; Icon: any; example?: Block }> = {
  hero: {
    label: "Header Section",
    description: "Big title with optional subtitle and buttons.",
    Icon: Megaphone,
    example: { id: "ex-hero", type: "hero", props: { title: "Welcome", subtitle: "Short punchy line", primaryLabel: "Get started", primaryHref: "/about" } },
  },
  text: { label: "Paragraph", description: "A block of text.", Icon: Type, example: { id: "ex-text", type: "text", props: { text: "Write anything here." } } },
  features: { label: "Feature Grid", description: "3–6 short features in a grid.", Icon: LayoutGrid, example: { id: "ex-feat", type: "features", props: { title: "Highlights", items: ["Fast", "Responsive", "Dark mode"] } } },
  stats: { label: "Key Stats", description: "Numbers that impress.", Icon: Star, example: { id: "ex-stats", type: "stats", props: { items: [{ label: "Users", value: "12k" }, { label: "Uptime", value: "99.9%" }] } } },
  pricing: { label: "Pricing Plans", description: "Cards with price and features.", Icon: ShoppingCart },
  faq: { label: "FAQs", description: "Common questions and answers.", Icon: HelpCircle },
  testimonial: { label: "Testimonial Quote", description: "A quote from a happy person.", Icon: Quote },
  cta: { label: "Call To Action", description: "Centered message with a button.", Icon: Megaphone },
  marquee: { label: "Scrolling Highlights", description: "A line of items that scroll.", Icon: MoveUpRight },
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function Admin() {
  const [pageKey, setPageKey] = useState(PAGES[0].key);
  const [items, setItems] = useState<Block[]>(() => getPageBlocks(pageKey, getDefaults(pageKey)));
  const [preview, setPreview] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useMemo(() => {
    setItems(getPageBlocks(pageKey, getDefaults(pageKey)));
  }, [pageKey]);

  function add(type: Block["type"]) {
    const meta = BLOCK_META[type];
    const blank: Block = meta?.example ? { ...meta.example, id: uid() } : { id: uid(), type, props: {} } as Block;
    setItems((prev) => [...prev, blank]);
    toast.success(`${meta?.label ?? type} added`);
  }
  function duplicate(id: string) {
    setItems((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx < 0) return prev;
      const copy: Block = { ...prev[idx], id: uid() };
      const next = prev.slice();
      next.splice(idx + 1, 0, copy);
      return next;
    });
  }
  function remove(id: string) { setItems((prev) => prev.filter((b) => b.id !== id)); }
  function move(id: string, dir: -1 | 1) {
    setItems((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      const to = idx + dir;
      if (idx < 0 || to < 0 || to >= prev.length) return prev;
      const next = prev.slice();
      const [m] = next.splice(idx, 1);
      next.splice(to, 0, m);
      return next;
    });
  }
  function save() { setPageBlocks(pageKey, items); toast.success("Saved page"); }
  function reset() { const def = getDefaults(pageKey); setItems(def); toast("Reset to defaults"); }

  function updateProp(id: string, key: string, value: unknown) {
    setItems((prev) => prev.map((b) => (b.id === id ? { ...b, props: { ...b.props, [key]: value } } : b)));
  }

  return (
    <PageContainer>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="rounded-xl border bg-white/70 p-4 backdrop-blur dark:bg-slate-900/60">
          <h2 className="text-sm font-medium">Page</h2>
          <select className="mt-2 w-full rounded-md border bg-background px-3 py-2" value={pageKey} onChange={(e) => setPageKey(e.target.value)}>
            {PAGES.map((p) => (<option key={p.key} value={p.key}>{p.label}</option>))}
          </select>

          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <button className={`rounded-md border px-2 py-1 ${preview === "mobile" ? "bg-slate-100 dark:bg-slate-800" : ""}`} onClick={() => setPreview("mobile")}>
              Mobile
            </button>
            <button className={`rounded-md border px-2 py-1 ${preview === "tablet" ? "bg-slate-100 dark:bg-slate-800" : ""}`} onClick={() => setPreview("tablet")}>
              Tablet
            </button>
            <button className={`rounded-md border px-2 py-1 ${preview === "desktop" ? "bg-slate-100 dark:bg-slate-800" : ""}`} onClick={() => setPreview("desktop")}>
              Desktop
            </button>
          </div>

          <div className="mt-5">
            <div className="mb-2 text-sm font-medium">Add section</div>
            <div className="grid gap-2">
              {(Object.keys(BLOCK_META) as (keyof typeof BLOCK_META)[]).map((type) => {
                const M = BLOCK_META[type];
                const Icon = M.Icon;
                return (
                  <button key={type} onClick={() => add(type as Block["type"]) } className="flex items-center justify-between rounded-md border px-3 py-2 text-left hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <div>
                        <div className="text-sm font-medium">{M.label}</div>
                        <div className="text-xs opacity-70">{M.description}</div>
                      </div>
                    </div>
                    <Plus className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <button className="rounded-md border px-3 py-2 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800" onClick={reset}>
              Reset defaults
            </button>
            <button className="rounded-md border px-3 py-2 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800" onClick={save}>
              Save page
            </button>
          </div>
        </aside>

        <main>
          <div className={`mx-auto ${preview === "mobile" ? "max-w-sm" : preview === "tablet" ? "max-w-2xl" : "max-w-4xl"}`}>
            <div className="mb-4 text-sm text-slate-600 dark:text-slate-300">Live preview</div>
            <BlockRenderer blocks={items} />
          </div>

          <div className="mt-8 grid gap-4">
            {items.map((b, idx) => {
              const meta = BLOCK_META[b.type] || { label: b.type };
              return (
                <div key={b.id} className="rounded-lg border bg-white/70 p-4 backdrop-blur shadow dark:border-slate-800 dark:bg-slate-900/60">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border px-2 py-0.5 text-xs dark:border-slate-700">{meta.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="rounded-md border px-2 py-1 text-xs" onClick={() => move(b.id, -1)}>Up</button>
                      <button className="rounded-md border px-2 py-1 text-xs" onClick={() => move(b.id, 1)}>Down</button>
                      <button className="rounded-md border px-2 py-1 text-xs" onClick={() => duplicate(b.id)}>Duplicate</button>
                      <button className="rounded-md border px-2 py-1 text-xs" onClick={() => remove(b.id)}>Remove</button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    {b.type === "hero" ? (
                      <div className="grid gap-2 sm:grid-cols-2">
                        <input className="rounded-md border bg-background px-3 py-2" value={(b.props as any).title ?? ""} onChange={(e) => updateProp(b.id, "title", e.target.value)} placeholder="Big heading" />
                        <input className="rounded-md border bg-background px-3 py-2" value={(b.props as any).subtitle ?? ""} onChange={(e) => updateProp(b.id, "subtitle", e.target.value)} placeholder="Subtitle" />
                        <input className="rounded-md border bg-background px-3 py-2" value={(b.props as any).primaryLabel ?? ""} onChange={(e) => updateProp(b.id, "primaryLabel", e.target.value)} placeholder="Primary button label" />
                        <input className="rounded-md border bg-background px-3 py-2" value={(b.props as any).primaryHref ?? ""} onChange={(e) => updateProp(b.id, "primaryHref", e.target.value)} placeholder="Primary button link" />
                      </div>
                    ) : null}

                    {b.type === "text" ? (
                      <textarea className="mt-1 w-full rounded-md border bg-background p-2" rows={4} value={(b.props as any).text ?? ""} onChange={(e) => updateProp(b.id, "text", e.target.value)} />
                    ) : null}

                    {b.type === "features" ? (
                      <div className="grid gap-2">
                        <input className="rounded-md border bg-background px-3 py-2" value={(b.props as any).title ?? ""} onChange={(e) => updateProp(b.id, "title", e.target.value)} placeholder="Section title" />
                        <textarea className="rounded-md border bg-background p-2" rows={5} value={((b.props as any).items ?? []).join("\n")} onChange={(e) => updateProp(b.id, "items", e.target.value.split("\n").filter(Boolean))} placeholder="One feature per line" />
                      </div>
                    ) : null}

                    {b.type === "stats" ? (
                      <div className="grid gap-2">
                        <textarea className="rounded-md border bg-background p-2" rows={5} value={((b.props as any).items ?? []).map((i: any) => `${i.label}|${i.value}`).join("\n")} onChange={(e) => updateProp(b.id, "items", e.target.value.split("\n").filter(Boolean).map((l) => { const [label, value] = l.split("|"); return { label, value }; }))} placeholder="Label|Value per line" />
                      </div>
                    ) : null}

                    {b.type === "pricing" ? (
                      <div className="grid gap-2">
                        <textarea className="rounded-md border bg-background p-2" rows={6} value={((b.props as any).plans ?? []).map((p: any) => `${p.name}|${p.price}|${(p.features ?? []).join(",")}|${p.ctaLabel}|${p.ctaHref}`).join("\n")} onChange={(e) => updateProp(b.id, "plans", e.target.value.split("\n").filter(Boolean).map((l) => { const [name, price, features, ctaLabel, ctaHref] = l.split("|"); return { name, price, features: (features ?? "").split(",").filter(Boolean), ctaLabel, ctaHref }; }))} placeholder="name|price|feat1,feat2|cta|href per line" />
                      </div>
                    ) : null}

                    {b.type === "faq" ? (
                      <div className="grid gap-2">
                        <textarea className="rounded-md border bg-background p-2" rows={6} value={((b.props as any).items ?? []).map((i: any) => `${i.q}|${i.a}`).join("\n")} onChange={(e) => updateProp(b.id, "items", e.target.value.split("\n").filter(Boolean).map((l) => { const [q, a] = l.split("|"); return { q, a }; }))} placeholder="Question|Answer per line" />
                      </div>
                    ) : null}

                    {b.type === "testimonial" ? (
                      <div className="grid gap-2 sm:grid-cols-2">
                        <textarea className="rounded-md border bg-background p-2 sm:col-span-2" rows={3} value={(b.props as any).quote ?? ""} onChange={(e) => updateProp(b.id, "quote", e.target.value)} placeholder="Quote" />
                        <input className="rounded-md border bg-background px-3 py-2" value={(b.props as any).author ?? ""} onChange={(e) => updateProp(b.id, "author", e.target.value)} placeholder="Author" />
                      </div>
                    ) : null}

                    {b.type === "cta" ? (
                      <div className="grid gap-2">
                        <input className="rounded-md border bg-background px-3 py-2" value={(b.props as any).title ?? ""} onChange={(e) => updateProp(b.id, "title", e.target.value)} placeholder="Title" />
                        <textarea className="rounded-md border bg-background p-2" rows={3} value={(b.props as any).description ?? ""} onChange={(e) => updateProp(b.id, "description", e.target.value)} placeholder="Description" />
                        <div className="grid gap-2 sm:grid-cols-2">
                          <input className="rounded-md border bg-background px-3 py-2" value={(b.props as any).buttonLabel ?? ""} onChange={(e) => updateProp(b.id, "buttonLabel", e.target.value)} placeholder="Button label" />
                          <input className="rounded-md border bg-background px-3 py-2" value={(b.props as any).buttonHref ?? ""} onChange={(e) => updateProp(b.id, "buttonHref", e.target.value)} placeholder="Button link" />
                        </div>
                      </div>
                    ) : null}

                    {b.type === "marquee" ? (
                      <div className="grid gap-2">
                        <textarea className="rounded-md border bg-background p-2" rows={4} value={((b.props as any).items ?? []).join("\n")} onChange={(e) => updateProp(b.id, "items", e.target.value.split("\n").filter(Boolean))} placeholder="One item per line" />
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </PageContainer>
  );
}
