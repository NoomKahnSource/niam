import { useState } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function JsonFormatter() {
  const [input, setInput] = useState("{\n  \"hello\":\"world\"\n}");
  const [output, setOutput] = useState("{");
  const [error, setError] = useState<string | null>(null);

  function format(pretty: boolean) {
    setError(null);
    try {
      const obj = JSON.parse(input);
      setOutput(pretty ? JSON.stringify(obj, null, 2) : JSON.stringify(obj));
    } catch (e: any) {
      setError(e.message || String(e));
      setOutput("");
    }
  }

  function copy() {
    navigator.clipboard.writeText(output || "");
  }

  return (
    <ToolLayout title="JSON Formatter / Beautifier" description="Validate, prettify, or minify JSON instantly in your browser." canonicalPath="/tools/json-formatter" keywords={["json formatter","json beautifier","json validator"]}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Input JSON</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[320px] font-mono" />
          <div className="flex gap-2">
            <Button onClick={() => format(true)} variant="default">Prettify</Button>
            <Button onClick={() => format(false)} variant="secondary">Minify</Button>
          </div>
          {error ? <p className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">{error}</p> : null}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Output</label>
          <Textarea readOnly value={output} className="min-h-[320px] font-mono" />
          <div className="flex gap-2">
            <Button onClick={copy} variant="outline">Copy</Button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
