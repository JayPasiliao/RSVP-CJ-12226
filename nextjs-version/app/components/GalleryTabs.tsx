"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const tabs = [
  { href: "/gallery/all/", label: "All" },
  { href: "/gallery/proposal/", label: "Proposal" },
  { href: "/gallery/prenup/", label: "Pre-Nup" },
];

export default function GalleryTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  if (!mounted) {
    return (
      <nav className="gallery-filters">
        {tabs.map(t => (
          <a
            key={t.href}
            href={t.href}
            className="filter-pill"
            onClick={(e) => handleClick(e, t.href)}
          >
            {t.label}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <nav className="gallery-filters">
      {tabs.map(t => {
        // Normalize paths for comparison
        const currentPath = pathname?.replace(/\/$/, '') || '';
        const tabPath = t.href.replace(/\/$/, '');
        const isActive = currentPath === tabPath || currentPath.startsWith(tabPath + '/');

        return (
          <a
            key={t.href}
            href={t.href}
            className={isActive ? "filter-pill active" : "filter-pill"}
            onClick={(e) => handleClick(e, t.href)}
          >
            {t.label}
          </a>
        );
      })}
    </nav>
  );
}

