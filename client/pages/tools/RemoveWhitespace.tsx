import ToolLayout from "@/components/tools/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState } from "react";

export default function RemoveWhitespace() {
  const [t, setT] = useState("");
  const [removeBreaks, setRemoveBreaks] = useState(true);
  const [trimSpaces, setTrimSpaces] = useState(true);
  const out = useMemo(() => {
    let s = t;
    if (removeBreaks) s = s.replace(/\r?\n+/g, " ");
    if (trimSpaces) s = s.replace(/\s+/g, " ").trim();
    return s;
  }, [t, removeBreaks, trimSpaces]);

  return (
    <ToolLayout title="Remove Line Breaks / Whitespace" description="Clean up text by removing extra spaces and line breaks." canonicalPath="/tools/remove-whitespace" keywords={["remove whitespace","strip line breaks","text cleaner"]}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Input</label>
          <Textarea value={t} onChange={(e) => setT(e.target.value)} className="min-h-[200px]" />
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={removeBreaks} onChange={(e) => setRemoveBreaks(e.target.checked)} /> Remove line breaks</label>
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={trimSpaces} onChange={(e) => setTrimSpaces(e.target.checked)} /> Collapse whitespace</label>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Output</label>
          <Textarea readOnly value={out} className="min-h-[200px]" />
        </div>
      </div>
    </ToolLayout>
  );
}
