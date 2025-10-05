import { motion } from "framer-motion";

export type StatsProps = { items: { label: string; value: string }[] };

export default function StatsBlock({ items }: StatsProps) {
  return (
    <section className="rounded-2xl border bg-white/70 p-6 backdrop-blur shadow-lg dark:bg-slate-900/60">
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-lg border bg-white/80 p-4 text-center shadow dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="text-2xl font-bold">{it.value}</div>
            <div className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-300">{it.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
