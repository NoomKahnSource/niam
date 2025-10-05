export type FAQProps = { items: { q: string; a: string }[] };

export default function FAQBlock({ items }: FAQProps) {
  return (
    <section className="rounded-2xl border bg-white/70 p-6 backdrop-blur shadow-lg dark:bg-slate-900/60">
      <h2 className="mb-3 text-xl font-semibold">FAQ</h2>
      <div className="divide-y">
        {items.map((it, i) => (
          <details key={i} className="group py-3">
            <summary className="cursor-pointer list-none">
              <span className="inline-block transition group-open:translate-x-1">{it.q}</span>
            </summary>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
