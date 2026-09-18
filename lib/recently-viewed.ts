"use client";

export interface RecentlyViewedEntry {
  type: "san-pham" | "hang-hieu";
  slug: string;
}

const STORAGE_KEY = "sv_recently_viewed_v1";
const MAX_ENTRIES = 8;

export function getRecentlyViewed(): RecentlyViewedEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function recordView(entry: RecentlyViewedEntry): void {
  try {
    const existing = getRecentlyViewed().filter(
      (e) => !(e.type === entry.type && e.slug === entry.slug)
    );
    const next = [entry, ...existing].slice(0, MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable — recently-viewed is a nice-to-have, fail silently
  }
}
