import ToolLayout from "@/components/tools/ToolLayout";
import PremiumGuard from "@/components/auth/PremiumGuard";
import { useEffect, useState } from "react";

function toEpoch(d: Date) { return Math.floor(d.getTime() / 1000); }
function fromEpoch(e: number) { return new Date(e * 1000); }

export default function EpochTime() {
  const [epoch, setEpoch] = useState(() => toEpoch(new Date()));
  const [iso, setIso] = useState(() => new Date().toISOString());

  useEffect(() => {
    const d = fromEpoch(epoch);
    setIso(d.toISOString());
  }, [epoch]);

  useEffect(() => {
    const d = new Date(iso);
    if (!isNaN(d.getTime())) setEpoch(toEpoch(d));
  }, [iso]);

  return (
    <ToolLayout title="Epoch Time Converter" description="Convert between Unix epoch seconds and ISO date time." canonicalPath="/tools/epoch-time" keywords={["epoch","unix time","timestamp"]}>
      <PremiumGuard>
        <div className="mx-auto grid max-w-2xl gap-4">
          <div className="grid gap-1">
            <label className="text-sm font-medium">Epoch seconds</label>
            <input type="number" value={epoch} onChange={(e) => setEpoch(parseInt(e.target.value)||0)} className="rounded-md border bg-background px-3 py-2 font-mono dark:border-slate-800" />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium">ISO 8601</label>
            <input value={iso} onChange={(e) => setIso(e.target.value)} className="rounded-md border bg-background px-3 py-2 font-mono dark:border-slate-800" />
          </div>
          <div className="rounded-2xl border bg-white/70 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div>Local: {fromEpoch(epoch).toString()}</div>
            <div>UTC: {fromEpoch(epoch).toUTCString()}</div>
          </div>
        </div>
      </PremiumGuard>
    </ToolLayout>
  );
}
