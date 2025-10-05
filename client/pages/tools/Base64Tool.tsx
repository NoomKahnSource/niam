import { useEffect, useMemo, useState } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function b64encode(str: string) {
  try { return btoa(unescape(encodeURIComponent(str))); } catch { return ""; }
}
function b64decode(str: string) {
  try { return decodeURIComponent(escape(atob(str))); } catch { return ""; }
}

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");

  useEffect(() => { setEncoded(b64encode(input)); }, [input]);
  useEffect(() => { setDecoded(b64decode(encoded)); }, [encoded]);

  function copy(val: string) { navigator.clipboard.writeText(val || ""); }

  return (
    <ToolLayout title="Base64 Encoder / Decoder" description="Encode or decode Base64 text. Works fully offline in your browser." canonicalPath="/tools/base64" keywords={["base64","encode","decode"]}>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2 md:col-span-1">
          <label className="text-sm font-medium">Input</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[240px] font-mono" />
        </div>
        <div className="grid gap-2 md:col-span-1">
          <label className="text-sm font-medium">Encoded</label>
          <Textarea value={encoded} onChange={(e) => setEncoded(e.target.value)} className="min-h-[240px] font-mono" />
          <Button variant="outline" onClick={() => copy(encoded)}>Copy</Button>
        </div>
        <div className="grid gap-2 md:col-span-1">
          <label className="text-sm font-medium">Decoded</label>
          <Textarea value={decoded} readOnly className="min-h-[240px] font-mono" />
          <Button variant="outline" onClick={() => copy(decoded)}>Copy</Button>
        </div>
      </div>
    </ToolLayout>
  );
}
