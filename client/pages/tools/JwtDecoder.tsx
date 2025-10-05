import ToolLayout from "@/components/tools/ToolLayout";
import PremiumGuard from "@/components/auth/PremiumGuard";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState } from "react";

function b64urlDecode(input: string) {
  try {
    const pad = (s: string) => s + "===".slice((s.length + 3) % 4);
    const s = input.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(pad(s));
    return decodeURIComponent(json.split("").map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`).join(""));
  } catch {
    return "";
  }
}

export default function JwtDecoder() {
  const [t, setT] = useState("");
  const decoded = useMemo(() => {
    const parts = t.split(".");
    if (parts.length < 2) return { header: "", payload: "", signature: parts[2] || "" };
    const header = b64urlDecode(parts[0]);
    const payload = b64urlDecode(parts[1]);
    return { header: header ? JSON.stringify(JSON.parse(header), null, 2) : "", payload: payload ? JSON.stringify(JSON.parse(payload), null, 2) : "", signature: parts[2] || "" };
  }, [t]);

  return (
    <ToolLayout title="JWT Decoder" description="Decode JSON Web Tokens (JWT) without sending data anywhere." canonicalPath="/tools/jwt-decoder" keywords={["jwt","decoder","json web token"]}>
      <PremiumGuard>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Token</label>
            <Textarea value={t} onChange={(e) => setT(e.target.value)} className="min-h-[120px] font-mono" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Header</label>
              <Textarea readOnly value={decoded.header} className="min-h-[200px] font-mono" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Payload</label>
              <Textarea readOnly value={decoded.payload} className="min-h-[200px] font-mono" />
            </div>
          </div>
          <div className="rounded-2xl border bg-white/70 p-3 text-sm dark:border-slate-800 dark:bg-slate-900/70">Signature: <span className="font-mono">{decoded.signature}</span></div>
        </div>
      </PremiumGuard>
    </ToolLayout>
  );
}
