import ToolLayout from "@/components/tools/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState } from "react";
import PremiumGuard from "@/components/auth/PremiumGuard";

function diffLines(a: string, b: string) {
  const A = a.split(/\r?\n/);
  const B = b.split(/\r?\n/);
  const m = A.length, n = B.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const res: { type: "common" | "add" | "del"; text: string }[] = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (A[i] === B[j]) { res.push({ type: "common", text: A[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { res.push({ type: "del", text: A[i++] }); }
    else { res.push({ type: "add", text: B[j++] }); }
  }
  while (i < m) res.push({ type: "del", text: A[i++] });
  while (j < n) res.push({ type: "add", text: B[j++] });
  return res;
}

export default function TextDiff() {
  const [left, setLeft] = useState("one\ntwo\nthree");
  const [right, setRight] = useState("zero\ntwo\nthree\nfour");
  const rows = useMemo(() => diffLines(left, right), [left, right]);

  return (
    <ToolLayout title="Text Diff Checker" description="Compare two texts line-by-line and see additions and deletions." canonicalPath="/tools/text-diff" keywords={["diff","compare","text diff"]}>
      <PremiumGuard>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Left</label>
            <Textarea value={left} onChange={(e) => setLeft(e.target.value)} className="min-h-[240px] font-mono" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Right</label>
            <Textarea value={right} onChange={(e) => setRight(e.target.value)} className="min-h-[240px] font-mono" />
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border dark:border-slate-800">
          <ul className="divide-y dark:divide-slate-800">
            {rows.map((r, i) => (
              <li key={i} className={
                r.type === "common" ? "bg-white/70 px-3 py-1.5 text-sm dark:bg-slate-900/70" :
                r.type === "add" ? "bg-emerald-50 px-3 py-1.5 text-sm text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200" :
                "bg-red-50 px-3 py-1.5 text-sm text-red-900 dark:bg-red-950 dark:text-red-200"
              }>
                <span className="mr-2 rounded px-1 text-xs"
                >{r.type === "common" ? " " : r.type === "add" ? "+" : "-"}</span>
                <span className="whitespace-pre-wrap">{r.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </PremiumGuard>
    </ToolLayout>
  );
}
