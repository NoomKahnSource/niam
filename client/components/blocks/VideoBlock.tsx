export type VideoBlockProps = { youtubeId?: string; url?: string; title?: string };

export default function VideoBlock({ youtubeId, url, title }: VideoBlockProps) {
  const src = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : url || "";
  return (
    <div className="aspect-video overflow-hidden rounded-2xl border bg-white/70 shadow-lg backdrop-blur dark:bg-slate-900/60">
      {src ? (
        <iframe
          className="h-full w-full"
          src={src}
          title={title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm opacity-60">Add a video URL</div>
      )}
    </div>
  );
}
