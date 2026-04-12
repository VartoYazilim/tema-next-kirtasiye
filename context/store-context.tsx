"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getProducts } from "@/lib/data";
import type { CartItem, FakeUser, Order } from "@/types";

type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

type OrderPayload = {
  fullName: string;
  phone: string;
  address: string;
  note: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

type StoreContextValue = {
  cart: CartItem[];
  user: FakeUser | null;
  orders: Order[];
  cartCount: number;
  subtotal: number;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  registerFakeUser: (payload: RegisterPayload) => void;
  createOrder: (payload: OrderPayload) => Order;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const STORAGE_KEYS = {
  cart: "atelier-demo-cart",
  user: "atelier-demo-user",
  orders: "atelier-demo-orders",
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<FakeUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedCart = window.localStorage.getItem(STORAGE_KEYS.cart);
    const savedUser = window.localStorage.getItem(STORAGE_KEYS.user);
    const savedOrders = window.localStorage.getItem(STORAGE_KEYS.orders);

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
  }, [orders]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const products = getProducts();
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  function addToCart(productId: string, quantity = 1) {
    setCart((current) => {
      const existingItem = current.find((item) => item.productId === productId);

      if (existingItem) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...current, { productId, quantity }];
    });
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  }

  function removeFromCart(productId: string) {
    setCart((current) => current.filter((item) => item.productId !== productId));
  }

  function registerFakeUser(payload: RegisterPayload) {
    setUser({
      ...payload,
      createdAt: new Date().toISOString(),
    });
  }

  function createOrder(payload: OrderPayload) {
    const sanitizedCardNumber = payload.cardNumber.replace(/\s+/g, "");
    const lastFour = sanitizedCardNumber.slice(-4) || "0000";
    const order = {
      id: `SIP-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      total: subtotal + 120,
      itemCount: cartCount,
      customerName: payload.fullName || user?.fullName || "Misafir Müşteri",
      note:
        payload.note ||
        [payload.phone, payload.address].filter(Boolean).join(" • ") ||
        "Sipariş notu paylaşılmadı.",
      paymentSummary: `${payload.cardName || "Kart Sahibi"} •••• ${lastFour} • SKT ${payload.expiry || "--/--"}`,
    };

    setOrders((current) => [order, ...current]);
    setCart([]);

    return order;
  }

  return (
    <StoreContext.Provider
      value={{
        cart,
        user,
        orders,
        cartCount,
        subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        registerFakeUser,
        createOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore yalnızca StoreProvider içinde kullanılabilir.");
  }

  return context;
}
