import ToolLayout from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function uuidv4() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  const b = Array.from(bytes, toHex);
  return `${b[0]}${b[1]}${b[2]}${b[3]}-${b[4]}${b[5]}-${b[6]}${b[7]}-${b[8]}${b[9]}-${b[10]}${b[11]}${b[12]}${b[13]}${b[14]}${b[15]}`;
}

export default function UuidGenerator() {
  const [val, setVal] = useState(uuidv4());
  function gen() { setVal(uuidv4()); }
  function copy() { navigator.clipboard.writeText(val); }

  return (
    <ToolLayout title="UUID Generator" description="Generate RFC4122 version 4 UUIDs securely using the Web Crypto API." canonicalPath="/tools/uuid-generator" keywords={["uuid","generator","guid"]}>
      <div className="mx-auto max-w-xl rounded-2xl border bg-white/70 p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mb-4 select-all rounded-md border bg-background px-3 py-3 font-mono text-lg dark:border-slate-800">{val}</div>
        <div className="flex justify-center gap-2">
          <Button onClick={gen}>Generate</Button>
          <Button variant="outline" onClick={copy}>Copy</Button>
        </div>
      </div>
    </ToolLayout>
  );
}
