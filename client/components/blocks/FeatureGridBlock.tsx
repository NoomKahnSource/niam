import { motion } from "framer-motion";

export type FeatureGridProps = { title?: string; items: string[] };

export default function FeatureGridBlock({ title, items }: FeatureGridProps) {
  return (
    <section className="rounded-2xl border bg-white/70 p-6 backdrop-blur shadow-lg dark:bg-slate-900/60">
      {title ? <h2 className="mb-4 text-xl font-semibold">{title}</h2> : null}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-xl border bg-white/70 p-4 shadow dark:border-slate-800 dark:bg-slate-900/60"
          >
            <div className="mb-2 h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800" />
            <p className="text-sm text-slate-700 dark:text-slate-300">{it}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
