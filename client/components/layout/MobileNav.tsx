import { Link, useLocation } from "react-router-dom";
import { Home, BadgeInfo, Images, Briefcase, BookText, Mail, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const items = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/about", label: "About", Icon: BadgeInfo },
  { to: "/services", label: "Services", Icon: Briefcase },
  { to: "/gallery", label: "Gallery", Icon: Images },
  { to: "/blog", label: "Blog", Icon: BookText },
  { to: "/contact", label: "Contact", Icon: Mail },
];

export default function MobileNav() {
  const { pathname } = useLocation();
  const { session, isAdmin } = useAuth();
  const extra: any[] = isAdmin ? [{ to: "/admin", label: "Admin", Icon: Settings }] : [];
  const list = [...items, ...extra];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 sm:hidden">
      <ul className="grid grid-cols-4 gap-1 p-2 text-xs">
        {list.slice(0, 4).map(({ to, label, Icon }) => (
          <li key={to}>
            <Link
              to={to}
              className={`flex flex-col items-center rounded-md px-2 py-1 ${
                pathname === to ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          </li>
        ))}
        {list.slice(4).map(({ to, label, Icon }) => (
          <li key={to}>
            <Link
              to={to}
              className={`flex flex-col items-center rounded-md px-2 py-1 ${
                pathname === to ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
