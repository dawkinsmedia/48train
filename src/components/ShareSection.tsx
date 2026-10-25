"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const SMS_TEMPLATE =
  "Hey man—free men's workout every Saturday at 7 AM at Heritage Preserve in Conway. One hour, all levels, no gym. Come with me this Saturday.";

export function ShareSection() {
  const [siteUrl, setSiteUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareSupported, setShareSupported] = useState(false);

  useEffect(() => {
    setSiteUrl(window.location.origin);
    setShareSupported(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const fullUrl = siteUrl || "";
  const smsBody = encodeURIComponent(`${SMS_TEMPLATE} ${fullUrl}`.trim());
  const facebookUrl = fullUrl
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`
    : "#";

  const copyLink = useCallback(async () => {
    if (!fullUrl) return;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }, [fullUrl]);

  const nativeShare = useCallback(async () => {
    if (!navigator.share || !fullUrl) return;
    try {
      await navigator.share({
        title: "Saturday mornings in Conway, SC",
        text: SMS_TEMPLATE,
        url: fullUrl,
      });
    } catch {
      // user cancelled
    }
  }, [fullUrl]);

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
        target="_blank"
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
