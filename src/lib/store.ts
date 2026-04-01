import { create } from 'zustand';
import type { Product } from './data';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  // Cart
  cartItems: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  // Search
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  // Category filter
  selectedCategory: string | null;
  setCategory: (slug: string | null) => void;
  clearCategory: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // ─── Cart ─────────────────────────────────────────────
  cartItems: [],
  isCartOpen: false,

  addItem: (product) =>
    set((state) => {
      const existing = state.cartItems.find((item) => item.product.id === product.id);
      if (existing) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return { cartItems: [...state.cartItems, { product, quantity: 1 }] };
    }),

  removeItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.product.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          cartItems: state.cartItems.filter((item) => item.product.id !== productId),
        };
      }
      return {
        cartItems: state.cartItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      };
    }),

  clearCart: () => set({ cartItems: [] }),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  // ─── Search ───────────────────────────────────────────
  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  // ─── Category ──────────────────────────────────────────
  selectedCategory: null,
  setCategory: (slug) => set({ selectedCategory: slug }),
  clearCategory: () => set({ selectedCategory: null }),
}));
