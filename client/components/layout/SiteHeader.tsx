import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const nav = [
  { to: "/", label: "Home" },
  { to: "/tools", label: "Tools" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function initials(email: string) {
  const base = email.split("@")[0];
  const parts = base.split(/[._-]+/).filter(Boolean);
  const letters = (parts[0]?.[0] || base[0] || "?") + (parts[1]?.[0] || "");
  return letters.toUpperCase();
}

function AuthActions() {
  const { session, isAdmin, signOut } = useAuth();

  if (!session) {
    return (
      <div className="hidden items-center gap-2 sm:flex">
        <Link to="/signin" className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">Sign in</Link>
        <Link to="/signup" className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">Sign up</Link>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-2 sm:flex">
      {isAdmin ? (
        <Link to="/admin" className="rounded-full border px-3 py-1.5 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">Admin</Link>
      ) : null}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">
          {initials(session.email)}
        </div>
        <button onClick={() => signOut()} className="rounded-md border px-2 py-1 text-xs hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">Sign out</button>
      </div>
    </div>
  );
}

export default function SiteHeader() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!document.title) document.title = "Niam Tools";
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur transition ${scrolled ? "border-b bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/70" : "border-b bg-white/60 dark:border-slate-800 dark:bg-slate-900/50"}`}>
      <div className="relative mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Niam Tools
          </Link>

          <nav className="hidden gap-1 text-sm sm:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`relative rounded-md px-3 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800 ${
                  pathname === n.to ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {n.label}
                {pathname === n.to ? (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-slate-900 dark:bg-white" />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <AuthActions />
            <button
              className="rounded-md border px-3 py-1.5 text-sm sm:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              Menu
            </button>
          </div>
        </div>

        {open ? (
          <div
            id="mobile-nav"
            className="mt-3 grid gap-2 rounded-lg border bg-white/90 p-2 shadow dark:border-slate-800 dark:bg-slate-900/80 sm:hidden"
          >
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 ${
                  pathname === n.to ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}
