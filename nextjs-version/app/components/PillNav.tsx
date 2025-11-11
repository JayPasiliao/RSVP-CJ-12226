"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

// Edit this to match your config:
const TRAILING = true; // true if next.config.js has trailingSlash: true
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ""; // respect basePath if used
const base = `${BASE_PATH}/our-love-story`;

const HREFS = [
  { label: "All", href: `${base}${TRAILING ? "/" : ""}` },
  { label: "Proposal", href: `${base}/proposal${TRAILING ? "/" : ""}` },
  { label: "Pre-Nup", href: `${base}/pre-nup${TRAILING ? "/" : ""}` },
];

const norm = (p: string) =>
  TRAILING ? (p.endsWith("/") ? p : p + "/") : p.replace(/\/$/, "");

export default function PillNav() {
  const pathname = usePathname();
  const router = useRouter();
  const go = useCallback((to: string) => {
    // router fallback: in case some wrapper prevents default on <Link>
    router.push(to);
  }, [router]);

  return (
    <nav
      className="mt-6 inline-flex gap-2 rounded-full bg-white/60 p-1 shadow-sm ring-1 ring-black/5 relative z-30 isolate pointer-events-auto"
      data-test="pill-nav"
    >
      {HREFS.map(({ href, label }) => {
        const active = norm(pathname || "") === norm(href);
        return (
          <Link
            key={href}
            href={href}
            prefetch
            aria-current={active ? "page" : undefined}
            role="tab"
            onClick={(e) => {
              // If any ancestor tries to block, ensure navigation still happens.
              // We do NOT preventDefault here; this is just a safety net.
              setTimeout(() => go(href), 0);
            }}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition outline-none",
              active ? "bg-rose-100 text-rose-900" : "hover:bg-rose-50 text-gray-700",
            ].join(" ")}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
