"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

const STORAGE_KEY = "sv_wishlist_v1";

interface WishlistContextValue {
  ids: number[];
  isHydrated: boolean;
  isWishlisted: (id: number) => boolean;
  toggle: (id: number) => void;
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setIds(raw ? JSON.parse(raw) : []);
    } catch {
      setIds([]);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // localStorage unavailable — wishlist still works in-memory
    }
  }, [ids, isHydrated]);

  const toggle = useCallback((id: number) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const isWishlisted = useCallback((id: number) => ids.includes(id), [ids]);
  const openWishlist = useCallback(() => setIsOpen(true), []);
  const closeWishlist = useCallback(() => setIsOpen(false), []);

  const value = useMemo<WishlistContextValue>(
    () => ({ ids, isHydrated, isWishlisted, toggle, isOpen, openWishlist, closeWishlist }),
    [ids, isHydrated, isWishlisted, toggle, isOpen, openWishlist, closeWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
