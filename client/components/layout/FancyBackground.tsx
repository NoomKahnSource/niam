import { motion } from "framer-motion";

export default function FancyBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-slate-300/30 blur-3xl dark:bg-slate-700/30"
        animate={{ x: [0, 30, -10, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-slate-400/30 blur-3xl dark:bg-slate-600/30"
        animate={{ x: [0, -20, 10, 0], y: [0, -10, 15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
