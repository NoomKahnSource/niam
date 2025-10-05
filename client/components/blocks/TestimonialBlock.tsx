import { motion } from "framer-motion";

export type TestimonialProps = { quote: string; author?: string };

export default function TestimonialBlock({ quote, author }: TestimonialProps) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border bg-white/70 p-6 italic backdrop-blur shadow-lg dark:bg-slate-900/60"
    >
      “{quote}”{author ? <footer className="mt-2 not-italic text-slate-600 dark:text-slate-300">— {author}</footer> : null}
    </motion.blockquote>
  );
}
