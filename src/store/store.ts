import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./slices/cart.slice";

export const store = configureStore({
  reducer: {
    product: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
