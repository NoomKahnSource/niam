import { motion } from "framer-motion";

export type PricingTableProps = {
  plans: { name: string; price: string; features: string[]; ctaLabel: string; ctaHref: string }[];
};

export default function PricingTableBlock({ plans }: PricingTableProps) {
  return (
    <section className="rounded-2xl border bg-white/70 p-6 backdrop-blur shadow-lg dark:bg-slate-900/60">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-xl border bg-white/80 p-5 shadow hover:-translate-y-1 hover:shadow-md transition dark:border-slate-800 dark:bg-slate-900/70"
          >
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="mt-1 text-2xl font-bold">{p.price}</p>
            <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
              {p.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <a href={p.ctaHref} className="mt-4 inline-block rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
              {p.ctaLabel}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
