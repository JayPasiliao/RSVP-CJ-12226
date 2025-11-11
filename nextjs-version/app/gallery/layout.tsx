"use client";

import GalleryTabs from "../components/GalleryTabs";

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <header className="text-center mb-6">
        <h2 className="text-4xl font-serif">Our Love Story</h2>
        <p className="mt-2 text-muted-foreground">
          Cherished moments from our journey together
        </p>
        <div className="mt-5">
          <GalleryTabs />
        </div>
      </header>
      {children}
    </section>
  );
}

