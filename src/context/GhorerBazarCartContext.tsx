'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/ghorerbazarProducts';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  savings: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'ghorerbazar_cart';

export const GhorerBazarCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage when items change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items, isInitialized]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setCartOpen(true); // Open drawer automatically when item is added
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const savings = items.reduce(
    (sum, item) =>
      sum + (item.product.originalPrice - item.product.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setCartOpen,
        totalItems,
        subtotal,
        savings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useGhorerBazarCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useGhorerBazarCart must be used within a GhorerBazarCartProvider');
  }
  return context;
};
