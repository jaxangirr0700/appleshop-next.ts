import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "@/types";

export type LikeItemType = ProductType & { isLiked: boolean };

type LikeState = {
  items: LikeItemType[];
};

const initialState: LikeState = {
  items: [],
};

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
    },
    removeLike: (state, { payload }) => {
      state.items = state.items.filter((item) => item.id !== payload);
    },
  },
});

export const { toggleLike, removeLike } = likeSlice.actions;
export default likeSlice.reducer;
