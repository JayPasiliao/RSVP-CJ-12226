"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import type { GalleryImage } from "../our-love-story/data";

type Props = {
  images: GalleryImage[];
  heading?: string;
  subheading?: string;
};

export default function Gallery({ images, heading, subheading }: Props) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = useCallback((i: number) => {
    setIdx(i);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % images.length),
    [images.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, close, prev, next]);

  return (
    <section className="w-full">
      {heading && (
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-serif">{heading}</h2>
          {subheading && <p className="text-muted-foreground mt-2">{subheading}</p>}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={img.src + i}
            onClick={() => openAt(i)}
            className="group overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
            aria-label={`Open image ${i + 1}`}
          >
            <Image
              src={img.src}
              alt={img.alt || ""}
              width={1000}
              height={1000}
              className="aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        onClose={close}
        src={images[idx]?.src}
        alt={images[idx]?.alt}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
}

/* ---------- Lightbox (uses shadcn Dialog if present; otherwise native) ---------- */

let UsingShadcn = false;
try {
  // @ts-ignore - optional import
  const dialogModule = require("../components/ui/dialog");
  if (dialogModule && dialogModule.Dialog) {
    UsingShadcn = true;
  }
} catch {
  // shadcn dialog not available, use native
}

type LBProps = {
  open: boolean;
  onClose: () => void;
  src?: string;
  alt?: string;
  onPrev: () => void;
  onNext: () => void;
};

function Lightbox(props: LBProps) {
  return UsingShadcn ? <ShadcnLightbox {...props} /> : <NativeLightbox {...props} />;
}

// Shadcn version
function ShadcnLightbox({ open, onClose, src, alt, onPrev, onNext }: LBProps) {
  // @ts-ignore
  const { Dialog, DialogContent } = require("../components/ui/dialog");
  return (
    <Dialog open={open} onOpenChange={(v: boolean) => (!v ? onClose() : null)}>
      <DialogContent className="max-w-5xl border-none p-0">
        <div className="relative">
          <Image
            src={src || ""}
            alt={alt || ""}
            width={2000}
            height={1500}
            className="h-[70vh] w-full object-contain"
            priority
          />
          <LightboxControls onPrev={onPrev} onNext={onNext} onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Native version (no shadcn)
function NativeLightbox({ open, onClose, src, alt, onPrev, onNext }: LBProps) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div className="relative max-h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <Image
          src={src || ""}
          alt={alt || ""}
          width={2000}
          height={1500}
          className="h-[70vh] w-full object-contain"
          priority
        />
        <LightboxControls onPrev={onPrev} onNext={onNext} onClose={onClose} />
      </div>
    </div>
  );
}

function LightboxControls({
  onPrev,
  onNext,
  onClose,
}: {
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm shadow hover:bg-white"
        aria-label="Previous image"
      >
        ‹
      </button>
      <button
        onClick={onNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm shadow hover:bg-white"
        aria-label="Next image"
      >
        ›
      </button>
      <button
        onClick={onClose}
        className="absolute right-2 top-2 rounded-full bg-white/90 px-3 py-2 text-sm shadow hover:bg-white"
        aria-label="Close preview"
      >
        ✕
      </button>
    </>
  );
}

