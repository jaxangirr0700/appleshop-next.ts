import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./slices/cart.slice";
import { likeSlice } from "./slices/like.slice";
import { authSlice } from "./slices/auth.slice";

export const store = configureStore({
  reducer: {
    product: cartSlice.reducer,
    like_product: likeSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
