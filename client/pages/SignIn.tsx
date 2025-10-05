import { FormEvent, useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Signed in");
      nav("/");
    } catch (e: any) {
      toast.error(e.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-sm rounded-2xl border bg-white/70 p-6 backdrop-blur shadow-lg dark:bg-slate-900/60">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <form onSubmit={onSubmit} className="mt-4 grid gap-3">
          <input className="rounded-md border bg-background px-3 py-2" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="rounded-md border bg-background px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button disabled={loading} className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="mt-3 text-sm">
          <Link to="/reset" className="underline">Forgot password?</Link>
        </div>
        <div className="mt-1 text-sm">
          New here? <Link to="/signup" className="underline">Create an account</Link>
        </div>
      </div>
    </PageContainer>
  );
}
