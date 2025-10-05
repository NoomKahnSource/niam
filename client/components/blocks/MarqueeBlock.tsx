export type MarqueeProps = { items: string[] };

export default function MarqueeBlock({ items }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden rounded-2xl border bg-white/70 backdrop-blur dark:bg-slate-900/60">
      <div className="marquee-row">
        {row.map((t, i) => (
          <span key={i} className="marquee-item">{t}</span>
        ))}
      </div>
    </div>
  );
}
