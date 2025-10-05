import { ReactNode } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getPlan } from "@/lib/plan";

export default function PremiumGuard({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  if (!session) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border bg-white/70 p-6 text-center shadow dark:border-slate-800 dark:bg-slate-900/70">
        <h2 className="mb-2 text-xl font-semibold">Sign in to access premium tools</h2>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">Create a free account and upgrade to Pro for premium features.</p>
        <div className="flex justify-center gap-2">
          <Link to="/signin" className="rounded-md border px-4 py-2 text-sm dark:border-slate-700">Sign in</Link>
          <Link to="/signup" className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-slate-900">Sign up</Link>
        </div>
      </div>
    );
  }
  const plan = getPlan(session.email);
  if (plan !== "pro") {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border bg-white/70 p-6 text-center shadow dark:border-slate-800 dark:bg-slate-900/70">
        <h2 className="mb-2 text-xl font-semibold">Upgrade to Pro</h2>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">This tool requires a Pro subscription.</p>
        <div className="flex justify-center">
          <Link to="/pricing" className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-slate-900">View Pricing</Link>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
