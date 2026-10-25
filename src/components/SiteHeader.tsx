"use client";

import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/Button";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-b border-charcoal/10 bg-offwhite/95 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-charcoal/20 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-4">
        <a
          href="#"
          className={`font-display text-base tracking-[0.2em] transition-colors sm:text-lg ${
            scrolled ? "text-charcoal" : "text-offwhite"
          }`}
        >
          SATURDAY · 7 AM · CONWAY
        </a>
        <LinkButton
          href="#interest"
          variant="accent"
          size="sm"
          showChevron={false}
          className="shadow-md"
        >
          I&apos;M INTERESTED
        </LinkButton>
      </div>
    </header>
  );
}
