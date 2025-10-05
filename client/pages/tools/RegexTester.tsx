import { useMemo, useState } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function RegexTester() {
  const [pattern, setPattern] = useState("(foo|bar)");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("foo bar baz\nfoo");

  const matches = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      const out: { match: string; index: number; groups: string[] }[] = [];
      if (!flags.includes("g")) {
        const m = text.match(re);
        if (m) out.push({ match: m[0], index: m.index || 0, groups: m.slice(1) });
      } else {
        let m: RegExpExecArray | null;
        const re2 = new RegExp(pattern, flags);
        while ((m = re2.exec(text))) {
          out.push({ match: m[0], index: m.index, groups: m.slice(1) });
          if (m.index === re2.lastIndex) re2.lastIndex++;
        }
      }
      return { error: null as string | null, out };
    } catch (e: any) {
      return { error: e.message || String(e), out: [] };
    }
  }, [pattern, flags, text]);

  return (
    <ToolLayout title="Regex Tester" description="Test regular expressions with flags. See matches and captured groups." canonicalPath="/tools/regex-tester" keywords={["regex tester","regular expression","regexp"]}>
      <div className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="grid gap-1 sm:col-span-2">
            <label className="text-sm font-medium">Pattern</label>
            <input className="rounded-md border bg-background px-3 py-2 font-mono dark:border-slate-800" value={pattern} onChange={(e) => setPattern(e.target.value)} />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium">Flags</label>
            <input className="rounded-md border bg-background px-3 py-2 font-mono dark:border-slate-800" value={flags} onChange={(e) => setFlags(e.target.value)} />
          </div>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Test text</label>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-[200px] font-mono" />
        </div>

        {matches.error ? (
          <p className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">{matches.error}</p>
        ) : (
          <div className="rounded-xl border bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/70">
            <div className="mb-2 text-sm text-slate-600 dark:text-slate-300">{matches.out.length} match(es)</div>
            <ul className="grid gap-2 text-sm">
              {matches.out.map((m, i) => (
                <li key={i} className="rounded-md border p-2 dark:border-slate-800">
                  <div><span className="rounded bg-slate-200 px-1 font-mono text-slate-800 dark:bg-slate-800 dark:text-slate-100">{m.match}</span> at index {m.index}</div>
                  {m.groups.length ? (
                    <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">Groups: {m.groups.map((g, j) => <span key={j} className="mr-1 rounded bg-slate-100 px-1 font-mono dark:bg-slate-800">{g}</span>)}</div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
