import ToolLayout from "@/components/tools/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function toTitle(s: string) { return s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()); }
function toSnake(s: string) { return s.trim().replace(/\s+/g, "_").replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase(); }
function toKebab(s: string) { return s.trim().replace(/\s+/g, "-").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(); }
function toCamel(s: string) { const words = s.trim().split(/[\s_-]+/); return words[0].toLowerCase() + words.slice(1).map(w => w[0].toUpperCase()+w.slice(1).toLowerCase()).join(""); }

export default function TextCase() {
  const [t, setT] = useState("");
  const [out, setOut] = useState("");

  return (
    <ToolLayout title="Text Case Converter" description="Convert text to upper, lower, title, camelCase, snake_case, or kebab-case." canonicalPath="/tools/text-case" keywords={["case converter","camelCase","snake_case","kebab-case"]}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Input</label>
          <Textarea value={t} onChange={(e) => setT(e.target.value)} className="min-h-[200px]" />
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setOut(t.toUpperCase())}>UPPERCASE</Button>
            <Button variant="secondary" onClick={() => setOut(t.toLowerCase())}>lowercase</Button>
            <Button variant="secondary" onClick={() => setOut(toTitle(t))}>Title Case</Button>
            <Button variant="secondary" onClick={() => setOut(toCamel(t))}>camelCase</Button>
            <Button variant="secondary" onClick={() => setOut(toSnake(t))}>snake_case</Button>
            <Button variant="secondary" onClick={() => setOut(toKebab(t))}>kebab-case</Button>
          </div>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Output</label>
          <Textarea readOnly value={out} className="min-h-[200px]" />
        </div>
      </div>
    </ToolLayout>
  );
}
