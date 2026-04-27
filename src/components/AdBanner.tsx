"use client";
import { useEffect, useRef } from "react";

type AdFormat = "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";

interface AdBannerProps {
  adSlot: string;
  adFormat?: AdFormat;
  fullWidth?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({
  adSlot,
  adFormat = "auto",
  fullWidth = false,
  className = "",
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded in dev
    }
  }, []);

  return (
    <div className={`ad-container my-6 text-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidth ? "true" : "false"}
      />
    </div>
  );
}
