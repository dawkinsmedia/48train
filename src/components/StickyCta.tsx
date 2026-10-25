"use client";

import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/Button";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-charcoal/10 bg-offwhite/95 px-4 py-3 backdrop-blur-sm md:hidden"
      role="region"
      aria-label="Quick action"
    >
      <LinkButton
        href="#interest"
        variant="accent"
        showChevron={false}
        className="w-full text-center shadow-md"
      >
        I&apos;M INTERESTED
      </LinkButton>
    </div>
  );
}
