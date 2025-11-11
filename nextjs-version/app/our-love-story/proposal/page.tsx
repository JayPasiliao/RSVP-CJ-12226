import Gallery from "../../components/Gallery";
import PillNav from "@/components/PillNav";
import { proposalImages } from "../data";

export const metadata = { title: "Our Love Story — Proposal" };

export default function ProposalPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="relative z-20 text-center mb-8">
        <h1 className="font-serif text-4xl">The Proposal</h1>
        <p className="text-muted-foreground mt-2">Our special moment captured forever</p>

        <PillNav />
      </header>

      <Gallery images={proposalImages} />
    </main>
  );
}

