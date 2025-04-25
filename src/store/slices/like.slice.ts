import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "@/types";

export type LikeItemType = ProductType & { isLiked: boolean };

type LikeState = {
  items: LikeItemType[];
};

const getInitialLikeCart = (): LikeState => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("likeds");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (err) {
        console.error("Cart localStorage parsing error:", err);
      }
    }
  }
  return { items: [] };
};

const initialState: LikeState = getInitialLikeCart();

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    toggleLike: (state, { payload }) => {
      const existing = state.items.find((item) => item.id === payload.id);
      if (existing) {
        existing.isLiked = !existing.isLiked;
      } else {
        state.items.push({ ...payload, isLiked: true });
      }
      if (typeof window !== "undefined")
        return localStorage.setItem("likeds", JSON.stringify(state));
    },
    removeLike: (state, { payload }) => {
      state.items = state.items.filter((item) => item.id !== payload);
      if (typeof window !== "undefined")
        return localStorage.setItem("likeds", JSON.stringify(state));
    },
  },
});

export const { toggleLike, removeLike } = likeSlice.actions;
export default likeSlice.reducer;
