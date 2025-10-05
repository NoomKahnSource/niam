export type ButtonRowProps = { buttons: { label: string; href: string; variant?: "primary" | "secondary" }[] };

export default function ButtonRowBlock({ buttons }: ButtonRowProps) {
  return (
    <div className="rounded-2xl border bg-white/70 p-6 text-center backdrop-blur shadow-lg dark:bg-slate-900/60">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {buttons?.map((b, i) => (
          <a
            key={i}
            href={b.href}
            className={
              b.variant === "secondary"
                ? "rounded-md border px-4 py-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                : "rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            }
          >
            {b.label}
          </a>
        ))}
      </div>
    </div>
  );
}
