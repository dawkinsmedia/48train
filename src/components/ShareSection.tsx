"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";

const SMS_TEMPLATE =
  "Hey man—free men's workout every Saturday at 7 AM at Heritage Preserve in Conway. One hour, all levels, no gym. Come with me this Saturday.";

function normalizeShareUrl(url: string): string {
  const trimmed = url.trim().replace(/\/$/, "");
  return trimmed || "";
}

function isMobileShareEnvironment(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

type ShareSectionProps = {
  shareUrl: string;
};

export function ShareSection({ shareUrl: shareUrlProp }: ShareSectionProps) {
  const [copied, setCopied] = useState(false);
  const [shareSupported, setShareSupported] = useState(false);

  useEffect(() => {
    setShareSupported(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const fullUrl = useMemo(() => {
    const fromProp = normalizeShareUrl(shareUrlProp);
    if (fromProp && fromProp !== "http://localhost:3000") return fromProp;
    if (typeof window !== "undefined") {
      return normalizeShareUrl(window.location.origin);
    }
    return fromProp;
  }, [shareUrlProp]);

  const pageUrl = fullUrl ? `${fullUrl}/` : "";
  const smsBody = encodeURIComponent(`${SMS_TEMPLATE} ${pageUrl}`.trim());
  const facebookUrl = pageUrl
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`
    : "#";

  const openFacebookShare = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!pageUrl || facebookUrl === "#") return;
      event.preventDefault();
      if (isMobileShareEnvironment()) {
        // Mobile OS deep-links often drop ?u= when opened in a new tab/window.
        window.location.assign(facebookUrl);
        return;
      }
      const popup = window.open(
        facebookUrl,
        "facebook-share",
        "width=580,height=480,noopener,noreferrer",
      );
      if (!popup) window.location.assign(facebookUrl);
    },
    [facebookUrl, pageUrl],
  );

  const copyLink = useCallback(async () => {
    if (!pageUrl) return;
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }, [pageUrl]);

  const nativeShare = useCallback(async () => {
    if (!navigator.share || !pageUrl) return;
    try {
      await navigator.share({
        title: "Saturday mornings in Conway, SC",
        text: SMS_TEMPLATE,
        url: pageUrl,
      });
    } catch {
      // user cancelled
    }
  }, [pageUrl]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {shareSupported ? (
        <Button
          type="button"
          variant="accent"
          showChevron
          onClick={nativeShare}
          className="w-full sm:w-auto"
        >
          SHARE
        </Button>
      ) : null}
      <Button
        type="button"
        variant="ghost"
        onClick={copyLink}
        className="w-full bg-offwhite sm:w-auto"
        aria-live="polite"
      >
        {copied ? "LINK COPIED" : "COPY LINK"}
      </Button>
      <a
        href={facebookUrl}
        onClick={openFacebookShare}
        rel="noopener noreferrer"
        className="inline-flex min-h-12 w-full items-center justify-center border-2 border-charcoal/20 px-8 py-3 font-display text-lg tracking-widest transition hover:border-charcoal/40 sm:w-auto"
      >
        FACEBOOK
      </a>
      <a
        href={`sms:?&body=${smsBody}`}
        className="inline-flex min-h-12 w-full items-center justify-center border-2 border-charcoal/20 px-8 py-3 font-display text-lg tracking-widest transition hover:border-charcoal/40 sm:w-auto"
      >
        TEXT A FRIEND
      </a>
    </div>
  );
}
