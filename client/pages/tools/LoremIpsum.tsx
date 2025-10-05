import ToolLayout from "@/components/tools/ToolLayout";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".split(" ");

function generate(paragraphs: number, sentences: number) {
  const out: string[] = [];
  for (let p = 0; p < paragraphs; p++) {
    const lines: string[] = [];
    for (let s = 0; s < sentences; s++) {
      const len = 8 + Math.floor(Math.random() * 10);
      const words: string[] = [];
      for (let i = 0; i < len; i++) {
        const w = WORDS[Math.floor(Math.random() * WORDS.length)];
        words.push(i === 0 ? w[0].toUpperCase() + w.slice(1) : w);
      }
      lines.push(words.join(" ") + ".");
    }
    out.push(lines.join(" "));
  }
  return out.join("\n\n");
}

export default function LoremIpsum() {
  const [paras, setParas] = useState(2);
  const [sents, setSents] = useState(3);
  const text = useMemo(() => generate(paras, sents), [paras, sents]);

  function copy() { navigator.clipboard.writeText(text); }

  return (
    <ToolLayout title="Lorem Ipsum Generator" description="Generate placeholder text by paragraphs and sentences." canonicalPath="/tools/lorem-ipsum" keywords={["lorem ipsum","placeholder","dummy text"]}>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Paragraphs</label>
            <input type="number" min={1} max={20} value={paras} onChange={(e) => setParas(parseInt(e.target.value) || 1)} className="rounded-md border bg-background px-3 py-2 dark:border-slate-800" />
            <label className="text-sm font-medium">Sentences per paragraph</label>
            <input type="number" min={1} max={20} value={sents} onChange={(e) => setSents(parseInt(e.target.value) || 1)} className="rounded-md border bg-background px-3 py-2 dark:border-slate-800" />
            <Button onClick={copy} variant="outline">Copy</Button>
          </div>
        </div>
        <div className="md:col-span-2">
          <Textarea readOnly value={text} className="min-h-[260px]" />
        </div>
      </div>
    </ToolLayout>
  );
}
