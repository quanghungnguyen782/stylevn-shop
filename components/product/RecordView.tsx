"use client";

import { useEffect } from "react";
import { recordView } from "@/lib/recently-viewed";
import type { RecentlyViewedEntry } from "@/lib/recently-viewed";

export function RecordView({ type, slug }: RecentlyViewedEntry) {
  useEffect(() => {
    recordView({ type, slug });
  }, [type, slug]);

  return null;
}
