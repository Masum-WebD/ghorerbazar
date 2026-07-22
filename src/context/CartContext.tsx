import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  weight?: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  onAddItem?: () => void;
}

const SHIPPING_COST = 100;

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case "UPDATE_QUANTITY":
      if (action.payload.quantity < 1) {
        return { items: state.items.filter((i) => i.id !== action.payload.id) };
      }
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "sirajtech_cart";

function loadFromStorage(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CartState;
  } catch {
    // corrupted data – ignore
  }
  return { items: [] };
}

export function CartProvider({ children, onAddItem }: { children: ReactNode; onAddItem?: () => void }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addItem = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
    onAddItem?.();
  };
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateQuantity = (id: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal, onAddItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export { SHIPPING_COST };
