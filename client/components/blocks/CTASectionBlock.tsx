import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export type CTAProps = { title: string; description?: string; buttonLabel?: string; buttonHref?: string };

export default function CTASectionBlock({ title, description, buttonLabel, buttonHref = "#" }: CTAProps) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border bg-white/70 p-6 text-center backdrop-blur shadow-lg dark:bg-slate-900/60"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      {description ? (
        <p className="mx-auto mt-2 max-w-xl text-slate-600 dark:text-slate-300">{description}</p>
      ) : null}
      {buttonLabel ? (
        <Link
          to={buttonHref}
          className="mt-4 inline-block rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          {buttonLabel}
        </Link>
      ) : null}
    </motion.section>
  );
}
