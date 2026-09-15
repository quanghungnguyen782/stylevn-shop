"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { ReactNode } from "react";
import type { CartLine } from "@/types/cart";

const STORAGE_KEY = "sv_cart_v1";

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  isHydrated: boolean;
}

type CartAction =
  | { type: "ADD"; productId: number; size: string; qty: number }
  | { type: "REMOVE"; productId: number; size: string }
  | { type: "UPDATE_QTY"; productId: number; size: string; qty: number }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "HYDRATE"; lines: CartLine[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, lines: action.lines, isHydrated: true };
    case "ADD": {
      const existing = state.lines.find(
        (l) => l.productId === action.productId && l.size === action.size
      );
      const lines = existing
        ? state.lines.map((l) =>
            l === existing ? { ...l, qty: l.qty + action.qty } : l
          )
        : [...state.lines, { productId: action.productId, size: action.size, qty: action.qty }];
      return { ...state, lines, isOpen: true };
    }
    case "REMOVE":
      return {
        ...state,
        lines: state.lines.filter(
          (l) => !(l.productId === action.productId && l.size === action.size)
        ),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.productId === action.productId && l.size === action.size
            ? { ...l, qty: Math.max(1, action.qty) }
            : l
        ),
      };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  isHydrated: boolean;
  totalCount: number;
  addItem: (productId: number, size: string, qty?: number) => void;
  removeItem: (productId: number, size: string) => void;
  updateQty: (productId: number, size: string, qty: number) => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    lines: [],
    isOpen: false,
    isHydrated: false,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      dispatch({ type: "HYDRATE", lines: raw ? JSON.parse(raw) : [] });
    } catch {
      dispatch({ type: "HYDRATE", lines: [] });
    }
  }, []);

  useEffect(() => {
    if (!state.isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      // localStorage unavailable (private mode, etc.) — cart still works in-memory
    }
  }, [state.lines, state.isHydrated]);

  const addItem = useCallback(
    (productId: number, size: string, qty = 1) => dispatch({ type: "ADD", productId, size, qty }),
    []
  );
  const removeItem = useCallback(
    (productId: number, size: string) => dispatch({ type: "REMOVE", productId, size }),
    []
  );
  const updateQty = useCallback(
    (productId: number, size: string, qty: number) =>
      dispatch({ type: "UPDATE_QTY", productId, size, qty }),
    []
  );
  const openCart = useCallback(() => dispatch({ type: "OPEN" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE" }), []);
  const clearCart = useCallback(() => dispatch({ type: "HYDRATE", lines: [] }), []);

  const totalCount = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.qty, 0),
    [state.lines]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines: state.lines,
      isOpen: state.isOpen,
      isHydrated: state.isHydrated,
      totalCount,
      addItem,
      removeItem,
      updateQty,
      openCart,
      closeCart,
      clearCart,
    }),
    [state.lines, state.isOpen, state.isHydrated, totalCount, addItem, removeItem, updateQty, openCart, closeCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
