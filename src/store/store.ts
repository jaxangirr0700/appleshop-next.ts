import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./slices/cart.slice";
import { likeSlice } from "./slices/like.slice";

export const store = configureStore({
  reducer: {
    product: cartSlice.reducer,
    like_product: likeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
