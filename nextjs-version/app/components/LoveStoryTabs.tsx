"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/our-love-story", label: "All" },
  { href: "/our-love-story/proposal", label: "Proposal" },
  { href: "/our-love-story/pre-nup", label: "Pre-Nup" },
];

export default function LoveStoryTabs() {
  const pathname = usePathname();

  return (
    <nav className="mt-6 inline-flex gap-2 rounded-full bg-white/60 p-1 shadow-sm ring-1 ring-black/5">
      {tabs.map((tab) => {
        const isActive =
          (tab.href === "/our-love-story" && pathname === "/our-love-story") ||
          (tab.href !== "/our-love-story" && pathname?.startsWith(tab.href));
        
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-rose-100 text-rose-900"
                : "hover:bg-rose-50 text-gray-700"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

