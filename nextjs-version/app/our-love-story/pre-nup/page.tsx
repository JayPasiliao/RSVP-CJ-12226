import Gallery from "../../components/Gallery";
import PillNav from "@/components/PillNav";
import { prenupImages } from "../data";

export const metadata = { title: "Our Love Story — Pre-Nup" };

export default function PrenupPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="relative z-20 text-center mb-8">
        <h1 className="font-serif text-4xl">Pre-Nup Session</h1>
        <p className="text-muted-foreground mt-2">Beautiful moments before the big day</p>

        <PillNav />
      </header>

      <Gallery images={prenupImages} />
    </main>
  );
}

