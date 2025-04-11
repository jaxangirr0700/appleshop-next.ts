import { ProductType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItemType = ProductType & { quantity: number };

export type CartType = {
  items: CartItemType[];
  search: string;
};
const initialState: CartType = {
  items: [],
  search: "",
};

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
    },
    incrementQty: (state, { payload }: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === payload);
      if (item) item.quantity += 1;
    },
    decrementQty: (state, { payload }: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== payload);
      }
    },
  },
});

export const { addToCart, incrementQty, decrementQty, setSearch } =
  cartSlice.actions;

export default cartSlice.reducer;
