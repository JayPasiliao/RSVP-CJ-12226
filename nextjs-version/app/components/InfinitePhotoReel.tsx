"use client";

import * as React from "react";
import type { GalleryImage } from "../lib/galleryData";

type Props = {
  title: React.ReactNode;
  subtitle?: string;
  images: GalleryImage[];
  cardWidth?: number;
  cardRatio?: number;
};

export default function InfinitePhotoReel({
  title,
  subtitle,
  images,
  cardWidth = 360,
  cardRatio = 0.9,
}: Props) {
  const [preview, setPreview] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);

  // Triple the images for seamless infinite scroll
  const tripledImages = [...images, ...images, ...images];

  const openPreview = (index: number) => {
    setPreview(index % images.length);
  };

  const closePreview = () => {
    setPreview(null);
  };

  const navigatePreview = (direction: "prev" | "next") => {
    if (preview === null) return;
    const newIndex =
      direction === "next"
        ? (preview + 1) % images.length
        : (preview - 1 + images.length) % images.length;
    setPreview(newIndex);
  };

  // Keyboard navigation
  React.useEffect(() => {
    if (preview === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPreview(null);
      } else if (e.key === "ArrowLeft") {
        setPreview((prev) => prev !== null ? (prev - 1 + images.length) % images.length : null);
      } else if (e.key === "ArrowRight") {
        setPreview((prev) => prev !== null ? (prev + 1) % images.length : null);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [preview, images.length]);

  // Inject animation styles
  React.useEffect(() => {
    const styleId = `infinite-reel-${images.length}`;
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes scrollLeft-${images.length} {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${(cardWidth + 16) * images.length}px); }
      }
      .infinite-reel-${images.length} {
        animation: scrollLeft-${images.length} 60s linear infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) existingStyle.remove();
    };
  }, [images.length, cardWidth]);

  return (
    <>
      <div className="mb-8 text-center">
        <h3 className="text-3xl font-serif text-gray-900">{title}</h3>
        {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
      </div>

      <div
        ref={containerRef}
        className="relative h-[400px] overflow-hidden rounded-2xl bg-gradient-to-r from-pink-50/50 via-transparent to-pink-50/50"
      >
        <div
          ref={trackRef}
          className={`flex h-full gap-4 infinite-reel-${images.length}`}
          style={{
            width: "max-content",
          }}
        >
          {tripledImages.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              onClick={() => openPreview(i)}
              className="group relative flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
              style={{
                width: `${cardWidth}px`,
                height: `${cardWidth * cardRatio}px`,
              }}
              aria-label={`View ${img.alt || "photo"}`}
            >
              <img
                src={img.src}
                alt={img.alt || `Photo ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
            </button>
          ))}
        </div>
      </div>

      {/* Full-screen preview */}
      {preview !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closePreview}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[preview].src}
              alt={images[preview].alt || `Photo ${preview + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            <button
              onClick={closePreview}
              className="absolute -top-2 -right-2 rounded-full bg-white/90 p-2 text-black hover:bg-white"
              aria-label="Close"
            >
              ✕
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={() => navigatePreview("prev")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-black hover:bg-white"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  onClick={() => navigatePreview("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-black hover:bg-white"
                  aria-label="Next"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </>
  );
}

