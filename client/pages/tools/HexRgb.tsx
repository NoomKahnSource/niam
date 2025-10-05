import ToolLayout from "@/components/tools/ToolLayout";
import { useEffect, useState } from "react";

function hexToRgb(hex: string) {
  const v = hex.replace(/^#/, "");
  if (![3, 6].includes(v.length)) return null;
  const n = v.length === 3 ? v.split("").map((c) => c + c).join("") : v;
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return { r, g, b };
}
function rgbToHex(r: number, g: number, b: number) {
  const f = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${f(r)}${f(g)}${f(b)}`;
}

export default function HexRgb() {
  const [hex, setHex] = useState("#0f172a");
  const [r, setR] = useState(15);
  const [g, setG] = useState(23);
  const [b, setB] = useState(42);

  useEffect(() => {
    const c = hexToRgb(hex);
    if (c) { setR(c.r); setG(c.g); setB(c.b); }
  }, [hex]);
  useEffect(() => {
    setHex(rgbToHex(r, g, b));
  }, [r, g, b]);

  return (
    <ToolLayout title="Hex ⇄ RGB Converter" description="Convert between Hex and RGB color formats instantly." canonicalPath="/tools/hex-rgb" keywords={["hex to rgb","rgb to hex","color converter"]}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Hex</label>
          <input value={hex} onChange={(e) => setHex(e.target.value)} className="rounded-md border bg-background px-3 py-2 font-mono dark:border-slate-800" />
          <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="h-10 w-24 rounded-md border dark:border-slate-800" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">RGB</label>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" min={0} max={255} value={r} onChange={(e) => setR(parseInt(e.target.value)||0)} className="rounded-md border bg-background px-3 py-2 font-mono dark:border-slate-800" />
            <input type="number" min={0} max={255} value={g} onChange={(e) => setG(parseInt(e.target.value)||0)} className="rounded-md border bg-background px-3 py-2 font-mono dark:border-slate-800" />
            <input type="number" min={0} max={255} value={b} onChange={(e) => setB(parseInt(e.target.value)||0)} className="rounded-md border bg-background px-3 py-2 font-mono dark:border-slate-800" />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
