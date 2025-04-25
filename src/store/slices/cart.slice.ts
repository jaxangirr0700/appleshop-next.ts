// cartSlice.ts
import { ProductType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export type CartItemType = ProductType & { quantity: number };

export type CartType = {
  items: CartItemType[];
  search: string;
};

const getInitialCartState = (): CartType => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("carts");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (err) {
        console.error("Cart localStorage parsing error:", err);
      }
    }
  }
  return { items: [], search: "" };
};

const initialState: CartType = getInitialCartState();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    addToCart: (state, { payload }) => {
      const item = state.items.find((f) => f.id === payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...payload, quantity: 1 });
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("carts", JSON.stringify(state));
      }
    },
    incrementQty: (state, { payload }: { payload: number }) => {
      const item = state.items.find((i) => i.id === payload);
      if (item) item.quantity += 1;
      if (typeof window !== "undefined") {
        localStorage.setItem("carts", JSON.stringify(state));
      }
    },
    decrementQty: (state, { payload }: { payload: number }) => {
      const item = state.items.find((i) => i.id === payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== payload);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("carts", JSON.stringify(state));
      }
    },
    deleteCart: (state, { payload }: { payload: number }) => {
      state.items = state.items.filter((i) => i.id !== payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("carts", JSON.stringify(state));
      }
    },
  },
});

export const { addToCart, incrementQty, decrementQty, setSearch, deleteCart } =
  cartSlice.actions;

export default cartSlice.reducer;
