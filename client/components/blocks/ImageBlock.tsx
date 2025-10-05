export type ImageBlockProps = { url: string; alt?: string; caption?: string; rounded?: boolean };

export default function ImageBlock({ url, alt, caption, rounded = true }: ImageBlockProps) {
  return (
    <figure className="rounded-2xl border bg-white/70 p-4 backdrop-blur shadow-lg dark:bg-slate-900/60">
      <img src={url} alt={alt || ""} className={`w-full object-cover ${rounded ? "rounded-xl" : ""}`} />
      {caption ? <figcaption className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">{caption}</figcaption> : null}
    </figure>
  );
}
