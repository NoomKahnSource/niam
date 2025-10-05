import ToolLayout from "@/components/tools/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState } from "react";

function count(text: string) {
  const chars = text.length;
  const words = (text.trim().match(/\S+/g) || []).length;
  const lines = text.split(/\r?\n/).length;
  const sentences = (text.match(/[.!?](\s|$)/g) || []).length;
  return { chars, words, lines, sentences };
}

export default function WordCounter() {
  const [t, setT] = useState("");
  const stats = useMemo(() => count(t), [t]);
  return (
    <ToolLayout title="Word / Character Counter" description="Count words, characters, lines, and sentences instantly." canonicalPath="/tools/word-counter" keywords={["word counter","character count","text stats"]}>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/70">
          <ul className="grid gap-2 text-sm">
            <li className="flex items-center justify-between"><span>Words</span><span className="font-semibold">{stats.words}</span></li>
            <li className="flex items-center justify-between"><span>Characters</span><span className="font-semibold">{stats.chars}</span></li>
            <li className="flex items-center justify-between"><span>Lines</span><span className="font-semibold">{stats.lines}</span></li>
            <li className="flex items-center justify-between"><span>Sentences</span><span className="font-semibold">{stats.sentences}</span></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <Textarea value={t} onChange={(e) => setT(e.target.value)} className="min-h-[240px]" placeholder="Paste your text here" />
        </div>
      </div>
    </ToolLayout>
  );
}
