import ToolLayout from "@/components/tools/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState } from "react";

export default function ReverseText() {
  const [t, setT] = useState("");
  const out = useMemo(() => t.split("").reverse().join(""), [t]);
  return (
    <ToolLayout title="Reverse Text" description="Reverse any text string instantly." canonicalPath="/tools/reverse-text" keywords={["reverse text","flip text"]}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Input</label>
          <Textarea value={t} onChange={(e) => setT(e.target.value)} className="min-h-[200px]" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Output</label>
          <Textarea readOnly value={out} className="min-h-[200px]" />
        </div>
      </div>
    </ToolLayout>
  );
}
