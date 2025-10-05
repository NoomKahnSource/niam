import { ReactNode } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import FancyBackground from "@/components/layout/FancyBackground";
import MobileNav from "@/components/layout/MobileNav";

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-slate-800 dark:text-slate-100 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950">
      <FancyBackground />
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 pb-24">{children}</main>
      <MobileNav />
    </div>
  );
}
