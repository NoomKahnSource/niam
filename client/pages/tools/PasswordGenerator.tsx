import ToolLayout from "@/components/tools/ToolLayout";
import PremiumGuard from "@/components/auth/PremiumGuard";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

function makePassword(len: number, flags: { u: boolean; l: boolean; d: boolean; s: boolean; }) {
  const U = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const L = "abcdefghijklmnopqrstuvwxyz";
  const D = "0123456789";
  const S = "!@#$%^&*()-_=+[]{};:,.?/";
  let pool = (flags.u?U:"") + (flags.l?L:"") + (flags.d?D:"") + (flags.s?S:"");
  if (!pool) pool = L + D;
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  let out = "";
  for (let i = 0; i < len; i++) out += pool[arr[i] % pool.length];
  return out;
}

export default function PasswordGenerator() {
  const [len, setLen] = useState(16);
  const [flags, setFlags] = useState({ u: true, l: true, d: true, s: true });
  const pwd = useMemo(() => makePassword(len, flags), [len, flags]);

  function copy() { navigator.clipboard.writeText(pwd); }

  return (
    <ToolLayout title="Password Generator" description="Generate strong, random passwords with customizable character sets." canonicalPath="/tools/password-generator" keywords={["password","generator","strong password"]}>
      <PremiumGuard>
        <div className="mx-auto max-w-xl rounded-2xl border bg-white/70 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <div className="mb-4 select-all rounded-md border bg-background px-3 py-3 font-mono text-lg dark:border-slate-800">{pwd}</div>
          <div className="grid gap-3">
            <label className="text-sm font-medium">Length: {len}</label>
            <input type="range" min={8} max={64} value={len} onChange={(e) => setLen(parseInt(e.target.value))} />
            <div className="grid grid-cols-2 gap-2 text-sm">
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={flags.u} onChange={(e) => setFlags({ ...flags, u: e.target.checked })} /> Uppercase</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={flags.l} onChange={(e) => setFlags({ ...flags, l: e.target.checked })} /> Lowercase</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={flags.d} onChange={(e) => setFlags({ ...flags, d: e.target.checked })} /> Numbers</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={flags.s} onChange={(e) => setFlags({ ...flags, s: e.target.checked })} /> Symbols</label>
            </div>
            <div>
              <Button variant="outline" onClick={copy}>Copy</Button>
            </div>
          </div>
        </div>
      </PremiumGuard>
    </ToolLayout>
  );
}
