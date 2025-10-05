import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export type HeroProps = {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function HeroBlock({ title, subtitle, primaryLabel, primaryHref = "#", secondaryLabel, secondaryHref = "#" }: HeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border bg-white/70 p-8 text-center backdrop-blur shadow-lg dark:bg-slate-900/60"
    >
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {subtitle ? (
        <p className="mx-auto mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{subtitle}</p>
      ) : null}
      <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row">
        {primaryLabel ? (
          <Link
            to={primaryHref}
            className="rounded-md bg-slate-900 px-5 py-2.5 text-white shadow hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md transition dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {primaryLabel}
          </Link>
        ) : null}
        {secondaryLabel ? (
          <Link
            to={secondaryHref}
            className="rounded-md border px-5 py-2.5 hover:bg-slate-100 transition dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {secondaryLabel}
          </Link>
        ) : null}
      </div>
    </motion.section>
  );
}
