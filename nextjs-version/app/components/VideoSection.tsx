"use client";

import * as React from "react";

type VideoItem = {
  title: string;
  caption?: string;
  poster: string;          // poster image path
  youtubeId?: string;      // e.g. "dQw4w9WgXcQ"
  vimeoId?: string;        // e.g. "123456789"
  src?: string;            // local/remote MP4 fallback
};

type Props = {
  heading: string;
  subheading?: string;
  items: VideoItem[];
};

export default function VideoSection({ heading, subheading, items }: Props) {
  const [open, setOpen] = React.useState<null | number>(null);

  const openIdx = (i: number) => setOpen(i);
  const close = () => setOpen(null);

  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (open !== null) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  const renderEmbed = (item: VideoItem) => {
    if (item.youtubeId) {
      return (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1`}
          title={item.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      );
    }
    if (item.vimeoId) {
      return (
        <iframe
          className="h-full w-full"
          src={`https://player.vimeo.com/video/${item.vimeoId}?title=0&byline=0&portrait=0`}
          title={item.title}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }
    return (
      <video
        className="h-full w-full"
        src={item.src}
        poster={item.poster}
        controls
        playsInline
      />
    );
  };

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8 text-center">
        <h2 className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-3xl sm:text-4xl font-serif text-transparent">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-2 text-muted-foreground">{subheading}</p>
        )}
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((v, i) => (
          <button
            key={v.title + i}
            onClick={() => openIdx(i)}
            className="group relative overflow-hidden rounded-2xl bg-black/5 shadow-lg ring-1 ring-black/5 transition hover:shadow-xl"
            style={{ aspectRatio: "16 / 9" }}
            aria-label={`Play ${v.title}`}
          >
            <img
              src={v.poster}
              alt={v.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/10" />
            <div className="absolute left-4 bottom-4 right-4">
              <h3 className="text-white drop-shadow text-lg font-medium">
                {v.title}
              </h3>
              {v.caption && (
                <p className="text-white/80 text-sm">{v.caption}</p>
              )}
            </div>
            {/* Play button */}
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-black shadow group-hover:scale-110 transition">
                ▶
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 md:p-6"
          onClick={close}
        >
          <div
            className="relative mx-auto grid h-full max-w-6xl place-items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
              {renderEmbed(items[open])}
            </div>

            <button
              onClick={close}
              className="absolute -top-2 right-0 md:-top-6 md:right-0 rounded-full bg-white/90 px-4 py-2 text-sm text-black hover:bg-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

