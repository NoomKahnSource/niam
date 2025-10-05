import PageContainer from "@/components/layout/PageContainer";
import SEO from "@/components/seo/SEO";
import { useAuth } from "@/context/AuthContext";
import { getPlan, setPlan } from "@/lib/plan";

export default function Pricing() {
  const { session } = useAuth();
  const plan = getPlan(session?.email);

  function upgrade() {
    if (!session) return;
    setPlan(session.email, "pro");
    // force reflect without full reload
    history.replaceState({}, "", location.href);
  }

  return (
    <PageContainer>
      <SEO title="Pricing – Niam Tools" description="Choose Free or Pro to unlock premium developer tools." canonicalPath="/pricing" keywords={["pricing","subscription","developer tools"]} />
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Simple, transparent pricing</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Start free. Upgrade anytime.</p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border bg-white/70 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-xl font-semibold">Free</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Core utilities. No credit card.</p>
            <div className="my-4 text-3xl font-bold">$0</div>
            <ul className="mb-6 grid gap-2 text-sm">
              <li>JSON formatter</li>
              <li>Base64 encoder/decoder</li>
              <li>Regex tester</li>
              <li>Word & character counter</li>
              <li>Hex ⇄ RGB converter</li>
            </ul>
            <button disabled className="w-full rounded-md border px-4 py-2 text-sm dark:border-slate-700">Current plan</button>
          </div>
          <div className="rounded-2xl border bg-white/80 p-6 shadow-sm ring-1 ring-slate-200 dark:border-slate-800 dark:bg-slate-900/70 dark:ring-slate-800">
            <h2 className="text-xl font-semibold">Pro</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Unlock premium generators and advanced tools.</p>
            <div className="my-4 text-3xl font-bold">$9<span className="text-base font-normal text-slate-500">/mo</span></div>
            <ul className="mb-6 grid gap-2 text-sm">
              <li>Everything in Free</li>
              <li>Text diff checker</li>
              <li>Password generator</li>
              <li>JWT decoder</li>
              <li>Epoch time converter</li>
              <li>More added regularly</li>
            </ul>
            {session ? (
              plan === "pro" ? (
                <button disabled className="w-full rounded-md border px-4 py-2 text-sm dark:border-slate-700">You're Pro</button>
              ) : (
                <button onClick={upgrade} className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-slate-900">Upgrade to Pro</button>
              )
            ) : (
              <a href="/signin" className="block w-full rounded-md bg-slate-900 px-4 py-2 text-center text-sm text-white dark:bg-white dark:text-slate-900">Sign in to upgrade</a>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
