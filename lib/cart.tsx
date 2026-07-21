'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  color: string;
  size: string;
  qty: number;
  image: string;
}

const KEY = 'happyloops_cart';

interface CartContextValue {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQty: (index: number, qty: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStored(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const hydrated = useRef(false);

  useEffect(() => {
    setItems(readStored());
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (hydrated.current) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(c => c.productId === item.productId && c.color === item.color && c.size === item.size);
      if (existing) {
        return prev.map(c => (c === existing ? { ...c, qty: c.qty + item.qty } : c));
      }
      return [...prev, item];
    });
  }, []);

  const updateQty = useCallback((index: number, qty: number) => {
    setItems(prev => prev.map((c, i) => (i === index ? { ...c, qty: Math.max(1, qty) } : c)));
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, updateQty, removeItem, clearCart, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function shippingFor(subtotal: number, itemCount: number): number {
  return itemCount === 0 ? 0 : subtotal >= 50 ? 0 : 6;
}
