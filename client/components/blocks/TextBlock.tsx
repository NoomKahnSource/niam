import { motion } from "framer-motion";

export type TextProps = { text: string };

export default function TextBlock({ text }: TextProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border bg-white/70 p-6 backdrop-blur shadow-lg dark:bg-slate-900/60"
    >
      <p className="prose prose-slate max-w-none leading-relaxed dark:prose-invert">{text}</p>
    </motion.section>
  );
}
