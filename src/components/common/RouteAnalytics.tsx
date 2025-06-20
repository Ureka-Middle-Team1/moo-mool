"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RouteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-BVLC61P00M", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
