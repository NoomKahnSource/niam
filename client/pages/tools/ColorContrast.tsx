import ToolLayout from "@/components/tools/ToolLayout";
import { useMemo, useState } from "react";

function parseHex(hex: string) {
  const v = hex.replace(/^#/, "");
  if (v.length === 3) {
    const r = parseInt(v[0] + v[0], 16);
    const g = parseInt(v[1] + v[1], 16);
    const b = parseInt(v[2] + v[2], 16);
    return [r, g, b];
  }
  if (v.length === 6) {
    const r = parseInt(v.slice(0, 2), 16);
    const g = parseInt(v.slice(2, 4), 16);
    const b = parseInt(v.slice(4, 6), 16);
    return [r, g, b];
  }
  return [0, 0, 0];
}

function luminance([r, g, b]: number[]) {
  const a = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrastRatio(fg: string, bg: string) {
  const L1 = luminance(parseHex(fg));
  const L2 = luminance(parseHex(bg));
  const bright = Math.max(L1, L2);
  const dark = Math.min(L1, L2);
  return (bright + 0.05) / (dark + 0.05);
}

export default function ColorContrast() {
  const [fg, setFg] = useState("#111827");
  const [bg, setBg] = useState("#ffffff");
  const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg]);
  const passAA = ratio >= 4.5;
  const passAAA = ratio >= 7;

  return (
    <ToolLayout title="Color Contrast Checker" description="Check WCAG contrast ratios for text on background colors." canonicalPath="/tools/color-contrast" keywords={["color contrast","wcag","accessibility"]}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Text color</label>
          <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 w-24 rounded-md border dark:border-slate-800" />
          <label className="text-sm font-medium">Background color</label>
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 w-24 rounded-md border dark:border-slate-800" />
        </div>
        <div className="grid gap-3">
          <div className="contrast-sample rounded-2xl border p-5 shadow-sm dark:border-slate-800" style={{ ['--bg' as any]: bg, ['--fg' as any]: fg }}>
            <p className="contrast-text text-lg font-semibold">Contrast preview</p>
            <p className="contrast-text mt-1">The quick brown fox jumps over the lazy dog.</p>
          </div>
          <div className="rounded-2xl border bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/70">
            <div className="text-sm">Ratio: {ratio.toFixed(2)}:1</div>
            <div className="text-sm">AA: {passAA ? "Pass" : "Fail"} | AAA: {passAAA ? "Pass" : "Fail"}</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
