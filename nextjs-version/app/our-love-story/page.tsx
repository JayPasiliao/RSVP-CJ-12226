import Gallery from "../components/Gallery";
import PillNav from "@/components/PillNav";
import { allImages } from "./data";

export default function LoveStoryPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="relative z-20 text-center mb-8">
        <h1 className="font-serif text-4xl">Our Love Story</h1>
        <p className="text-muted-foreground mt-2">Cherished moments from our journey together</p>

        <PillNav />
      </header>

      <Gallery
        images={allImages}
        heading="All Moments"
        subheading="Everything in one place"
      />
    </main>
  );
}

