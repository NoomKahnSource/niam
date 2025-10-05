import { FormEvent, useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(email, password, name);
      toast.success("Account created. You can sign in now.");
    } catch (e: any) {
      toast.error(e.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-sm rounded-2xl border bg-white/70 p-6 backdrop-blur shadow-lg dark:bg-slate-900/60">
        <h1 className="text-xl font-semibold">Create account</h1>
        <form onSubmit={onSubmit} className="mt-4 grid gap-3">
          <input className="rounded-md border bg-background px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="rounded-md border bg-background px-3 py-2" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="rounded-md border bg-background px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button disabled={loading} className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
            {loading ? "Creating..." : "Sign up"}
          </button>
        </form>
        <div className="mt-4 text-sm opacity-70">After creating your account, go to Sign in.</div>
      </div>
    </PageContainer>
  );
}
