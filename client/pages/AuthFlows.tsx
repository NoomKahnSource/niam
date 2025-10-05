import { FormEvent, useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export function RequestReset() {
  const { requestReset } = useAuth();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await requestReset(email);
      setToken(res.resetToken);
      navigator.clipboard?.writeText(res.resetToken).catch(() => {});
      toast.success("Reset token generated");
    } catch (e: any) {
      toast.error(e.message || "Failed to request reset");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-sm rounded-2xl border bg-white/70 p-6 backdrop-blur shadow-lg dark:bg-slate-900/60">
        <h1 className="text-xl font-semibold">Reset password</h1>
        <form onSubmit={onSubmit} className="mt-4 grid gap-3">
          <input className="rounded-md border bg-background px-3 py-2" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button disabled={loading} className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
            {loading ? "Generating..." : "Generate token"}
          </button>
        </form>
        <div className="mt-4 text-sm">
          {token ? (
            <div>
              <div className="mb-1 font-medium">Reset token</div>
              <div className="rounded-md border bg-white/60 p-2 text-xs dark:border-slate-700 dark:bg-slate-900/70">{token}</div>
              <p className="mt-1 opacity-70">Use this on the Set New Password page.</p>
            </div>
          ) : (
            <p className="opacity-70">Enter your email to get a reset token.</p>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export function ResetWithToken() {
  const { resetPassword } = useAuth();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(token, password);
      toast.success("Password updated. Sign in now.");
    } catch (e: any) {
      toast.error(e.message || "Failed to reset");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-sm rounded-2xl border bg-white/70 p-6 backdrop-blur shadow-lg dark:bg-slate-900/60">
        <h1 className="text-xl font-semibold">Set new password</h1>
        <form onSubmit={onSubmit} className="mt-4 grid gap-3">
          <input className="rounded-md border bg-background px-3 py-2" placeholder="Reset token" value={token} onChange={(e) => setToken(e.target.value)} required />
          <input className="rounded-md border bg-background px-3 py-2" placeholder="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button disabled={loading} className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
            {loading ? "Saving..." : "Update"}
          </button>
        </form>
      </div>
    </PageContainer>
  );
}
